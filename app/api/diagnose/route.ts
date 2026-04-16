import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

    // サイトの内容を取得
    let siteContent = '';
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(8000),
      });
      const html = await res.text();
      // HTMLタグを除去してテキストだけ抽出
      siteContent = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 3000);
    } catch {
      siteContent = 'サイトの取得に失敗しました。URLが正しいか確認してください。';
    }

    // Groqで診断
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: `あなたはWebサイト診断の専門家です。与えられたサイトのテキスト内容を分析して、JSON形式のみで返答してください。マークダウンやコードブロックは使わないでください。`,
          },
          {
            role: 'user',
            content: `以下のWebサイトのコンテンツを診断してください。

URL: ${url}
コンテンツ: ${siteContent}

以下のJSON形式で返答してください：
{
  "score": 0から100の整数（サイトの総合スコア）,
  "company": "会社名またはサービス名（不明な場合は空文字）",
  "industry": "業種（飲食店/美容サロン/歯科クリニック/整体院・整骨院/不動産/学習塾/EC・通販/IT・Web/建設・工務店/その他 から最も近いもの）",
  "problems": [
    {"icon": "絵文字", "title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（40文字以内）"},
    {"icon": "絵文字", "title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（40文字以内）"},
    {"icon": "絵文字", "title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（40文字以内）"}
  ],
  "suggestion": "NEXTGAMEによる改善提案（60文字以内・具体的に）"
}`,
          },
        ],
      }),
    });

    if (!groqRes.ok) throw new Error('Groq API error');

    const groqData = await groqRes.json();
    const rawText = groqData.choices[0].message.content.trim();

    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      result = match ? JSON.parse(match[0]) : null;
    }

    if (!result) throw new Error('診断結果の解析に失敗しました');

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
