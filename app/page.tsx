‘use client’;

import { useEffect, useRef, useState } from ‘react’;

const LINE_URL = ‘https://lin.ee/SJDJXQv’;

const FAQ = [
{ q: ‘相談は本当に無料ですか？’, a: ‘完全無料です。費用が発生するのはご契約後のみ。相談・見積もりは何度でも無料でお応えします。’ },
{ q: ‘営業電話はかかってきますか？’, a: ‘かかってきません。LINEでのやり取りのみ。しつこい連絡は一切しません。’ },
{ q: ‘制作期間はどれくらいですか？’, a: ‘LPなら最短3日、コーポレートサイトは2〜3週間が目安です。’ },
{ q: ‘予算が少ないのですが大丈夫ですか？’, a: ‘10万円台から対応可能です。まずご予算をLINEで教えてください。最適なプランをご提案します。’ },
{ q: ‘制作後のサポートはありますか？’, a: ‘あります。運用・更新・SEO改善まで月額でサポートするプランをご用意しています。’ },
{ q: ‘どんな業種でも対応できますか？’, a: ‘飲食・美容・士業・EC・建設など幅広く対応実績があります。まずご相談ください。’ },
];

const PROBLEMS = [
{ num: ‘01’, text: ‘HPに100万払ったのに\n問い合わせがゼロ’ },
{ num: ‘02’, text: ‘更新のたびに\n制作会社に追加費用’ },
{ num: ‘03’, text: ‘SEO対策を頼んだら\n半年経っても順位変わらず’ },
{ num: ‘04’, text: ‘SNS運用を外注したら\n月20万で成果なし’ },
];

const COMPARE = [
{ item: ‘制作費用’, other: ‘50〜200万円’, ng: ‘10万円〜’ },
{ item: ‘納期’, other: ‘1〜3ヶ月’, ng: ‘最短3日’ },
{ item: ‘修正対応’, other: ‘有料・遅い’, ng: ‘無料・即対応’ },
{ item: ‘運用サポート’, other: ‘別途契約’, ng: ‘込みプランあり’ },
{ item: ‘担当者’, other: ‘営業→下請け’, ng: ‘直接対応’ },
{ item: ‘相談方法’, other: ‘電話・メール’, ng: ‘LINE即レス’ },
];

const SERVICES = [
{ icon: ‘🖥️’, name: ‘LP制作’, price: ‘10万円〜’, desc: ‘最短3日。CVに特化した設計’ },
{ icon: ‘🏢’, name: ‘HP制作’, price: ‘20万円〜’, desc: ‘CMS込み。自分で更新可能’ },
{ icon: ‘🔍’, name: ‘SEO対策’, price: ‘3万円〜/月’, desc: ‘検索上位を狙う継続支援’ },
{ icon: ‘📍’, name: ‘MEO対策’, price: ‘2万円〜/月’, desc: ‘Googleマップ上位表示’ },
{ icon: ‘📱’, name: ‘SNS運用’, price: ‘3万円〜/月’, desc: ‘Instagram・X投稿代行’ },
{ icon: ‘⚙️’, name: ‘Web運用代行’, price: ‘2万円〜/月’, desc: ‘更新・分析・改善まで一括’ },
];

const RESULTS = [
{ cat: ‘飲食店’, result: ‘予約2.3倍’, period: ‘3ヶ月’, tag: ‘MEO＋LP改善’ },
{ cat: ‘美容サロン’, result: ‘問い合わせ4倍’, period: ‘2ヶ月’, tag: ‘SEO＋HP改善’ },
{ cat: ‘個人事業主’, result: ‘新規8件/月増’, period: ‘2ヶ月’, tag: ‘LP制作’ },
{ cat: ‘整骨院’, result: ‘来院数1.8倍’, period: ‘4ヶ月’, tag: ‘MEO対策’ },
];

