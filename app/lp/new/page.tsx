"use client"

import { useState } from "react"

const STEPS = [
  {
    id: 'industry',
    question: '業種を教えてください',
    sub: 'あなたのビジネスに最も近いものを選んでください',
    options: [
      { label: '飲食店・カフェ', icon: '🍽️' },
      { label: '美容サロン・ネイル', icon: '💅' },
      { label: '歯科クリニック', icon: '🦷' },
      { label: '整体院・整骨院', icon: '💆' },
      { label: '不動産', icon: '🏠' },
      { label: '学習塾・スクール', icon: '📚' },
      { label: 'EC・通販', icon: '📦' },
      { label: 'IT・Web制作', icon: '💻' },
      { label: '建設・工務店', icon: '🏗️' },
      { label: 'コンサルタント', icon: '💼' },
      { label: '士業（税理士・弁護士等）', icon: '⚖️' },
      { label: '医療・クリニック', icon: '🏥' },
      { label: 'フィットネス・スポーツ', icon: '💪' },
      { label: 'ブライダル・イベント', icon: '💒' },
      { label: 'その他', icon: '✨' },
    ],
  },
  {
    id: 'target',
    question: 'どんなお客様に来てほしいですか？',
    sub: 'メインターゲットを選んでください',
    options: [
      { label: '近隣の個人客', icon: '🏘️' },
      { label: '20〜30代の女性', icon: '👩' },
      { label: '30〜40代のビジネスマン', icon: '👔' },
      { label: '子育て中のファミリー', icon: '👨‍👩‍👧' },
      { label: '高齢者・シニア層', icon: '👴' },
      { label: '中小企業・法人', icon: '🏢' },
      { label: '個人事業主・フリーランス', icon: '🖥️' },
      { label: '学生・若者', icon: '🎓' },
      { label: 'こだわりを持つ富裕層', icon: '💎' },
      { label: '全年齢・幅広く', icon: '🌍' },
    ],
  },
  {
    id: 'strength',
    question: '一番の強みは何ですか？',
    sub: '他社と差別化できるポイントを選んでください',
    options: [
      { label: '価格の安さ・コスパ', icon: '💰' },
      { label: '圧倒的な技術力・専門性', icon: '🔧' },
      { label: 'スピード・素早い対応', icon: '⚡' },
      { label: '丁寧・親切なサービス', icon: '🤝' },
      { label: '実績・経験の豊富さ', icon: '🏆' },
      { label: '独自の商品・メニュー', icon: '⭐' },
      { label: 'アクセスの良さ・立地', icon: '📍' },
      { label: '完全予約制・プライベート感', icon: '🔒' },
      { label: '最新設備・機器', icon: '🔬' },
      { label: '女性スタッフ・安心感', icon: '👩‍⚕️' },
    ],
  },
  {
    id: 'problem',
    question: '今一番の悩みは何ですか？',
    sub: 'LPで解決したい課題を選んでください',
    options: [
      { label: '新規客が来ない', icon: '😔' },
      { label: 'リピーターが増えない', icon: '🔄' },
      { label: '単価が上げられない', icon: '📉' },
      { label: '競合との差別化ができない', icon: '⚔️' },
      { label: 'ネット集客ができていない', icon: '📱' },
      { label: '問い合わせが少ない', icon: '📞' },
      { label: 'ブランドイメージが弱い', icon: '🎨' },
      { label: '口コミが広がらない', icon: '💬' },
      { label: '採用・求人につなげたい', icon: '👥' },
      { label: '既存サイトをリニューアルしたい', icon: '🔄' },
    ],
  },
  {
    id: 'design',
    question: 'サイトの雰囲気はどれに近いですか？',
    sub: 'ブランドイメージに合うものを選んでください',
    options: [
      { label: '高級感・プレミアム', icon: '👑' },
      { label: '清潔感・信頼感', icon: '🤍' },
      { label: '親しみやすい・温かみ', icon: '🌸' },
      { label: 'スタイリッシュ・モダン', icon: '🖤' },
      { label: 'ポップ・元気・明るい', icon: '🌈' },
      { label: 'プロフェッショナル・クール', icon: '💼' },
      { label: '和風・落ち着き', icon: '🍃' },
      { label: 'ナチュラル・エコ', icon: '🌿' },
    ],
  },
];

