import type { AdminCoupon, AdminCourse } from "@/app/admin/page";

export async function downloadCouponsPDF(
  couponsToDownload: AdminCoupon[],
  courseList: AdminCourse[]
) {
  if (typeof window === "undefined") return;
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const title = "Generated Coupon/Voucher Codes";
  doc.setFontSize(18);
  doc.text(title, 20, 20);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
  
  let y = 45;
  const margin = 20;
  const pageHeight = doc.internal.pageSize.height;

  couponsToDownload.forEach((c, index) => {
    if (y > pageHeight - margin) {
      doc.addPage();
      y = 20;
    }
    const type = c.code.startsWith('AIVSMEC') ? 'COUPON' : 'VOUCHER';
    const discountOrCredits = c.code.startsWith('AIVSMEV') 
      ? `${c.discount_percentage} Credits` 
      : `${c.discount_percentage}% off`;
    const isExpired = c.usage_limit !== -1 && c.usage_count >= c.usage_limit;
    const courseTitle = c.course_slug 
      ? courseList.find(course => course.slug === c.course_slug)?.title || c.course_slug 
      : 'All Courses';

    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. Code: ${c.code}${isExpired ? ' (EXPIRED)' : ''}`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(`   Type: ${type} | Course: ${courseTitle} | Value: ${discountOrCredits} | Limit: ${c.usage_limit === -1 ? 'Unlimited' : c.usage_limit}`, margin, y + 5);
    y += 15;
  });

  doc.save(`coupons-${new Date().getTime()}.pdf`);
}
