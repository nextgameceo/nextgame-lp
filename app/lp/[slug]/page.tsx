import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSites, getSiteBySlug } from "@/app/_libs/microcms";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const data = await getAllSites();
    return data.contents.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

const ACCENT: Record<AccentKey, { primary: string; rgb: string; grad: string }> = {
  blue:   { primary: "#3b82f6", rgb: "59,130,246",   grad: "linear-gradient(135deg,#3b82f6,#6366f1)" },
  green:  { primary: "#10b981", rgb: "16,185,129",   grad: "linear-gradient(135deg,#10b981,#06b6d4)" },
  orange: { primary: "#f97316", rgb: "249,115,22",   grad: "linear-gradient(135deg,#f97316,#eab308)" },
  red:    { primary: "#ef4444", rgb: "239,68,68",    grad: "linear-gradient(135deg,#ef4444,#f97316)" },
  purple: { primary: "#8b5cf6", rgb: "139,92,246",   grad: "linear-gradient(135deg,#8b5cf6,#3b82f6)" },
};

const THEME: Record<ThemeKey, { bg: string; bg2: string; bg3: string; text: string; muted: string; border: string; card: string; navBg: string }> = {
  light: { bg: "#fff",     bg2: "#f8fafc", bg3: "#f1f5f9", text: "#0f172a", muted: "#64748b", border: "rgba(0,0,0,0.07)", card: "#fff",     navBg: "rgba(255,255,255,0.92)" },
  dark:  { bg: "#080810",  bg2: "#0f0f1a", bg3: "#161625", text: "#f1f5f9", muted: "#94a3b8", border: "rgba(255,255,255,0.07)", card: "#161625", navBg: "rgba(8,8,16,0.92)" },
};

const ICONS: Record<string, string> = {
  Zap: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  Shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  Heart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  Star: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  Clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  MapPin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  Phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  Mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  CheckCircle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  Users: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  Award: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>',
  TrendingUp: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  Sparkles: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v1m0 16v1M3 12h1m16 0h1M5.6 5.6l.7.7m11.4-.7-.7.7M5.6 18.4l.7-.7m11.4.7-.7-.7M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>',
  Lightbulb: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
  Target: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  MessageCircle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  Smile: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  Briefcase: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  Calendar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  Settings: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  ArrowRight: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
};

function getIcon(name: string, color = 'currentColor'): string {
  const svg = ICONS[name] ?? ICONS['Star'];
  return svg.replace(/stroke="currentColor"/g, `stroke="${color}"`);
}

