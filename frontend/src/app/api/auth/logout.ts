import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Forward the request to your backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${backendUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: data.message || 'Logout failed',
          error: data.error 
        }, 
        { status: response.status }
      )
    }

    // Return the backend response
    return NextResponse.json(data)
  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Logout failed', 
        error: 'Internal server error' 
      }, 
      { status: 500 }
    )
  }
}