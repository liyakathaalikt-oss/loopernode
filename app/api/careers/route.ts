import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as z from 'zod';

const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  country: z.string().min(2),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  experience: z.string().min(1),
  position: z.string().min(1),
  coverLetter: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract text fields
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      country: formData.get('country') as string,
      linkedin: formData.get('linkedin') as string,
      portfolio: formData.get('portfolio') as string,
      experience: formData.get('experience') as string,
      position: formData.get('position') as string,
      coverLetter: formData.get('coverLetter') as string,
    };

    // Validate fields
    const validatedData = formSchema.parse(data);

    // Extract file
    const resumeFile = formData.get('resume') as File;
    if (!resumeFile) {
      return NextResponse.json({ error: 'Resume file is required' }, { status: 400 });
    }

    // Convert file to buffer for NodeMailer
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Mock email if credentials aren't provided (for local testing)
    if (!process.env.SMTP_USER) {
      console.log('No SMTP credentials found, mocking email send.');
      console.log(`Would have sent email to info@loopernode.in from ${validatedData.email}`);
      console.log(`Would have sent auto-responder to ${validatedData.email}`);
      return NextResponse.json({ success: true, mocked: true });
    }

    // 1. Send Application to Loopernode HR
    await transporter.sendMail({
      from: `"Loopernode Careers" <${process.env.SMTP_USER}>`,
      to: 'info@loopernode.in',
      replyTo: validatedData.email,
      subject: `New Job Application: ${validatedData.position} - ${validatedData.fullName}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #4f46e5; padding: 20px; color: white; text-align: center;">
            <h2 style="margin: 0;">New Application Received</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">${validatedData.position}</p>
          </div>
          <div style="padding: 30px; background-color: #ffffff; color: #334155;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Name:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${validatedData.fullName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Email:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Phone:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${validatedData.phone}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Country:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${validatedData.country}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Experience:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${validatedData.experience}</td></tr>
              ${validatedData.linkedin ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>LinkedIn:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="${validatedData.linkedin}">${validatedData.linkedin}</a></td></tr>` : ''}
              ${validatedData.portfolio ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Portfolio:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="${validatedData.portfolio}">${validatedData.portfolio}</a></td></tr>` : ''}
            </table>
            <h3 style="margin-top: 30px; color: #0f172a;">Cover Letter</h3>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
              ${validatedData.coverLetter}
            </div>
            <p style="margin-top: 20px; font-size: 13px; color: #64748b;">The applicant's resume is attached to this email.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: resumeFile.name,
          content: buffer,
          contentType: resumeFile.type,
        }
      ]
    });

    // 2. Send Auto-Responder to Applicant
    await transporter.sendMail({
      from: `"Loopernode Hiring" <${process.env.SMTP_USER}>`,
      to: validatedData.email,
      subject: `Application Received: ${validatedData.position} at Loopernode`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #4f46e5; padding: 20px; color: white; text-align: center;">
            <h2 style="margin: 0;">Application Successfully Received</h2>
          </div>
          <div style="padding: 30px; background-color: #ffffff; color: #334155; line-height: 1.6;">
            <p>Hi ${validatedData.fullName},</p>
            <p>Thank you for applying for the <strong>${validatedData.position}</strong> role at Loopernode!</p>
            <p>This email is to confirm that we have received your application and resume. Our hiring team will review your profile, and if your qualifications match our current needs, we will reach out to you to schedule an interview.</p>
            <p>Due to the high volume of applications, this process may take 1-2 weeks. We appreciate your patience.</p>
            <br/>
            <p>Best regards,<br/><strong>The Loopernode Hiring Team</strong></p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error processing application:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
