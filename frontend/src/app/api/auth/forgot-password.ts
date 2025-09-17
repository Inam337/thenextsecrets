import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Forward the request to your backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${backendUrl}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: data.message || 'Failed to send reset link',
          error: data.error 
        }, 
        { status: response.status }
      )
    }

    // Return the backend response
    return NextResponse.json(data)
  } catch (error) {
    console.error('Forgot password API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send reset link', 
        error: 'Internal server error' 
      }, 
      { status: 500 }
    )
  }
}
