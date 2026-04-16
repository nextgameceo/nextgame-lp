"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const LINE_URL = "https://lin.ee/SJDJXQv"

const PLANS = [
  {
    name: 'STARTER', price: '29,800円', note: '/月（税込32,780円）',
    target: '個人事業主・小規模店舗',
    features: ['Webサイト制作（LP）込み・制作費0円','月2回コンテンツ更新','月次アクセスレポート','LINE即レスサポート','最低契約3ヶ月・以降月単位'],
    featured: false, badge: '',
  },
  {
    name: 'GROWTH', price: '59,800円', note: '/月（税込65,780円）',
    target: '中小企業・複数店舗オーナー',
    features: ['Webサイト制作（複数P）込み・制作費0円','週1回コンテンツ更新','SEO対策・検索順位改善','月次改善提案レポート','LINE即レスサポート','最低契約3ヶ月・以降月単位'],
    featured: true, badge: '人気No.1',
  },
  {
    name: 'SCALE', price: '99,800円', note: '/月（税込109,780円）',
    target: '成長企業・EC・複数事業',
    features: ['フルWebサイト制作込み・制作費0円','無制限コンテンツ更新','SEO・AI自動化・広告連携','専任担当者アサイン','週次戦略MTG','最低契約3ヶ月・以降月単位'],
    featured: false, badge: 'フルサポート',
  },
];

const REVIEWS = [
  { star: 5, text: '制作費0円で本格的なサイトが3日で完成。問い合わせが月2件から12件に増えました。', name: '山田 太郎', role: '整体院オーナー', icon: '🏥' },
  { star: 5, text: '他社は制作費30万円と言われたのに月額だけ。半年でGoogle1位を取れました。', name: '佐藤 花子', role: '美容サロン経営者', icon: '💅' },
  { star: 5, text: 'LINEで気軽に相談できて営業感ゼロ。AIでLP生成を体験したら即決しました。', name: '鈴木 一郎', role: '不動産会社 代表', icon: '🏢' },
];

