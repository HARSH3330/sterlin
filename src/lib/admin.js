import { NextResponse } from 'next/server';
import { getAuthUser } from './auth';

export async function requireAdmin() {
  const user = await getAuthUser();
  if (!user || user.role !== 'admin') {
    return {
      user: null,
      response: NextResponse.json({ error: 'Admin access required' }, { status: 403 }),
    };
  }

  return { user, response: null };
}
