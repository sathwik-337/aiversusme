import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { renderNotesPdf } from "@/lib/notes-pdf";
import { aiBeginnersCourse } from "@/app/data/academy-ai-beginners";
import { aiEngineersCourse } from "@/app/data/academy-ai-engineers";
import { aiAdvancedCourse } from "@/app/data/academy-ai-advanced";

const courses = [
  aiBeginnersCourse,
  aiEngineersCourse,
  aiAdvancedCourse,
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseSlug: string; moduleId: string }> }
) {
  const { courseSlug, moduleId } = await params;

  // Find the course and module to get the title
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const module = course.modules.find((m) => m.id === moduleId || m.id === moduleId.padStart(2, "0"));
  if (!module) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }

  // The markdown file path
  let fileName = "";
  if (module.notesDownloadUrl) {
    fileName = path.basename(module.notesDownloadUrl);
  } else {
    // Fallback pattern if notesDownloadUrl is missing
    const prefix = courseSlug.includes("engineers") ? "engineers" : courseSlug.includes("advanced") ? "advanced" : "beginners";
    fileName = `${prefix}-m${moduleId.padStart(2, "0")}.md`;
  }

  const filePath = path.join(process.cwd(), "public", "academy", "notes", fileName);

  try {
    const markdown = await fs.readFile(filePath, "utf8");
    const title = `${course.title} - Module ${moduleId}: ${module.title}`;
    
    const pdfBuffer = await renderNotesPdf(title, markdown);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName.replace(".md", ".pdf")}"`,
      },
    });
  } catch (error) {
    console.error("Error generating notes PDF:", error);
    return NextResponse.json({ error: "Notes file not found" }, { status: 404 });
  }
}
