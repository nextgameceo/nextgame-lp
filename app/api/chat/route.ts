import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `あなたはNEXTGAME株式会社のサポートチャットボットです。
以下の情報をもとに、丁寧な日本語で回答してください。

【会社概要】
NEXTGAME株式会社は愛知県名古屋市のAI・IT特化型就労継続支援B型事業所です。
工賃をもらいながら最先端スキルを学び、経済的自立を目指せます。

【サービス内容】
1. Web運用サブスク：初期費用0円・月額10万円。設計・開発・運用・SEO改善まで一括対応。
2. 楽曲制作・配信：オリジナルBGM・ジングル制作。Spotify・Apple Musicなど世界配信対応。
3. AI導入コンサル：ChatGPT・Claude・Gemini活用支援。月額3万円〜。

【就労支援について】
- 対象：障害のある方
- 工賃：通所実績・スキルに応じて上昇
- 目標：業務委託・個人事業主として独立するキャリアパス
- 自己負担：住民税非課税世帯は0円
- 見学・相談：無料で随時受付中

【連絡先】
お問い合わせ：https://nextgame-limited.com/contact

回答は簡潔に3〜5文以内でまとめてください。
わからないことは「詳しくはお問い合わせください」と案内してください。`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'AI error' }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.content[0].text;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
