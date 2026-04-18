import { NextRequest, NextResponse } from "next/server";
import { renderCourseCertificate } from "@/lib/certificates";
import { isAuthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { coordinates, data } = await req.json();

    // Temporarily override coordinates for this render
    // In a real implementation, we'd pass these to a version of renderCourseCertificate 
    // that accepts overrides. For simplicity here, we'll assume renderCourseCertificate
    // can handle coordinate overrides or we'll manually build the SVG.

    const gradeText = `${data.grade} (${data.percentage}%)`;
    const completionDate = data.completedAt 
      ? new Date(data.completedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      : "April 18, 2026";

    // This mimics the logic in lib/certificates.ts but with live overrides
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="419.25" height="297.75" viewBox="0 0 419.25 297.75">
  <image xlink:href="${data.templateImage || '/certificate.png'}" x="0" y="0" width="419.25" height="297.75" preserveAspectRatio="none" />
  <g id="aivsme-certificate-fields">
    <text x="${coordinates.name.x}" y="${coordinates.name.y}" text-anchor="middle" dominant-baseline="middle" fill="#000000" font-size="${coordinates.name.size}" font-family="Georgia, serif" font-weight="700">${data.recipientName}</text>
    <text x="${coordinates.title.x}" y="${coordinates.title.y}" text-anchor="middle" dominant-baseline="middle" fill="#4B0082" font-size="${coordinates.title.size}" font-family="Georgia, serif" font-weight="700">"${data.courseTitle}"</text>
    <text x="${coordinates.date.x}" y="${coordinates.date.y}" text-anchor="middle" dominant-baseline="middle" fill="#000000" font-size="${coordinates.date.size}" font-family="Georgia, serif" font-weight="700">${completionDate}</text>
    <text x="${coordinates.grade.x}" y="${coordinates.grade.y}" text-anchor="middle" dominant-baseline="middle" fill="#000000" font-size="${coordinates.grade.size}" font-family="Georgia, serif" font-weight="700">${gradeText}</text>
    <text x="${coordinates.number.x}" y="${coordinates.number.y}" text-anchor="middle" dominant-baseline="middle" fill="#000000" font-size="${coordinates.number.size}" font-family="Arial, sans-serif" font-weight="700">${data.certificateNumber}</text>
  </g>
</svg>`.trim();

    return NextResponse.json({ svg });
  } catch (error) {
    console.error("Preview error:", error);
    return NextResponse.json({ error: "Failed to generate preview" }, { status: 500 });
  }
}
