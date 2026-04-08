'use client';

import { useState } from 'react';
import Image from 'next/image';

const TABS = [
  { id: 'company', label: '会社概要' },
  { id: 'ceo', label: 'CEOメッセージ' },
];

export default function AboutClient() {
  const [activeTab, setActiveTab] = useState('company');

  const cyan = '#6dbed6';
  const bg = '#060e1c';
  const bg2 = '#0a1628';
  const border = 'rgba(109,190,214,0.12)';
  const muted = '#4a6580';
  const text = '#e2e8f0';

  return (
    <div style={{ background: bg, color: text, minHeight: '100vh', fontFamily: 'Noto Sans JP, sans-serif', paddingTop: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ── ヒーロー ── */}
      <div style={{ position: 'relative', padding: '60px 24px 48px', textAlign: 'center', overflow: 'hidden', borderBottom: `1px solid ${border}` }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(109,190,214,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(109,190,214,0.04) 1px,transparent 1px)`, backgroundSize: '44px 44px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, background: 'radial-gradient(ellipse,rgba(109,190,214,0.1) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.68rem', letterSpacing: '0.25em', color: cyan, border: `1px solid rgba(109,190,214,0.2)`, padding: '4px 14px', borderRadius: 2, marginBottom: 16 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: cyan, display: 'inline-block' }} />
            ABOUT US
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>
            Web運用で、<span style={{ color: cyan }}>成果にコミット。</span>
          </h1>
          <p style={{ fontSize: '0.9rem', color: muted, lineHeight: 1.9, maxWidth: 480, margin: '0 auto' }}>
            NEXTGAMEは、AIを最大活用したWeb制作・運用代行のサブスク専門会社です。<br />
            作って終わりではなく、運用し続けることで成果を出すことにこだわります。
          </p>
        </div>
      </div>

      {/* ── タブ ── */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${border}`, maxWidth: 800, margin: '0 auto' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, padding: '16px', background: 'transparent', border: 'none',
            borderBottom: activeTab === tab.id ? `2px solid ${cyan}` : '2px solid transparent',
            color: activeTab === tab.id ? cyan : muted,
            fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', letterSpacing: '0.05em', transition: 'all 0.2s',
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 会社概要タブ ── */}
      {activeTab === 'company' && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>

          {/* 会社情報 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.25em', color: cyan, fontWeight: 700, marginBottom: 8 }}>COMPANY INFO</p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: 24 }}>会社概要</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${border}`, borderRadius: 10, overflow: 'hidden' }}>
              {[
                { term: '社名', desc: 'NEXTGAME株式会社' },
                { term: '所在地', desc: '愛知県名古屋市' },
                { term: '設立', desc: '2025年2月19日' },
                { term: '法人番号', desc: '5180001170695' },
                { term: '代表者', desc: '内山 博貴（Hiroki Uchiyama）' },
                { term: '事業内容', desc: 'Web制作・Web運用代行・AI導入支援（サブスク専門）' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 0, borderBottom: i < 5 ? `1px solid ${border}` : 'none' }}>
                  <div style={{ width: 120, flexShrink: 0, padding: '16px 20px', background: bg2, fontSize: '0.78rem', color: cyan, fontWeight: 700, letterSpacing: '0.05em' }}>{item.term}</div>
                  <div style={{ flex: 1, padding: '16px 20px', fontSize: '0.88rem', color: text, lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 事業内容 */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.25em', color: cyan, fontWeight: 700, marginBottom: 8 }}>SERVICES</p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: 24 }}>事業内容</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { num: '01', title: 'Web制作', desc: 'AIを活用したLP・コーポレートサイトの制作。サブスク契約者への特典として制作費0円・最短3日で納品。' },
                { num: '02', title: 'Web運用代行', desc: '更新・SEO・分析・改善まで月額で一括対応。成果が出るまで毎月PDCAを回し続けます。' },
                { num: '03', title: 'AI運用自動化', desc: 'コンテンツ更新・データ分析・レポート作成をAIで自動化。人件費削減と品質向上を同時に実現。' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: bg2, border: `1px solid ${border}`, borderRadius: 10, padding: '20px 18px' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 900, color: 'rgba(109,190,214,0.25)', flexShrink: 0 }}>{item.num}</div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ミッション */}
          <div style={{ background: `linear-gradient(135deg,rgba(109,190,214,0.08),rgba(109,190,214,0.03))`, border: `1px solid rgba(109,190,214,0.2)`, borderRadius: 12, padding: '28px 24px', marginBottom: 40, textAlign: 'center' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.25em', color: cyan, fontWeight: 700, marginBottom: 12 }}>MISSION</p>
            <p style={{ fontSize: 'clamp(1rem,2.5vw,1.3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.6 }}>
              「運用し続けることで、<span style={{ color: cyan }}>すべてのWebに成果を。</span>」
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: '#06C755', borderRadius: 6, color: '#fff', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
              LINEで無料相談する
            </a>
          </div>
        </div>
      )}

      {/* ── CEOメッセージタブ ── */}
      {activeTab === 'ceo' && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>

          {/* プロフィール */}
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${cyan}` }}>
                <Image src="/ceo.jpg" alt="代表取締役 内山博貴" width={120} height={120} style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: cyan, fontWeight: 700, marginBottom: 6 }}>代表取締役</p>
              <p style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: 2 }}>内山 博貴</p>
              <p style={{ fontSize: '0.78rem', color: muted, marginBottom: 12 }}>Hiroki Uchiyama</p>
              <p style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.8, maxWidth: 480 }}>
                愛知県名古屋市を拠点に、AIとWebの力で中小企業・店舗オーナーの集客課題を解決する。「作って終わり」の業界構造に疑問を持ち、運用特化型のサブスク会社NEXTGAMEを創業。
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${border},transparent)`, marginBottom: 40 }} />

          {/* 創業ストーリー */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.25em', color: cyan, fontWeight: 700, marginBottom: 8 }}>FOUNDING STORY</p>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', marginBottom: 20 }}>なぜ、運用特化にこだわるのか。</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: '0.88rem', color: muted, lineHeight: 2 }}>
                私はかつて、精神疾患を発症し入院を経験しました。退院後に目の当たりにしたのは、「高いお金を払ってWebサイトを作ったのに、まったく成果が出ない」と悩む経営者たちの姿でした。
              </p>
              <div style={{ background: bg2, border: `1px solid ${border}`, borderRadius: 10, padding: '20px 18px' }}>
                <p style={{ fontSize: '0.78rem', color: cyan, fontWeight: 700, marginBottom: 8, letterSpacing: '0.1em' }}>業界の構造的問題</p>
                <p style={{ fontSize: '0.85rem', color: muted, lineHeight: 1.9 }}>
                  多くのWeb制作会社は「制作して納品」で終わります。しかし、Webサイトは作った瞬間から劣化し始めます。更新されず、改善もされず、ただ存在するだけのサイトに成果は生まれません。
                </p>
              </div>
              <p style={{ fontSize: '0.88rem', color: muted, lineHeight: 2 }}>
                その課題を解決するために、NEXTGAMEは「運用にコミットするサブスク型Web会社」として創業しました。AIを最大活用することでコストを抑えながら、月額継続で成果が出るまで伴走し続けます。
              </p>
            </div>
          </div>

          {/* ビジョン */}
          <div style={{ background: `linear-gradient(135deg,rgba(109,190,214,0.08),rgba(109,190,214,0.03))`, border: `1px solid rgba(109,190,214,0.2)`, borderRadius: 12, padding: '28px 24px', marginBottom: 40 }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.25em', color: cyan, fontWeight: 700, marginBottom: 16 }}>VISION</p>
            <p style={{ fontSize: 'clamp(0.95rem,2vw,1.15rem)', color: '#fff', lineHeight: 2, marginBottom: 20 }}>
              「Webで悩む経営者をゼロにする。」<br />
              <span style={{ color: muted, fontSize: '0.85rem' }}>それがNEXTGAMEの存在意義です。</span>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${border}`, paddingTop: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', border: `1px solid ${cyan}`, flexShrink: 0 }}>
                <Image src="/ceo.jpg" alt="内山博貴" width={40} height={40} style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.72rem', color: cyan }}>代表取締役</p>
                <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>内山 博貴</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: '#06C755', borderRadius: 6, color: '#fff', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
              LINEで無料相談する
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
