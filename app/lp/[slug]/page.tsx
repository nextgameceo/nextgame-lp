import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllSites, getSiteBySlug } from "@/app/_libs/microcms";

export async function generateStaticParams() {
  try {
    const data = await getAllSites();
    return data.contents.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);
  if (!site) return {};
  return {
    title: site.title,
    description: site.sub_title,
    openGraph: {
      title: site.title,
      description: site.sub_title,
      images: site.main_visual ? [site.main_visual.url] : [],
    },
  };
}

// ── テーマ定義 ──────────────────────────────────────────────
type ThemeKey = "light" | "dark";
type AccentKey = "blue" | "green" | "orange" | "red" | "purple";

const ACCENT: Record<AccentKey, { primary: string; secondary: string; glow: string; rgb: string }> = {
  blue:   { primary: "#3b82f6", secondary: "#6366f1", glow: "rgba(59,130,246,0.25)",  rgb: "59,130,246" },
  green:  { primary: "#10b981", secondary: "#06b6d4", glow: "rgba(16,185,129,0.25)",  rgb: "16,185,129" },
  orange: { primary: "#f97316", secondary: "#eab308", glow: "rgba(249,115,22,0.25)",  rgb: "249,115,22" },
  red:    { primary: "#ef4444", secondary: "#ec4899", glow: "rgba(239,68,68,0.25)",   rgb: "239,68,68" },
  purple: { primary: "#8b5cf6", secondary: "#3b82f6", glow: "rgba(139,92,246,0.25)", rgb: "139,92,246" },
};

const THEME: Record<ThemeKey, {
  bg: string; bg2: string; bg3: string;
  text: string; muted: string; border: string; card: string;
}> = {
  light: {
    bg: "#ffffff", bg2: "#f8fafc", bg3: "#f1f5f9",
    text: "#0f172a", muted: "#64748b", border: "rgba(0,0,0,0.08)", card: "#ffffff",
  },
  dark: {
    bg: "#0a0a0f", bg2: "#111118", bg3: "#18181f",
    text: "#f1f5f9", muted: "#94a3b8", border: "rgba(255,255,255,0.08)", card: "#18181f",
  },
};

