'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const LINE_URL = 'https://lin.ee/SJDJXQv';
const DEMO_URL = '/lp/new';

// ── カウントダウン終了日（例：30日後）──
const DEADLINE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

const PROBLEMS = [
  { num: '01', text: 'HPを作ったのに\n問い合わせが来ない' },
  { num: '02', text: '更新のたびに\n制作会社に追加費用' },
  { num: '03', text: 'SEOを頼んだら\n半年経っても効果なし' },
  { num: '04', text: '制作後に放置されて\n成果ゼロのまま' },
];

const SERVICES = [
  {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6dbed6" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    name: 'Web制作',
    badge: '期間限定無料',
    badgeColor: '#6dbed6',
    price: '¥0',
    priceNote: '期間限定',
    desc: 'LP・コーポレートサイトをAIで最短3日で制作。運用契約前提で制作費0円。',
    main: false,
  },
  {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6dbed6" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    name: 'Web運用代行',
    badge: 'メインサービス',
    badgeColor: '#6dbed6',
    price: '¥30,000〜',
    priceNote: '/月',
    desc: '更新・SEO・分析・改善まで月額で一括。成果が出るまで伴走します。',
    main: true,
  },
  {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7f5af0" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    name: 'AI運用自動化',
    badge: '強み',
    badgeColor: '#7f5af0',
    price: '要相談',
    priceNote: '',
    desc: 'AI活用で更新・投稿・分析を自動化。人件費を削減しながら成果を最大化。',
    main: false,
  },
];

const PRICING = [
  { name: 'ライト', desc: 'LP1P・月1回更新・レポート', price: '¥30,000', note: '/月', featured: false },
  { name: 'スタンダード', desc: '複数P・SEO・月次改善提案', price: '¥50,000', note: '/月', featured: true },
  { name: 'プレミアム', desc: 'フルサポート・AI自動化込み', price: '¥100,000', note: '/月', featured: false },
];

const FLOW = [
  { step: '01', title: 'LINEで無料相談', body: '30秒で完了・費用0円' },
  { step: '02', title: 'ヒアリング・提案', body: '最短翌日にご提案' },
  { step: '03', title: 'AI制作スタート', body: '最短3日で初稿' },
  { step: '04', title: '公開・運用開始', body: '公開後も月額でサポート継続' },
];

const FAQ = [
  { q: '相談は本当に無料ですか？', a: '完全無料です。費用が発生するのはご契約後のみ。何度でもご相談いただけます。' },
  { q: 'Web制作が無料というのは本当ですか？', a: '期間限定で運用契約（月額¥30,000〜）を前提にWeb制作費を0円にしています。制作のみのご依頼はお受けしておりません。' },
  { q: '営業電話はかかってきますか？', a: 'かかってきません。LINEでのやり取りのみ。しつこい連絡は一切しません。' },
  { q: '制作期間はどれくらいですか？', a: 'LPなら最短3日、コーポレートサイトは2〜3週間が目安です。' },
  { q: 'どんな業種でも対応できますか？', a: '飲食・美容・士業・EC・建設など幅広く対応しています。まずご相談ください。' },
  { q: 'いつでも解約できますか？', a: 'はい。最低契約期間はありません。いつでも解約可能です。' },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, DEADLINE.getTime() - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
      {[{ v: time.d, l: '日' }, { v: time.h, l: '時間' }, { v: time.m, l: '分' }, { v: time.s, l: '秒' }].map((t, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ background: '#0a1628', border: '1px solid rgba(109,190,214,0.3)', borderRadius: 6, padding: '8px 12px', fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 900, color: '#6dbed6', minWidth: 52 }}>{pad(t.v)}</div>
          <div style={{ fontSize: '0.65rem', color: '#4a6580', marginTop: 4 }}>{t.l}</div>
        </div>
      ))}
    </div>
  );
}

function LineBtn({ large = false }: { large?: boolean }) {
  return (
    <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, background: '#06C755', color: '#fff', fontWeight: 900,
      fontSize: large ? '1.05rem' : '0.95rem',
      padding: large ? '18px 36px' : '14px 28px',
      borderRadius: 6, textDecoration: 'none',
      boxShadow: '0 4px 24px rgba(6,199,85,0.35)',
      letterSpacing: '0.03em',
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z" />
      </svg>
      LINEで無料相談する
    </a>
  );
}

