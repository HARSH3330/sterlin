import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { comparePassword, setAuthCookie } from '@/lib/auth';
import { findFallbackUser, isDatabaseUnavailable } from '@/lib/fallbackAuthStore';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    let user;

    try {
      const db = getDb();
      user = await db.user.findUnique({ where: { email: normalizedEmail } });
    } catch (dbError) {
      if (!isDatabaseUnavailable(dbError)) throw dbError;

      console.error('Login database unavailable, using fallback auth:', dbError.message);
      const fallbackUser = await findFallbackUser(normalizedEmail, password);

      if (!fallbackUser) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      await setAuthCookie(fallbackUser);
      return NextResponse.json({ user: fallbackUser });
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
    await setAuthCookie(userData);

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
