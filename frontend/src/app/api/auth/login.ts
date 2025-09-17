import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const ACCESS_SECRET = process.env.ACCESS_SECRET!
const REFRESH_SECRET = process.env.REFRESH_SECRET!

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // ✅ Normally you'd look up the user from DB
  if (email !== 'test@example.com' || password !== '123456') {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  const user = { id: 1, email }

  const accessToken = jwt.sign(user, ACCESS_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign(user, REFRESH_SECRET, { expiresIn: '7d' })

  const res = NextResponse.json({ user, accessToken })

  // Set refresh token as HTTP-only cookie
  res.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  })

  return res
}
