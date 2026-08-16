import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract fields
    const { 
      name, 
      company, 
      email, 
      country, 
      phone, 
      serviceRequired, 
      projectDesc, 
      estimatedVolume, 
      timeline,
      source 
    } = body;

    // Basic validation
    if (!name || !email || !serviceRequired) {
      return NextResponse.json(
        { error: 'Name, email, and service requirement are required fields.' },
        { status: 400 }
      );
    }

    // 1. Save Lead to Database
    const lead = await prisma.lead.create({
      data: {
        name,
        company,
        email,
        country,
        phone,
        serviceRequired,
        projectDesc,
        estimatedVolume,
        timeline,
        source: source || 'Website Form',
        status: 'NEW',
      },
    });

    // 2. Send Email Notification
    // Configure your SMTP credentials in .env
    // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Loopernode Leads" <${process.env.SMTP_USER}>`,
        to: 'info@loopernode.in',
        subject: `New Enterprise Lead: ${company ? company + ' - ' : ''}${serviceRequired}`,
        html: `
          <h2>New Lead Captured via ${source || 'Website'}</h2>
          <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr><th align="left" width="30%">Name</th><td>${name}</td></tr>
            <tr><th align="left">Company</th><td>${company || 'N/A'}</td></tr>
            <tr><th align="left">Email</th><td>${email}</td></tr>
            <tr><th align="left">Phone</th><td>${phone || 'N/A'}</td></tr>
            <tr><th align="left">Country</th><td>${country || 'N/A'}</td></tr>
            <tr><th align="left">Service</th><td><strong>${serviceRequired}</strong></td></tr>
            <tr><th align="left">Volume</th><td>${estimatedVolume || 'N/A'}</td></tr>
            <tr><th align="left">Timeline</th><td>${timeline || 'N/A'}</td></tr>
          </table>
          <h3>Project Description</h3>
          <p>${projectDesc || 'No description provided.'}</p>
          <br/>
          <p><em>View this lead in your <a href="https://loopernode.in/admin/leads">Admin Dashboard</a>.</em></p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Lead notification email sent to info@loopernode.in');
      } catch (emailError) {
        console.error('Failed to send lead email:', emailError);
        // We don't throw here because the lead was successfully saved to the DB.
      }
    } else {
      console.warn('SMTP credentials not found in .env. Lead saved to DB, but email was not sent.');
    }

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });

  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing lead.' },
      { status: 500 }
    );
  }
}