export default async function LpPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);
  if (!site) notFound();

  let ai: {
    theme: ThemeKey; accent_color: AccentKey; original: string;
    image_url?: string; logo_url?: string; is_redesign?: boolean;
    features: { icon_name: string; title: string; desc: string }[];
    services: { icon_name: string; name: string; desc: string; price?: string }[];
    reasons: { num: string; icon_name: string; title: string; desc: string }[];
    reviews: { name: string; role: string; text: string; star: number }[];
    flow: { step: string; icon_name: string; title: string; desc: string }[];
    faq: { q: string; a: string }[];
    closing: { title: string; body: string; guarantee: string } | null;
    cta_text: string; cta_sub: string;
  } | null = null;

  try {
    const raw = site.content.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').trim();
    ai = JSON.parse(raw);
  } catch { ai = null; }

  const themeKey: ThemeKey = ai?.theme ?? "light";
  const accentKey: AccentKey = ai?.accent_color ?? "blue";
  const t = THEME[themeKey];
  const a = ACCENT[accentKey];
  const isDark = themeKey === "dark";
  const imageUrl = ai?.image_url ?? "";
  const logoUrl = ai?.logo_url ?? "";

  // テーマ別デザインバリアント
  const variant = `${themeKey}-${accentKey}`;
  const isStripe = variant === 'dark-purple' || variant === 'dark-blue';
  const isNature = variant === 'light-green' || variant === 'light-orange';
  const isEnergy = variant === 'dark-red';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Inter:wght@400;500;700;900&display=swap');
        :root {
          --bg:${t.bg};--bg2:${t.bg2};--bg3:${t.bg3};
          --text:${t.text};--muted:${t.muted};
          --border:${t.border};--card:${t.card};
          --primary:${a.primary};--rgb:${a.rgb};--grad:${a.grad};
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:var(--bg);color:var(--text);font-family:'Noto Sans JP','Inter',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideRight{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes gradMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .fade-up{animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards;}
        .fade-in{animation:fadeIn 1s ease forwards;}
        .d1{animation-delay:0.05s;opacity:0;}
        .d2{animation-delay:0.15s;opacity:0;}
        .d3{animation-delay:0.28s;opacity:0;}
        .d4{animation-delay:0.42s;opacity:0;}

        /* NAV */
        nav{
          position:fixed;top:0;left:0;right:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 clamp(1rem,4vw,2.5rem);height:60px;
          background:${t.navBg};backdrop-filter:blur(20px) saturate(180%);
          border-bottom:1px solid var(--border);
        }
        .nav-logo{height:32px;object-fit:contain;max-width:140px;}
        .nav-title{font-size:0.9rem;font-weight:700;color:var(--text);letter-spacing:-0.01em;}
        .nav-cta{
          display:inline-flex;align-items:center;gap:6px;
          padding:8px 18px;background:var(--grad);
          color:#fff;border-radius:100px;font-size:0.75rem;font-weight:700;
          text-decoration:none;letter-spacing:0.02em;
          box-shadow:0 2px 12px rgba(var(--rgb),0.3);
          transition:transform 0.2s,box-shadow 0.2s;
        }
        .nav-cta:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(var(--rgb),0.4);}
        .nav-credit{font-size:0.55rem;color:${isDark?'#ffffff18':'#00000018'};letter-spacing:0.1em;margin-left:12px;}

        /* HERO */
        .hero{
          min-height:100svh;padding-top:60px;
          position:relative;overflow:hidden;
          display:flex;align-items:center;justify-content:center;
        }
        ${isDark ? `
        .hero-bg{
          position:absolute;inset:0;
          background:radial-gradient(ellipse 80% 60% at 50% 20%,rgba(var(--rgb),0.18) 0%,transparent 65%),
                      radial-gradient(ellipse 40% 40% at 80% 80%,rgba(var(--rgb),0.08) 0%,transparent 60%);
        }
        .hero-grid{
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(var(--rgb),0.04) 1px,transparent 1px),
                           linear-gradient(90deg,rgba(var(--rgb),0.04) 1px,transparent 1px);
          background-size:60px 60px;
          mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%);
        }
        ` : `
        .hero-bg{position:absolute;inset:0;}
        .hero-bg img{width:100%;height:100%;object-fit:cover;}
        .hero-overlay{
          position:absolute;inset:0;
          background:linear-gradient(110deg,rgba(255,255,255,0.97) 40%,rgba(255,255,255,0.7) 70%,rgba(255,255,255,0.3) 100%);
        }
        `}
        .hero-inner{
          position:relative;z-index:2;
          width:100%;max-width:1100px;
          padding:clamp(3rem,8vw,6rem) clamp(1.2rem,5vw,3rem);
          display:grid;
          grid-template-columns:${isDark?'1fr':'1fr 1fr'};
          gap:48px;align-items:center;
        }
        ${isDark?'.hero-text{text-align:center;}':'.hero-text{text-align:left;}'}
        .hero-tag{
          display:inline-flex;align-items:center;gap:8px;
          padding:5px 14px;border-radius:100px;
          background:rgba(var(--rgb),0.1);
          border:1px solid rgba(var(--rgb),0.2);
          font-size:0.7rem;font-weight:700;color:var(--primary);
          letter-spacing:0.1em;text-transform:uppercase;
          margin-bottom:20px;
        }
        .hero-tag-dot{width:6px;height:6px;border-radius:50%;background:var(--primary);animation:pulse 2s ease-in-out infinite;}
        .hero-h1{
          font-size:clamp(2rem,5.5vw,3.8rem);
          font-weight:900;line-height:1.15;
          color:var(--text);letter-spacing:-0.03em;
          margin-bottom:20px;
        }
        .hero-h1 em{
          font-style:normal;
          background:var(--grad);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;
        }
        .hero-desc{
          font-size:clamp(0.9rem,1.8vw,1.05rem);
          color:var(--muted);line-height:1.9;
          margin-bottom:36px;font-weight:300;
        }
        .hero-actions{display:flex;gap:12px;flex-wrap:wrap;${isDark?'justify-content:center;':''}}
        .btn-primary{
          display:inline-flex;align-items:center;gap:8px;
          padding:15px 32px;
          background:var(--grad);
          border-radius:100px;color:#fff;
          font-size:0.95rem;font-weight:700;
          text-decoration:none;letter-spacing:0.01em;
          box-shadow:0 8px 32px rgba(var(--rgb),0.35);
          transition:transform 0.2s,box-shadow 0.2s;
        }
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(var(--rgb),0.45);}
        .btn-ghost{
          display:inline-flex;align-items:center;gap:8px;
          padding:14px 28px;
          border:1.5px solid var(--border);
          border-radius:100px;color:var(--muted);
          font-size:0.9rem;font-weight:600;
          text-decoration:none;
          transition:all 0.2s;
        }
        .btn-ghost:hover{border-color:var(--primary);color:var(--primary);}
        .hero-visual{
          position:relative;
          aspect-ratio:4/3;border-radius:24px;overflow:hidden;
          box-shadow:0 40px 80px rgba(var(--rgb),0.2),0 0 0 1px var(--border);
          animation:float 6s ease-in-out infinite;
        }
        .hero-visual img{width:100%;height:100%;object-fit:cover;}
        .hero-visual-badge{
          position:absolute;bottom:16px;left:16px;right:16px;
          background:rgba(0,0,0,0.7);backdrop-filter:blur(12px);
          border-radius:12px;padding:12px 16px;
          display:flex;align-items:center;gap:10px;
        }
        .hero-stats{
          display:flex;gap:0;
          margin-top:36px;
          border:1px solid var(--border);border-radius:16px;overflow:hidden;
          ${isDark?'':'background:rgba(255,255,255,0.8);backdrop-filter:blur(10px);'}
        }
        .hero-stat{
          flex:1;padding:16px 12px;text-align:center;
          border-right:1px solid var(--border);
        }
        .hero-stat:last-child{border-right:none;}
        .hero-stat-val{font-size:1.3rem;font-weight:900;color:var(--primary);font-family:'Inter',sans-serif;line-height:1;}
        .hero-stat-label{font-size:0.62rem;color:var(--muted);margin-top:4px;letter-spacing:0.05em;}

        /* SECTIONS */
        .section{padding:clamp(60px,10vw,100px) clamp(1.2rem,5vw,3rem);}
        .section-inner{max-width:1100px;margin:0 auto;}
        .section-header{margin-bottom:clamp(36px,6vw,56px);}
        .section-label{
          font-size:0.65rem;letter-spacing:0.35em;text-transform:uppercase;
          color:var(--primary);font-weight:700;margin-bottom:12px;display:block;
        }
        .section-title{
          font-size:clamp(1.5rem,3.5vw,2.4rem);font-weight:900;
          color:var(--text);line-height:1.25;letter-spacing:-0.02em;
        }
        .section-title em{font-style:normal;color:var(--primary);}
        .section-sub{font-size:0.92rem;color:var(--muted);margin-top:12px;line-height:1.8;}
        .divider{height:1px;background:var(--border);}

        /* FEATURES */
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .feature-card{
          background:var(--card);border:1px solid var(--border);
          border-radius:20px;padding:32px 28px;
          position:relative;overflow:hidden;
          transition:transform 0.3s cubic-bezier(0.16,1,0.3,1),box-shadow 0.3s;
        }
        .feature-card::before{
          content:'';position:absolute;top:0;left:0;right:0;height:2px;
          background:var(--grad);opacity:0;transition:opacity 0.3s;
        }
        .feature-card:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(var(--rgb),0.12);}
        .feature-card:hover::before{opacity:1;}
        .feature-icon{
          width:48px;height:48px;border-radius:14px;
          background:rgba(var(--rgb),0.1);
          display:flex;align-items:center;justify-content:center;
          margin-bottom:20px;
        }
        .feature-title{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:10px;}
        .feature-desc{font-size:0.86rem;color:var(--muted);line-height:1.85;}

        /* SERVICES */
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .service-card{
          background:var(--grad);
          border-radius:20px;padding:32px 26px;
          position:relative;overflow:hidden;color:#fff;
        }
        .service-card::after{
          content:'';position:absolute;top:-40px;right:-40px;
          width:120px;height:120px;border-radius:50%;
          background:rgba(255,255,255,0.08);
        }
        .service-num{font-size:0.62rem;letter-spacing:0.2em;opacity:0.7;margin-bottom:16px;font-weight:700;}
        .service-icon{
          width:40px;height:40px;border-radius:10px;
          background:rgba(255,255,255,0.2);
          display:flex;align-items:center;justify-content:center;
          margin-bottom:16px;
        }
        .service-name{font-size:1.05rem;font-weight:700;margin-bottom:10px;}
        .service-desc{font-size:0.84rem;opacity:0.85;line-height:1.75;margin-bottom:16px;}
        .service-price{
          display:inline-block;font-size:0.78rem;font-weight:700;
          background:rgba(255,255,255,0.2);
          padding:5px 14px;border-radius:100px;
        }

        /* REASONS */
        .reasons-grid{display:flex;flex-direction:column;gap:16px;}
        .reason-card{
          display:grid;grid-template-columns:64px 1fr;gap:24px;
          background:var(--card);border:1px solid var(--border);
          border-radius:20px;padding:28px 32px;
          align-items:start;
          transition:border-color 0.3s,box-shadow 0.3s;
        }
        .reason-card:hover{border-color:rgba(var(--rgb),0.3);box-shadow:0 8px 32px rgba(var(--rgb),0.06);}
        .reason-icon-wrap{
          width:56px;height:56px;border-radius:16px;
          background:rgba(var(--rgb),0.1);border:1px solid rgba(var(--rgb),0.15);
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
        }
        .reason-num{font-size:0.62rem;letter-spacing:0.15em;color:var(--primary);font-weight:700;margin-bottom:8px;}
        .reason-title{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:10px;}
        .reason-desc{font-size:0.87rem;color:var(--muted);line-height:1.85;}

        /* REVIEWS */
        .reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .review-card{
          background:var(--card);border:1px solid var(--border);
          border-radius:20px;padding:28px 24px;
          display:flex;flex-direction:column;
        }
        .review-stars{display:flex;gap:3px;margin-bottom:14px;}
        .review-star{color:var(--primary);font-size:0.9rem;}
        .review-body{flex:1;font-size:0.9rem;color:var(--text);line-height:1.85;margin-bottom:20px;position:relative;}
        .review-body::before{
          content:'"';position:absolute;top:-8px;left:-4px;
          font-size:3rem;color:rgba(var(--rgb),0.12);
          font-family:'Georgia',serif;line-height:1;
        }
        .review-author{display:flex;align-items:center;gap:12px;padding-top:16px;border-top:1px solid var(--border);}
        .review-avatar{
          width:36px;height:36px;border-radius:50%;
          background:rgba(var(--rgb),0.15);
          display:flex;align-items:center;justify-content:center;
          font-size:0.75rem;font-weight:700;color:var(--primary);flex-shrink:0;
        }
        .review-name{font-size:0.85rem;font-weight:700;color:var(--text);}
        .review-role{font-size:0.72rem;color:var(--muted);}

        /* FLOW */
        .flow-grid{display:flex;flex-direction:column;gap:0;}
        .flow-item{
          display:grid;grid-template-columns:56px 1fr;gap:20px;
          padding:28px 0;border-bottom:1px solid var(--border);
          align-items:start;
        }
        .flow-item:last-child{border-bottom:none;}
        .flow-circle{
          width:52px;height:52px;border-radius:50%;
          background:rgba(var(--rgb),0.1);border:2px solid rgba(var(--rgb),0.25);
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;
        }
        .flow-title{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:6px;}
        .flow-desc{font-size:0.86rem;color:var(--muted);line-height:1.75;}

        /* FAQ */
        .faq-list{display:flex;flex-direction:column;gap:10px;}
        .faq-item{
          background:var(--card);border:1px solid var(--border);
          border-radius:14px;overflow:hidden;
        }
        .faq-q{
          padding:20px 24px;font-size:0.93rem;font-weight:700;
          color:var(--text);display:flex;align-items:flex-start;gap:14px;
        }
        .faq-icon{
          width:24px;height:24px;border-radius:50%;
          background:rgba(var(--rgb),0.1);
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;font-size:0.72rem;font-weight:900;color:var(--primary);
        }
        .faq-a{padding:0 24px 20px 62px;font-size:0.86rem;color:var(--muted);line-height:1.85;}

        /* CLOSING */
        .closing{
          padding:clamp(60px,10vw,100px) clamp(1.2rem,5vw,3rem);
          background:${isDark
            ? 'linear-gradient(135deg,rgba(var(--rgb),0.08),transparent)'
            : 'linear-gradient(135deg,rgba(var(--rgb),0.04),rgba(var(--rgb),0.02))'};
          border-top:1px solid var(--border);
          border-bottom:1px solid var(--border);
        }
        .closing-inner{max-width:700px;margin:0 auto;text-align:center;}
        .closing-title{
          font-size:clamp(1.5rem,3.5vw,2.2rem);font-weight:900;
          color:var(--text);line-height:1.35;margin-bottom:20px;
          letter-spacing:-0.02em;
        }
        .closing-title em{font-style:normal;color:var(--primary);}
        .closing-body{font-size:0.95rem;color:var(--muted);line-height:2;margin-bottom:28px;}
        .closing-badge{
          display:inline-flex;align-items:center;gap:8px;
          padding:10px 22px;border-radius:100px;
          background:rgba(var(--rgb),0.08);border:1px solid rgba(var(--rgb),0.2);
          font-size:0.8rem;font-weight:700;color:var(--primary);margin-bottom:36px;
        }

        /* CTA */
        .cta-section{
          padding:clamp(60px,10vw,100px) clamp(1.2rem,5vw,3rem);
          text-align:center;
          background:${isDark
            ? 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(var(--rgb),0.12) 0%,transparent 70%)'
            : 'var(--bg2)'};
        }
        .cta-inner{max-width:600px;margin:0 auto;}
        .cta-title{
          font-size:clamp(1.6rem,4vw,2.6rem);font-weight:900;
          color:var(--text);margin-bottom:14px;line-height:1.25;
          letter-spacing:-0.02em;
        }
        .cta-sub{font-size:0.93rem;color:var(--muted);margin-bottom:36px;line-height:1.8;}
        .cta-note{font-size:0.72rem;color:var(--muted);margin-top:16px;opacity:0.6;}

        /* FOOTER */
        footer{
          padding:32px clamp(1.2rem,5vw,3rem);
          display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;
          border-top:1px solid var(--border);
        }
        .footer-logo{height:28px;object-fit:contain;}
        .footer-copy{font-size:0.72rem;color:var(--muted);}
        .footer-credit{font-size:0.55rem;color:${isDark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.08)'};letter-spacing:0.1em;}

        /* RESPONSIVE */
        @media(max-width:900px){
          .hero-inner{grid-template-columns:1fr;text-align:center;}
          .hero-actions{justify-content:center;}
          .hero-visual{display:none;}
          .features-grid,.services-grid,.reviews-grid{grid-template-columns:1fr;}
          .reason-card{grid-template-columns:1fr;gap:14px;}
        }
        @media(min-width:600px) and (max-width:900px){
          .features-grid,.services-grid,.reviews-grid{grid-template-columns:repeat(2,1fr);}
        }
      `}</style>

      <nav>
        <div>
          {logoUrl
            ? <img src={logoUrl} alt={site.title} className="nav-logo" />
            : <span className="nav-title">{site.title}</span>
          }
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#cta" className="nav-cta">{ai?.cta_text ?? 'お問い合わせ'}</a>
          <span className="nav-credit">Powered by NEXTGAME</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        {isDark ? (
          <>
            <div className="hero-bg" />
            <div className="hero-grid" />
          </>
        ) : (
          <>
            <div className="hero-bg">
              {imageUrl && <img src={imageUrl} alt={site.title} />}
            </div>
            <div className="hero-overlay" />
          </>
        )}

        <div className="hero-inner">
          <div className="hero-text">
            {logoUrl && (
              <img src={logoUrl} alt={site.title} style={{ height: 44, objectFit: 'contain', marginBottom: 24, display: isDark ? 'block' : 'block', margin: isDark ? '0 auto 24px' : '0 0 24px' }} className="fade-up" />
            )}
            <div className="hero-tag fade-up">
              <span className="hero-tag-dot" />
              {site.title}
            </div>
            <h1 className="hero-h1 fade-up d1">
              {site.sub_title.includes('。') ? (
                <>
                  {site.sub_title.split('。')[0]}。<br />
                  <em>{site.sub_title.split('。').slice(1).join('。')}</em>
                </>
              ) : site.sub_title.includes('、') ? (
                <>
                  {site.sub_title.split('、')[0]}、<br />
                  <em>{site.sub_title.split('、').slice(1).join('、')}</em>
                </>
              ) : (
                <em>{site.sub_title}</em>
              )}
            </h1>
            <p className="hero-desc fade-up d2">{ai?.original ?? ''}</p>
            <div className="hero-actions fade-up d3">
              <a href="#cta" className="btn-primary">
                {ai?.cta_text ?? 'お問い合わせ'}
                <span dangerouslySetInnerHTML={{ __html: getIcon('ArrowRight', '#fff') }} />
              </a>
              <a href="#features" className="btn-ghost">詳しく見る</a>
            </div>
            {ai?.features && (
              <div className="hero-stats fade-up d4">
                {[
                  { v: '初期費用', l: '0円' },
                  { v: '最短', l: '3日' },
                  { v: '解約', l: 'いつでも' },
                ].map((s, i) => (
                  <div key={i} className="hero-stat">
                    <div className="hero-stat-val">{s.l}</div>
                    <div className="hero-stat-label">{s.v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isDark && imageUrl && (
            <div className="hero-visual fade-up d2">
              <img src={imageUrl} alt={site.title} />
              <div className="hero-visual-badge">
                <div dangerouslySetInnerHTML={{ __html: getIcon('CheckCircle', a.primary) }} />
                <span style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 600 }}>{ai?.cta_sub?.slice(0, 24) ?? '無料相談受付中'}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="divider" />

      {/* FEATURES */}
      {ai?.features && ai.features.length > 0 && (
        <section className="section" style={{ background: 'var(--bg2)' }} id="features">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">FEATURES</span>
              <h2 className="section-title">選ばれる<em>3つの特徴</em></h2>
              <p className="section-sub">{site.title}が多くのお客様に選ばれる理由</p>
            </div>
            <div className="features-grid">
              {ai.features.map((f, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon" dangerouslySetInnerHTML={{ __html: getIcon(f.icon_name, a.primary) }} />
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      {/* SERVICES */}
      {ai?.services && ai.services.length > 0 && (
        <section className="section" style={{ background: 'var(--bg)' }} id="services">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">SERVICES</span>
              <h2 className="section-title">サービス<em>内容</em></h2>
              <p className="section-sub">お客様のニーズに合わせたサービスをご提供します</p>
            </div>
            <div className="services-grid">
              {ai.services.map((s, i) => (
                <div key={i} className="service-card" style={{ background: i === 1 ? a.grad : `${a.grad.replace('135deg', `${135 + i * 15}deg`)}` }}>
                  <div className="service-num">SERVICE {String(i + 1).padStart(2, '0')}</div>
                  <div className="service-icon" dangerouslySetInnerHTML={{ __html: getIcon(s.icon_name, '#fff') }} />
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

      {/* REASONS */}
      {ai?.reasons && ai.reasons.length > 0 && (
        <section className="section" style={{ background: 'var(--bg2)' }} id="reasons">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">WHY US</span>
              <h2 className="section-title"><em>選ばれる理由</em></h2>
              <p className="section-sub">他社ではなく、私たちを選ぶ理由</p>
            </div>
            <div className="reasons-grid">
              {ai.reasons.map((r, i) => (
                <div key={i} className="reason-card">
                  <div className="reason-icon-wrap" dangerouslySetInnerHTML={{ __html: getIcon(r.icon_name, a.primary) }} />
                  <div>
                    <div className="reason-num">0{i + 1}</div>
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

      {/* REVIEWS */}
      {ai?.reviews && ai.reviews.length > 0 && (
        <section className="section" style={{ background: 'var(--bg)' }} id="reviews">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">REVIEWS</span>
              <h2 className="section-title">お客様の<em>声</em></h2>
              <p className="section-sub">実際にご利用いただいたお客様からの声</p>
            </div>
            <div className="reviews-grid">
              {ai.reviews.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-stars">
                    {Array.from({ length: r.star ?? 5 }).map((_, j) => <span key={j} className="review-star">★</span>)}
                  </div>
                  <p className="review-body">{r.text}</p>
                  <div className="review-author">
                    <div className="review-avatar">{r.name.charAt(0)}</div>
                    <div>
                      <div className="review-name">{r.name}</div>
                      <div className="review-role">{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      {/* FLOW */}
      {ai?.flow && ai.flow.length > 0 && (
        <section className="section" style={{ background: 'var(--bg2)' }} id="flow">
          <div className="section-inner" style={{ maxWidth: 700 }}>
            <div className="section-header">
              <span className="section-label">HOW TO START</span>
              <h2 className="section-title"><em>3ステップ</em>で始められます</h2>
              <p className="section-sub">お問い合わせから最短でスタートできます</p>
            </div>
            <div className="flow-grid">
              {ai.flow.map((f, i) => (
                <div key={i} className="flow-item">
                  <div className="flow-circle" dangerouslySetInnerHTML={{ __html: getIcon(f.icon_name, a.primary) }} />
                  <div style={{ paddingTop: 6 }}>
                    <div className="flow-title">{f.title}</div>
                    <div className="flow-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      {/* FAQ */}
      {ai?.faq && ai.faq.length > 0 && (
        <section className="section" style={{ background: 'var(--bg)' }} id="faq">
          <div className="section-inner" style={{ maxWidth: 800 }}>
            <div className="section-header">
              <span className="section-label">FAQ</span>
              <h2 className="section-title">よくある<em>質問</em></h2>
              <p className="section-sub">お客様からよくいただくご質問にお答えします</p>
            </div>
            <div className="faq-list">
              {ai.faq.map((f, i) => (
                <div key={i} className="faq-item">
                  <div className="faq-q">
                    <div className="faq-icon">Q</div>
                    {f.q}
                  </div>
                  <div className="faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CLOSING */}
      {ai?.closing && (
        <>
          <div className="divider" />
          <div className="closing">
            <div className="closing-inner">
              <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: 16 }}>MESSAGE</span>
              <h2 className="closing-title">
                <em>{ai.closing.title}</em>
              </h2>
              <p className="closing-body">{ai.closing.body}</p>
              {ai.closing.guarantee && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
                  <span className="closing-badge">
                    <span dangerouslySetInnerHTML={{ __html: getIcon('CheckCircle', a.primary) }} />
                    {ai.closing.guarantee}
                  </span>
                </div>
              )}
              <a href="#cta" className="btn-primary" style={{ margin: '0 auto' }}>
                {ai.cta_text ?? 'まずは相談する'}
                <span dangerouslySetInnerHTML={{ __html: getIcon('ArrowRight', '#fff') }} />
              </a>
            </div>
          </div>
        </>
      )}

      <div className="divider" />

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="cta-inner">
          <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>CONTACT</span>
          <h2 className="cta-title">{ai?.cta_text ?? 'お問い合わせ'}</h2>
          <p className="cta-sub">{ai?.cta_sub ?? 'お気軽にご相談ください'}</p>
          <a href="mailto:" className="btn-primary" style={{ margin: '0 auto' }}>
            {ai?.cta_text ?? 'お問い合わせ'}
            <span dangerouslySetInnerHTML={{ __html: getIcon('ArrowRight', '#fff') }} />
          </a>
          <p className="cta-note">※ 相談・見積もり無料　※ しつこい営業は一切しません</p>
        </div>
      </section>

      <footer>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {logoUrl
            ? <img src={logoUrl} alt={site.title} className="footer-logo" />
            : <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{site.title}</span>
          }
          <span className="footer-credit">Powered by NEXTGAME</span>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} {site.title} All rights reserved.</span>
      </footer>
    </>
  );
}
