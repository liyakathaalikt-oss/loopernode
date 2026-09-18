import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if subscriber already exists
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json({ success: true, message: 'Already subscribed' }, { status: 200 });
    }

    // Save to Database
    const subscriber = await prisma.subscriber.create({
      data: {
        email,
        source: source || 'Newsletter Form',
      },
    });

    return NextResponse.json({ success: true, subscriberId: subscriber.id }, { status: 201 });

  } catch (error) {
    console.error('Error adding subscriber:', error);
    return NextResponse.json(
      { error: 'Internal server error while subscribing.' },
      { status: 500 }
    );
  }
}
