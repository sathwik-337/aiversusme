import { notFound } from "next/navigation";
import { getAcademyCourseBySlug, academyCourseCatalog } from "@/app/data/academy-catalog";
import AcademyFinalExamRoute from "@/components/academy-final-exam-route";

export async function generateStaticParams() {
  return academyCourseCatalog.map((course) => ({
    courseSlug: course.slug,
  }));
}

export default async function FinalExamPage(props: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await props.params;
  const course = getAcademyCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <AcademyFinalExamRoute course={course} />
    </div>
  );
}
