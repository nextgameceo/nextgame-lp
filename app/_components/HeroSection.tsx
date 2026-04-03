/**

- HeroSection.tsx
- ─────────────────────────────────────────────────
- 配置場所: components/HeroSection.tsx
- 
- 使い方:
- import HeroSection from “@/components/HeroSection”;
- // app/page.tsx の中で
- <HeroSection />
- ─────────────────────────────────────────────────
  */

import HeroCanvas from “@/components/HeroCanvas”;

/* ── スキルマーキーのデータ ── */
const SKILLS = [
{ label: “プログラミング (Python)”, color: “#FF5C35” },
{ label: “Webサイト制作”,           color: “#74b9ff” },
{ label: “クラウドサービス活用”,    color: “#C8922A” },
{ label: “データ活用・分析”,        color: “#00b894” },
{ label: “デザイン制作”,            color: “#fd79a8” },
{ label: “業務の自動化”,            color: “#5C8A78” },
{ label: “アプリ開発”,              color: “#a29bfe” },
{ label: “AI・ChatGPT活用”,         color: “#ffeaa7” },
];

export default function HeroSection() {
return (
<>
<style>{`
/* ── Hero コンテナ ── */
.ng-hero {
position: relative;
overflow: hidden;
background: #2D4A3E;
color: #ffffff;
min-height: 100svh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: clamp(7rem, 13vw, 11rem)
clamp(1.25rem, 6vw, 3rem)
clamp(5rem, 8vw, 7rem);
box-sizing: border-box;
width: 100%;
}

```
    /* ── 背景グリッド ── */
    .ng-hero-grid {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    /* ── 対角スラッシュ（PC only）── */
    .ng-hero-slash {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 28%;
      background: rgba(255, 92, 53, 0.10);
      clip-path: polygon(40% 0, 100% 0, 100% 100%, 0% 100%);
      pointer-events: none;
      z-index: 0;
    }
    @media (max-width: 768px) {
      .ng-hero-slash { display: none; }
    }

    /* ── 内部コンテンツ ── */
    .ng-hero-inner {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 800px;
      text-align: center;
      margin: 0 auto;
    }

    /* ── eyebrow ── */
    .ng-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: .7rem;
      font-size: .7rem;
      font-weight: 700;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: rgba(255,255,255,.6);
      margin-bottom: 1.8rem;
      animation: ngFadeUp .6s .1s ease forwards;
      opacity: 0;
      transform: translateY(16px);
    }
    .ng-pip {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #FF5C35;
      display: inline-block;
      flex-shrink: 0;
    }

    /* ── 見出し h1 ── */
    .ng-h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2.6rem, 8vw, 7.5rem);
      font-weight: 800;
      line-height: .95;
      letter-spacing: -.04em;
      color: #ffffff;
      animation: ngFadeUp .8s .3s ease forwards;
      opacity: 0;
      transform: translateY(28px);
      word-break: keep-all;
      overflow-wrap: break-word;
    }
    .ng-h1-accent {
      display: inline-block;
      position: relative;
      color: #FF5C35;
    }
    .ng-h1-accent::after {
      content: '';
      position: absolute;
      left: 0; right: 0;
      bottom: -.05em;
      height: .06em;
      background: #FF5C35;
      border-radius: 4px;
      transform: scaleX(0);
      transform-origin: left;
      animation: ngLineIn .55s 1.1s ease forwards;
    }

    /* ── サブテキスト ── */
    .ng-sub {
      font-size: clamp(.88rem, 2.2vw, 1.15rem);
      color: rgba(255,255,255,.65);
      font-weight: 300;
      line-height: 1.85;
      max-width: 520px;
      margin: 1.8rem auto 0;
      animation: ngFadeUp .65s .55s ease forwards;
      opacity: 0;
      transform: translateY(16px);
      width: 100%;
      box-sizing: border-box;
    }

    /* ── CTAボタン群 ── */
    .ng-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      margin-top: 2.8rem;
      animation: ngFadeUp .6s .75s ease forwards;
      opacity: 0;
      transform: translateY(14px);
      width: 100%;
    }
    @media (max-width: 480px) {
      .ng-actions { flex-direction: column; align-items: center; }
      .ng-actions a { width: 100%; max-width: 320px; justify-content: center; }
    }

    /* ── ボタン共通 ── */
    .ng-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: .4rem;
      font-weight: 700;
      border-radius: 6px;
      text-decoration: none;
      cursor: pointer;
      border: 2px solid #1A1A1A;
      padding: 1rem 2.4rem;
      font-size: .93rem;
      transition: transform .18s cubic-bezier(0.34,1.56,0.64,1),
                  box-shadow .18s;
    }
    .ng-btn:hover { transform: translate(-2px, -2px); }
    .ng-btn-primary {
      background: #FF5C35;
      color: #ffffff;
      box-shadow: 4px 4px 0 #1A1A1A;
    }
    .ng-btn-primary:hover { box-shadow: 6px 6px 0 #1A1A1A; }
    .ng-btn-ghost {
      background: transparent;
      color: #ffffff;
      border-color: rgba(255,255,255,.35);
      box-shadow: none;
    }
    .ng-btn-ghost:hover { border-color: #ffffff; }
    .ng-btn-arrow { transition: transform .18s; }
    .ng-btn:hover .ng-btn-arrow { transform: translateX(4px); }

    /* ── スキルマーキー ── */
    .ng-marquee-wrap {
      width: 100%;
      overflow: hidden;
      margin-top: 3rem;
      mask-image: linear-gradient(
        to right, transparent, black 10%, black 90%, transparent
      );
      -webkit-mask-image: linear-gradient(
        to right, transparent, black 10%, black 90%, transparent
      );
      animation: ngFadeUp .5s .95s ease forwards;
      opacity: 0;
      transform: translateY(14px);
      max-width: 100%;
      box-sizing: border-box;
    }
    .ng-marquee-track {
      display: flex;
      gap: .75rem;
      width: max-content;
      animation: ngMarquee 26s linear infinite;
    }
    .ng-chip {
      display: inline-flex;
      align-items: center;
      gap: .4rem;
      padding: .35rem 1rem;
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.15);
      border-radius: 50px;
      white-space: nowrap;
      font-size: .76rem;
      font-weight: 500;
      color: rgba(255,255,255,.7);
    }
    .ng-chip-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* ── スクロールインジケーター ── */
    .ng-scroll-hint {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .35rem;
      animation: ngFadeUp .5s 1.2s ease forwards;
      opacity: 0;
    }
    .ng-scroll-hint span {
      font-size: .6rem;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: rgba(255,255,255,.4);
    }
    .ng-scroll-line {
      width: 1px;
      height: 44px;
      background: linear-gradient(to bottom, rgba(255,92,53,.8), transparent);
      animation: ngScrollPulse 1.8s ease-in-out infinite;
    }

    /* ── キーフレーム ── */
    @keyframes ngFadeUp {
      to { opacity: 1; transform: none; }
    }
    @keyframes ngLineIn {
      to { transform: scaleX(1); }
    }
    @keyframes ngMarquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes ngScrollPulse {
      0%,100% { transform: scaleY(1); opacity: 1; }
      50%     { transform: scaleY(.45); opacity: .35; }
    }

    /* ── reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      .ng-eyebrow, .ng-h1, .ng-sub,
      .ng-actions, .ng-marquee-wrap, .ng-scroll-hint {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
      .ng-marquee-track { animation: none; }
      .ng-scroll-line   { animation: none; }
    }
  `}</style>

  <section
    id="hero"
    className="ng-hero"
    aria-labelledby="hero-headline"
  >
    {/* ① Canvas パーティクル背景 */}
    <HeroCanvas />

    {/* 背景グリッド */}
    <div className="ng-hero-grid" aria-hidden="true" />

    {/* 対角スラッシュ（PC） */}
    <div className="ng-hero-slash" aria-hidden="true" />

    {/* メインコンテンツ */}
    <div className="ng-hero-inner">

      {/* eyebrow */}
      <p className="ng-eyebrow" aria-label="名古屋発 ITスキル習得・就職支援サービス">
        <span className="ng-pip" aria-hidden="true" />
        名古屋発 · ITスキル習得・就職支援サービス
        <span className="ng-pip" aria-hidden="true" />
      </p>

      {/* キャッチコピー */}
      <h1 className="ng-h1" id="hero-headline">
        限界を<br />
        <span className="ng-h1-accent">超えろ。</span>
      </h1>

      {/* サブテキスト */}
      <p className="ng-sub">
        未経験でも、ブランクがあっても大丈夫。<br />
        NEXTGAMEはあなた一人ひとりに寄り添い、<br />
        ITの仕事に就くまでをまるごとサポートします。
      </p>

      {/* CTAボタン */}
      <div className="ng-actions">
        <a
          href="#contact"
          className="ng-btn ng-btn-primary"
          role="button"
          aria-label="無料相談を予約する"
        >
          <span>無料相談を予約する</span>
          <span className="ng-btn-arrow" aria-hidden="true">→</span>
        </a>
        <a
          href="#flow"
          className="ng-btn ng-btn-ghost"
          role="button"
          aria-label="サービスの流れを確認する"
        >
          サービスの流れ
        </a>
      </div>

      {/* スキルマーキー */}
      <div className="ng-marquee-wrap" aria-label="対応スキル一覧">
        <div className="ng-marquee-track" aria-hidden="true">
          {[...SKILLS, ...SKILLS].map(({ label, color }, i) => (
            <span key={i} className="ng-chip">
              <span className="ng-chip-dot" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* スクロール指示 */}
    <div className="ng-scroll-hint" aria-hidden="true">
      <span>SCROLL</span>
      <div className="ng-scroll-line" />
    </div>
  </section>
</>
```

);
}