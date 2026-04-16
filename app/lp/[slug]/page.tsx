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
    services: { name: string; desc: string; price?: string }[];
    reasons: { num: string; title: string; desc: string }[];
    reviews: { name: string; role: string; text: string; star: number }[];
    faq: { q: string; a: string }[];
    cta_text: string;
    cta_sub: string;
  } | null = null;

  try {
    const raw = site.content
      .replace(/<[^>]*>/g, '')
      .replace(/&quot;/g, '"')
      .trim();
    ai = JSON.parse(raw);
  } catch { ai = null; }

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
        nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:64px;background:${t.navBg};backdrop-filter:blur(16px);border-bottom:1px solid var(--border);}
        .nav-title{font-size:0.95rem;font-weight:700;color:var(--text);}
        .nav-cta{display:inline-flex;align-items:center;padding:8px 20px;background:var(--primary);color:#fff;border-radius:100px;font-size:0.78rem;font-weight:700;text-decoration:none;}
        .nav-credit{font-size:0.6rem;color:${isDark ? '#2d3748' : '#cbd5e1'};letter-spacing:0.08em;}
        .hero{min-height:100vh;padding-top:64px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;}
        .hero-light{background:var(--bg2);}
        .hero-light .hero-img{position:absolute;inset:0;z-index:0;}
        .hero-light .hero-img img{object-fit:cover;width:100%;height:100%;}
        .hero-light .hero-overlay{position:absolute;inset:0;z-index:1;background:${overlayGradient};}
        .hero-light .hero-content{position:relative;z-index:2;max-width:960px;padding:80px 2rem;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;width:100%;}
        .hero-light .hero-text{text-align:left;}
        .hero-light .hero-visual{position:relative;aspect-ratio:4/3;border-radius:20px;overflow:hidden;box-shadow:0 32px 80px rgba(var(--rgb),0.2);}
        .hero-dark{background:var(--bg);}
        .hero-dark .hero-content{position:relative;z-index:2;max-width:700px;padding:80px 2rem;text-align:center;width:100%;}
        .hero-dark .hero-glow{position:absolute;inset:0;background:radial-gradient(ellipse 65% 50% at 50% 40%,rgba(var(--rgb),0.15) 0%,transparent 70%);pointer-events:none;}
        .hero-dark .hero-visual{position:relative;width:min(600px,90vw);aspect-ratio:16/9;border-radius:14px;overflow:hidden;margin:40px auto 0;box-shadow:0 32px 80px rgba(var(--rgb),0.25);border:1px solid rgba(var(--rgb),0.2);}
        .badge{display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border:1px solid rgba(var(--rgb),0.25);border-radius:100px;font-size:0.68rem;letter-spacing:0.15em;color:var(--primary);font-weight:700;margin-bottom:16px;text-transform:uppercase;}
        .hero-catch{font-size:clamp(1.8rem,4.5vw,3.2rem);font-weight:900;line-height:1.25;color:var(--text);margin-bottom:16px;}
        .hero-catch span{color:var(--primary);}
        .hero-desc{font-size:clamp(0.88rem,1.5vw,1rem);color:var(--muted);line-height:1.9;margin-bottom:32px;}
        .btn-primary{display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:var(--primary);border-radius:100px;color:#fff;font-size:1rem;font-weight:700;cursor:pointer;text-decoration:none;box-shadow:0 8px 32px rgba(var(--rgb),0.35);transition:transform 0.2s,box-shadow 0.2s;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(var(--rgb),0.45);}
        .btn-outline{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border:2px solid rgba(var(--rgb),0.3);border-radius:100px;color:var(--primary);font-size:0.9rem;font-weight:700;text-decoration:none;transition:all 0.2s;}
        .btn-outline:hover{background:rgba(var(--rgb),0.08);}
        .section{padding:96px 2rem;}
        .section-inner{max-width:960px;margin:0 auto;}
        .section-label{font-size:0.68rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--primary);margin-bottom:10px;font-weight:700;}
        .section-title{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:900;color:var(--text);margin-bottom:12px;line-height:1.3;}
        .section-title span{color:var(--primary);}
        .section-sub{font-size:0.92rem;color:var(--muted);margin-bottom:48px;line-height:1.8;}
        .divider{height:1px;background:var(--border);}
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .feature-card{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:32px 24px;transition:transform 0.2s,box-shadow 0.2s;}
        .feature-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(var(--rgb),0.1);}
        .feature-icon{font-size:2.2rem;margin-bottom:16px;}
        .feature-title{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:10px;}
        .feature-desc{font-size:0.85rem;color:var(--muted);line-height:1.75;}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .service-card{background:linear-gradient(135deg,rgba(var(--rgb),0.08),rgba(var(--rgb),0.02));border:1px solid rgba(var(--rgb),0.2);border-radius:16px;padding:28px 24px;}
        .service-num{font-size:0.65rem;font-weight:700;letter-spacing:0.15em;color:var(--primary);margin-bottom:12px;}
        .service-name{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:8px;}
        .service-desc{font-size:0.84rem;color:var(--muted);line-height:1.7;margin-bottom:10px;}
        .service-price{font-size:0.78rem;font-weight:700;color:var(--primary);padding:4px 12px;background:rgba(var(--rgb),0.1);border-radius:100px;display:inline-block;}
        .reasons-list{display:flex;flex-direction:column;gap:16px;}
        .reason-item{display:flex;gap:24px;align-items:flex-start;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;}
        .reason-num{font-size:2.5rem;font-weight:900;color:rgba(var(--rgb),0.15);flex-shrink:0;line-height:1;font-family:'Inter',sans-serif;}
        .reason-title{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:8px;}
        .reason-desc{font-size:0.86rem;color:var(--muted);line-height:1.75;}
        .reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .review-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px 24px;}
        .review-stars{display:flex;gap:3px;margin-bottom:14px;}
        .review-star{color:var(--primary);font-size:1rem;}
        .review-text{font-size:0.88rem;color:var(--text);line-height:1.8;margin-bottom:18px;}
        .review-author{display:flex;flex-direction:column;gap:3px;}
        .review-name{font-size:0.88rem;font-weight:700;color:var(--text);}
        .review-role{font-size:0.75rem;color:var(--muted);}
        .faq-list{display:flex;flex-direction:column;gap:12px;}
        .faq-item{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;}
        .faq-q{padding:20px 24px;font-size:0.92rem;font-weight:700;color:var(--text);display:flex;align-items:flex-start;gap:14px;}
        .faq-q-icon{color:var(--primary);font-weight:900;flex-shrink:0;font-size:1rem;}
        .faq-a{padding:0 24px 20px 52px;font-size:0.85rem;color:var(--muted);line-height:1.8;}
        .cta-section{padding:96px 2rem;background:linear-gradient(135deg,rgba(var(--rgb),0.08),rgba(var(--rgb),0.02));text-align:center;}
        .cta-title{font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:900;color:var(--text);margin-bottom:14px;line-height:1.3;}
        .cta-sub{font-size:0.92rem;color:var(--muted);margin-bottom:36px;line-height:1.8;}
        .cta-note{font-size:0.75rem;color:var(--muted);margin-top:16px;opacity:0.7;}
        footer{padding:36px 2rem;text-align:center;border-top:1px solid var(--border);}
        .footer-name{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:6px;}
        .footer-copy{font-size:0.78rem;color:var(--muted);margin-bottom:8px;}
        .footer-credit{font-size:0.6rem;color:${isDark ? '#2d3748' : '#e2e8f0'};letter-spacing:0.08em;}
        @media(max-width:768px){
          .hero-light .hero-content{grid-template-columns:1fr;padding:60px 1.2rem;}
          .hero-light .hero-visual{display:none;}
          .hero-light .hero-text{text-align:center;}
          .features-grid{grid-template-columns:1fr;}
          .services-grid{grid-template-columns:1fr;}
          .reviews-grid{grid-template-columns:1fr;}
          .reason-item{flex-direction:column;gap:10px;}
          nav{padding:0 1.2rem;}
          .section{padding:72px 1.2rem;}
          .nav-cta{display:none;}
        }
        @media(min-width:481px) and (max-width:768px){
          .features-grid{grid-template-columns:repeat(2,1fr);}
          .services-grid{grid-template-columns:repeat(2,1fr);}
          .reviews-grid{grid-template-columns:repeat(2,1fr);}
        }
      `}</style>

      <nav>
        <span className="nav-title">{site.title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="#cta" className="nav-cta">{ai?.cta_text ?? 'お問い合わせ'}</a>
          <span className="nav-credit">Powered by NEXTGAME</span>
        </div>
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
              <div className="badge fade-up">
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
                {site.title}
              </div>
              <h1 className="hero-catch fade-up delay-1">
                {site.sub_title.includes('、') ? (
                  <>
                    {site.sub_title.split('、')[0]}、<br />
                    <span>{site.sub_title.split('、').slice(1).join('、')}</span>
                  </>
                ) : (
                  <span>{site.sub_title}</span>
                )}
              </h1>
              <p className="hero-desc fade-up delay-2">{ai?.original ?? ''}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }} className="fade-up delay-3">
                <a href="#cta" className="btn-primary">
                  {ai?.cta_text ?? 'お問い合わせ'} →
                </a>
                <a href="#features" className="btn-outline">
                  詳しく見る
                </a>
              </div>
            </div>
            {imageUrl && (
              <div className="hero-visual fade-up delay-2">
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
            <div className="badge fade-up" style={{ margin: '0 auto 16px' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
              {site.title}
            </div>
            <h1 className="hero-catch fade-up delay-1">
              <span>{site.sub_title}</span>
            </h1>
            <p className="hero-desc fade-up delay-2">{ai?.original ?? ''}</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }} className="fade-up delay-3">
              <a href="#cta" className="btn-primary">
                {ai?.cta_text ?? 'お問い合わせ'} →
              </a>
              <a href="#features" className="btn-outline">
                詳しく見る
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
        <section className="section" style={{ background: 'var(--bg2)' }} id="features">
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
        <section className="section" style={{ background: 'var(--bg)' }} id="services">
          <div className="section-inner">
            <p className="section-label">SERVICES</p>
            <h2 className="section-title">サービス<span>内容</span></h2>
            <p className="section-sub">お客様のニーズに合わせたサービスをご提供します</p>
            <div className="services-grid">
              {ai.services.map((s, i) => (
                <div key={i} className="service-card">
                  <div className="service-num">SERVICE {String(i + 1).padStart(2, '0')}</div>
                  <div className="service-name">{s.name}</div>
                  <div className="service-desc">{s.desc}</div>
                  {s.price && <span className="service-price">{s.price}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      {ai?.reasons && ai.reasons.length > 0 && (
        <section className="section" style={{ background: 'var(--bg2)' }} id="reasons">
          <div className="section-inner">
            <p className="section-label">WHY US</p>
            <h2 className="section-title"><span>選ばれる理由</span></h2>
            <p className="section-sub">お客様から信頼をいただける理由</p>
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

      {ai?.reviews && ai.reviews.length > 0 && (
        <section className="section" style={{ background: 'var(--bg)' }} id="reviews">
          <div className="section-inner">
            <p className="section-label">REVIEWS</p>
            <h2 className="section-title">お客様の<span>声</span></h2>
            <p className="section-sub">実際にご利用いただいたお客様からの声</p>
            <div className="reviews-grid">
              {ai.reviews.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-stars">
                    {Array.from({ length: r.star ?? 5 }).map((_, j) => (
                      <span key={j} className="review-star">★</span>
                    ))}
                  </div>
                  <p className="review-text">{r.text}</p>
                  <div className="review-author">
                    <span className="review-name">{r.name}</span>
                    <span className="review-role">{r.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      {ai?.faq && ai.faq.length > 0 && (
        <section className="section" style={{ background: 'var(--bg2)' }} id="faq">
          <div className="section-inner">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">よくある<span>質問</span></h2>
            <p className="section-sub">お客様からよくいただくご質問</p>
            <div className="faq-list">
              {ai.faq.map((f, i) => (
                <div key={i} className="faq-item">
                  <div className="faq-q">
                    <span className="faq-q-icon">Q</span>
                    {f.q}
                  </div>
                  <div className="faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      <section className="cta-section" id="cta">
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>CONTACT</p>
          <h2 className="cta-title">{ai?.cta_text ?? 'お問い合わせ'}</h2>
          <p className="cta-sub">{ai?.cta_sub ?? 'お気軽にご相談ください'}</p>
          <a href="mailto:" className="btn-primary" style={{ margin: '0 auto' }}>
            {ai?.cta_text ?? 'お問い合わせ'} →
          </a>
          <p className="cta-note">※ 相談・見積もり無料　※ 営業電話は一切しません</p>
        </div>
      </section>

      <footer>
        <p className="footer-name">{site.title}</p>
        <p className="footer-copy">© {new Date().getFullYear()} {site.title} All rights reserved.</p>
        <p className="footer-credit">Powered by NEXTGAME</p>
      </footer>
    </>
  );
}