export default function NewLpPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [title, setTitle] = useState('');
  const [genStep, setGenStep] = useState<'quiz' | 'name' | 'loading' | 'done'>('quiz');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  const totalSteps = STEPS.length;
  const step = STEPS[currentStep];
  const progress = Math.round((currentStep / totalSteps) * 100);

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);
    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 200);
    } else {
      setTimeout(() => setGenStep('name'), 200);
    }
  };

  const handleGenerate = async () => {
    if (!title.trim()) { setError('会社名・サービス名を入力してください'); return; }
    setError('');
    setGenStep('loading');

    const promptText = `
業種: ${answers.industry ?? '不明'}
ターゲット: ${answers.target ?? '不明'}
強み: ${answers.strength ?? '不明'}
課題: ${answers.problem ?? '不明'}
デザイン雰囲気: ${answers.design ?? '不明'}
    `.trim();

    try {
      const res = await fetch('/api/create-lp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          sub_title: '',
          content: `業種：${answers.industry ?? ''}`,
          client_name: '',
          prompt: promptText,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSlug(data.slug);
      setGenStep('done');
    } catch (e) {
      setError(String(e));
      setGenStep('name');
    }
  };

  const url = 'https://nextgame-limited.com/lp/' + slug;
  const gold = '#c8a84a';
  const cyan = '#6dbed6';

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#e8e8e8', fontFamily: 'Noto Sans JP, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
        .opt-btn {
          display: flex; align-items: center; gap: 12px;
          width: 100%; padding: 16px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; color: #e8e8e8;
          font-size: 0.95rem; font-family: inherit;
          cursor: pointer; transition: all 0.15s; text-align: left;
        }
        .opt-btn:hover { border-color: rgba(200,168,74,0.5); background: rgba(200,168,74,0.05); color: #fff; transform: translateX(4px); }
        .opt-btn.selected { border-color: #c8a84a; background: rgba(200,168,74,0.08); color: #fff; }
        .opt-icon { font-size: 1.4rem; flex-shrink: 0; width: 36px; text-align: center; }
        .inp { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 18px 20px; color: #e8e8e8; font-size: 16px; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .inp:focus { border-color: rgba(200,168,74,0.5); }
        .inp::placeholder { color: #333; }
        @media(max-width:480px){
          .opt-btn { padding: 14px 16px; font-size: 0.88rem; }
        }
      `}</style>

      <nav style={{ padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: '#000', zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Inter, monospace', fontSize: '14px', fontWeight: 900, letterSpacing: '0.12em' }}>
            <span style={{ background: 'linear-gradient(90deg,#c8a84a,#e8d48a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NEXT</span>
            <span style={{ color: '#6dbed6' }}>GAME</span>
          </span>
        </a>
        {genStep === 'quiz' && (
          <span style={{ fontSize: '12px', color: '#555', fontFamily: 'Inter, monospace' }}>
            {currentStep + 1} / {totalSteps}
          </span>
        )}
      </nav>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 20px 100px' }}>

        {genStep === 'quiz' && (
          <div key={currentStep} className="fade-up">
            {/* プログレスバー */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg,${gold},#e8d48a)`, borderRadius: 2, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* 質問 */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, border: `1px solid rgba(200,168,74,0.2)`, padding: '3px 12px', borderRadius: 2, marginBottom: 16 }}>
                STEP {currentStep + 1}
              </div>
              <h1 style={{ fontSize: 'clamp(1.4rem,4vw,1.9rem)', fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>
                {step.question}
              </h1>
              <p style={{ fontSize: '0.85rem', color: '#555' }}>{step.sub}</p>
            </div>

            {/* 選択肢 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {step.options.map((opt) => (
                <button
                  key={opt.label}
                  className={`opt-btn ${answers[step.id] === opt.label ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.label)}
                >
                  <span className="opt-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                  {answers[step.id] === opt.label && (
                    <span style={{ marginLeft: 'auto', color: gold, fontSize: '1rem' }}>✓</span>
                  )}
                </button>
              ))}
            </div>

            {/* 戻るボタン */}
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                style={{ marginTop: 20, background: 'transparent', border: 'none', color: '#444', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                ← 前の質問に戻る
              </button>
            )}
          </div>
        )}

        {genStep === 'name' && (
          <div className="fade-up">
            {/* 回答サマリー */}
            <div style={{ background: 'rgba(200,168,74,0.05)', border: '1px solid rgba(200,168,74,0.15)', borderRadius: 14, padding: '20px', marginBottom: 28 }}>
              <p style={{ fontSize: '0.65rem', color: gold, letterSpacing: '0.2em', fontWeight: 700, marginBottom: 14 }}>あなたの回答</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {STEPS.map(s => answers[s.id] && (
                  <div key={s.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: '#555', minWidth: 80 }}>{s.question.slice(0, 8)}...</span>
                    <span style={{ fontSize: '0.85rem', color: '#e8e8e8', fontWeight: 700 }}>{answers[s.id]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, border: `1px solid rgba(200,168,74,0.2)`, padding: '3px 12px', borderRadius: 2, marginBottom: 16 }}>
                LAST STEP
              </div>
              <h2 style={{ fontSize: 'clamp(1.4rem,4vw,1.9rem)', fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>
                会社名・サービス名を<br />教えてください
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: 24 }}>AIがあなたの情報を元に本格LPを生成します</p>
            </div>

            <input
              className="inp"
              type="text"
              placeholder="例：山田整体院、田中税理士事務所"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGenerate()}
              style={{ marginBottom: 16 }}
            />

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 8, padding: '12px 16px', fontSize: '13px', color: '#f87171', marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              style={{ width: '100%', padding: '18px', background: 'linear-gradient(135deg,#c8a84a,#e8d48a)', border: 'none', borderRadius: 10, color: '#000', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', marginBottom: 12 }}
            >
              AIでLPを生成する（無料）
            </button>

            <button
              onClick={() => { setCurrentStep(STEPS.length - 1); setGenStep('quiz'); }}
              style={{ width: '100%', padding: '13px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#555', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              ← 回答を修正する
            </button>

            <p style={{ fontSize: '0.7rem', color: '#333', marginTop: 12, textAlign: 'center' }}>クレカ不要　登録不要　完全無料</p>
          </div>
        )}

        {genStep === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: 28 }}>
            <div style={{ position: 'relative', width: 72, height: 72 }}>
              <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(200,168,74,0.15)`, borderTopColor: gold, borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
              <div style={{ position: 'absolute', inset: 10, border: `1px solid rgba(109,190,214,0.1)`, borderTopColor: cyan, borderRadius: '50%', animation: 'spin 1.3s linear infinite reverse' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>✨</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter, monospace', fontSize: '1rem', color: gold, letterSpacing: '0.1em', marginBottom: 8, fontWeight: 700 }}>AIがLPを生成中...</p>
              <p style={{ fontSize: '0.82rem', color: '#555' }}>あなたの回答を分析中 → コピー生成 → デザイン適用</p>
            </div>
          </div>
        )}

        {genStep === 'done' && (
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 40 }}>
            <div style={{ marginBottom: 24 }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" style={{ display: 'block', margin: '0 auto' }}>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: 'Inter, monospace', fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
              LP生成完了！
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
              約1〜2分でビルドが完了します。
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 400 }}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '18px', background: 'linear-gradient(135deg,#c8a84a,#e8d48a)', borderRadius: 10, color: '#000', fontSize: '1rem', fontWeight: 900, textDecoration: 'none' }}
              >
                生成されたLPを見る →
              </a>
              <a
                href="https://lin.ee/SJDJXQv"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px', background: '#06C755', borderRadius: 10, color: '#fff', fontSize: '0.95rem', fontWeight: 900, textDecoration: 'none' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
                このLPをサブスクで運用する
              </a>
              <button
                onClick={() => { setCurrentStep(0); setAnswers({}); setTitle(''); setGenStep('quiz'); setSlug(''); }}
                style={{ padding: '14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#555', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                もう一度生成する
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
