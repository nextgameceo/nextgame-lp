"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface DiagResult {
  score: number;
  company: string;
  industry: string;
  problems: { title: string; desc: string }[];
  suggestion: string;
  prompt: string;
}

const PROBLEM_ICONS = ['🔍', '⚡', '📉', '🎯', '💬'];

function DiagnoseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<DiagResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('サイトにアクセス中...');
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
    const url = searchParams.get('url');
    if (!url) { router.push('/lp/new'); return; }

    const msgs = [
      'サイトにアクセス中...',
      'コンテンツを解析中...',
      'SEOスコアを計算中...',
      'デザイン品質を評価中...',
      'リデザインプロンプトを生成中...',
    ];
    let i = 0;
    const t = setInterval(() => { i = Math.min(i + 1, msgs.length - 1); setMessage(msgs[i]); }, 1400);

    fetch('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
      .then(r => r.json())
      .then(data => {
        clearInterval(t);
        if (data.error) { setError(data.error); setLoading(false); return; }
        setResult(data);
        setLoading(false);
      })
      .catch(() => {
        clearInterval(t);
        setError('診断に失敗しました。URLを確認してください。');
        setLoading(false);
      });
  }, []);

  const scoreColor = (s: number) => s >= 70 ? '#10b981' : s >= 40 ? gold : '#ef4444';
  const scoreLabel = (s: number) => s >= 70 ? '良好' : s >= 40 ? '要改善' : '緊急改善が必要';

  const handleGoToRedesign = () => {
    if (!result) return;
    const params = new URLSearchParams({
      prompt: result.prompt ?? '',
      company: result.company ?? '',
      industry: result.industry ?? '',
      is_redesign: 'true',
    });
    router.push(`/lp/new?${params.toString()}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: bg, color: '#e2e8f0', fontFamily: 'Noto Sans JP, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.5s ease forwards;}
      `}</style>

      <nav style={{ padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: bg, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none', fontFamily: 'Inter, monospace', fontSize: 14, fontWeight: 900, letterSpacing: '0.12em' }}>
          <span style={{ background: 'linear-gradient(90deg,#c8a84a,#e8d48a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NEXT</span>
          <span style={{ color: '#6dbed6' }}>GAME</span>
        </a>
        <span style={{ fontSize: 11, color: '#444', letterSpacing: '0.1em' }}>AI DIAGNOSIS</span>
      </nav>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 20px 100px' }}>

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '50vh', justifyContent: 'center', gap: 28 }}>
            <div style={{ position: 'relative', width: 80, height: 80 }}>
              <div style={{ position: 'absolute', inset: 0, border: `2px solid rgba(200,168,74,0.15)`, borderTopColor: gold, borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
              <div style={{ position: 'absolute', inset: 10, border: `1px solid rgba(109,190,214,0.1)`, borderTopColor: cyan, borderRadius: '50%', animation: 'spin 1.3s linear infinite reverse' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>🔍</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', color: gold, fontWeight: 700, marginBottom: 8 }}>AI診断中...</p>
              <p style={{ fontSize: '0.85rem', color: muted }}>{message}</p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <p style={{ fontSize: '1rem', color: '#f87171', marginBottom: 24 }}>{error}</p>
            <button onClick={() => router.push('/')} style={{ padding: '14px 28px', background: `linear-gradient(135deg,${gold},#e8d48a)`, border: 'none', borderRadius: 8, color: '#000', fontWeight: 900, cursor: 'pointer', fontSize: '0.95rem' }}>
              TOPへ戻る
            </button>
          </div>
        )}

        {!loading && result && (
          <div className="fade-up">
            {/* ヘッダー */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, border: `1px solid ${borderGold}`, padding: '4px 14px', borderRadius: 2, marginBottom: 24 }}>
              DIAGNOSIS COMPLETE
            </div>

            {/* スコアカード */}
            <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 16, padding: '28px 24px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: '0.68rem', color: muted, marginBottom: 4, letterSpacing: '0.1em' }}>診断完了</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{result.company || 'あなたのサイト'}</p>
                  <p style={{ fontSize: '0.75rem', color: muted, marginTop: 2 }}>{result.industry}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '3.2rem', fontWeight: 900, color: scoreColor(result.score), lineHeight: 1 }}>{result.score}</div>
                  <div style={{ fontSize: '0.65rem', color: scoreColor(result.score), fontWeight: 700, marginTop: 4 }}>{scoreLabel(result.score)}</div>
                </div>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden', marginBottom: 24 }}>
                <div style={{ height: '100%', width: `${result.score}%`, background: `linear-gradient(90deg,${scoreColor(result.score)},${scoreColor(result.score)}88)`, borderRadius: 3, transition: 'width 1.2s ease' }} />
              </div>

              <p style={{ fontSize: '0.65rem', color: gold, letterSpacing: '0.2em', fontWeight: 700, marginBottom: 12 }}>検出された問題点</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.problems?.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: bg3, border: `1px solid ${border}`, borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(200,168,74,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '1rem' }}>{PROBLEM_ICONS[i] ?? '⚠️'}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: 3 }}>{p.title}</div>
                      <div style={{ fontSize: '0.78rem', color: muted, lineHeight: 1.6 }}>{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 改善提案 */}
            <div style={{ background: 'rgba(109,190,214,0.05)', border: `1px solid rgba(109,190,214,0.15)`, borderRadius: 12, padding: '20px', marginBottom: 16 }}>
              <p style={{ fontSize: '0.65rem', color: cyan, letterSpacing: '0.2em', fontWeight: 700, marginBottom: 10 }}>改善提案</p>
              <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.8 }}>{result.suggestion}</p>
            </div>

            {/* 生成プロンプト */}
            <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 12, padding: '20px', marginBottom: 28 }}>
              <p style={{ fontSize: '0.65rem', color: gold, letterSpacing: '0.2em', fontWeight: 700, marginBottom: 10 }}>リデザイン用プロンプト（自動生成）</p>
              <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.8 }}>{result.prompt}</p>
              <p style={{ fontSize: '0.68rem', color: '#444', marginTop: 10 }}>このプロンプトがリデザインに自動反映されます</p>
            </div>

            <button
              onClick={handleGoToRedesign}
              style={{ width: '100%', padding: '18px', background: `linear-gradient(135deg,${gold},#e8d48a)`, border: 'none', borderRadius: 10, color: '#000', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', marginBottom: 10 }}
            >
              このサイトをリデザインする →
            </button>
            <button
              onClick={() => router.push('/lp/new')}
              style={{ width: '100%', padding: '13px', background: 'transparent', border: `1px solid ${border}`, borderRadius: 10, color: muted, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              新規LPを作成する
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiagnosePage() {
  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
      <DiagnoseContent />
    </Suspense>
  );
}
