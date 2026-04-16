import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, client_name, prompt } = body;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.85,
        messages: [
          {
            role: 'system',
            content: `あなたは日本最高峰のWebコピーライター兼マーケターです。
中小企業・個人事業主向けのLP（ランディングページ）を生成します。

【絶対に守るルール】
1. JSONのみ返答。マークダウン・コードブロック・説明文は一切不要
2. 全て日本語で記述
3. 架空の数字・実績は使わない（「〇〇%向上」等はNG）
4. 業種特有のリアルな言葉を使う
5. ターゲット顧客の悩み・不安・願望を深く理解して書く

【高品質なコピーの条件】
- キャッチコピー：読んだ瞬間に「これは自分のことだ」と感じさせる
- 特徴：抽象的な表現ではなく、具体的なサービス内容
- 選ばれる理由：他社との明確な差別化ポイント
- FAQ：実際にお客様から聞かれる質問を想定
- 料金：業種の相場感に合わせた現実的な価格帯`,
          },
          {
            role: 'user',
            content: `以下の情報から高品質なLPコンテンツを生成してください。

会社名・サービス名: ${title}
業種・説明: ${content || '不明'}
${prompt ? `追加要望: ${prompt}` : ''}
${client_name ? `担当者: ${client_name}` : ''}

以下のJSON形式で返答してください：
{
  "sub_title": "キャッチコピー（20文字以内・業種特有の言葉・感情に訴える）",
  "original": "サブキャッチ（60文字以内・ターゲットの悩みに共感・解決を示唆）",
  "theme": "light または dark",
  "accent_color": "blue/green/orange/red/purple のいずれか",
  "unsplash_keyword": "英語2〜3単語（業種に最適な写真）",
  "features": [
    {"icon": "絵文字", "title": "特徴（15文字以内）", "desc": "具体的な説明（45文字以内）"},
    {"icon": "絵文字", "title": "特徴（15文字以内）", "desc": "具体的な説明（45文字以内）"},
    {"icon": "絵文字", "title": "特徴（15文字以内）", "desc": "具体的な説明（45文字以内）"}
  ],
  "services": [
    {"name": "サービス名（15文字以内）", "desc": "説明（35文字以内）", "price": "料金目安（例：月額3万円〜）"},
    {"name": "サービス名（15文字以内）", "desc": "説明（35文字以内）", "price": "料金目安"},
    {"name": "サービス名（15文字以内）", "desc": "説明（35文字以内）", "price": "料金目安"}
  ],
  "reasons": [
    {"num": "01", "title": "選ばれる理由（18文字以内）", "desc": "根拠（50文字以内）"},
    {"num": "02", "title": "選ばれる理由（18文字以内）", "desc": "根拠（50文字以内）"},
    {"num": "03", "title": "選ばれる理由（18文字以内）", "desc": "根拠（50文字以内）"}
  ],
  "reviews": [
    {"name": "架空のお客様名（山田様など）", "role": "業種・立場", "text": "リアルな口コミ（60文字以内・具体的な変化）", "star": 5},
    {"name": "架空のお客様名", "role": "業種・立場", "text": "リアルな口コミ（60文字以内）", "star": 5},
    {"name": "架空のお客様名", "role": "業種・立場", "text": "リアルな口コミ（60文字以内）", "star": 5}
  ],
  "faq": [
    {"q": "よくある質問（30文字以内）", "a": "回答（60文字以内・安心感を与える）"},
    {"q": "よくある質問（30文字以内）", "a": "回答（60文字以内）"},
    {"q": "よくある質問（30文字以内）", "a": "回答（60文字以内）"}
  ],
  "cta_text": "CTAボタンテキスト（18文字以内・動詞始まり）",
  "cta_sub": "CTAサブテキスト（40文字以内・安心感）"
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
      services: { name: string; desc: string; price?: string }[];
      reasons: { num: string; title: string; desc: string }[];
      reviews: { name: string; role: string; text: string; star: number }[];
      faq: { q: string; a: string }[];
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
        unsplash_keyword: 'professional business team',
        features: [],
        services: [],
        reasons: [],
        reviews: [],
        faq: [],
        cta_text: 'お問い合わせはこちら',
        cta_sub: 'お気軽にご相談ください',
      };
    }

    let imageUrl = '';
    try {
      const keyword = encodeURIComponent(ai.unsplash_keyword ?? 'business professional');
      const unsplashRes = await fetch(
        `https://api.unsplash.com/search/photos?query=${keyword}&per_page=5&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` } }
      );
      if (unsplashRes.ok) {
        const unsplashData = await unsplashRes.json();
        const results = unsplashData.results ?? [];
        const idx = Math.floor(Math.random() * Math.min(results.length, 5));
        imageUrl = results[idx]?.urls?.regular ?? '';
      }
    } catch {
      imageUrl = '';
    }

    const random = Math.random().toString(36).substring(2, 8);
    const slug = `lp-${random}`;

    const colorMap: Record<string, string> = {
      blue: 'cyan', green: 'green', orange: 'orange', red: 'red', purple: 'violet',
    };

    const aiContent = JSON.stringify({
      theme: ai.theme,
      accent_color: ai.accent_color,
      original: ai.original,
      image_url: imageUrl,
      features: ai.features,
      services: ai.services,
      reasons: ai.reasons,
      reviews: ai.reviews ?? [],
      faq: ai.faq ?? [],
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
          accent_color: [colorMap[ai.accent_color] ?? 'cyan'],
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
