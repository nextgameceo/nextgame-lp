"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const CONTACT_URL = "/contact"

const PLANS = [
  {
    name: 'STARTER', price: '29,800円', note: '/月（税込32,780円）',
    target: '個人事業主・小規模店舗',
    features: ['Webサイト制作（LP）込み・制作費0円', '月2回コンテンツ更新', '月次アクセスレポート', 'LINE即レスサポート', '最低契約3ヶ月・以降月単位'],
    featured: false, badge: '',
  },
  {
    name: 'GROWTH', price: '59,800円', note: '/月（税込65,780円）',
    target: '中小企業・複数店舗オーナー',
    features: ['Webサイト制作（複数P）込み・制作費0円', '週1回コンテンツ更新', 'SEO対策・検索順位改善', '月次改善提案レポート', 'LINE即レスサポート', '最低契約3ヶ月・以降月単位'],
    featured: true, badge: '人気No.1',
  },
  {
    name: 'SCALE', price: '99,800円', note: '/月（税込109,780円）',
    target: '成長企業・EC・複数事業',
    features: ['フルWebサイト制作込み・制作費0円', '無制限コンテンツ更新', 'SEO・AI自動化・広告連携', '専任担当者アサイン', '週次戦略MTG', '最低契約3ヶ月・以降月単位'],
    featured: false, badge: 'フルサポート',
  },
];

const REVIEWS = [
  {
    star: 5,
    text: '制作費0円で本格的なサイトが3日で完成。問い合わせが月2件から12件に増えました。費用対効果が段違いです。',
    name: '山田 太郎',
    role: '整体院オーナー',
    initial: '山',
  },
  {
    star: 5,
    text: '他社は制作費30万円と言われたのに月額だけ。半年でGoogle1位を取れました。運用してくれるから成果が出続けます。',
    name: '佐藤 花子',
    role: '美容サロン経営者',
    initial: '佐',
  },
  {
    star: 5,
    text: 'LINEで気軽に相談できて営業感ゼロ。AIでLP生成を体験したら即決しました。スピードと品質に驚きました。',
    name: '鈴木 一郎',
    role: '不動産会社 代表',
    initial: '鈴',
  },
];

const FAQ = [
  { q: '制作費が本当に0円なのですか？', a: 'はい。月額サブスク契約（最低3ヶ月）を前提に、Web制作費は完全無料です。単発依頼はお受けしていません。' },
  { q: '3ヶ月後に解約できますか？', a: 'はい、最低契約期間終了後は月単位でいつでも解約可能です。成果が出なければ続ける必要はありません。' },
  { q: 'どんな業種でも対応できますか？', a: '飲食・美容・医療・士業・EC・建設など幅広く対応しています。まずご相談ください。' },
  { q: '既存のサイトがあっても依頼できますか？', a: 'はい。現状分析から改善提案まで対応します。' },
  { q: '相談だけでも大丈夫ですか？', a: 'もちろんです。相談・見積もりは完全無料。しつこい営業は一切しません。' },
];

const IconAI = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8"/>
    <path d="M12 17v4"/>
    <path d="M7 8h.01"/>
    <path d="M17 8h.01"/>
    <path d="M9 12s.5 1 3 1 3-1 3-1"/>
  </svg>
);

const IconMoney = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v2"/>
    <path d="M12 16v2"/>
    <path d="M8.5 9.5A3.5 1.5 0 0 1 12 8a3.5 1.5 0 0 1 3.5 1.5c0 2-3.5 3-3.5 3s-3.5 1-3.5 3A3.5 1.5 0 0 0 12 17a3.5 1.5 0 0 0 3.5-1.5"/>
  </svg>
);

const IconRefresh = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);


