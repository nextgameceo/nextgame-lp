'use client';

import { useState } from 'react';

const ACCENT_OPTIONS = [
  { value: 'cyan',   label: 'シアン（青）',   color: '#63b3ed' },
  { value: 'violet', label: 'バイオレット（紫）', color: '#7f5af0' },
  { value: 'green',  label: 'グリーン（緑）',  color: '#48bb78' },
  { value: 'orange', label: 'オレンジ',       color: '#ed8936' },
  { value: 'red',    label: 'レッド（赤）',    color: '#fc8181' },
];

const LAYOUT_OPTIONS = [
  { value: 'hero-center',  label: '中央寄せ',     desc: 'タイトルが画面中央に大きく表示' },
  { value: 'hero-left',    label: '左テキスト',    desc: '左にテキスト・右に画像' },
  { value: 'visual-first', label: '画像ファースト', desc: '画像が最初に大きく表示' },
];

export default function NewLpPage() {
  const [step, setStep] = useState<'form' | 'loading' | 'done'>('form');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    sub_title: '',
    content: '',
    accent_color: 'cyan',
    layout: 'hero-center',
    client_name: '',
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title || !form.sub_title || !form.content) {
      setError('会社名・キャッチコピー・説明文は必須です');
      return;
    }
    setError('');
    setStep('loading');

    try {
      const res = await fetch('/api/create-lp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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

  const url = `https://nextgame-limited.com/lp/${slug}`;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060a12',
      color: '#e2e8f0',
      fontFamily: "'Noto Sans JP', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Noto+Sans+JP:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wrap { max-width: 640px; margin: 0 auto; padding: 80px 24px 60px; }
        .head-label { font-family: 'Orbitron', monospace; font-size: 0.65rem; letter-spacing: 0.3em; color: #63b3ed; margin-bottom: 12px; }
        .head-title { font-family: 'Orbitron', monospace; font-size: clamp(1.4rem, 4vw, 2rem); font-weight: 900; background: linear-gradient(135deg, #fff 40%, #63b3ed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; }
        .head-sub { font-size: 0.85rem; color: #718096; margin-bottom: 48px; line-height: 1.7; }
        .field { margin-bottom: 28px; }
        .field label { display: block; font-size: 0.75rem; letter-spacing: 0.15em; color: #63b3ed; margin-bottom: 8px; font-family: 'Orbitron', monospace; }
        .field input, .field textarea { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 4px; padding: 14px 16px; color: #e2e8f0; font-size: 0.95rem; font-family: inherit; transition: border-color 0.2s; outline: none; }
        .field input:focus, .field textarea:focus { border-color: #63b3ed; }
        .field textarea { resize: vertical; min-height: 120px; line-height: 1.7; }
        .color-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        .color-btn { padding: 10px 6px; border-radius: 4px; border: 2px solid transparent; background: rgba(255,255,255,0.04); cursor: pointer; text-align: center; transition: all 0.2s; }
        .color-btn.active { border-color: #fff; background: rgba(255,255,255,0.1); }
        .color-dot { width: 24px; height: 24px; border-radius: 50%; margin: 0 auto 6px; }
        .color-btn span { font-size: 0.65rem; color: #a0aec0; display: block; line-height: 1.4; }
        .layout-grid { display: flex; flex-direction: column; gap: 10px; }
        .layout-btn { padding: 14px 16px; border-radius: 4px; border: 2px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); cursor: pointer; text-align: left; transition: all 0.2s; display: flex; align-items: center; gap: 14px; }
        .layout-btn.active { border-color: #63b3ed; background: rgba(99,179,237,0.08); }
        .layout-btn-title { font-size: 0.9rem; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .layout-btn-desc { font-size: 0.75rem; color: #718096; }
        .radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #718096; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .radio.active { border-color: #63b3ed; }
        .radio.active::after { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #63b3ed; }
        .error { color: #fc8181; font-size: 0.82rem; margin-bottom: 20px; padding: 12px 16px; background: rgba(252,129,129,0.08); border: 1px solid rgba(252,129,129,0.2); border-radius: 4px; }
        .btn-submit { width: 100%; padding: 18px; background: linear-gradient(135deg, #63b3ed, #7f5af0); border: none; border-radius: 4px; color: #fff; font-family: 'Orbitron', monospace; font-size: 0.85rem; letter-spacing: 0.15em; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,179,237,0.4); }
        .loading-wrap { text-align: center; padding: 80px 24px; }
        .spinner { width: 48px; height: 48px; border: 3px solid rgba(99,179,237,0.2); border-top-color: #63b3ed; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 24px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .done-wrap { text-align: center; padding: 60px 24px; }
        .done-icon { font-size: 3rem; margin-bottom: 16px; }
        .url-box { background: rgba(99,179,237,0.08); border: 1px solid rgba(99,179,237,0.3); border-radius: 4px; padding: 16px 20px; margin: 24px 0; word-break: break-all; font-family: monospace; font-size: 0.9rem; color: #63b3ed; }
        .btn-copy { padding: 12px 28px; background: rgba(99,179,237,0.15); border: 1px solid #63b3ed; border-radius: 4px; color: #63b3ed; font-family: 'Orbitron', monospace; font-size: 0.75rem; letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s; }
        .btn-copy:hover { background: rgba(99,179,237,0.25); }
        @media(max-width: 480px) { .color-grid { grid-template-columns: repeat(3, 1fr); } }
      `}</style>

      {step === 'form' && (
        <div className="wrap">
          <p className="head-label">LP GENERATOR</p>
          <h1 className="head-title">あなたのLPを<br />今すぐ作成</h1>
          <p className="head-sub">
            以下のフォームに入力するだけで、<br />
            プロ品質のLPが自動生成されます。
          </p>

          <div className="field">
            <label>会社名 / サービス名 *</label>
            <input
              type="text"
              placeholder="例：○○株式会社"
              value={form.title}
              onChange={e => set('title', e.target.value)}
            />
          </div>

          <div className="field">
            <label>キャッチコピー *</label>
            <input
              type="text"
              placeholder="例：あなたのビジネスを次のステージへ"
              value={form.sub_title}
              onChange={e => set('sub_title', e.target.value)}
            />
          </div>

          <div className="field">
            <label>サービス説明文 *</label>
            <textarea
              placeholder="サービスや商品の特徴・強みを自由に入力してください"
              value={form.content}
              onChange={e => set('content', e.target.value)}
            />
          </div>

          <div className="field">
            <label>お名前（管理用・非公開）</label>
            <input
              type="text"
              placeholder="例：山田太郎"
              value={form.client_name}
              onChange={e => set('client_name', e.target.value)}
            />
          </div>

          <div className="field">
            <label>テーマカラー</label>
            <div className="color-grid">
              {ACCENT_OPTIONS.map(o => (
                <button
                  key={o.value}
                  className={`color-btn ${form.accent_color === o.value ? 'active' : ''}`}
                  onClick={() => set('accent_color', o.value)}
                >
                  <div className="color-dot" style={{ background: o.color }} />
                  <span>{o.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>レイアウト</label>
            <div className="layout-grid">
              {LAYOUT_OPTIONS.map(o => (
                <button
                  key={o.value}
                  className={`layout-btn ${form.layout === o.value ? 'active' : ''}`}
                  onClick={() => set('layout', o.value)}
                >
                  <div className={`radio ${form.layout === o.value ? 'active' : ''}`} />
                  <div>
                    <div className="layout-btn-title">{o.label}</div>
                    <div className="layout-btn-desc">{o.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error">⚠️ {error}</div>}

          <button className="btn-submit" onClick={handleSubmit}>
            ⚡ LP を生成する
          </button>
        </div>
      )}

      {step === 'loading' && (
        <div className="loading-wrap">
          <div className="spinner" />
          <p style={{ fontFamily: "'Orbitron',monospace", fontSize: '0.85rem', color: '#63b3ed', letterSpacing: '0.1em' }}>
            LP を生成中...
          </p>
          <p style={{ fontSize: '0.8rem', color: '#718096', marginTop: 12 }}>
            約1〜2分後に公開されます
          </p>
        </div>
      )}

      {step === 'done' && (
        <div className="done-wrap">
          <div className="done-icon">🎉</div>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: '1.2rem', color: '#fff', marginBottom: 8 }}>
            LP生成完了！
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#718096', lineHeight: 1.7 }}>
            約1〜2分後に以下のURLで公開されます。
          </p>
          <div className="url-box">{url}</div>
          <button className="btn-copy" onClick={() => navigator.clipboard.writeText(url)}>
            URLをコピー
          </button>
          <p style={{ fontSize: '0.75rem', color: '#718096', marginTop: 24 }}>
            ※ ビルドに1〜2分かかります。しばらく後にアクセスしてください。
          </p>
        </div>
      )}
    </div>
  );
}
