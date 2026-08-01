import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as z from 'zod';
import fs from 'fs/promises';
import path from 'path';

const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  country: z.string().min(2),
  currentLocation: z.string().min(2),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  experience: z.string().min(1),
  position: z.string().min(1),
  coverLetter: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract text fields
    const data = {
      fullName: formData.get('fullName') as string || '',
      email: formData.get('email') as string || '',
      phone: formData.get('phone') as string || '',
      country: formData.get('country') as string || '',
      currentLocation: formData.get('currentLocation') as string || '',
      linkedin: formData.get('linkedin') as string || '',
      portfolio: formData.get('portfolio') as string || '',
      experience: formData.get('experience') as string || '',
      position: formData.get('position') as string || '',
      coverLetter: formData.get('coverLetter') as string || '',
      message: formData.get('message') as string || '',
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

    // Save to local file database as a fallback mechanism for safety
    let savedToDB = false;
    try {
      const dbPath = path.join(process.cwd(), 'applications.json');
      const newEntry = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        ...validatedData,
        fileName: resumeFile.name
      };
      
      let existingData = [];
      try {
        const fileContent = await fs.readFile(dbPath, 'utf-8');
        existingData = JSON.parse(fileContent);
      } catch (e) {
        // File doesn't exist yet, that's fine
      }
      
      existingData.push(newEntry);
      await fs.writeFile(dbPath, JSON.stringify(existingData, null, 2));
      savedToDB = true;
    } catch (e) {
      console.error('Failed to save to mock DB', e);
    }

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
      return NextResponse.json({ success: true, partialSuccess: true });
    }

    try {
      // 1. Send Application to Loopernode HR
      await transporter.sendMail({
        from: `"Loopernode Careers" <${process.env.SMTP_USER}>`,
        to: 'info@loopernode.in',
        replyTo: validatedData.email,
        subject: `New Career Application - ${validatedData.position}`,
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #4f46e5; padding: 20px; color: white; text-align: center;">
              <h2 style="margin: 0;">New Career Application</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">${validatedData.position}</p>
            </div>
            <div style="padding: 30px; background-color: #ffffff; color: #334155;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Applicant Name:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${validatedData.fullName}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Email:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Phone:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${validatedData.phone}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Country:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${validatedData.country}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Location:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${validatedData.currentLocation}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Job Title:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${validatedData.position}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Experience:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${validatedData.experience}</td></tr>
                ${validatedData.linkedin ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>LinkedIn:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="${validatedData.linkedin}">${validatedData.linkedin}</a></td></tr>` : ''}
                ${validatedData.portfolio ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Portfolio:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="${validatedData.portfolio}">${validatedData.portfolio}</a></td></tr>` : ''}
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong>Submission Date:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${new Date().toLocaleString()}</td></tr>
              </table>
              
              ${validatedData.message ? `
              <h3 style="margin-top: 30px; color: #0f172a;">Message</h3>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
                ${validatedData.message}
              </div>` : ''}

              ${validatedData.coverLetter ? `
              <h3 style="margin-top: 30px; color: #0f172a;">Cover Letter</h3>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
                ${validatedData.coverLetter}
              </div>` : ''}
              
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
        from: `"Loopernode Recruitment Team" <${process.env.SMTP_USER}>`,
        to: validatedData.email,
        subject: `Application Received – Loopernode`,
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #334155; line-height: 1.6;">
            <p>Thank you for applying to Loopernode.</p>
            <p>We have successfully received your application for the ${validatedData.position} position.</p>
            <p>Our recruitment team will review your application and contact you if your profile matches our requirements.</p>
            <br/>
            <p>Best Regards,<br/>Loopernode Recruitment Team</p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, partialSuccess: false });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // If email fails but DB save succeeded, we return partial success
      if (savedToDB) {
        return NextResponse.json({ success: true, partialSuccess: true });
      }
      throw new Error('Failed to send email and failed to save to database.');
    }
    
  } catch (error) {
    console.error('Error processing application:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
