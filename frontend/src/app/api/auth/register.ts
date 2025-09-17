import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Forward the request to your backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${backendUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: data.message || 'Registration failed',
          error: data.error 
        }, 
        { status: response.status }
      )
    }

    // Return the backend response
    return NextResponse.json(data)
  } catch (error) {
    console.error('Register API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Registration failed', 
        error: 'Internal server error' 
      }, 
      { status: 500 }
    )
  }
}