const FLOW = [
{ step: ‘01’, title: ‘LINEで相談’, body: ‘30秒で完了。無料’ },
{ step: ‘02’, title: ‘ヒアリング’, body: ‘LINE上で完結’ },
{ step: ‘03’, title: ‘無料提案’, body: ‘最短翌日’ },
{ step: ‘04’, title: ‘制作開始’, body: ‘最短3日で納品’ },
{ step: ‘05’, title: ‘運用開始’, body: ‘公開後も伴走’ },
];

const PRICING = [
{ name: ‘LP制作’, price: ‘10万円〜’, featured: false, badge: ‘’ },
{ name: ‘ホームページ制作’, price: ‘20万円〜’, featured: true, badge: ‘人気No.1’ },
{ name: ‘SEO・MEO対策’, price: ‘2万円〜/月’, featured: false, badge: ‘’ },
{ name: ‘Web運用代行’, price: ‘2万円〜/月’, featured: false, badge: ‘’ },
];

const MERITS = [
‘無料ヒアリング（30分）’,
‘競合サイト調査レポート’,
‘SEOキーワード提案’,
‘御社に最適な制作プラン提案’,
‘LINE上で何でも質問OK’,
];

const TRUST = [
{ icon: ‘🔒’, text: ‘営業電話\nなし’ },
{ icon: ‘💬’, text: ‘LINEで\n気軽に相談’ },
{ icon: ‘🆓’, text: ‘相談・見積もり\n完全無料’ },
{ icon: ‘⚡’, text: ‘最短翌日\nご提案’ },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
const ref = useRef<HTMLDivElement>(null);
const [inView, setInView] = useState(false);
useEffect(() => {
const el = ref.current;
if (!el) return;
const obs = new IntersectionObserver(
([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
{ threshold: 0.1 }
);
obs.observe(el);
return () => obs.disconnect();
}, []);
return (
<div ref={ref} style={{
opacity: inView ? 1 : 0,
transform: inView ? ‘translateY(0)’ : ‘translateY(28px)’,
transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
}}>
{children}
</div>
);
}

function LineIcon() {
return (
<svg width="22" height="22" viewBox="0 0 24 24" fill="white">
<path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z" />
</svg>
);
}

export default function Page() {
const s = {
orange: ‘#FF6B2B’,
green: ‘#06C755’,
dark: ‘#0D0D0D’,
dark2: ‘#141414’,
dark3: ‘#1A1A1A’,
text: ‘#F0F0F0’,
muted: ‘#888888’,
};

const btnLine: React.CSSProperties = {
display: ‘flex’, alignItems: ‘center’, justifyContent: ‘center’,
gap: 10, background: s.green, color: ‘#fff’, fontWeight: 900,
fontSize: ‘1rem’, padding: ‘18px 32px’, borderRadius: 100,
textDecoration: ‘none’, boxShadow: ‘0 4px 24px rgba(6,199,85,0.4)’,
letterSpacing: ‘0.03em’, width: ‘100%’, maxWidth: 400, margin: ‘0 auto’,
};

const btnOrange: React.CSSProperties = {
display: ‘flex’, alignItems: ‘center’, justifyContent: ‘center’,
gap: 8, background: s.orange, color: ‘#fff’, fontWeight: 900,
fontSize: ‘1rem’, padding: ‘18px 32px’, borderRadius: 100,
textDecoration: ‘none’, boxShadow: ‘0 4px 24px rgba(255,107,43,0.4)’,
letterSpacing: ‘0.03em’, width: ‘100%’, maxWidth: 400, margin: ‘0 auto’,
};

const sec = (bg: string): React.CSSProperties => ({ padding: ‘72px 20px’, background: bg });
const inn: React.CSSProperties = { maxWidth: 600, margin: ‘0 auto’ };
const innW: React.CSSProperties = { maxWidth: 800, margin: ‘0 auto’ };
const lbl: React.CSSProperties = { display: ‘inline-block’, fontSize: ‘0.7rem’, letterSpacing: ‘0.2em’, color: s.orange, background: ‘rgba(255,107,43,0.1)’, border: ‘1px solid rgba(255,107,43,0.3)’, borderRadius: 100, padding: ‘5px 14px’, marginBottom: 20 };
const ttl: React.CSSProperties = { fontSize: ‘clamp(1.5rem,5vw,2rem)’, fontWeight: 900, lineHeight: 1.4, color: ‘#fff’, marginBottom: 12 };
const dvd: React.CSSProperties = { width: 40, height: 3, background: s.orange, margin: ‘16px 0 32px’, borderRadius: 2 };
const crd: React.CSSProperties = { background: ‘rgba(255,255,255,0.03)’, border: ‘1px solid rgba(255,255,255,0.08)’, borderRadius: 12, padding: ‘20px 16px’ };

return (
<div style={{ fontFamily: ‘Noto Sans JP, Hiragino Kaku Gothic ProN, sans-serif’, background: s.dark, color: s.text, overflowX: ‘hidden’ }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@400;500;700;900&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} html{scroll-behavior:smooth;} .lpfixed{position:fixed;bottom:0;left:0;right:0;z-index:9999;padding:12px 16px 20px;background:linear-gradient(to top,#0D0D0D 60%,transparent);pointer-events:none;} .lpfixed a{pointer-events:all;display:flex;align-items:center;justify-content:center;gap:10px;background:#06C755;color:#fff;font-weight:900;font-size:1.05rem;padding:18px 24px;border-radius:100px;text-decoration:none;box-shadow:0 4px 32px rgba(6,199,85,0.5);animation:lpbounce 2.5s ease-in-out infinite;max-width:480px;margin:0 auto;width:100%;letter-spacing:0.03em;} @keyframes lpbounce{0%,100%{transform:translateY(0);box-shadow:0 4px 32px rgba(6,199,85,0.5);}50%{transform:translateY(-3px);box-shadow:0 8px 40px rgba(6,199,85,0.7);}} .lpcmp{width:100%;border-collapse:collapse;margin-bottom:40px;} .lpcmp th{padding:12px 10px;font-size:0.8rem;font-weight:700;letter-spacing:0.05em;} .lpcmp th:first-child{text-align:left;color:#888;} .lpcmp th:nth-child(2){color:#888;background:rgba(255,255,255,0.03);} .lpcmp th:nth-child(3){color:#fff;background:rgba(255,107,43,0.15);border-radius:8px 8px 0 0;} .lpcmp td{padding:14px 10px;font-size:0.85rem;border-top:1px solid rgba(255,255,255,0.08);} .lpcmp td:first-child{color:#888;font-size:0.8rem;} .lpcmp td:nth-child(2){color:#666;text-align:center;background:rgba(255,255,255,0.02);} .lpcmp td:nth-child(3){color:#FF6B2B;font-weight:700;text-align:center;background:rgba(255,107,43,0.06);} .lpsg{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:40px;} .lprg{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:40px;} .lptg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:32px;} @media(min-width:600px){.lpsg{grid-template-columns:repeat(3,1fr);}.lprg{grid-template-columns:repeat(4,1fr);}.lptg{grid-template-columns:repeat(4,1fr);}}`}</style>

```
  <div className="lpfixed">
    <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
      <LineIcon />
      30秒で無料相談する →
    </a>
  </div>

  {/* HERO */}
  <section style={{ position: 'relative', background: s.dark, padding: '80px 20px 100px', overflow: 'hidden', textAlign: 'center' }}>
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,107,43,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,43,0.04) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle,rgba(255,107,43,0.12) 0%,transparent 65%)', pointerEvents: 'none' }} />
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto' }}>
      <FadeIn>
        <div style={{ display: 'inline-block', background: 'rgba(255,107,43,0.15)', border: '1px solid rgba(255,107,43,0.4)', color: s.orange, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', padding: '6px 16px', borderRadius: 100, marginBottom: 24 }}>
          毎月5社限定・先着順
        </div>
        <h1 style={{ fontSize: 'clamp(1.9rem,7vw,3rem)', fontWeight: 900, lineHeight: 1.3, color: '#fff', marginBottom: 8 }}>
          ホームページ制作、<br />
          <span style={{ color: s.orange }}>3分の1の費用</span>で<br />
          問い合わせを3倍に。
        </h1>
        <p style={{ fontSize: 'clamp(0.85rem,3vw,1rem)', color: s.muted, lineHeight: 1.8, marginBottom: 32 }}>
          AIを活用した次世代のWeb制作会社。<br />
          中小企業・個人事業主・店舗オーナー専門。
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          {['最短3日で納品', '費用10万円〜', '営業一切なし', 'LINE即レス'].map((b, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '8px 14px', fontSize: '0.78rem', color: '#fff' }}>{b}</div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div style={{ background: 'linear-gradient(135deg,rgba(255,107,43,0.15),rgba(255,107,43,0.05))', border: '1px solid rgba(255,107,43,0.3)', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: '0.72rem', color: s.orange, letterSpacing: '0.15em', marginBottom: 8 }}>今月の受付枠</div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', color: '#fff', lineHeight: 1, marginBottom: 4 }}>残2社</div>
          <div style={{ fontSize: '0.82rem', color: s.muted }}>枠が埋まり次第、受付終了</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={btnLine}><LineIcon />30秒で無料相談する →</a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={btnOrange}>費用を無料で見積もる →</a>
        </div>
        <p style={{ fontSize: '0.75rem', color: s.muted, marginTop: 14 }}>
          <span style={{ color: s.orange, fontWeight: 700 }}>✓ 完全無料</span>　
          <span style={{ color: s.orange, fontWeight: 700 }}>✓ しつこい営業なし</span>　
          <span style={{ color: s.orange, fontWeight: 700 }}>✓ 相談だけでもOK</span>
        </p>
      </FadeIn>
    </div>
  </section>

  {/* 悩み */}
  <section style={sec(s.dark2)}>
    <div style={inn}>
      <FadeIn><div style={lbl}>PROBLEMS</div><h2 style={ttl}>こんな悩み、<span style={{ color: s.orange }}>ありませんか？</span></h2><div style={dvd} /></FadeIn>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        {PROBLEMS.map((p, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, ...crd }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: 'rgba(255,107,43,0.4)', flexShrink: 0 }}>{p.num}</div>
              <div style={{ fontSize: '0.92rem', color: s.text, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{p.text}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>その悩み、<span style={{ color: s.orange }}>全部解決できます。</span></p>
          <p style={{ fontSize: '0.82rem', color: s.muted, marginBottom: 24 }}>まずLINEで相談してみてください。</p>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={btnLine}><LineIcon />LINEで今すぐ聞く →</a>
        </div>
      </FadeIn>
    </div>
  </section>

  {/* 解決策 */}
  <section style={sec(s.dark3)}>
    <div style={inn}>
      <FadeIn>
        <div style={lbl}>SOLUTION</div>
        <h2 style={ttl}>AIで、<span style={{ color: s.orange }}>常識を壊す。</span></h2>
        <div style={dvd} />
        <div style={{ background: 'rgba(255,107,43,0.06)', border: '1px solid rgba(255,107,43,0.2)', borderRadius: 16, padding: 28 }}>
          <p style={{ fontSize: '0.95rem', color: s.text, lineHeight: 2 }}>
            従来の制作会社は<strong style={{ color: '#fff' }}>「高い・遅い・使えない」</strong>が当たり前。<br /><br />
            NEXTGAMEはAIを最大活用することで、<br />
            <strong style={{ color: s.orange }}>費用を3分の1以下</strong>に圧縮。<br />
            <strong style={{ color: s.orange }}>納期を10分の1</strong>に短縮。<br />
            <strong style={{ color: s.orange }}>品質は大手以上</strong>を実現します。
          </p>
        </div>
      </FadeIn>
    </div>
  </section>

  {/* 比較 */}
  <section style={sec(s.dark2)}>
    <div style={inn}>
      <FadeIn><div style={lbl}>COMPARISON</div><h2 style={ttl}>他社と<span style={{ color: s.orange }}>比べてください。</span></h2><div style={dvd} /></FadeIn>
      <FadeIn delay={0.1}>
        <table className="lpcmp">
          <thead><tr><th></th><th>一般制作会社</th><th>NEXTGAME</th></tr></thead>
          <tbody>{COMPARE.map((c, i) => <tr key={i}><td>{c.item}</td><td>❌ {c.other}</td><td>✅ {c.ng}</td></tr>)}</tbody>
        </table>
      </FadeIn>
      <FadeIn delay={0.2}><div style={{ textAlign: 'center' }}><a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={btnOrange}>集客の悩みを相談する →</a></div></FadeIn>
    </div>
  </section>

  {/* サービス */}
  <section style={sec(s.dark)}>
    <div style={innW}>
      <FadeIn><div style={{ textAlign: 'center' }}><div style={lbl}>SERVICES</div><h2 style={{ ...ttl, textAlign: 'center' }}>サービス一覧</h2><div style={{ ...dvd, margin: '16px auto 32px' }} /></div></FadeIn>
      <div className="lpsg">
        {SERVICES.map((sv, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div style={crd}>
              <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>{sv.icon}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{sv.name}</div>
              <div style={{ fontSize: '0.78rem', color: s.orange, fontWeight: 700, marginBottom: 6 }}>{sv.price}</div>
              <div style={{ fontSize: '0.75rem', color: s.muted, lineHeight: 1.5 }}>{sv.desc}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}><div style={{ textAlign: 'center' }}><a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={btnLine}><LineIcon />まずは話を聞く →</a></div></FadeIn>
    </div>
  </section>

  {/* 実績 */}
  <section style={sec(s.dark2)}>
    <div style={innW}>
      <FadeIn><div style={{ textAlign: 'center' }}><div style={lbl}>RESULTS</div><h2 style={{ ...ttl, textAlign: 'center' }}><span style={{ color: s.orange }}>数字</span>で証明します。</h2><div style={{ ...dvd, margin: '16px auto 32px' }} /></div></FadeIn>
      <div className="lprg">
        {RESULTS.map((r, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{ background: 'linear-gradient(135deg,rgba(255,107,43,0.1),rgba(255,107,43,0.03))', border: '1px solid rgba(255,107,43,0.2)', borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: s.orange, marginBottom: 8 }}>{r.cat}</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', color: '#fff', lineHeight: 1, marginBottom: 4 }}>{r.result}</div>
              <div style={{ fontSize: '0.72rem', color: s.muted, marginBottom: 4 }}>{r.period}で達成</div>
              <div style={{ display: 'inline-block', fontSize: '0.68rem', color: s.orange, background: 'rgba(255,107,43,0.1)', padding: '2px 8px', borderRadius: 100 }}>{r.tag}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}><div style={{ textAlign: 'center' }}><a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={btnOrange}>最短で集客を始める →</a></div></FadeIn>
    </div>
  </section>

  {/* 料金 */}
  <section style={sec(s.dark)}>
    <div style={inn}>
      <FadeIn><div style={lbl}>PRICING</div><h2 style={ttl}>明確な<span style={{ color: s.orange }}>料金体系。</span></h2><p style={{ fontSize: '0.9rem', color: s.muted, lineHeight: 1.7, marginBottom: 40 }}>追加費用なし。見積もり無料。</p></FadeIn>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        {PRICING.map((p, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: p.featured ? 'rgba(255,107,43,0.06)' : 'rgba(255,255,255,0.03)', border: p.featured ? '1px solid #FF6B2B' : '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '18px 20px', gap: 12 }}>
              <div>
                {p.badge && <div style={{ fontSize: '0.65rem', background: s.orange, color: '#fff', padding: '2px 8px', borderRadius: 100, display: 'inline-block', marginBottom: 4 }}>{p.badge}</div>}
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{p.name}</div>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: s.orange, whiteSpace: 'nowrap' }}>{p.price}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}><div style={{ textAlign: 'center' }}><a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={btnLine}><LineIcon />費用を無料で見積もる →</a></div></FadeIn>
    </div>
  </section>

  {/* 流れ */}
  <section style={sec(s.dark2)}>
    <div style={inn}>
      <FadeIn><div style={lbl}>FLOW</div><h2 style={ttl}>相談から<span style={{ color: s.orange }}>最短3日</span>で公開。</h2><div style={dvd} /></FadeIn>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 40 }}>
        {FLOW.map((f, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, paddingBottom: i < FLOW.length - 1 ? 24 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,107,43,0.15)', border: '1.5px solid #FF6B2B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', color: s.orange }}>{f.step}</div>
                {i < FLOW.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 24, background: 'linear-gradient(to bottom,rgba(255,107,43,0.4),rgba(255,107,43,0.05))', marginTop: 4 }} />}
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: '0.8rem', color: s.muted }}>{f.body}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.4}><div style={{ textAlign: 'center' }}><a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={btnOrange}>プロに聞く →</a></div></FadeIn>
    </div>
  </section>

  {/* FAQ */}
  <section style={sec(s.dark)}>
    <div style={inn}>
      <FadeIn><div style={lbl}>FAQ</div><h2 style={ttl}>よくある<span style={{ color: s.orange }}>質問。</span></h2><div style={dvd} /></FadeIn>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        {FAQ.map((f, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '18px 20px', fontSize: '0.88rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ color: s.orange, fontWeight: 900, flexShrink: 0 }}>Q</span>{f.q}
              </div>
              <div style={{ padding: '0 20px 18px 44px', fontSize: '0.83rem', color: s.muted, lineHeight: 1.75 }}>{f.a}</div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.4}><div style={{ textAlign: 'center' }}><a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={btnLine}><LineIcon />LINEで相談してみる →</a></div></FadeIn>
    </div>
  </section>

  {/* クロージング */}
  <section style={{ background: 'linear-gradient(135deg,#1A0A00,#0D0D0D)', padding: '72px 20px 140px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, background: 'radial-gradient(circle,rgba(255,107,43,0.1) 0%,transparent 65%)', pointerEvents: 'none' }} />
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto' }}>
      <FadeIn>
        <div style={lbl}>LINE登録の特典</div>
        <div style={{ background: 'linear-gradient(135deg,rgba(6,199,85,0.1),rgba(6,199,85,0.03))', border: '1px solid rgba(6,199,85,0.25)', borderRadius: 16, padding: 28, marginBottom: 28, textAlign: 'left' }}>
          <div style={{ fontSize: '0.78rem', color: '#06C755', letterSpacing: '0.1em', marginBottom: 16, fontWeight: 700 }}>LINE追加で全部無料</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MERITS.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: s.text }}>
                <span style={{ color: '#06C755', fontWeight: 900, flexShrink: 0 }}>✓</span>{m}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="lptg">
          {TRUST.map((t, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontSize: '0.78rem', color: '#ccc', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{t.text}</div>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div style={{ background: 'linear-gradient(135deg,rgba(255,107,43,0.15),rgba(255,107,43,0.05))', border: '1px solid rgba(255,107,43,0.3)', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: '0.72rem', color: s.orange, letterSpacing: '0.15em', marginBottom: 8 }}>今月の受付枠 残り</div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', color: '#fff', lineHeight: 1, marginBottom: 4 }}>2社</div>
          <div style={{ fontSize: '0.82rem', color: s.muted }}>枠が埋まり次第、受付終了します</div>
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <h2 style={{ fontSize: 'clamp(1.4rem,5vw,1.9rem)', fontWeight: 900, color: '#fff', lineHeight: 1.45, marginBottom: 12 }}>
          「とりあえず聞いてみる」<br />それだけで<span style={{ color: s.orange }}>OKです。</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: s.muted, marginBottom: 36, lineHeight: 1.7 }}>
          30秒でLINE追加完了。<br />しつこい連絡は一切しません。<br />まず相談だけでもOK。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{ ...btnLine, fontSize: '1.1rem', padding: '20px 32px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z" /></svg>
            30秒で無料相談する →
          </a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={btnOrange}>今すぐチェック →</a>
          <p style={{ fontSize: '0.75rem', color: s.muted, marginTop: 4 }}>✓ 完全無料　✓ 営業なし　✓ 相談だけでもOK</p>
        </div>
      </FadeIn>
    </div>
  </section>
</div>
```

);
}