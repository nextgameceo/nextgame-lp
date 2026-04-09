import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, client_name } = body;

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
業種・説明: ${content || '不明'}

以下のJSON形式で返答してください：
{
  "sub_title": "キャッチコピー（20文字以内・インパクトある一文・業種に合わせて）",
  "original": "ヒーローの説明文（40文字以内・業種に合わせた自然な一文・サービスの魅力を伝える）",
  "theme": "light" または "dark"（医療・福祉・教育・士業は"light"、IT・エンタメ・飲食・美容は"dark"）,
  "accent_color": "blue" または "green" または "orange" または "red" または "purple"（業種イメージに合わせて）,
  "unsplash_keyword": "Unsplash検索用の英語キーワード1〜2単語（例: dental clinic, coffee shop, yoga studio）",
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

    if (!groqRes.ok) throw new Error('Groq API error: ' + await groqRes.text());

    const groqData = await groqRes.json();
    const rawText = groqData.choices[0].message.content.trim();

    let ai: {
      sub_title: string;
      original: string;
      theme: string;
      accent_color: string;
      unsplash_keyword: string;
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
        sub_title: title,
        original: '',
        theme: 'light',
        accent_color: 'blue',
        unsplash_keyword: 'business office',
        features: [],
        services: [],
        reasons: [],
        cta_text: 'お問い合わせ',
        cta_sub: 'お気軽にご相談ください',
      };
    }

    // Unsplashで画像取得
    let imageUrl = '';
    try {
      const keyword = encodeURIComponent(ai.unsplash_keyword ?? 'business');
      const unsplashRes = await fetch(
        `https://api.unsplash.com/search/photos?query=${keyword}&per_page=1&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      if (unsplashRes.ok) {
        const unsplashData = await unsplashRes.json();
        imageUrl = unsplashData.results?.[0]?.urls?.regular ?? '';
      }
    } catch {
      imageUrl = '';
    }

    // microCMSに保存
    const random = Math.random().toString(36).substring(2, 8);
    const slug = `lp-${random}`;

    const colorMap: Record<string, string> = {
      blue: 'cyan', green: 'green', orange: 'orange', red: 'red', purple: 'violet',
    };
    const accentColor = colorMap[ai.accent_color] ?? 'cyan';

    const aiContent = JSON.stringify({
      theme: ai.theme,
      accent_color: ai.accent_color,
      original: ai.original,
      image_url: imageUrl,
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
          sub_title: ai.sub_title ?? title,
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
