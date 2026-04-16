import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, client_name, prompt, logo_url, is_redesign } = body;

    // STEP1: Groqで構造・業種分析
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
            content: `あなたはWebマーケティングの分析専門家です。JSONのみ返答。マークダウン不要。`,
          },
          {
            role: 'user',
            content: `以下の情報からLP生成のための詳細分析をしてください。

会社名: ${title}
業種・説明: ${content || '不明'}
${prompt ? `要望・分析結果:\n${prompt}` : ''}
${is_redesign ? 'これはリデザイン案件です。' : ''}

以下のJSON形式で返答：
{
  "industry": "業種（具体的に）",
  "target_persona": "ターゲット顧客の詳細（年齢・性別・職業・悩み・願望）",
  "main_value": "このサービスの最大の価値提案",
  "pain_points": ["悩み1", "悩み2", "悩み3"],
  "differentiators": ["差別化ポイント1", "差別化ポイント2", "差別化ポイント3"],
  "tone": "コピーのトーン（例：信頼感・温かみ・プロフェッショナル・親しみやすい）",
  "theme": "light または dark",
  "accent_color": "blue/green/orange/red/purple",
  "unsplash_keyword": "英語2〜3単語",
  "icon_suggestions": {
    "features": ["Zap", "Shield", "Heart"],
    "services": ["Briefcase", "Target", "Users"],
    "reasons": ["Award", "Clock", "CheckCircle"],
    "flow": ["MessageCircle", "Settings", "Sparkles"]
  }
}`,
          },
        ],
      }),
    });

    if (!groqRes.ok) throw new Error('Groq API error: ' + await groqRes.text());
    const groqData = await groqRes.json();
    const groqRaw = groqData.choices[0].message.content.trim();

    let analysis: {
      industry: string;
      target_persona: string;
      main_value: string;
      pain_points: string[];
      differentiators: string[];
      tone: string;
      theme: string;
      accent_color: string;
      unsplash_keyword: string;
      icon_suggestions: {
        features: string[];
        services: string[];
        reasons: string[];
        flow: string[];
      };
    };

    try {
      analysis = JSON.parse(groqRaw);
    } catch {
      const match = groqRaw.match(/\{[\s\S]*\}/);
      analysis = match ? JSON.parse(match[0]) : {
        industry: content || '不明',
        target_persona: 'ターゲット顧客',
        main_value: 'サービスの価値',
        pain_points: ['課題1', '課題2', '課題3'],
        differentiators: ['強み1', '強み2', '強み3'],
        tone: 'プロフェッショナル',
        theme: 'light',
        accent_color: 'blue',
        unsplash_keyword: 'professional business',
        icon_suggestions: {
          features: ['Zap', 'Shield', 'Heart'],
          services: ['Briefcase', 'Target', 'Users'],
          reasons: ['Award', 'Clock', 'CheckCircle'],
          flow: ['MessageCircle', 'Settings', 'Sparkles'],
        },
      };
    }

    // STEP2: Claude Haikuで高品質コピー生成
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `あなたは日本最高峰のWebコピーライターです。以下の分析結果を元に、感情に訴える高品質なLPコンテンツをJSONで生成してください。

【会社名】${title}
【業種】${analysis.industry}
【ターゲット】${analysis.target_persona}
【最大の価値】${analysis.main_value}
【顧客の悩み】${analysis.pain_points.join('、')}
【差別化ポイント】${analysis.differentiators.join('、')}
【トーン】${analysis.tone}
${is_redesign ? '【重要】これはリデザイン案件です。既存サイトの課題を解決する改善版として訴求してください。' : ''}

【絶対禁止】
- 抽象的表現（「最先端」「高品質」「あなただけの」）
- 根拠のない数字
- 回答になっていないFAQ
- JSON以外の出力

【必須】
- ターゲットが「これは自分のことだ」と感じるコピー
- 具体的なBefore→Afterのレビュー
- 業種特有の専門用語・リアルな表現
- 読んだだけで行動したくなるCTA

以下のJSON形式で返答：
{
  "sub_title": "キャッチコピー（20文字以内・業種特有・感情直撃）",
  "original": "サブキャッチ（80文字以内・ターゲットの悩みに深く共感し解決を示唆）",
  "features": [
    {"icon_name": "${analysis.icon_suggestions.features[0]}", "title": "特徴（15文字以内）", "desc": "理由まで含む具体的説明（100文字以内）"},
    {"icon_name": "${analysis.icon_suggestions.features[1]}", "title": "特徴（15文字以内）", "desc": "理由まで含む具体的説明（100文字以内）"},
    {"icon_name": "${analysis.icon_suggestions.features[2]}", "title": "特徴（15文字以内）", "desc": "理由まで含む具体的説明（100文字以内）"}
  ],
  "services": [
    {"icon_name": "${analysis.icon_suggestions.services[0]}", "name": "サービス名（15文字以内）", "desc": "ベネフィット中心（60文字以内）", "price": "相場感ある料金"},
    {"icon_name": "${analysis.icon_suggestions.services[1]}", "name": "サービス名（15文字以内）", "desc": "ベネフィット中心（60文字以内）", "price": "相場感ある料金"},
    {"icon_name": "${analysis.icon_suggestions.services[2]}", "name": "サービス名（15文字以内）", "desc": "ベネフィット中心（60文字以内）", "price": "相場感ある料金"}
  ],
  "reasons": [
    {"num": "01", "icon_name": "${analysis.icon_suggestions.reasons[0]}", "title": "差別化ポイント（18文字以内）", "desc": "具体的根拠（120文字以内・エピソード含む）"},
    {"num": "02", "icon_name": "${analysis.icon_suggestions.reasons[1]}", "title": "差別化ポイント（18文字以内）", "desc": "具体的根拠（120文字以内・エピソード含む）"},
    {"num": "03", "icon_name": "${analysis.icon_suggestions.reasons[2]}", "title": "差別化ポイント（18文字以内）", "desc": "具体的根拠（120文字以内・エピソード含む）"}
  ],
  "reviews": [
    {"name": "お客様名（山田様など）", "role": "職業・立場", "text": "来店前の悩み→利用後の具体的変化（100文字以内）", "star": 5},
    {"name": "お客様名", "role": "職業・立場", "text": "来店前の悩み→利用後の具体的変化（100文字以内）", "star": 5},
    {"name": "お客様名", "role": "職業・立場", "text": "来店前の悩み→利用後の具体的変化（100文字以内）", "star": 5}
  ],
  "flow": [
    {"step": "01", "icon_name": "${analysis.icon_suggestions.flow[0]}", "title": "ステップ（15文字以内）", "desc": "説明（40文字以内）"},
    {"step": "02", "icon_name": "${analysis.icon_suggestions.flow[1]}", "title": "ステップ（15文字以内）", "desc": "説明（40文字以内）"},
    {"step": "03", "icon_name": "${analysis.icon_suggestions.flow[2]}", "title": "ステップ（15文字以内）", "desc": "説明（40文字以内）"}
  ],
  "faq": [
    {"q": "実際に聞かれる質問（30文字以内）", "a": "具体的回答（100文字以内・安心感）"},
    {"q": "実際に聞かれる質問（30文字以内）", "a": "具体的回答（100文字以内）"},
    {"q": "実際に聞かれる質問（30文字以内）", "a": "具体的回答（100文字以内）"},
    {"q": "実際に聞かれる質問（30文字以内）", "a": "具体的回答（100文字以内）"}
  ],
  "closing": {
    "title": "背中を押すメッセージ（30文字以内・温かく）",
    "body": "不安解消・行動促進（150文字以内・保証・サポート強調）",
    "guarantee": "保証・約束（40文字以内）"
  },
  "cta_text": "行動を促すCTA（18文字以内・動詞始まり）",
  "cta_sub": "CTAサブ（50文字以内・安心感・明確な次のアクション）"
}`,
          },
        ],
      }),
    });

    if (!claudeRes.ok) throw new Error('Claude API error: ' + await claudeRes.text());
    const claudeData = await claudeRes.json();
    const claudeRaw = claudeData.content[0].text.trim();

    let ai: {
      sub_title: string; original: string;
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
      ai = JSON.parse(claudeRaw);
    } catch {
      const match = claudeRaw.match(/\{[\s\S]*\}/);
      ai = match ? JSON.parse(match[0]) : {
        sub_title: title, original: '',
        features: [], services: [], reasons: [], reviews: [], flow: [], faq: [],
        closing: { title: '', body: '', guarantee: '' },
        cta_text: 'お問い合わせ', cta_sub: 'お気軽にご相談ください',
      };
    }

    // Unsplash画像取得
    let imageUrl = '';
    try {
      const keyword = encodeURIComponent(analysis.unsplash_keyword ?? 'business professional');
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
      theme: analysis.theme,
      accent_color: analysis.accent_color,
      original: ai.original,
      image_url: imageUrl,
      logo_url: logo_url ?? '',
      is_redesign: is_redesign ?? false,
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
          slug, title,
          sub_title: ai.sub_title ?? title,
          content: aiContent,
          accent_color: [colorMap[analysis.accent_color] ?? 'cyan'],
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
