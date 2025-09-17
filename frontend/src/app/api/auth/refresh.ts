import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.ACCESS_SECRET!
const REFRESH_SECRET = process.env.REFRESH_SECRET!

export async function POST(req: Request) {
  const refreshToken = req.headers.get('cookie')?.match(/refreshToken=([^;]+)/)?.[1]
  if (!refreshToken) return NextResponse.json({ message: 'No refresh token' }, { status: 401 })

  try {
    const user = jwt.verify(refreshToken, REFRESH_SECRET) as any
    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, ACCESS_SECRET, { expiresIn: '15m' })
    return NextResponse.json({ accessToken: newAccessToken })
  } catch {
    return NextResponse.json({ message: 'Invalid refresh token' }, { status: 403 })
  }
}