export default async function LpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);
  if (!site) notFound();

  // AI生成コンテンツをパース
  let ai: {
    theme: ThemeKey;
    accent_color: AccentKey;
    original: string;
    features: { icon: string; title: string; desc: string }[];
    services: { name: string; desc: string }[];
    reasons: { num: string; title: string; desc: string }[];
    cta_text: string;
    cta_sub: string;
  } | null = null;

  try {
    ai = JSON.parse(site.content);
  } catch {
    ai = null;
  }

  const themeKey: ThemeKey = ai?.theme ?? "light";
  const accentKey: AccentKey = ai?.accent_color ?? "blue";
  const t = THEME[themeKey];
  const a = ACCENT[accentKey];

  const isDark = themeKey === "dark";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@400;700;900&display=swap');

        :root {
          --bg: ${t.bg}; --bg2: ${t.bg2}; --bg3: ${t.bg3};
          --text: ${t.text}; --muted: ${t.muted};
          --border: ${t.border}; --card: ${t.card};
          --primary: ${a.primary}; --secondary: ${a.secondary};
          --glow: ${a.glow}; --rgb: ${a.rgb};
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Noto Sans JP', 'Inter', sans-serif;
          overflow-x: hidden;
        }

        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }

        /* ── ナビ ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2rem; height: 60px;
          background: ${isDark ? 'rgba(10,10,15,0.92)' : 'rgba(255,255,255,0.92)'};
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-title { font-size: 0.95rem; font-weight: 700; color: var(--text); }
        .nav-credit { font-size: 0.6rem; color: ${isDark ? '#2d3748' : '#cbd5e1'}; letter-spacing: 0.08em; }

        /* ── ヒーロー ── */
        .hero {
          min-height: 100vh;
          padding: 100px 2rem 60px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          position: relative; overflow: hidden;
          background: var(--bg);
        }
        .hero-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 65% 50% at 50% 40%, rgba(var(--rgb),0.12) 0%, transparent 70%);
        }
        ${isDark ? `
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);
          background-size: 50px 50px;
        }` : `
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px);
          background-size: 50px 50px;
        }`}
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--primary);
          background: rgba(var(--rgb),0.08);
          border: 1px solid rgba(var(--rgb),0.25);
          padding: 5px 14px; border-radius: 100px;
          margin-bottom: 1.5rem;
        }
        .hero-badge::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--primary); animation: blink 1.5s ease-in-out infinite;
        }
        .hero-title {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 900; line-height: 1.15;
          color: var(--text);
          margin-bottom: 1rem;
        }
        .hero-title span {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--muted); font-weight: 300;
          max-width: 520px; line-height: 1.8;
          margin-bottom: 2rem;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 36px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border: none; border-radius: 100px;
          color: #fff; font-size: 0.95rem; font-weight: 700;
          cursor: pointer; text-decoration: none;
          box-shadow: 0 8px 24px rgba(var(--rgb),0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(var(--rgb),0.45); }

        /* ── セクション共通 ── */
        .section { padding: 80px 2rem; }
        .section-inner { max-width: 900px; margin: 0 auto; }
        .section-label {
          font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--primary); margin-bottom: 8px; font-weight: 700;
        }
        .section-title {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 900; color: var(--text);
          margin-bottom: 12px; line-height: 1.3;
        }
        .section-title span { color: var(--primary); }
        .section-sub { font-size: 0.95rem; color: var(--muted); margin-bottom: 48px; line-height: 1.7; }
        .divider { height: 1px; background: var(--border); }

        /* ── 特徴カード ── */
        .features-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .feature-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 28px 24px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(var(--rgb),0.15); }
        .feature-icon { font-size: 2rem; margin-bottom: 14px; }
        .feature-title { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .feature-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }

        /* ── サービス ── */
        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .service-card {
          background: linear-gradient(135deg, rgba(var(--rgb),0.08), rgba(var(--rgb),0.03));
          border: 1px solid rgba(var(--rgb),0.2);
          border-radius: 12px; padding: 24px 20px;
        }
        .service-num {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em;
          color: var(--primary); margin-bottom: 10px;
        }
        .service-name { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .service-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.65; }

        /* ── 選ばれる理由 ── */
        .reasons-list { display: flex; flex-direction: column; gap: 16px; }
        .reason-item {
          display: flex; gap: 20px; align-items: flex-start;
          background: var(--card); border: 1px solid var(--border);
          border-radius: 12px; padding: 24px;
        }
        .reason-num {
          font-size: 1.8rem; font-weight: 900;
          color: rgba(var(--rgb),0.25); flex-shrink: 0;
          line-height: 1; font-family: 'Inter', sans-serif;
        }
        .reason-title { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 6px; }
        .reason-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }

        /* ── CTA ── */
        .cta-section {
          padding: 80px 2rem;
          background: linear-gradient(135deg, rgba(var(--rgb),0.1), rgba(var(--rgb),0.03));
          text-align: center;
        }
        .cta-title { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 900; color: var(--text); margin-bottom: 12px; }
        .cta-sub { font-size: 0.9rem; color: var(--muted); margin-bottom: 32px; }

        /* ── フッター ── */
        footer {
          padding: 32px 2rem; text-align: center;
          border-top: 1px solid var(--border);
        }
        .footer-name { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .footer-copy { font-size: 0.78rem; color: var(--muted); margin-bottom: 6px; }
        .footer-credit { font-size: 0.62rem; color: ${isDark ? '#2d3748' : '#e2e8f0'}; letter-spacing: 0.08em; }

        /* ── ビジュアル ── */
        .visual-wrap {
          position: relative; width: min(700px, 92vw); aspect-ratio: 16/9;
          margin: 3rem auto 0; border-radius: 16px; overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 24px 64px rgba(var(--rgb),0.15);
        }

        @media(max-width: 768px) {
          .features-grid { grid-template-columns: 1fr; }
          .services-grid { grid-template-columns: 1fr; }
          .reason-item { flex-direction: column; gap: 8px; }
          nav { padding: 0 1rem; }
        }
        @media(min-width: 481px) and (max-width: 768px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ── ナビ ── */}
      <nav>
        <span className="nav-title">{site.title}</span>
        <span className="nav-credit">Powered by NEXTGAME</span>
      </nav>

      {/* ── ヒーロー ── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-badge fade-up">OFFICIAL SITE</div>
          <h1 className="hero-title fade-up delay-1">
            <span>{site.title}</span>
          </h1>
          <p className="hero-sub fade-up delay-2">{site.sub_title}</p>
          <div className="fade-up delay-3">
            <a href="#cta" className="btn-primary">
              {ai?.cta_text ?? 'お問い合わせ'} →
            </a>
          </div>

          {site.main_visual && (
            <div className="visual-wrap fade-up delay-3">
              <Image
                src={site.main_visual.url}
                alt={site.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}
        </div>
      </section>

      <div className="divider" />

      {/* ── 特徴セクション ── */}
      {ai?.features && ai.features.length > 0 && (
        <section className="section" style={{ background: 'var(--bg2)' }}>
          <div className="section-inner">
            <p className="section-label">FEATURES</p>
            <h2 className="section-title">選ばれる<span>3つの特徴</span></h2>
            <p className="section-sub">{site.title}が多くのお客様に選ばれる理由</p>
            <div className="features-grid">
              {ai.features.map((f, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      {/* ── サービスセクション ── */}
      {ai?.services && ai.services.length > 0 && (
        <section className="section" style={{ background: 'var(--bg)' }}>
          <div className="section-inner">
            <p className="section-label">SERVICES</p>
            <h2 className="section-title">サービス<span>内容</span></h2>
            <p className="section-sub">お客様のニーズに合わせた幅広いサービスをご提供します</p>
            <div className="services-grid">
              {ai.services.map((s, i) => (
                <div key={i} className="service-card">
                  <div className="service-num">SERVICE {String(i + 1).padStart(2, '0')}</div>
                  <div className="service-name">{s.name}</div>
                  <div className="service-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      {/* ── 選ばれる理由 ── */}
      {ai?.reasons && ai.reasons.length > 0 && (
        <section className="section" style={{ background: 'var(--bg3)' }}>
          <div className="section-inner">
            <p className="section-label">WHY US</p>
            <h2 className="section-title"><span>選ばれる理由</span></h2>
            <p className="section-sub">お客様から信頼をいただける3つの理由</p>
            <div className="reasons-list">
              {ai.reasons.map((r, i) => (
                <div key={i} className="reason-item">
                  <div className="reason-num">{r.num}</div>
                  <div>
                    <div className="reason-title">{r.title}</div>
                    <div className="reason-desc">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      {/* ── CTA ── */}
      <section className="cta-section" id="cta">
        <h2 className="cta-title">{ai?.cta_text ?? 'お問い合わせ'}</h2>
        <p className="cta-sub">{ai?.cta_sub ?? 'お気軽にご相談ください'}</p>
        <a href="mailto:" className="btn-primary">
          {ai?.cta_text ?? 'お問い合わせ'} →
        </a>
      </section>

      {/* ── フッター ── */}
      <footer>
        <p className="footer-name">{site.title}</p>
        <p className="footer-copy">© {new Date().getFullYear()} {site.title} All rights reserved.</p>
        <p className="footer-credit">Powered by NEXTGAME</p>
      </footer>
    </>
  );
}
