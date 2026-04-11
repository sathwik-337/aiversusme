import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

type CertificateRenderData = {
  certificateNumber: string;
  recipientName: string;
  courseTitle: string;
  completionDate: Date;
  grade: string;
  percentage: number;
};

type CertificateEmailData = CertificateRenderData & {
  recipientEmail: string;
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function escapePdfText(value: string) {
  return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

export function generateCertificateNumber() {
  const suffix = crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 6);
  return `AIVSME${suffix}`;
}

export function formatCertificateDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

async function loadCertificateTemplate() {
  const preferredTemplatePath = path.join(
    process.cwd(),
    "public",
    "academy",
    "aibeg.svg"
  );

  try {
    return {
      svg: await fs.readFile(preferredTemplatePath, "utf8"),
      kind: "aibeg" as const,
    };
  } catch {
    throw new Error("Missing certificate template: aibeg.svg");
  }
}

function buildAibegOverlay(data: CertificateRenderData) {
  const gradeText = `${data.grade} (${data.percentage}%)`;
  const completionDate = formatCertificateDate(data.completionDate);

  return `
  <g id="aivsme-certificate-fields">
    <text x="209.625" y="145" text-anchor="middle" dominant-baseline="middle" fill="#4a3110" font-size="24" font-family="Georgia, serif" font-weight="700">${escapeXml(data.recipientName)}</text>
    <text x="173" y="190.5" text-anchor="start" dominant-baseline="middle" fill="#3c2b17" font-size="7.4" font-family="Georgia, serif" font-weight="700">${escapeXml(completionDate)}</text>
    <text x="319" y="190.5" text-anchor="start" dominant-baseline="middle" fill="#3c2b17" font-size="7.6" font-family="Georgia, serif" font-weight="700">${escapeXml(gradeText)}</text>
    <text x="60" y="250" text-anchor="start" dominant-baseline="middle" fill="#3c2b17" font-size="8.4" font-family="Arial, sans-serif" font-weight="700">${escapeXml(data.certificateNumber)}</text>
  </g>`;
}

export async function renderCourseCertificate(data: CertificateRenderData) {
  const template = await loadCertificateTemplate();

  if (template.kind === "aibeg") {
    const closingTagIndex = template.svg.lastIndexOf("</svg>");
    if (closingTagIndex === -1) {
      return template.svg;
    }

    return `${template.svg.slice(0, closingTagIndex)}${buildAibegOverlay(
      data
    )}\n</svg>`;
  }

  const replacements: Record<string, string> = {
    "{{CERTIFICATE_NUMBER}}": escapeXml(data.certificateNumber),
    "{{NAME}}": escapeXml(data.recipientName),
    "{{COURSE_TITLE}}": escapeXml(data.courseTitle),
    "{{COMPLETION_DATE}}": escapeXml(formatCertificateDate(data.completionDate)),
    "{{GRADE}}": escapeXml(`${data.grade} (${data.percentage}%)`),
  };

  return Object.entries(replacements).reduce(
    (output, [placeholder, value]) => output.replaceAll(placeholder, value),
    template.svg
  );
}

export function getCertificateFileName(certificateNumber: string) {
  return `${certificateNumber}.pdf`;
}

export function getCertificateSvgFileName(certificateNumber: string) {
  return `${certificateNumber}.svg`;
}

function buildPdfDocument(objects: string[]) {
  const parts: string[] = [];
  let byteLen = 0;
  const offsets: number[] = [];

  const append = (chunk: string) => {
    parts.push(chunk);
    byteLen += Buffer.byteLength(chunk, "utf8");
  };

  append("%PDF-1.4\n");

  objects.forEach((object, index) => {
    offsets[index + 1] = byteLen;
    append(`${index + 1} 0 obj\n${object}\nendobj\n`);
  });

  const xrefOffset = byteLen;
  append(`xref\n0 ${objects.length + 1}\n`);
  append("0000000000 65535 f \n");

  for (let index = 1; index <= objects.length; index += 1) {
    append(`${String(offsets[index]).padStart(10, "0")} 00000 n \n`);
  }

  append(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return Buffer.from(parts.join(""), "utf8");
}

export async function renderCourseCertificatePdf(data: CertificateRenderData) {
  // Fallback internal renderer (no external deps). This keeps builds green
  // and returns a consistent PDF layout derived from template coordinates.
  const pageWidth = 841.89;
  const pageHeight = 595.28;
  const templateWidth = 419.25;
  const templateHeight = 297.75;
  const scale = Math.min(pageWidth / templateWidth, pageHeight / templateHeight);
  const offsetX = (pageWidth - templateWidth * scale) / 2;
  const offsetY = (pageHeight - templateHeight * scale) / 2;
  const completionDate = formatCertificateDate(data.completionDate);
  const gradeText = `${data.grade} (${data.percentage}%)`;

  const mapX = (value: number) => (offsetX + value * scale).toFixed(2);
  const mapY = (value: number) => (pageHeight - (offsetY + value * scale)).toFixed(2);
  const mapW = (value: number) => (value * scale).toFixed(2);

  const contentLines = [
    "0.98 0.96 0.90 rg",
    `0 0 ${pageWidth} ${pageHeight} re f`,
    "0.63 0.51 0.22 RG",
    `${(1.6 * scale).toFixed(2)} w`,
    `${mapX(12)} ${mapY(285)} ${mapW(395)} ${mapW(273)} re S`,
    "0.82 0.74 0.49 RG",
    `${(0.8 * scale).toFixed(2)} w`,
    `${mapX(19)} ${mapY(278)} ${mapW(381)} ${mapW(259)} re S`,
    "0.89 0.84 0.68 rg",
    `${mapX(302)} ${mapY(28)} ${mapW(92)} ${mapW(72)} re f`,
    `${mapX(18)} ${mapY(36)} ${mapW(56)} ${mapW(42)} re f`,
    "0.45 0.34 0.13 rg",
    `BT /F2 ${(15 * scale).toFixed(2)} Tf ${mapX(163)} ${mapY(32)} Td (AI VS ME) Tj ET`,
    "0.10 0.10 0.10 rg",
    `BT /F3 ${(20 * scale).toFixed(2)} Tf ${mapX(118)} ${mapY(54)} Td (Certificate of Completion) Tj ET`,
    "0.38 0.38 0.38 rg",
    `BT /F1 ${(9.2 * scale).toFixed(2)} Tf ${mapX(166)} ${mapY(76)} Td (This certifies that) Tj ET`,
    "0.18 0.13 0.07 rg",
    `BT /F3 ${(18 * scale).toFixed(2)} Tf ${mapX(120)} ${mapY(120)} Td (${escapePdfText(
      data.recipientName
    )}) Tj ET`,
    "0.38 0.38 0.38 rg",
    `BT /F1 ${(8.5 * scale).toFixed(2)} Tf ${mapX(125)} ${mapY(145)} Td (has successfully completed the course) Tj ET`,
    "0.18 0.13 0.07 rg",
    `BT /F2 ${(10.5 * scale).toFixed(2)} Tf ${mapX(116)} ${mapY(166)} Td (${escapePdfText(
      data.courseTitle
    )}) Tj ET`,
    "0.38 0.38 0.38 rg",
    `BT /F1 ${(8.2 * scale).toFixed(2)} Tf ${mapX(155)} ${mapY(188)} Td (with a final grade of) Tj ET`,
    "0.55 0.42 0.13 rg",
    `BT /F3 ${(10.5 * scale).toFixed(2)} Tf ${mapX(160)} ${mapY(206)} Td (${escapePdfText(
      gradeText
    )}) Tj ET`,
    "0.63 0.51 0.22 RG",
    `${(0.6 * scale).toFixed(2)} w`,
    `${mapX(76)} ${mapY(231)} m ${mapX(165)} ${mapY(231)} l S`,
    `${mapX(210)} ${mapY(231)} m ${mapX(302)} ${mapY(231)} l S`,
    `${mapX(318)} ${mapY(231)} m ${mapX(390)} ${mapY(231)} l S`,
    "0.38 0.38 0.38 rg",
    `BT /F1 ${(5.4 * scale).toFixed(2)} Tf ${mapX(60)} ${mapY(250)} Td (Certificate No.) Tj ET`,
    `BT /F1 ${(5.4 * scale).toFixed(2)} Tf ${mapX(219)} ${mapY(246)} Td (Completion Date) Tj ET`,
    `BT /F1 ${(5.4 * scale).toFixed(2)} Tf ${mapX(336)} ${mapY(246)} Td (Grade) Tj ET`,
    "0.18 0.13 0.07 rg",
    `BT /F2 ${(6.1 * scale).toFixed(2)} Tf ${mapX(60)} ${mapY(235)} Td (${escapePdfText(
      data.certificateNumber
    )}) Tj ET`,
    `BT /F2 ${(5.9 * scale).toFixed(2)} Tf ${mapX(219)} ${mapY(228)} Td (${escapePdfText(
      completionDate
    )}) Tj ET`,
    `BT /F2 ${(6.2 * scale).toFixed(2)} Tf ${mapX(336)} ${mapY(228)} Td (${escapePdfText(
      gradeText
    )}) Tj ET`,
  ];

  const contentStream = contentLines.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${Buffer.byteLength(contentStream, "utf8")} >>\nstream\n${contentStream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>",
  ];

  return buildPdfDocument(objects);
}

export async function sendCertificateEmail(
  data: CertificateEmailData,
  options?: { attachmentPdf?: Buffer }
) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey || !senderEmail) {
    return {
      status: "skipped" as const,
      sentAt: null,
    };
  }

  const pdf =
    options?.attachmentPdf && Buffer.isBuffer(options.attachmentPdf)
      ? options.attachmentPdf
      : await renderCourseCertificatePdf(data);
  const sentAt = new Date();
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        name: "AI VS ME",
        email: senderEmail,
      },
      to: [
        {
          email: data.recipientEmail,
          name: data.recipientName,
        },
      ],
      subject: `Your ${data.courseTitle} certificate`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background: #faf5e8; border-radius: 16px;">
          <h1 style="margin: 0 0 12px; font-size: 28px; color: #151515;">Course completed successfully</h1>
          <p style="margin: 0 0 18px; color: #444; font-size: 16px; line-height: 1.6;">
            Hi ${escapeXml(data.recipientName)}, your certificate for <strong>${escapeXml(data.courseTitle)}</strong> is attached.
          </p>
          <div style="padding: 18px; border-radius: 12px; background: #fff; border: 1px solid #e6d7ae;">
            <p style="margin: 0 0 8px; color: #666; font-size: 14px;">Certificate number</p>
            <p style="margin: 0 0 12px; color: #151515; font-size: 20px; font-weight: 700;">${escapeXml(data.certificateNumber)}</p>
            <p style="margin: 0 0 8px; color: #666; font-size: 14px;">Completion date</p>
            <p style="margin: 0 0 12px; color: #151515; font-size: 16px;">${escapeXml(formatCertificateDate(data.completionDate))}</p>
            <p style="margin: 0 0 8px; color: #666; font-size: 14px;">Final grade</p>
            <p style="margin: 0; color: #151515; font-size: 16px; font-weight: 700;">${escapeXml(data.grade)} (${data.percentage}%)</p>
          </div>
        </div>
      `,
      attachment: [
        {
          name: getCertificateFileName(data.certificateNumber),
          content: pdf.toString("base64"),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo certificate email failed: ${errorText}`);
  }

  return {
    status: "sent" as const,
    sentAt,
  };
}
