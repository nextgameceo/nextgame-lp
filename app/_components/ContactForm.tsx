'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    summary: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setError('');
    if (!form.name || !form.email || !form.summary) {
      setError('お名前・メールアドレス・相談概要は必須です');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.status !== 'ok') {
        setError(data.message ?? '送信に失敗しました');
        setLoading(false);
        return;
      }
      setSent(true);
    } catch {
      setError('通信エラーが発生しました。再度お試しください。');
    }
    setLoading(false);
  };

  const inp: React.CSSProperties = {
    background: 'rgba(109,190,214,0.06)',
    border: '1px solid rgba(109,190,214,0.2)',
    borderRadius: 6,
    color: '#e8f4f8',
    padding: '14px 16px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const lbl: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    color: '#6dbed6',
    marginBottom: 8,
    letterSpacing: '0.08em',
    fontWeight: 700,
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = '#6dbed6');
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'rgba(109,190,214,0.2)');

  if (sent) {
    return (
      <div style={{ textAlign: 'center', background: 'rgba(109,190,214,0.06)', border: '1px solid rgba(109,190,214,0.2)', borderRadius: 16, padding: '64px 40px' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 20 }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#6dbed6" strokeWidth="1.5" style={{ margin: '0 auto', display: 'block' }}>
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: 12, color: '#fff' }}>送信完了しました</h3>
        <p style={{ color: '#6dbed6', lineHeight: 1.8, marginBottom: 8 }}>24時間以内にご返信いたします。</p>
        <p style={{ fontSize: '0.82rem', color: '#4a6580' }}>しばらくお待ちください。</p>
      </div>
    );
  }

  return (
    <div style={{ background: 'rgba(109,190,214,0.04)', border: '1px solid rgba(109,190,214,0.15)', borderRadius: 16, padding: 'clamp(24px,5vw,48px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* お名前・会社名 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={lbl}>お名前 <span style={{ color: '#ef4444' }}>*</span></label>
            <input style={inp} type="text" placeholder="山田 太郎"
              value={form.name} onChange={e => set('name', e.target.value)}
              onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label style={lbl}>会社名・屋号</label>
            <input style={inp} type="text" placeholder="株式会社〇〇"
              value={form.company} onChange={e => set('company', e.target.value)}
              onFocus={focus} onBlur={blur} />
          </div>
        </div>

        {/* メール */}
        <div>
          <label style={lbl}>メールアドレス <span style={{ color: '#ef4444' }}>*</span></label>
          <input style={inp} type="email" placeholder="example@email.com"
            value={form.email} onChange={e => set('email', e.target.value)}
            onFocus={focus} onBlur={blur} />
        </div>

        {/* 相談概要 */}
        <div>
          <label style={lbl}>相談概要 <span style={{ color: '#ef4444' }}>*</span></label>
          <input style={inp} type="text"
            placeholder="例：飲食店のLPを作りたい・既存サイトを改善したい"
            value={form.summary} onChange={e => set('summary', e.target.value)}
            onFocus={focus} onBlur={blur} />
        </div>

        {/* メッセージ */}
        <div>
          <label style={lbl}>詳細・その他（任意）</label>
          <textarea style={{ ...inp, resize: 'vertical', minHeight: 120, lineHeight: 1.7 }}
            placeholder="予算感・現在の状況・ご要望などあればお気軽に"
            value={form.message} onChange={e => set('message', e.target.value)}
            onFocus={focus} onBlur={blur} />
        </div>

        {/* エラー */}
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 6, padding: '12px 16px', fontSize: '0.82rem', color: '#f87171' }}>
            ⚠️ {error}
          </div>
        )}

        {/* 送信ボタン */}
        <button onClick={handleSubmit} disabled={loading} style={{
          background: loading ? 'rgba(109,190,214,0.2)' : 'linear-gradient(135deg,#6dbed6,#7f5af0)',
          color: '#fff',
          fontWeight: 900,
          fontSize: '0.95rem',
          padding: '16px',
          borderRadius: 6,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%',
          letterSpacing: '0.05em',
          transition: 'all 0.2s',
          boxShadow: loading ? 'none' : '0 4px 24px rgba(109,190,214,0.25)',
        }}>
          {loading ? '送信中...' : '無料で相談する →'}
        </button>

        <p style={{ fontSize: '0.75rem', color: '#4a6580', textAlign: 'center', lineHeight: 1.7 }}>
          ✓ 相談・見積もり完全無料　✓ 24時間以内にご返信　✓ しつこい営業なし
        </p>
      </div>
    </div>
  );
}
