'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LINE_URL = 'https://lin.ee/SJDJXQv';

const INDUSTRIES = [
  '飲食店', '美容サロン', '歯科クリニック', '整体院・整骨院',
  '不動産', '学習塾', 'EC・通販', 'IT・Web', '建設・工務店', 'その他',
];

const PLANS = [
  {
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

const REVIEWS = [
  {
    star: 5,
    text: '制作費0円で本格的なサイトが3日で完成。毎月の更新も任せられて、問い合わせが月2件から12件に増えました。',
    name: '山田 太郎',
    role: '整体院オーナー',
    icon: '🏥',
  },
  {
    star: 5,
    text: '他社は制作費30万円と言われたのに、NEXTGAMEは月額だけ。SEO対策も込みで半年でGoogle1位を取れました。',
    name: '佐藤 花子',
    role: '美容サロン経営者',
    icon: '💅',
  },
  {
    star: 5,
    text: 'LINEで気軽に相談できて営業感ゼロ。AIでLP生成を体験したら即決しました。コスパ最強です。',
    name: '鈴木 一郎',
    role: '不動産会社 代表',
    icon: '🏢',
  },
];

const FAQ = [
  { q: '制作費が本当に0円なのですか？', a: 'はい。月額サブスク契約（最低3ヶ月）を前提に、Web制作費は完全無料です。単発・制作のみのご依頼はお受けしていません。' },
  { q: '月3社限定とはどういうことですか？', a: '1社1社に本気で向き合うため、新規受付を月3社に限定しています。枠が埋まった場合はキャンセル待ちのご案内となります。' },
  { q: '3ヶ月後に解約できますか？', a: 'はい、3ヶ月の最低契約期間終了後は月単位でいつでも解約可能です。成果が出なければ続ける必要はありません。' },
  { q: 'どんな業種でも対応できますか？', a: '飲食・美容・医療・士業・EC・建設など幅広く対応しています。まずLINEでご相談ください。' },
  { q: '今すぐ契約しなくても相談できますか？', a: 'もちろんです。相談・見積もり完全無料。しつこい営業は一切しません。まず話だけでも大歓迎です。' },
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

function LineBtn({ large = false, text = 'LINEで無料相談する' }: { large?: boolean; text?: string }) {
  return (
    <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, background: '#06C755', color: '#fff', fontWeight: 900,
      fontSize: large ? '1.05rem' : '0.9rem',
      padding: large ? '18px 40px' : '14px 28px',
      borderRadius: 6, textDecoration: 'none',
      boxShadow: '0 4px 24px rgba(6,199,85,0.35)',
      width: '100%',
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z" />
      </svg>
      {text}
    </a>
  );
}

export default function Page() {
  const router = useRouter();
  const cyan = '#6dbed6';
  const gold = '#c8a84a';
  const bg = '#000000';
  const bg2 = '#0a0a0a';
  const bg3 = '#111111';
  const border = 'rgba(109,190,214,0.12)';
  const borderGold = 'rgba(200,168,74,0.15)';
  const muted = '#555';
  const text = '#e2e8f0';

  const [step, setStep] = useState<'form' | 'loading' | 'done'>('form');
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [otherIndustry, setOtherIndustry] = useState('');
  const [error, setError] = useState('');
  const [generatedSlug, setGeneratedSlug] = useState('');

  const handleGenerate = async () => {
    if (!title) { setError('会社名・サービス名を入力してください'); return; }
    if (industry === 'その他' && !otherIndustry) { setError('業種を入力してください'); return; }
    setError('');
    setStep('loading');
    const industryLabel = industry === 'その他' ? otherIndustry : industry;
    try {
      const res = await fetch('/api/create-lp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          sub_title: '',
          content: industryLabel ? ('業種：' + industryLabel) : '',
          client_name: '',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setGeneratedSlug(data.slug);
      setStep('done');
    } catch (e) {
      setError(String(e));
      setStep('form');
    }
  };

  return (
    <div style={{ fontFamily: 'Noto Sans JP, sans-serif', background: bg, color: text, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fixed-line { position:fixed; bottom:0; left:0; right:0; z-index:9999; padding:12px 16px 20px; background:linear-gradient(to top,#000 60%,transparent); pointer-events:none; }
        .fixed-line a { pointer-events:all; display:flex; align-items:center; justify-content:center; gap:10px; background:#06C755; color:#fff; font-weight:900; font-size:1rem; padding:16px 24px; border-radius:6px; text-decoration:none; box-shadow:0 4px 32px rgba(6,199,85,0.5); animation:bounce 2.5s ease-in-out infinite; max-width:480px; margin:0 auto; width:100%; }
        .section { padding:64px 20px; }
        .inner { max-width:560px; margin:0 auto; }
        .inner-w { max-width:900px; margin:0 auto; }
        .sec-label { font-size:0.68rem; letter-spacing:0.25em; color:#c8a84a; font-weight:700; margin-bottom:8px; text-transform:uppercase; }
        .sec-title { font-size:clamp(1.4rem,3.5vw,2.2rem); font-weight:900; color:#fff; line-height:1.3; margin-bottom:10px; }
        .sec-title span { color:#6dbed6; }
        .sec-sub { font-size:0.9rem; color:#555; line-height:1.8; margin-bottom:32px; }
        .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(200,168,74,0.15),transparent); }
        .plan-card { background:#0a0a0a; border:1px solid rgba(109,190,214,0.15); border-radius:16px; padding:28px 20px; transition:transform 0.2s; }
        .plan-card.featured { border:2px solid #6dbed6; background:rgba(109,190,214,0.04); }
        .check-item { display:flex; align-items:flex-start; gap:10px; font-size:0.85rem; color:#94a3b8; line-height:1.6; margin-bottom:8px; }
        .check-icon { color:#c8a84a; font-weight:900; flex-shrink:0; margin-top:1px; }
        .ind-btn { background:transparent; border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:8px 14px; color:#555; font-size:0.8rem; cursor:pointer; transition:all 0.15s; font-family:inherit; }
        .ind-btn:hover { border-color:rgba(109,190,214,0.4); color:#999; }
        .ind-btn.active { border-color:#6dbed6; color:#6dbed6; background:rgba(109,190,214,0.06); }
        .inp { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:6px; padding:16px 18px; color:#e8e8e8; font-size:16px; font-family:inherit; outline:none; transition:border-color 0.2s; }
        .inp:focus { border-color:rgba(109,190,214,0.5); }
        .inp::placeholder { color:#333; }
        @media(max-width:768px) {
          .section { padding:48px 16px; }
          .plans-grid { grid-template-columns:1fr !important; }
          .stats-grid { grid-template-columns:repeat(2,1fr) !important; }
          .hero-section { padding-top:88px !important; padding-bottom:48px !important; }
        }
      `}</style>

      {/* 固定LINEボタン */}
      <div className="fixed-line">
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
          LINEで無料相談する
        </a>
      </div>

      {/* ── HERO：LP生成フォーム ── */}
      <section className="hero-section" style={{ background: bg, paddingTop: 100, paddingBottom: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,168,74,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,74,0.03) 1px,transparent 1px)`, backgroundSize: '44px 44px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse,rgba(109,190,214,0.08) 0%,transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto', padding: '0 16px' }}>

          {step === 'form' && (
            <>
              <FadeIn>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, border: `1px solid rgba(200,168,74,0.2)`, padding: '4px 14px', borderRadius: 2, marginBottom: 20 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: gold, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                  FREE LP GENERATOR
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem,6vw,3rem)', fontWeight: 900, lineHeight: 1.2, color: '#fff', marginBottom: 12 }}>
                  会社名を入れるだけ。<br />
                  <span style={{ color: cyan }}>AIが全部作る。</span>
                </h1>
                <p style={{ fontSize: 'clamp(0.88rem,2.5vw,1rem)', color: muted, lineHeight: 1.8, marginBottom: 32 }}>
                  業種・キャッチコピー・デザイン・コンテンツすべてAIが自動生成。<br />30秒で本格LPが完成します。
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 16, padding: '24px 20px', marginBottom: 16, textAlign: 'left' }}>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: gold, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>
                      会社名・サービス名 *
                    </label>
                    <input
                      className="inp"
                      type="text"
                      placeholder="例：山田整体院"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: muted, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>
                      業種を選ぶ（任意）
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {INDUSTRIES.map(ind => (
                        <button
                          key={ind}
                          className={industry === ind ? 'ind-btn active' : 'ind-btn'}
                          onClick={() => { setIndustry(industry === ind ? '' : ind); setOtherIndustry(''); }}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                    {industry === 'その他' && (
                      <input
                        className="inp"
                        type="text"
                        placeholder="業種を入力（例：ペットサロン）"
                        value={otherIndustry}
                        onChange={e => setOtherIndustry(e.target.value)}
                        style={{ marginTop: 10 }}
                      />
                    )}
                  </div>

                  {error && (
                    <div style={{ background: 'rgba(109,190,214,0.06)', border: '1px solid rgba(109,190,214,0.2)', borderRadius: 6, padding: '10px 14px', fontSize: '0.85rem', color: '#f87171', marginBottom: 14 }}>
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleGenerate}
                    style={{ width: '100%', padding: '18px', background: `linear-gradient(135deg,${gold},#e8d48a)`, border: 'none', borderRadius: 8, color: '#000', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    AIでLPを無料生成する
                  </button>
                </div>
                <p style={{ fontSize: '0.72rem', color: muted }}>✓ クレカ不要　✓ 登録不要　✓ 完全無料</p>
              </FadeIn>
            </>
          )}

          {step === 'loading' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: 24 }}>
              <div style={{ width: 48, height: 48, border: '2px solid rgba(200,168,74,0.15)', borderTopColor: gold, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: gold, letterSpacing: '0.15em', marginBottom: 8, fontWeight: 700 }}>AIがLPを生成中...</p>
                <p style={{ fontSize: '0.8rem', color: muted }}>業種分析 → キャッチコピー生成 → デザイン適用</p>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: 24 }}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" style={{ display: 'block', margin: '0 auto' }}>
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 900, color: '#fff', marginBottom: 8 }}>LP生成完了！</h2>
              <p style={{ fontSize: '0.88rem', color: muted, marginBottom: 28, lineHeight: 1.7 }}>
                約1〜2分でビルドが完了します。
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a  // ← ここを修正（追加）しました
                  href={`/lp/${generatedSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px', background: `linear-gradient(135deg,${gold},#e8d48a)`, borderRadius: 8, color: '#000', fontSize: '1rem', fontWeight: 900, textDecoration: 'none' }}
                >
                  生成されたLPを見る →
                </a>
                <button
                  onClick={() => { setStep('form'); setTitle(''); setIndustry(''); setOtherIndustry(''); }}
                  style={{ padding: '14px', background: 'transparent', border: `1px solid ${borderGold}`, borderRadius: 8, color: gold, fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  もう一度生成する
                </button>
                <LineBtn text="このLPをサブスクで運用する" />
              </div>
            </div>
          )}

          {/* 数値バー */}
          {step === 'form' && (
            <FadeIn delay={0.2}>
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: `1px solid ${borderGold}`, borderRadius: 8, overflow: 'hidden', marginTop: 32 }}>
                {[
                  { v: '¥0', l: '初期費用' },
                  { v: '30秒', l: 'LP生成時間' },
                  { v: '無制限', l: '業種対応' },
                  { v: '完全無料', l: '登録不要' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '14px 8px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${borderGold}` : 'none' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 900, color: gold }}>{item.v}</div>
                    <div style={{ fontSize: '0.65rem', color: muted, marginTop: 3 }}>{item.l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      <div className="divider" />

      {/* ── サブスク説明 ── */}
      <section className="section" style={{ background: bg2, textAlign: 'center' }}>
        <div className="inner">
          <FadeIn>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.68rem', letterSpacing: '0.25em', color: cyan, border: `1px solid rgba(109,190,214,0.2)`, padding: '4px 14px', borderRadius: 2, marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: cyan, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
              AI × WEB SUBSCRIPTION
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 900, lineHeight: 1.2, color: '#fff', marginBottom: 16 }}>
              サイトは作った瞬間から<br />
              <span style={{ color: cyan }}>劣化する。</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.9, marginBottom: 8 }}>運用し続けるから、成果が出る。</p>
            <p style={{ fontSize: '0.88rem', color: '#333', marginBottom: 28 }}>
              Web制作・運用・改善をまるごと月額サブスクで。<span style={{ color: gold }}>初期費用0円・制作費0円。</span>
            </p>
            <LineBtn large text="無料相談する" />
            <p style={{ fontSize: '0.72rem', color: muted, marginTop: 12 }}>✓ 相談無料　✓ 最短3日納品　✓ 営業なし</p>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── 課題提起 ── */}
      <section className="section" style={{ background: bg }}>
        <div className="inner">
          <FadeIn>
            <p className="sec-label">PROBLEMS</p>
            <h2 className="sec-title">作って<span>終わり</span>に<br />なっていませんか？</h2>
            <p className="sec-sub">多くの経営者が陥る「制作したのに成果ゼロ」の罠。</p>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {[
              { num: '01', text: 'HPを作ったのに\n問い合わせが来ない' },
              { num: '02', text: '更新のたびに\n制作会社に追加費用' },
              { num: '03', text: 'SEOを頼んだが\n半年経っても効果なし' },
              { num: '04', text: '制作後に放置されて\n成果ゼロのまま' },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: bg2, border: `1px solid ${border}`, borderRadius: 8, padding: '16px 18px' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 900, color: 'rgba(200,168,74,0.2)', flexShrink: 0 }}>{p.num}</div>
                  <div style={{ fontSize: '0.9rem', color: text, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{p.text}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ background: `linear-gradient(135deg,rgba(200,168,74,0.08),rgba(200,168,74,0.03))`, border: `1px solid rgba(200,168,74,0.2)`, borderRadius: 10, padding: '20px 24px', marginBottom: 24, textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>
                原因はひとつ。<span style={{ color: cyan }}>「運用されていないから」</span>です。
              </p>
              <p style={{ fontSize: '0.85rem', color: muted }}>NEXTGAMEは運用にコミットするサブスク型Web会社です。</p>
            </div>
            <LineBtn text="LINEで無料相談する" />
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── 料金プラン ── */}
      <section className="section" style={{ background: bg2 }} id="pricing">
        <div className="inner-w">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <p className="sec-label">PRICING</p>
              <h2 className="sec-title">シンプルな<span>サブスクプラン</span></h2>
              <p className="sec-sub">初期費用0円・制作費0円・最低3ヶ月・以降月単位で解約自由</p>
            </div>
          </FadeIn>
          <div className="plans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {PLANS.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`plan-card ${plan.featured ? 'featured' : ''}`} style={{ position: 'relative' }}>
                  {plan.badge && (
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: plan.featured ? cyan : 'rgba(109,190,214,0.2)', color: plan.featured ? '#000' : cyan, fontSize: '0.65rem', fontWeight: 700, padding: '3px 14px', borderRadius: 2, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{plan.badge}</div>
                  )}
                  <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: gold, marginBottom: 6, fontWeight: 700 }}>{plan.name}</p>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.8rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 4 }}>{plan.price}</div>
                  <div style={{ fontSize: '0.72rem', color: muted, marginBottom: 4 }}>{plan.note}</div>
                  <div style={{ fontSize: '0.75rem', color: cyan, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${border}` }}>{plan.target}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 24 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} className="check-item">
                        <span className="check-icon">✓</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <LineBtn text="このプランで相談する" />
                </div>
              </FadeIn>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: muted, marginTop: 20 }}>
            ※ 表示価格は税抜です　※ 月3社限定・枠が埋まり次第受付終了
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* ── 口コミ ── */}
      <section className="section" style={{ background: bg }} id="reviews">
        <div className="inner">
          <FadeIn>
            <p className="sec-label">REVIEWS</p>
            <h2 className="sec-title">お客様の<span>声</span></h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {REVIEWS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: bg3, border: `1px solid ${borderGold}`, borderRadius: 12, padding: '24px 20px' }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                    {Array.from({ length: r.star }).map((_, j) => (
                      <span key={j} style={{ color: gold, fontSize: '1rem' }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: text, lineHeight: 1.8, marginBottom: 16 }}>{r.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(200,168,74,0.1)', border: `1px solid ${borderGold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{r.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{r.name}</div>
                      <div style={{ fontSize: '0.75rem', color: muted }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
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
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(200,168,74,0.1)', border: `1.5px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '0.78rem', fontWeight: 700, color: gold }}>{f.step}</div>
                    {i < FLOW.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 20, background: `linear-gradient(to bottom,rgba(200,168,74,0.3),rgba(200,168,74,0.05))`, marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: 3 }}>{f.title}</div>
                    <div style={{ fontSize: '0.82rem', color: muted }}>{f.body}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <LineBtn text="LINEで無料相談する" />
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
                <div style={{ background: bg3, border: `1px solid ${border}`, borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ padding: '16px 18px', fontSize: '0.9rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: gold, fontWeight: 900, flexShrink: 0 }}>Q</span>{f.q}
                  </div>
                  <div style={{ padding: '0 18px 16px 42px', fontSize: '0.85rem', color: muted, lineHeight: 1.8 }}>{f.a}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <LineBtn text="LINEで無料相談する" />
        </div>
      </section>

      <div className="divider" />

      {/* ── CTA ── */}
      <section className="section" style={{ background: bg, textAlign: 'center', paddingBottom: 120 }}>
        <div className="inner">
          <FadeIn>
            <Image src="/logo.png" alt="NEXTGAME" width={160} height={40} style={{ objectFit: 'contain', marginBottom: 28 }} />
            <h2 style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.4, marginBottom: 12 }}>
              「とりあえず聞いてみる」<br />それだけで<span style={{ color: cyan }}>OKです。</span>
            </h2>
            <p style={{ fontSize: '0.88rem', color: muted, marginBottom: 32, lineHeight: 1.8 }}>
              相談・見積もり完全無料。<br />しつこい連絡は一切しません。
            </p>
            <LineBtn large text="無料相談する" />
            <p style={{ fontSize: '0.72rem', color: muted, marginTop: 16 }}>✓ 初期費用0円　✓ 制作費0円　✓ 最短3日　✓ 3ヶ月後は自由解約</p>
          </FadeIn>
        </div>
      </section>

      {/* フッター */}
      <footer style={{ padding: '24px 20px', borderTop: `1px solid ${borderGold}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Image src="/logo.png" alt="NEXTGAME" width={120} height={30} style={{ objectFit: 'contain' }} />
        <span style={{ fontSize: '0.75rem', color: muted }}>© 2026 NEXTGAME株式会社</span>
      </footer>
    </div>
  );
}
