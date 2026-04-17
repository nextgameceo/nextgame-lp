"use client"

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const CONTACT_URL = '/contact';

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
    ],
    hasOther: true,
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
    hasOther: false,
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
      { label: '女性スタッフ・安心感', icon: '👩' },
    ],
    hasOther: false,
  },
  {
    id: 'problem',
    question: '今一番の悩みは何ですか？',
    sub: 'LPで解決したい課題を選んでください',
    options: [
      { label: '新規客が来ない', icon: '😔' },
      { label: 'リピーターが増えない', icon: '🔁' },
      { label: '単価が上げられない', icon: '📉' },
      { label: '競合との差別化ができない', icon: '🆚' },
      { label: 'ネット集客ができていない', icon: '📱' },
      { label: '問い合わせが少ない', icon: '📞' },
      { label: 'ブランドイメージが弱い', icon: '🎨' },
      { label: '口コミが広がらない', icon: '💬' },
      { label: '採用・求人につなげたい', icon: '👥' },
      { label: '既存サイトをリニューアルしたい', icon: '🔃' },
    ],
    hasOther: false,
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
    hasOther: false,
  },
];

function NewLpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isRedesign, setIsRedesign] = useState(false);
  const [diagUrl, setDiagUrl] = useState('');
  const [diagScore, setDiagScore] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherInputs, setOtherInputs] = useState<Record<string, string>>({});
  const [showOther, setShowOther] = useState<Record<string, boolean>>({});
  const [title, setTitle] = useState('');
  const [extraPrompt, setExtraPrompt] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);
  const [genStep, setGenStep] = useState<'quiz' | 'name' | 'loading' | 'done'>('quiz');
  const [slug, setSlug] = useState('');
  const [lpImageUrl, setLpImageUrl] = useState('');
  const [lpSubTitle, setLpSubTitle] = useState('');
  const [lpAccent, setLpAccent] = useState('#3b82f6');
  const [error, setError] = useState('');

  const gold = '#c8a84a';
  const cyan = '#6dbed6';

  useEffect(() => {
    const prompt = searchParams.get('prompt');
    const company = searchParams.get('company');
    const industry = searchParams.get('industry');
    const redesign = searchParams.get('is_redesign');
    const dUrl = searchParams.get('diag_url');
    const dScore = searchParams.get('diag_score');

    if (redesign === 'true') {
      setIsRedesign(true);
      if (prompt) setExtraPrompt(prompt);
      if (company) setTitle(company);
      if (dUrl) setDiagUrl(dUrl);
      if (dScore) setDiagScore(dScore);
      if (industry) {
        const matched = STEPS[0].options.find(
          o => o.label.includes(industry) || industry.includes(o.label.split('・')[0])
        );
        if (matched) setAnswers(prev => ({ ...prev, industry: matched.label }));
      }
      setGenStep('name');
    }
  }, []);

  const totalSteps = STEPS.length;
  const step = STEPS[currentStep];
  const progress = Math.round((currentStep / totalSteps) * 100);

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [step.id]: value }));
    setShowOther(prev => ({ ...prev, [step.id]: false }));
    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 200);
    } else {
      setTimeout(() => setGenStep('name'), 200);
    }
  };

  const handleOtherConfirm = () => {
    const val = otherInputs[step.id];
    if (!val?.trim()) return;
    handleSelect(val.trim());
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const uploadLogo = async (): Promise<string> => {
    if (!logoFile) return '';
    setLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', logoFile);
      const res = await fetch('/api/upload-media', { method: 'POST', body: formData });
      const data = await res.json();
      return data.url ?? '';
    } catch {
      return '';
    } finally {
      setLogoUploading(false);
    }
  };

  const handleGenerate = async () => {
    if (!title.trim()) { setError('会社名・サービス名を入力してください'); return; }
    setError('');
    setGenStep('loading');
    const logoUrl = await uploadLogo();
    const promptParts: string[] = [];
    if (extraPrompt) promptParts.push(extraPrompt);
    if (!isRedesign) {
      if (answers.industry) promptParts.push('業種: ' + answers.industry);
      if (answers.target) promptParts.push('ターゲット: ' + answers.target);
      if (answers.strength) promptParts.push('強み: ' + answers.strength);
      if (answers.problem) promptParts.push('課題: ' + answers.problem);
      if (answers.design) promptParts.push('デザイン: ' + answers.design);
    }
    try {
      const res = await fetch('/api/create-lp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          sub_title: '',
          content: answers.industry ? '業種：' + answers.industry : '',
          client_name: '',
          prompt: promptParts.join('\n'),
          logo_url: logoUrl,
          is_redesign: isRedesign,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSlug(data.slug);
      setLpImageUrl(data.image_url ?? '');
      setLpSubTitle(data.sub_title ?? '');
      const accentMap: Record<string, string> = {
        blue: '#3b82f6', green: '#10b981', orange: '#f97316',
        red: '#ef4444', purple: '#8b5cf6',
      };
      setLpAccent(accentMap[data.accent_color] ?? '#3b82f6');
      setGenStep('done');
    } catch (e) {
      setError(String(e));
      setGenStep('name');
    }
  };

  const handleGoToContact = () => {
    const params = new URLSearchParams({
      diag_url: diagUrl,
      diag_score: diagScore,
      diag_company: title,
      diag_prompt: extraPrompt,
      mockup_url: 'https://nextgame-limited.com/lp/' + slug,
      is_redesign: 'true',
    });
    router.push('/contact?' + params.toString());
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#e8e8e8', fontFamily: 'Noto Sans JP, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .fade-up{animation:fadeUp 0.4s ease forwards;}
        .opt-btn{display:flex;align-items:center;gap:12px;width:100%;padding:16px 20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#e8e8e8;font-size:0.95rem;font-family:inherit;cursor:pointer;transition:all 0.15s;text-align:left;}
        .opt-btn:hover{border-color:rgba(200,168,74,0.5);background:rgba(200,168,74,0.05);color:#fff;transform:translateX(4px);}
        .opt-btn.selected{border-color:#c8a84a;background:rgba(200,168,74,0.08);color:#fff;}
        .opt-icon{font-size:1.4rem;flex-shrink:0;width:36px;text-align:center;}
        .inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px 18px;color:#e8e8e8;font-size:16px;font-family:inherit;outline:none;transition:border-color 0.2s;}
        .inp:focus{border-color:rgba(200,168,74,0.5);}
        .inp::placeholder{color:#333;}
        .logo-drop{border:2px dashed rgba(200,168,74,0.3);border-radius:12px;padding:28px 20px;text-align:center;cursor:pointer;transition:all 0.2s;}
        .logo-drop:hover{border-color:rgba(200,168,74,0.6);background:rgba(200,168,74,0.03);}
      `}</style>

      <nav style={{ padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: '#000', zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none', fontFamily: 'Inter, monospace', fontSize: 14, fontWeight: 900, letterSpacing: '0.12em' }}>
          <span style={{ background: 'linear-gradient(90deg,#c8a84a,#e8d48a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NEXT</span>
          <span style={{ color: '#6dbed6' }}>GAME</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isRedesign && (
            <span style={{ fontSize: 11, color: gold, border: '1px solid rgba(200,168,74,0.3)', padding: '3px 10px', borderRadius: 4, letterSpacing: '0.1em' }}>REDESIGN</span>
          )}
          {genStep === 'quiz' && (
            <span style={{ fontSize: 12, color: '#555', fontFamily: 'Inter, monospace' }}>{currentStep + 1} / {totalSteps}</span>
          )}
        </div>
      </nav>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 20px 100px' }}>

        {genStep === 'quiz' && (
          <div key={currentStep} className="fade-up">
            <div style={{ marginBottom: 32 }}>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: progress + '%', background: 'linear-gradient(90deg,#c8a84a,#e8d48a)', borderRadius: 2, transition: 'width 0.4s ease' }} />
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, border: '1px solid rgba(200,168,74,0.2)', padding: '3px 12px', borderRadius: 2, marginBottom: 14 }}>
                STEP {currentStep + 1}
              </div>
              <h1 style={{ fontSize: 'clamp(1.4rem,4vw,1.9rem)', fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: 6 }}>{step.question}</h1>
              <p style={{ fontSize: '0.85rem', color: '#555' }}>{step.sub}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {step.options.map(opt => (
                <button key={opt.label} className={answers[step.id] === opt.label ? 'opt-btn selected' : 'opt-btn'} onClick={() => handleSelect(opt.label)}>
                  <span className="opt-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                  {answers[step.id] === opt.label && <span style={{ marginLeft: 'auto', color: gold }}>✓</span>}
                </button>
              ))}
              {step.hasOther && !showOther[step.id] && (
                <button className="opt-btn" onClick={() => setShowOther(prev => ({ ...prev, [step.id]: true }))}>
                  <span className="opt-icon">✏️</span>
                  <span>その他（入力する）</span>
                </button>
              )}
              {step.hasOther && showOther[step.id] && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="inp" type="text" placeholder="業種を入力（例：ペットサロン）" value={otherInputs[step.id] ?? ''} onChange={e => setOtherInputs(prev => ({ ...prev, [step.id]: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handleOtherConfirm()} autoFocus />
                  <button onClick={handleOtherConfirm} style={{ padding: '0 20px', background: 'linear-gradient(135deg,#c8a84a,#e8d48a)', border: 'none', borderRadius: 10, color: '#000', fontWeight: 900, cursor: 'pointer', flexShrink: 0 }}>決定</button>
                </div>
              )}
            </div>
            {currentStep > 0 && (
              <button onClick={() => setCurrentStep(currentStep - 1)} style={{ marginTop: 20, background: 'transparent', border: 'none', color: '#444', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                ← 前の質問に戻る
              </button>
            )}
          </div>
        )}

        {genStep === 'name' && (
          <div className="fade-up">
            {isRedesign && (
              <div style={{ background: 'rgba(200,168,74,0.06)', border: '1px solid rgba(200,168,74,0.2)', borderRadius: 12, padding: '16px 18px', marginBottom: 24 }}>
                <p style={{ fontSize: '0.68rem', color: gold, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>リデザインモード</p>
                <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.7 }}>{extraPrompt.slice(0, 120)}...</p>
              </div>
            )}
            {!isRedesign && Object.keys(answers).length > 0 && (
              <div style={{ background: 'rgba(200,168,74,0.05)', border: '1px solid rgba(200,168,74,0.15)', borderRadius: 14, padding: '18px', marginBottom: 24 }}>
                <p style={{ fontSize: '0.65rem', color: gold, letterSpacing: '0.2em', fontWeight: 700, marginBottom: 12 }}>あなたの回答</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {STEPS.map(s => answers[s.id] && (
                    <div key={s.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', color: '#555', minWidth: 72 }}>{s.question.slice(0, 7)}...</span>
                      <span style={{ fontSize: '0.85rem', color: '#e8e8e8', fontWeight: 700 }}>{answers[s.id]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, border: '1px solid rgba(200,168,74,0.2)', padding: '3px 12px', borderRadius: 2, marginBottom: 14 }}>
              {isRedesign ? 'REDESIGN INFO' : 'LAST STEP'}
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem,4vw,1.9rem)', fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: 6 }}>
              {isRedesign ? 'リデザイン情報を確認' : '最後に情報を入力してください'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: 24 }}>
              {isRedesign ? 'AIが既存サイトを分析し、モックアップLPを生成します' : 'AIがあなたの回答を元に本格LPを生成します'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: gold, letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>会社名・サービス名 *</label>
                <input className="inp" type="text" placeholder="例：山田整体院、田中税理士事務所" value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>ロゴ画像（任意）</label>
                <div className="logo-drop" onClick={() => fileInputRef.current?.click()}>
                  {logoPreview ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                      <img src={logoPreview} alt="preview" style={{ maxHeight: 72, maxWidth: '100%', objectFit: 'contain' }} />
                      <p style={{ fontSize: '0.72rem', color: '#555' }}>クリックして変更</p>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>🖼️</div>
                      <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: 4 }}>ロゴ画像をアップロード</p>
                      <p style={{ fontSize: '0.72rem', color: '#333' }}>PNG・JPG・SVG・WebP対応</p>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
              </div>
              {!isRedesign && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', letterSpacing: '0.15em', fontWeight: 700, marginBottom: 8 }}>追加のこだわり（任意）</label>
                  <textarea className="inp" placeholder="例：予約を増やしたい、高級感を出したい..." value={extraPrompt} onChange={e => setExtraPrompt(e.target.value)} style={{ minHeight: 80, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
              )}
            </div>
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 8, padding: '12px 16px', fontSize: '13px', color: '#f87171', marginTop: 16 }}>
                {error}
              </div>
            )}
            <button onClick={handleGenerate} disabled={logoUploading} style={{ width: '100%', padding: '18px', background: 'linear-gradient(135deg,#c8a84a,#e8d48a)', border: 'none', borderRadius: 10, color: '#000', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', marginTop: 20, opacity: logoUploading ? 0.7 : 1 }}>
              {logoUploading ? 'ロゴをアップロード中...' : isRedesign ? 'モックアップLPを生成する（無料）' : 'AIでLPを生成する（無料）'}
            </button>
            {!isRedesign && Object.keys(answers).length > 0 && (
              <button onClick={() => { setCurrentStep(STEPS.length - 1); setGenStep('quiz'); }} style={{ width: '100%', padding: '13px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#555', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', marginTop: 10 }}>
                ← 回答を修正する
              </button>
            )}
            <p style={{ fontSize: '0.7rem', color: '#333', marginTop: 12, textAlign: 'center' }}>クレカ不要　登録不要　完全無料</p>
          </div>
        )}

        {genStep === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: 28 }}>
            <div style={{ position: 'relative', width: 72, height: 72 }}>
              <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(200,168,74,0.15)', borderTopColor: gold, borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
              <div style={{ position: 'absolute', inset: 10, border: '1px solid rgba(109,190,214,0.1)', borderTopColor: cyan, borderRadius: '50%', animation: 'spin 1.3s linear infinite reverse' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>✨</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter, monospace', fontSize: '1rem', color: gold, letterSpacing: '0.1em', marginBottom: 8, fontWeight: 700 }}>
                {isRedesign ? 'モックアップを生成中...' : 'AIがLPを生成中...'}
              </p>
              <p style={{ fontSize: '0.82rem', color: '#555' }}>
                {isRedesign ? '既存サイト分析 → 改善コピー生成 → デザイン適用' : '回答分析 → コピー生成 → デザイン適用'}
              </p>
            </div>
          </div>
        )}

        {genStep === 'done' && (
          <div className="fade-up" style={{ paddingTop: 20 }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, border: '1px solid rgba(200,168,74,0.2)', padding: '4px 14px', borderRadius: 2, marginBottom: 16 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: gold, display: 'inline-block' }} />
                {isRedesign ? 'MOCKUP COMPLETE' : 'LP GENERATED'}
              </div>
              <h2 style={{ fontFamily: 'Inter, monospace', fontSize: 'clamp(1.3rem,4vw,1.8rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
                {isRedesign ? 'モックアップ完成！' : 'LP生成完了！'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#555' }}>
                {isRedesign ? '改善版プレビューを確認してください' : '生成されたLPをご確認ください'}
              </p>
            </div>

            {/* プレビューカード */}
            <div style={{ background: '#0a0a0a', border: '1px solid rgba(200,168,74,0.2)', borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
              {/* ブラウザ風ヘッダー */}
              <div style={{ background: '#111', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '5px 12px', fontSize: '0.7rem', color: '#444', fontFamily: 'monospace' }}>
                  nextgame-limited.com/lp/{slug}
                </div>
                <a href={'/lp/' + slug} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>

              {/* LP画像カード */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                {lpImageUrl ? (
                  <>
                    <img
                      src={lpImageUrl}
                      alt={title}
                      style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.6rem', color: '#fff', background: lpAccent, padding: '3px 10px', borderRadius: 100, fontWeight: 700, marginBottom: 8 }}>
                        {title}
                      </div>
                      <p style={{ fontSize: 'clamp(1rem,3vw,1.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.35, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                        {lpSubTitle}
                      </p>
                    </div>
                  </>
                ) : (
                  <div style={{ height: 160, background: 'linear-gradient(135deg,#0a0a0a,#111)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: '2rem' }}>✨</div>
                    <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{title}</p>
                    <p style={{ fontSize: '0.72rem', color: '#555', textAlign: 'center', padding: '0 20px' }}>{lpSubTitle}</p>
                  </div>
                )}
              </div>

              {/* ステータスバー */}
              <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s ease-in-out infinite' }} />
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>公開中</span>
                </div>
                {isRedesign && diagScore && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.65rem', color: '#444' }}>診断スコア</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 900, color: Number(diagScore) >= 70 ? '#10b981' : Number(diagScore) >= 40 ? gold : '#ef4444' }}>
                      {diagScore}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ボタン群 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {isRedesign ? (
                <>
                  <button
                    onClick={handleGoToContact}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '17px', background: 'linear-gradient(135deg,#c8a84a,#e8d48a)', borderRadius: 10, color: '#000', fontSize: '1rem', fontWeight: 900, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    このデザインで相談する →
                  </button>
                  <a
                    href={'/lp/' + slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', background: 'transparent', border: '1px solid rgba(200,168,74,0.3)', borderRadius: 10, color: gold, fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}
                  >
                    フルページで確認する
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={'/lp/' + slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '17px', background: 'linear-gradient(135deg,#c8a84a,#e8d48a)', borderRadius: 10, color: '#000', fontSize: '1rem', fontWeight: 900, textDecoration: 'none' }}
                  >
                    生成されたLPを見る →
                  </a>
                  <a
                    href={CONTACT_URL}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', background: 'transparent', border: '1px solid rgba(200,168,74,0.3)', borderRadius: 10, color: gold, fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}
                  >
                    このLPで相談する
                  </a>
                </>
              )}
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                  setTitle('');
                  setGenStep('quiz');
                  setSlug('');
                  setLogoFile(null);
                  setLogoPreview('');
                  setExtraPrompt('');
                  setIsRedesign(false);
                  setLpImageUrl('');
                  setLpSubTitle('');
                  setLpAccent('#3b82f6');
                }}
                style={{ padding: '13px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#555', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
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

export default function NewLpPage() {
  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
      <NewLpContent />
    </Suspense>
  );
}
