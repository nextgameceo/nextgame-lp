"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function ContactContent() {
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [diagUrl, setDiagUrl] = useState('');
  const [diagScore, setDiagScore] = useState('');
  const [diagCompany, setDiagCompany] = useState('');
  const [diagPrompt, setDiagPrompt] = useState('');
  const [mockupUrl, setMockupUrl] = useState('');
  const [isRedesign, setIsRedesign] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const gold = '#c8a84a';
  const cyan = '#6dbed6';
  const bg = '#000';
  const bg2 = '#0a0a0a';
  const bg3 = '#111';
  const border = 'rgba(255,255,255,0.07)';
  const borderGold = 'rgba(200,168,74,0.2)';
  const muted = '#666';

  useEffect(() => {
    const url = searchParams.get('diag_url') ?? '';
    const score = searchParams.get('diag_score') ?? '';
    const company = searchParams.get('diag_company') ?? '';
    const prompt = searchParams.get('diag_prompt') ?? '';
    const mockup = searchParams.get('mockup_url') ?? '';
    const redesign = searchParams.get('is_redesign') === 'true';

    setDiagUrl(url);
    setDiagScore(score);
    setDiagCompany(company);
    setDiagPrompt(prompt);
    setMockupUrl(mockup);
    setIsRedesign(redesign);
    if (company) setName(company);
    if (prompt) setMessage(prompt);
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) { setError('お名前を入力してください'); return; }
    if (!email.trim() && !phone.trim()) { setError('メールまたは電話番号を入力してください'); return; }
    setError('');
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone, message,
          diag_url: diagUrl,
          diag_score: diagScore,
          diag_company: diagCompany,
          diag_prompt: diagPrompt,
          mockup_url: mockupUrl,
          is_redesign: isRedesign,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus('done');
    } catch (e) {
      setError(String(e));
      setStatus('error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: bg, color: '#e2e8f0', fontFamily: 'Noto Sans JP, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .fade-up{animation:fadeUp 0.5s ease forwards;}
        .inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px 18px;color:#e8e8e8;font-size:16px;font-family:inherit;outline:none;transition:border-color 0.2s;}
        .inp:focus{border-color:rgba(200,168,74,0.5);}
        .inp::placeholder{color:#333;}
      `}</style>

      <nav style={{ padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: bg, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none', fontFamily: 'Inter, monospace', fontSize: 14, fontWeight: 900, letterSpacing: '0.12em' }}>
          <span style={{ background: 'linear-gradient(90deg,#c8a84a,#e8d48a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NEXT</span>
          <span style={{ color: '#6dbed6' }}>GAME</span>
        </a>
        <span style={{ fontSize: 11, color: '#444', letterSpacing: '0.1em' }}>CONTACT</span>
      </nav>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '48px 20px 100px' }}>

        {status === 'done' ? (
          <div className="fade-up" style={{ textAlign: 'center', paddingTop: 40 }}>
            <div style={{ marginBottom: 24 }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" style={{ display: 'block', margin: '0 auto' }}>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
              お問い合わせ完了！
            </h2>
            <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.8, marginBottom: 32 }}>
              内容を確認の上、担当者より<br />1営業日以内にご連絡いたします。
            </p>
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', background: 'linear-gradient(135deg,#c8a84a,#e8d48a)', borderRadius: 10, color: '#000', fontWeight: 900, textDecoration: 'none', fontSize: '0.95rem' }}>
              TOPへ戻る
            </a>
          </div>
        ) : (
          <div className="fade-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, border: '1px solid rgba(200,168,74,0.2)', padding: '4px 14px', borderRadius: 2, marginBottom: 20 }}>
              {isRedesign ? 'REDESIGN CONSULTATION' : 'FREE CONSULTATION'}
            </div>

            <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>
              {isRedesign ? 'リデザインのご相談' : '無料相談・お問い合わせ'}
            </h1>
            <p style={{ fontSize: '0.88rem', color: muted, marginBottom: 28, lineHeight: 1.8 }}>
              {isRedesign ? '診断結果とモックアップをもとに改善案をご提案します。' : '相談・見積もり完全無料。しつこい営業は一切しません。'}
            </p>

            {/* 診断結果・モックアップサマリー */}
            {isRedesign && (diagUrl || mockupUrl) && (
              <div style={{ background: bg2, border: '1px solid rgba(200,168,74,0.2)', borderRadius: 14, padding: '20px', marginBottom: 24 }}>
                <p style={{ fontSize: '0.65rem', color: gold, letterSpacing: '0.2em', fontWeight: 700, marginBottom: 14 }}>自動反映された診断情報</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {diagUrl && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.68rem', color: muted, minWidth: 80, paddingTop: 2 }}>診断URL</span>
                      <span style={{ fontSize: '0.8rem', color: '#e8e8e8', wordBreak: 'break-all' }}>{diagUrl}</span>
                    </div>
                  )}
                  {diagScore && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', color: muted, minWidth: 80 }}>診断スコア</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 900, color: Number(diagScore) >= 70 ? '#10b981' : Number(diagScore) >= 40 ? gold : '#ef4444' }}>{diagScore}</span>
                    </div>
                  )}
                  {mockupUrl && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.68rem', color: muted, minWidth: 80, paddingTop: 2 }}>モックアップ</span>
                      <a href={mockupUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: cyan, wordBreak: 'break-all' }}>{mockupUrl}</a>
                    </div>
                  )}
                </div>
                {diagPrompt && (
                  <div style={{ marginTop: 14, background: bg3, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '12px 14px' }}>
                    <p style={{ fontSize: '0.65rem', color: cyan, marginBottom: 6, letterSpacing: '0.1em' }}>AIが生成した改善プロンプト</p>
                    <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.7 }}>{diagPrompt.slice(0, 160)}...</p>
                  </div>
                )}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: gold, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>
                  お名前・会社名 *
                </label>
                <input className="inp" type="text" placeholder="例：山田 太郎 / 山田整体院" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>
                  メールアドレス
                </label>
                <input className="inp" type="email" placeholder="example@mail.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>
                  電話番号
                </label>
                <input className="inp" type="tel" placeholder="090-0000-0000" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>
                  ご相談内容・ご要望
                </label>
                <textarea
                  className="inp"
                  placeholder="ご相談内容を自由にご記入ください"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  style={{ minHeight: 120, resize: 'vertical', lineHeight: 1.7 }}
                />
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 8, padding: '12px 16px', fontSize: '13px', color: '#f87171', marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              style={{ width: '100%', padding: '18px', background: 'linear-gradient(135deg,#c8a84a,#e8d48a)', border: 'none', borderRadius: 10, color: '#000', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
            >
              {status === 'loading' ? (
                <>
                  <div style={{ width: 18, height: 18, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  送信中...
                </>
              ) : (
                isRedesign ? 'リデザインの相談をする（無料）' : '無料相談を申し込む'
              )}
            </button>
            <p style={{ fontSize: '0.7rem', color: '#333', marginTop: 10, textAlign: 'center' }}>
              1営業日以内にご連絡　しつこい営業なし
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
      <ContactContent />
    </Suspense>
  );
}
