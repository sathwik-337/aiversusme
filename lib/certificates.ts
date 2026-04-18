import { promises as fs } from "fs";
import path from "path";
import { generateCertificateNumber, formatCertificateDate } from "./certificates-shared";

export { generateCertificateNumber, formatCertificateDate };

type CertificateRenderData = {
  certificateNumber: string;
  recipientName: string;
  courseTitle: string;
  completionDate: Date;
  grade: string;
  percentage: number;
  courseSlug?: string;
};

type CertificateEmailData = CertificateRenderData & {
  recipientEmail: string;
};

const COURSE_TEMPLATE_MAP: Record<string, string> = {
  "ai-for-advanced-learners": "certificate.png",
  "ai-for-engineers": "certificate.png",
  "ai-for-beginners": "certificate.png",
};

const COURSE_COORDINATES: Record<
  string,
  {
    name: { x: number; y: number; size: number };
    title: { x: number; y: number; size: number };
    date: { x: number; y: number; size: number };
    grade: { x: number; y: number; size: number };
    number: { x: number; y: number; size: number };
  }
> = {
  default: {
    name: { x: 208.625, y: 120, size: 12 },
    title: { x: 209.625, y: 149, size: 14 },
    date: { x: 159, y: 203, size: 5.5 },
    grade: { x: 224.625, y: 203, size: 6 },
    number: { x: 320, y: 203, size: 5.5 },
  },
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
    <text x="209.625" y="145" text-anchor="middle" dominant-baseline="middle" fill="#000000" font-size="24" font-family="Georgia, serif" font-weight="700">${escapeXml(data.recipientName)}</text>
    <text x="173" y="190.5" text-anchor="start" dominant-baseline="middle" fill="#000000" font-size="7.4" font-family="Georgia, serif" font-weight="700">${escapeXml(completionDate)}</text>
    <text x="319" y="190.5" text-anchor="start" dominant-baseline="middle" fill="#000000" font-size="7.6" font-family="Georgia, serif" font-weight="700">${escapeXml(gradeText)}</text>
    <text x="60" y="250" text-anchor="start" dominant-baseline="middle" fill="#000000" font-size="8.4" font-family="Arial, sans-serif" font-weight="700">${escapeXml(data.certificateNumber)}</text>
  </g>`;
}

export async function renderCourseCertificate(data: CertificateRenderData) {
  const templateImage = data.courseSlug ? (COURSE_TEMPLATE_MAP[data.courseSlug] || "certificate.png") : "certificate.png";

  if (templateImage) {
    const gradeText = `${data.grade} (${data.percentage}%)`;
    const completionDate = formatCertificateDate(data.completionDate);
    const coords = (data.courseSlug && COURSE_COORDINATES[data.courseSlug]) || COURSE_COORDINATES.default;

    // Read the image and convert to base64 for embedding in SVG
    let base64Image = "";
    try {
      const isRootPublic = templateImage === "certificate.png" || templateImage === "certificate.jpeg";
      const imagePath = isRootPublic 
        ? path.join(process.cwd(), "public", templateImage)
        : path.join(process.cwd(), "public", "academy", templateImage);
      
      const imageBuffer = await fs.readFile(imagePath);
      const mimeType = templateImage.endsWith(".png") ? "image/png" : "image/jpeg";
      base64Image = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
    } catch (error) {
      console.error(`Failed to load certificate template image: ${templateImage}`, error);
    }

    // Return a fresh SVG that uses the course-specific background
    return `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="419.25" height="297.75" viewBox="0 0 419.25 297.75">
  ${base64Image ? `<image xlink:href="${base64Image}" x="0" y="0" width="419.25" height="297.75" preserveAspectRatio="none" />` : ""}
  <g id="aivsme-certificate-fields">
    <text x="${coords.name.x}" y="${coords.name.y}" text-anchor="middle" dominant-baseline="middle" fill="#000000" font-size="${coords.name.size}" font-family="Georgia, serif" font-weight="700">${escapeXml(data.recipientName)}</text>
    <text x="${coords.title.x}" y="${coords.title.y}" text-anchor="middle" dominant-baseline="middle" fill="#4B0082" font-size="${coords.title.size}" font-family="Georgia, serif" font-weight="700">"${escapeXml(data.courseTitle)}"</text>
    <text x="${coords.date.x}" y="${coords.date.y}" text-anchor="middle" dominant-baseline="middle" fill="#000000" font-size="${coords.date.size}" font-family="Georgia, serif" font-weight="700">${escapeXml(completionDate)}</text>
    <text x="${coords.grade.x}" y="${coords.grade.y}" text-anchor="middle" dominant-baseline="middle" fill="#000000" font-size="${coords.grade.size}" font-family="Georgia, serif" font-weight="700">${escapeXml(gradeText)}</text>
    <text x="${coords.number.x}" y="${coords.number.y}" text-anchor="middle" dominant-baseline="middle" fill="#000000" font-size="${coords.number.size}" font-family="Arial, sans-serif" font-weight="700">${escapeXml(data.certificateNumber)}</text>
  </g>
</svg>`.trim();
  }

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

type PdfObject = string | Buffer;

function buildPdfDocument(objects: PdfObject[]) {
  const parts: Buffer[] = [];
  let byteLen = 0;
  const offsets: number[] = [];

  const append = (chunk: PdfObject) => {
    const buf = typeof chunk === "string" ? Buffer.from(chunk, "utf8") : chunk;
    parts.push(buf);
    byteLen += buf.length;
  };

  append("%PDF-1.4\n");

  objects.forEach((object, index) => {
    offsets[index + 1] = byteLen;
    append(`${index + 1} 0 obj\n`);
    append(object);
    append("\nendobj\n");
  });

  const xrefOffset = byteLen;
  append(`xref\n0 ${objects.length + 1}\n`);
  append("0000000000 65535 f \n");

  for (let index = 1; index <= objects.length; index += 1) {
    append(`${String(offsets[index]).padStart(10, "0")} 00000 n \n`);
  }

  append(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return Buffer.concat(parts);
}

export async function renderCourseCertificatePdf(data: CertificateRenderData) {
  const pageWidth = 841.89;
  const pageHeight = 595.28;
  const templateWidth = 419.25;
  const templateHeight = 297.75;
  
  // Use a fixed scale of 2 to match the exact proportions of the template to A4 Landscape
  const scale = 2;
  const displayWidth = templateWidth * scale;
  const displayHeight = templateHeight * scale;
  
  const offsetX = (pageWidth - displayWidth) / 2;
  const offsetY = (pageHeight - displayHeight) / 2;
  
  const completionDate = formatCertificateDate(data.completionDate);
  const gradeText = `${data.grade} (${data.percentage}%)`;

  const templateImage = data.courseSlug ? (COURSE_TEMPLATE_MAP[data.courseSlug] || "certificate.png") : "certificate.png";

  const mapX = (value: number) => offsetX + value * scale;
  const mapY = (value: number) => pageHeight - (offsetY + value * scale);

  const fmt = (value: number) => value.toFixed(2);

  const estimateWidth = (text: string, fontSize: number, kind: "serif" | "sans") => {
    const factor = kind === "serif" ? 0.52 : 0.5;
    return text.length * fontSize * factor;
  };

  if (templateImage) {
    const coords = (data.courseSlug && COURSE_COORDINATES[data.courseSlug]) || COURSE_COORDINATES.default;

    const isRootPublic = templateImage === "certificate.png" || templateImage === "certificate.jpeg";
    const imagePath = isRootPublic 
      ? path.join(process.cwd(), "public", templateImage)
      : path.join(process.cwd(), "public", "academy", templateImage);
      
    const imgData = await loadTemplateImageForPdf(imagePath);

    const nameText = escapePdfText(data.recipientName);
    const nameSize = coords.name.size * scale;
    const nameCenterX = mapX(coords.name.x);
    const nameStartX = nameCenterX - estimateWidth(nameText, nameSize, "serif") / 2;
    // Adjust Y for baseline in PDF (roughly subtract 1/3 of size to center vertically)
    const nameY = mapY(coords.name.y + (coords.name.size / 3));

    const courseTitleText = `"${escapePdfText(data.courseTitle)}"`;
    const titleSize = coords.title.size * scale;
    const titleCenterX = mapX(coords.title.x);
    const titleStartX = titleCenterX - estimateWidth(courseTitleText, titleSize, "serif") / 2;
    const titleY = mapY(coords.title.y + (coords.title.size / 3));

    const dateText = escapePdfText(completionDate);
    const dateSize = coords.date.size * scale;
    const dateCenterX = mapX(coords.date.x);
    const dateStartX = dateCenterX - estimateWidth(dateText, dateSize, "serif") / 2;
    const dateY = mapY(coords.date.y + (coords.date.size / 3));

    const gradeTextPdf = escapePdfText(gradeText);
    const gradeSize = coords.grade.size * scale;
    const gradeCenterX = mapX(coords.grade.x);
    const gradeStartX = gradeCenterX - estimateWidth(gradeTextPdf, gradeSize, "serif") / 2;
    const gradeY = mapY(coords.grade.y + (coords.grade.size / 3));

    const numberText = escapePdfText(data.certificateNumber);
    const numberSize = coords.number.size * scale;
    const numberCenterX = mapX(coords.number.x);
    const numberStartX = numberCenterX - estimateWidth(numberText, numberSize, "sans") / 2;
    const numberY = mapY(coords.number.y + (coords.number.size / 3));

    const contentLines = [
      `q ${fmt(displayWidth)} 0 0 ${fmt(displayHeight)} ${fmt(offsetX)} ${fmt(offsetY)} cm /Im1 Do Q`,
      "0.00 0.00 0.00 rg",
      `BT /F3 ${fmt(nameSize)} Tf ${fmt(nameStartX)} ${fmt(nameY)} Td (${nameText}) Tj ET`,
      "0.29 0.00 0.51 rg", // Indigo/Purple for course title
      `BT /F3 ${fmt(titleSize)} Tf ${fmt(titleStartX)} ${fmt(titleY)} Td (${courseTitleText}) Tj ET`,
      "0.00 0.00 0.00 rg",
      `BT /F3 ${fmt(dateSize)} Tf ${fmt(dateStartX)} ${fmt(dateY)} Td (${dateText}) Tj ET`,
      `BT /F3 ${fmt(gradeSize)} Tf ${fmt(gradeStartX)} ${fmt(gradeY)} Td (${gradeTextPdf}) Tj ET`,
      `BT /F2 ${fmt(numberSize)} Tf ${fmt(numberStartX)} ${fmt(numberY)} Td (${numberText}) Tj ET`,
    ];

    const contentStream = contentLines.join("\n");

    const imageObject = Buffer.concat([
      Buffer.from(
        `<< /Type /XObject /Subtype /Image /Width ${imgData.width} /Height ${imgData.height} /ColorSpace ${imgData.colorSpace} /BitsPerComponent 8 ${imgData.filter ? `/Filter ${imgData.filter}` : ""} ${imgData.decodeParms ? `/DecodeParms ${imgData.decodeParms}` : ""} /Length ${imgData.data.length} >>\nstream\n`,
        "utf8"
      ),
      imgData.data,
      Buffer.from("\nendstream", "utf8"),
    ]);

    const objects: PdfObject[] = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> /XObject << /Im1 8 0 R >> >> /Contents 4 0 R >>`,
      `<< /Length ${Buffer.byteLength(contentStream, "utf8")} >>\nstream\n${contentStream}\nendstream`,
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>",
      imageObject,
    ];

    return buildPdfDocument(objects);
  }

  const titleSize = 20 * scale;
  const contentLines = [
    "0.98 0.96 0.90 rg",
    `0 0 ${pageWidth} ${pageHeight} re f`,
    "0.00 0.00 0.00 rg",
    `BT /F3 ${fmt(titleSize)} Tf ${fmt(mapX(118))} ${fmt(mapY(54))} Td (Certificate of Completion) Tj ET`,
  ];

  const contentStream = contentLines.join("\n");
  const objects: PdfObject[] = [
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

async function loadTemplateImageForPdf(filePath: string) {
  const buf = await fs.readFile(filePath);
  
  // Check if PNG
  if (buf.length >= 8 && buf.slice(0, 8).toString("hex") === "89504e470d0a1a0a") {
    let offset = 8;
    let width = 0;
    let height = 0;
    const idatParts: Buffer[] = [];

    while (offset + 12 <= buf.length) {
      const length = buf.readUInt32BE(offset);
      offset += 4;
      const type = buf.slice(offset, offset + 4).toString("ascii");
      offset += 4;
      const data = buf.slice(offset, offset + length);
      offset += length;
      offset += 4;

      if (type === "IHDR") {
        width = data.readUInt32BE(0);
        height = data.readUInt32BE(4);
      }
      if (type === "IDAT") idatParts.push(data);
      if (type === "IEND") break;
    }

    return {
      width,
      height,
      colorSpace: "/DeviceRGB",
      filter: "/FlateDecode",
      decodeParms: `<< /Predictor 15 /Colors 3 /BitsPerComponent 8 /Columns ${width} >>`,
      data: Buffer.concat(idatParts),
    };
  }

  // Check if JPEG
  if (buf.length >= 2 && buf[0] === 0xFF && buf[1] === 0xD8) {
    let offset = 2;
    let width = 0;
    let height = 0;

    while (offset < buf.length) {
      if (buf[offset] !== 0xFF) break;
      const marker = buf[offset + 1];
      if (marker === 0xD9 || marker === 0xDA) break;

      const length = buf.readUInt16BE(offset + 2);
      if (marker >= 0xC0 && marker <= 0xC3) {
        height = buf.readUInt16BE(offset + 5);
        width = buf.readUInt16BE(offset + 7);
        break;
      }
      offset += 2 + length;
    }

    return {
      width,
      height,
      colorSpace: "/DeviceRGB",
      filter: "/DCTDecode",
      data: buf,
    };
  }

  throw new Error("Unsupported image format for certificate template");
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
