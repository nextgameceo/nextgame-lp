import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, sub_title, content, client_name } = body;

    // ── Step1: GroqでAIコンテンツ生成 ──
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
            content: `あなたはLP（ランディングページ）のコンテンツ生成の専門家です。
与えられた会社・サービス情報から、魅力的なLPコンテンツをJSON形式で生成してください。
必ずJSON形式のみで返答し、マークダウンやコードブロックは使わないでください。`,
          },
          {
            role: 'user',
            content: `以下の情報からLPコンテンツを生成してください。

会社名・サービス名: ${title}
キャッチコピー: ${sub_title}
説明文: ${content}

以下のJSON形式で返答してください：
{
  "theme": "light" または "dark"（業種に合わせて選択。医療・福祉・教育は"light"、IT・エンタメ・飲食は"dark"）,
  "accent_color": "blue" または "green" または "orange" または "red" または "purple"（業種イメージに合わせて）,
  "features": [
    {"icon": "絵文字1つ", "title": "特徴タイトル（10文字以内）", "desc": "説明文（30文字以内）"},
    {"icon": "絵文字1つ", "title": "特徴タイトル（10文字以内）", "desc": "説明文（30文字以内）"},
    {"icon": "絵文字1つ", "title": "特徴タイトル（10文字以内）", "desc": "説明文（30文字以内）"}
  ],
  "services": [
    {"name": "サービス名（10文字以内）", "desc": "説明（25文字以内）"},
    {"name": "サービス名（10文字以内）", "desc": "説明（25文字以内）"},
    {"name": "サービス名（10文字以内）", "desc": "説明（25文字以内）"}
  ],
  "reasons": [
    {"num": "01", "title": "選ばれる理由（15文字以内）", "desc": "説明（40文字以内）"},
    {"num": "02", "title": "選ばれる理由（15文字以内）", "desc": "説明（40文字以内）"},
    {"num": "03", "title": "選ばれる理由（15文字以内）", "desc": "説明（40文字以内）"}
  ],
  "cta_text": "問い合わせボタンのテキスト（15文字以内）",
  "cta_sub": "CTAの補足文（30文字以内）"
}`,
          },
        ],
      }),
    });

    if (!groqRes.ok) {
      throw new Error('Groq API error: ' + await groqRes.text());
    }

    const groqData = await groqRes.json();
    const rawText = groqData.choices[0].message.content.trim();
    
    let ai: {
      theme: string;
      accent_color: string;
      features: { icon: string; title: string; desc: string }[];
      services: { name: string; desc: string }[];
      reasons: { num: string; title: string; desc: string }[];
      cta_text: string;
      cta_sub: string;
    };

    try {
      ai = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      ai = match ? JSON.parse(match[0]) : {
        theme: 'light',
        accent_color: 'blue',
        features: [],
        services: [],
        reasons: [],
        cta_text: 'お問い合わせ',
        cta_sub: 'お気軽にご相談ください',
      };
    }

    // ── Step2: microCMSに保存 ──
    const random = Math.random().toString(36).substring(2, 8);
    const slug = `lp-${random}`;

    // accent_colorをmicroCMSのセレクト形式に変換
    const colorMap: Record<string, string> = {
      blue: 'cyan', green: 'green', orange: 'orange', red: 'red', purple: 'violet',
    };
    const accentColor = colorMap[ai.accent_color] ?? 'cyan';

    // AI生成コンテンツをJSON文字列としてcontentフィールドに保存
    const aiContent = JSON.stringify({
      theme: ai.theme,
      accent_color: ai.accent_color,
      original: content,
      features: ai.features,
      services: ai.services,
      reasons: ai.reasons,
      cta_text: ai.cta_text,
      cta_sub: ai.cta_sub,
    });

    const cmsRes = await fetch(
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
          content: aiContent,
          accent_color: [accentColor],
          layout: ['hero-center'],
          client_name: client_name ?? '',
          is_published: true,
        }),
      }
    );

    if (!cmsRes.ok) {
      const err = await cmsRes.text();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    return NextResponse.json({ slug });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
