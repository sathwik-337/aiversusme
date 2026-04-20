import type { AdminCoupon, AdminCourse } from "@/app/admin/page";

export async function downloadCouponsPDF(
  couponsToDownload: AdminCoupon[],
  courseList: AdminCourse[]
) {
  if (typeof window === "undefined") return;
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  
  // Check if all coupons belong to the same group
  const uniqueGroups = [...new Set(couponsToDownload.map(c => c.group_name || "Ungrouped"))];
  const groupName = uniqueGroups.length === 1 ? uniqueGroups[0] : null;
  
  const title = groupName && groupName !== "Ungrouped" 
    ? `Codes for ${groupName}` 
    : "Generated Coupon/Voucher Codes";

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
    let line = `${index + 1}. Code: ${c.code}${isExpired ? ' (EXPIRED)' : ''}`;
    if (c.group_name) line += ` | Group: ${c.group_name}`;
    doc.text(line, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(`   Type: ${type} | Course: ${courseTitle} | Value: ${discountOrCredits} | Limit: ${c.usage_limit === -1 ? 'Unlimited' : c.usage_limit}`, margin, y + 5);
    y += 15;
  });

  const filename = groupName && groupName !== "Ungrouped"
    ? `${groupName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-codes`
    : `coupons-${new Date().getTime()}`;
  doc.save(`${filename}.pdf`);
}
