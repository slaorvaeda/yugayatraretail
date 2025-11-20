import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { fullName, email, phone, education, skills } = body;
    
    if (!fullName || !email || !phone || !education || !skills) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { message: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // TODO: Store the application in database or send notification
    // For now, we'll just log it and return success
    console.log('Internship Application Received:', {
      fullName,
      email,
      phone,
      education,
      previousExperience: body.previousExperience || 'N/A',
      skills,
      motivation: body.motivation || 'N/A',
      submittedAt: new Date().toISOString()
    });

    // In a production environment, you would:
    // 1. Store this in a database table (e.g., internship_applications)
    // 2. Send an email notification to admins
    // 3. Send a confirmation email to the applicant

    return NextResponse.json(
      { 
        message: 'Application submitted successfully',
        success: true
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing internship application:', error);
    return NextResponse.json(
      { message: 'Failed to process application. Please try again later.' },
      { status: 500 }
    );
  }
}

