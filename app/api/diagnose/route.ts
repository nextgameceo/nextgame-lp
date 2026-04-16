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
      siteTitle = titleMatch ? titleMatch[1].trim() : '';
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
            content: `あなたはWebサイト診断とリデザインの専門家です。既存サイトを深く分析し、改善版LPのための詳細なプロンプトを生成してください。JSONのみ返答。マークダウン・コードブロック不要。`,
          },
          {
            role: 'user',
            content: `以下の既存Webサイトを診断し、リデザイン用の詳細プロンプトを生成してください。

URL: ${url}
タイトル: ${siteTitle}
コンテンツ: ${siteContent}

診断のポイント：
- 現在のサイトのターゲット顧客は誰か
- 提供しているサービス・商品は何か
- 現在の強み・差別化ポイントは何か
- 改善すべき点（コピー・構成・デザイン）
- リデザインで強調すべきポイント

以下のJSON形式で返答：
{
  "score": 0から100の整数（現在のサイトの総合評価）,
  "company": "会社名またはサービス名",
  "industry": "飲食店/美容サロン/歯科クリニック/整体院・整骨院/不動産/学習塾/EC・通販/IT・Web/建設・工務店/コンサルタント/士業/医療・クリニック/フィットネス/その他 から最も近いもの",
  "problems": [
    {"title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（60文字以内）"},
    {"title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（60文字以内）"},
    {"title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（60文字以内）"}
  ],
  "suggestion": "改善提案のまとめ（100文字以内・具体的に）",
  "prompt": "リデザイン用プロンプト（200文字以上300文字以内）：現在のサービス内容・ターゲット顧客・強み・課題・改善方向性・デザインの雰囲気を具体的に記述。例：名古屋市の整体院のリデザイン。現在は腰痛・肩こり専門で30〜50代のビジネスマンがメイン顧客。強みは完全予約制プライベート空間と国家資格保有スタッフ3名。現状サイトは情報過多でCTAが弱く新規集客に課題。リデザインでは予約導線を最優先にし、口コミ・料金を前面に出す。清潔感ある白基調にシンプルなデザインで信頼感を演出したい。"
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

    if (!result) throw new Error('解析失敗');
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
