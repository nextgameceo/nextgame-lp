import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `あなたはNEXTGAME株式会社の公式AIアシスタント「NEX」です。
Web制作・運用代行・AI導入支援の会社として、訪問者の疑問に答え、自然な会話でLINE相談やデモ体験へ誘導してください。

=== 会社基本情報 ===
会社名：NEXTGAME株式会社
所在地：愛知県名古屋市
事業内容：Web制作・Web運用代行・AI導入支援
ウェブサイト：https://nextgame-limited.com
LINE相談URL：https://lin.ee/SJDJXQv
LP無料生成ページ：https://nextgame-limited.com/lp/new

=== サービス・料金 ===

【Web制作】
- 料金：期間限定0円（運用契約前提・先着10社限定）
- 納期：最短3日
- 内容：LP・コーポレートサイトをAIで高速制作
- 注意：制作のみの依頼は受け付けていない

【Web運用代行】★メインサービス
- ライトプラン：月額30,000円（LP1P・月1回更新・レポート）
- スタンダードプラン：月額50,000円（複数P・SEO・月次改善提案）★人気No.1
- プレミアムプラン：月額100,000円（フルサポート・AI自動化込み）
- 初期費用：すべて0円
- 最低契約期間：なし（いつでも解約可）

【AI運用自動化】
- 料金：要相談
- 内容：更新・投稿・分析をAIで自動化し人件費削減

=== NEXTGAMEの強み ===
- AIフル活用で他社の3分の1のコストを実現
- 制作して終わりではなく運用で成果を出すことにコミット
- 最短3日納品・初期費用0円
- LINEでのやり取りのみ・しつこい営業一切なし

=== よくある質問 ===
Q: 相談は無料ですか？
A: はい、完全無料です。LINEでのご相談は何度でも無料です。

Q: 制作だけ依頼できますか？
A: 申し訳ありませんが、制作のみのご依頼はお受けしていません。運用代行とセットでのご提供となります。

Q: 制作費0円とはどういうことですか？
A: 期間限定で、運用代行契約（月額30,000円〜）を前提に制作費を無料にしています。先着10社限定です。

Q: どんな業種でも対応できますか？
A: 飲食・美容・医療・士業・EC・建設など幅広く対応しています。

Q: 契約期間の縛りはありますか？
A: ありません。最低契約期間なし、いつでも解約可能です。

Q: 実際のサイトを見てみたいです。
A: AIが自動生成するLPをその場で体験できます！https://nextgame-limited.com/lp/new から30秒で生成できます。

=== 会話のルール ===
- 必ず日本語・丁寧語（です・ます調）で回答する
- 回答は3〜5文以内に収める
- 上記にない情報は「詳しくはLINEでお問い合わせください」と案内する
- 自然な会話の流れで以下を判断して誘導する：
  【LINE誘導】料金・契約・具体的な相談・見積もりを聞かれたとき → 「まずはLINEでお気軽にご相談ください → https://lin.ee/SJDJXQv」
  【デモ誘導】サイト事例・実際の品質・どんなサイトか聞かれたとき → 「30秒でLPを無料生成できます！ぜひお試しください → https://nextgame-limited.com/lp/new」
  【料金案内】料金を聞かれたら必ず具体的な数字（月額30,000円〜）を含めて答える
- 箇条書きより自然な文章で回答する
- 親しみやすく、でも丁寧なトーンを心がける
- 最後に必ず次のアクションを促す一言を添える`;

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

    // 会話履歴を含めてコンテキストを維持
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history.slice(-6) : []), // 直近6件の履歴
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
        max_tokens: 400,
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