const FAQ = [
  { q: '制作費が本当に0円なのですか？', a: 'はい。月額サブスク契約（最低3ヶ月）を前提に、Web制作費は完全無料です。単発依頼はお受けしていません。' },
  { q: '3ヶ月後に解約できますか？', a: 'はい、最低契約期間終了後は月単位でいつでも解約可能です。成果が出なければ続ける必要はありません。' },
  { q: 'どんな業種でも対応できますか？', a: '飲食・美容・医療・士業・EC・建設など幅広く対応しています。まずご相談ください。' },
  { q: '既存のサイトがあっても依頼できますか？', a: 'はい。現状分析から改善提案まで対応します。' },
  { q: '相談だけでも大丈夫ですか？', a: 'もちろんです。相談・見積もりは完全無料。しつこい営業は一切しません。' },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [inView, setInView] = useState(false);
  const ref = (el: HTMLDivElement | null) => {
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
  };
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function LineBtn({ text = 'LINEで無料相談する', full = false }: { text?: string; full?: boolean }) {
  return (
    <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#06C755', color: '#fff', fontWeight: 900, fontSize: '1rem', padding: '16px 28px', borderRadius: 8, textDecoration: 'none', boxShadow: '0 4px 24px rgba(6,199,85,0.35)', width: full ? '100%' : 'auto' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
      {text}
    </a>
  );
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
    router.push(`/lp/diagnose?url=${encodeURIComponent(normalizedUrl)}`);
  };

  return (
    <div style={{ fontFamily: 'Noto Sans JP, sans-serif', background: bg, color: textColor, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fixed-cta{position:fixed;bottom:0;left:0;right:0;z-index:9999;padding:10px 16px 18px;background:linear-gradient(to top,rgba(0,0,0,0.98) 60%,transparent);pointer-events:none;}
        .fixed-cta a{pointer-events:all;display:flex;align-items:center;justify-content:center;gap:10px;background:#06C755;color:#fff;font-weight:900;font-size:0.95rem;padding:15px 24px;border-radius:8px;text-decoration:none;box-shadow:0 4px 24px rgba(6,199,85,0.4);animation:bounce 3s ease-in-out infinite;max-width:480px;margin:0 auto;width:100%;}
        .section{padding:72px 20px;}
        .inner{max-width:560px;margin:0 auto;}
        .inner-w{max-width:860px;margin:0 auto;}
        .sec-label{font-size:0.65rem;letter-spacing:0.3em;color:#c8a84a;font-weight:700;margin-bottom:10px;text-transform:uppercase;}
        .sec-title{font-size:clamp(1.5rem,3.5vw,2.2rem);font-weight:900;color:#fff;line-height:1.3;margin-bottom:12px;}
        .sec-sub{font-size:0.9rem;color:#666;line-height:1.9;margin-bottom:36px;}
        .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.12),transparent);}
        .inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:16px 18px;color:#e8e8e8;font-size:16px;font-family:inherit;outline:none;transition:border-color 0.2s;}
        .inp:focus{border-color:rgba(200,168,74,0.5);}
        .inp::placeholder{color:#2a2a2a;}
        .plan-card{background:#0a0a0a;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px 24px;}
        .plan-card.featured{border:1.5px solid #6dbed6;background:rgba(109,190,214,0.03);}
        .check-item{display:flex;align-items:flex-start;gap:10px;font-size:0.85rem;color:#888;line-height:1.6;margin-bottom:9px;}
        .check-icon{color:#c8a84a;font-weight:900;flex-shrink:0;margin-top:2px;}
        .faq-item{background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:10px;overflow:hidden;cursor:pointer;margin-bottom:8px;}
        .faq-q{padding:18px 20px;font-size:0.9rem;font-weight:700;color:#fff;display:flex;justify-content:space-between;align-items:center;gap:12px;}
        .faq-a{padding:0 20px 18px 20px;font-size:0.85rem;color:#666;line-height:1.8;}
        @media(max-width:768px){
          .section{padding:52px 16px;}
          .plans-grid{grid-template-columns:1fr !important;}
          .stats-grid{grid-template-columns:repeat(2,1fr) !important;}
          .hero-pad{padding-top:90px !important;padding-bottom:60px !important;}
        }
      `}</style>

      {/* 固定CTA */}
      <div className="fixed-cta">
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
          無料相談する（LINE）
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

      {/* サブスク説明 */}
      <section className="section" style={{ background: bg2, textAlign: 'center' }}>
        <div className="inner">
          <FadeIn>
            <p className="sec-label">AI × WEB SUBSCRIPTION</p>
            <h2 className="sec-title" style={{ fontSize: 'clamp(1.5rem,4vw,2.5rem)' }}>
              サイトは作った瞬間から<br />
              <span style={{ color: cyan }}>劣化する。</span>
            </h2>
            <p className="sec-sub">運用し続けるから、成果が出る。Web制作・運用・改善をまるごと月額サブスクで。<span style={{ color: gold }}>初期費用0円・制作費0円。</span></p>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: `1px solid ${borderGold}`, borderRadius: 10, overflow: 'hidden' }}>
              {[{ v: '0円', l: '初期費用' },{ v: '3日', l: '最短納期' },{ v: '月3社', l: '受付上限' },{ v: '3ヶ月', l: '最低契約' }].map((item, i) => (
                <div key={i} style={{ padding: '16px 8px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${borderGold}` : 'none' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 900, color: gold }}>{item.v}</div>
                  <div style={{ fontSize: '0.65rem', color: muted, marginTop: 4 }}>{item.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* 料金プラン */}
      <section className="section" style={{ background: bg }} id="pricing">
        <div className="inner-w">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p className="sec-label">PRICING</p>
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
                    {plan.features.map((f, j) => <div key={j} className="check-item"><span className="check-icon">✓</span>{f}</div>)}
                  </div>
                  <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', background: 'transparent', border: `1px solid rgba(200,168,74,0.2)`, borderRadius: 8, color: gold, fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none' }}>
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
            <p className="sec-label">REVIEWS</p>
            <h2 className="sec-title">お客様の<span style={{ color: cyan }}>声</span></h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {REVIEWS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: bg3, border: `1px solid rgba(255,255,255,0.07)`, borderRadius: 12, padding: '22px 20px' }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
                    {Array.from({ length: r.star }).map((_, j) => <span key={j} style={{ color: gold, fontSize: '0.9rem' }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: textColor, lineHeight: 1.8, marginBottom: 14 }}>{r.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(200,168,74,0.08)', border: `1px solid rgba(200,168,74,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{r.icon}</div>
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
            <p className="sec-label">FAQ</p>
            <h2 className="sec-title">よくある<span style={{ color: cyan }}>質問</span></h2>
          </FadeIn>
          <div style={{ marginBottom: 48 }}>
            {FAQ.map((f, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="faq-q">
                    <span><span style={{ color: gold, marginRight: 10, fontWeight: 900 }}>Q</span>{f.q}</span>
                    <span style={{ color: gold, fontSize: '1.2rem', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
                  </div>
                  {openFaq === i && <div className="faq-a">{f.a}</div>}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn>
            <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
              <Image src="/logo.png" alt="NEXTGAME株式会社" width={120} height={30} style={{ objectFit: 'contain', marginBottom: 20, opacity: 0.9 }} />
              <h2 style={{ fontSize: 'clamp(1.3rem,3.5vw,1.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.4, marginBottom: 10 }}>
                まず話だけでも<br /><span style={{ color: gold }}>大丈夫です。</span>
              </h2>
              <p style={{ fontSize: '0.85rem', color: muted, marginBottom: 24, lineHeight: 1.8 }}>
                相談・見積もり完全無料。しつこい営業は一切しません。
              </p>
              <LineBtn text="LINEで無料相談する" full />
              <p style={{ fontSize: '0.7rem', color: '#333', marginTop: 12 }}>初期費用0円　制作費0円　最短3日　3ヶ月後は自由解約</p>
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
