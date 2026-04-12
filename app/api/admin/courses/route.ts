import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { academyCourses, academyModules } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { academyCourseCatalog } from "@/app/data/academy-catalog";
import { generateAutomatedQuiz } from "@/lib/quiz-generator";

export const runtime = "nodejs";

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get("x-admin-auth") || req.headers.get("authorization");
  const expected = "Basic " + Buffer.from("admin:admin").toString("base64");
  return auth === expected;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Format static catalog courses
  const staticCourses = academyCourseCatalog.map(course => ({
    id: `static-${course.slug}`,
    title: course.title,
    slug: course.slug,
    description: course.summary,
    isStatic: true,
    modules: course.modules.map(m => ({
      module_id: m.id,
      title: m.title,
      description: m.description,
      notes_url: m.notesDownloadUrl || "",
      quiz: m.quiz || []
    }))
  }));

  try {
    const dbCourses = await db.select().from(academyCourses).catch(err => {
      console.warn("Database courses table might not exist yet:", err.message);
      return null;
    });

    if (dbCourses === null) {
      return NextResponse.json(staticCourses);
    }

    const dbModules = await db.select().from(academyModules).catch(err => {
      console.warn("Database modules table might not exist yet:", err.message);
      return [];
    });

    // Format database courses
    const formattedDbCourses = dbCourses.map(course => ({
      ...course,
      modules: dbModules.filter(m => m.course_id === course.id).map(m => ({
        ...m,
        quiz: m.quiz || [] 
      }))
    }));

    return NextResponse.json([...staticCourses, ...formattedDbCourses]);
  } catch (error) {
    console.error("Unexpected fetch error:", error);
    // Return at least static courses if something goes wrong
    return NextResponse.json(staticCourses);
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, description, modules } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    return await db.transaction(async (tx) => {
      // Insert course
      const [newCourse] = await tx.insert(academyCourses).values({
        title,
        slug,
        description,
        updated_at: new Date(),
      }).returning();

      // Insert modules if any
      if (modules && Array.isArray(modules) && modules.length > 0) {
        // Validate modules before inserting
        for (const m of modules) {
          if (!m.module_id || !m.title) {
            throw new Error(`Module ID and Title are required for all modules`);
          }
        }

        const modulesToInsert = modules.map((m: any) => ({
          course_id: newCourse.id,
          module_id: m.module_id,
          title: m.title,
          description: m.description || "",
          notes_url: m.notes_url || "",
          quiz: generateAutomatedQuiz(title, m.title),
          updated_at: new Date(),
        }));

        await tx.insert(academyModules).values(modulesToInsert);
      }

      return NextResponse.json({ ok: true, courseId: newCourse.id });
    });
  } catch (error) {
    console.error("Failed to add course:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Failed to add course" 
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, slug, description, modules } = body;

    if (!id || id.startsWith('static-')) {
      return NextResponse.json({ error: "Cannot update static or missing course ID" }, { status: 400 });
    }

    return await db.transaction(async (tx) => {
      // Update course
      await tx.update(academyCourses)
        .set({ title, slug, description, updated_at: new Date() })
        .where(eq(academyCourses.id, id));

      // Delete existing modules
      await tx.delete(academyModules).where(eq(academyModules.course_id, id));

      if (modules && Array.isArray(modules) && modules.length > 0) {
        // Validate modules before inserting
        for (const m of modules) {
          if (!m.module_id || !m.title) {
            throw new Error(`Module ID and Title are required for all modules`);
          }
        }

        const modulesToInsert = modules.map((m: any) => ({
          course_id: id,
          module_id: m.module_id,
          title: m.title,
          description: m.description || "",
          notes_url: m.notes_url || "",
          quiz: m.quiz && m.quiz.length > 0 ? m.quiz : generateAutomatedQuiz(title, m.title),
          updated_at: new Date(),
        }));
        await tx.insert(academyModules).values(modulesToInsert);
      }

      return NextResponse.json({ ok: true });
    });
  } catch (error) {
    console.error("Failed to update course:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Failed to update course" 
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || id.startsWith('static-')) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(academyCourses).where(eq(academyCourses.id, id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete course:", error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
