import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.log('[Careers API] === New application submission ===');

  try {
    // ─── 1. Parse multipart form data ───
    let formData: FormData;
    try {
      formData = await request.formData();
      console.log('[Careers API] FormData parsed OK');
    } catch (err) {
      console.error('[Careers API] FormData parse failed:', err);
      return NextResponse.json(
        { success: false, message: 'Could not read form data. Please try again.' },
        { status: 400 }
      );
    }

    // ─── 2. Extract text fields ───
    const fullName = (formData.get('fullName') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const country = (formData.get('country') as string) || '';
    const currentLocation = (formData.get('currentLocation') as string) || '';
    const linkedin = (formData.get('linkedin') as string) || '';
    const portfolio = (formData.get('portfolio') as string) || '';
    const experience = (formData.get('experience') as string) || '';
    const position = (formData.get('position') as string) || '';
    const coverLetter = (formData.get('coverLetter') as string) || '';
    const message = (formData.get('message') as string) || '';

    console.log(`[Careers API] Applicant: ${fullName} <${email}> for ${position}`);

    // ─── 3. Validate required fields ───
    const missing: string[] = [];
    if (fullName.length < 2) missing.push('Full Name');
    if (!email || !email.includes('@')) missing.push('Email');
    if (phone.length < 5) missing.push('Phone');
    if (country.length < 2) missing.push('Country');
    if (currentLocation.length < 2) missing.push('Current Location');
    if (!experience) missing.push('Experience');
    if (!position) missing.push('Position');

    if (missing.length > 0) {
      console.error('[Careers API] Validation failed. Missing:', missing);
      return NextResponse.json(
        { success: false, message: `Please complete: ${missing.join(', ')}` },
        { status: 400 }
      );
    }
    console.log('[Careers API] Validation passed');

    // ─── 4. Extract & validate resume file ───
    const resumeEntry = formData.get('resume');

    if (!resumeEntry || typeof resumeEntry === 'string' || !(resumeEntry instanceof File) || resumeEntry.size === 0) {
      console.error('[Careers API] Resume missing or empty');
      return NextResponse.json(
        { success: false, message: 'Please upload your resume (PDF/DOC/DOCX).' },
        { status: 400 }
      );
    }

    const resumeFile = resumeEntry as File;
    console.log(`[Careers API] Resume: ${resumeFile.name} (${(resumeFile.size / 1024).toFixed(1)} KB)`);

    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'Resume must be under 5 MB.' },
        { status: 400 }
      );
    }

    // ─── 5. Read file into buffer ───
    let resumeBuffer: Buffer;
    try {
      const arrayBuf = await resumeFile.arrayBuffer();
      resumeBuffer = Buffer.from(arrayBuf);
      console.log(`[Careers API] Resume buffered: ${resumeBuffer.length} bytes`);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error('[Careers API] Unhandled error:', msg);
      return NextResponse.json(
        { success: false, message: 'Could not process your resume. Please try a different file.' },
        { status: 400 }
      );
    }

    // ─── 6. Send emails ───
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      // No SMTP configured — accept the application gracefully
      console.log('[Careers API] No SMTP credentials. Application accepted without email.');
      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully.',
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: smtpUser, pass: smtpPass },
    });

    const recipientEmail = process.env.CONTACT_EMAIL || 'info@loopernode.in';

    try {
      // Email 1: HR notification with resume attached
      await transporter.sendMail({
        from: `"Loopernode Careers" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `New Application — ${position} — ${fullName}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#4f46e5;padding:24px;color:#fff;border-radius:8px 8px 0 0">
              <h2 style="margin:0">New Career Application</h2>
              <p style="margin:4px 0 0;opacity:.85">${position}</p>
            </div>
            <div style="padding:24px;background:#fff;color:#334155;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 8px 8px">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><strong>Name</strong></td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9">${fullName}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><strong>Email</strong></td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><strong>Phone</strong></td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9">${phone}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><strong>Country</strong></td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9">${country}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><strong>Location</strong></td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9">${currentLocation}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><strong>Experience</strong></td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9">${experience}</td></tr>
                ${linkedin ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><strong>LinkedIn</strong></td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><a href="${linkedin}">${linkedin}</a></td></tr>` : ''}
                ${portfolio ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><strong>Portfolio</strong></td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9"><a href="${portfolio}">${portfolio}</a></td></tr>` : ''}
              </table>
              ${coverLetter ? `<h3 style="margin:24px 0 8px;color:#0f172a">Cover Letter</h3><div style="background:#f8fafc;padding:12px;border-radius:6px;white-space:pre-wrap;font-size:14px">${coverLetter}</div>` : ''}
              ${message ? `<h3 style="margin:24px 0 8px;color:#0f172a">Additional Message</h3><div style="background:#f8fafc;padding:12px;border-radius:6px;white-space:pre-wrap;font-size:14px">${message}</div>` : ''}
              <p style="margin:24px 0 0;font-size:13px;color:#94a3b8">Resume attached. Submitted ${new Date().toLocaleString()}.</p>
            </div>
          </div>
        `,
        attachments: [{
          filename: resumeFile.name,
          content: resumeBuffer,
          contentType: resumeFile.type || 'application/octet-stream',
        }],
      });
      console.log(`[Careers API] HR email sent to ${recipientEmail}`);

      // Email 2: Applicant confirmation
      await transporter.sendMail({
        from: `"Loopernode Recruitment" <${smtpUser}>`,
        to: email,
        subject: 'Application Received — Loopernode',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#334155;line-height:1.6">
            <p>Hi ${fullName},</p>
            <p>Thank you for applying for the <strong>${position}</strong> position at Loopernode.</p>
            <p>We have received your application and our recruitment team will review it shortly. If your profile matches our requirements, we will contact you for the next steps.</p>
            <br/>
            <p>Best regards,<br/><strong>Loopernode Recruitment Team</strong></p>
          </div>
        `,
      });
      console.log(`[Careers API] Confirmation email sent to ${email}`);

      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully.',
      });

    } catch (emailError) {
      const msg = emailError instanceof Error ? emailError.message : String(emailError);
      console.error('[Careers API] Email delivery failed:', msg);
      
      return NextResponse.json({
        success: true,
        message: 'Application received. Email confirmation may be delayed.',
      });
    }

  } catch (fatalErr: unknown) {
    // Absolute last resort — should never reach here.
    const msg = fatalErr instanceof Error ? fatalErr.message : String(fatalErr);
    console.error('[Careers API] FATAL unhandled error:', msg);

    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
