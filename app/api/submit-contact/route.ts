import { NextRequest, NextResponse } from 'next/server';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const DEFAULT_FROM = 'NEXTGAME <support@nextgame-limited.com>';
const SUPPORT_EMAIL = 'support@nextgame-limited.com';

export async function POST(request: NextRequest) {
  try {
    const { name, company, email, summary, message } = await request.json();

    // バリデーション
    if (!name) return NextResponse.json({ status: 'error', message: 'お名前を入力してください' }, { status: 400 });
    if (!email) return NextResponse.json({ status: 'error', message: 'メールアドレスを入力してください' }, { status: 400 });
    if (!validateEmail(email)) return NextResponse.json({ status: 'error', message: 'メールアドレスの形式が正しくありません' }, { status: 400 });
    if (!summary) return NextResponse.json({ status: 'error', message: '相談概要を入力してください' }, { status: 400 });

    // ── Step1: Googleスプレッドシートに保存 ──
    const gasUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (gasUrl) {
      await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, summary, message }),
      }).catch(err => console.error('GAS error:', err));
    }

    // ── Step2: Resendでメール通知 ──
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ status: 'error', message: 'メール設定が不足しています' }, { status: 500 });
    }

    const from = process.env.RESEND_FROM ?? DEFAULT_FROM;
    const to = process.env.RESEND_TO ?? SUPPORT_EMAIL;
    const subject = `【相談】${company ? `${company} ` : ''}${name} 様`;
    const text = `
新しいお問い合わせが届きました。

━━━━━━━━━━━━━━━━━━
お名前：${name}
会社名：${company || '-'}
メール：${email}
相談概要：${summary}
メッセージ：${message || '-'}
━━━━━━━━━━━━━━━━━━

スプレッドシート：https://docs.google.com/spreadsheets/d/1T4dBcYd_3Mhlee-lPwl7OUkS5Vw007zJ-VAi4QtrnVc/edit
    `.trim();

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, text, reply_to: email }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error('Resend error:', err);
    }

    return NextResponse.json({ status: 'ok' });

  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ status: 'error', message: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
