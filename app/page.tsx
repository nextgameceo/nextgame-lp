"use client"

import { useEffect, useRef, useState } from 'react';
import Image from "next/image"

const LINE_URL = "https://lin.ee/SJDJXQv"

const PLANS = [
  {
    name: 'STARTER', price: '¥29,800', note: '/月（税込¥32,780）',
    target: '個人事業主・小規模店舗',
    features: ['Webサイト制作（LP）込み・制作費0円','月2回コンテンツ更新','月次アクセスレポート','LINE即レスサポート','最低契約3ヶ月・以降月単位'],
    featured: false, badge: '',
  },
  {
    name: 'GROWTH', price: '¥59,800', note: '/月（税込¥65,780）',
    target: '中小企業・複数店舗オーナー',
    features: ['Webサイト制作（複数P）込み・制作費0円','週1回コンテンツ更新','SEO対策・検索順位改善','月次改善提案レポート','LINE即レスサポート','最低契約3ヶ月・以降月単位'],
    featured: true, badge: '人気No.1',
  },
  {
    name: 'SCALE', price: '¥99,800', note: '/月（税込¥109,780）',
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
  { q: '制作費が本当に0円なのですか？', a: 'はい。月額サブスク契約（最低3ヶ月）を前提に、Web制作費は完全無料です。' },
  { q: '3ヶ月後に解約できますか？', a: 'はい、3ヶ月の最低契約期間終了後は月単位でいつでも解約可能です。' },
  { q: 'どんな業種でも対応できますか？', a: '飲食・美容・医療・士業・EC・建設など幅広く対応しています。' },
  { q: '既存のサイトがあっても依頼できますか？', a: 'はい、既存サイトの運用代行も可能です。現状分析から改善提案までご相談ください。' },
];

const INDUSTRIES = [
  '飲食店','美容サロン','歯科クリニック','整体院・整骨院',
  '不動産','学習塾','EC・通販','IT・Web','建設・工務店','その他',
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
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

type DiagStep = 'input' | 'diagnosing' | 'result' | 'generating' | 'done';

interface DiagResult {
  score: number;
  company: string;
  industry: string;
  problems: { icon: string; title: string; desc: string }[];
  suggestion: string;
}

export default function Page() {
  const cyan = '#6dbed6';
  const gold = '#c8a84a';
  const bg = '#000';
  const bg2 = '#0a0a0a';
  const bg3 = '#111';
  const border = 'rgba(109,190,214,0.12)';
  const borderGold = 'rgba(200,168,74,0.15)';
  const muted = '#555';
  const textColor = '#e2e8f0';

  const [diagStep, setDiagStep] = useState<DiagStep>('input');
  const [url, setUrl] = useState('');
  const [diagResult, setDiagResult] = useState<DiagResult | null>(null);
  const [diagError, setDiagError] = useState('');
  const [diagMessage, setDiagMessage] = useState('');

  const [lpTitle, setLpTitle] = useState('');
  const [lpIndustry, setLpIndustry] = useState('');
  const [lpOther, setLpOther] = useState('');
  const [lpError, setLpError] = useState('');
  const [generatedSlug, setGeneratedSlug] = useState('');

  const handleDiagnose = async () => {
    if (!url && !url.trim()) {
      // URLなしで直接LP生成へ
      setDiagStep('result');
      setDiagResult(null);
      return;
    }
    setDiagError('');
    setDiagStep('diagnosing');

    const messages = [
      'サイトにアクセス中...',
      'コンテンツを解析中...',
      'SEOスコアを計算中...',
      'デザイン品質を評価中...',
      'AI診断レポートを生成中...',
    ];
    let i = 0;
    setDiagMessage(messages[0]);
    const msgTimer = setInterval(() => {
      i = Math.min(i + 1, messages.length - 1);
      setDiagMessage(messages[i]);
    }, 1200);

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      clearInterval(msgTimer);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDiagResult(data);
      if (data.company) setLpTitle(data.company);
      if (data.industry) setLpIndustry(data.industry);
      setDiagStep('result');
    } catch (e) {
      clearInterval(msgTimer);
      setDiagError('診断に失敗しました。URLを確認してください。');
      setDiagStep('input');
    }
  };

  const handleGenerate = async () => {
    if (!lpTitle) { setLpError('会社名・サービス名を入力してください'); return; }
    if (lpIndustry === 'その他' && !lpOther) { setLpError('業種を入力してください'); return; }
    setLpError('');
    setDiagStep('generating');
    const industryLabel = lpIndustry === 'その他' ? lpOther : lpIndustry;
    try {
      const res = await fetch('/api/create-lp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: lpTitle, sub_title: '', content: industryLabel ? ('業種：' + industryLabel) : '', client_name: '' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setGeneratedSlug(data.slug);
      setDiagStep('done');
    } catch (e) {
      setLpError(String(e));
      setDiagStep('result');
    }
  };

  const scoreColor = (s: number) => s >= 70 ? '#10b981' : s >= 40 ? gold : '#ef4444';
  const scoreLabel = (s: number) => s >= 70 ? '良好' : s >= 40 ? '要改善' : '緊急改善が必要';

  return (
    <div style={{ fontFamily: 'Noto Sans JP, sans-serif', background: bg, color: textColor, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scoreBar{from{width:0}to{width:var(--w)}}
        .fixed-line{position:fixed;bottom:0;left:0;right:0;z-index:9999;padding:12px 16px 20px;background:linear-gradient(to top,#000 60%,transparent);pointer-events:none;}
        .fixed-line a{pointer-events:all;display:flex;align-items:center;justify-content:center;gap:10px;background:#06C755;color:#fff;font-weight:900;font-size:1rem;padding:16px 24px;border-radius:8px;text-decoration:none;box-shadow:0 4px 32px rgba(6,199,85,0.5);animation:bounce 2.5s ease-in-out infinite;max-width:480px;margin:0 auto;width:100%;}
        .section{padding:64px 20px;}
        .inner{max-width:560px;margin:0 auto;}
        .inner-w{max-width:900px;margin:0 auto;}
        .sec-label{font-size:0.68rem;letter-spacing:0.25em;color:#c8a84a;font-weight:700;margin-bottom:8px;text-transform:uppercase;}
        .sec-title{font-size:clamp(1.4rem,3.5vw,2.2rem);font-weight:900;color:#fff;line-height:1.3;margin-bottom:10px;}
        .sec-title span{color:#6dbed6;}
        .sec-sub{font-size:0.9rem;color:#555;line-height:1.8;margin-bottom:32px;}
        .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.15),transparent);}
        .inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:16px 18px;color:#e8e8e8;font-size:16px;font-family:inherit;outline:none;transition:border-color 0.2s;}
        .inp:focus{border-color:rgba(200,168,74,0.5);}
        .inp::placeholder{color:#333;}
        .ind-btn{background:transparent;border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:8px 12px;color:#555;font-size:0.78rem;cursor:pointer;transition:all 0.15s;font-family:inherit;}
        .ind-btn:hover{border-color:rgba(109,190,214,0.4);color:#999;}
        .ind-btn.active{border-color:#6dbed6;color:#6dbed6;background:rgba(109,190,214,0.06);}
        .plan-card{background:#0a0a0a;border:1px solid rgba(109,190,214,0.15);border-radius:16px;padding:28px 20px;transition:transform 0.2s;}
        .plan-card.featured{border:2px solid #6dbed6;background:rgba(109,190,214,0.04);}
        .check-item{display:flex;align-items:flex-start;gap:10px;font-size:0.85rem;color:#94a3b8;line-height:1.6;margin-bottom:8px;}
        .check-icon{color:#c8a84a;font-weight:900;flex-shrink:0;margin-top:1px;}
        @media(max-width:768px){
          .section{padding:48px 16px;}
          .plans-grid{grid-template-columns:1fr !important;}
          .hero-pad{padding-top:88px !important;}
        }
      `}</style>

      {/* 固定LINE */}
      <div className="fixed-line">
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
          LINEで無料相談する
        </a>
      </div>

      {/* ── HERO ── */}
      <section className="hero-pad" style={{ background: bg, paddingTop: 100, paddingBottom: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,168,74,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,74,0.03) 1px,transparent 1px)`, backgroundSize: '44px 44px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse,rgba(109,190,214,0.08) 0%,transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto', padding: '0 16px' }}>

          {/* ── STEP 1: URL入力 ── */}
          {diagStep === 'input' && (
            <>
              <div style={{ animation: 'fadeUp 0.6s ease forwards' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, border: `1px solid rgba(200,168,74,0.2)`, padding: '4px 14px', borderRadius: 2, marginBottom: 20 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: gold, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                  AI WEB DIAGNOSTIC
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem,6vw,3rem)', fontWeight: 900, lineHeight: 1.2, color: '#fff', marginBottom: 12 }}>
                  あなたのサイト、<br />
                  <span style={{ color: cyan }}>診断します。</span>
                </h1>
                <p style={{ fontSize: 'clamp(0.88rem,2.5vw,1rem)', color: muted, lineHeight: 1.8, marginBottom: 32 }}>
                  URLを入力するだけ。AIが問題点を洗い出し、<br />改善後のサンプルLPを無料で生成します。
                </p>
              </div>

              <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 16, padding: '24px 20px', marginBottom: 16, textAlign: 'left', animation: 'fadeUp 0.6s ease 0.1s both' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', color: gold, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>
                  現在のサイトURL
                </label>
                <input
                  className="inp"
                  type="url"
                  placeholder="https://your-site.com"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleDiagnose()}
                  style={{ marginBottom: 12 }}
                />
                {diagError && (
                  <div style={{ fontSize: '0.82rem', color: '#f87171', marginBottom: 12 }}>{diagError}</div>
                )}
                <button
                  onClick={handleDiagnose}
                  style={{ width: '100%', padding: '18px', background: `linear-gradient(135deg,${gold},#e8d48a)`, border: 'none', borderRadius: 8, color: '#000', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  AIで無料診断する
                </button>
                <button
                  onClick={() => { setDiagStep('result'); setDiagResult(null); }}
                  style={{ width: '100%', padding: '14px', background: 'transparent', border: `1px solid ${border}`, borderRadius: 8, color: muted, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  サイトを持っていない → 直接LP生成へ
                </button>
              </div>
              <p style={{ fontSize: '0.72rem', color: muted, animation: 'fadeUp 0.6s ease 0.2s both' }}>✓ 完全無料　✓ 登録不要　✓ 30秒で完了</p>
            </>
          )}

          {/* ── STEP 2: 診断中 ── */}
          {diagStep === 'diagnosing' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '40vh', justifyContent: 'center', gap: 24 }}>
              <div style={{ position: 'relative', width: 80, height: 80 }}>
                <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(200,168,74,0.15)`, borderTopColor: gold, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <div style={{ position: 'absolute', inset: 8, border: `1px solid rgba(109,190,214,0.1)`, borderTopColor: cyan, borderRadius: '50%', animation: 'spin 1.2s linear infinite reverse' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🔍</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1rem', color: gold, fontWeight: 700, marginBottom: 8 }}>AI診断中...</p>
                <p style={{ fontSize: '0.85rem', color: muted }}>{diagMessage}</p>
              </div>
            </div>
          )}

          {/* ── STEP 3: 診断結果 + LP生成フォーム ── */}
          {diagStep === 'result' && (
            <div style={{ animation: 'fadeUp 0.6s ease forwards', textAlign: 'left' }}>
              {diagResult ? (
                <>
                  {/* スコア表示 */}
                  <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 16, padding: '24px 20px', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div>
                        <p style={{ fontSize: '0.72rem', color: muted, marginBottom: 4 }}>診断完了</p>
                        <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{diagResult.company || 'あなたのサイト'}</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'monospace', fontSize: '2.5rem', fontWeight: 900, color: scoreColor(diagResult.score), lineHeight: 1 }}>{diagResult.score}</div>
                        <div style={{ fontSize: '0.65rem', color: scoreColor(diagResult.score), fontWeight: 700 }}>{scoreLabel(diagResult.score)}</div>
                      </div>
                    </div>
                    {/* スコアバー */}
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden', marginBottom: 20 }}>
                      <div style={{ height: '100%', width: `${diagResult.score}%`, background: `linear-gradient(90deg,${scoreColor(diagResult.score)},${scoreColor(diagResult.score)}aa)`, borderRadius: 3, transition: 'width 1s ease' }} />
                    </div>
                    {/* 問題点 */}
                    <p style={{ fontSize: '0.72rem', color: gold, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 12 }}>⚠ 検出された問題点</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                      {diagResult.problems.map((p, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: bg3, border: `1px solid ${border}`, borderRadius: 8, padding: '12px 14px' }}>
                          <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{p.icon}</span>
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: 2 }}>{p.title}</div>
                            <div style={{ fontSize: '0.78rem', color: muted, lineHeight: 1.6 }}>{p.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* 提案 */}
                    <div style={{ background: `linear-gradient(135deg,rgba(109,190,214,0.08),rgba(109,190,214,0.03))`, border: `1px solid rgba(109,190,214,0.2)`, borderRadius: 8, padding: '14px 16px' }}>
                      <p style={{ fontSize: '0.72rem', color: cyan, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 6 }}>💡 NEXTGAMEの改善提案</p>
                      <p style={{ fontSize: '0.85rem', color: textColor, lineHeight: 1.7 }}>{diagResult.suggestion}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, border: `1px solid rgba(200,168,74,0.2)`, padding: '4px 14px', borderRadius: 2, marginBottom: 16 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: gold, display: 'inline-block' }} />
                    FREE LP GENERATOR
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.6rem,5vw,2.4rem)', fontWeight: 900, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>
                    会社名を入れるだけ。<br /><span style={{ color: cyan }}>AIが全部作る。</span>
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.8 }}>30秒で本格LPが完成します。</p>
                </div>
              )}

              {/* LP生成フォーム */}
              <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 16, padding: '24px 20px' }}>
                <p style={{ fontSize: '0.8rem', color: gold, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 16 }}>
                  {diagResult ? '✨ 改善版LPを無料生成する' : '✨ 無料でLPを生成する'}
                </p>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: muted, letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>会社名・サービス名 *</label>
                  <input className="inp" type="text" placeholder="例：山田整体院" value={lpTitle} onChange={e => setLpTitle(e.target.value)} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: muted, letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>業種（任意）</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {INDUSTRIES.map(ind => (
                      <button key={ind} className={lpIndustry === ind ? 'ind-btn active' : 'ind-btn'} onClick={() => { setLpIndustry(lpIndustry === ind ? '' : ind); setLpOther(''); }}>{ind}</button>
                    ))}
                  </div>
                  {lpIndustry === 'その他' && (
                    <input className="inp" type="text" placeholder="業種を入力" value={lpOther} onChange={e => setLpOther(e.target.value)} style={{ marginTop: 10 }} />
                  )}
                </div>
                {lpError && <div style={{ fontSize: '0.82rem', color: '#f87171', marginBottom: 12 }}>{lpError}</div>}
                <button
                  onClick={handleGenerate}
                  style={{ width: '100%', padding: '18px', background: `linear-gradient(135deg,${gold},#e8d48a)`, border: 'none', borderRadius: 8, color: '#000', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  AIでLPを無料生成する
                </button>
              </div>
              <p style={{ fontSize: '0.72rem', color: muted, marginTop: 12, textAlign: 'center' }}>✓ クレカ不要　✓ 登録不要　✓ 完全無料</p>
            </div>
          )}

          {/* ── STEP 4: 生成中 ── */}
          {diagStep === 'generating' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '40vh', justifyContent: 'center', gap: 24 }}>
              <div style={{ width: 56, height: 56, border: `2px solid rgba(200,168,74,0.15)`, borderTopColor: gold, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1rem', color: gold, fontWeight: 700, marginBottom: 8 }}>AIがLPを生成中...</p>
                <p style={{ fontSize: '0.82rem', color: muted }}>キャッチコピー生成 → デザイン適用 → 画像選定</p>
              </div>
            </div>
          )}

          {/* ── STEP 5: 完了 ── */}
          {diagStep === 'done' && (
            <div style={{ textAlign: 'center', animation: 'fadeUp 0.6s ease forwards' }}>
              <div style={{ marginBottom: 24 }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" style={{ display: 'block', margin: '0 auto' }}>
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem,5vw,2.4rem)', fontWeight: 900, color: '#fff', marginBottom: 8 }}>LP生成完了！</h2>
              <p style={{ fontSize: '0.9rem', color: muted, marginBottom: 28, lineHeight: 1.7 }}>約1〜2分でビルドが完了します。</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a
                  href={`/lp/${generatedSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '18px', background: `linear-gradient(135deg,${gold},#e8d48a)`, borderRadius: 8, color: '#000', fontSize: '1rem', fontWeight: 900, textDecoration: 'none' }}
                >
                  生成されたLPを見る →
                </a>
                <LineBtn text="このLPをサブスクで運用する" full />
                <button
                  onClick={() => { setDiagStep('input'); setUrl(''); setLpTitle(''); setLpIndustry(''); setLpOther(''); setDiagResult(null); }}
                  style={{ padding: '14px', background: 'transparent', border: `1px solid ${border}`, borderRadius: 8, color: muted, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  もう一度診断する
                </button>
              </div>
            </div>
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
              サイトは作った瞬間から<br /><span style={{ color: cyan }}>劣化する。</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.9, marginBottom: 8 }}>運用し続けるから、成果が出る。</p>
            <p style={{ fontSize: '0.88rem', color: '#333', marginBottom: 28 }}>
              Web制作・運用・改善をまるごと月額サブスクで。<span style={{ color: gold }}>初期費用0円・制作費0円。</span>
            </p>
            <LineBtn text="無料相談する" full />
            <p style={{ fontSize: '0.72rem', color: muted, marginTop: 12 }}>✓ 相談無料　✓ 最短3日納品　✓ 営業なし</p>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ── 料金プラン ── */}
      <section className="section" style={{ background: bg }} id="pricing">
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
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: plan.featured ? cyan : 'rgba(109,190,214,0.2)', color: plan.featured ? '#000' : cyan, fontSize: '0.65rem', fontWeight: 700, padding: '3px 14px', borderRadius: 2, whiteSpace: 'nowrap' }}>{plan.badge}</div>
                  )}
                  <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: gold, marginBottom: 6, fontWeight: 700 }}>{plan.name}</p>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.8rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 4 }}>{plan.price}</div>
                  <div style={{ fontSize: '0.72rem', color: muted, marginBottom: 4 }}>{plan.note}</div>
                  <div style={{ fontSize: '0.75rem', color: cyan, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${border}` }}>{plan.target}</div>
                  <div style={{ marginBottom: 24 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} className="check-item"><span className="check-icon">✓</span>{f}</div>
                    ))}
                  </div>
                  <LineBtn text="このプランで相談する" full />
                </div>
              </FadeIn>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: muted, marginTop: 20 }}>※ 表示価格は税抜です　※ 月3社限定</p>
        </div>
      </section>

      <div className="divider" />

      {/* ── 口コミ ── */}
      <section className="section" style={{ background: bg2 }} id="reviews">
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
                    {Array.from({ length: r.star }).map((_, j) => <span key={j} style={{ color: gold }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: textColor, lineHeight: 1.8, marginBottom: 16 }}>{r.text}</p>
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
                <div style={{ background: bg3, border: `1px solid ${border}`, borderRadius: 10 }}>
                  <div style={{ padding: '16px 18px', fontSize: '0.9rem', fontWeight: 700, color: '#fff', display: 'flex', gap: 12 }}>
                    <span style={{ color: gold, flexShrink: 0 }}>Q</span>{f.q}
                  </div>
                  <div style={{ padding: '0 18px 16px 42px', fontSize: '0.85rem', color: muted, lineHeight: 1.8 }}>{f.a}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <LineBtn text="LINEで無料相談する" full />
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
            <p style={{ fontSize: '0.88rem', color: muted, marginBottom: 32, lineHeight: 1.8 }}>相談・見積もり完全無料。しつこい連絡は一切しません。</p>
            <LineBtn text="無料相談する" full />
            <p style={{ fontSize: '0.72rem', color: muted, marginTop: 16 }}>✓ 初期費用0円　✓ 制作費0円　✓ 最短3日　✓ 3ヶ月後は自由解約</p>
          </FadeIn>
        </div>
      </section>

      <footer style={{ padding: '24px 20px', borderTop: `1px solid ${borderGold}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Image src="/logo.png" alt="NEXTGAME" width={120} height={30} style={{ objectFit: 'contain' }} />
        <span style={{ fontSize: '0.75rem', color: muted }}>© 2026 NEXTGAME株式会社</span>
      </footer>
    </div>
  );
}
