'use client';

import { useState } from 'react';

const INDUSTRIES = [
  '飲食店', '美容サロン', '歯科クリニック', '整体院・整骨院',
  '不動産', '学習塾', 'EC・通販', 'IT・Web', '建設・工務店', 'その他',
];

export default function NewLpPage() {
  const [step, setStep] = useState<'form' | 'loading' | 'done'>('form');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [otherIndustry, setOtherIndustry] = useState('');
  const [clientName, setClientName] = useState('');

  const handleSubmit = async () => {
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
          client_name: clientName,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSlug(data.slug);
      setStep('done');
    } catch (e) {
      setError(String(e));
      setStep('form');
    }
  };

  const url = 'https://nextgame-limited.com/lp/' + slug;

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#e8e8e8', fontFamily: 'Noto Sans JP, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .ind-btn { background: transparent; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 8px 14px; color: #666; font-size: 12px; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .ind-btn:hover { border-color: rgba(109,190,214,0.4); color: #999; }
        .ind-btn.active { border-color: #6dbed6; color: #6dbed6; background: rgba(109,190,214,0.06); }
        .inp { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 16px 18px; color: #e8e8e8; font-size: 15px; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .inp:focus { border-color: rgba(109,190,214,0.5); }
        .inp::placeholder { color: #333; }
      `}</style>

      <nav style={{ padding: '0 40px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Inter, monospace', fontSize: '14px', fontWeight: 900, letterSpacing: '0.12em' }}>
            <span style={{ background: 'linear-gradient(90deg,#c8a84a,#e8d48a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NEXT</span>
            <span style={{ color: '#6dbed6' }}>GAME</span>
          </span>
        </a>
        <span style={{ fontSize: '11px', color: '#444', letterSpacing: '0.1em' }}>LP GENERATOR</span>
      </nav>

      {step === 'form' && (
        <div className="fade-up" style={{ maxWidth: 560, margin: '0 auto', padding: '72px 24px 80px' }}>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(109,190,214,0.2)', padding: '4px 14px', borderRadius: '2px', marginBottom: '20px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6dbed6', display: 'inline-block' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#6dbed6', fontWeight: 700 }}>FREE LP GENERATOR</span>
            </div>
            <h1 style={{ fontFamily: 'Inter, monospace', fontSize: 'clamp(1.8rem,5vw,2.6rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              会社名を入れるだけ。
              <br />
              <span style={{ color: '#6dbed6' }}>AIが全部作る。</span>
            </h1>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.8 }}>
              業種・キャッチコピー・デザイン・コンテンツすべてAIが自動生成。30秒で本格LPが完成します。
            </p>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#6dbed6', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '10px' }}>
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

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#888', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '10px' }}>
              業種を選ぶ（任意）
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {INDUSTRIES.map(ind => (
                <button
                  key={ind}
                  className={industry === ind ? 'ind-btn active' : 'ind-btn'}
                  onClick={() => {
                    setIndustry(industry === ind ? '' : ind);
                    setOtherIndustry('');
                  }}
                >
                  {ind}
                </button>
              ))}
            </div>
            {industry === 'その他' && (
              <input
                className="inp"
                type="text"
                placeholder="業種を入力（例：ペットサロン、農園、占い師）"
                value={otherIndustry}
                onChange={e => setOtherIndustry(e.target.value)}
                style={{ marginTop: '12px' }}
              />
            )}
          </div>

          <div style={{ marginBottom: '36px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#888', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '10px' }}>
              お名前（任意・管理用）
            </label>
            <input
              className="inp"
              type="text"
              placeholder="例：山田 太郎"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '4px', padding: '12px 16px', fontSize: '13px', color: '#f87171', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{ width: '100%', padding: '17px', background: 'linear-gradient(135deg,#6dbed6,#7f5af0)', border: 'none', borderRadius: '4px', color: '#fff', fontFamily: 'Inter, monospace', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em' }}
          >
            AIでLPを生成する（無料）
          </button>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '14px' }}>
            <span style={{ fontSize: '11px', color: '#2a2a2a' }}>✓ クレカ不要</span>
            <span style={{ fontSize: '11px', color: '#2a2a2a' }}>✓ 登録不要</span>
            <span style={{ fontSize: '11px', color: '#2a2a2a' }}>✓ 完全無料</span>
          </div>
        </div>
      )}

      {step === 'loading' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '24px' }}>
          <div style={{ width: '48px', height: '48px', border: '2px solid rgba(109,190,214,0.15)', borderTopColor: '#6dbed6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, monospace', fontSize: '13px', color: '#6dbed6', letterSpacing: '0.15em', marginBottom: '8px' }}>AIがLPを生成中...</p>
            <p style={{ fontSize: '12px', color: '#333' }}>業種分析 → キャッチコピー生成 → デザイン適用</p>
          </div>
        </div>
      )}

      {step === 'done' && (
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ marginBottom: '24px' }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#6dbed6" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto' }}>
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 style={{ fontFamily: 'Inter, monospace', fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            LP生成完了
          </h2>
          <p style={{ fontSize: '13px', color: '#555', marginBottom: '28px', lineHeight: 1.7 }}>
            約1〜2分でビルドが完了します。
            <br />
            下のボタンからアクセスできます。
          </p>
          <div style={{ background: 'rgba(109,190,214,0.04)', border: '1px solid rgba(109,190,214,0.12)', borderRadius: '4px', padding: '14px 20px', marginBottom: '16px', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '12px', color: '#4a6580', maxWidth: '440px', width: '100%' }}>
            {url}
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '36px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'linear-gradient(135deg,#6dbed6,#7f5af0)', borderRadius: '4px', color: '#fff', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
            >
              生成されたLPを見る
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(url)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 20px', background: 'transparent', border: '1px solid rgba(109,190,214,0.25)', borderRadius: '4px', color: '#6dbed6', fontFamily: 'Inter, monospace', fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em' }}
            >
              URLをコピー
            </button>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', maxWidth: '380px', width: '100%' }}>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '16px', lineHeight: 1.7 }}>
              このLPをそのまま使いたい方は
              <br />
              NEXTGAMEのサブスクをご検討ください。
            </p>
            
              href="https://lin.ee/SJDJXQv"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', background: '#06C755', borderRadius: '4px', color: '#fff', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
            >
              LINEで相談する
            </a>
          </div>
        </div>
      )}
    </div>
  );
}