import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, captchaToken } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // ✅ Verify hCaptcha token
    if (!captchaToken) {
      return NextResponse.json({ error: "Captcha is required." }, { status: 400 });
    }

    const captchaVerify = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `response=${captchaToken}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
    });

    const captchaData = await captchaVerify.json();

    if (!captchaData.success) {
      return NextResponse.json({ error: "Captcha verification failed. Please try again." }, { status: 400 });
    }

    // ✅ Controlled via .env.local — just swap the values when going live
    const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL!;
    const RECIPIENT_NAME = process.env.CONTACT_RECIPIENT_NAME!;

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: "AI versus Me Contact Form", email: process.env.BREVO_SENDER_EMAIL! },
        to: [{ email: RECIPIENT_EMAIL, name: RECIPIENT_NAME }],
        replyTo: { email, name },
        subject: `[Contact Form] ${subject}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #111; border-bottom: 2px solid #eee; padding-bottom: 12px; margin-bottom: 20px;">
              New Contact Form Submission
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #555; font-size: 14px; width: 100px;"><strong>Name</strong></td>
                <td style="padding: 8px 0; color: #111; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #555; font-size: 14px;"><strong>Email</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #4f46e5;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #555; font-size: 14px;"><strong>Subject</strong></td>
                <td style="padding: 8px 0; color: #111; font-size: 14px;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="color: #555; font-size: 14px; margin-bottom: 8px;"><strong>Message</strong></p>
              <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; color: #111; font-size: 14px; line-height: 1.6;">
                ${message.replace(/\n/g, "<br/>")}
              </div>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #aaa;">
              This email was sent from the contact form on torsecure.com. Reply directly to respond to ${name}.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Brevo error:", err);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}