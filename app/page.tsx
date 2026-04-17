"use client"

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CONTACT_URL = '/contact';

const PLANS = [
  {
    name: 'STARTER',
    price: '29,800',
    tax: '32,780',
    target: '個人事業主・小規模店舗',
    features: [
      'Webサイト制作（LP）込み',
      '月2回コンテンツ更新',
      '月次アクセスレポート',
      'チャット即レスサポート',
      '最低3ヶ月・以降月単位',
    ],
    featured: false,
    badge: '',
  },
  {
    name: 'GROWTH',
    price: '59,800',
    tax: '65,780',
    target: '中小企業・複数店舗オーナー',
    features: [
      'Webサイト制作（複数P）込み',
      '週1回コンテンツ更新',
      'SEO対策・検索順位改善',
      '月次改善提案レポート',
      'チャット即レスサポート',
      '最低3ヶ月・以降月単位',
    ],
    featured: true,
    badge: '人気No.1',
  },
  {
    name: 'SCALE',
    price: '99,800',
    tax: '109,780',
    target: '成長企業・EC・複数事業',
    features: [
      'フルWebサイト制作込み',
      '無制限コンテンツ更新',
      'SEO・AI自動化・広告連携',
      '専任担当者アサイン',
      '週次戦略MTG',
      '最低3ヶ月・以降月単位',
    ],
    featured: false,
    badge: 'フルサポート',
  },
];

const REVIEWS = [
  {
    star: 5,
    text: '制作費0円で本格サイトが3日で完成。問い合わせが月2件→12件に。広告費ゼロで集客が回り始めた実感があります。',
    name: '山田 太郎',
    role: '整体院オーナー',
    result: '問い合わせ6倍',
    initial: '山',
  },
  {
    star: 5,
    text: '他社から制作費30万の見積もりを断り、こちらへ。半年でGoogle検索1位を獲得。月次レポートで改善が可視化されます。',
    name: '佐藤 花子',
    role: '美容サロン経営者',
    result: 'Google検索1位',
    initial: '佐',
  },
  {
    star: 5,
    text: 'AIでLP生成を体験した瞬間に即決。営業感ゼロで相談しやすく、3ヶ月でサイト経由の売上が1.8倍になりました。',
    name: '鈴木 一郎',
    role: '不動産会社 代表',
    result: '売上1.8倍',
    initial: '鈴',
  },
];

const FAQ = [
  { q: '制作費が本当に0円なのですか？', a: 'はい。月額サブスク契約（最低3ヶ月）を前提に、Web制作費は完全無料です。単発依頼はお受けしていません。' },
  { q: '3ヶ月後に解約できますか？', a: '最低契約期間終了後は月単位でいつでも解約可能です。成果が出なければ続ける必要はありません。' },
  { q: 'どんな業種でも対応できますか？', a: '飲食・美容・医療・士業・EC・建設など14業種以上に対応。まずご相談ください。' },
  { q: '既存サイトがあっても依頼できますか？', a: 'はい。AI診断で課題を可視化してから、改善提案まで対応します。' },
  { q: 'AIで生成したLPはどのくらいの品質ですか？', a: 'このページのサンプルセクションからご確認ください。実際に30秒で生成されたものです。' },
];