export default function Page() {
  const cyan = '#6dbed6';
  const violet = '#7f5af0';
  const bg = '#060e1c';
  const bg2 = '#0a1628';
  const bg3 = '#0d1f35';
  const border = 'rgba(109,190,214,0.12)';
  const muted = '#4a6580';
  const text = '#e2e8f0';

  return (
    <div style={{ fontFamily: 'Noto Sans JP, sans-serif', background: bg, color: text, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes gridMove { from{background-position:0 0} to{background-position:44px 44px} }
        .fixed-line { position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; padding: 12px 16px 20px; background: linear-gradient(to top, #060e1c 60%, transparent); pointer-events: none; }
        .fixed-line a { pointer-events: all; display: flex; align-items: center; justify-content: center; gap: 10px; background: #06C755; color: #fff; font-weight: 900; font-size: 1rem; padding: 16px 24px; border-radius: 6px; text-decoration: none; box-shadow: 0 4px 32px rgba(6,199,85,0.5); animation: bounce 2.5s ease-in-out infinite; max-width: 480px; margin: 0 auto; width: 100%; }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 60px; background: rgba(6,14,28,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(109,190,214,0.1); }
        .nav-links { display: flex; gap: 24px; align-items: center; }
        .nav-links a { font-size: 0.8rem; color: #4a6580; text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover { color: #6dbed6; }
        section { padding: 72px 20px; }
        .inner { max-width: 640px; margin: 0 auto; }
        .inner-w { max-width: 900px; margin: 0 auto; }
        .sec-label { font-size: 0.68rem; letter-spacing: 0.25em; color: #6dbed6; font-weight: 700; margin-bottom: 8px; }
        .sec-title { font-size: clamp(1.4rem, 3.5vw, 2rem); font-weight: 900; color: #fff; line-height: 1.3; margin-bottom: 10px; }
        .sec-title span { color: #6dbed6; }
        .sec-sub { font-size: 0.88rem; color: #4a6580; line-height: 1.8; margin-bottom: 40px; }
        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(109,190,214,0.15), transparent); margin: 0; }
        .card { background: rgba(13,31,53,0.8); border: 1px solid rgba(109,190,214,0.12); border-radius: 12px; padding: 24px 20px; }
        @media(max-width:640px) { nav { padding: 0 1rem; } .nav-links { gap: 12px; } .nav-links a { font-size: 0.72rem; } section { padding: 56px 16px; } }
      `}</style>

      {/* 固定LINEボタン */}
      <div className="fixed-line">
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
          LINEで無料相談する
        </a>
      </div>

      {/* ナビ */}
      <nav>
        <Image src="/logo.png" alt="NEXTGAME" width={140} height={36} style={{ objectFit: 'contain' }} />
        <div className="nav-links">
          <a href="#services">サービス</a>
          <a href="#pricing">料金</a>
          <a href="#demo">デモ</a>
          <a href="#faq">FAQ</a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(109,190,214,0.1)', border: `1px solid rgba(109,190,214,0.35)`, color: cyan, padding: '6px 16px', borderRadius: 4, fontWeight: 700, fontSize: '0.8rem' }}>無料相談</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: bg, paddingTop: 100, paddingBottom: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(109,190,214,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(109,190,214,0.04) 1px,transparent 1px)`, backgroundSize: '44px 44px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse,rgba(109,190,214,0.1) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 40, right: '10%', width: 240, height: 240, background: 'radial-gradient(ellipse,rgba(127,90,240,0.07) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
          <FadeIn>
            <Image src="/logo.png" alt="NEXTGAME" width={220} height={56} style={{ objectFit: 'contain', marginBottom: 28 }} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', letterSpacing: '0.25em', color: cyan, border: `1px solid rgba(109,190,214,0.2)`, padding: '4px 14px', borderRadius: 2, marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: cyan, display: 'inline-block' }} />
              AI × WEB PRODUCTION & OPERATION
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900, lineHeight: 1.25, color: '#fff', marginBottom: 16 }}>
              AIで、Webの<span style={{ color: cyan }}>常識を壊す。</span>
            </h1>
            <p style={{ fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: muted, lineHeight: 1.9, marginBottom: 10 }}>
              100万のサイトを、AIが<strong style={{ color: cyan }}>3分の1のコスト</strong>で作る。
            </p>
            <p style={{ fontSize: '0.88rem', color: '#3a5470', marginBottom: 32 }}>
              そして<strong style={{ color: cyan }}>運用し続けること</strong>で、はじめて成果が生まれる。
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            {/* カウントダウン */}
            <div style={{ background: 'linear-gradient(135deg,rgba(109,190,214,0.08),rgba(109,190,214,0.03))', border: `1px solid rgba(109,190,214,0.2)`, borderRadius: 12, padding: '20px 24px', marginBottom: 28 }}>
              <div style={{ fontSize: '0.7rem', color: cyan, letterSpacing: '0.2em', marginBottom: 12, fontWeight: 700 }}>⚡ 期間限定 — Web制作費0円キャンペーン終了まで</div>
              <Countdown />
              <div style={{ fontSize: '0.72rem', color: muted, marginTop: 10 }}>運用契約（月額¥30,000〜）前提・先着10社限定</div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <LineBtn large />
              <a href={DEMO_URL} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', background: 'transparent', border: `1px solid rgba(109,190,214,0.35)`, borderRadius: 6, color: cyan, fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}>
                30秒でLP体験 →
              </a>
            </div>
            <p style={{ fontSize: '0.72rem', color: muted, marginTop: 14 }}>✓ 相談無料　✓ 最短3日納品　✓ しつこい営業なし</p>
          </FadeIn>

          {/* 数値バー */}
          <FadeIn delay={0.3}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden', marginTop: 40 }}>
              {[
                { v: '¥0', l: '初期費用' },
                { v: '3日', l: '最短納期' },
                { v: '1/3', l: 'コスト削減' },
                { v: '継続', l: '運用サポート' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '16px 8px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${border}` : 'none' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.3rem', fontWeight: 900, color: cyan }}>{item.v}</div>
                  <div style={{ fontSize: '0.68rem', color: muted, marginTop: 3 }}>{item.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── 課題提起 ── */}
      <section style={{ background: bg2 }} id="problems">
        <div className="inner">
          <FadeIn>
            <p className="sec-label">PROBLEMS</p>
            <h2 className="sec-title">作って<span>終わり</span>になっていませんか？</h2>
            <p className="sec-sub">多くの中小企業・店舗オーナーが抱える共通の悩みです</p>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
            {PROBLEMS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, ...{ background: 'rgba(109,190,214,0.03)', border: `1px solid ${border}`, borderRadius: 8, padding: '14px 18px' } }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 900, color: 'rgba(109,190,214,0.25)', flexShrink: 0 }}>{p.num}</div>
                  <div style={{ fontSize: '0.9rem', color: text, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{p.text}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>その悩み、<span style={{ color: cyan }}>全部解決できます。</span></p>
              <p style={{ fontSize: '0.82rem', color: muted, marginBottom: 24 }}>まずLINEで相談してみてください。</p>
              <LineBtn />
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── サービス ── */}
      <section style={{ background: bg }} id="services">
        <div className="inner">
          <FadeIn>
            <p className="sec-label">SERVICES</p>
            <h2 className="sec-title"><span>運用</span>で成果を出す3つの柱</h2>
            <p className="sec-sub">制作して終わりではなく、運用し続けることで成果を最大化します</p>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SERVICES.map((sv, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: sv.main ? 'rgba(109,190,214,0.05)' : bg2, border: sv.main ? `2px solid rgba(109,190,214,0.4)` : `1px solid ${border}`, borderRadius: 12, padding: '20px 18px', position: 'relative' }}>
                  {sv.badge && (
                    <div style={{ position: 'absolute', top: -10, left: 16, background: sv.badgeColor, color: sv.main ? '#060e1c' : '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 10px', borderRadius: 2, letterSpacing: '0.08em' }}>{sv.badge}</div>
                  )}
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 8, background: 'rgba(109,190,214,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dangerouslySetInnerHTML={{ __html: sv.icon }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{sv.name}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: cyan, fontWeight: 700 }}>{sv.price}<span style={{ fontSize: '0.7rem', color: muted }}>{sv.priceNote}</span></div>
                    </div>
                    <div style={{ fontSize: '0.83rem', color: muted, lineHeight: 1.7 }}>{sv.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── デモ体験 ── */}
      <section style={{ background: bg2 }} id="demo">
        <div className="inner">
          <FadeIn>
            <p className="sec-label">DEMO</p>
            <h2 className="sec-title">30秒で<span>あなたのLPを体験</span></h2>
            <p className="sec-sub">会社名とキャッチコピーを入力するだけ。AIが業種を判断してデザイン・コンテンツを自動生成します。</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 6, padding: '10px 14px' }}>
                  <div style={{ fontSize: '0.68rem', color: muted, marginBottom: 4 }}>会社名 / サービス名</div>
                  <div style={{ fontSize: '0.85rem', color: '#3a5470' }}>例：田中歯科クリニック</div>
                </div>
                <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 6, padding: '10px 14px' }}>
                  <div style={{ fontSize: '0.68rem', color: muted, marginBottom: 4 }}>キャッチコピー</div>
                  <div style={{ fontSize: '0.85rem', color: '#3a5470' }}>例：痛くない治療で笑顔を。</div>
                </div>
              </div>
              <a href={DEMO_URL} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', background: `linear-gradient(135deg,${cyan},${violet})`, borderRadius: 6, color: '#fff', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.05em' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                今すぐLPを生成する（無料）
              </a>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['歯科クリニック', '美容サロン', '整体院', 'カフェ', '不動産'].map((tag, i) => (
                <div key={i} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 4, padding: '5px 12px', fontSize: '0.72rem', color: muted }}>
                  {tag} で生成済み →
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── 料金 ── */}
      <section style={{ background: bg }} id="pricing">
        <div className="inner">
          <FadeIn>
            <p className="sec-label">PRICING</p>
            <h2 className="sec-title">明確な<span>料金体系</span></h2>
            <p className="sec-sub">初期費用0円・最低契約期間なし・いつでも解約可</p>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {PRICING.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: p.featured ? 'rgba(109,190,214,0.06)' : bg2, border: p.featured ? `2px solid ${cyan}` : `1px solid ${border}`, borderRadius: 10, padding: '16px 20px', gap: 12, position: 'relative' }}>
                  {p.featured && <div style={{ position: 'absolute', top: -10, left: 14, background: cyan, color: '#060e1c', fontSize: '0.65rem', fontWeight: 700, padding: '2px 10px', borderRadius: 2 }}>人気No.1</div>}
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: muted }}>{p.desc}</div>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 900, color: cyan, whiteSpace: 'nowrap', flexShrink: 0 }}>{p.price}<span style={{ fontSize: '0.7rem', color: muted }}>{p.note}</span></div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ textAlign: 'center' }}><LineBtn /></div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── フロー ── */}
      <section style={{ background: bg2 }} id="flow">
        <div className="inner">
          <FadeIn>
            <p className="sec-label">FLOW</p>
            <h2 className="sec-title">相談から<span>最短3日</span>で公開</h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 36 }}>
            {FLOW.map((f, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, paddingBottom: i < FLOW.length - 1 ? 24 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(109,190,214,0.12)', border: `1.5px solid ${cyan}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700, color: cyan }}>{f.step}</div>
                    {i < FLOW.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 20, background: `linear-gradient(to bottom,rgba(109,190,214,0.3),rgba(109,190,214,0.05))`, marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: 3 }}>{f.title}</div>
                    <div style={{ fontSize: '0.78rem', color: muted }}>{f.body}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div style={{ textAlign: 'center' }}><LineBtn /></div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── FAQ ── */}
      <section style={{ background: bg }} id="faq">
        <div className="inner">
          <FadeIn>
            <p className="sec-label">FAQ</p>
            <h2 className="sec-title">よくある<span>質問</span></h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
            {FAQ.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ padding: '16px 18px', fontSize: '0.88rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: cyan, fontWeight: 900, flexShrink: 0 }}>Q</span>{f.q}
                  </div>
                  <div style={{ padding: '0 18px 16px 42px', fontSize: '0.82rem', color: muted, lineHeight: 1.8 }}>{f.a}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div style={{ textAlign: 'center' }}><LineBtn /></div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── CTA ── */}
      <section style={{ background: `linear-gradient(135deg,#0a1628,#060e1c)`, textAlign: 'center', paddingBottom: 120 }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <FadeIn>
            <Image src="/logo.png" alt="NEXTGAME" width={160} height={40} style={{ objectFit: 'contain', marginBottom: 24 }} />
            <h2 style={{ fontSize: 'clamp(1.4rem,4vw,1.9rem)', fontWeight: 900, color: '#fff', lineHeight: 1.45, marginBottom: 12 }}>
              「とりあえず聞いてみる」<br />それだけで<span style={{ color: cyan }}>OKです。</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: muted, marginBottom: 32, lineHeight: 1.8 }}>
              相談・見積もり完全無料。<br />しつこい連絡は一切しません。
            </p>
            <LineBtn large />
            <p style={{ fontSize: '0.72rem', color: muted, marginTop: 16 }}>✓ 初期費用0円　✓ 最短3日納品　✓ 営業なし</p>
          </FadeIn>
        </div>
      </section>

      {/* フッター */}
      <footer style={{ padding: '24px 20px', borderTop: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Image src="/logo.png" alt="NEXTGAME" width={120} height={30} style={{ objectFit: 'contain' }} />
        <span style={{ fontSize: '0.72rem', color: muted }}>© 2026 NEXTGAME株式会社</span>
      </footer>
    </div>
  );
}
