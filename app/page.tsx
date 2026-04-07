import FadeIn from '@/app/_components/FadeIn';
import ContactForm from '@/app/_components/ContactForm';

export const revalidate = 0;

const PROBLEMS = [
  { icon: '💸', text: 'ホームページに高額を払ったのに集客・問い合わせがゼロに近い' },
  { icon: '🔒', text: '制作会社に頼むと高くて遅い。修正のたびに追加費用が発生する' },
  { icon: '📉', text: '作ったまま放置。古い情報が掲載され続けているが更新方法がわからない' },
  { icon: '😤', text: 'SEO・SNS運用をやりたいが何から始めればいいか全くわからない' },
  { icon: '🎵', text: 'ブランドに合ったBGM・楽曲がなく、世界観や雰囲気が伝わらない' },
];

const STRENGTHS = [
  {
    num: '01',
    title: '圧倒的なコストパフォーマンス',
    body: 'AIを最大限に活用することで、従来の制作会社の1/3〜1/5のコストを実現。品質は一切妥協しません。',
    accent: '費用を抑えて成果を最大化',
  },
  {
    num: '02',
    title: '業界最短クラスの納期',
    body: 'ランディングページなら最短3日で納品。ビジネスチャンスを逃さないスピード感でお応えします。',
    accent: 'LP最短3日〜',
  },
  {
    num: '03',
    title: '作って終わりにしない運用',
    body: '公開後の更新・SEO改善・アクセス解析・SNS連携まで一括サポート。毎月進化するWebサイトを提供します。',
    accent: '公開後も伴走します',
  },
];

const SERVICES = [
  {
    icon: '🖥️',
    title: 'Web制作',
    sub: 'ランディングページ・コーポレートサイト',
    items: ['LP（ランディングページ）', 'コーポレートサイト', 'ECサイト・予約サイト', 'サイトリニューアル・改善'],
    cta: '制作を相談する',
  },
  {
    icon: '📈',
    title: 'Web運用',
    sub: 'SEO・MEO・SNS運用代行',
    items: ['SEO対策・コンテンツ改善', 'MEO対策（Googleマップ）', 'SNS運用代行', 'アクセス解析・月次レポート'],
    cta: '運用を相談する',
  },
  {
    icon: '🎵',
    title: '楽曲制作',
    sub: 'ブランドサウンド・BGM制作',
    items: ['店舗BGM・環境音楽', 'CM・動画用楽曲', 'ブランドジングル', 'ポッドキャスト用音楽'],
    cta: '楽曲を相談する',
  },
  {
    icon: '🤖',
    title: 'AI導入支援',
    sub: '業務効率化・AI活用コンサル',
    items: ['業務効率化のAI提案', 'AIツール選定・設定', 'プロンプト設計・研修', 'ChatGPT・Claude活用支援'],
    cta: 'AI活用を相談する',
  },
];

const RESULTS = [
  { category: '飲食店 / MEO＋LP改善', kpi: '予約数 2.3倍', period: '施策開始から3ヶ月で達成' },
  { category: 'コーポレートサイト / SEO改善', kpi: '問い合わせ 4倍', period: 'CV導線最適化＋記事SEOで半年' },
  { category: '個人事業主 / LP制作＋SNS', kpi: '新規顧客 月+8件', period: 'LP公開から2ヶ月で安定化' },
];

const PRICING = [
  {
    name: 'ライトプラン',
    price: '15万円〜',
    desc: 'LP・1ページサイト',
    items: ['デザイン・コーディング一式', 'スマホ完全対応', 'お問い合わせフォーム', '公開サポート・修正2回'],
    highlight: false,
    note: '',
  },
  {
    name: 'スタンダードプラン',
    price: '30万円〜',
    desc: 'コーポレートサイト（5〜10P）',
    items: ['全ページ制作・CMS導入', 'SEO初期設定', 'Google Analytics設定', '公開後1ヶ月サポート付き'],
    highlight: true,
    note: '最も人気',
  },
  {
    name: '運用プラン',
    price: '3万円〜/月',
    desc: '継続改善・運用サポート',
    items: ['月次アクセスレポート', 'コンテンツ更新代行', 'SEO継続改善', '優先対応・チャットサポート'],
    highlight: false,
    note: '',
  },
];

