　import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

    let siteContent = '';
    let siteTitle = '';
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
        signal: AbortSignal.timeout(8000),
      });
      const html = await res.text();
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      siteTitle = titleMatch?.[1]?.trim() ?? '';
      siteContent = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 4000);
    } catch {
      siteContent = 'サイトの取得に失敗しました。';
    }

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: `あなたはWebサイト診断とリデザインの専門家です。以下の既存Webサイトを診断し、リデザイン用の詳細プロンプトを生成してください。JSONのみ返答。マークダウン不要。

URL: ${url}
タイトル: ${siteTitle}
コンテンツ: ${siteContent}

【重要】既存サイトの内容・業種・ターゲット・サービスを深く分析して、改善版LPのプロンプトを生成してください。

以下のJSON形式で返答：
{
  "score": 0から100の整数（現在のサイトの総合評価）,
  "company": "会社名またはサービス名",
  "industry": "飲食店/美容サロン/歯科クリニック/整体院・整骨院/不動産/学習塾/EC・通販/IT・Web/建設・工務店/コンサルタント/士業/医療・クリニック/フィットネス/その他",
  "problems": [
    {"title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（60文字以内）"},
    {"title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（60文字以内）"},
    {"title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（60文字以内）"}
  ],
  "suggestion": "改善提案のまとめ（100文字以内・具体的に）",
  "prompt": "リデザイン用プロンプト（200文字以上・以下を全て含める：①業種と具体的なサービス内容 ②ターゲット顧客の悩みと属性 ③既存サイトの強み ④改善すべき課題 ⑤希望するデザイン方向性 ⑥強調したいメッセージ）"
}`,
          },
        ],
      }),
    });

    if (!claudeRes.ok) {
      const errText = await claudeRes.text();
      throw new Error('Claude API error: ' + errText);
    }

    const claudeData = await claudeRes.json();
    const rawText = claudeData.content[0].text.trim();

    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      result = match ? JSON.parse(match[0]) : null;
    }

    if (!result) throw new Error('解析失敗');
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
