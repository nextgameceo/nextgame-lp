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
        temperature: 0.8,
        messages: [
          {
            role: 'system',
            content: `あなたは日本トップクラスのWebコピーライター兼マーケターです。
中小企業・個人事業主向けのLP（ランディングページ）コンテンツを生成します。
以下の原則を必ず守ってください：

【コピーライティング原則】
- キャッチコピーは感情に訴える・具体的な数字を使う・ベネフィットを明確に
- 「です・ます」より体言止めや短い文で力強く
- ターゲットの悩み・不安・願望を具体的に反映する
- 競合との差別化ポイントを明確にする
- CTAは行動を促す動詞で始める

【品質基準】
- キャッチコピー：思わず読み続けたくなる、業種特有の表現を使う
- 特徴：具体的な数字・事実ベース・信頼性を高める内容
- サービス：お客様目線のベネフィット訴求
- 選ばれる理由：競合との明確な差別化

必ずJSON形式のみで返答し、マークダウンやコードブロックは絶対に使わないでください。`,
          },
          {
            role: 'user',
            content: `以下の情報から高品質なLPコンテンツを生成してください。

【基本情報】
会社名・サービス名: ${title}
業種・説明: ${content || '不明'}
${prompt ? `【追加要望・改善点】\n${prompt}` : ''}
${client_name ? `【担当者名】${client_name}` : ''}

【重要】業種・サービスの特性を深く理解して、その業界で刺さるコピーを書いてください。
ターゲット顧客が抱える具体的な悩みや不安を解消するメッセージにしてください。

以下のJSON形式で返答してください：
{
  "sub_title": "キャッチコピー（25文字以内・数字や具体性を含む・感情に訴える・業種特有の表現）",
  "original": "サブキャッチコピー（50文字以内・ターゲットの悩みに寄り添う・共感を呼ぶ文章）",
  "theme": "light または dark（医療・福祉・教育・士業・コンサルは light、IT・エンタメ・飲食・美容・スポーツは dark）",
  "accent_color": "blue または green または orange または red または purple（業種イメージに合わせて）",
  "unsplash_keyword": "Unsplash検索用の英語キーワード2〜3単語（業種に最適な写真・人物が写っているものが望ましい）",
  "features": [
    {"icon": "絵文字1つ", "title": "特徴タイトル（12文字以内・ベネフィット訴求）", "desc": "具体的な説明（40文字以内・数字や実績を含める）"},
    {"icon": "絵文字1つ", "title": "特徴タイトル（12文字以内・ベネフィット訴求）", "desc": "具体的な説明（40文字以内・数字や実績を含める）"},
    {"icon": "絵文字1つ", "title": "特徴タイトル（12文字以内・ベネフィット訴求）", "desc": "具体的な説明（40文字以内・数字や実績を含める）"}
  ],
  "services": [
    {"name": "サービス名（12文字以内・お客様目線）", "desc": "ベネフィット中心の説明（30文字以内）"},
    {"name": "サービス名（12文字以内・お客様目線）", "desc": "ベネフィット中心の説明（30文字以内）"},
    {"name": "サービス名（12文字以内・お客様目線）", "desc": "ベネフィット中心の説明（30文字以内）"}
  ],
  "reasons": [
    {"num": "01", "title": "選ばれる理由（18文字以内・競合差別化）", "desc": "具体的な根拠（45文字以内・数字・実績・保証）"},
    {"num": "02", "title": "選ばれる理由（18文字以内・競合差別化）", "desc": "具体的な根拠（45文字以内・数字・実績・保証）"},
    {"num": "03", "title": "選ばれる理由（18文字以内・競合差別化）", "desc": "具体的な根拠（45文字以内・数字・実績・保証）"}
  ],
  "cta_text": "行動を促すCTAボタンテキスト（18文字以内・動詞で始める）",
  "cta_sub": "CTAの補足文（35文字以内・安心感・緊急性・限定性）"
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
        unsplash_keyword: 'professional business',
        features: [],
        services: [],
        reasons: [],
        cta_text: 'お問い合わせはこちら',
        cta_sub: 'お気軽にご相談ください',
      };
    }

    // Unsplashで画像取得
    let imageUrl = '';
    try {
      const keyword = encodeURIComponent(ai.unsplash_keyword ?? 'business professional');
      const unsplashRes = await fetch(
        `https://api.unsplash.com/search/photos?query=${keyword}&per_page=3&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` } }
      );
      if (unsplashRes.ok) {
        const unsplashData = await unsplashRes.json();
        // ランダムに1枚選ぶ
        const results = unsplashData.results ?? [];
        const idx = Math.floor(Math.random() * Math.min(results.length, 3));
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
