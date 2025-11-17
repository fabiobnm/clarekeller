import { NextResponse } from 'next/server';
import { subscribeToMailerLite } from '@/lib/mailerlite';

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  try {
    const { email, name, honeypot } = await req.json();

    // honeypot anti-bot
    if (honeypot && String(honeypot).trim() !== '') {
      return NextResponse.json({ ok: true }); // ignora i bot
    }

    if (!email || !isEmail(email)) {
      return NextResponse.json({ ok: false, error: 'EMAIL_INVALID' }, { status: 400 });
    }

    await subscribeToMailerLite({ email, name });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'UNEXPECTED' }, { status: 500 });
  }
}
