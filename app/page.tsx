'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const LINE_URL = 'https://lin.ee/SJDJXQv';
const DEMO_URL = '/lp/new';
const SLOTS_TOTAL = 3;
const SLOTS_REMAINING = 1; // ← 残枠数をここで管理

const DEADLINE = new Date(Date.now() + 23 * 24 * 60 * 60 * 1000);

const PROBLEMS = [
  { num: '01', text: 'HPを作ったのに\n問い合わせが来ない' },
  { num: '02', text: '更新のたびに\n制作会社に追加費用' },
  { num: '03', text: 'SEOを頼んだが\n半年経っても効果なし' },
  { num: '04', text: '制作後に放置されて\n成果ゼロのまま' },
];

const PLANS = [
  {
    id: 'starter',
    name: 'STARTER',
    price: '¥29,800',
    note: '/月（税込¥32,780）',
    target: '個人事業主・小規模店舗',
    features: [
      'Webサイト制作（LP）込み・制作費0円',
      '月2回コンテンツ更新',
      '月次アクセスレポート',
      'LINE即レスサポート',
      '最低契約3ヶ月・以降月単位',
    ],
    featured: false,
    badge: '',
  },
  {
    id: 'growth',
    name: 'GROWTH',
    price: '¥59,800',
    note: '/月（税込¥65,780）',
    target: '中小企業・複数店舗オーナー',
    features: [
      'Webサイト制作（複数P）込み・制作費0円',
      '週1回コンテンツ更新',
      'SEO対策・検索順位改善',
      '月次改善提案レポート',
      'LINE即レスサポート',
      '最低契約3ヶ月・以降月単位',
    ],
    featured: true,
    badge: '人気No.1',
  },
  {
    id: 'scale',
    name: 'SCALE',
    price: '¥99,800',
    note: '/月（税込¥109,780）',
    target: '成長企業・EC・複数事業',
    features: [
      'フルWebサイト制作込み・制作費0円',
      '無制限コンテンツ更新',
      'SEO・AI自動化・広告連携',
      '専任担当者アサイン',
      '週次戦略MTG',
      '最低契約3ヶ月・以降月単位',
    ],
    featured: false,
    badge: 'フルサポート',
  },
];

const FLOW = [
  { step: '01', title: 'LINEで無料相談', body: '30秒で完了・費用0円・しつこい営業なし' },
  { step: '02', title: 'ヒアリング・プラン提案', body: '現状のWebを分析・最適プランをご提案' },
  { step: '03', title: 'サイト制作スタート', body: 'AIで最短3日で初稿・修正無制限' },
  { step: '04', title: '公開・運用開始', body: '公開後も毎月改善・成果にコミット' },
];

const FAQ = [
  { q: '制作費が本当に0円なのですか？', a: 'はい。月額サブスク契約（最低3ヶ月）を前提に、Web制作費は完全無料です。単発・制作のみのご依頼はお受けしていません。' },
  { q: '月3社限定とはどういうことですか？', a: '1社1社に本気で向き合うため、新規受付を月3社に限定しています。枠が埋まった場合はキャンセル待ちのご案内となります。' },
  { q: '3ヶ月後に解約できますか？', a: 'はい、3ヶ月の最低契約期間終了後は月単位でいつでも解約可能です。成果が出なければ続ける必要はありません。' },
  { q: 'どんな業種でも対応できますか？', a: '飲食・美容・医療・士業・EC・建設など幅広く対応しています。まずLINEでご相談ください。' },
  { q: '今すぐ契約しなくても相談できますか？', a: 'もちろんです。相談・見積もりは完全無料。しつこい営業は一切しません。まず話だけでも大歓迎です。' },
  { q: '既存のサイトがあっても依頼できますか？', a: 'はい、既存サイトの運用代行も可能です。現状分析から改善提案までLINEでご相談ください。' },
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
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
      {[{ v: time.d, l: '日' }, { v: time.h, l: '時間' }, { v: time.m, l: '分' }, { v: time.s, l: '秒' }].map((t, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ background: '#0a1628', border: '1px solid rgba(109,190,214,0.3)', borderRadius: 6, padding: '8px 12px', fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 900, color: '#6dbed6', minWidth: 52 }}>{pad(t.v)}</div>
          <div style={{ fontSize: '0.65rem', color: '#4a6580', marginTop: 4 }}>{t.l}</div>
        </div>
      ))}
    </div>
  );
}

