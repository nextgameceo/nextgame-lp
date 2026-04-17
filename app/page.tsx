"use client"

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CONTACT_URL = '/contact';

const PLANS = [
  {
    name: 'STARTER', price: '29,800', tax: '32,780',
    target: '個人事業主・小規模店舗',
    features: ['Webサイト制作（LP）込み', '月2回コンテンツ更新', '月次アクセスレポート', 'チャット即レスサポート', '最低3ヶ月・以降月単位'],
    featured: false, badge: '',
  },
  {
    name: 'GROWTH', price: '59,800', tax: '65,780',
    target: '中小企業・複数店舗オーナー',
    features: ['Webサイト制作（複数P）込み', '週1回コンテンツ更新', 'SEO対策・検索順位改善', '月次改善提案レポート', 'チャット即レスサポート', '最低3ヶ月・以降月単位'],
    featured: true, badge: '人気No.1',
  },
  {
    name: 'SCALE', price: '99,800', tax: '109,780',
    target: '成長企業・EC・複数事業',
    features: ['フルWebサイト制作込み', '無制限コンテンツ更新', 'SEO・AI自動化・広告連携', '専任担当者アサイン', '週次戦略MTG', '最低3ヶ月・以降月単位'],
    featured: false, badge: 'フルサポート',
  },
];

const REVIEWS = [
  { star: 5, text: '制作費0円で本格サイトが3日で完成。問い合わせが月2件→12件に。広告費ゼロで集客が回り始めた実感があります。', name: '山田 太郎', role: '整体院オーナー', result: '問い合わせ6倍', initial: '山' },
  { star: 5, text: '他社から制作費30万の見積もりを断り、こちらへ。半年でGoogle検索1位を獲得。月次レポートで改善が可視化されます。', name: '佐藤 花子', role: '美容サロン経営者', result: 'Google検索1位', initial: '佐' },
  { star: 5, text: 'AIでLP生成を体験した瞬間に即決。営業感ゼロで相談しやすく、3ヶ月でサイト経由の売上が1.8倍になりました。', name: '鈴木 一郎', role: '不動産会社 代表', result: '売上1.8倍', initial: '鈴' },
];

const FAQ = [
  { q: '制作費が本当に0円なのですか？', a: 'はい。月額サブスク契約（最低3ヶ月）を前提に、Web制作費は完全無料です。単発依頼はお受けしていません。' },
  { q: '3ヶ月後に解約できますか？', a: '最低契約期間終了後は月単位でいつでも解約可能です。成果が出なければ続ける必要はありません。' },
  { q: 'どんな業種でも対応できますか？', a: '飲食・美容・医療・士業・EC・建設など14業種以上に対応。まずご相談ください。' },
  { q: '既存サイトがあっても依頼できますか？', a: 'はい。AI診断で課題を可視化してから、改善提案まで対応します。' },
  { q: 'AIで生成したLPはどのくらいの品質ですか？', a: 'このページのサンプルセクションからご確認ください。実際に30秒で生成されたものです。' },
];

