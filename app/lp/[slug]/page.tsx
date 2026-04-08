import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllSites, getSiteBySlug } from "@/app/_libs/microcms";
import type { AccentColor, LayoutPattern } from "@/app/_libs/microcms";

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

const COLOR_MAP: Record<AccentColor, { primary: string; secondary: string; glow: string }> = {
  cyan:   { primary: "#63b3ed", secondary: "#7f5af0", glow: "rgba(99,179,237,0.35)" },
  violet: { primary: "#7f5af0", secondary: "#63b3ed", glow: "rgba(127,90,240,0.35)" },
  green:  { primary: "#48bb78", secondary: "#38b2ac", glow: "rgba(72,187,120,0.35)" },
  orange: { primary: "#ed8936", secondary: "#e53e3e", glow: "rgba(237,137,54,0.35)" },
  red:    { primary: "#fc8181", secondary: "#ed64a6", glow: "rgba(252,129,129,0.35)" },
};

export default async function LpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);
  if (!site) notFound();

  const accentKey: AccentColor = site.accent_color ?? "cyan";
  const layout: LayoutPattern  = site.layout ?? "hero-center";
  const color = COLOR_MAP[accentKey];

  const isLeft        = layout === "hero-left";
  const isVisualFirst = layout === "visual-first";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&family=Noto+Sans+JP:wght@300;400;700&display=swap');
        :root {
          --bg: #060a12; --surface: #0d1421;
          --border: rgba(255,255,255,0.1);
          --primary: ${color.primary}; --secondary: ${color.secondary};
          --glow: ${color.glow}; --text: #e2e8f0; --muted: #718096;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: 'Noto Sans JP','Rajdhani',sans-serif; overflow-x: hidden; }
        .grid-bg {
          background-image: linear-gradient(var(--border) 1px,transparent 1px), linear-gradient(90deg,var(--border) 1px,transparent 1px);
          background-size: 60px 60px;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes borderPulse { 0%,100%{border-color:rgba(99,179,237,0.25)} 50%{border-color:var(--primary)} }
        .fade-up{animation:fadeUp 0.9s ease forwards}
        .delay-1{animation-delay:0.1s;opacity:0} .delay-2{animation-delay:0.25s;opacity:0}
        .delay-3{animation-delay:0.4s;opacity:0} .delay-4{animation-delay:0.55s;opacity:0}
        .scanline-wrap{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:2}
        .scanline{position:absolute;left:0;right:0;height:2px;background:linear-gradient(transparent,rgba(255,255,255,0.06),transparent);animation:scanline 6s linear infinite}

        /* ── ナビ：タイトルのみ・右にPowered by ── */
        nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:60px;background:rgba(6,10,18,0.88);backdrop-filter:blur(14px);border-bottom:1px solid var(--border)}
        .nav-title{font-family:'Noto Sans JP',sans-serif;font-weight:700;font-size:0.95rem;color:#fff;letter-spacing:0.05em;}
        .nav-credit{font-size:0.62rem;color:#4a5568;letter-spacing:0.08em;}

        .hero{min-height:100vh;padding-top:60px;position:relative;overflow:hidden;display:flex;align-items:center}
        .hero-radial{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 70% 55% at 50% 45%,color-mix(in srgb,var(--primary) 15%,transparent) 0%,transparent 65%)}
        .hero-center{flex-direction:column;text-align:center;justify-content:center;padding:80px 2rem 4rem}
        .hero-left{flex-direction:row;justify-content:flex-start;padding:80px 6vw 4rem;gap:4rem}
        .hero-left .hero-text{max-width:520px}
        .hero-left .hero-visual-side{flex:1;position:relative;min-height:360px;border:1px solid var(--border);border-radius:4px;overflow:hidden;animation:borderPulse 4s ease-in-out infinite}
        .hero-visual-first{flex-direction:column;padding:80px 0 0}
        .hero-visual-first .visual-banner{width:100%;aspect-ratio:21/9;position:relative;overflow:hidden;border-bottom:1px solid var(--border)}
        .hero-visual-first .hero-text-block{padding:4rem 2rem;text-align:center;max-width:700px;margin:0 auto}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;font-family:'Rajdhani',monospace;font-size:0.72rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--primary);border:1px solid color-mix(in srgb,var(--primary) 40%,transparent);padding:4px 14px;border-radius:2px;margin-bottom:1.6rem}
        .hero-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--primary);box-shadow:0 0 8px var(--primary);animation:blink 1.5s ease-in-out infinite}
        .hero-title{font-family:'Noto Sans JP',sans-serif;font-weight:900;font-size:clamp(2rem,6vw,4.8rem);line-height:1.1;background:linear-gradient(135deg,#fff 30%,var(--primary) 65%,var(--secondary) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1rem}
        .hero-sub{font-family:'Noto Sans JP',sans-serif;font-size:clamp(1rem,2vw,1.25rem);font-weight:300;color:var(--muted);letter-spacing:0.06em;margin-bottom:2.2rem;max-width:500px}
        .hero-center .hero-sub{margin-left:auto;margin-right:auto}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:13px 34px;background:linear-gradient(135deg,var(--primary),var(--secondary));border:none;border-radius:2px;color:#fff;font-family:'Noto Sans JP',sans-serif;font-size:0.85rem;letter-spacing:0.1em;cursor:pointer;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s}
        .btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px var(--glow)}
        .visual-wrap{position:relative;width:min(700px,92vw);aspect-ratio:16/9;margin:3rem auto 0;border:1px solid var(--border);border-radius:4px;overflow:hidden;animation:borderPulse 4s ease-in-out infinite}
        .visual-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,rgba(6,10,18,0.15) 0%,transparent 35%,transparent 65%,rgba(6,10,18,0.55) 100%);pointer-events:none}
        .corner{position:absolute;width:18px;height:18px;z-index:2;border-color:var(--primary);border-style:solid;border-width:0}
        .corner.tl{top:8px;left:8px;border-top-width:2px;border-left-width:2px}
        .corner.tr{top:8px;right:8px;border-top-width:2px;border-right-width:2px}
        .corner.bl{bottom:8px;left:8px;border-bottom-width:2px;border-left-width:2px}
        .corner.br{bottom:8px;right:8px;border-bottom-width:2px;border-right-width:2px}
        .section{max-width:860px;margin:0 auto;padding:5rem 2rem}
        .section-label{font-family:'Rajdhani',monospace;font-size:0.62rem;letter-spacing:0.35em;text-transform:uppercase;color:var(--secondary);margin-bottom:1rem;display:flex;align-items:center;gap:10px}
        .section-label::after{content:'';flex:1;max-width:80px;height:1px;background:linear-gradient(90deg,var(--secondary),transparent)}
        .divider{height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin:0 2rem}
        .rich h1,.rich h2,.rich h3{color:var(--primary);margin-bottom:0.9rem}
        .rich h1{font-size:1.5rem} .rich h2{font-size:1.25rem} .rich h3{font-size:1.05rem}
        .rich p{line-height:1.9;margin-bottom:1.1rem;color:#a0aec0}
        .rich a{color:var(--primary);text-decoration:underline}
        .rich ul,.rich ol{padding-left:1.5rem;margin-bottom:1.1rem}
        .rich li{margin-bottom:0.35rem;color:#a0aec0}
        .rich strong{color:var(--text)}
        .rich blockquote{border-left:3px solid var(--secondary);padding:0.5rem 1rem;margin:1.5rem 0;background:rgba(127,90,240,0.07);border-radius:0 4px 4px 0}
        .rich code{font-family:monospace;background:color-mix(in srgb,var(--primary) 12%,transparent);color:var(--primary);padding:2px 6px;border-radius:3px;font-size:0.9em}

        /* ── フッター：クライアント名 + 小さくNEXTGAMEクレジット ── */
        footer{text-align:center;padding:2.5rem 2rem;border-top:1px solid var(--border);font-family:'Noto Sans JP',sans-serif;}
        .footer-client{font-size:1rem;font-weight:700;color:#fff;margin-bottom:0.3rem;}
        .footer-copy{font-size:0.78rem;color:var(--muted);margin-bottom:0.6rem;}
        .footer-credit{font-size:0.62rem;color:#2d3748;letter-spacing:0.08em;}

        @media(max-width:768px){.hero-left{flex-direction:column;padding:80px 1.2rem 3rem}.hero-left .hero-visual-side{min-height:220px}.section{padding:3rem 1.2rem}}
        @media(max-width:480px){nav{padding:0 1rem}.hero-center{padding:72px 1.2rem 3rem}}
      `}</style>

      {/* ナビ：クライアント名 ＋ 右に極小クレジット */}
      <nav>
        <span className="nav-title">{site.title}</span>
        <span className="nav-credit">Powered by NEXTGAME</span>
      </nav>

      {!isLeft && !isVisualFirst && (
        <section className="hero hero-center grid-bg">
          <div className="hero-radial" />
          <div className="scanline-wrap"><div className="scanline" /></div>
          <div className="hero-badge fade-up">OFFICIAL SITE</div>
          <h1 className="hero-title fade-up delay-1">{site.title}</h1>
          <p className="hero-sub fade-up delay-2">{site.sub_title}</p>
          <div className="fade-up delay-3">
            <a href="#content" className="btn">▼ &nbsp;詳しく見る</a>
          </div>
          {site.main_visual && (
            <div className="visual-wrap fade-up delay-4">
              <div className="corner tl"/><div className="corner tr"/>
              <div className="corner bl"/><div className="corner br"/>
              <div className="visual-overlay" />
              <div className="scanline-wrap"><div className="scanline" /></div>
              <Image src={site.main_visual.url} alt={site.title} fill style={{ objectFit: "cover" }} priority />
            </div>
          )}
        </section>
      )}

      {isLeft && (
        <section className="hero hero-left grid-bg">
          <div className="hero-radial" />
          <div className="scanline-wrap"><div className="scanline" /></div>
          <div className="hero-text">
            <div className="hero-badge fade-up">OFFICIAL SITE</div>
            <h1 className="hero-title fade-up delay-1">{site.title}</h1>
            <p className="hero-sub fade-up delay-2">{site.sub_title}</p>
            <div className="fade-up delay-3">
              <a href="#content" className="btn">▼ &nbsp;詳しく見る</a>
            </div>
          </div>
          {site.main_visual && (
            <div className="hero-visual-side fade-up delay-3">
              <div className="corner tl"/><div className="corner tr"/>
              <div className="corner bl"/><div className="corner br"/>
              <div className="visual-overlay" />
              <Image src={site.main_visual.url} alt={site.title} fill style={{ objectFit: "cover" }} priority />
            </div>
          )}
        </section>
      )}

      {isVisualFirst && (
        <section className="hero hero-visual-first grid-bg">
          <div className="hero-radial" />
          {site.main_visual && (
            <div className="visual-banner fade-up">
              <div className="visual-overlay" />
              <div className="scanline-wrap"><div className="scanline" /></div>
              <Image src={site.main_visual.url} alt={site.title} fill style={{ objectFit: "cover" }} priority />
            </div>
          )}
          <div className="hero-text-block">
            <div className="hero-badge fade-up delay-1">OFFICIAL SITE</div>
            <h1 className="hero-title fade-up delay-2">{site.title}</h1>
            <p className="hero-sub fade-up delay-3">{site.sub_title}</p>
            <div className="fade-up delay-4">
              <a href="#content" className="btn">▼ &nbsp;詳しく見る</a>
            </div>
          </div>
        </section>
      )}

      <div className="divider" />

      <section className="section" id="content">
        <p className="section-label">ABOUT</p>
        <div className="rich" dangerouslySetInnerHTML={{ __html: site.content }} />
      </section>

      <div className="divider" />

      {/* フッター：クライアント名メイン・NEXTGAMEは極小 */}
      <footer>
        <p className="footer-client">{site.title}</p>
        <p className="footer-copy">© {new Date().getFullYear()} {site.title} All rights reserved.</p>
        <p className="footer-credit">Powered by NEXTGAME</p>
      </footer>
    </>
  );
}
