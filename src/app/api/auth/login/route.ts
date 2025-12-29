import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://api-ncrp.mha.gov.in/api/Auth/login';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log(`[Auth] Login attempt for: ${body.email}`);

    const response = await fetch(EXTERNAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`[Auth] Login failed for ${body.email}: ${data.message}`);
      return NextResponse.json(
        { error: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    console.log(`[Auth] Login successful for: ${body.email}`);

    // Create response with token in cookie
    const res = NextResponse.json(data, { status: 200 });
    
    if (data.token) {
      res.cookies.set('authToken', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
      });
    }

    return res;
  } catch (error) {
    console.error('[Auth] Proxy API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