const SAMPLES = [
  { slug: 'lp-xob6wt', label: '美容サロン', catch: '他店の失敗を知っているから、丁寧が違う', img: 'https://images.unsplash.com/photo-1572387263462-c596296d68a8?w=600&q=80', accent: '#8b5cf6' },
  { slug: 'lp-5nu8z9', label: '整体院', catch: '仕事のストレスで歪んだ身体を、根本から整える', img: 'https://images.unsplash.com/photo-1687436874174-977fdd9e2cb8?w=600&q=80', accent: '#10b981' },
  { slug: 'lp-2bcaik', label: '税理士', catch: '税務申告、もう迷わない', img: 'https://images.unsplash.com/photo-1589153954649-9ebab5ddefed?w=600&q=80', accent: '#3b82f6' },
  { slug: 'lp-ymsrwj', label: 'IT・Web', catch: '制作費0円。Web運用の常識を変える。', img: 'https://images.unsplash.com/photo-1677469684112-5dfb3aa4d3df?w=600&q=80', accent: '#00D1FF' },
  { slug: 'lp-xob6wt', label: '飲食・カフェ', catch: '食べた瞬間、また来たくなる味がある', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', accent: '#f97316' },
  { slug: 'lp-5nu8z9', label: '不動産', catch: '一生に一度の選択を、後悔しない物件選びを', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80', accent: '#c8a84a' },
  { slug: 'lp-2bcaik', label: '歯科クリニック', catch: '痛くない治療で、通いたくなる歯科へ', img: 'https://images.unsplash.com/photo-1588776814546-1ffedbe47425?w=600&q=80', accent: '#06b6d4' },
  { slug: 'lp-ymsrwj', label: 'フィットネス', catch: '3ヶ月で体が変わる。続けられる理由がある', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', accent: '#a855f7' },
];

// ── SVGアイコン ──
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const IconMail = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ── 大型SVGイラスト ──
const HeroIllustration = () => (
  <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 400 }}>
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c8a84a" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#6dbed6" stopOpacity="0.8"/>
      </linearGradient>
      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6dbed6" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#6dbed6" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="g3" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#c8a84a" stopOpacity="0"/>
        <stop offset="50%" stopColor="#c8a84a" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#c8a84a" stopOpacity="0"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {/* グリッド背景 */}
    {[0,1,2,3,4,5,6,7,8].map(i => (
      <line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="320" stroke="rgba(200,168,74,0.06)" strokeWidth="1"/>
    ))}
    {[0,1,2,3,4,5,6].map(i => (
      <line key={`h${i}`} x1="0" y1={i*54} x2="400" y2={i*54} stroke="rgba(200,168,74,0.06)" strokeWidth="1"/>
    ))}
    {/* メインチャート */}
    <path d="M 40 240 L 100 200 L 160 210 L 220 160 L 280 120 L 340 80" stroke="url(#g1)" strokeWidth="2.5" fill="none" filter="url(#glow)"/>
    <path d="M 40 240 L 100 200 L 160 210 L 220 160 L 280 120 L 340 80 L 340 280 L 40 280 Z" fill="url(#g2)"/>
    {/* データポイント */}
    {[[40,240],[100,200],[160,210],[220,160],[280,120],[340,80]].map(([x,y],i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="6" fill="#0a0a18" stroke="url(#g1)" strokeWidth="2"/>
        <circle cx={x} cy={y} r="3" fill="#c8a84a"/>
      </g>
    ))}
    {/* ゴールドのグロー横線 */}
    <line x1="0" y1="160" x2="400" y2="160" stroke="url(#g3)" strokeWidth="1" strokeDasharray="4 4"/>
    {/* カード1 */}
    <rect x="240" y="20" width="140" height="70" rx="10" fill="rgba(200,168,74,0.06)" stroke="rgba(200,168,74,0.2)" strokeWidth="1"/>
    <circle cx="262" cy="45" r="10" fill="rgba(200,168,74,0.15)" stroke="rgba(200,168,74,0.3)" strokeWidth="1"/>
    <rect x="278" y="38" width="60" height="7" rx="3" fill="rgba(200,168,74,0.3)"/>
    <rect x="278" y="50" width="40" height="5" rx="2" fill="rgba(255,255,255,0.1)"/>
    <rect x="252" y="65" width="110" height="14" rx="4" fill="rgba(200,168,74,0.15)"/>
    <rect x="266" y="69" width="82" height="5" rx="2" fill="rgba(200,168,74,0.4)"/>
    {/* カード2 */}
    <rect x="20" y="20" width="130" height="60" rx="10" fill="rgba(109,190,214,0.06)" stroke="rgba(109,190,214,0.2)" strokeWidth="1"/>
    <rect x="36" y="34" width="50" height="7" rx="3" fill="rgba(109,190,214,0.3)"/>
    <rect x="36" y="46" width="70" height="5" rx="2" fill="rgba(255,255,255,0.1)"/>
    <rect x="36" y="56" width="40" height="5" rx="2" fill="rgba(255,255,255,0.07)"/>
    {/* ツールチップ */}
    <rect x="240" y="95" width="90" height="32" rx="6" fill="rgba(200,168,74,0.9)"/>
    <polygon points="285,127 280,135 290,135" fill="rgba(200,168,74,0.9)"/>
    <rect x="252" y="103" width="40" height="5" rx="2" fill="rgba(0,0,0,0.4)"/>
    <rect x="252" y="112" width="60" height="5" rx="2" fill="rgba(0,0,0,0.25)"/>
    {/* 右側の縦グラフ */}
    {[
      {x:360,h:60,c:'rgba(200,168,74,0.7)'},
      {x:372,h:90,c:'rgba(109,190,214,0.7)'},
      {x:384,h:45,c:'rgba(200,168,74,0.4)'},
    ].map((b,i) => (
      <rect key={i} x={b.x} y={280-b.h} width="8" height={b.h} rx="3" fill={b.c}/>
    ))}
    {/* パルスリング */}
    <circle cx="280" cy="120" r="14" fill="none" stroke="rgba(200,168,74,0.15)" strokeWidth="1"/>
    <circle cx="280" cy="120" r="22" fill="none" stroke="rgba(200,168,74,0.06)" strokeWidth="1"/>
  </svg>
);

const DiagnoseIllustration = () => (
  <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 340 }}>
    <defs>
      <linearGradient id="dg1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c8a84a" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#e0c96a" stopOpacity="0.9"/>
      </linearGradient>
      <filter id="dglow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {/* ブラウザ枠 */}
    <rect x="10" y="10" width="220" height="160" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
    <rect x="10" y="10" width="220" height="28" rx="10" fill="rgba(255,255,255,0.04)"/>
    <rect x="10" y="28" width="220" height="10" fill="rgba(255,255,255,0.04)"/>
    {/* ブラウザドット */}
    {[26,38,50].map((x,i) => <circle key={i} cx={x} cy={24} r="4" fill={['rgba(255,100,100,0.5)','rgba(255,200,50,0.5)','rgba(50,200,100,0.5)'][i]}/>)}
    {/* URLバー */}
    <rect x="64" y="17" width="120" height="14" rx="4" fill="rgba(255,255,255,0.05)"/>
    <rect x="70" y="21" width="60" height="5" rx="2" fill="rgba(200,168,74,0.3)"/>
    {/* サイトコンテンツ */}
    <rect x="22" y="46" width="80" height="8" rx="3" fill="rgba(255,255,255,0.12)"/>
    <rect x="22" y="60" width="190" height="5" rx="2" fill="rgba(255,255,255,0.06)"/>
    <rect x="22" y="70" width="160" height="5" rx="2" fill="rgba(255,255,255,0.04)"/>
    <rect x="22" y="84" width="190" height="36" rx="6" fill="rgba(109,190,214,0.06)" stroke="rgba(109,190,214,0.12)" strokeWidth="1"/>
    <rect x="32" y="93" width="60" height="6" rx="2" fill="rgba(109,190,214,0.3)"/>
    <rect x="32" y="104" width="100" height="5" rx="2" fill="rgba(255,255,255,0.08)"/>
    <rect x="22" y="128" width="80" height="24" rx="6" fill="rgba(200,168,74,0.15)" stroke="rgba(200,168,74,0.25)" strokeWidth="1"/>
    <rect x="34" y="136" width="56" height="7" rx="3" fill="rgba(200,168,74,0.5)"/>
    {/* スキャンライン */}
    <rect x="10" y="80" width="220" height="2" rx="1" fill="rgba(200,168,74,0.4)" filter="url(#dglow)"/>
    {/* AIスコアカード */}
    <rect x="180" y="90" width="140" height="110" rx="12" fill="rgba(6,6,15,0.95)" stroke="rgba(200,168,74,0.3)" strokeWidth="1.5"/>
    <rect x="192" y="102" width="60" height="6" rx="2" fill="rgba(200,168,74,0.3)"/>
    {/* スコア数字 */}
    <text x="232" y="145" fontFamily="monospace" fontSize="36" fontWeight="900" fill="url(#dg1)" textAnchor="middle">72</text>
    <rect x="192" y="152" width="116" height="4" rx="2" fill="rgba(255,255,255,0.05)"/>
    <rect x="192" y="152" width="80" height="4" rx="2" fill="rgba(200,168,74,0.4)"/>
    <rect x="192" y="162" width="116" height="4" rx="2" fill="rgba(255,255,255,0.05)"/>
    <rect x="192" y="162" width="40" height="4" rx="2" fill="rgba(109,190,214,0.4)"/>
    <rect x="192" y="176" width="116" height="22" rx="6" fill="rgba(200,168,74,0.12)" stroke="rgba(200,168,74,0.2)" strokeWidth="1"/>
    <rect x="202" y="183" width="70" height="6" rx="3" fill="rgba(200,168,74,0.4)"/>
    {/* 矢印 */}
    <path d="M 170 130 L 185 130" stroke="rgba(200,168,74,0.6)" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="3 2"/>
    {/* パルス */}
    <circle cx="232" cy="100" r="6" fill="rgba(200,168,74,0.2)" stroke="rgba(200,168,74,0.5)" strokeWidth="1"/>
    <circle cx="232" cy="100" r="3" fill="#c8a84a"/>
  </svg>
);

