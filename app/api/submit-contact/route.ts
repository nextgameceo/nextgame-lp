import { NextRequest, NextResponse } from "next/server";

function validateEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

const SUPPORT_EMAIL = "support@nextgame-limited.com";
const DEFAULT_FROM = "NextGame Contact <support@nextgame-limited.com>";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const { lastname, firstname, company, email, message } = json;

  if (!lastname) {
    return NextResponse.json({ status: "error", message: "姓を入力してください" }, { status: 400 });
  }

  if (!firstname) {
    return NextResponse.json({ status: "error", message: "名を入力してください" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ status: "error", message: "メールアドレスを入力してください" }, { status: 400 });
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ status: "error", message: "メールアドレスの形式が誤っています" }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ status: "error", message: "メッセージを入力してください" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ status: "error", message: "メール送信の設定が不足しています" }, { status: 500 });
  }

  const from = process.env.RESEND_FROM ?? DEFAULT_FROM;
  const to = process.env.RESEND_TO ?? SUPPORT_EMAIL;

  const subject = `【お問い合わせ】${company ? `${company} ` : ""}${lastname}${firstname} 様`;

  const text = `
お問い合わせが届きました

氏名: ${lastname} ${firstname}
会社名: ${company ?? "-"}
メールアドレス: ${email}

メッセージ:
${message}

送信元ページ: ${request.headers.get("referer") ?? "unknown"}
`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      reply_to: email,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json(
      { status: "error", message: "メール送信失敗", error },
      { status: 502 }
    );
  }

  const result = await response.json();
  return NextResponse.json({ status: "ok", result });
}