// SVGアイコン
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconLayers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconTrendUp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const JOURNEY = [
  { step: '01', Icon: IconZap, title: 'AI診断', desc: 'URLを入力するだけ。30秒で課題を可視化', color: '#c8a84a' },
  { step: '02', Icon: IconLayers, title: 'LP自動生成', desc: '業種・強みを選ぶだけで本格LPが完成', color: '#6dbed6' },
  { step: '03', Icon: IconTrendUp, title: 'サブスク運用', desc: '毎月改善・更新で集客が継続的に成長', color: '#10b981' },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        let start = 0;
        const step = target / (1500 / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

export default function Page() {
  const router = useRouter();
  const gold = '#c8a84a';
  const cyan = '#6dbed6';
  const bg = '#000';
  const bg2 = '#060610';
  const bg3 = '#0a0a18';
  const bg4 = '#04040c';
  const border = 'rgba(255,255,255,0.06)';
  const borderGold = 'rgba(200,168,74,0.16)';
  const muted = '#555';

  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleDiagnose = () => {
    if (!url.trim()) { router.push('/lp/new'); return; }
    try { new URL(url.startsWith('http') ? url : 'https://' + url); }
    catch { setUrlError('正しいURLを入力してください'); return; }
    setUrlError('');
    const normalizedUrl = url.startsWith('http') ? url : 'https://' + url;
    router.push('/lp/diagnose?url=' + encodeURIComponent(normalizedUrl));
  };

  return (
    <div style={{ fontFamily: 'Noto Sans JP, sans-serif', background: bg, color: '#e2e8f0', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        .fade-up{animation:fadeUp 0.5s ease forwards;}
        .fixed-cta{position:fixed;bottom:0;left:0;right:0;z-index:9999;padding:10px 16px 20px;background:linear-gradient(to top,rgba(0,0,0,0.98) 60%,transparent);pointer-events:none;}
        .fixed-cta a{pointer-events:all;display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#c8a84a,#e8d48a);color:#000;font-weight:900;font-size:0.95rem;padding:16px 24px;border-radius:8px;text-decoration:none;box-shadow:0 4px 24px rgba(200,168,74,0.22);animation:bounce 3s ease-in-out infinite;max-width:480px;margin:0 auto;width:100%;}
        .section{padding:64px 20px;}
        .inner{max-width:540px;margin:0 auto;}
        .inner-w{max-width:860px;margin:0 auto;}
        .sec-label{font-size:0.6rem;letter-spacing:0.35em;color:#c8a84a;font-weight:700;margin-bottom:10px;text-transform:uppercase;display:block;}
        .sec-title{font-size:clamp(1.4rem,3.2vw,2rem);font-weight:900;color:#fff;line-height:1.3;margin-bottom:10px;letter-spacing:-0.02em;}
        .sec-sub{font-size:0.86rem;color:#4a4a4a;line-height:1.85;margin-bottom:32px;}
        .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.07),transparent);}
        .inp{width:100%;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:15px 18px;color:#e8e8e8;font-size:16px;font-family:inherit;outline:none;transition:border-color 0.2s;}
        .inp:focus{border-color:rgba(200,168,74,0.4);}
        .inp::placeholder{color:#222;}
        .plan-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:26px 20px;}
        .plan-card.featured{border:1.5px solid #6dbed6;background:rgba(109,190,214,0.025);}
        .faq-item{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:10px;overflow:hidden;cursor:pointer;margin-bottom:8px;transition:border-color 0.2s;}
        .faq-item:hover{border-color:rgba(200,168,74,0.16);}
        .faq-q{padding:16px 18px;font-size:0.88rem;font-weight:700;color:#fff;display:flex;justify-content:space-between;align-items:center;gap:12px;}
        .faq-a{padding:0 18px 16px 18px;font-size:0.83rem;color:#4a4a4a;line-height:1.85;}
        .stat-card{padding:22px 14px;text-align:center;border-right:1px solid rgba(200,168,74,0.08);}
        .stat-card:last-child{border-right:none;}
        @media(max-width:768px){
          .section{padding:48px 16px;}
          .plans-grid{grid-template-columns:1fr !important;}
          .stats-grid{grid-template-columns:repeat(2,1fr) !important;}
          .reasons-grid{grid-template-columns:1fr !important;}
          .journey-grid{grid-template-columns:1fr !important;}
          .hero-pad{padding-top:88px !important;padding-bottom:56px !important;}
        }
      `}</style>

      {/* 固定CTA */}
      <div className="fixed-cta">
        <a href={CONTACT_URL}>
          <IconMail />
          無料相談・お問い合わせ
        </a>
      </div>

      {/* HERO ── #000 */}
      <section className="hero-pad" style={{ paddingTop: 96, paddingBottom: 72, textAlign: 'center', position: 'relative', overflow: 'hidden', background: bg }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,168,74,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,74,0.015) 1px,transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 480, background: 'radial-gradient(ellipse,rgba(109,190,214,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 500, margin: '0 auto', padding: '0 16px', animation: 'fadeUp 0.5s ease forwards' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.6rem', letterSpacing: '0.3em', color: gold, border: `1px solid rgba(200,168,74,0.16)`, padding: '4px 14px', borderRadius: 2, marginBottom: 22 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: gold, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            AI WEB DIAGNOSTIC
          </div>
          <h1 style={{ fontSize: 'clamp(1.9rem,5.5vw,3.2rem)', fontWeight: 900, lineHeight: 1.12, color: '#fff', marginBottom: 16, letterSpacing: '-0.03em' }}>
            運用し続けるから、<br />
            <span style={{ color: gold }}>成果が出る。</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.86rem,1.8vw,0.96rem)', color: muted, lineHeight: 1.85, marginBottom: 32 }}>
            初期費用0円・制作費0円・最短3日納品。<br />AIが診断し、プロが運用。集客を仕組み化します。
          </p>
          <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 14, padding: '22px 18px', textAlign: 'left', marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: '0.65rem', color: gold, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 10 }}>現在のサイトURLを診断する</label>
            <input className="inp" type="url" placeholder="https://your-site.com" value={url} onChange={e => { setUrl(e.target.value); setUrlError(''); }} onKeyDown={e => e.key === 'Enter' && handleDiagnose()} style={{ marginBottom: 10 }} />
            {urlError && <p style={{ fontSize: '0.8rem', color: gold, marginBottom: 8, opacity: 0.8 }}>{urlError}</p>}
            <button onClick={handleDiagnose} style={{ width: '100%', padding: '16px', background: `linear-gradient(135deg,${gold},#e8d48a)`, border: 'none', borderRadius: 8, color: '#000', fontSize: '0.95rem', fontWeight: 900, cursor: 'pointer', marginBottom: 8 }}>
              AIで無料診断する →
            </button>
            <button onClick={() => router.push('/lp/new')} style={{ width: '100%', padding: '12px', background: 'transparent', border: `1px solid rgba(255,255,255,0.06)`, borderRadius: 8, color: muted, fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'inherit' }}>
              サイトなし → 直接LP生成へ
            </button>
          </div>
          <p style={{ fontSize: '0.65rem', color: '#222' }}>完全無料　登録不要　30秒で完了</p>
        </div>
      </section>

      <div className="divider" />

      {/* STATS ── #060610 */}
      <section style={{ padding: '0 20px', background: bg2 }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeIn>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: `1px solid ${borderGold}`, borderRadius: 12, overflow: 'hidden' }}>
              {[
                { target: 14, suffix: '+', label: '対応業種' },
                { target: 3, suffix: '日', label: '最短納期' },
                { target: 0, suffix: '円', label: '初期費用' },
                { target: 100, suffix: '%', label: '営業電話なし' },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <div style={{ fontFamily: 'Inter, monospace', fontSize: 'clamp(1.3rem,2.8vw,1.9rem)', fontWeight: 900, color: gold, lineHeight: 1, marginBottom: 5 }}>
                    <CountUp target={s.target} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.6rem', color: muted, letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* JOURNEY ── #0a0a18 */}
      <section className="section" style={{ background: bg3 }}>
        <div className="inner-w">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="sec-label">HOW IT WORKS</span>
              <h2 className="sec-title">診断から運用まで、<span style={{ color: cyan }}>3ステップ</span></h2>
              <p className="sec-sub">AIと人間の力で、Web集客を仕組み化します</p>
            </div>
          </FadeIn>
          <div className="journey-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, position: 'relative' }}>
            {JOURNEY.map((j, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ position: 'relative', padding: '28px 24px', background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.05)`, borderRadius: i === 0 ? '14px 0 0 14px' : i === 2 ? '0 14px 14px 0' : '0', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {i < 2 && (
                    <div style={{ position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)', zIndex: 2, width: 24, height: 24, borderRadius: '50%', background: bg3, border: `1px solid rgba(255,255,255,0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${j.color}14`, border: `1px solid ${j.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: j.color, flexShrink: 0 }}>
                      <j.Icon />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: j.color, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 2 }}>STEP {j.step}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fff' }}>{j.title}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.75 }}>{j.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SAMPLE ── #000 */}
      <section className="section" style={{ background: bg, paddingLeft: 0, paddingRight: 0 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', paddingLeft: 20, paddingRight: 20 }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span className="sec-label">SAMPLE</span>
              <h2 className="sec-title">実際に<span style={{ color: cyan }}>生成されたLP</span></h2>
              <p className="sec-sub">あなたの業種も30秒で本格LPが完成します</p>
            </div>
          </FadeIn>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory', paddingLeft: 20, paddingBottom: 12 }}>
          <div style={{ display: 'flex', gap: 12, width: 'max-content', paddingRight: 20 }}>
            {[
              { slug: 'lp-xob6wt', label: '美容サロン', title: 'LUXE BEAUTY SALON', catch: '他店の失敗を知っているから、丁寧が違う', desc: '爪が傷みやすい、デザインがすぐ崩れる。そんなサロン難民の声から生まれた。', img: 'https://images.unsplash.com/photo-1572387263462-c596296d68a8?w=600&q=80', accent: '#8b5cf6' },
              { slug: 'lp-5nu8z9', label: '整体院', title: 'からだ整体院', catch: '仕事のストレスで歪んだ身体を、根本から整える', desc: 'デスクワークで蓄積した痛みや疲労感。その原因を徹底分析し改善します。', img: 'https://images.unsplash.com/photo-1687436874174-977fdd9e2cb8?w=600&q=80', accent: '#10b981' },
              { slug: 'lp-2bcaik', label: '税理士', title: '山田税理士事務所', catch: '税務申告、もう迷わない', desc: '個人事業主・フリーランス専門の税理士が、経営判断を税務面からサポート。', img: 'https://images.unsplash.com/photo-1589153954649-9ebab5ddefed?w=600&q=80', accent: '#3b82f6' },
              { slug: 'lp-ymsrwj', label: 'IT・Web', title: 'NEXTGAME', catch: '制作費0円。Web運用の常識を変える。', desc: 'AIが診断し、プロが運用。月額サブスクで集客を加速させる新しいWebの形。', img: 'https://images.unsplash.com/photo-1677469684112-5dfb3aa4d3df?w=600&q=80', accent: '#00D1FF' },
            ].map((s, i) => (
              <div key={i} style={{ width: 248, flexShrink: 0, scrollSnapAlign: 'start', background: bg2, border: `1px solid ${s.accent}1a`, borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 150, overflow: 'hidden' }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 35%,rgba(0,0,0,0.45))' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 20, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
                    {['#555','#555','#555'].map((c, j) => <div key={j} style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />)}
                    <div style={{ flex: 1, height: 9, background: 'rgba(255,255,255,0.06)', borderRadius: 6, marginLeft: 5 }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: 8, left: 10 }}>
                    <span style={{ fontSize: '0.58rem', color: '#fff', background: s.accent, padding: '2px 9px', borderRadius: 100, fontWeight: 700 }}>{s.label}</span>
                  </div>
                </div>
                <div style={{ padding: '14px 14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <p style={{ fontSize: '0.62rem', color: s.accent, fontWeight: 700 }}>{s.title}</p>
                  <p style={{ fontSize: '0.84rem', fontWeight: 900, color: '#fff', lineHeight: 1.4 }}>{s.catch}</p>
                  <p style={{ fontSize: '0.7rem', color: muted, lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                  <a href={'/lp/' + s.slug} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '9px 12px', background: s.accent, borderRadius: 7, color: '#fff', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none', marginTop: 4 }}>
                    見る <IconArrow />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8, paddingLeft: 20, paddingRight: 20 }}>
          <p style={{ fontSize: '0.62rem', color: '#222', letterSpacing: '0.05em' }}>← スワイプして見る →</p>
        </div>
        <FadeIn>
          <div style={{ textAlign: 'center', marginTop: 24, paddingLeft: 20, paddingRight: 20 }}>
            <button onClick={() => router.push('/lp/new')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', background: `linear-gradient(135deg,${gold},#e8d48a)`, border: 'none', borderRadius: 100, color: '#000', fontSize: '0.9rem', fontWeight: 900, cursor: 'pointer' }}>
              無料でLP生成を試す <IconArrow />
            </button>
          </div>
        </FadeIn>
      </section>

      <div className="divider" />

      {/* SUBSCRIPTION ── #060610 */}
      <section className="section" style={{ background: bg2, textAlign: 'center' }}>
        <div className="inner">
          <FadeIn>
            <span className="sec-label">AI × WEB SUBSCRIPTION</span>
            <h2 className="sec-title" style={{ fontSize: 'clamp(1.4rem,3.8vw,2.3rem)' }}>
              サイトは作った瞬間から<br />
              <span style={{ color: cyan }}>劣化する。</span>
            </h2>
            <p className="sec-sub">運用し続けるから、成果が出る。Web制作・運用・改善をまるごと月額サブスクで。<br /><span style={{ color: gold, fontWeight: 700 }}>初期費用0円・制作費0円。</span></p>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* PRICING ── #0a0a18 */}
      <section className="section" style={{ background: bg3 }} id="pricing">
        <div className="inner-w">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="sec-label">PRICING</span>
              <h2 className="sec-title">シンプルな<span style={{ color: cyan }}>サブスクプラン</span></h2>
              <p className="sec-sub">初期費用0円・制作費0円・最低3ヶ月・以降月単位で解約自由</p>
            </div>
          </FadeIn>
          <div className="plans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {PLANS.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`plan-card${plan.featured ? ' featured' : ''}`} style={{ position: 'relative' }}>
                  {plan.badge && (
                    <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: plan.featured ? cyan : 'rgba(109,190,214,0.1)', color: plan.featured ? '#000' : cyan, fontSize: '0.58rem', fontWeight: 700, padding: '3px 12px', borderRadius: 2, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>{plan.badge}</div>
                  )}
                  <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: gold, marginBottom: 8, fontWeight: 700 }}>{plan.name}</p>
                  <div style={{ marginBottom: 2 }}>
                    <span style={{ fontFamily: 'Inter, monospace', fontSize: '1.75rem', fontWeight: 900, color: '#fff' }}>¥{plan.price}</span>
                    <span style={{ fontSize: '0.68rem', color: muted }}>/月</span>
                  </div>
                  <p style={{ fontSize: '0.65rem', color: '#333', marginBottom: 4 }}>税込 ¥{plan.tax}/月</p>
                  <p style={{ fontSize: '0.72rem', color: cyan, marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid rgba(255,255,255,0.05)` }}>{plan.target}</p>
                  <div style={{ marginBottom: 20 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: '0.8rem', color: '#5a5a5a', lineHeight: 1.6, marginBottom: 8 }}>
                        <span style={{ color: gold, flexShrink: 0, marginTop: 3 }}><IconCheck /></span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <a href={CONTACT_URL} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', background: 'transparent', border: `1px solid rgba(200,168,74,0.16)`, borderRadius: 8, color: gold, fontSize: '0.83rem', fontWeight: 700, textDecoration: 'none' }}>
                    相談する
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.68rem', color: '#222', marginTop: 18 }}>月3社限定　表示価格は税抜</p>
        </div>
      </section>

      <div className="divider" />

      {/* REVIEWS ── #04040c */}
      <section className="section" style={{ background: bg4 }} id="reviews">
        <div className="inner">
          <FadeIn>
            <span className="sec-label">REVIEWS</span>
            <h2 className="sec-title">お客様の<span style={{ color: cyan }}>声</span></h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {REVIEWS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 14, padding: '20px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: r.star }).map((_, j) => (
                        <span key={j} style={{ color: gold }}><IconStar /></span>
                      ))}
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: gold, background: 'rgba(200,168,74,0.07)', border: `1px solid ${borderGold}`, padding: '3px 10px', borderRadius: 100 }}>
                      {r.result}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.85, marginBottom: 14 }}>{r.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: `1px solid rgba(255,255,255,0.04)` }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg,${gold},#e8d48a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, color: '#000', flexShrink: 0 }}>
                      {r.initial}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{r.name}</div>
                      <div style={{ fontSize: '0.68rem', color: muted }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FAQ ── #060610 */}
      <section className="section" style={{ background: bg2 }} id="faq">
        <div className="inner">
          <FadeIn>
            <span className="sec-label">FAQ</span>
            <h2 className="sec-title">よくある<span style={{ color: cyan }}>質問</span></h2>
          </FadeIn>
          <div>
            {FAQ.map((f, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="faq-q">
                    <span><span style={{ color: gold, marginRight: 10, fontWeight: 900, fontFamily: 'Inter, monospace', fontSize: '0.8rem' }}>Q</span>{f.q}</span>
                    <span style={{ color: gold, flexShrink: 0 }}><IconChevron open={openFaq === i} /></span>
                  </div>
                  {openFaq === i && <div className="faq-a">{f.a}</div>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CLOSING ── #0a0a18 + グロー */}
      <section className="section" style={{ background: bg3, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,168,74,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,74,0.01) 1px,transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -120, left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse,rgba(200,168,74,0.05) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div className="inner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <FadeIn>
            <span className="sec-label">CONTACT</span>
            <h2 className="sec-title" style={{ fontSize: 'clamp(1.5rem,4.2vw,2.6rem)', marginBottom: 8 }}>
              相談0円。<br />
              <span style={{ color: gold }}>成果で証明する。</span>
            </h2>
            <p style={{ fontSize: '0.88rem', color: muted, lineHeight: 1.85, marginBottom: 10 }}>
              しつこい営業は一切しません。<br />まずあなたのサイトの課題を聞かせてください。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 28, flexWrap: 'wrap' }}>
              {['相談・見積もり完全無料', '最短3日で公開', '解約はいつでも'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', color: '#666' }}>
                  <span style={{ color: gold }}><IconCheck /></span>
                  {t}
                </div>
              ))}
            </div>
            <a href={CONTACT_URL} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '17px 38px', background: `linear-gradient(135deg,${gold},#e8d48a)`, borderRadius: 100, color: '#000', fontSize: '0.98rem', fontWeight: 900, textDecoration: 'none', boxShadow: `0 8px 32px rgba(200,168,74,0.18)`, marginBottom: 22 }}>
              <IconMail />
              無料相談・お問い合わせ
            </a>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 28 }}>
              {[{ val: '0円', label: '初期費用' }, { val: '3日', label: '最短納品' }, { val: '月3社', label: '限定受付' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Inter, monospace', fontSize: '1.25rem', fontWeight: 900, color: gold, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: '0.58rem', color: '#333', marginTop: 4, letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* FOOTER ── #000 */}
      <footer style={{ padding: '24px 20px', background: bg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Image src="/logo.png" alt="NEXTGAME株式会社" width={100} height={26} style={{ objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <a href="/privacy" style={{ fontSize: '0.68rem', color: '#222', textDecoration: 'none' }}>Privacy Policy</a>
          <span style={{ fontSize: '0.68rem', color: '#222' }}>© 2026 NEXTGAME株式会社</span>
        </div>
      </footer>
    </div>
  );
}