const OperationIllustration = () => (
  <svg viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 340 }}>
    <defs>
      <linearGradient id="og1" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0"/>
        <stop offset="100%" stopColor="#10b981" stopOpacity="0.5"/>
      </linearGradient>
    </defs>
    {/* 中央ノード */}
    <circle cx="170" cy="120" r="36" fill="rgba(200,168,74,0.08)" stroke="rgba(200,168,74,0.25)" strokeWidth="1.5"/>
    <circle cx="170" cy="120" r="24" fill="rgba(200,168,74,0.12)" stroke="rgba(200,168,74,0.35)" strokeWidth="1.5"/>
    <circle cx="170" cy="120" r="14" fill="rgba(200,168,74,0.2)" stroke="rgba(200,168,74,0.5)" strokeWidth="1.5"/>
    {/* NGロゴ中央 */}
    <text x="170" y="126" fontFamily="monospace" fontSize="11" fontWeight="900" fill="#c8a84a" textAnchor="middle">NG</text>
    {/* 接続線 */}
    {[
      [170,120,60,40],
      [170,120,280,40],
      [170,120,40,180],
      [170,120,300,180],
      [170,120,170,210],
    ].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(200,168,74,0.15)" strokeWidth="1" strokeDasharray="4 3"/>
    ))}
    {/* サービスノード */}
    {[
      {x:60,y:40,label:'AI診断',color:'#c8a84a'},
      {x:280,y:40,label:'LP生成',color:'#6dbed6'},
      {x:40,y:180,label:'SEO',color:'#10b981'},
      {x:300,y:180,label:'レポート',color:'#8b5cf6'},
      {x:170,y:210,label:'サポート',color:'#f97316'},
    ].map((n,i) => (
      <g key={i}>
        <circle cx={n.x} cy={n.y} r="22" fill={`${n.color}10`} stroke={`${n.color}30`} strokeWidth="1"/>
        <circle cx={n.x} cy={n.y} r="14" fill={`${n.color}15`} stroke={`${n.color}40`} strokeWidth="1"/>
        <text x={n.x} y={n.y+4} fontFamily="Noto Sans JP,sans-serif" fontSize="7" fill={n.color} textAnchor="middle" fontWeight="700">{n.label}</text>
      </g>
    ))}
    {/* グロー */}
    <circle cx="170" cy="120" r="50" fill="none" stroke="rgba(200,168,74,0.04)" strokeWidth="20"/>
    {/* 成長グラフ（右下） */}
    <path d="M 220 200 L 240 185 L 260 188 L 280 170 L 300 155" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.6"/>
    <path d="M 220 200 L 240 185 L 260 188 L 280 170 L 300 155 L 300 200 Z" fill="url(#og1)" opacity="0.4"/>
  </svg>
);

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        let start = 0;
        const step = target / (1400 / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

export default function Page() {
  const router = useRouter();
  const gold = '#c8a84a';
  const cyan = '#6dbed6';
  const bg = '#000';
  const bg2 = '#05050e';
  const bg3 = '#08081a';
  const bg4 = '#020208';
  const border = 'rgba(255,255,255,0.06)';
  const borderGold = 'rgba(200,168,74,0.15)';
  const muted = '#4a4a60';

  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleDiagnose = () => {
    if (!url.trim()) { router.push('/lp/new'); return; }
    try { new URL(url.startsWith('http') ? url : 'https://' + url); }
    catch { setUrlError('正しいURLを入力してください'); return; }
    setUrlError('');
    const normalizedUrl = url.startsWith('http') ? url : 'https://' + url;
    router.push('/lp/diagnose?url=' + encodeURIComponent(normalizedUrl));
  };

  return (
    <div style={{ fontFamily: 'Noto Sans JP, sans-serif', background: bg, color: '#dde4f0', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@400;700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .fixed-cta{position:fixed;bottom:0;left:0;right:0;z-index:9999;padding:10px 16px 22px;background:linear-gradient(to top,rgba(0,0,0,0.99) 50%,transparent);pointer-events:none;}
        .fixed-cta a{pointer-events:all;display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#c8a84a,#e8d070,#c8a84a);background-size:200% 100%;color:#000;font-weight:900;font-size:0.92rem;padding:15px 24px;border-radius:8px;text-decoration:none;box-shadow:0 0 24px rgba(200,168,74,0.25),0 4px 12px rgba(0,0,0,0.4);animation:bounce 3s ease-in-out infinite;max-width:480px;margin:0 auto;width:100%;}
        .section{padding:72px 20px;}
        .inner{max-width:520px;margin:0 auto;}
        .inner-w{max-width:860px;margin:0 auto;}
        .sec-label{font-size:0.58rem;letter-spacing:0.4em;color:#c8a84a;font-weight:700;margin-bottom:12px;text-transform:uppercase;display:block;}
        .sec-title{font-size:clamp(1.5rem,3.2vw,2.2rem);font-weight:900;color:#fff;line-height:1.28;margin-bottom:12px;letter-spacing:-0.025em;}
        .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.08),transparent);}
        .inp{width:100%;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:15px 17px;color:#e8e8f0;font-size:16px;font-family:inherit;outline:none;transition:border-color 0.25s,box-shadow 0.25s;}
        .inp:focus{border-color:rgba(200,168,74,0.4);box-shadow:0 0 0 3px rgba(200,168,74,0.06);}
        .inp::placeholder{color:#1a1a2a;}
        .plan-card{background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:26px 22px;transition:border-color 0.25s,transform 0.25s;}
        .plan-card:hover{border-color:rgba(200,168,74,0.15);transform:translateY(-2px);}
        .plan-card.featured{border:1.5px solid #6dbed6;background:rgba(109,190,214,0.02);}
        .faq-item{background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.05);border-radius:11px;overflow:hidden;cursor:pointer;margin-bottom:8px;transition:border-color 0.2s;}
        .faq-item:hover{border-color:rgba(200,168,74,0.15);}
        .faq-q{padding:17px 20px;font-size:0.87rem;font-weight:700;color:#e0e8f0;display:flex;justify-content:space-between;align-items:center;gap:12px;}
        .faq-a{padding:0 20px 17px 20px;font-size:0.82rem;color:#3a3a50;line-height:1.88;}
        .stat-card{padding:22px 14px;text-align:center;border-right:1px solid rgba(200,168,74,0.07);}
        .stat-card:last-child{border-right:none;}
        @media(max-width:768px){
          .section{padding:52px 16px;}
          .plans-grid{grid-template-columns:1fr !important;}
          .stats-grid{grid-template-columns:repeat(2,1fr) !important;}
          .features-grid{grid-template-columns:1fr !important;}
          .journey-grid{grid-template-columns:1fr !important;}
          .hero-inner{grid-template-columns:1fr !important;}
          .hero-illus{display:none !important;}
        }
      `}</style>

      {/* 固定CTA */}
      <div className="fixed-cta">
        <a href={CONTACT_URL}>
          <IconMail />
          無料相談・お問い合わせ
        </a>
      </div>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '100svh', background: bg, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {/* メッシュ背景 */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,168,74,0.014) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,74,0.014) 1px,transparent 1px)`, backgroundSize: '56px 56px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '140%', height: '60%', background: 'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(109,190,214,0.055) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(ellipse,rgba(200,168,74,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 900, margin: '0 auto', padding: '100px 20px 80px' }}>
          <div className="hero-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            {/* テキスト */}
            <div style={{ animation: 'fadeUp 0.6s ease forwards' }}>
              <div style={{ marginBottom: 28 }}>
                <Image src="/logo.png" alt="NEXTGAME株式会社" width={152} height={38} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.58rem', letterSpacing: '0.35em', color: gold, border: `1px solid rgba(200,168,74,0.2)`, padding: '5px 14px', borderRadius: 2, marginBottom: 22, background: 'rgba(200,168,74,0.04)' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: gold, animation: 'pulse 2s ease-in-out infinite' }} />
                AI × WEB SUBSCRIPTION
              </div>
              <h1 style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: 16, letterSpacing: '-0.03em' }}>
                サイトは運用で<br />
                <span style={{ background: 'linear-gradient(135deg,#c8a84a,#e8d070)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>成長する。</span>
              </h1>
              <p style={{ fontSize: '0.92rem', color: '#3a3a50', lineHeight: 1.9, marginBottom: 6 }}>制作費0円だから、継続できる。</p>
              <p style={{ fontSize: '0.88rem', color: muted, lineHeight: 1.9, marginBottom: 32 }}>AIが診断し、プロが運用。集客を仕組み化します。</p>

              <div style={{ background: `rgba(5,5,14,0.9)`, border: `1px solid ${borderGold}`, borderRadius: 14, padding: '20px 18px', marginBottom: 12, backdropFilter: 'blur(10px)' }}>
                <label style={{ display: 'block', fontSize: '0.62rem', color: gold, letterSpacing: '0.14em', fontWeight: 700, marginBottom: 9 }}>サイトURLを入力して無料診断</label>
                <input className="inp" type="url" placeholder="https://your-site.com" value={url} onChange={e => { setUrl(e.target.value); setUrlError(''); }} onKeyDown={e => e.key === 'Enter' && handleDiagnose()} style={{ marginBottom: 9 }} />
                {urlError && <p style={{ fontSize: '0.78rem', color: gold, marginBottom: 7, opacity: 0.8 }}>{urlError}</p>}
                <button onClick={handleDiagnose} style={{ width: '100%', padding: '15px', background: `linear-gradient(135deg,${gold},#e8d070)`, border: 'none', borderRadius: 8, color: '#000', fontSize: '0.93rem', fontWeight: 900, cursor: 'pointer', marginBottom: 8, boxShadow: `0 4px 20px rgba(200,168,74,0.2)` }}>
                  AIで無料診断する →
                </button>
                <button onClick={() => router.push('/lp/new')} style={{ width: '100%', padding: '11px', background: 'transparent', border: `1px solid rgba(255,255,255,0.06)`, borderRadius: 8, color: muted, fontSize: '0.81rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  サイトなし → 直接LP生成へ
                </button>
              </div>
              <p style={{ fontSize: '0.62rem', color: '#18182a' }}>完全無料　登録不要　30秒で完了</p>
            </div>

            {/* イラスト */}
            <div className="hero-illus" style={{ animation: 'fadeUp 0.8s ease 0.15s both' }}>
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ STATS ═══ */}
      <section style={{ padding: '0 20px', background: bg2 }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeIn>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: `1px solid ${borderGold}`, borderRadius: 14, overflow: 'hidden' }}>
              {[
                { target: 14, suffix: '+', label: '対応業種' },
                { target: 3, suffix: '日', label: '最短納期' },
                { target: 0, suffix: '円', label: '初期費用' },
                { target: 100, suffix: '%', label: '営業電話なし' },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <div style={{ fontFamily: 'Inter, monospace', fontSize: 'clamp(1.3rem,2.8vw,2rem)', fontWeight: 900, background: `linear-gradient(135deg,${gold},#e8d070)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: 6 }}>
                    <CountUp target={s.target} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.58rem', color: muted, letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="section" style={{ background: bg3 }}>
        <div className="inner-w">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="sec-label">HOW IT WORKS</span>
              <h2 className="sec-title">診断から運用まで、<br /><span style={{ color: cyan }}>3ステップで仕組み化</span></h2>
            </div>
          </FadeIn>
          <div className="journey-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              { step: '01', title: 'AI診断', desc: 'URLを入力するだけ。30秒で課題を可視化し、改善プロンプトを自動生成します。', color: gold, Illus: DiagnoseIllustration },
              { step: '02', title: 'LP自動生成', desc: '業種・強みを選ぶだけで本格LPが完成。デザインも内容もAIが最適化します。', color: cyan, Illus: HeroIllustration },
              { step: '03', title: 'サブスク運用', desc: '毎月改善・更新・レポート。運用し続けるから集客が継続的に成長します。', color: '#10b981', Illus: OperationIllustration },
            ].map((j, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div style={{ background: 'rgba(255,255,255,0.015)', border: `1px solid rgba(255,255,255,0.06)`, borderRadius: 16, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 20, height: '100%', position: 'relative', overflow: 'hidden' }}>
                  {/* ステップ番号（大きく薄く） */}
                  <div style={{ position: 'absolute', top: -10, right: 16, fontFamily: 'Inter, monospace', fontSize: '5rem', fontWeight: 900, color: `${j.color}06`, lineHeight: 1, userSelect: 'none' }}>{j.step}</div>
                  {/* イラスト */}
                  <div style={{ opacity: 0.85 }}>
                    <j.Illus />
                  </div>
                  {/* テキスト */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ fontSize: '0.58rem', color: j.color, fontWeight: 700, letterSpacing: '0.2em', background: `${j.color}10`, border: `1px solid ${j.color}25`, padding: '3px 10px', borderRadius: 100 }}>STEP {j.step}</div>
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fff', marginBottom: 8 }}>{j.title}</div>
                    <div style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.82 }}>{j.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ SAMPLE ═══ */}
      <section className="section" style={{ background: bg2, paddingLeft: 0, paddingRight: 0 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', paddingLeft: 20, paddingRight: 20 }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="sec-label">SAMPLE</span>
              <h2 className="sec-title">実際に<span style={{ color: cyan }}>生成されたLP</span></h2>
              <p style={{ fontSize: '0.84rem', color: muted, lineHeight: 1.85 }}>あなたの業種も30秒で本格LPが完成します</p>
            </div>
          </FadeIn>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory', paddingLeft: 20, paddingBottom: 12 }}>
          <div style={{ display: 'flex', gap: 12, width: 'max-content', paddingRight: 20 }}>
            {SAMPLES.map((s, i) => (
              <div key={i} style={{ width: 228, flexShrink: 0, scrollSnapAlign: 'start', background: bg3, border: `1px solid ${s.accent}18`, borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{ position: 'relative', height: 138, overflow: 'hidden' }}>
                  <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom,transparent 25%,rgba(0,0,0,0.6))` }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 20, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
                    {[0,1,2].map(j => <div key={j} style={{ width: 5, height: 5, borderRadius: '50%', background: '#2a2a40' }} />)}
                    <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 5, marginLeft: 5 }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: 8, left: 10 }}>
                    <span style={{ fontSize: '0.58rem', color: '#fff', background: s.accent, padding: '2px 9px', borderRadius: 100, fontWeight: 700 }}>{s.label}</span>
                  </div>
                </div>
                <div style={{ padding: '14px 14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ fontSize: '0.82rem', fontWeight: 900, color: '#e8e8f8', lineHeight: 1.42 }}>{s.catch}</p>
                  <a href={'/lp/' + s.slug} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '8px 12px', background: `${s.accent}18`, border: `1px solid ${s.accent}30`, borderRadius: 7, color: s.accent, fontSize: '0.74rem', fontWeight: 700, textDecoration: 'none', marginTop: 'auto', transition: 'background 0.2s' }}>
                    フルページで見る <IconArrow />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8, paddingLeft: 20, paddingRight: 20 }}>
          <p style={{ fontSize: '0.6rem', color: '#14142a', letterSpacing: '0.05em' }}>← スワイプして見る →</p>
        </div>
        <FadeIn>
          <div style={{ textAlign: 'center', marginTop: 24, paddingLeft: 20, paddingRight: 20 }}>
            <button onClick={() => router.push('/lp/new')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', background: `linear-gradient(135deg,${gold},#e8d070)`, border: 'none', borderRadius: 100, color: '#000', fontSize: '0.9rem', fontWeight: 900, cursor: 'pointer', boxShadow: `0 4px 20px rgba(200,168,74,0.2)` }}>
              無料でLP生成を試す <IconArrow />
            </button>
          </div>
        </FadeIn>
      </section>

      <div className="divider" />

      {/* ═══ PRICING ═══ */}
      <section className="section" style={{ background: bg3 }} id="pricing">
        <div className="inner-w">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="sec-label">PRICING</span>
              <h2 className="sec-title">シンプルな<span style={{ color: cyan }}>サブスクプラン</span></h2>
              <p style={{ fontSize: '0.84rem', color: muted, lineHeight: 1.85 }}>初期費用0円・制作費0円・最低3ヶ月・以降月単位で解約自由</p>
            </div>
          </FadeIn>
          <div className="plans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {PLANS.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`plan-card${plan.featured ? ' featured' : ''}`} style={{ position: 'relative' }}>
                  {plan.badge && (
                    <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: plan.featured ? cyan : `rgba(109,190,214,0.1)`, color: plan.featured ? '#000' : cyan, fontSize: '0.58rem', fontWeight: 700, padding: '3px 12px', borderRadius: 2, whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>{plan.badge}</div>
                  )}
                  <p style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: gold, marginBottom: 8, fontWeight: 700 }}>{plan.name}</p>
                  <div style={{ marginBottom: 2 }}>
                    <span style={{ fontFamily: 'Inter, monospace', fontSize: '1.75rem', fontWeight: 900, color: '#fff' }}>¥{plan.price}</span>
                    <span style={{ fontSize: '0.66rem', color: muted }}>/月</span>
                  </div>
                  <p style={{ fontSize: '0.63rem', color: '#22222e', marginBottom: 4 }}>税込 ¥{plan.tax}/月</p>
                  <p style={{ fontSize: '0.72rem', color: cyan, marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid rgba(255,255,255,0.05)` }}>{plan.target}</p>
                  <div style={{ marginBottom: 20 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.79rem', color: '#404055', lineHeight: 1.65, marginBottom: 8 }}>
                        <span style={{ color: gold, flexShrink: 0, marginTop: 3 }}><IconCheck /></span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <a href={CONTACT_URL} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', background: 'transparent', border: `1px solid ${borderGold}`, borderRadius: 9, color: gold, fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s' }}>
                    相談する
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.66rem', color: '#18182a', marginTop: 18 }}>月3社限定　表示価格は税抜</p>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ REVIEWS ═══ */}
      <section className="section" style={{ background: bg2 }} id="reviews">
        <div className="inner">
          <FadeIn>
            <span className="sec-label">REVIEWS</span>
            <h2 className="sec-title">お客様の<span style={{ color: cyan }}>声</span></h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {REVIEWS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: bg3, border: `1px solid ${border}`, borderRadius: 14, padding: '20px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: r.star }).map((_, j) => <span key={j} style={{ color: gold }}><IconStar /></span>)}
                    </div>
                    <span style={{ fontSize: '0.64rem', fontWeight: 900, color: gold, background: 'rgba(200,168,74,0.07)', border: `1px solid ${borderGold}`, padding: '3px 10px', borderRadius: 100 }}>{r.result}</span>
                  </div>
                  <p style={{ fontSize: '0.87rem', color: '#dde4f0', lineHeight: 1.85, marginBottom: 14 }}>{r.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: `1px solid rgba(255,255,255,0.04)` }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg,${gold},#e8d070)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, color: '#000', flexShrink: 0 }}>{r.initial}</div>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e0e8f0' }}>{r.name}</div>
                      <div style={{ fontSize: '0.67rem', color: muted }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ MESSAGE ═══ */}
      <section className="section" style={{ background: bg3, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,168,74,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,74,0.01) 1px,transparent 1px)`, backgroundSize: '56px 56px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80%', height: '80%', background: 'radial-gradient(ellipse,rgba(200,168,74,0.025) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div className="inner" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <span className="sec-label">MESSAGE</span>
            <h2 className="sec-title" style={{ marginBottom: 24 }}>今が、<span style={{ background: 'linear-gradient(135deg,#c8a84a,#e8d070)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>変わるチャンスです。</span></h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: 'rgba(200,168,74,0.03)', border: `1px solid ${borderGold}`, borderRadius: 16, padding: '28px 24px', marginBottom: 16 }}>
              <p style={{ fontSize: '0.93rem', color: '#dde4f0', lineHeight: 2.1, marginBottom: 18 }}>
                制作費に悩んで、いつまでも古いサイトを使い続けますか？<br />
                それとも、<span style={{ color: gold, fontWeight: 700 }}>今週中に新しいサイトを持ち</span>、来月から新しい客層を呼び込みますか？
              </p>
              <p style={{ fontSize: '0.87rem', color: muted, lineHeight: 1.9 }}>
                30分のヒアリングは無料です。あなたのビジネスに合う戦略を、一緒に考えましょう。
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div style={{ background: 'rgba(200,168,74,0.035)', border: `1px solid rgba(200,168,74,0.2)`, borderRadius: 12, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(200,168,74,0.1)', border: `1px solid rgba(200,168,74,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8a84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: gold, marginBottom: 4 }}>30日以内なら返金対応</p>
                <p style={{ fontSize: '0.76rem', color: muted, lineHeight: 1.65 }}>ご納得いただけない場合は全額返金。リスクゼロで始められます。</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ FAQ ═══ */}
      <section className="section" style={{ background: bg2 }} id="faq">
        <div className="inner">
          <FadeIn>
            <span className="sec-label">FAQ</span>
            <h2 className="sec-title">よくある<span style={{ color: cyan }}>質問</span></h2>
          </FadeIn>
          <div>
            {FAQ.map((f, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="faq-q">
                    <span><span style={{ color: gold, marginRight: 9, fontWeight: 900, fontFamily: 'Inter, monospace', fontSize: '0.76rem' }}>Q</span>{f.q}</span>
                    <span style={{ color: gold, flexShrink: 0 }}><IconChevron open={openFaq === i} /></span>
                  </div>
                  {openFaq === i && <div className="faq-a">{f.a}</div>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ CLOSING ═══ */}
      <section className="section" style={{ background: bg4, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(200,168,74,0.009) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,74,0.009) 1px,transparent 1px)`, backgroundSize: '56px 56px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -160, left: '50%', transform: 'translateX(-50%)', width: 700, height: 420, background: 'radial-gradient(ellipse,rgba(200,168,74,0.045) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'radial-gradient(ellipse,rgba(109,190,214,0.025) 0%,transparent 65%)', pointerEvents: 'none' }} />

        <div className="inner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <FadeIn>
            <div style={{ marginBottom: 20 }}>
              <Image src="/logo.png" alt="NEXTGAME株式会社" width={120} height={30} style={{ objectFit: 'contain', opacity: 0.7 }} />
            </div>
            <span className="sec-label">CONTACT</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4.2vw,2.6rem)', fontWeight: 900, lineHeight: 1.18, color: '#fff', marginBottom: 10, letterSpacing: '-0.025em' }}>
              相談0円。<br />
              <span style={{ background: 'linear-gradient(135deg,#c8a84a,#e8d070)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>成果で証明する。</span>
            </h2>
            <p style={{ fontSize: '0.87rem', color: '#303045', lineHeight: 1.9, marginBottom: 10 }}>
              しつこい営業は一切しません。<br />まずあなたのサイトの課題を聞かせてください。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 28, flexWrap: 'wrap' }}>
              {['相談・見積もり完全無料', '最短3日で公開', '解約はいつでも'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: '#383850' }}>
                  <span style={{ color: gold }}><IconCheck /></span>
                  {t}
                </div>
              ))}
            </div>
            <a href={CONTACT_URL} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '17px 40px', background: `linear-gradient(135deg,${gold},#e8d070)`, borderRadius: 100, color: '#000', fontSize: '0.96rem', fontWeight: 900, textDecoration: 'none', boxShadow: `0 0 40px rgba(200,168,74,0.2),0 8px 24px rgba(0,0,0,0.4)`, marginBottom: 24 }}>
              <IconMail />
              無料相談・お問い合わせ
            </a>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 30 }}>
              {[{ val: '0円', label: '初期費用' }, { val: '3日', label: '最短納品' }, { val: '月3社', label: '限定受付' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Inter, monospace', fontSize: '1.25rem', fontWeight: 900, background: `linear-gradient(135deg,${gold},#e8d070)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: '0.57rem', color: '#22222e', marginTop: 5, letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: '24px 20px', background: bg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Image src="/logo.png" alt="NEXTGAME株式会社" width={96} height={24} style={{ objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/privacy" style={{ fontSize: '0.65rem', color: '#14142a', textDecoration: 'none' }}>Privacy Policy</a>
          <span style={{ fontSize: '0.65rem', color: '#14142a' }}>© 2026 NEXTGAME株式会社</span>
        </div>
      </footer>
    </div>
  );
}
