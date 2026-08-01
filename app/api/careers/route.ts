import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as z from 'zod';
import fs from 'fs/promises';
import path from 'path';

// Schema Validation
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
  console.log('[API/Careers] 1. Incoming request received.');
  try {
    // 1. Extract Form Data
    let formData;
    try {
      formData = await request.formData();
      console.log('[API/Careers] 2. FormData parsed successfully.');
    } catch (parseError: any) {
      console.error('[API/Careers] ERROR: Failed to parse multipart/form-data:', parseError);
      return NextResponse.json({ success: false, message: 'Invalid form data format.' }, { status: 400 });
    }
    
    // 2. Extract Text Fields
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
    console.log(`[API/Careers] 3. Text fields extracted for: ${data.email}`);

    // 3. Validate Fields
    let validatedData;
    try {
      validatedData = formSchema.parse(data);
      console.log('[API/Careers] 4. Field validation passed.');
    } catch (validationError) {
      console.error('[API/Careers] ERROR: Validation failed:', validationError);
      return NextResponse.json({ success: false, message: 'Please complete all required fields.' }, { status: 400 });
    }

    // 4. Extract and Validate File
    const resumeFile = formData.get('resume');
    if (!resumeFile || typeof resumeFile === 'string') {
      console.error('[API/Careers] ERROR: Resume file is missing or invalid.');
      return NextResponse.json({ success: false, message: 'Please upload a valid resume file.' }, { status: 400 });
    }

    const file = resumeFile as File;
    console.log(`[API/Careers] 5. Resume file extracted: ${file.name}, size: ${file.size} bytes`);

    if (file.size > 10 * 1024 * 1024) {
      console.error('[API/Careers] ERROR: Resume file exceeds 10MB limit.');
      return NextResponse.json({ success: false, message: 'File is too large. Max size is 10MB.' }, { status: 400 });
    }

    // 5. Convert File to Buffer
    let buffer: Buffer;
    try {
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
      console.log('[API/Careers] 6. File converted to buffer.');
    } catch (bufferError) {
      console.error('[API/Careers] ERROR: Failed to read file buffer:', bufferError);
      return NextResponse.json({ success: false, message: 'Failed to process the uploaded file.' }, { status: 500 });
    }

    // 6. Save to Mock Database (Optional fallback)
    try {
      const dbPath = path.join(process.cwd(), 'applications.json');
      const newEntry = {
        id: Math.random().toString(36).substring(7),
        date: new Date().toISOString(),
        ...validatedData,
        fileName: file.name
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
      console.log('[API/Careers] 7. Application saved to local fallback DB.');
    } catch (dbError) {
      // Do not crash the API if local fallback save fails
      console.error('[API/Careers] WARNING: Failed to save to local DB:', dbError);
    }

    // 7. Verify SMTP Configuration
    if (!process.env.SMTP_USER) {
      console.log('[API/Careers] 8. No SMTP_USER found. Mocking successful email delivery.');
      return NextResponse.json({ success: true, message: 'Application submitted successfully (Mock Email Mode).' });
    }

    // 8. Create Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 9. Send Emails
    try {
      console.log('[API/Careers] 9. Attempting to send HR notification email...');
      
      const toEmail = process.env.CONTACT_EMAIL || 'info@loopernode.in';

      // Email 1: To HR
      await transporter.sendMail({
        from: `"Loopernode Careers" <${process.env.SMTP_USER}>`,
        to: toEmail,
        replyTo: validatedData.email,
        subject: `New Career Application - ${validatedData.position}`,
        html: `
          <h2>New Career Application</h2>
          <p><strong>Name:</strong> ${validatedData.fullName}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Position:</strong> ${validatedData.position}</p>
          <p><strong>Experience:</strong> ${validatedData.experience}</p>
        `,
        attachments: [
          {
            filename: file.name,
            content: buffer,
            contentType: file.type || 'application/octet-stream',
          }
        ]
      });
      console.log(`[API/Careers] 10. HR email sent successfully to ${toEmail}.`);

      // Email 2: To Applicant
      console.log('[API/Careers] 11. Attempting to send confirmation to applicant...');
      await transporter.sendMail({
        from: `"Loopernode Recruitment" <${process.env.SMTP_USER}>`,
        to: validatedData.email,
        subject: `Application Received - Loopernode`,
        html: `
          <p>Hi ${validatedData.fullName},</p>
          <p>We have successfully received your application for the ${validatedData.position} position.</p>
          <p>Our team will review it and get back to you soon.</p>
        `,
      });
      console.log(`[API/Careers] 12. Applicant confirmation sent to ${validatedData.email}.`);

      console.log('[API/Careers] 13. Request completed successfully. Returning 200.');
      return NextResponse.json({ success: true, message: 'Application submitted successfully.' });

    } catch (emailError: any) {
      console.error('[API/Careers] ERROR: Email sending failed with the following error:');
      console.error(emailError);
      
      // Requirement 5: "If email sending fails, log the error and return a graceful response instead of a 500 error."
      return NextResponse.json({ 
        success: true, 
        message: 'Application received, but our email notification system is currently delayed. Our HR team will still review it.'
      });
    }

  } catch (globalError: any) {
    // 10. Global Error Fallback
    console.error('[API/Careers] FATAL ERROR: Unhandled exception caught at the top level.');
    console.error(globalError);
    
    // Print stack trace explicitly for debugging as requested
    if (globalError.stack) {
      console.error('[API/Careers] Stack Trace:', globalError.stack);
    }

    return NextResponse.json({ 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    }, { status: 500 });
  }
}
