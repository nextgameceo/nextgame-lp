'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setLoading(false);
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(109,190,214,0.06)',
    border: '1px solid rgba(109,190,214,0.2)',
    borderRadius: 6,
    color: '#e8f4f8',
    padding: '14px 16px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    color: '#6dbed6',
    marginBottom: 8,
    letterSpacing: '0.08em',
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center', background: 'rgba(109,190,214,0.08)', border: '1px solid rgba(109,190,214,0.3)', borderRadius: 16, padding: '64px 40px' }}>
        <div style={{ fontSize: '3rem', marginBottom: 20 }}>✅</div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: 12, color: '#ffffff' }}>送信完了しました</h3>
        <p style={{ color: '#a0c8d8', lineHeight: 1.8 }}>24時間以内にご返信いたします。<br />しばらくお待ちください。</p>
      </div>
    );
  }

  return (
    <div style={{ background: 'rgba(109,190,214,0.04)', border: '1px solid rgba(109,190,214,0.15)', borderRadius: 16, padding: 'clamp(28px,5vw,52px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>お名前 *</label>
            <input style={inputStyle} type="text" placeholder="山田 太郎" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              onFocus={e => (e.target.style.borderColor = '#6dbed6')}
              onBlur={e => (e.target.style.borderColor = 'rgba(109,190,214,0.2)')} />
          </div>
          <div>
            <label style={labelStyle}>会社名・屋号</label>
            <input style={inputStyle} type="text" placeholder="株式会社〇〇" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
              onFocus={e => (e.target.style.borderColor = '#6dbed6')}
              onBlur={e => (e.target.style.borderColor = 'rgba(109,190,214,0.2)')} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>メールアドレス *</label>
          <input style={inputStyle} type="email" placeholder="example@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            onFocus={e => (e.target.style.borderColor = '#6dbed6')}
            onBlur={e => (e.target.style.borderColor = 'rgba(109,190,214,0.2)')} />
        </div>
        <div>
          <label style={labelStyle}>ご希望のサービス</label>
          <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
            <option value="">選択してください</option>
            <option value="web">Web制作（LP・コーポレートサイト）</option>
            <option value="ops">Web運用・SEO対策</option>
            <option value="music">楽曲制作</option>
            <option value="ai">AI導入支援</option>
            <option value="other">その他・複数</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>お問い合わせ内容 *</label>
          <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }} placeholder="ご相談内容をお気軽にご記入ください。&#10;例：飲食店のLPを作りたい／現在のサイトを改善したい／予算は◯万円程度　など" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
            onFocus={e => (e.target.style.borderColor = '#6dbed6')}
            onBlur={e => (e.target.style.borderColor = 'rgba(109,190,214,0.2)')} />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: loading ? 'rgba(109,190,214,0.3)' : 'linear-gradient(135deg,#6dbed6,#3a9ab8)',
            color: '#060e1c',
            fontWeight: 900,
            fontSize: '1.05rem',
            padding: '18px',
            borderRadius: 6,
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
            boxShadow: loading ? 'none' : '0 0 28px rgba(109,190,214,0.35)',
          }}
        >
          {loading ? '送信中...' : '無料で相談する →'}
        </button>
        <p style={{ fontSize: '0.78rem', color: 'rgba(109,190,214,0.5)', textAlign: 'center' }}>
          ✓ 相談・見積もり完全無料　✓ 24時間以内にご返信　✓ しつこい営業なし
        </p>
      </div>
    </div>
  );
}
