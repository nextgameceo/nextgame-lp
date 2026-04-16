import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

    let siteContent = '';
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
        signal: AbortSignal.timeout(8000),
      });
      const html = await res.text();
      siteContent = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 3000);
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
            content: `あなたはWebサイト診断とLPコピーライティングの専門家です。JSONのみ返答してください。マークダウン・コードブロック不要。`,
          },
          {
            role: 'user',
            content: `以下のWebサイトを診断し、改善版LPのプロンプトを生成してください。

URL: ${url}
コンテンツ: ${siteContent}

以下のJSON形式で返答：
{
  "score": 0から100の整数（総合評価スコア）,
  "company": "会社名またはサービス名（サイトから抽出）",
  "industry": "飲食店/美容サロン/歯科クリニック/整体院・整骨院/不動産/学習塾/EC・通販/IT・Web/建設・工務店/コンサルタント/士業/医療・クリニック/フィットネス/その他 から最も近いもの",
  "problems": [
    {"icon": "絵文字", "title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（50文字以内）"},
    {"icon": "絵文字", "title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（50文字以内）"},
    {"icon": "絵文字", "title": "問題点タイトル（15文字以内）", "desc": "具体的な説明（50文字以内）"}
  ],
  "suggestion": "改善提案のまとめ（80文字以内・具体的に）",
  "prompt": "以下の形式で150文字以上200文字以内のLP生成用プロンプト（日本語）：業種・ターゲット顧客・サービスの強み・現在の課題・解決策・希望するデザインの雰囲気を含める。例：整体院向け。ターゲットは腰痛・肩こりに悩む30〜50代のビジネスマン。強みは完全予約制のプライベート空間と国家資格保有のスタッフ。課題は新規集客不足。解決策として予約導線を強調し、信頼感のある清潔感あるデザインにしたい。"
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
