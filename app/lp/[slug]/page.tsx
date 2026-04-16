import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSites, getSiteBySlug } from "@/app/_libs/microcms";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const data = await getAllSites();
    return data.contents.map((s) => ({ slug: s.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);
  if (!site) return {};
  return { title: site.title, description: site.sub_title, openGraph: { title: site.title, description: site.sub_title } };
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

const THEME: Record<ThemeKey, { bg: string; bg2: string; bg3: string; text: string; muted: string; border: string; card: string; navBg: string }> = {
  light: { bg: "#ffffff", bg2: "#f8fafc", bg3: "#f1f5f9", text: "#0f172a", muted: "#64748b", border: "rgba(0,0,0,0.08)", card: "#ffffff", navBg: "rgba(255,255,255,0.92)" },
  dark:  { bg: "#0a0a0f", bg2: "#111118", bg3: "#18181f", text: "#f1f5f9", muted: "#94a3b8", border: "rgba(255,255,255,0.08)", card: "#18181f", navBg: "rgba(10,10,15,0.92)" },
};

// SVGアイコンライブラリ
const ICONS: Record<string, string> = {
  Zap: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  Shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  Heart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  Star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  Clock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  MapPin: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  Phone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  Mail: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  CheckCircle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  Users: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  Award: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>',
  TrendingUp: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  Sparkles: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v1m0 16v1M3 12h1m16 0h1M5.6 5.6l.7.7m11.4-.7-.7.7M5.6 18.4l.7-.7m11.4.7-.7-.7M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>',
  Lightbulb: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
  Target: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  MessageCircle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  Smile: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  Briefcase: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  Calendar: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  Settings: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  ArrowRight: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
};

function getIcon(name: string, size = 24, color = 'currentColor'): string {
  const svg = ICONS[name] ?? ICONS['Star'];
  return svg.replace(/width="24"/g, `width="${size}"`).replace(/height="24"/g, `height="${size}"`).replace(/stroke="currentColor"/g, `stroke="${color}"`);
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
  const imageUrl = ai?.image_url ?? site.main_visual?.url ?? "";
  const logoUrl = ai?.logo_url ?? "";

  const overlayGradient =
    accentKey === 'green'  ? 'linear-gradient(to right,rgba(255,255,255,0.97) 45%,rgba(255,255,255,0.6) 100%)' :
    accentKey === 'blue'   ? 'linear-gradient(to right,rgba(240,249,255,0.97) 45%,rgba(240,249,255,0.6) 100%)' :
    accentKey === 'orange' ? 'linear-gradient(to right,rgba(255,247,237,0.97) 45%,rgba(255,247,237,0.6) 100%)' :
    accentKey === 'red'    ? 'linear-gradient(to right,rgba(255,241,242,0.97) 45%,rgba(255,241,242,0.6) 100%)' :
                             'linear-gradient(to right,rgba(245,243,255,0.97) 45%,rgba(245,243,255,0.6) 100%)';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@400;700;900&display=swap');
        :root{--bg:${t.bg};--bg2:${t.bg2};--bg3:${t.bg3};--text:${t.text};--muted:${t.muted};--border:${t.border};--card:${t.card};--primary:${a.primary};--secondary:${a.secondary};--rgb:${a.rgb};}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:var(--bg);color:var(--text);font-family:'Noto Sans JP','Inter',sans-serif;overflow-x:hidden;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.8s ease forwards;}
        .delay-1{animation-delay:0.1s;opacity:0;}
        .delay-2{animation-delay:0.25s;opacity:0;}
        .delay-3{animation-delay:0.4s;opacity:0;}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:64px;background:${t.navBg};backdrop-filter:blur(16px);border-bottom:1px solid var(--border);}
        .nav-logo{height:36px;object-fit:contain;max-width:160px;}
        .nav-title{font-size:0.95rem;font-weight:700;color:var(--text);}
        .nav-cta{display:inline-flex;align-items:center;padding:8px 20px;background:var(--primary);color:#fff;border-radius:100px;font-size:0.78rem;font-weight:700;text-decoration:none;transition:opacity 0.2s;}
        .nav-cta:hover{opacity:0.85;}
        .nav-credit{font-size:0.6rem;color:${isDark?'#2d3748':'#cbd5e1'};letter-spacing:0.08em;}
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
        .hero-desc{font-size:clamp(0.9rem,1.5vw,1.05rem);color:var(--muted);line-height:2;margin-bottom:32px;}
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
        .feature-card{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:36px 28px;transition:transform 0.2s,box-shadow 0.2s;}
        .feature-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(var(--rgb),0.1);}
        .feature-icon-wrap{width:52px;height:52px;border-radius:14px;background:rgba(var(--rgb),0.1);display:flex;align-items:center;justify-content:center;margin-bottom:20px;}
        .feature-title{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:12px;}
        .feature-desc{font-size:0.88rem;color:var(--muted);line-height:1.85;}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .service-card{background:linear-gradient(135deg,rgba(var(--rgb),0.08),rgba(var(--rgb),0.02));border:1px solid rgba(var(--rgb),0.2);border-radius:16px;padding:32px 24px;}
        .service-icon-wrap{width:44px;height:44px;border-radius:12px;background:rgba(var(--rgb),0.15);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
        .service-num{font-size:0.65rem;font-weight:700;letter-spacing:0.15em;color:var(--primary);margin-bottom:10px;}
        .service-name{font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:10px;}
        .service-desc{font-size:0.88rem;color:var(--muted);line-height:1.8;margin-bottom:14px;}
        .service-price{font-size:0.8rem;font-weight:700;color:var(--primary);padding:5px 14px;background:rgba(var(--rgb),0.1);border-radius:100px;display:inline-block;}
        .reasons-list{display:flex;flex-direction:column;gap:20px;}
        .reason-item{display:flex;gap:24px;align-items:flex-start;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:32px;}
        .reason-icon-wrap{width:56px;height:56px;border-radius:16px;background:rgba(var(--rgb),0.1);border:1px solid rgba(var(--rgb),0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .reason-body{flex:1;}
        .reason-header{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
        .reason-num{font-size:0.68rem;font-weight:700;letter-spacing:0.15em;color:var(--primary);}
        .reason-title{font-size:1.05rem;font-weight:700;color:var(--text);}
        .reason-desc{font-size:0.88rem;color:var(--muted);line-height:1.85;}
        .reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .review-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px 24px;}
        .review-stars{display:flex;gap:3px;margin-bottom:14px;}
        .review-star{color:var(--primary);font-size:1rem;}
        .review-text{font-size:0.9rem;color:var(--text);line-height:1.85;margin-bottom:20px;}
        .review-name{font-size:0.88rem;font-weight:700;color:var(--text);}
        .review-role{font-size:0.75rem;color:var(--muted);margin-top:3px;}
        .flow-list{display:flex;flex-direction:column;}
        .flow-item{display:flex;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid var(--border);}
        .flow-item:last-child{border-bottom:none;}
        .flow-icon-wrap{width:52px;height:52px;border-radius:50%;background:rgba(var(--rgb),0.1);border:2px solid rgba(var(--rgb),0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .flow-title{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:8px;}
        .flow-desc{font-size:0.88rem;color:var(--muted);line-height:1.75;}
        .faq-list{display:flex;flex-direction:column;gap:12px;}
        .faq-item{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;}
        .faq-q{padding:22px 28px;font-size:0.95rem;font-weight:700;color:var(--text);display:flex;align-items:flex-start;gap:16px;}
        .faq-q-icon{color:var(--primary);font-weight:900;flex-shrink:0;font-size:1.1rem;}
        .faq-a{padding:0 28px 22px 60px;font-size:0.88rem;color:var(--muted);line-height:1.85;}
        .closing-section{padding:80px 2rem;background:linear-gradient(135deg,rgba(var(--rgb),0.06),rgba(var(--rgb),0.01));border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
        .closing-inner{max-width:680px;margin:0 auto;text-align:center;}
        .closing-title{font-size:clamp(1.4rem,3vw,2rem);font-weight:900;color:var(--text);margin-bottom:20px;line-height:1.4;}
        .closing-title span{color:var(--primary);}
        .closing-body{font-size:0.95rem;color:var(--muted);line-height:2.1;margin-bottom:28px;}
        .closing-guarantee{display:inline-flex;align-items:center;gap:8px;padding:10px 24px;background:rgba(var(--rgb),0.08);border:1px solid rgba(var(--rgb),0.2);border-radius:100px;font-size:0.82rem;color:var(--primary);font-weight:700;margin-bottom:36px;}
        .cta-section{padding:96px 2rem;text-align:center;}
        .cta-inner{max-width:640px;margin:0 auto;}
        .cta-title{font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:900;color:var(--text);margin-bottom:14px;line-height:1.3;}
        .cta-sub{font-size:0.95rem;color:var(--muted);margin-bottom:36px;line-height:1.85;}
        .cta-note{font-size:0.75rem;color:var(--muted);margin-top:16px;opacity:0.7;}
        footer{padding:36px 2rem;text-align:center;border-top:1px solid var(--border);}
        .footer-logo{height:40px;object-fit:contain;margin-bottom:12px;}
        .footer-name{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:6px;}
        .footer-copy{font-size:0.78rem;color:var(--muted);margin-bottom:8px;}
        .footer-credit{font-size:0.6rem;color:${isDark?'#2d3748':'#e2e8f0'};letter-spacing:0.08em;}
        @media(max-width:768px){
          .hero-light .hero-content{grid-template-columns:1fr;padding:60px 1.2rem;}
          .hero-light .hero-visual{display:none;}
          .hero-light .hero-text{text-align:center;}
          .features-grid,.services-grid,.reviews-grid{grid-template-columns:1fr;}
          .reason-item{flex-direction:column;gap:12px;}
          .flow-item{gap:16px;}
          nav{padding:0 1.2rem;}
          .section{padding:64px 1.2rem;}
          .nav-cta{font-size:0.72rem;padding:7px 14px;}
          .closing-section,.cta-section{padding:64px 1.2rem;}
        }
        @media(min-width:481px) and (max-width:768px){
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="#cta" className="nav-cta">{ai?.cta_text ?? 'お問い合わせ'}</a>
          <span className="nav-credit">Powered by NEXTGAME</span>
        </div>
      </nav>

      {!isDark && (
        <section className="hero hero-light">
          {imageUrl && <div className="hero-img"><img src={imageUrl} alt={site.title} /></div>}
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-text">
              {logoUrl
                ? <img src={logoUrl} alt={site.title} style={{ height: 48, objectFit: 'contain', marginBottom: 20 }} className="fade-up" />
                : <div className="badge fade-up"><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />{site.title}</div>
              }
              <h1 className="hero-catch fade-up delay-1">
                {site.sub_title.includes('、')
                  ? <>{site.sub_title.split('、')[0]}、<br /><span>{site.sub_title.split('、').slice(1).join('、')}</span></>
                  : <span>{site.sub_title}</span>
                }
              </h1>
              <p className="hero-desc fade-up delay-2">{ai?.original ?? ''}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }} className="fade-up delay-3">
                <a href="#cta" className="btn-primary">{ai?.cta_text ?? 'お問い合わせ'} →</a>
                <a href="#features" className="btn-outline">詳しく見る</a>
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
            {logoUrl
              ? <img src={logoUrl} alt={site.title} style={{ height: 52, objectFit: 'contain', margin: '0 auto 20px', display: 'block' }} className="fade-up" />
              : <div className="badge fade-up" style={{ margin: '0 auto 16px' }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />{site.title}</div>
            }
            <h1 className="hero-catch fade-up delay-1"><span>{site.sub_title}</span></h1>
            <p className="hero-desc fade-up delay-2">{ai?.original ?? ''}</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }} className="fade-up delay-3">
              <a href="#cta" className="btn-primary">{ai?.cta_text ?? 'お問い合わせ'} →</a>
              <a href="#features" className="btn-outline">詳しく見る</a>
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
                  <div className="feature-icon-wrap" dangerouslySetInnerHTML={{ __html: getIcon(f.icon_name, 24, a.primary) }} />
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
                  <div className="service-icon-wrap" dangerouslySetInnerHTML={{ __html: getIcon(s.icon_name, 20, a.primary) }} />
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
            <p className="section-sub">他社ではなく、私たちを選ぶ理由</p>
            <div className="reasons-list">
              {ai.reasons.map((r, i) => (
                <div key={i} className="reason-item">
                  <div className="reason-icon-wrap" dangerouslySetInnerHTML={{ __html: getIcon(r.icon_name, 24, a.primary) }} />
                  <div className="reason-body">
                    <div className="reason-header">
                      <span className="reason-num">0{i + 1}</span>
                      <span className="reason-title">{r.title}</span>
                    </div>
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
                    {Array.from({ length: r.star ?? 5 }).map((_, j) => <span key={j} className="review-star">★</span>)}
                  </div>
                  <p className="review-text">{r.text}</p>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-role">{r.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      {ai?.flow && ai.flow.length > 0 && (
        <section className="section" style={{ background: 'var(--bg2)' }} id="flow">
          <div className="section-inner">
            <p className="section-label">HOW TO START</p>
            <h2 className="section-title"><span>3ステップ</span>で始められます</h2>
            <p className="section-sub">お問い合わせから最短でスタートできます</p>
            <div className="flow-list">
              {ai.flow.map((f, i) => (
                <div key={i} className="flow-item">
                  <div className="flow-icon-wrap" dangerouslySetInnerHTML={{ __html: getIcon(f.icon_name, 22, a.primary) }} />
                  <div style={{ paddingTop: 8 }}>
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

      {ai?.faq && ai.faq.length > 0 && (
        <section className="section" style={{ background: 'var(--bg)' }} id="faq">
          <div className="section-inner">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">よくある<span>質問</span></h2>
            <p className="section-sub">お客様からよくいただくご質問にお答えします</p>
            <div className="faq-list">
              {ai.faq.map((f, i) => (
                <div key={i} className="faq-item">
                  <div className="faq-q"><span className="faq-q-icon">Q</span>{f.q}</div>
                  <div className="faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {ai?.closing && (
        <>
          <div className="divider" />
          <div className="closing-section">
            <div className="closing-inner">
              <p className="section-label" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>MESSAGE</p>
              <h2 className="closing-title"><span>{ai.closing.title}</span></h2>
              <p className="closing-body">{ai.closing.body}</p>
              {ai.closing.guarantee && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
                  <span className="closing-guarantee">✓ {ai.closing.guarantee}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a href="#cta" className="btn-primary">{ai?.cta_text ?? 'まずは相談する'} →</a>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="divider" />

      <section className="cta-section" style={{ background: `linear-gradient(135deg,rgba(var(--rgb),0.08),rgba(var(--rgb),0.02))` }} id="cta">
        <div className="cta-inner">
          <p className="section-label" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>CONTACT</p>
          <h2 className="cta-title">{ai?.cta_text ?? 'お問い合わせ'}</h2>
          <p className="cta-sub">{ai?.cta_sub ?? 'お気軽にご相談ください'}</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="mailto:" className="btn-primary">{ai?.cta_text ?? 'お問い合わせ'} →</a>
          </div>
          <p className="cta-note">※ 相談・見積もり無料　※ しつこい営業は一切しません</p>
        </div>
      </section>

      <footer>
        {logoUrl
          ? <img src={logoUrl} alt={site.title} className="footer-logo" />
          : <p className="footer-name">{site.title}</p>
        }
        <p className="footer-copy">© {new Date().getFullYear()} {site.title} All rights reserved.</p>
        <p className="footer-credit">Powered by NEXTGAME</p>
      </footer>
    </>
  );
}
