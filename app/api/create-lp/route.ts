import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, sub_title, content, accent_color, layout, client_name } = body;

    // slugを自動生成（タイトルから + ランダム文字列）
    const random = Math.random().toString(36).substring(2, 8);
    const slug = `lp-${random}`;

    const res = await fetch(
      `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/sites`,
      {
        method: 'POST',
        headers: {
          'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          title,
          sub_title,
          content: `<p>${content.replace(/\n/g, '</p><p>')}</p>`,
          accent_color: accent_color ?? 'cyan',
          layout: layout ?? 'hero-center',
          client_name: client_name ?? '',
          is_published: true,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    return NextResponse.json({ slug });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
