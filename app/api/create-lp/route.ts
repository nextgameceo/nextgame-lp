import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, client_name, prompt, logo_url, is_redesign } = body;

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
${is_redesign ? '既存サイトのリデザインLPを生成します。既存サイトの強みを活かしつつ、課題を解決する高品質なコンテンツを作成してください。' : '新規LP（ランディングページ）コンテンツを生成します。'}

【絶対禁止事項】
- JSON以外の出力
- 抽象的・陳腐な表現（「最先端」「高品質」「あなただけの」等）
- 回答になっていないFAQ
- 具体性のないレビュー
- 根拠のない数字

【必須要件】
- キャッチコピー：ターゲットが「これは自分のことだ」と感じる具体的な言葉
- 説明文：課題解決を丁寧に説明
- レビュー：Before→Afterの具体的な変化
- FAQ：具体的かつ詳細な回答
- 選ばれる理由：明確な差別化ポイント

全て日本語。JSONのみ返答。`,
          },
          {
            role: 'user',
            content: `以下の情報から高品質な${is_redesign ? 'リデザインLP' : 'LP'}コンテンツを生成してください。

会社名・サービス名: ${title}
業種・説明: ${content || '不明'}
${prompt ? `${is_redesign ? 'リデザイン要件' : '追加要望'}:\n${prompt}` : ''}
${client_name ? `担当者: ${client_name}` : ''}

以下のJSON形式で返答：
{
  "sub_title": "キャッチコピー（25文字以内・業種特有・感情に訴える）",
  "original": "サブキャッチ（80文字以内・ターゲットの悩みに共感・解決を示唆）",
  "theme": "light または dark",
  "accent_color": "blue/green/orange/red/purple",
  "unsplash_keyword": "英語2〜3単語（業種に最適・人物が写る写真）",
  "features": [
    {"icon_name": "lucideアイコン名（例：Zap, Shield, Heart, Star, Clock, MapPin, Phone, Mail, CheckCircle, Users, Award, TrendingUp, Sparkles, Lightbulb, Target）", "title": "特徴タイトル（15文字以内）", "desc": "説明（100文字以内・理由まで丁寧に）"},
    {"icon_name": "lucideアイコン名", "title": "特徴タイトル（15文字以内）", "desc": "説明（100文字以内）"},
    {"icon_name": "lucideアイコン名", "title": "特徴タイトル（15文字以内）", "desc": "説明（100文字以内）"}
  ],
  "services": [
    {"icon_name": "lucideアイコン名", "name": "サービス名（15文字以内）", "desc": "ベネフィット（60文字以内）", "price": "料金目安"},
    {"icon_name": "lucideアイコン名", "name": "サービス名（15文字以内）", "desc": "ベネフィット（60文字以内）", "price": "料金目安"},
    {"icon_name": "lucideアイコン名", "name": "サービス名（15文字以内）", "desc": "ベネフィット（60文字以内）", "price": "料金目安"}
  ],
  "reasons": [
    {"num": "01", "icon_name": "lucideアイコン名", "title": "選ばれる理由（18文字以内）", "desc": "根拠（120文字以内）"},
    {"num": "02", "icon_name": "lucideアイコン名", "title": "選ばれる理由（18文字以内）", "desc": "根拠（120文字以内）"},
    {"num": "03", "icon_name": "lucideアイコン名", "title": "選ばれる理由（18文字以内）", "desc": "根拠（120文字以内）"}
  ],
  "reviews": [
    {"name": "お客様名", "role": "業種・立場", "text": "Before→After（100文字以内）", "star": 5},
    {"name": "お客様名", "role": "業種・立場", "text": "Before→After（100文字以内）", "star": 5},
    {"name": "お客様名", "role": "業種・立場", "text": "Before→After（100文字以内）", "star": 5}
  ],
  "flow": [
    {"step": "01", "icon_name": "lucideアイコン名", "title": "ステップ（15文字以内）", "desc": "説明（40文字以内）"},
    {"step": "02", "icon_name": "lucideアイコン名", "title": "ステップ（15文字以内）", "desc": "説明（40文字以内）"},
    {"step": "03", "icon_name": "lucideアイコン名", "title": "ステップ（15文字以内）", "desc": "説明（40文字以内）"}
  ],
  "faq": [
    {"q": "質問（30文字以内）", "a": "回答（100文字以内・具体的）"},
    {"q": "質問（30文字以内）", "a": "回答（100文字以内）"},
    {"q": "質問（30文字以内）", "a": "回答（100文字以内）"},
    {"q": "質問（30文字以内）", "a": "回答（100文字以内）"}
  ],
  "closing": {
    "title": "クロージングメッセージ（30文字以内）",
    "body": "背中を押すメッセージ（150文字以内）",
    "guarantee": "保証・約束（40文字以内）"
  },
  "cta_text": "CTAテキスト（18文字以内）",
  "cta_sub": "CTAサブテキスト（50文字以内）"
}`,
          },
        ],
      }),
    });

    if (!groqRes.ok) throw new Error('Groq API error: ' + await groqRes.text());

    const groqData = await groqRes.json();
    const rawText = groqData.choices[0].message.content.trim();

    let ai: {
      sub_title: string; original: string; theme: string; accent_color: string;
      unsplash_keyword: string;
      features: { icon_name: string; title: string; desc: string }[];
      services: { icon_name: string; name: string; desc: string; price?: string }[];
      reasons: { num: string; icon_name: string; title: string; desc: string }[];
      reviews: { name: string; role: string; text: string; star: number }[];
      flow: { step: string; icon_name: string; title: string; desc: string }[];
      faq: { q: string; a: string }[];
      closing: { title: string; body: string; guarantee: string };
      cta_text: string; cta_sub: string;
    };

    try {
      ai = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      ai = match ? JSON.parse(match[0]) : {
        sub_title: title, original: '', theme: 'light', accent_color: 'blue',
        unsplash_keyword: 'professional business',
        features: [], services: [], reasons: [], reviews: [], flow: [], faq: [],
        closing: { title: '', body: '', guarantee: '' },
        cta_text: 'お問い合わせ', cta_sub: 'お気軽にご相談ください',
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
        const data = await unsplashRes.json();
        const results = data.results ?? [];
        const idx = Math.floor(Math.random() * Math.min(results.length, 5));
        imageUrl = results[idx]?.urls?.regular ?? '';
      }
    } catch { imageUrl = ''; }

    const random = Math.random().toString(36).substring(2, 8);
    const slug = `lp-${random}`;
    const colorMap: Record<string, string> = {
      blue: 'cyan', green: 'green', orange: 'orange', red: 'red', purple: 'violet',
    };

    const aiContent = JSON.stringify({
      theme: ai.theme, accent_color: ai.accent_color,
      original: ai.original, image_url: imageUrl, logo_url: logo_url ?? '',
      is_redesign: is_redesign ?? false,
      features: ai.features, services: ai.services, reasons: ai.reasons,
      reviews: ai.reviews ?? [], flow: ai.flow ?? [], faq: ai.faq ?? [],
      closing: ai.closing ?? null, cta_text: ai.cta_text, cta_sub: ai.cta_sub,
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
          slug, title, sub_title: ai.sub_title ?? title,
          content: aiContent,
          accent_color: [colorMap[ai.accent_color] ?? 'cyan'],
          layout: ['hero-center'], client_name: client_name ?? '',
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
