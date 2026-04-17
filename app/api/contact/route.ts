import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name, email, phone, message,
      diag_url, diag_score, diag_company, diag_prompt,
      mockup_url, is_redesign,
    } = body;

    const subject = is_redesign
      ? '【リデザイン相談】' + (diag_company || name) + ' / スコア' + diag_score
      : '【お問い合わせ】' + name;

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fff;">
  <div style="background:linear-gradient(135deg,#c8a84a,#e8d48a);padding:20px 24px;border-radius:12px 12px 0 0;">
    <h1 style="color:#000;font-size:18px;margin:0;">
      ${is_redesign ? 'リデザイン相談が届きました' : '新しいお問い合わせが届きました'}
    </h1>
  </div>
  <div style="background:#f8f8f8;padding:24px;border-radius:0 0 12px 12px;">
    <h2 style="font-size:14px;color:#888;margin:0 0 16px;letter-spacing:0.1em;">お客様情報</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr>
        <td style="padding:10px 12px;background:#fff;font-weight:700;width:130px;font-size:13px;border:1px solid #eee;">お名前・会社名</td>
        <td style="padding:10px 12px;background:#fff;font-size:13px;border:1px solid #eee;">${name}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;background:#fafafa;font-weight:700;font-size:13px;border:1px solid #eee;">メール</td>
        <td style="padding:10px 12px;background:#fafafa;font-size:13px;border:1px solid #eee;">${email || '未入力'}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;background:#fff;font-weight:700;font-size:13px;border:1px solid #eee;">電話番号</td>
        <td style="padding:10px 12px;background:#fff;font-size:13px;border:1px solid #eee;">${phone || '未入力'}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;background:#fafafa;font-weight:700;font-size:13px;border:1px solid #eee;">ご相談内容</td>
        <td style="padding:10px 12px;background:#fafafa;font-size:13px;white-space:pre-wrap;border:1px solid #eee;">${message || '未入力'}</td>
      </tr>
    </table>

    ${is_redesign ? `
    <h2 style="font-size:14px;color:#c8a84a;margin:0 0 16px;letter-spacing:0.1em;">診断情報</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr>
        <td style="padding:10px 12px;background:#fffbf0;font-weight:700;width:130px;font-size:13px;border:1px solid #f0e8c8;">診断URL</td>
        <td style="padding:10px 12px;background:#fffbf0;font-size:13px;border:1px solid #f0e8c8;word-break:break-all;">
          <a href="${diag_url}" style="color:#c8a84a;">${diag_url}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 12px;background:#fff8e6;font-weight:700;font-size:13px;border:1px solid #f0e8c8;">診断スコア</td>
        <td style="padding:10px 12px;background:#fff8e6;font-size:20px;font-weight:900;border:1px solid #f0e8c8;color:#c8a84a;">${diag_score}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;background:#fffbf0;font-weight:700;font-size:13px;border:1px solid #f0e8c8;">モックアップ</td>
        <td style="padding:10px 12px;background:#fffbf0;font-size:13px;border:1px solid #f0e8c8;word-break:break-all;">
          <a href="${mockup_url}" style="color:#c8a84a;">${mockup_url}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 12px;background:#fff8e6;font-weight:700;font-size:13px;border:1px solid #f0e8c8;">改善プロンプト</td>
        <td style="padding:10px 12px;background:#fff8e6;font-size:12px;white-space:pre-wrap;border:1px solid #f0e8c8;color:#666;">${diag_prompt}</td>
      </tr>
    </table>
    ` : ''}

    <div style="background:#000;border-radius:8px;padding:14px 18px;text-align:center;">
      <p style="color:#c8a84a;font-size:11px;letter-spacing:0.1em;margin:0;">Powered by NEXTGAME株式会社</p>
    </div>
  </div>
</body>
</html>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: 'nextgamecoo@gmail.com',
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
