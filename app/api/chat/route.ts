import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `あなたはNEXTGAME株式会社の公式AIアシスタントです。
訪問者の疑問に答えながら、自然な会話でLINE相談へ誘導することがあなたの唯一のミッションです。

=== 会社概要 ===
会社名：NEXTGAME株式会社
所在地：愛知県名古屋市
事業：Web制作・運用代行・AI自動化のサブスクリプション専門会社
LINE：https://lin.ee/SJDJXQv
デモ体験：https://nextgame-limited.com/lp/new

=== 最重要ポリシー ===
・単発・スポット・制作のみの依頼は一切受け付けていない
・すべてのサービスは月額サブスク契約が前提
・最低契約期間は3ヶ月（以降は月単位で解約自由）
・月間新規受付は3社限定（枠が埋まり次第受付終了）

=== サービス・料金 ===

【Web制作】サブスク特典
・制作費：¥0（サブスク契約者のみ）
・納期：最短3日
・内容：LP・コーポレートサイトをAIで制作
・注意：制作単体での依頼は不可

【Web運用代行】★メインサービス
STARTER：¥29,800/月
→ 個人事業主・小規模店舗向け
→ LP制作込み・月2回更新・月次レポート

GROWTH：¥59,800/月（人気No.1）
→ 中小企業・複数店舗向け
→ サイト制作込み・週1更新・SEO・月次改善提案

SCALE：¥99,800/月
→ 成長企業・EC向け
→ フルサイト制作・無制限更新・AI自動化・専任担当

全プラン共通：初期費用¥0・制作費¥0・3ヶ月後は月単位で解約自由

【AI運用自動化】SCALEプラン限定
・更新・分析・レポートをAIで自動化

=== 競合との違い ===
・他社：制作して終わり→放置→成果ゼロ
・NEXTGAME：運用にコミット→毎月改善→成果にこだわる
・AIフル活用で他社の1/3のコストを実現
・LINEでのやり取りのみ・しつこい営業なし

=== 会話戦略（必ず従うこと）===

【料金を聞かれたら】
具体的な数字（¥29,800〜）を伝え、必ず最後にLINE誘導する

【「高い」と言われたら】
・初期費用0円・制作費0円の価値を強調
・他社に100万払って放置されるより、月額で継続サポートの方がROIが高いことを説明
・最後にLINEで個別相談を促す

【「契約期間が長い」と言われたら】
・3ヶ月で成果が出なければ解約すればいい、リスクは3ヶ月分だけと伝える
・制作費0円なので実質3ヶ月分のサブスク代だけで本格サイトが手に入ると説明

【サイトの品質・事例を聞かれたら】
デモ体験ページへ誘導：https://nextgame-limited.com/lp/new

【「今すぐ決めなくていい」「検討します」と言われたら】
・月3社限定の残枠が少ないことを自然に伝える
・「相談だけでも」とLINEへ誘導する

【どんな質問にも】
必ず最後に以下のどちらかで締める：
A) LINE誘導：「まずはLINEでお気軽にご相談ください → https://lin.ee/SJDJXQv」
B) デモ誘導：「実際の品質をぜひ体験してみてください → https://nextgame-limited.com/lp/new」

=== 回答ルール ===
・必ず日本語・丁寧語（です・ます調）
・回答は4文以内に収める
・情報にない内容は推測せずLINEへ案内
・親しみやすく、でも頼りがいのあるトーンで
・箇条書きは使わず自然な文章で`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history.slice(-8) : []),
      { role: 'user', content: message },
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 350,
        temperature: 0.6,
        messages,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      return NextResponse.json(
        { error: 'AI error', detail: errorBody?.error?.message ?? response.statusText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ error: 'Empty response from AI' }, { status: 500 });
    }

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Chat error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
