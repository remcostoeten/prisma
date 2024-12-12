import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // Verify state
  const storedState = cookies().get('oauth_state')?.value;
  if (state !== storedState) {
    return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
  }

  // Exchange code for token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  // Get user info
  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: 'application/json',
    },
  });

  const userData = await userResponse.json();

  // Get user email
  const emailResponse = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: 'application/json',
    },
  });

  const emailData = await emailResponse.json();
  const primaryEmail = emailData.find((email: any) => email.primary)?.email;

  // Find or create user
  let user = await prisma.user.findUnique({ where: { email: primaryEmail } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: primaryEmail,
        name: userData.name || userData.login,
        image: userData.avatar_url,
        provider: 'github',
      },
    });
  }

  // Create JWT
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secretKey);

  // Set cookie and redirect
  cookies().set('token', token, { httpOnly: true });
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
}