const FLOW = [
  { step: '01', title: 'お問い合わせ', body: 'フォームまたはSNSからお気軽に' },
  { step: '02', title: 'ヒアリング', body: 'オンライン30分〜。課題をお聞きします' },
  { step: '03', title: 'ご提案・見積もり', body: '最適なプランを無料でご提案' },
  { step: '04', title: '制作・実装', body: '進捗をリアルタイムで共有します' },
  { step: '05', title: '納品・運用開始', body: '公開後もしっかり伴走します' },
];

const VOICES = [
  { text: '短期間で想像以上のクオリティのサイトが完成しました。問い合わせも増えて本当に助かっています。', from: '飲食店オーナー様' },
  { text: 'コストを大幅に抑えながら、大手制作会社と遜色ないデザインで驚きました。', from: '個人事業主様' },
  { text: '対応が早く、細かい修正にも柔軟に応えてもらえました。次回もお願いします。', from: '美容サロン様' },
];

export default function Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap');

        .ng-btn-primary {
          display: inline-block;
          background: linear-gradient(135deg, #6dbed6 0%, #3a9ab8 100%);
          color: #060e1c !important;
          font-weight: 900;
          font-size: 1rem;
          padding: 16px 40px;
          border-radius: 4px;
          text-decoration: none;
          letter-spacing: 0.04em;
          cursor: pointer;
          border: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 0 28px rgba(109,190,214,0.4);
        }
        .ng-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 48px rgba(109,190,214,0.7);
        }
        .ng-btn-outline {
          display: inline-block;
          background: transparent;
          color: #6dbed6;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 14px 36px;
          border-radius: 4px;
          border: 1.5px solid #6dbed6;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .ng-btn-outline:hover { background: #6dbed6; color: #060e1c; }
        .ng-card {
          background: rgba(109,190,214,0.04);
          border: 1px solid rgba(109,190,214,0.13);
          border-radius: 12px;
          transition: border-color 0.25s, transform 0.25s, background 0.25s;
        }
        .ng-card:hover {
          border-color: rgba(109,190,214,0.45);
          background: rgba(109,190,214,0.08);
          transform: translateY(-5px);
        }
        .ng-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .ng-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
        .ng-grid-5 { display: grid; grid-template-columns: repeat(5,1fr); gap: 12px; }
        @keyframes ng-pulse { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
        @keyframes ng-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
        .ng-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.2rem, 9vw, 6.5rem);
          line-height: 1.0;
          letter-spacing: 0.04em;
          background: linear-gradient(135deg, #ffffff 0%, #6dbed6 40%, #3a9ab8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ng-section-label {
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          color: #6dbed6;
          margin-bottom: 12px;
          display: block;
        }
        .ng-section-title {
          font-size: clamp(1.7rem, 3.8vw, 2.5rem);
          font-weight: 900;
          line-height: 1.3;
          color: #ffffff;
        }
        .ng-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(to right, #6dbed6, transparent);
          margin: 20px auto 0;
        }
        @media (max-width: 768px) {
          .ng-grid-3 { grid-template-columns: 1fr; }
          .ng-grid-2 { grid-template-columns: 1fr; }
          .ng-grid-5 { grid-template-columns: repeat(2,1fr); }
          .ng-hide-sp { display: none !important; }
        }
        @media (max-width: 480px) {
          .ng-grid-5 { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '100px 24px 80px', background: '#060e1c' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(109,190,214,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(109,190,214,0.035) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ position: 'absolute', top: '15%', left: '8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(109,190,214,0.1) 0%,transparent 68%)', animation: 'ng-pulse 5s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '8%', right: '4%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(109,190,214,0.07) 0%,transparent 68%)', animation: 'ng-pulse 7s ease-in-out infinite 3s' }} />
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 920, width: '100%' }}>
          <FadeIn>
            <span style={{ display: 'inline-block', background: 'rgba(109,190,214,0.1)', border: '1px solid rgba(109,190,214,0.28)', borderRadius: 100, padding: '7px 22px', marginBottom: 36, fontSize: '0.78rem', letterSpacing: '0.18em', color: '#6dbed6' }}>
              AI × WEB制作 × 楽曲制作
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="ng-hero-title">低コスト×最短納期で</h1>
            <h1 className="ng-hero-title" style={{ marginBottom: 28 }}>&ldquo;売れる&rdquo;サイトを。</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.15rem)', color: '#9ac4d4', lineHeight: 1.9, marginBottom: 48, maxWidth: 580, margin: '0 auto 48px' }}>
              中小企業・個人事業主向けに、AIを活用した<br />
              高品質なWeb制作・運用・楽曲制作を提供します。
            </p>
          </FadeIn>
          <FadeIn delay={0.28}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
              <a href="#contact" className="ng-btn-primary" style={{ fontSize: '1.05rem', padding: '18px 48px' }}>無料で相談する →</a>
              <a href="#services" className="ng-btn-outline">サービスを見る</a>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(109,190,214,0.6)' }}>✓ 相談・見積もり完全無料　✓ 最短翌日ご提案　✓ しつこい営業なし</p>
          </FadeIn>
        </div>
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'ng-float 2.5s ease-in-out infinite' }}>
          <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, #6dbed6, transparent)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', color: 'rgba(109,190,214,0.5)' }}>SCROLL</span>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section id="problems" style={{ padding: '100px 24px', background: 'linear-gradient(180deg,#060e1c 0%,#091422 100%)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="ng-section-label">PROBLEMS</span>
              <h2 className="ng-section-title">こんなお悩み、<br />ありませんか？</h2>
              <div className="ng-divider" />
            </div>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PROBLEMS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="ng-card" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '22px 28px' }}>
                  <span style={{ fontSize: '1.7rem', flexShrink: 0 }}>{p.icon}</span>
                  <p style={{ color: '#c0dce8', fontSize: '0.98rem', lineHeight: 1.6 }}>{p.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section id="solution" style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden', background: '#091422' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(109,190,214,0.07) 0%, transparent 65%)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="ng-section-label">SOLUTION</span>
              <h2 className="ng-section-title">その課題、<br /><span style={{ color: '#6dbed6' }}>AIで解決できます。</span></h2>
              <div className="ng-divider" />
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div style={{ background: 'linear-gradient(135deg,rgba(109,190,214,0.09),rgba(109,190,214,0.03))', border: '1px solid rgba(109,190,214,0.22)', borderRadius: 16, padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(1rem,2vw,1.12rem)', color: '#c0dce8', lineHeight: 2.1 }}>
                NEXTGAMEはAIツールを最大活用することで、<br />
                <strong style={{ color: '#ffffff' }}>高品質・低コスト・短納期</strong>を同時に実現します。<br /><br />
                「作るだけ」で終わらず、<strong style={{ color: '#6dbed6' }}>集客・運用・改善まで</strong>一括サポート。<br />
                ホームページを「費用」から<strong style={{ color: '#ffffff' }}>「売上を生む投資」</strong>へと変えます。
              </p>
              <div style={{ marginTop: 40 }}>
                <a href="#contact" className="ng-btn-primary">まずは無料相談 →</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STRENGTHS ── */}
      <section id="strengths" style={{ padding: '100px 24px', background: '#060e1c' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="ng-section-label">WHY NEXTGAME</span>
              <h2 className="ng-section-title">選ばれる3つの理由</h2>
              <div className="ng-divider" />
            </div>
          </FadeIn>
          <div className="ng-grid-3">
            {STRENGTHS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="ng-card" style={{ padding: '44px 32px', height: '100%' }}>
                  <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '3.2rem', color: 'rgba(109,190,214,0.22)', lineHeight: 1, marginBottom: 8 }}>{s.num}</p>
                  <div style={{ display: 'inline-block', background: 'rgba(109,190,214,0.12)', borderRadius: 100, padding: '4px 14px', fontSize: '0.75rem', color: '#6dbed6', marginBottom: 16, letterSpacing: '0.05em' }}>{s.accent}</div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', marginBottom: 16, lineHeight: 1.4 }}>{s.title}</h3>
                  <p style={{ color: '#8ab8cc', lineHeight: 1.85, fontSize: '0.93rem' }}>{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: '100px 24px', background: '#091422' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="ng-section-label">SERVICES</span>
              <h2 className="ng-section-title">提供サービス</h2>
              <div className="ng-divider" />
            </div>
          </FadeIn>
          <div className="ng-grid-2">
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="ng-card" style={{ padding: '40px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                    <span style={{ fontSize: '2rem' }}>{s.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.2 }}>{s.title}</h3>
                      <p style={{ fontSize: '0.78rem', color: '#6dbed6', marginTop: 2 }}>{s.sub}</p>
                    </div>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 24px' }}>
                    {s.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#9abccc', fontSize: '0.92rem' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#6dbed6', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="ng-btn-outline" style={{ fontSize: '0.85rem', padding: '10px 24px' }}>{s.cta} →</a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section id="results" style={{ padding: '100px 24px', background: '#060e1c' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="ng-section-label">RESULTS</span>
              <h2 className="ng-section-title">制作実績・改善事例</h2>
              <div className="ng-divider" />
            </div>
          </FadeIn>
          <div className="ng-grid-3" style={{ marginBottom: 28 }}>
            {RESULTS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: 'linear-gradient(135deg,rgba(109,190,214,0.1),rgba(109,190,214,0.03))', border: '1px solid rgba(109,190,214,0.22)', borderRadius: 12, padding: '40px 28px', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.75rem', color: '#6dbed6', letterSpacing: '0.1em', marginBottom: 16 }}>{r.category}</p>
                  <p style={{ fontSize: 'clamp(1.5rem,2.8vw,2rem)', fontWeight: 900, color: '#ffffff', marginBottom: 12, lineHeight: 1.2 }}>{r.kpi}</p>
                  <p style={{ fontSize: '0.82rem', color: '#8ab8cc' }}>{r.period}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'rgba(109,190,214,0.45)' }}>※ 実績は順次更新予定です。詳細はお問い合わせください。</p>
          </FadeIn>
        </div>
      </section>

      {/* ── VOICES ── */}
      <section style={{ padding: '100px 24px', background: '#091422' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="ng-section-label">VOICES</span>
              <h2 className="ng-section-title">お客様の声</h2>
              <div className="ng-divider" />
            </div>
          </FadeIn>
          <div className="ng-grid-3">
            {VOICES.map((v, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="ng-card" style={{ padding: '36px 28px', position: 'relative' }}>
                  <p style={{ fontSize: '2.5rem', color: 'rgba(109,190,214,0.25)', lineHeight: 1, marginBottom: 16, fontFamily: 'Georgia,serif' }}>&ldquo;</p>
                  <p style={{ color: '#c0dce8', lineHeight: 1.85, fontSize: '0.93rem', marginBottom: 20 }}>{v.text}</p>
                  <p style={{ fontSize: '0.78rem', color: '#6dbed6' }}>— {v.from}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '100px 24px', background: '#060e1c' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="ng-section-label">PRICING</span>
              <h2 className="ng-section-title">明確な料金体系</h2>
              <p style={{ color: '#8ab8cc', marginTop: 12, fontSize: '0.92rem' }}>ご予算・ご要望に応じて柔軟にご対応します</p>
              <div className="ng-divider" />
            </div>
          </FadeIn>
          <div className="ng-grid-3" style={{ alignItems: 'start' }}>
            {PRICING.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  background: p.highlight ? 'linear-gradient(135deg,rgba(109,190,214,0.14),rgba(109,190,214,0.05))' : 'rgba(109,190,214,0.04)',
                  border: p.highlight ? '1.5px solid #6dbed6' : '1px solid rgba(109,190,214,0.14)',
                  borderRadius: 12,
                  padding: '44px 28px',
                  position: 'relative',
                }}>
                  {p.note && (
                    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#6dbed6', color: '#060e1c', fontSize: '0.72rem', fontWeight: 900, padding: '4px 18px', borderRadius: 100, whiteSpace: 'nowrap' }}>
                      {p.note}
                    </div>
                  )}
                  <p style={{ fontSize: '0.8rem', color: '#6dbed6', marginBottom: 6, letterSpacing: '0.06em' }}>{p.name}</p>
                  <p style={{ fontSize: 'clamp(1.6rem,2.8vw,2rem)', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>{p.price}</p>
                  <p style={{ fontSize: '0.83rem', color: '#8ab8cc', marginBottom: 28 }}>{p.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                    {p.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#c0dce8', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        <span style={{ color: '#6dbed6', fontWeight: 900, flexShrink: 0 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={p.highlight ? 'ng-btn-primary' : 'ng-btn-outline'} style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '0.88rem', padding: '13px 20px' }}>
                    相談する →
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOW ── */}
      <section style={{ padding: '100px 24px', background: '#091422' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="ng-section-label">FLOW</span>
              <h2 className="ng-section-title">ご依頼の流れ</h2>
              <div className="ng-divider" />
            </div>
          </FadeIn>
          <div className="ng-grid-5">
            {FLOW.map((f, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  {i < FLOW.length - 1 && (
                    <div className="ng-hide-sp" style={{ position: 'absolute', top: 27, left: '58%', right: '-42%', height: 1, background: 'linear-gradient(to right,rgba(109,190,214,0.6),rgba(109,190,214,0.1))' }} />
                  )}
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(109,190,214,0.08)', border: '1.5px solid rgba(109,190,214,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.05rem', color: '#6dbed6', letterSpacing: '0.05em' }}>
                    {f.step}
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>{f.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#6dbed6', lineHeight: 1.6, opacity: 0.8 }}>{f.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '90px 24px', background: 'linear-gradient(135deg,rgba(109,190,214,0.11) 0%,rgba(109,190,214,0.03) 100%)', borderTop: '1px solid rgba(109,190,214,0.14)', borderBottom: '1px solid rgba(109,190,214,0.14)' }}>
        <FadeIn>
          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 900, lineHeight: 1.45, marginBottom: 16, color: '#ffffff' }}>
              まずは<span style={{ color: '#6dbed6' }}>無料相談</span>から。<br />
              <span style={{ fontSize: '0.7em', color: '#8ab8cc', fontWeight: 400 }}>「何から始めればいいかわからない」でも大丈夫です。</span>
            </h2>
            <p style={{ color: '#8ab8cc', marginBottom: 40, fontSize: '0.95rem', lineHeight: 1.8 }}>
              24時間以内にご返信いたします。<br />しつこい営業は一切行いません。
            </p>
            <a href="#contact" className="ng-btn-primary" style={{ fontSize: '1.1rem', padding: '20px 56px' }}>無料で相談する →</a>
          </div>
        </FadeIn>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '100px 24px', background: '#060e1c' }}>
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="ng-section-label">CONTACT</span>
              <h2 className="ng-section-title">お問い合わせ</h2>
              <p style={{ color: '#8ab8cc', marginTop: 12, fontSize: '0.92rem' }}>相談・見積もり完全無料</p>
              <div className="ng-divider" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
