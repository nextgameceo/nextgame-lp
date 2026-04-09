import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSites, getSiteBySlug } from "@/app/_libs/microcms";

export const dynamicParams = true;


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
    openGraph: { title: site.title, description: site.sub_title },
  };
}

type ThemeKey = "light" | "dark";
type AccentKey = "blue" | "green" | "orange" | "red" | "purple";

const ACCENT: Record<AccentKey, { primary: string; secondary: string; rgb: string }> = {
  blue:   { primary: "#3b82f6", secondary: "#6366f1", rgb: "59,130,246" },
  green:  { primary: "#10b981", secondary: "#06b6d4", rgb: "16,185,129" },
  orange: { primary: "#f97316", secondary: "#eab308", rgb: "249,115,22" },
  red:    { primary: "#ef4444", secondary: "#ec4899", rgb: "239,68,68"  },
  purple: { primary: "#8b5cf6", secondary: "#3b82f6", rgb: "139,92,246" },
};

const THEME: Record<ThemeKey, {
  bg: string; bg2: string; bg3: string;
  text: string; muted: string; border: string; card: string; navBg: string;
}> = {
  light: {
    bg: "#ffffff", bg2: "#f8fafc", bg3: "#f1f5f9",
    text: "#0f172a", muted: "#64748b", border: "rgba(0,0,0,0.08)",
    card: "#ffffff", navBg: "rgba(255,255,255,0.92)",
  },
  dark: {
    bg: "#0a0a0f", bg2: "#111118", bg3: "#18181f",
    text: "#f1f5f9", muted: "#94a3b8", border: "rgba(255,255,255,0.08)",
    card: "#18181f", navBg: "rgba(10,10,15,0.92)",
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

  let ai: {
    theme: ThemeKey;
    accent_color: AccentKey;
    original: string;
    image_url?: string;
    features: { icon: string; title: string; desc: string }[];
    services: { name: string; desc: string }[];
    reasons: { num: string; title: string; desc: string }[];
    cta_text: string;
    cta_sub: string;
  } | null = null;

  try { ai = JSON.parse(site.content); } catch { ai = null; }

  const themeKey: ThemeKey = ai?.theme ?? "light";
  const accentKey: AccentKey = ai?.accent_color ?? "blue";
  const t = THEME[themeKey];
  const a = ACCENT[accentKey];
  const isDark = themeKey === "dark";
  const imageUrl = ai?.image_url ?? site.main_visual?.url ?? "";

  const overlayGradient =
    accentKey === 'green'  ? 'linear-gradient(to right, rgba(255,255,255,0.97) 45%, rgba(255,255,255,0.6) 100%)' :
    accentKey === 'blue'   ? 'linear-gradient(to right, rgba(240,249,255,0.97) 45%, rgba(240,249,255,0.6) 100%)' :
    accentKey === 'orange' ? 'linear-gradient(to right, rgba(255,247,237,0.97) 45%, rgba(255,247,237,0.6) 100%)' :
    accentKey === 'red'    ? 'linear-gradient(to right, rgba(255,241,242,0.97) 45%, rgba(255,241,242,0.6) 100%)' :
                             'linear-gradient(to right, rgba(245,243,255,0.97) 45%, rgba(245,243,255,0.6) 100%)';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@400;700;900&display=swap');
        :root {
          --bg:${t.bg};--bg2:${t.bg2};--bg3:${t.bg3};
          --text:${t.text};--muted:${t.muted};
          --border:${t.border};--card:${t.card};
          --primary:${a.primary};--secondary:${a.secondary};--rgb:${a.rgb};
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:var(--bg);color:var(--text);font-family:'Noto Sans JP','Inter',sans-serif;overflow-x:hidden;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.8s ease forwards;}
        .delay-1{animation-delay:0.1s;opacity:0;}
        .delay-2{animation-delay:0.25s;opacity:0;}
        .delay-3{animation-delay:0.4s;opacity:0;}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:60px;background:${t.navBg};backdrop-filter:blur(16px);border-bottom:1px solid var(--border);}
        .nav-title{font-size:0.95rem;font-weight:700;color:var(--text);}
        .nav-credit{font-size:0.6rem;color:${isDark ? '#2d3748' : '#cbd5e1'};letter-spacing:0.08em;}
        .hero{min-height:100vh;padding-top:60px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;}
        .hero-light{background:var(--bg2);}
        .hero-light .hero-img{position:absolute;inset:0;z-index:0;}
        .hero-light .hero-img img{object-fit:cover;width:100%;height:100%;}
        .hero-light .hero-overlay{position:absolute;inset:0;z-index:1;background:${overlayGradient};}
        .hero-light .hero-content{position:relative;z-index:2;max-width:900px;padding:60px 2rem;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;width:100%;}
        .hero-light .hero-text{text-align:left;}
        .hero-light .hero-visual{position:relative;aspect-ratio:4/3;border-radius:16px;overflow:hidden;box-shadow:0 24px 64px rgba(var(--rgb),0.2);}
        .hero-dark{background:var(--bg);}
        .hero-dark .hero-content{position:relative;z-index:2;max-width:700px;padding:60px 2rem;text-align:center;width:100%;}
        .hero-dark .hero-glow{position:absolute;inset:0;background:radial-gradient(ellipse 65% 50% at 50% 40%,rgba(var(--rgb),0.15) 0%,transparent 70%);pointer-events:none;}
        .hero-dark .hero-visual{position:relative;width:min(600px,90vw);aspect-ratio:16/9;border-radius:12px;overflow:hidden;margin:32px auto 0;box-shadow:0 24px 64px rgba(var(--rgb),0.25);border:1px solid rgba(var(--rgb),0.2);}
        .hero-catch{font-size:clamp(1.6rem,4vw,3rem);font-weight:900;line-height:1.3;color:var(--text);margin-bottom:12px;}
        .hero-catch span{color:var(--primary);}
        .hero-desc{font-size:clamp(0.85rem,1.5vw,1rem);color:var(--muted);line-height:1.9;margin-bottom:28px;}
        .btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:var(--primary);border-radius:100px;color:#fff;font-size:0.95rem;font-weight:700;cursor:pointer;text-decoration:none;box-shadow:0 8px 24px rgba(var(--rgb),0.35);transition:transform 0.2s,box-shadow 0.2s;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(var(--rgb),0.45);}
        .section{padding:80px 2rem;}
        .section-inner{max-width:900px;margin:0 auto;}
        .section-label{font-size:0.7rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--primary);margin-bottom:8px;font-weight:700;}
        .section-title{font-size:clamp(1.4rem,3vw,2rem);font-weight:900;color:var(--text);margin-bottom:10px;line-height:1.3;}
        .section-title span{color:var(--primary);}
        .section-sub{font-size:0.9rem;color:var(--muted);margin-bottom:40px;line-height:1.7;}
        .divider{height:1px;background:var(--border);}
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .feature-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px 20px;transition:transform 0.2s,box-shadow 0.2s;}
        .feature-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(var(--rgb),0.12);}
        .feature-icon{font-size:2rem;margin-bottom:14px;}
        .feature-title{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:8px;}
        .feature-desc{font-size:0.83rem;color:var(--muted);line-height:1.7;}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .service-card{background:linear-gradient(135deg,rgba(var(--rgb),0.08),rgba(var(--rgb),0.02));border:1px solid rgba(var(--rgb),0.2);border-radius:12px;padding:24px 20px;}
        .service-num{font-size:0.65rem;font-weight:700;letter-spacing:0.15em;color:var(--primary);margin-bottom:10px;}
        .service-name{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:8px;}
        .service-desc{font-size:0.82rem;color:var(--muted);line-height:1.65;}
        .reasons-list{display:flex;flex-direction:column;gap:14px;}
        .reason-item{display:flex;gap:20px;align-items:flex-start;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;}
        .reason-num{font-size:2rem;font-weight:900;color:rgba(var(--rgb),0.2);flex-shrink:0;line-height:1;font-family:'Inter',sans-serif;}
        .reason-title{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:6px;}
        .reason-desc{font-size:0.84rem;color:var(--muted);line-height:1.7;}
        .cta-section{padding:80px 2rem;background:linear-gradient(135deg,rgba(var(--rgb),0.1),rgba(var(--rgb),0.03));text-align:center;}
        .cta-title{font-size:clamp(1.4rem,3vw,2rem);font-weight:900;color:var(--text);margin-bottom:12px;}
        .cta-sub{font-size:0.9rem;color:var(--muted);margin-bottom:32px;line-height:1.7;}
        footer{padding:28px 2rem;text-align:center;border-top:1px solid var(--border);}
        .footer-name{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:4px;}
        .footer-copy{font-size:0.78rem;color:var(--muted);margin-bottom:6px;}
        .footer-credit{font-size:0.6rem;color:${isDark ? '#2d3748' : '#e2e8f0'};letter-spacing:0.08em;}
        @media(max-width:768px){
          .hero-light .hero-content{grid-template-columns:1fr;padding:40px 1.2rem;}
          .hero-light .hero-visual{display:none;}
          .hero-light .hero-text{text-align:center;}
          .features-grid{grid-template-columns:1fr;}
          .services-grid{grid-template-columns:1fr;}
          .reason-item{flex-direction:column;gap:8px;}
          nav{padding:0 1rem;}
          .section{padding:60px 1.2rem;}
        }
        @media(min-width:481px) and (max-width:768px){
          .features-grid{grid-template-columns:repeat(2,1fr);}
          .services-grid{grid-template-columns:repeat(2,1fr);}
        }
      `}</style>

      <nav>
        <span className="nav-title">{site.title}</span>
        <span className="nav-credit">Powered by NEXTGAME</span>
      </nav>

      {!isDark && (
        <section className="hero hero-light">
          {imageUrl && (
            <div className="hero-img">
              <img src={imageUrl} alt={site.title} />
            </div>
          )}
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-catch fade-up">
                {site.sub_title.includes('、') ? (
                  <>
                    {site.sub_title.split('、')[0]}、<br />
                    <span>{site.sub_title.split('、').slice(1).join('、')}</span>
                  </>
                ) : (
                  <span>{site.sub_title}</span>
                )}
              </h1>
              <p className="hero-desc fade-up delay-1">{ai?.original ?? ''}</p>
              <div className="fade-up delay-2">
                <a href="#cta" className="btn-primary">
                  {ai?.cta_text ?? 'お問い合わせ'} →
                </a>
              </div>
            </div>
            {imageUrl && (
              <div className="hero-visual fade-up delay-1">
                <img src={imageUrl} alt={site.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </section>
      )}

      {isDark && (
        <section className="hero hero-dark">
          <div className="hero-glow" />
          <div className="hero-content">
            <h1 className="hero-catch fade-up">
              <span>{site.title}</span>
            </h1>
            <p className="hero-desc fade-up delay-1">{site.sub_title}</p>
            <div className="fade-up delay-2">
              <a href="#cta" className="btn-primary">
                {ai?.cta_text ?? 'お問い合わせ'} →
              </a>
            </div>
            {imageUrl && (
              <div className="hero-visual fade-up delay-3">
                <img src={imageUrl} alt={site.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </section>
      )}

      <div className="divider" />

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

      <section className="cta-section" id="cta">
        <h2 className="cta-title">{ai?.cta_text ?? 'お問い合わせ'}</h2>
        <p className="cta-sub">{ai?.cta_sub ?? 'お気軽にご相談ください'}</p>
        <a href="mailto:" className="btn-primary">
          {ai?.cta_text ?? 'お問い合わせ'} →
        </a>
      </section>

      <footer>
        <p className="footer-name">{site.title}</p>
        <p className="footer-copy">© {new Date().getFullYear()} {site.title} All rights reserved.</p>
        <p className="footer-credit">Powered by NEXTGAME</p>
      </footer>
    </>
  );
}
