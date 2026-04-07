import FadeIn from ‘@/app/_components/FadeIn’;

export const revalidate = 0;

const LINE_URL = ‘https://lin.ee/SJDJXQv’;

const FAQ = [
{ q: ‘相談は本当に無料ですか？’, a: ‘完全無料です。費用が発生するのはご契約後のみ。相談・見積もりは何度でも無料でお応えします。’ },
{ q: ‘営業電話はかかってきますか？’, a: ‘かかってきません。LINEでのやり取りのみ。しつこい連絡は一切しません。’ },
{ q: ‘制作期間はどれくらいですか？’, a: ‘LPなら最短3日、コーポレートサイトは2〜3週間が目安です。’ },
{ q: ‘予算が少ないのですが大丈夫ですか？’, a: ‘10万円台から対応可能です。まずご予算をLINEで教えてください。最適なプランをご提案します。’ },
{ q: ‘制作後のサポートはありますか？’, a: ‘あります。運用・更新・SEO改善まで月額でサポートするプランをご用意しています。’ },
{ q: ‘どんな業種でも対応できますか？’, a: ‘飲食・美容・士業・EC・建設など幅広く対応実績があります。まずご相談ください。’ },
];

const PROBLEMS = [
{ num: ‘01’, text: ‘HPに100万払ったのに\n問い合わせがゼロ’ },
{ num: ‘02’, text: ‘更新のたびに\n制作会社に追加費用’ },
{ num: ‘03’, text: ‘SEO対策を頼んだら\n半年経っても順位変わらず’ },
{ num: ‘04’, text: ‘SNS運用を外注したら\n月20万で成果なし’ },
];

const COMPARE = [
{ item: ‘制作費用’, other: ‘50〜200万円’, ng: ‘10万円〜’ },
{ item: ‘納期’, other: ‘1〜3ヶ月’, ng: ‘最短3日’ },
{ item: ‘修正対応’, other: ‘有料・遅い’, ng: ‘無料・即対応’ },
{ item: ‘運用サポート’, other: ‘別途契約’, ng: ‘込みプランあり’ },
{ item: ‘担当者’, other: ‘営業→下請け’, ng: ‘直接対応’ },
{ item: ‘相談方法’, other: ‘電話・メール’, ng: ‘LINE即レス’ },
];

const SERVICES = [
{ icon: ‘🖥️’, name: ‘LP制作’, price: ‘10万円〜’, desc: ‘最短3日。CVに特化した設計’ },
{ icon: ‘🏢’, name: ‘HP制作’, price: ‘20万円〜’, desc: ‘CMS込み。自分で更新可能’ },
{ icon: ‘🔍’, name: ‘SEO対策’, price: ‘3万円〜/月’, desc: ‘検索上位を狙う継続支援’ },
{ icon: ‘📍’, name: ‘MEO対策’, price: ‘2万円〜/月’, desc: ‘Googleマップ上位表示’ },
{ icon: ‘📱’, name: ‘SNS運用’, price: ‘3万円〜/月’, desc: ‘Instagram・X投稿代行’ },
{ icon: ‘⚙️’, name: ‘Web運用代行’, price: ‘2万円〜/月’, desc: ‘更新・分析・改善まで一括’ },
];

const RESULTS = [
{ cat: ‘飲食店’, result: ‘予約2.3倍’, period: ‘3ヶ月’, tag: ‘MEO＋LP改善’ },
{ cat: ‘美容サロン’, result: ‘問い合わせ4倍’, period: ‘2ヶ月’, tag: ‘SEO＋HP改善’ },
{ cat: ‘個人事業主’, result: ‘新規8件/月増’, period: ‘2ヶ月’, tag: ‘LP制作’ },
{ cat: ‘整骨院’, result: ‘来院数1.8倍’, period: ‘4ヶ月’, tag: ‘MEO対策’ },
];

const FLOW = [
{ step: ‘01’, title: ‘LINEで相談’, body: ‘30秒で完了。無料’ },
{ step: ‘02’, title: ‘ヒアリング’, body: ‘LINE上で完結’ },
{ step: ‘03’, title: ‘無料提案’, body: ‘最短翌日’ },
{ step: ‘04’, title: ‘制作開始’, body: ‘最短3日で納品’ },
{ step: ‘05’, title: ‘運用開始’, body: ‘公開後も伴走’ },
];

