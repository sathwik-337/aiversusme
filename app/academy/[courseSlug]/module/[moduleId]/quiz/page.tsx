import { notFound } from "next/navigation";
import { getAcademyCourseBySlug, academyCourseCatalog } from "@/app/data/academy-catalog";
import AcademyModuleQuizRoute from "@/components/academy-module-quiz-route";

export async function generateStaticParams() {
  const params: Array<{ courseSlug: string; moduleId: string }> = [];
  
  for (const course of academyCourseCatalog) {
    for (const module of course.modules) {
      params.push({
        courseSlug: course.slug,
        moduleId: module.id,
      });
    }
  }
  
  return params;
}

export default async function ModuleQuizPage(props: {
  params: Promise<{ courseSlug: string; moduleId: string }>;
}) {
  const { courseSlug, moduleId } = await props.params;
  const course = getAcademyCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  const moduleExists = course.modules.some(
    (module) => module.id === moduleId
  );

  if (!moduleExists) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <AcademyModuleQuizRoute course={course} moduleId={moduleId} />
    </div>
  );
}
