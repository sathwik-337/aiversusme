import { academyMiniCourse } from "@/app/data/academy-mini-course";
import AcademyFinalExamRoute from "@/components/academy-final-exam-route";

export default function FinalExamPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <AcademyFinalExamRoute course={academyMiniCourse} />
    </div>
  );
}