const REASONS = [
  {
    Icon: IconAI,
    title: 'AIが診断・生成',
    desc: 'URLを入れるだけでサイトの問題点を自動分析。改善版LPをその場で生成します。他社では数週間かかる作業が30秒で完了。',
  },
  {
    Icon: IconMoney,
    title: '初期費用・制作費0円',
    desc: '従来50〜200万円かかる制作費が完全無料。月額サブスクのみで運用できるため、キャッシュフローを圧迫しません。',
  },
  {
    Icon: IconRefresh,
    title: '運用し続けるから成果が出る',
    desc: '作って終わりではなく、毎月改善・更新・レポートを提供。サイトは運用することで初めて集客ツールになります。',
  },
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
  const bg2 = '#0a0a0a';
  const bg3 = '#111';
  const border = 'rgba(255,255,255,0.07)';
  const borderGold = 'rgba(200,168,74,0.2)';
  const muted = '#666';
  const textColor = '#e2e8f0';

  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleDiagnose = () => {
    if (!url.trim()) {
      router.push('/lp/new');
      return;
    }
    try {
      new URL(url.startsWith('http') ? url : 'https://' + url);
    } catch {
      setUrlError('正しいURLを入力してください（例：https://your-site.com）');
      return;
    }
    setUrlError('');
    const normalizedUrl = url.startsWith('http') ? url : 'https://' + url;
    router.push('/lp/diagnose?url=' + encodeURIComponent(normalizedUrl));
  };

  return (
    <div style={{ fontFamily: 'Noto Sans JP, sans-serif', background: bg, color: textColor, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        .fade-up{animation:fadeUp 0.5s ease forwards;}
        .fixed-cta{position:fixed;bottom:0;left:0;right:0;z-index:9999;padding:10px 16px 18px;background:linear-gradient(to top,rgba(0,0,0,0.98) 60%,transparent);pointer-events:none;}
        .fixed-cta a{pointer-events:all;display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#c8a84a,#e8d48a);color:#000;font-weight:900;font-size:0.95rem;padding:15px 24px;border-radius:8px;text-decoration:none;box-shadow:0 4px 24px rgba(200,168,74,0.3);animation:bounce 3s ease-in-out infinite;max-width:480px;margin:0 auto;width:100%;}
        .section{padding:72px 20px;}
        .inner{max-width:560px;margin:0 auto;}
        .inner-w{max-width:860px;margin:0 auto;}
        .sec-label{font-size:0.65rem;letter-spacing:0.3em;color:#c8a84a;font-weight:700;margin-bottom:10px;text-transform:uppercase;display:block;}
        .sec-title{font-size:clamp(1.5rem,3.5vw,2.2rem);font-weight:900;color:#fff;line-height:1.3;margin-bottom:12px;}
        .sec-sub{font-size:0.9rem;color:#666;line-height:1.9;margin-bottom:36px;}
        .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.12),transparent);}
        .inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:16px 18px;color:#e8e8e8;font-size:16px;font-family:inherit;outline:none;transition:border-color 0.2s;}
        .inp:focus{border-color:rgba(200,168,74,0.5);}
        .inp::placeholder{color:#2a2a2a;}
        .plan-card{background:#0a0a0a;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px 24px;}
        .plan-card.featured{border:1.5px solid #6dbed6;background:rgba(109,190,214,0.03);}
        .faq-item{background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:10px;overflow:hidden;cursor:pointer;margin-bottom:8px;}
        .faq-q{padding:18px 20px;font-size:0.9rem;font-weight:700;color:#fff;display:flex;justify-content:space-between;align-items:center;gap:12px;}
        .faq-a{padding:0 20px 18px 20px;font-size:0.85rem;color:#666;line-height:1.8;}
        .reason-card{background:#0a0a0a;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:28px 24px;display:flex;flex-direction:column;gap:16px;transition:border-color 0.2s,box-shadow 0.2s;}
        .reason-card:hover{border-color:rgba(200,168,74,0.3);box-shadow:0 8px 32px rgba(200,168,74,0.06);}
        .stat-card{padding:20px 16px;text-align:center;border-right:1px solid rgba(200,168,74,0.15);}
        .stat-card:last-child{border-right:none;}
        @media(max-width:768px){
          .section{padding:52px 16px;}
          .plans-grid{grid-template-columns:1fr !important;}
          .stats-grid{grid-template-columns:repeat(2,1fr) !important;}
          .reasons-grid{grid-template-columns:1fr !important;}
          .hero-pad{padding-top:90px !important;padding-bottom:60px !important;}
        }
      `}</style>

      {/* 固定CTA */}
      <div className="fixed-cta">
        <a href={CONTACT_URL}>
          <IconMail />
          無料相談・お問い合わせ
        </a>
      </div>

      {/* HERO */}
      <section className="hero-pad" style={{ paddingTop: 100, paddingBottom: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,168,74,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,74,0.025) 1px,transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 500, height: 400, background: 'radial-gradient(ellipse,rgba(109,190,214,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 520, margin: '0 auto', padding: '0 16px', animation: 'fadeUp 0.5s ease forwards' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, border: `1px solid rgba(200,168,74,0.2)`, padding: '4px 14px', borderRadius: 2, marginBottom: 24 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: gold, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            AI WEB DIAGNOSTIC
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,6vw,3.2rem)', fontWeight: 900, lineHeight: 1.15, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em' }}>
            あなたのサイト、<br />
            <span style={{ color: gold }}>診断します。</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.88rem,2vw,1rem)', color: muted, lineHeight: 1.9, marginBottom: 36 }}>
            URLを入力するだけ。AIが問題点を洗い出し、<br />改善サンプルLPを無料で生成します。
          </p>

          <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 16, padding: '24px 20px', textAlign: 'left', marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: '0.7rem', color: gold, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 10 }}>現在のサイトURL</label>
            <input
              className="inp"
              type="url"
              placeholder="https://your-site.com"
              value={url}
              onChange={e => { setUrl(e.target.value); setUrlError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleDiagnose()}
              style={{ marginBottom: 12 }}
            />
            {urlError && <p style={{ fontSize: '0.82rem', color: '#f87171', marginBottom: 10 }}>{urlError}</p>}
            <button
              onClick={handleDiagnose}
              style={{ width: '100%', padding: '17px', background: `linear-gradient(135deg,${gold},#e8d48a)`, border: 'none', borderRadius: 8, color: '#000', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', marginBottom: 10 }}
            >
              AIで無料診断する →
            </button>
            <button
              onClick={() => router.push('/lp/new')}
              style={{ width: '100%', padding: '13px', background: 'transparent', border: `1px solid rgba(255,255,255,0.07)`, borderRadius: 8, color: muted, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              サイトなし → LP生成へスキップ
            </button>
          </div>
          <p style={{ fontSize: '0.7rem', color: '#333' }}>完全無料　登録不要　30秒で完了</p>
        </div>
      </section>

      <div className="divider" />

      {/* 実績スタッツ */}
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
                  <div style={{ fontFamily: 'monospace', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, color: gold, lineHeight: 1, marginBottom: 6 }}>
                    <CountUp target={s.target} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.65rem', color: muted, letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

{/* サンプルLP */}
<section className="section" style={{ background: bg, paddingLeft: 0, paddingRight: 0 }}>
  <div style={{ maxWidth: 860, margin: '0 auto', paddingLeft: 20, paddingRight: 20 }}>
    <FadeIn>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <span className="sec-label">SAMPLE</span>
        <h2 className="sec-title">実際に<span style={{ color: cyan }}>生成されたLP</span></h2>
        <p className="sec-sub">業種・ターゲット・デザインを選ぶだけ。30秒で本格LPが完成します。</p>
      </div>
    </FadeIn>
  </div>

  {/* 横スクロールカード */}
  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory', paddingLeft: 20, paddingBottom: 12 }}>
    <div style={{ display: 'flex', gap: 14, width: 'max-content', paddingRight: 20 }}>
      {[
        {
          slug: 'lp-xob6wt',
          label: '美容サロン',
          title: 'LUXE BEAUTY SALON',
          catch: '他店の失敗を知っているから、丁寧が違う',
          desc: '爪が傷みやすい、デザインがすぐ崩れる。そんなサロン難民の声から生まれたLUXE。',
          img: 'https://images.unsplash.com/photo-1572387263462-c596296d68a8?w=600&q=80',
          accent: '#8b5cf6',
          theme: 'light',
        },
        {
          slug: 'lp-5nu8z9',
          label: '整体院',
          title: 'からだ整体院',
          catch: '仕事のストレスで歪んだ身体を、根本から整える',
          desc: 'デスクワークで蓄積した痛みや疲労感。その原因を徹底分析し改善します。',
          img: 'https://images.unsplash.com/photo-1687436874174-977fdd9e2cb8?w=600&q=80',
          accent: '#10b981',
          theme: 'light',
        },
        {
          slug: 'lp-2bcaik',
          label: '税理士',
          title: '山田税理士事務所',
          catch: '税務申告、もう迷わない',
          desc: '個人事業主・フリーランス専門の税理士が、経営判断を税務面からサポート。',
          img: 'https://images.unsplash.com/photo-1589153954649-9ebab5ddefed?w=600&q=80',
          accent: '#3b82f6',
          theme: 'light',
        },
        {
          slug: 'lp-ymsrwj',
          label: 'IT・Web',
          title: 'NEXTGAME',
          catch: '制作費0円。Web運用の常識を変える。',
          desc: 'AIが診断し、プロが運用。月額サブスクで集客を加速させる新しいWebの形。',
          img: 'https://images.unsplash.com/photo-1677469684112-5dfb3aa4d3df?w=600&q=80',
          accent: '#00D1FF',
          theme: 'dark',
        },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            width: 260,
            flexShrink: 0,
            scrollSnapAlign: 'start',
            background: s.theme === 'dark' ? '#0a0a0a' : '#fff',
            border: `1px solid ${s.accent}33`,
            borderRadius: 16,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          {/* 画像エリア */}
          <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
            <img
              src={s.img}
              alt={s.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* オーバーレイ */}
            <div style={{ position: 'absolute', inset: 0, background: s.theme === 'dark' ? 'rgba(0,0,0,0.5)' : `linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.3))` }} />
            {/* ブラウザ風バー */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 22, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
              <div style={{ flex: 1, height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 6, marginLeft: 6 }} />
            </div>
            {/* 業種バッジ */}
            <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
              <span style={{ fontSize: '0.6rem', color: '#fff', background: s.accent, padding: '3px 10px', borderRadius: 100, fontWeight: 700, letterSpacing: '0.05em' }}>{s.label}</span>
            </div>
          </div>

          {/* テキストエリア */}
          <div style={{ padding: '16px 16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8, background: s.theme === 'dark' ? '#0a0a0a' : '#fff' }}>
            <p style={{ fontSize: '0.68rem', color: s.accent, fontWeight: 700, letterSpacing: '0.05em' }}>{s.title}</p>
            <p style={{ fontSize: '0.88rem', fontWeight: 900, color: s.theme === 'dark' ? '#fff' : '#0f172a', lineHeight: 1.45 }}>{s.catch}</p>
            <p style={{ fontSize: '0.72rem', color: s.theme === 'dark' ? '#555' : '#888', lineHeight: 1.65, flex: 1 }}>{s.desc}</p>
            <a
              href={'/lp/' + s.slug}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '10px 14px',
                background: s.accent,
                borderRadius: 8,
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 700,
                textDecoration: 'none',
                marginTop: 4,
              }}
            >
              フルページで見る
              <IconArrow />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* スワイプヒント */}
  <div style={{ textAlign: 'center', marginTop: 12, paddingLeft: 20, paddingRight: 20 }}>
    <p style={{ fontSize: '0.68rem', color: '#333', letterSpacing: '0.05em' }}>← スワイプして見る →</p>
  </div>

  <FadeIn>
    <div style={{ textAlign: 'center', marginTop: 28, paddingLeft: 20, paddingRight: 20 }}>
      <p style={{ fontSize: '0.85rem', color: muted, marginBottom: 16 }}>あなたのビジネスのLPも30秒で生成できます</p>
      <button
        onClick={() => router.push('/lp/new')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', background: `linear-gradient(135deg,${gold},#e8d48a)`, border: 'none', borderRadius: 100, color: '#000', fontSize: '0.95rem', fontWeight: 900, cursor: 'pointer' }}
      >
        無料でLP生成を試す
        <IconArrow />
      </button>
    </div>
  </FadeIn>
</section>

<div className="divider" />


      {/* なぜNEXTGAMEか */}
      <section className="section" style={{ background: bg }}>
        <div className="inner-w">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="sec-label">WHY NEXTGAME</span>
              <h2 className="sec-title">選ばれる<span style={{ color: cyan }}>3つの理由</span></h2>
              <p className="sec-sub">他社との明確な差別化ポイント</p>
            </div>
          </FadeIn>
          <div className="reasons-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {REASONS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="reason-card">
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(200,168,74,0.1)', border: '1px solid rgba(200,168,74,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: gold }}>
                    <r.Icon />
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{r.title}</div>
                    <div style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.8 }}>{r.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* サブスク説明 */}
      <section className="section" style={{ background: bg2, textAlign: 'center' }}>
        <div className="inner">
          <FadeIn>
            <span className="sec-label">AI × WEB SUBSCRIPTION</span>
            <h2 className="sec-title" style={{ fontSize: 'clamp(1.5rem,4vw,2.5rem)' }}>
              サイトは作った瞬間から<br />
              <span style={{ color: cyan }}>劣化する。</span>
            </h2>
            <p className="sec-sub">運用し続けるから、成果が出る。Web制作・運用・改善をまるごと月額サブスクで。<span style={{ color: gold }}>初期費用0円・制作費0円。</span></p>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* 料金プラン */}
      <section className="section" style={{ background: bg }} id="pricing">
        <div className="inner-w">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="sec-label">PRICING</span>
              <h2 className="sec-title">シンプルな<span style={{ color: cyan }}>サブスクプラン</span></h2>
              <p className="sec-sub">初期費用0円・制作費0円・最低3ヶ月・以降月単位で解約自由</p>
            </div>
          </FadeIn>
          <div className="plans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {PLANS.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`plan-card ${plan.featured ? 'featured' : ''}`} style={{ position: 'relative' }}>
                  {plan.badge && (
                    <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: plan.featured ? cyan : 'rgba(109,190,214,0.15)', color: plan.featured ? '#000' : cyan, fontSize: '0.62rem', fontWeight: 700, padding: '3px 14px', borderRadius: 2, whiteSpace: 'nowrap' }}>{plan.badge}</div>
                  )}
                  <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: gold, marginBottom: 8, fontWeight: 700 }}>{plan.name}</p>
                  <div style={{ fontFamily: 'monospace', fontSize: '2rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 4 }}>{plan.price}</div>
                  <div style={{ fontSize: '0.7rem', color: muted, marginBottom: 4 }}>{plan.note}</div>
                  <div style={{ fontSize: '0.75rem', color: cyan, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid rgba(255,255,255,0.07)` }}>{plan.target}</div>
                  <div style={{ marginBottom: 24 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem', color: '#888', lineHeight: 1.6, marginBottom: 9 }}>
                        <span style={{ color: gold, flexShrink: 0, marginTop: 2 }}><IconCheck /></span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <a href={CONTACT_URL} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', background: 'transparent', border: `1px solid rgba(200,168,74,0.2)`, borderRadius: 8, color: gold, fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none' }}>
                    相談する
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: muted, marginTop: 20 }}>表示価格は税抜　月3社限定</p>
        </div>
      </section>

      <div className="divider" />

      {/* 口コミ */}
      <section className="section" style={{ background: bg2 }} id="reviews">
        <div className="inner">
          <FadeIn>
            <span className="sec-label">REVIEWS</span>
            <h2 className="sec-title">お客様の<span style={{ color: cyan }}>声</span></h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {REVIEWS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: bg3, border: `1px solid rgba(255,255,255,0.07)`, borderRadius: 12, padding: '22px 20px' }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
                    {Array.from({ length: r.star }).map((_, j) => (
                      <span key={j} style={{ color: gold }}><IconStar /></span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: textColor, lineHeight: 1.8, marginBottom: 16 }}>{r.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg,${gold},#e8d48a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 900, color: '#000', flexShrink: 0 }}>
                      {r.initial}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{r.name}</div>
                      <div style={{ fontSize: '0.72rem', color: muted }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FAQ */}
      <section className="section" style={{ background: bg }} id="faq">
        <div className="inner">
          <FadeIn>
            <span className="sec-label">FAQ</span>
            <h2 className="sec-title">よくある<span style={{ color: cyan }}>質問</span></h2>
          </FadeIn>
          <div style={{ marginBottom: 48 }}>
            {FAQ.map((f, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="faq-q">
                    <span><span style={{ color: gold, marginRight: 10, fontWeight: 900 }}>Q</span>{f.q}</span>
                    <span style={{ color: gold, flexShrink: 0 }}><IconChevron open={openFaq === i} /></span>
                  </div>
                  {openFaq === i && <div className="faq-a">{f.a}</div>}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
              <Image src="/logo.png" alt="NEXTGAME株式会社" width={120} height={30} style={{ objectFit: 'contain', marginBottom: 20, opacity: 0.9 }} />
              <h2 style={{ fontSize: 'clamp(1.3rem,3.5vw,1.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.4, marginBottom: 10 }}>
                まず話だけでも<br /><span style={{ color: gold }}>大丈夫です。</span>
              </h2>
              <p style={{ fontSize: '0.85rem', color: muted, marginBottom: 24, lineHeight: 1.8 }}>
                相談・見積もり完全無料。しつこい営業は一切しません。
              </p>
              <a
                href={CONTACT_URL}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '17px', background: `linear-gradient(135deg,${gold},#e8d48a)`, borderRadius: 8, color: '#000', fontSize: '1rem', fontWeight: 900, textDecoration: 'none', marginBottom: 12 }}
              >
                <IconMail />
                無料相談・お問い合わせ
              </a>
              <p style={{ fontSize: '0.7rem', color: '#333' }}>初期費用0円　制作費0円　最短3日　3ヶ月後は自由解約</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      <footer style={{ padding: '28px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Image src="/logo.png" alt="NEXTGAME株式会社" width={110} height={28} style={{ objectFit: 'contain' }} />
        <span style={{ fontSize: '0.72rem', color: muted }}>© 2026 NEXTGAME株式会社</span>
      </footer>
    </div>
  );
}