export default function Page() {
return (
<>
<style>{`
@import url(‘https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@400;500;700;900&display=swap’);

```
    :root {
      --orange: #FF6B2B;
      --orange-dark: #E85A1B;
      --dark: #0D0D0D;
      --dark2: #141414;
      --dark3: #1A1A1A;
      --border: rgba(255,255,255,0.08);
      --text: #F0F0F0;
      --muted: #888;
      --green: #06C755;
    }

    /* ── 固定LINE CTA ── */
    .lp-fixed {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 999;
      padding: 12px 16px 20px;
      background: linear-gradient(to top, #0D0D0D 60%, transparent);
      pointer-events: none;
    }
    .lp-fixed a {
      pointer-events: all;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--green);
      color: #ffffff;
      font-weight: 900;
      font-size: 1.05rem;
      padding: 18px 24px;
      border-radius: 100px;
      text-decoration: none;
      box-shadow: 0 4px 32px rgba(6,199,85,0.5);
      letter-spacing: 0.03em;
      animation: lp-bounce 2.5s ease-in-out infinite;
      max-width: 480px;
      margin: 0 auto;
      width: 100%;
    }
    @keyframes lp-bounce {
      0%,100% { transform: translateY(0); box-shadow: 0 4px 32px rgba(6,199,85,0.5); }
      50% { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(6,199,85,0.7); }
    }

    /* ── ボタン共通 ── */
    .lp-btn-line {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--green);
      color: #ffffff;
      font-weight: 900;
      font-size: 1rem;
      padding: 18px 32px;
      border-radius: 100px;
      text-decoration: none;
      box-shadow: 0 4px 24px rgba(6,199,85,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      letter-spacing: 0.03em;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      white-space: nowrap;
    }
    .lp-btn-line:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 36px rgba(6,199,85,0.6);
    }
    .lp-btn-orange {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: var(--orange);
      color: #ffffff;
      font-weight: 900;
      font-size: 1rem;
      padding: 18px 32px;
      border-radius: 100px;
      text-decoration: none;
      box-shadow: 0 4px 24px rgba(255,107,43,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      letter-spacing: 0.03em;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
    .lp-btn-orange:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 36px rgba(255,107,43,0.6);
    }

    /* ── セクション共通 ── */
    .lp-section { padding: 72px 20px; }
    .lp-section-dark { background: var(--dark); }
    .lp-section-dark2 { background: var(--dark2); }
    .lp-section-dark3 { background: var(--dark3); }
    .lp-inner { max-width: 600px; margin: 0 auto; }
    .lp-inner-wide { max-width: 800px; margin: 0 auto; }

    .lp-label {
      display: inline-block;
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      color: var(--orange);
      background: rgba(255,107,43,0.1);
      border: 1px solid rgba(255,107,43,0.3);
      border-radius: 100px;
      padding: 5px 14px;
      margin-bottom: 20px;
    }
    .lp-h2 {
      font-family: 'Noto Sans JP', sans-serif;
      font-size: clamp(1.5rem, 5vw, 2rem);
      font-weight: 900;
      line-height: 1.4;
      color: #ffffff;
      margin-bottom: 12px;
    }
    .lp-h2 em {
      font-style: normal;
      color: var(--orange);
    }
    .lp-sub {
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.7;
      margin-bottom: 40px;
    }
    .lp-divider {
      width: 40px;
      height: 3px;
      background: var(--orange);
      margin: 16px 0 32px;
      border-radius: 2px;
    }

    /* ── HERO ── */
    .lp-hero {
      position: relative;
      background: var(--dark);
      padding: 80px 20px 100px;
      overflow: hidden;
      text-align: center;
    }
    .lp-hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,107,43,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,107,43,0.04) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
    }
    .lp-hero-glow {
      position: absolute;
      top: -100px; left: 50%;
      transform: translateX(-50%);
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(255,107,43,0.12) 0%, transparent 65%);
      pointer-events: none;
    }
    .lp-tag {
      display: inline-block;
      background: rgba(255,107,43,0.15);
      border: 1px solid rgba(255,107,43,0.4);
      color: var(--orange);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      padding: 6px 16px;
      border-radius: 100px;
      margin-bottom: 24px;
    }
    .lp-catch {
      font-family: 'Noto Sans JP', sans-serif;
      font-size: clamp(1.9rem, 7vw, 3rem);
      font-weight: 900;
      line-height: 1.3;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .lp-catch em {
      font-style: normal;
      color: var(--orange);
    }
    .lp-catch-sub {
      font-size: clamp(0.85rem, 3vw, 1rem);
      color: var(--muted);
      line-height: 1.8;
      margin-bottom: 32px;
    }
    .lp-hero-badges {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 36px;
    }
    .lp-badge {
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 8px 14px;
      font-size: 0.78rem;
      color: #ccc;
      font-weight: 500;
    }
    .lp-badge strong { color: #fff; }
    .lp-hero-note {
      font-size: 0.75rem;
      color: var(--muted);
      margin-top: 14px;
    }
    .lp-hero-note span { color: var(--orange); font-weight: 700; }

    /* ── 限定バナー ── */
    .lp-limit {
      background: linear-gradient(135deg, rgba(255,107,43,0.15), rgba(255,107,43,0.05));
      border: 1px solid rgba(255,107,43,0.3);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin-bottom: 32px;
    }
    .lp-limit-title {
      font-size: 0.72rem;
      color: var(--orange);
      letter-spacing: 0.15em;
      margin-bottom: 8px;
    }
    .lp-limit-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 3rem;
      color: #ffffff;
      line-height: 1;
      margin-bottom: 4px;
    }
    .lp-limit-sub { font-size: 0.82rem; color: var(--muted); }

    /* ── 悩み ── */
    .lp-problem-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 40px;
    }
    .lp-problem-item {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 18px 20px;
    }
    .lp-problem-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.4rem;
      color: rgba(255,107,43,0.4);
      flex-shrink: 0;
      line-height: 1;
    }
    .lp-problem-text {
      font-size: 0.92rem;
      color: var(--text);
      line-height: 1.6;
      white-space: pre-line;
    }

    /* ── 比較表 ── */
    .lp-compare {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
    }
    .lp-compare th {
      padding: 12px 10px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    .lp-compare th:first-child { text-align: left; color: var(--muted); }
    .lp-compare th:nth-child(2) { color: var(--muted); background: rgba(255,255,255,0.03); }
    .lp-compare th:nth-child(3) { color: #ffffff; background: rgba(255,107,43,0.15); border-radius: 8px 8px 0 0; }
    .lp-compare td {
      padding: 14px 10px;
      font-size: 0.85rem;
      border-top: 1px solid var(--border);
    }
    .lp-compare td:first-child { color: var(--muted); font-size: 0.8rem; }
    .lp-compare td:nth-child(2) { color: #666; text-align: center; background: rgba(255,255,255,0.02); }
    .lp-compare td:nth-child(3) { color: var(--orange); font-weight: 700; text-align: center; background: rgba(255,107,43,0.06); }

    /* ── サービス ── */
    .lp-service-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 40px;
    }
    .lp-service-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px 16px;
      transition: border-color 0.2s;
    }
    .lp-service-card:hover { border-color: rgba(255,107,43,0.4); }
    .lp-service-icon { font-size: 1.6rem; margin-bottom: 8px; }
    .lp-service-name { font-size: 0.9rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
    .lp-service-price { font-size: 0.78rem; color: var(--orange); font-weight: 700; margin-bottom: 6px; }
    .lp-service-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.5; }

    /* ── 実績 ── */
    .lp-result-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 40px;
    }
    .lp-result-card {
      background: linear-gradient(135deg, rgba(255,107,43,0.1), rgba(255,107,43,0.03));
      border: 1px solid rgba(255,107,43,0.2);
      border-radius: 12px;
      padding: 20px 16px;
      text-align: center;
    }
    .lp-result-cat { font-size: 0.7rem; color: var(--orange); margin-bottom: 8px; letter-spacing: 0.05em; }
    .lp-result-kpi { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; color: #fff; line-height: 1; margin-bottom: 4px; }
    .lp-result-period { font-size: 0.72rem; color: var(--muted); margin-bottom: 4px; }
    .lp-result-tag { display: inline-block; font-size: 0.68rem; color: var(--orange); background: rgba(255,107,43,0.1); padding: 2px 8px; border-radius: 100px; }

    /* ── 料金 ── */
    .lp-pricing-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 40px;
    }
    .lp-pricing-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 18px 20px;
      gap: 12px;
    }
    .lp-pricing-item.featured {
      border-color: var(--orange);
      background: rgba(255,107,43,0.06);
    }
    .lp-pricing-name { font-size: 0.9rem; font-weight: 700; color: #fff; }
    .lp-pricing-price { font-size: 1.1rem; font-weight: 900; color: var(--orange); white-space: nowrap; }
    .lp-pricing-badge {
      font-size: 0.65rem;
      background: var(--orange);
      color: #fff;
      padding: 2px 8px;
      border-radius: 100px;
      display: inline-block;
      margin-bottom: 4px;
    }

    /* ── FLOW ── */
    .lp-flow-list {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin-bottom: 40px;
    }
    .lp-flow-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      position: relative;
      padding-bottom: 24px;
    }
    .lp-flow-item:last-child { padding-bottom: 0; }
    .lp-flow-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
    }
    .lp-flow-circle {
      width: 44px; height: 44px;
      border-radius: 50%;
      background: rgba(255,107,43,0.15);
      border: 1.5px solid var(--orange);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1rem;
      color: var(--orange);
      flex-shrink: 0;
    }
    .lp-flow-line {
      width: 1px;
      flex: 1;
      min-height: 24px;
      background: linear-gradient(to bottom, rgba(255,107,43,0.4), rgba(255,107,43,0.05));
      margin-top: 4px;
    }
    .lp-flow-content { padding-top: 8px; }
    .lp-flow-title { font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
    .lp-flow-body { font-size: 0.8rem; color: var(--muted); }

    /* ── FAQ ── */
    .lp-faq-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 40px;
    }
    .lp-faq-item {
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
    }
    .lp-faq-q {
      padding: 18px 20px;
      font-size: 0.88rem;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .lp-faq-q-icon { color: var(--orange); flex-shrink: 0; font-weight: 900; }
    .lp-faq-a {
      padding: 0 20px 18px 44px;
      font-size: 0.83rem;
      color: var(--muted);
      line-height: 1.75;
    }

    /* ── LINE登録メリット ── */
    .lp-line-merit {
      background: linear-gradient(135deg, rgba(6,199,85,0.1), rgba(6,199,85,0.03));
      border: 1px solid rgba(6,199,85,0.25);
      border-radius: 16px;
      padding: 28px 24px;
      margin-bottom: 28px;
    }
    .lp-line-merit-title {
      font-size: 0.78rem;
      color: var(--green);
      letter-spacing: 0.1em;
      margin-bottom: 16px;
      font-weight: 700;
    }
    .lp-line-merit-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .lp-line-merit-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.85rem;
      color: var(--text);
    }
    .lp-line-merit-check { color: var(--green); font-weight: 900; flex-shrink: 0; }

    /* ── 安心 ── */
    .lp-trust-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 36px;
    }
    .lp-trust-item {
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
      text-align: center;
    }
    .lp-trust-icon { font-size: 1.4rem; margin-bottom: 6px; }
    .lp-trust-text { font-size: 0.78rem; color: #ccc; line-height: 1.5; }

    /* ── クロージング ── */
    .lp-closing {
      background: linear-gradient(135deg, #1A0A00, #0D0D0D);
      padding: 72px 20px 120px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .lp-closing-glow {
      position: absolute;
      bottom: -100px; left: 50%;
      transform: translateX(-50%);
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(255,107,43,0.1) 0%, transparent 65%);
      pointer-events: none;
    }
    .lp-closing-catch {
      font-family: 'Noto Sans JP', sans-serif;
      font-size: clamp(1.4rem, 5vw, 1.9rem);
      font-weight: 900;
      color: #fff;
      line-height: 1.45;
      margin-bottom: 12px;
    }
    .lp-closing-catch em { font-style: normal; color: var(--orange); }
    .lp-closing-sub { font-size: 0.85rem; color: var(--muted); margin-bottom: 36px; line-height: 1.7; }
    .lp-btn-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
      max-width: 400px;
      margin: 0 auto;
    }

    @keyframes lp-fadein {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: none; }
    }

    @media (min-width: 600px) {
      .lp-service-grid { grid-template-columns: repeat(3,1fr); }
      .lp-result-grid { grid-template-columns: repeat(4,1fr); }
      .lp-trust-grid { grid-template-columns: repeat(4,1fr); }
    }
  `}</style>

  {/* ── 固定LINE CTA ── */}
  <div className="lp-fixed">
    <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
      30秒で無料相談する →
    </a>
  </div>

  {/* ── HERO ── */}
  <section className="lp-hero">
    <div className="lp-hero-grid" />
    <div className="lp-hero-glow" />
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto' }}>
      <FadeIn>
        <div className="lp-tag">📣 毎月5社限定・先着順</div>
        <h1 className="lp-catch">
          ホームページ制作、<br />
          <em>3分の1の費用</em>で<br />
          問い合わせを3倍に。
        </h1>
        <p className="lp-catch-sub">
          AIを活用した次世代のWeb制作会社。<br />
          中小企業・個人事業主・店舗オーナー専門。
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="lp-hero-badges">
          <div className="lp-badge"><strong>最短3日</strong>で納品</div>
          <div className="lp-badge">費用<strong>10万円〜</strong></div>
          <div className="lp-badge"><strong>営業</strong>一切なし</div>
          <div className="lp-badge">LINE<strong>即レス</strong></div>
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div className="lp-limit" style={{ marginBottom: 28 }}>
          <div className="lp-limit-title">⚠️ 今月の受付枠</div>
          <div className="lp-limit-num">残2社</div>
          <div className="lp-limit-sub">枠が埋まり次第、受付終了</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-line">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
            30秒で無料相談する →
          </a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-orange">
            費用を無料で見積もる →
          </a>
        </div>
        <p className="lp-hero-note">
          <span>✓ 完全無料</span>　<span>✓ しつこい営業なし</span>　<span>✓ 相談だけでもOK</span>
        </p>
      </FadeIn>
    </div>
  </section>

  {/* ── 悩み共感 ── */}
  <section className="lp-section lp-section-dark2">
    <div className="lp-inner">
      <FadeIn>
        <div className="lp-label">PROBLEMS</div>
        <h2 className="lp-h2">こんな悩み、<br /><em>ありませんか？</em></h2>
        <div className="lp-divider" />
      </FadeIn>
      <div className="lp-problem-list">
        {PROBLEMS.map((p, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div className="lp-problem-item">
              <div className="lp-problem-num">{p.num}</div>
              <div className="lp-problem-text">{p.text}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <div style={{ textAlign: 'center', padding: '24px 0 0' }}>
          <p style={{ fontSize: '1rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>
            その悩み、<em style={{ color: 'var(--orange)', fontStyle: 'normal' }}>全部解決できます。</em>
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: 24 }}>まずLINEで相談してみてください。</p>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-line">
            LINEで今すぐ聞く →
          </a>
        </div>
      </FadeIn>
    </div>
  </section>

  {/* ── 解決策 ── */}
  <section className="lp-section lp-section-dark3">
    <div className="lp-inner">
      <FadeIn>
        <div className="lp-label">SOLUTION</div>
        <h2 className="lp-h2">AIで、<em>常識を壊す。</em></h2>
        <div className="lp-divider" />
        <div style={{ background: 'rgba(255,107,43,0.06)', border: '1px solid rgba(255,107,43,0.2)', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 2, marginBottom: 0 }}>
            従来の制作会社は<strong style={{ color: '#fff' }}>「高い・遅い・使えない」</strong>が当たり前。<br /><br />
            NEXTGAMEはAIを最大活用することで、<br />
            <strong style={{ color: 'var(--orange)' }}>費用を3分の1以下</strong>に圧縮。<br />
            <strong style={{ color: 'var(--orange)' }}>納期を10分の1</strong>に短縮。<br />
            <strong style={{ color: 'var(--orange)' }}>品質は大手以上</strong>を実現します。
          </p>
        </div>
      </FadeIn>
    </div>
  </section>

  {/* ── 他社比較 ── */}
  <section className="lp-section lp-section-dark2">
    <div className="lp-inner">
      <FadeIn>
        <div className="lp-label">COMPARISON</div>
        <h2 className="lp-h2">他社と<em>比べてください。</em></h2>
        <div className="lp-divider" />
      </FadeIn>
      <FadeIn delay={0.1}>
        <table className="lp-compare">
          <thead>
            <tr>
              <th></th>
              <th>一般制作会社</th>
              <th>NEXTGAME</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((c, i) => (
              <tr key={i}>
                <td>{c.item}</td>
                <td>❌ {c.other}</td>
                <td>✅ {c.ng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div style={{ textAlign: 'center' }}>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-orange">
            集客の悩みを相談する →
          </a>
        </div>
      </FadeIn>
    </div>
  </section>

  {/* ── サービス ── */}
  <section className="lp-section lp-section-dark">
    <div className="lp-inner-wide">
      <FadeIn>
        <div style={{ textAlign: 'center' }}>
          <div className="lp-label">SERVICES</div>
          <h2 className="lp-h2">サービス一覧</h2>
          <div className="lp-divider" style={{ margin: '16px auto 32px' }} />
        </div>
      </FadeIn>
      <div className="lp-service-grid">
        {SERVICES.map((s, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div className="lp-service-card">
              <div className="lp-service-icon">{s.icon}</div>
              <div className="lp-service-name">{s.name}</div>
              <div className="lp-service-price">{s.price}</div>
              <div className="lp-service-desc">{s.desc}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <div style={{ textAlign: 'center' }}>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-line">
            まずは話を聞く →
          </a>
        </div>
      </FadeIn>
    </div>
  </section>

  {/* ── 実績 ── */}
  <section className="lp-section lp-section-dark2">
    <div className="lp-inner-wide">
      <FadeIn>
        <div style={{ textAlign: 'center' }}>
          <div className="lp-label">RESULTS</div>
          <h2 className="lp-h2"><em>数字</em>で証明します。</h2>
          <div className="lp-divider" style={{ margin: '16px auto 32px' }} />
        </div>
      </FadeIn>
      <div className="lp-result-grid">
        {RESULTS.map((r, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="lp-result-card">
              <div className="lp-result-cat">{r.cat}</div>
              <div className="lp-result-kpi">{r.result}</div>
              <div className="lp-result-period">{r.period}で達成</div>
              <div className="lp-result-tag">{r.tag}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <div style={{ textAlign: 'center' }}>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-orange">
            最短で集客を始める →
          </a>
        </div>
      </FadeIn>
    </div>
  </section>

  {/* ── 料金 ── */}
  <section className="lp-section lp-section-dark">
    <div className="lp-inner">
      <FadeIn>
        <div className="lp-label">PRICING</div>
        <h2 className="lp-h2">明確な<em>料金体系。</em></h2>
        <p className="lp-sub">追加費用なし。見積もり無料。</p>
        <div className="lp-divider" />
      </FadeIn>
      <div className="lp-pricing-list">
        {[
          { name: 'LP制作', price: '10万円〜', featured: false },
          { name: 'ホームページ制作', price: '20万円〜', featured: true, badge: '人気No.1' },
          { name: 'SEO・MEO対策', price: '2万円〜/月', featured: false },
          { name: 'Web運用代行', price: '2万円〜/月', featured: false },
        ].map((p, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <div className={`lp-pricing-item${p.featured ? ' featured' : ''}`}>
              <div>
                {p.badge && <div className="lp-pricing-badge">{p.badge}</div>}
                <div className="lp-pricing-name">{p.name}</div>
              </div>
              <div className="lp-pricing-price">{p.price}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <div style={{ textAlign: 'center' }}>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-line">
            費用を無料で見積もる →
          </a>
        </div>
      </FadeIn>
    </div>
  </section>

  {/* ── 流れ ── */}
  <section className="lp-section lp-section-dark2">
    <div className="lp-inner">
      <FadeIn>
        <div className="lp-label">FLOW</div>
        <h2 className="lp-h2">相談から<em>最短3日</em>で公開。</h2>
        <div className="lp-divider" />
      </FadeIn>
      <div className="lp-flow-list">
        {FLOW.map((f, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <div className="lp-flow-item">
              <div className="lp-flow-left">
                <div className="lp-flow-circle">{f.step}</div>
                {i < FLOW.length - 1 && <div className="lp-flow-line" />}
              </div>
              <div className="lp-flow-content">
                <div className="lp-flow-title">{f.title}</div>
                <div className="lp-flow-body">{f.body}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.4}>
        <div style={{ textAlign: 'center' }}>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-orange">
            プロに聞く →
          </a>
        </div>
      </FadeIn>
    </div>
  </section>

  {/* ── FAQ ── */}
  <section className="lp-section lp-section-dark">
    <div className="lp-inner">
      <FadeIn>
        <div className="lp-label">FAQ</div>
        <h2 className="lp-h2">よくある<em>質問。</em></h2>
        <div className="lp-divider" />
      </FadeIn>
      <div className="lp-faq-list">
        {FAQ.map((f, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div className="lp-faq-item">
              <div className="lp-faq-q">
                <span className="lp-faq-q-icon">Q</span>
                {f.q}
              </div>
              <div className="lp-faq-a">{f.a}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.4}>
        <div style={{ textAlign: 'center' }}>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-line">
            LINEで相談してみる →
          </a>
        </div>
      </FadeIn>
    </div>
  </section>

  {/* ── クロージング ── */}
  <section className="lp-closing">
    <div className="lp-closing-glow" />
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto' }}>
      <FadeIn>
        <div className="lp-label">LINE登録の特典</div>
        <div className="lp-line-merit">
          <div className="lp-line-merit-title">✅ LINE追加で全部無料</div>
          <div className="lp-line-merit-list">
            {[
              '無料ヒアリング（30分）',
              '競合サイト調査レポート',
              'SEOキーワード提案',
              '御社に最適な制作プラン提案',
              'LINE上で何でも質問OK',
            ].map((m, i) => (
              <div key={i} className="lp-line-merit-item">
                <span className="lp-line-merit-check">✓</span>
                {m}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="lp-trust-grid" style={{ marginBottom: 32 }}>
          {[
            { icon: '🔒', text: '営業電話\nなし' },
            { icon: '💬', text: 'LINEで\n気軽に相談' },
            { icon: '🆓', text: '相談・見積もり\n完全無料' },
            { icon: '⚡', text: '最短翌日\nご提案' },
          ].map((t, i) => (
            <div key={i} className="lp-trust-item">
              <div className="lp-trust-icon">{t.icon}</div>
              <div className="lp-trust-text" style={{ whiteSpace: 'pre-line' }}>{t.text}</div>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div className="lp-limit" style={{ marginBottom: 28 }}>
          <div className="lp-limit-title">⚠️ 今月の受付枠 残り</div>
          <div className="lp-limit-num">2社</div>
          <div className="lp-limit-sub">枠が埋まり次第、受付終了します</div>
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <h2 className="lp-closing-catch">
          「とりあえず聞いてみる」<br />
          それだけで<em>OKです。</em>
        </h2>
        <p className="lp-closing-sub">
          30秒でLINE追加完了。<br />
          しつこい連絡は一切しません。<br />
          まず相談だけでもOK。
        </p>
        <div className="lp-btn-stack">
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-line" style={{ fontSize: '1.1rem', padding: '20px 32px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
            30秒で無料相談する →
          </a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="lp-btn-orange">
            今すぐチェック →
          </a>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 4 }}>
            ✓ 完全無料　✓ 営業なし　✓ 相談だけでもOK
          </p>
        </div>
      </FadeIn>
    </div>
  </section>
</>
```

);
}