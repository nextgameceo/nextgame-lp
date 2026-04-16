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
中小企業・個人事業主向けのLP（ランディングページ）コンテンツを生成します。

【絶対禁止事項】
- JSON以外の出力（マークダウン・コードブロック・説明文は一切不要）
- 「あなただけの」「最先端」「高品質」などの抽象的・陳腐な表現
- 「詳細はお問い合わせください」のような回答になっていないFAQ
- 「サービスが良かったです」のような具体性のないレビュー
- 架空の具体的数字（「売上200%UP」等の根拠ない数字）

【必須要件】
- キャッチコピー：その業種のターゲットが「これは自分のことだ」と感じる具体的な言葉
- 説明文：なぜそのサービスが必要なのか、どんな課題を解決するのかを丁寧に説明
- レビュー：「〇〇に悩んでいたが、△△が改善された」など具体的なBefore→After
- FAQ：質問に対して具体的かつ詳細に答える
- サービス料金：その業種の実際の相場感に合わせた現実的な金額
- 選ばれる理由：他社との明確な差別化（「経験豊富」「高品質」はNG）
- closing：読者の背中を優しく押す温かいメッセージ

全て日本語。JSONのみ返答。`,
          },
          {
            role: 'user',
            content: `以下の情報から高品質なLPコンテンツを生成してください。

会社名・サービス名: ${title}
業種・説明: ${content || '不明'}
${prompt ? `追加要望・ターゲット・強み・課題・デザイン:\n${prompt}` : ''}
${client_name ? `担当者: ${client_name}` : ''}

以下のJSON形式で返答してください：
{
  "sub_title": "キャッチコピー（20文字以内・業種特有・感情に訴える）",
  "original": "サブキャッチ（80文字以内・ターゲットの悩みに深く共感し、このサービスで解決できると感じさせる）",
  "theme": "light または dark（医療・福祉・教育・士業・コンサルはlight、IT・エンタメ・飲食・美容・スポーツはdark）",
  "accent_color": "blue/green/orange/red/purple のいずれか（業種イメージに合わせて）",
  "unsplash_keyword": "英語2〜3単語（業種に最適な写真・人物が写っているものが望ましい）",
  "features": [
    {"icon": "絵文字", "title": "特徴タイトル（15文字以内）", "desc": "具体的な説明（100文字以内・なぜそれが強みなのか理由まで丁寧に書く）"},
    {"icon": "絵文字", "title": "特徴タイトル（15文字以内）", "desc": "具体的な説明（100文字以内・なぜそれが強みなのか理由まで丁寧に書く）"},
    {"icon": "絵文字", "title": "特徴タイトル（15文字以内）", "desc": "具体的な説明（100文字以内・なぜそれが強みなのか理由まで丁寧に書く）"}
  ],
  "services": [
    {"name": "サービス名（15文字以内）", "desc": "お客様が得られる具体的なベネフィット（60文字以内）", "price": "料金目安（例：月額3万円〜、1回5,000円〜）"},
    {"name": "サービス名（15文字以内）", "desc": "お客様が得られる具体的なベネフィット（60文字以内）", "price": "料金目安"},
    {"name": "サービス名（15文字以内）", "desc": "お客様が得られる具体的なベネフィット（60文字以内）", "price": "料金目安"}
  ],
  "reasons": [
    {"num": "01", "title": "選ばれる理由（18文字以内・競合差別化）", "desc": "具体的な根拠（120文字以内・エピソード・保証・サポート体制を含める）"},
    {"num": "02", "title": "選ばれる理由（18文字以内・競合差別化）", "desc": "具体的な根拠（120文字以内・エピソード・保証・サポート体制を含める）"},
    {"num": "03", "title": "選ばれる理由（18文字以内・競合差別化）", "desc": "具体的な根拠（120文字以内・エピソード・保証・サポート体制を含める）"}
  ],
  "reviews": [
    {"name": "お客様名（山田様など）", "role": "業種・立場", "text": "Before→Afterの具体的な変化（100文字以内・リアルな口コミ）", "star": 5},
    {"name": "お客様名", "role": "業種・立場", "text": "Before→Afterの具体的な変化（100文字以内・リアルな口コミ）", "star": 5},
    {"name": "お客様名", "role": "業種・立場", "text": "Before→Afterの具体的な変化（100文字以内・リアルな口コミ）", "star": 5}
  ],
  "flow": [
    {"step": "01", "title": "ステップタイトル（15文字以内）", "desc": "具体的な説明（40文字以内）"},
    {"step": "02", "title": "ステップタイトル（15文字以内）", "desc": "具体的な説明（40文字以内）"},
    {"step": "03", "title": "ステップタイトル（15文字以内）", "desc": "具体的な説明（40文字以内）"}
  ],
  "faq": [
    {"q": "よくある質問（30文字以内）", "a": "具体的で詳細な回答（100文字以内・安心感を与える・次のアクションを促す）"},
    {"q": "よくある質問（30文字以内）", "a": "具体的で詳細な回答（100文字以内・安心感を与える・次のアクションを促す）"},
    {"q": "よくある質問（30文字以内）", "a": "具体的で詳細な回答（100文字以内・安心感を与える・次のアクションを促す）"},
    {"q": "よくある質問（30文字以内）", "a": "具体的で詳細な回答（100文字以内・安心感を与える・次のアクションを促す）"}
  ],
  "closing": {
    "title": "迷っている方へのメッセージ（30文字以内・背中を押す温かい言葉）",
    "body": "クロージングメッセージ（150文字以内・不安を解消し行動を促す・保証・サポートを強調・温かいトーン）",
    "guarantee": "保証・約束（40文字以内・例：初回相談無料・返金保証・営業電話なし）"
  },
  "cta_text": "CTAボタンテキスト（18文字以内・動詞始まり）",
  "cta_sub": "CTAサブテキスト（50文字以内・安心感・次のアクションを明確に）"
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
      flow: { step: string; title: string; desc: string }[];
      faq: { q: string; a: string }[];
      closing: { title: string; body: string; guarantee: string };
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
        flow: [],
        faq: [],
        closing: { title: '', body: '', guarantee: '' },
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
      flow: ai.flow ?? [],
      faq: ai.faq ?? [],
      closing: ai.closing ?? null,
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
