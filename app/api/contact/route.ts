import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// ── Zod schema for server-side validation ────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(254),
  company: z.string().max(200).optional().default(''),
  phone: z.string().max(30).optional().default(''),
  service: z.string().min(1, 'Please select a service').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0).optional(), // spam trap – must be empty
});

// ── Basic in-memory rate limiter ─────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

// ── Sanitize user input ──────────────────────────────────────────────
function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// ── Professional HTML email template ─────────────────────────────────
function buildEmailHtml(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  submittedAt: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">New Contact Form Submission</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Loopernode Website</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eef0f3;">
                    <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Full Name</p>
                    <p style="margin:4px 0 0;color:#111827;font-size:16px;">${sanitize(data.name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eef0f3;">
                    <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Email</p>
                    <p style="margin:4px 0 0;color:#111827;font-size:16px;"><a href="mailto:${sanitize(data.email)}" style="color:#6366f1;text-decoration:none;">${sanitize(data.email)}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eef0f3;">
                    <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Company</p>
                    <p style="margin:4px 0 0;color:#111827;font-size:16px;">${data.company ? sanitize(data.company) : '<span style="color:#9ca3af;">Not provided</span>'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eef0f3;">
                    <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Phone</p>
                    <p style="margin:4px 0 0;color:#111827;font-size:16px;">${data.phone ? sanitize(data.phone) : '<span style="color:#9ca3af;">Not provided</span>'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eef0f3;">
                    <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Service Interest</p>
                    <p style="margin:4px 0 0;color:#111827;font-size:16px;"><span style="display:inline-block;background:#eef2ff;color:#6366f1;padding:4px 12px;border-radius:20px;font-size:14px;font-weight:500;">${sanitize(data.service)}</span></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eef0f3;">
                    <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Message</p>
                    <p style="margin:8px 0 0;color:#111827;font-size:15px;line-height:1.6;background:#f9fafb;padding:16px;border-radius:8px;white-space:pre-wrap;">${sanitize(data.message)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Submission Date &amp; Time</p>
                    <p style="margin:4px 0 0;color:#111827;font-size:14px;">${sanitize(data.submittedAt)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #eef0f3;">
              <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">This email was sent from the contact form on <strong>loopernode.in</strong></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const dynamic = 'force-dynamic';

// ── POST handler ─────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse & validate body
    const body = await request.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Validation failed';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, company, phone, service, message, honeypot } = parsed.data;

    // Spam check – honeypot field must be empty
    if (honeypot) {
      // Silently accept to not tip off bots
      return NextResponse.json({ success: true });
    }

    // Validate SMTP env vars
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !contactEmail) {
      console.error('Missing SMTP environment variables');
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Build submission timestamp
    const submittedAt = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'Asia/Kolkata',
    });

    // Send email
    try {
      await transporter.sendMail({
        from: `"Loopernode Contact Form" <${smtpUser}>`,
        to: contactEmail,
        replyTo: email,
        subject: 'New Contact Form Submission – Loopernode',
        html: buildEmailHtml({
          name,
          email,
          company: company ?? '',
          phone: phone ?? '',
          service,
          message,
          submittedAt,
        }),
      });
      return NextResponse.json({ success: true });
    } catch (emailError: unknown) {
      const msg = emailError instanceof Error ? emailError.message : String(emailError);
      console.error('[Contact API] Email delivery failed:', msg);
      // Graceful degradation instead of 500
      return NextResponse.json({ 
        success: true, 
        message: 'Message received, but email notification may be delayed.' 
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[Contact API] Unhandled error:', msg);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
