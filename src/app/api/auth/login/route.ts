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
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    console.log(`[Auth] External API response status: ${response.status}`);

    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error(`[Auth] Non-JSON response: ${text}`);
      return NextResponse.json(
        { error: 'Invalid response from authentication server' },
        { status: 502 }
      );
    }

    if (!response.ok) {
      console.error(`[Auth] Login failed for ${body.email}:`, data);
      return NextResponse.json(
        { error: data.message || data.error || 'Login failed' },
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
        path: '/',
      });
    }

    return res;
  } catch (error: any) {
    console.error('[Auth] Proxy API error:', error);
    console.error('[Auth] Error details:', {
      message: error?.message,
      stack: error?.stack,
      cause: error?.cause,
    });
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}