function SlotBadge() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, padding: '10px 20px' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block', boxShadow: '0 0 8px #ef4444' }} />
      <span style={{ fontSize: '0.85rem', color: '#f87171', fontWeight: 700 }}>
        今月の受付枠 残り<span style={{ fontFamily: 'monospace', fontSize: '1.4rem', margin: '0 4px', color: '#fff' }}>{SLOTS_REMAINING}</span>社
      </span>
      <span style={{ fontSize: '0.72rem', color: '#4a6580' }}>/ {SLOTS_TOTAL}社</span>
    </div>
  );
}

function LineBtn({ large = false, text = 'LINEで無料相談する' }: { large?: boolean; text?: string }) {
  return (
    <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, background: '#06C755', color: '#fff', fontWeight: 900,
      fontSize: large ? '1.05rem' : '0.9rem',
      padding: large ? '18px 40px' : '14px 28px',
      borderRadius: 6, textDecoration: 'none',
      boxShadow: '0 4px 24px rgba(6,199,85,0.35)',
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z" />
      </svg>
      {text}
    </a>
  );
}

export default function Page() {
  const cyan = '#6dbed6';
  const violet = '#7f5af0';
  const bg = '#060e1c';
  const bg2 = '#0a1628';
  const border = 'rgba(109,190,214,0.12)';
  const muted = '#4a6580';
  const text = '#e2e8f0';

  return (
    <div style={{ fontFamily: 'Noto Sans JP, sans-serif', background: bg, color: text, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .fixed-line { position:fixed; bottom:0; left:0; right:0; z-index:9999; padding:12px 16px 20px; background:linear-gradient(to top,#060e1c 60%,transparent); pointer-events:none; }
        .fixed-line a { pointer-events:all; display:flex; align-items:center; justify-content:center; gap:10px; background:#06C755; color:#fff; font-weight:900; font-size:1rem; padding:16px 24px; border-radius:6px; text-decoration:none; box-shadow:0 4px 32px rgba(6,199,85,0.5); animation:bounce 2.5s ease-in-out infinite; max-width:480px; margin:0 auto; width:100%; }
        nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 2rem; height:60px; background:rgba(6,14,28,0.95); backdrop-filter:blur(16px); border-bottom:1px solid rgba(109,190,214,0.1); }
        .nav-links { display:flex; gap:20px; align-items:center; }
        .nav-links a { font-size:0.78rem; color:#4a6580; text-decoration:none; transition:color 0.2s; }
        .nav-links a:hover { color:#6dbed6; }
        .section { padding:72px 20px; }
        .inner { max-width:640px; margin:0 auto; }
        .inner-w { max-width:900px; margin:0 auto; }
        .sec-label { font-size:0.68rem; letter-spacing:0.25em; color:#6dbed6; font-weight:700; margin-bottom:8px; text-transform:uppercase; }
        .sec-title { font-size:clamp(1.5rem,3.5vw,2.2rem); font-weight:900; color:#fff; line-height:1.3; margin-bottom:10px; }
        .sec-title span { color:#6dbed6; }
        .sec-sub { font-size:0.88rem; color:#4a6580; line-height:1.8; margin-bottom:40px; }
        .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(109,190,214,0.15),transparent); }
        .plan-card { background:#0a1628; border:1px solid rgba(109,190,214,0.15); border-radius:16px; padding:32px 28px; transition:transform 0.2s; }
        .plan-card:hover { transform:translateY(-4px); }
        .plan-card.featured { border:2px solid #6dbed6; background:rgba(109,190,214,0.05); }
        .check-item { display:flex; align-items:flex-start; gap:10px; font-size:0.82rem; color:#94a3b8; line-height:1.6; margin-bottom:8px; }
        .check-icon { color:#6dbed6; font-weight:900; flex-shrink:0; margin-top:1px; }
        @media(max-width:640px) { nav { padding:0 1rem; } .nav-links { gap:12px; } .section { padding:56px 16px; } }
        @media(max-width:480px) { .nav-links a:not(:last-child) { display:none; } }
      `}</style>

      {/* 固定LINEボタン */}
      <div className="fixed-line">
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
          LINEで無料相談する（残{SLOTS_REMAINING}社）
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
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(6,199,85,0.12)', border: '1px solid rgba(6,199,85,0.35)', color: '#06C755', padding: '6px 16px', borderRadius: 4, fontWeight: 700 }}>
            無料相談
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="section" style={{ background: bg, paddingTop: 100, paddingBottom: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(109,190,214,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(109,190,214,0.04) 1px,transparent 1px)`, backgroundSize: '44px 44px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse,rgba(109,190,214,0.1) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 60, right: '8%', width: 260, height: 260, background: 'radial-gradient(ellipse,rgba(127,90,240,0.07) 0%,transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
          <FadeIn>
            <Image src="/logo.png" alt="NEXTGAME" width={200} height={52} style={{ objectFit: 'contain', marginBottom: 32 }} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', letterSpacing: '0.25em', color: cyan, border: `1px solid rgba(109,190,214,0.2)`, padding: '4px 14px', borderRadius: 2, marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: cyan, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
              AI × WEB SUBSCRIPTION
            </div>
            <h1 style={{ fontSize: 'clamp(1.9rem,5vw,3.2rem)', fontWeight: 900, lineHeight: 1.2, color: '#fff', marginBottom: 20 }}>
              サイトは作った瞬間から<br />
              <span style={{ color: cyan }}>劣化する。</span>
            </h1>
            <p style={{ fontSize: 'clamp(0.9rem,2vw,1.1rem)', color: muted, lineHeight: 1.9, marginBottom: 8 }}>
              運用し続けるから、成果が出る。
            </p>
            <p style={{ fontSize: '0.88rem', color: '#2d4a63', marginBottom: 32 }}>
              Web制作・運用・改善をまるごと月額サブスクで。<span style={{ color: cyan }}>初期費用0円・制作費0円。</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* 残枠バッジ */}
            <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
              <SlotBadge />
            </div>

            {/* カウントダウン */}
            <div style={{ background: 'rgba(109,190,214,0.05)', border: `1px solid rgba(109,190,214,0.15)`, borderRadius: 10, padding: '18px 24px', marginBottom: 28 }}>
              <div style={{ fontSize: '0.68rem', color: cyan, letterSpacing: '0.2em', marginBottom: 12, fontWeight: 700 }}>⚡ 制作費0円キャンペーン終了まで</div>
              <Countdown />
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
              <LineBtn large text={`無料相談する（残${SLOTS_REMAINING}社）`} />
              <a href={DEMO_URL} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', background: 'transparent', border: `1px solid rgba(109,190,214,0.3)`, borderRadius: 6, color: cyan, fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none' }}>
                30秒でLP体験 →
              </a>
            </div>
            <p style={{ fontSize: '0.72rem', color: muted }}>✓ 相談無料　✓ 最短3日納品　✓ 営業なし　✓ 3ヶ月後は月単位で解約自由</p>
          </FadeIn>

          {/* 数値バー */}
          <FadeIn delay={0.3}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden', marginTop: 48 }}>
              {[
                { v: '¥0', l: '初期費用' },
                { v: '3日', l: '最短納期' },
                { v: '月3社', l: '受付上限' },
                { v: '3ヶ月', l: '最低契約' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '16px 8px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${border}` : 'none' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 900, color: cyan }}>{item.v}</div>
                  <div style={{ fontSize: '0.68rem', color: muted, marginTop: 3 }}>{item.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── 課題提起 ── */}
      <section className="section" style={{ background: bg2 }} id="problems">
        <div className="inner">
          <FadeIn>
            <p className="sec-label">PROBLEMS</p>
            <h2 className="sec-title">作って<span>終わり</span>に<br />なっていませんか？</h2>
            <p className="sec-sub">多くの経営者が陥る「制作したのに成果ゼロ」の罠。</p>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
            {PROBLEMS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(109,190,214,0.03)', border: `1px solid ${border}`, borderRadius: 8, padding: '16px 18px' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 900, color: 'rgba(109,190,214,0.2)', flexShrink: 0 }}>{p.num}</div>
                  <div style={{ fontSize: '0.9rem', color: text, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{p.text}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.35}>
            <div style={{ background: `linear-gradient(135deg,rgba(109,190,214,0.08),rgba(109,190,214,0.03))`, border: `1px solid rgba(109,190,214,0.2)`, borderRadius: 10, padding: '20px 24px', marginBottom: 28, textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>
                原因はひとつ。<span style={{ color: cyan }}>「運用されていないから」</span>です。
              </p>
              <p style={{ fontSize: '0.82rem', color: muted }}>NEXTGAMEは運用にコミットするサブスク型Web会社です。</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LineBtn />
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── サービス ── */}
      <section className="section" style={{ background: bg }} id="services">
        <div className="inner">
          <FadeIn>
            <p className="sec-label">SERVICES</p>
            <h2 className="sec-title">すべて<span>サブスク</span>で<br />まるごとお任せ</h2>
            <p className="sec-sub">単発・スポット依頼は受け付けていません。月額継続前提で、本気で成果にコミットします。</p>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6dbed6" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
                name: 'Web制作',
                tag: 'サブスク特典',
                tagColor: cyan,
                price: '¥0',
                desc: 'サブスク契約者への特典として制作費0円。LP・コーポレートサイトをAIで最短3日で制作します。',
              },
              {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6dbed6" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
                name: 'Web運用代行',
                tag: 'メインサービス',
                tagColor: cyan,
                price: '¥29,800〜',
                desc: '更新・SEO・分析・改善まで月額で一括。成果が出るまで毎月PDCAを回し続けます。',
              },
              {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7f5af0" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
                name: 'AI運用自動化',
                tag: '強み',
                tagColor: violet,
                price: 'SCALE限定',
                desc: 'コンテンツ更新・データ分析・レポート作成をAIで自動化。人件費を削減しながら品質を向上させます。',
              },
            ].map((sv, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: bg2, border: `1px solid ${border}`, borderRadius: 12, padding: '20px 18px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -10, left: 16, background: sv.tagColor, color: '#060e1c', fontSize: '0.62rem', fontWeight: 700, padding: '2px 10px', borderRadius: 2, letterSpacing: '0.08em' }}>{sv.tag}</div>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 8, background: 'rgba(109,190,214,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dangerouslySetInnerHTML={{ __html: sv.icon }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{sv.name}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: cyan, fontWeight: 700 }}>{sv.price}</div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.7 }}>{sv.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 料金プラン ── */}
      <section className="section" style={{ background: bg2 }} id="pricing">
        <div className="inner-w">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p className="sec-label">PRICING</p>
              <h2 className="sec-title">シンプルな<span>サブスクプラン</span></h2>
              <p className="sec-sub">初期費用0円・制作費0円・最低3ヶ月・以降月単位で解約自由</p>
              <SlotBadge />
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {PLANS.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`plan-card ${plan.featured ? 'featured' : ''}`} style={{ position: 'relative' }}>
                  {plan.badge && (
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: plan.featured ? cyan : 'rgba(109,190,214,0.2)', color: plan.featured ? '#060e1c' : cyan, fontSize: '0.65rem', fontWeight: 700, padding: '3px 14px', borderRadius: 2, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{plan.badge}</div>
                  )}
                  <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: cyan, marginBottom: 6, fontWeight: 700 }}>{plan.name}</p>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.8rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 4 }}>{plan.price}</div>
                  <div style={{ fontSize: '0.72rem', color: muted, marginBottom: 4 }}>{plan.note}</div>
                  <div style={{ fontSize: '0.75rem', color: cyan, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${border}` }}>{plan.target}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} className="check-item">
                        <span className="check-icon">✓</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 24 }}>
                    <LineBtn text="このプランで相談する" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: muted, marginTop: 20 }}>
              ※ 表示価格は税抜です　※ 月3社限定・枠が埋まり次第受付終了
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── デモ体験 ── */}
      <section className="section" style={{ background: bg }} id="demo">
        <div className="inner">
          <FadeIn>
            <p className="sec-label">DEMO</p>
            <h2 className="sec-title">30秒で<span>クオリティを体験</span></h2>
            <p className="sec-sub">会社名とキャッチコピーを入力するだけ。AIが業種を分析してデザイン・コンテンツを自動生成します。</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                {[
                  { label: '会社名 / サービス名', placeholder: '例：〇〇クリニック' },
                  { label: 'キャッチコピー', placeholder: '例：地域で選ばれる理由があります' },
                ].map((f, i) => (
                  <div key={i} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 6, padding: '10px 14px' }}>
                    <div style={{ fontSize: '0.65rem', color: muted, marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: '0.82rem', color: '#2d4a63' }}>{f.placeholder}</div>
                  </div>
                ))}
              </div>
              <a href={DEMO_URL} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', background: `linear-gradient(135deg,${cyan},${violet})`, borderRadius: 6, color: '#fff', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                今すぐLPを無料生成する
              </a>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['歯科クリニック', '美容サロン', '整体院', 'カフェ', '不動産'].map((tag, i) => (
                <span key={i} style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 4, padding: '4px 12px', fontSize: '0.72rem', color: muted }}>{tag} で生成済み</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── フロー ── */}
      <section className="section" style={{ background: bg2 }} id="flow">
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
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(109,190,214,0.1)', border: `1.5px solid ${cyan}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '0.78rem', fontWeight: 700, color: cyan }}>{f.step}</div>
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
      <section className="section" style={{ background: bg }} id="faq">
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
      <section className="section" style={{ background: `linear-gradient(135deg,#0a1628,#060e1c)`, textAlign: 'center', paddingBottom: 120 }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <FadeIn>
            <Image src="/logo.png" alt="NEXTGAME" width={160} height={40} style={{ objectFit: 'contain', marginBottom: 28 }} />
            <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
              <SlotBadge />
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.4, marginBottom: 12 }}>
              「とりあえず聞いてみる」<br />それだけで<span style={{ color: cyan }}>OKです。</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: muted, marginBottom: 32, lineHeight: 1.8 }}>
              相談・見積もり完全無料。<br />しつこい連絡は一切しません。<br />枠が埋まる前にご相談ください。
            </p>
            <LineBtn large text={`無料相談する（残${SLOTS_REMAINING}社）`} />
            <p style={{ fontSize: '0.72rem', color: muted, marginTop: 16 }}>✓ 初期費用0円　✓ 制作費0円　✓ 最短3日　✓ 3ヶ月後は自由解約</p>
          </FadeIn>
        </div>
      </section>

      {/* フッター */}
      <footer style={{ padding: '24px 20px', borderTop: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Image src="/logo.png" alt="NEXTGAME" width={120} height={30} style={{ objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: 20, fontSize: '0.75rem', color: muted }}>
          <span>© 2026 NEXTGAME株式会社</span>
        </div>
      </footer>
    </div>
  );
}
