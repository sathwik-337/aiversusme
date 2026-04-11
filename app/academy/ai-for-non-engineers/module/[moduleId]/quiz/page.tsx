import { notFound } from "next/navigation";
import { academyMiniCourse } from "@/app/data/academy-mini-course";
import AcademyModuleQuizRoute from "@/components/academy-module-quiz-route";

export async function generateStaticParams() {
  return academyMiniCourse.modules.map((module) => ({
    moduleId: module.id,
  }));
}

export default async function ModuleQuizPage(
  props: PageProps<"/academy/ai-for-non-engineers/module/[moduleId]/quiz">
) {
  const { moduleId } = await props.params;
  const moduleExists = academyMiniCourse.modules.some(
    (module) => module.id === moduleId
  );

  if (!moduleExists) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <AcademyModuleQuizRoute course={academyMiniCourse} moduleId={moduleId} />
    </div>
  );
}
