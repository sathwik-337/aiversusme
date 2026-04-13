import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey || !senderEmail) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "AI VS ME Admin",
          email: senderEmail,
        },
        to: [
          {
            email: "sathwikkamath31@gmail.com",
            name: "Sathwik Kamath",
          },
        ],
        subject: "Admin Password Reset Request",
        htmlContent: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>You received a request to reset the admin password for AI VS ME.</p>
            <p>Current credentials are:</p>
            <ul style="color: #333; line-height: 1.6;">
              <li><strong>Admin:</strong> admin@aivsme / Aivsme@Admin#2026</li>
              <li><strong>Developer:</strong> dev@aivsme / Aivsme@Dev#2026</li>
            </ul>
            <p>If you need to change them, please update the <code>lib/admin-auth.ts</code> file.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">This is an automated security notification.</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Brevo error: ${errorText}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Forgot password email failed:", error);
    return NextResponse.json(
      { error: "Failed to send reset email" },
      { status: 500 }
    );
  }
}
