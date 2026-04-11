/* eslint-disable */
// app/page.tsx — NEXTGAME サイトジェネレーター
// HTMLファイルをそのままNext.js (App Router) に移植
‘use client’;

import { useEffect } from ‘react’;

const CSS_CONTENT = `
/* ============================================================
TOKENS
============================================================ */
:root {
–black:#000; –white:#fff; –sub:#a0a0a0;
–ice:#00d1ff; –yell:#ffd600; –green:#06C755;
–rule:rgba(255,255,255,0.07); –rule2:rgba(255,255,255,0.04);
/* 差し色 — ゴールド */
–gold:#c8a84a;
–gold-dim:rgba(200,168,74,0.18);
–gold-glow:rgba(200,168,74,0.08);
–bd-gold:rgba(200,168,74,0.22);    /* セクション枠 */
–bd-gold-s:rgba(200,168,74,0.12);  /* 薄め枠 */
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#000;color:#fff;font-family:‘Noto Sans JP’,sans-serif;line-height:1.8;overflow-x:hidden;padding-bottom:80px;}
a{text-decoration:none;color:inherit;}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:52px;background:rgba(0,0,0,0.94);backdrop-filter:blur(16px);border-bottom:1px solid var(–rule2);}
.nav-logo{font-family:‘Syne’,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.18em;}
.nav-logo em{color:var(–ice);font-style:normal;}
.nav-back{font-size:10px;letter-spacing:0.14em;color:var(–sub);cursor:pointer;display:none;align-items:center;gap:6px;}
.nav-back.show{display:flex;}
.nav-back svg{flex-shrink:0;}

/* ── FIXED CTA ── */
.fixed-cta{position:fixed;bottom:0;left:0;right:0;z-index:300;padding:10px 16px 14px;background:#000;border-top:1px solid var(–rule);opacity:0;pointer-events:none;transition:opacity .4s;}
.fixed-cta.show{opacity:1;pointer-events:all;}
.fixed-cta a{display:flex;align-items:center;justify-content:center;gap:8px;background:var(–yell);color:#000;font-weight:700;font-size:14px;letter-spacing:0.06em;padding:15px 24px;border-radius:4px;width:100%;max-width:480px;margin:0 auto;}

/* ── LAYOUT ── */
.wrap{max-width:680px;margin:0 auto;padding:0 24px;}
.rule-line{height:1px;background:var(–rule);}
.label{font-family:‘DM Mono’,monospace;font-size:9px;letter-spacing:0.4em;color:var(–sub);text-transform:uppercase;margin-bottom:40px;display:flex;align-items:center;gap:12px;}
.label::after{content:’’;flex:1;height:1px;background:var(–rule);}

/* ── REVEAL ── */
.r{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease;}
.r.on{opacity:1;transform:none;}
.r.d1{transition-delay:.1s;}.r.d2{transition-delay:.2s;}.r.d3{transition-delay:.3s;}

/* ============================================================
EXISTING LP SECTIONS (Hero, Services, Numbers, Scarcity, FAQ, Footer)
============================================================ */
/* HERO */
.hero{min-height:100svh;display:flex;flex-direction:column;justify-content:center;padding:120px 24px 80px;position:relative;overflow:hidden;}
.hero::before{content:’’;position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,0.018) 79px,rgba(255,255,255,0.018) 80px);pointer-events:none;}
.hero::after{content:’’;position:absolute;top:-120px;right:-60px;width:360px;height:360px;background:radial-gradient(circle,rgba(0,209,255,0.06) 0%,transparent 65%);pointer-events:none;}
.hero-eyebrow{font-family:‘DM Mono’,monospace;font-size:10px;letter-spacing:0.3em;color:var(–ice);margin-bottom:32px;}
.hero-h1{font-family:‘Syne’,sans-serif;font-size:clamp(2.6rem,9vw,5.2rem);font-weight:800;line-height:1.06;letter-spacing:-0.025em;color:#fff;margin-bottom:36px;max-width:640px;}
.hero-h1 em{font-style:normal;color:var(–ice);}
.hero-sub{font-size:15px;color:var(–sub);line-height:1.85;max-width:460px;margin-bottom:60px;}
.hero-scroll{display:flex;align-items:center;gap:10px;font-family:‘DM Mono’,monospace;font-size:9px;letter-spacing:0.25em;color:rgba(255,255,255,0.25);}
.hero-scroll-line{width:40px;height:1px;background:rgba(255,255,255,0.2);position:relative;overflow:hidden;}
.hero-scroll-line::after{content:’’;position:absolute;top:0;left:-100%;width:100%;height:100%;background:var(–ice);animation:slide-line 2s ease-in-out infinite;}
@keyframes slide-line{0%{left:-100%}100%{left:100%}}

/* SERVICES */
.services{padding:100px 0;}
.service-item{display:flex;align-items:baseline;padding:36px 24px;border-bottom:1px solid var(–bd-gold-s);position:relative;cursor:default;transition:background .25s;}
.service-item:first-of-type{border-top:2px solid var(–gold);}
.service-item:hover{background:rgba(255,255,255,0.02);}
.service-item::before{content:’’;position:absolute;left:0;top:50%;transform:translateY(-50%);width:2px;height:0;background:var(–ice);transition:height .3s ease;}
.service-item:hover::before{height:60%;}
.service-num{font-family:‘DM Mono’,monospace;font-size:10px;color:var(–sub);width:36px;flex-shrink:0;letter-spacing:0.1em;}
.service-title{font-family:‘Syne’,sans-serif;font-size:clamp(1.3rem,3.5vw,1.8rem);font-weight:700;color:#fff;letter-spacing:-0.01em;margin-bottom:6px;}
.service-desc{font-size:13px;color:var(–sub);line-height:1.7;max-width:480px;}
.service-tag{font-family:‘DM Mono’,monospace;font-size:9px;letter-spacing:0.15em;color:var(–ice);border:1px solid rgba(0,209,255,0.2);padding:3px 8px;border-radius:2px;flex-shrink:0;align-self:center;display:none;}
@media(min-width:600px){.service-tag{display:block;}}

/* NUMBERS */
.numbers{padding:120px 0;position:relative;overflow:hidden;}
.numbers-bg{position:absolute;inset:0;pointer-events:none;}
.numbers-bg svg{position:absolute;opacity:0.03;}
.numbers-item{padding:72px 24px;border-bottom:1px solid var(–bd-gold-s);position:relative;overflow:hidden;}
.numbers-item:first-child{border-top:2px solid var(–gold);}
.numbers-item:last-child{border-bottom:1px solid var(–bd-gold-s);}

.num-val{font-family:‘Syne’,sans-serif;font-size:clamp(5rem,20vw,12rem);font-weight:800;color:#fff;line-height:0.9;letter-spacing:-0.04em;margin-bottom:20px;opacity:0;transform:translateX(-16px);transition:opacity .8s ease,transform .8s ease;}
.num-val.on{opacity:1;transform:none;}
.num-val .accent{color:var(–ice);}
.num-val .yell{color:var(–yell);}
.num-label{font-size:16px;color:var(–sub);letter-spacing:0.04em;position:relative;z-index:1;}
.num-label strong{color:#fff;font-weight:700;margin-right:8px;}
.num-ghost{position:absolute;right:-20px;top:50%;transform:translateY(-50%);font-family:‘Syne’,sans-serif;font-size:clamp(8rem,30vw,20rem);font-weight:800;line-height:1;color:rgba(255,255,255,0.018);pointer-events:none;letter-spacing:-0.05em;user-select:none;}
.num-line{position:absolute;left:0;top:0;height:1px;width:0;background:var(–ice);transition:width 1s ease;}
.numbers-item.on .num-line{width:60px;}

/* SCARCITY */
.scarcity{padding:100px 0;}
.scarcity-heading{font-family:‘Syne’,sans-serif;font-size:clamp(1.1rem,3vw,1.5rem);font-weight:700;color:#fff;letter-spacing:-0.01em;max-width:480px;}
.slot-dot{width:10px;height:10px;border-radius:50%;}
.slot-dot.filled{background:var(–yell);}
.slot-dot.empty{background:rgba(255,255,255,0.12);}
.scarcity-note{font-family:‘DM Mono’,monospace;font-size:10px;letter-spacing:0.15em;color:var(–sub);margin-left:12px;}

/* FAQ */
footer{padding:60px 24px 40px;border-top:1px solid var(–rule);}
.footer-logo{font-family:‘Syne’,sans-serif;font-size:16px;font-weight:800;letter-spacing:0.14em;}
.footer-logo em{color:var(–ice);font-style:normal;}
.footer-copy{font-family:‘DM Mono’,monospace;font-size:10px;color:rgba(255,255,255,0.2);letter-spacing:0.1em;}

/* ============================================================
DEMO SECTION — NEW
============================================================ */
.demo{padding:100px 0;}

/* –– STEP INDICATOR –– */
.step-bar{display:flex;gap:0;margin-bottom:40px;}
/* ── ステップコンテナ：ゴールド枠 ── */
.step-container{
padding:28px 24px;
border:1px solid var(–bd-gold);
border-top:2px solid var(–gold);
border-radius:8px;
background:rgba(200,168,74,0.03);
position:relative;
}
.step-container::before{
content:’’;position:absolute;top:0;left:24px;right:24px;height:1px;
background:linear-gradient(90deg,transparent,rgba(200,168,74,0.3),transparent);
}
.step-item{flex:1;display:flex;flex-direction:column;gap:6px;cursor:default;}
.step-num{font-family:‘DM Mono’,monospace;font-size:9px;letter-spacing:0.2em;color:rgba(160,160,160,0.35);}
.step-num.active{color:var(–ice);}
.step-line{height:1px;background:rgba(255,255,255,0.08);}
.step-line.active{background:var(–ice);}
.step-name{font-size:11px;color:rgba(160,160,160,0.35);letter-spacing:0.04em;}
.step-name.active{color:var(–sub);}

/* –– INPUT FIELDS –– */
.field-group{margin-bottom:28px;}
.field-label{font-family:‘DM Mono’,monospace;font-size:9px;letter-spacing:0.3em;color:rgba(160,160,160,0.5);text-transform:uppercase;margin-bottom:10px;display:block;}
.field-input{width:100%;background:rgba(200,168,74,0.03);border:1px solid var(–bd-gold);border-radius:4px;color:#fff;font-family:‘Noto Sans JP’,sans-serif;font-size:15px;padding:14px 18px;outline:none;transition:border-color .2s,background .2s;}
.field-input::placeholder{color:rgba(255,255,255,0.18);}
.field-input:focus{border-color:var(–gold);background:rgba(200,168,74,0.06);}

/* –– COLOR PALETTE –– */
.color-grid{display:flex;flex-wrap:wrap;gap:10px;}
.color-swatch{
width:44px;height:44px;border-radius:6px;cursor:pointer;
border:2px solid transparent;transition:transform .15s,border-color .15s;
position:relative;flex-shrink:0;
}
.color-swatch:hover{transform:scale(1.08);}
.color-swatch.selected{border-color:#fff;}
.color-swatch.selected::after{content:‘✓’;position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;text-shadow:0 0 4px rgba(0,0,0,0.8);}

/* –– TYPE SELECT –– */
.type-grid{display:flex;flex-direction:column;gap:8px;}
.type-option{
display:flex;align-items:center;gap:14px;padding:14px 18px;
border:1px solid var(–bd-gold-s);border-radius:4px;cursor:pointer;transition:all .2s;
background:rgba(200,168,74,0.02);
}
.type-option:hover{border-color:var(–bd-gold);background:rgba(200,168,74,0.05);}
.type-option.selected{border-color:var(–gold);background:rgba(200,168,74,0.08);}
.type-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.type-name{font-size:14px;font-weight:700;color:#fff;}
.type-desc{font-size:11px;color:var(–sub);margin-top:2px;}
.type-badge{margin-left:auto;font-family:‘DM Mono’,monospace;font-size:9px;letter-spacing:0.12em;color:var(–ice);border:1px solid rgba(0,209,255,0.2);padding:2px 8px;border-radius:2px;}

/* –– LAYOUT SELECT –– */
.layout-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.layout-option{
border:1px solid var(–bd-gold-s);border-radius:6px;padding:16px 14px;cursor:pointer;transition:all .2s;
background:rgba(200,168,74,0.02);
}
.layout-option:hover{border-color:var(–bd-gold);background:rgba(200,168,74,0.05);}
.layout-option.selected{border-color:var(–gold);background:rgba(200,168,74,0.08);}
.layout-thumb{height:60px;margin-bottom:10px;border-radius:3px;overflow:hidden;background:#111;position:relative;}
.layout-name{font-size:12px;font-weight:700;color:#fff;}
.layout-sub{font-size:10px;color:var(–sub);margin-top:2px;}

/* –– NEXT BTN –– */
.next-btn{display:flex;align-items:center;justify-content:center;gap:9px;background:var(–yell);color:#000;font-weight:700;font-size:14px;letter-spacing:0.06em;padding:16px 32px;border-radius:4px;border:none;cursor:pointer;width:100%;margin-top:32px;font-family:‘Noto Sans JP’,sans-serif;transition:opacity .2s;}
.next-btn:hover{opacity:0.9;}
.back-link{display:flex;align-items:center;gap:6px;font-size:11px;color:var(–sub);cursor:pointer;margin-top:16px;justify-content:center;background:none;border:none;font-family:‘Noto Sans JP’,sans-serif;}
.back-link:hover{color:#fff;}

/* ── 詳細設定アコーディオン ── */
.detail-toggle{
display:flex;align-items:center;justify-content:space-between;
width:100%;background:transparent;border:1px solid var(–bd-gold-s);
border-radius:6px;padding:12px 16px;cursor:pointer;
font-family:‘DM Mono’,monospace;font-size:10px;letter-spacing:0.18em;
color:rgba(200,168,74,0.7);text-transform:uppercase;
margin-top:24px;transition:all .2s;
}
.detail-toggle:hover{border-color:var(–bd-gold);background:rgba(200,168,74,0.03);}
.detail-toggle.open{border-color:var(–gold);background:rgba(200,168,74,0.05);}
.detail-toggle svg{transition:transform .3s;}
.detail-toggle.open svg{transform:rotate(180deg);}
.detail-body{
display:none;
border:1px solid var(–bd-gold-s);border-top:none;
border-radius:0 0 6px 6px;
padding:20px 20px 8px;
background:rgba(200,168,74,0.02);
margin-top:-2px;
}
.detail-body.open{display:block;}
.detail-section-title{
font-family:‘DM Mono’,monospace;font-size:8px;letter-spacing:0.3em;
color:rgba(200,168,74,0.45);text-transform:uppercase;
margin:16px 0 10px;padding-bottom:6px;
border-bottom:1px solid var(–bd-gold-s);
}
.detail-section-title:first-child{margin-top:0;}
.detail-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.field-textarea{
width:100%;background:rgba(200,168,74,0.03);border:1px solid var(–bd-gold);
border-radius:4px;color:#fff;font-family:‘Noto Sans JP’,sans-serif;
font-size:13px;padding:12px 16px;outline:none;resize:vertical;min-height:80px;
line-height:1.7;transition:border-color .2s,background .2s;
}
.field-textarea::placeholder{color:rgba(255,255,255,0.18);}
.field-textarea:focus{border-color:var(–gold);background:rgba(200,168,74,0.06);}
@media(max-width:640px){.detail-row{grid-template-columns:1fr;}}
@keyframes pulse-gold{
0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(200,168,74,0.5);}
50%{opacity:0.5;box-shadow:0 0 0 6px rgba(200,168,74,0);}
}
.back-link:hover{color:#fff;}

/* –– LOADING –– */
.demo-loading{display:none;flex-direction:column;align-items:center;gap:20px;padding:60px 0;text-align:center;}
.demo-loading.active{display:flex;}
.loading-bar-wrap{width:200px;height:1px;background:rgba(255,255,255,0.08);position:relative;overflow:hidden;}
.loading-bar{position:absolute;top:0;left:-100%;height:100%;background:linear-gradient(90deg,transparent,var(–ice),transparent);animation:loading-sweep 1.4s ease-in-out infinite;}
@keyframes loading-sweep{0%{left:-100%}100%{left:100%}}
.loading-steps{display:flex;flex-direction:column;gap:6px;margin-top:12px;}
.loading-step{font-family:‘DM Mono’,monospace;font-size:9px;letter-spacing:0.18em;color:rgba(160,160,160,0.3);transition:color .4s;}
.loading-step.done{color:rgba(0,209,255,0.6);}

/* ============================================================
iPHONE MOCKUP
============================================================ */
.mockup-outer{display:none;flex-direction:column;align-items:center;margin-top:40px;animation:fadeInUp .5s ease;}
.mockup-outer.active{display:flex;}
@keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.iphone-frame{
width:320px;
border-radius:44px;
border:2px solid var(–bd-gold);
background:#0a0a0a;
overflow:hidden;
position:relative;
box-shadow:0 0 0 1px rgba(200,168,74,0.08),0 40px 80px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.04);
}
.iphone-island{
position:absolute;top:10px;left:50%;transform:translateX(-50%);
width:100px;height:28px;background:#000;border-radius:20px;z-index:20;
pointer-events:none;
}
.iphone-screen{
height:620px;
overflow-y:auto;overflow-x:hidden;
scrollbar-width:none;
padding-top:0;  /* ← ナビはコンテンツ内に含めるのでpadding不要 */
position:relative;
}
.iphone-screen::-webkit-scrollbar{display:none;}

/* –– GENERATED SITE STYLES –– */
/* Hero */
.gs-hero{min-height:300px;display:flex;flex-direction:column;justify-content:flex-end;padding:28px 22px 28px;position:relative;overflow:hidden;}
.gs-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:40px;position:relative;z-index:1;}
.gs-nav-logo{font-family:‘Syne’,sans-serif;font-size:12px;font-weight:800;letter-spacing:0.08em;}
.gs-nav-cta{font-size:9px;padding:4px 10px;border-radius:3px;font-weight:700;}
.gs-eyebrow{font-family:‘DM Mono’,monospace;font-size:8px;letter-spacing:0.2em;margin-bottom:12px;position:relative;z-index:1;}
.gs-h1{font-family:‘Syne’,sans-serif;font-size:clamp(1.2rem,4.5vw,1.6rem);font-weight:800;line-height:1.12;letter-spacing:-0.02em;color:#fff;position:relative;z-index:1;margin-bottom:12px;}
.gs-subh{font-size:10px;line-height:1.7;position:relative;z-index:1;}
/* About */
.gs-section{padding:24px 22px;border-top:1px solid rgba(255,255,255,0.07);}
.gs-section-label{font-family:‘DM Mono’,monospace;font-size:7px;letter-spacing:0.35em;text-transform:uppercase;margin-bottom:12px;}
.gs-section-title{font-family:‘Syne’,sans-serif;font-size:15px;font-weight:700;color:#fff;line-height:1.2;margin-bottom:10px;}
.gs-section-body{font-size:10px;line-height:1.75;}
/* Services */
.gs-service{padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;gap:10px;}
.gs-service:last-child{border-bottom:none;}
.gs-service-bar{width:2px;flex-shrink:0;margin-top:2px;border-radius:1px;}
.gs-service-name{font-size:12px;font-weight:700;color:#fff;margin-bottom:2px;font-family:‘Syne’,sans-serif;}
.gs-service-desc{font-size:9px;line-height:1.6;}
/* CTA */
.gs-cta{padding:28px 22px;text-align:center;}
.gs-cta-head{font-family:‘Syne’,sans-serif;font-size:14px;font-weight:700;color:#fff;margin-bottom:6px;line-height:1.3;}
.gs-cta-sub{font-size:10px;margin-bottom:18px;line-height:1.6;}
.gs-cta-btn{display:block;font-weight:700;font-size:12px;padding:13px;border-radius:4px;text-align:center;font-family:‘Noto Sans JP’,sans-serif;}
/* Footer */
.gs-footer{padding:18px 22px;border-top:1px solid rgba(255,255,255,0.06);}
.gs-footer-name{font-family:‘Syne’,sans-serif;font-size:10px;font-weight:700;margin-bottom:4px;}
.gs-footer-copy{font-size:8px;color:#333;}

/* –– MOCKUP ACTIONS –– */
.mockup-actions{display:flex;flex-direction:column;gap:12px;margin-top:28px;width:320px;}
.btn-retry{display:flex;align-items:center;justify-content:center;gap:8px;border:1px solid var(–rule);color:var(–sub);font-size:12px;letter-spacing:0.06em;padding:12px 24px;border-radius:4px;cursor:pointer;background:transparent;font-family:‘Noto Sans JP’,sans-serif;transition:all .2s;width:100%;}
.btn-retry:hover{border-color:rgba(255,255,255,0.2);color:#fff;}
.btn-consult{display:flex;align-items:center;justify-content:center;gap:8px;background:var(–yell);color:#000;font-weight:700;font-size:13px;letter-spacing:0.05em;padding:14px 24px;border-radius:4px;border:none;cursor:pointer;font-family:‘Noto Sans JP’,sans-serif;transition:opacity .2s;width:100%;}
.btn-consult:hover{opacity:0.9;}
.mockup-note{font-family:‘DM Mono’,monospace;font-size:9px;letter-spacing:0.12em;color:rgba(160,160,160,0.3);text-align:center;margin-top:4px;}

/* ============================================================
RESPONSIVE
============================================================ */
@media(max-width:640px){
nav{padding:0 16px;}
.hero{padding:100px 20px 72px;}
.services{padding:72px 0;}
.service-item{padding:28px 20px;}
.numbers-item{padding:56px 20px;}
.numbers{padding:80px 0;}
.scarcity{padding:72px 0;}
.wrap{padding:0 20px;}
.demo{padding:72px 0;}
footer{padding:48px 20px 32px;}
.iphone-frame{width:280px;}
.mockup-actions{width:280px;}
.layout-grid{grid-template-columns:1fr;}
}
`;

const HTML_CONTENT = `<!-- NAV -->

<nav>
  <div class="nav-logo"><em>NEXT</em>GAME</div>
  <button class="nav-back" id="navBack" onclick="resetDemo()">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    最初からやり直す
  </button>
  <div class="nav-links" id="navLinks" style="display:flex;gap:24px;align-items:center;">
    <a href="#services" style="font-size:10px;letter-spacing:0.14em;color:var(--sub);text-transform:uppercase;">Service</a>
    <a href="#numbers" style="font-size:10px;letter-spacing:0.14em;color:var(--sub);text-transform:uppercase;">Numbers</a>
    <a href="https://lin.ee/SJDJXQv" target="_blank" style="font-size:10px;letter-spacing:0.14em;color:var(--yell);border-bottom:1px solid rgba(255,214,0,.35);padding-bottom:1px;text-transform:uppercase;">Contact</a>
  </div>
</nav>

<!-- HERO -->

<section class="hero" id="hero">
  <div class="wrap">
    <p class="hero-eyebrow r">NEXTGAME Inc. — AI × Web Strategy</p>
    <h1 class="hero-h1 r d1">"作る"ではなく、<br><em>"勝たせる"</em><br>Webへ。</h1>
    <p class="hero-sub r d2">AI × 戦略 × デザインで、<br>成果に直結するサイトを。</p>
    <div class="hero-scroll r d3"><span class="hero-scroll-line"></span><span>scroll</span></div>
  </div>
</section>
<div class="rule-line"></div>

<!-- SERVICES -->

<section class="services" id="services">
  <div class="wrap"><div class="label r">01 — Services</div></div>
  <div style="max-width:1000px;margin:0 auto;padding:0 24px;">
    <div class="service-item r"><span class="service-num">01</span><div><div class="service-title">AI Web制作</div><div class="service-desc">LLMを設計の核に据えた、成果最優先のLP・コーポレートサイト。初期費用なし、運用まで一貫して担います。</div></div><span class="service-tag">制作費0円</span></div>
    <div class="service-item r d1"><span class="service-num">02</span><div><div class="service-title">SEO / MEO対策</div><div class="service-desc">検索・地図からの流入を設計段階から最適化。コンテンツ戦略・構造改善・継続モニタリングまで。</div></div><span class="service-tag">月次改善</span></div>
    <div class="service-item r d2"><span class="service-num">03</span><div><div class="service-title">運用・改善支援</div><div class="service-desc">公開後のデータを読み、毎月改善を重ねます。CV率・直帰率・滞在時間を継続的に最適化。</div></div><span class="service-tag">伴走型</span></div>
  </div>
</section>
<div class="rule-line"></div>

<!-- ============================================================
     DEMO — 4STEPフォーム → iPhone Preview
     ============================================================ -->

<section class="demo" id="demo">
  <div class="wrap">
    <div class="label r">02 — Demo</div>
    <h2 class="r" style="font-family:'Syne',sans-serif;font-size:clamp(1.6rem,5vw,2.4rem);font-weight:800;line-height:1.15;letter-spacing:-0.02em;margin-bottom:16px;">
      情報を入れるだけで、<br>完成したサイトが現れる。
    </h2>
    <p class="r d1" style="font-size:14px;color:var(--sub);line-height:1.85;margin-bottom:44px;">屋号・業種・カラー・レイアウトを入力するだけ。<br>そのまま使えるレベルのサイトが、その場で完成します。</p>

```
<!-- STEP INDICATOR -->
<div class="step-bar r d1" id="stepBar">
  <div class="step-item"><div class="step-num active" id="sn1">STEP 01</div><div class="step-line active" id="sl1"></div><div class="step-name active" id="st1">基本情報</div></div>
  <div class="step-item"><div class="step-num" id="sn2">STEP 02</div><div class="step-line" id="sl2"></div><div class="step-name" id="st2">カラー</div></div>
  <div class="step-item"><div class="step-num" id="sn3">STEP 03</div><div class="step-line" id="sl3"></div><div class="step-name" id="st3">サイト種別</div></div>
  <div class="step-item"><div class="step-num" id="sn4">STEP 04</div><div class="step-line" id="sl4"></div><div class="step-name" id="st4">レイアウト</div></div>
</div>

<!-- ============ STEP 1: 基本情報 ============ -->
<div id="step1" class="step-container">
  <div class="field-group r d2">
    <label class="field-label">屋号 / 会社名 *</label>
    <input class="field-input" id="f_name" type="text" placeholder="例：山田整体院 / 鈴木美容室 / ABC株式会社">
  </div>
  <div class="field-group r d2">
    <label class="field-label">業種 / 事業内容 *</label>
    <input class="field-input" id="f_industry" type="text" placeholder="例：整体院 / ネイルサロン / 不動産会社">
  </div>
  <div class="field-group r d2">
    <label class="field-label">キャッチコピー（任意・空欄で自動生成）</label>
    <input class="field-input" id="f_catch" type="text" placeholder="例：地域No.1の施術を、あなたのもとへ。">
  </div>
  <div class="field-group r d2">
    <label class="field-label">電話番号 / 連絡先（任意）</label>
    <input class="field-input" id="f_contact" type="text" placeholder="例：052-xxx-xxxx">
  </div>

  <!-- ロゴ画像アップロード -->
  <div class="field-group r d2">
    <label class="field-label">ロゴ画像（任意）</label>
    <label id="logoDropZone" style="
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;
      border:1px dashed var(--bd-gold);border-radius:6px;
      padding:22px 16px;cursor:pointer;
      background:rgba(200,168,74,0.02);
      transition:all .2s;
    "
    onclick="document.getElementById('logoFileInput').click()"
    ondragover="event.preventDefault();this.style.borderColor='var(--gold)';this.style.background='rgba(200,168,74,0.06)'"
    ondragleave="this.style.borderColor='var(--bd-gold)';this.style.background='rgba(200,168,74,0.02)'"
    ondrop="handleLogoDrop(event)"
    >
      <div id="logoPreviewWrap" style="display:none;position:relative;">
        <img id="logoPreviewImg" style="max-height:56px;max-width:180px;border-radius:4px;object-fit:contain;" alt="logo">
        <button onclick="clearLogo(event)" style="
          position:absolute;top:-8px;right:-8px;
          width:20px;height:20px;border-radius:50%;
          background:#333;border:1px solid #555;color:#aaa;
          font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;
        ">✕</button>
      </div>
      <div id="logoPlaceholder" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,74,0.5)" stroke-width="1.5" stroke-linecap="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span style="font-size:12px;color:rgba(200,168,74,0.6);">クリックまたはドラッグ＆ドロップ</span>
        <span style="font-size:10px;color:var(--t4);">PNG / JPG / SVG — 推奨サイズ 200×60px以上</span>
      </div>
      <input type="file" id="logoFileInput" accept="image/*" style="display:none;" onchange="handleLogoFile(this)">
    </label>
  </div>

  <!-- ── 詳細設定アコーディオン ── -->
  <button class="detail-toggle r d2" id="detailToggle" onclick="toggleDetail()">
    <span>詳細設定（任意）</span>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
  </button>
  <div class="detail-body" id="detailBody">

    <!-- サービス内容 -->
    <div class="detail-section-title">サービス内容</div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <div>
        <label class="field-label" style="margin-bottom:6px;display:block;">サービス①（名前）</label>
        <div class="detail-row">
          <input class="field-input" id="d_svc1_name" type="text" placeholder="例：骨格矯正">
          <input class="field-input" id="d_svc1_desc" type="text" placeholder="例：歪みを整え、慢性的な痛みを改善します。">
        </div>
      </div>
      <div>
        <label class="field-label" style="margin-bottom:6px;display:block;">サービス②（名前）</label>
        <div class="detail-row">
          <input class="field-input" id="d_svc2_name" type="text" placeholder="例：もみほぐし">
          <input class="field-input" id="d_svc2_desc" type="text" placeholder="例：日々の疲れとコリをしっかりほぐします。">
        </div>
      </div>
      <div>
        <label class="field-label" style="margin-bottom:6px;display:block;">サービス③（名前）</label>
        <div class="detail-row">
          <input class="field-input" id="d_svc3_name" type="text" placeholder="例：スポーツケア">
          <input class="field-input" id="d_svc3_desc" type="text" placeholder="例：パフォーマンス向上と怪我予防をサポート。">
        </div>
      </div>
    </div>

    <!-- お店のこだわり・強み -->
    <div class="detail-section-title">お店のこだわり・強み（Aboutセクションに反映）</div>
    <textarea class="field-textarea" id="d_about" placeholder="例：当院は開業15年。地域の方々に信頼いただいてきた整体院です。国家資格保持のスタッフが丁寧に施術します。"></textarea>

    <!-- 営業情報 -->
    <div class="detail-section-title">営業情報</div>
    <div class="detail-row">
      <div>
        <label class="field-label" style="margin-bottom:6px;display:block;">営業時間</label>
        <input class="field-input" id="d_hours" type="text" placeholder="例：10:00〜20:00">
      </div>
      <div>
        <label class="field-label" style="margin-bottom:6px;display:block;">定休日</label>
        <input class="field-input" id="d_holiday" type="text" placeholder="例：毎週火曜日">
      </div>
    </div>

    <!-- 住所・アクセス -->
    <div class="detail-section-title">住所・アクセス</div>
    <input class="field-input" id="d_address" type="text" placeholder="例：名古屋市中区錦1-2-3 ○○ビル2F（地下鉄栄駅 徒歩3分）" style="margin-bottom:10px;">

    <!-- 料金 -->
    <div class="detail-section-title">料金・プラン</div>
    <textarea class="field-textarea" id="d_price" placeholder="例：初回体験 3,000円 / 60分コース 6,000円 / 90分コース 8,500円" style="min-height:64px;"></textarea>

    <!-- SNS・予約URL -->
    <div class="detail-section-title">SNS・予約サイトURL</div>
    <div class="detail-row">
      <input class="field-input" id="d_instagram" type="text" placeholder="Instagram URL">
      <input class="field-input" id="d_booking" type="text" placeholder="予約サイト URL">
    </div>
    <div style="height:16px;"></div>

  </div><!-- /detail-body -->

  <button class="next-btn r d3" onclick="goStep(2)">
    次へ — カラーを選ぶ
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </button>
</div>

<!-- ============ STEP 2: カラー選択 ============ -->
<div id="step2" class="step-container" style="display:none;">
  <div class="field-group r">
    <label class="field-label">メインカラーを選択</label>
    <div class="color-grid" id="colorGrid">
      <!-- swatches injected by JS -->
    </div>
  </div>
  <div class="field-group r d1" id="colorPreviewWrap" style="margin-top:20px;">
    <label class="field-label">選択中のカラー</label>
    <div style="display:flex;align-items:center;gap:12px;padding:14px 18px;border:1px solid var(--rule);border-radius:4px;">
      <div id="colorPreviewBox" style="width:36px;height:36px;border-radius:6px;flex-shrink:0;"></div>
      <div>
        <div id="colorPreviewName" style="font-size:13px;font-weight:700;color:#fff;margin-bottom:2px;"></div>
        <div id="colorPreviewHex" style="font-family:'DM Mono',monospace;font-size:10px;color:var(--sub);letter-spacing:0.1em;"></div>
      </div>
    </div>
  </div>
  <button class="next-btn r d2" onclick="goStep(3)">
    次へ — サイト種別を選ぶ
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </button>
  <button class="back-link" onclick="goStep(1)">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    戻る
  </button>
</div>

<!-- ============ STEP 3: サイト種別 ============ -->
<div id="step3" class="step-container" style="display:none;">
  <div class="field-group r">
    <label class="field-label">サイトの種類を選択</label>
    <div class="type-grid" id="typeGrid">
      <div class="type-option selected" data-type="lp" onclick="selectType(this,'lp')">
        <div class="type-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
        <div><div class="type-name">LP（ランディングページ）</div><div class="type-desc">問い合わせ・予約・購入に特化した1ページ構成</div></div>
        <span class="type-badge">おすすめ</span>
      </div>
      <div class="type-option" data-type="corporate" onclick="selectType(this,'corporate')">
        <div class="type-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
        <div><div class="type-name">コーポレートサイト</div><div class="type-desc">会社・サービス・採用情報を網羅した多ページ構成</div></div>
      </div>
      <div class="type-option" data-type="ec" onclick="selectType(this,'ec')">
        <div class="type-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg></div>
        <div><div class="type-name">ECサイト</div><div class="type-desc">商品販売・カート機能を持つ通販サイト</div></div>
      </div>
      <div class="type-option" data-type="recruit" onclick="selectType(this,'recruit')">
        <div class="type-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg></div>
        <div><div class="type-name">採用サイト</div><div class="type-desc">求人・採用情報に特化した応募促進サイト</div></div>
      </div>
      <div class="type-option" data-type="portfolio" onclick="selectType(this,'portfolio')">
        <div class="type-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
        <div><div class="type-name">ポートフォリオ</div><div class="type-desc">実績・作品を魅せるブランドサイト</div></div>
      </div>
    </div>
  </div>
  <button class="next-btn r d1" onclick="goStep(4)">
    次へ — レイアウトを選ぶ
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </button>
  <button class="back-link" onclick="goStep(2)">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    戻る
  </button>
</div>

<!-- ============ STEP 4: レイアウト ============ -->
<div id="step4" class="step-container" style="display:none;">
  <div class="field-group r">
    <label class="field-label">レイアウトスタイルを選択</label>
    <div class="layout-grid" id="layoutGrid">

      <div class="layout-option selected" data-layout="minimal" onclick="selectLayout(this,'minimal')">
        <div class="layout-thumb" id="lt_minimal">
          <!-- SVG thumbnail -->
          <svg viewBox="0 0 120 60" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="60" fill="#111"/>
            <rect x="10" y="8" width="50" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>
            <rect x="10" y="18" width="35" height="3" rx="1" fill="rgba(255,255,255,0.15)"/>
            <rect x="10" y="28" width="40" height="3" rx="1" fill="rgba(255,255,255,0.1)"/>
            <rect x="10" y="34" width="30" height="3" rx="1" fill="rgba(255,255,255,0.1)"/>
            <rect x="10" y="46" width="22" height="7" rx="2" class="accent-fill"/>
          </svg>
        </div>
        <div class="layout-name">ミニマル</div>
        <div class="layout-sub">余白重視・高級感・文字で魅せる</div>
      </div>

      <div class="layout-option" data-layout="bold" onclick="selectLayout(this,'bold')">
        <div class="layout-thumb">
          <svg viewBox="0 0 120 60" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="60" fill="#111"/>
            <rect width="120" height="28" class="accent-fill" opacity="0.2"/>
            <rect x="10" y="6" width="60" height="10" rx="2" fill="rgba(255,255,255,0.8)"/>
            <rect x="10" y="20" width="40" height="4" rx="1" fill="rgba(255,255,255,0.3)"/>
            <rect x="10" y="34" width="100" height="1" fill="rgba(255,255,255,0.06)"/>
            <rect x="10" y="40" width="45" height="3" rx="1" fill="rgba(255,255,255,0.15)"/>
            <rect x="10" y="46" width="30" height="3" rx="1" fill="rgba(255,255,255,0.1)"/>
          </svg>
        </div>
        <div class="layout-name">ボールド</div>
        <div class="layout-sub">インパクト重視・強い印象を残す</div>
      </div>

      <div class="layout-option" data-layout="warm" onclick="selectLayout(this,'warm')">
        <div class="layout-thumb">
          <svg viewBox="0 0 120 60" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="60" fill="#0d0a08"/>
            <circle cx="85" cy="20" r="18" fill="rgba(255,200,100,0.06)"/>
            <rect x="10" y="8" width="40" height="8" rx="2" fill="rgba(255,255,255,0.5)"/>
            <rect x="10" y="20" width="55" height="3" rx="1" fill="rgba(255,255,255,0.15)"/>
            <rect x="10" y="26" width="48" height="3" rx="1" fill="rgba(255,255,255,0.1)"/>
            <rect x="10" y="38" width="45" height="3" rx="1" fill="rgba(255,255,255,0.08)"/>
            <rect x="10" y="44" width="35" height="3" rx="1" fill="rgba(255,255,255,0.08)"/>
            <rect x="10" y="50" width="18" height="6" rx="2" fill="rgba(255,214,0,0.6)"/>
          </svg>
        </div>
        <div class="layout-name">ウォーム</div>
        <div class="layout-sub">親しみやすさ・温かみのある設計</div>
      </div>

      <div class="layout-option" data-layout="tech" onclick="selectLayout(this,'tech')">
        <div class="layout-thumb">
          <svg viewBox="0 0 120 60" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="60" fill="#080e14"/>
            <line x1="0" y1="15" x2="120" y2="15" stroke="rgba(0,209,255,0.08)" stroke-width="0.5"/>
            <line x1="0" y1="30" x2="120" y2="30" stroke="rgba(0,209,255,0.08)" stroke-width="0.5"/>
            <line x1="0" y1="45" x2="120" y2="45" stroke="rgba(0,209,255,0.08)" stroke-width="0.5"/>
            <line x1="30" y1="0" x2="30" y2="60" stroke="rgba(0,209,255,0.05)" stroke-width="0.5"/>
            <line x1="60" y1="0" x2="60" y2="60" stroke="rgba(0,209,255,0.05)" stroke-width="0.5"/>
            <line x1="90" y1="0" x2="90" y2="60" stroke="rgba(0,209,255,0.05)" stroke-width="0.5"/>
            <rect x="10" y="8" width="55" height="8" rx="1" fill="rgba(255,255,255,0.6)"/>
            <rect x="10" y="20" width="35" height="2" rx="1" fill="rgba(0,209,255,0.4)"/>
            <rect x="10" y="26" width="50" height="2" rx="1" fill="rgba(255,255,255,0.12)"/>
            <rect x="10" y="46" width="20" height="6" rx="1" fill="rgba(0,209,255,0.3)"/>
          </svg>
        </div>
        <div class="layout-name">テック</div>
        <div class="layout-sub">先進性・近未来感・グリッド設計</div>
      </div>

    </div>
  </div>

  <button class="next-btn r d1" id="generateBtn" onclick="startGenerate()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
    サイトを完成させる
  </button>
  <button class="back-link" onclick="goStep(3)">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    戻る
  </button>
</div>

<!-- ローディング -->
<div class="demo-loading" id="demoLoading">
  <div class="loading-bar-wrap"><div class="loading-bar"></div></div>
  <div class="loading-steps">
    <div class="loading-step" id="ls1">屋号・業種を解析しています…</div>
    <div class="loading-step" id="ls2">カラーパレットを適用しています…</div>
    <div class="loading-step" id="ls3">レイアウトを構成しています…</div>
    <div class="loading-step" id="ls4">コピーを最適化しています…</div>
    <div class="loading-step" id="ls5">サイトが完成しました。</div>
  </div>
</div>

<!-- iPhone プレビュー -->
<div class="mockup-outer" id="mockupOuter">
  <div class="iphone-frame">
    <div class="iphone-island"></div>
    <div class="iphone-screen" id="iphoneScreen">
      <!-- 動的生成 -->
    </div>
  </div>
  <div class="mockup-actions">
    <!-- AI指示ボックス -->
    <div id="aiPromptBox" style="width:100%;">
      <div style="
        font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.2em;
        color:rgba(200,168,74,0.65);text-transform:uppercase;margin-bottom:8px;
        display:flex;align-items:center;gap:7px;
      ">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="opacity:0.65;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        AIに修正を依頼する
      </div>
      <div style="display:flex;gap:8px;align-items:flex-end;">
        <textarea
          id="aiPromptInput"
          placeholder="例：CTAボタンを「今すぐ予約する」に変えて&#10;例：Aboutをもっと柔らかい文体に&#10;例：料金セクションを追加して"
          style="
            flex:1;min-height:72px;resize:none;
            background:rgba(200,168,74,0.04);
            border:1px solid var(--bd-gold);
            border-radius:6px;color:#fff;
            font-family:'Noto Sans JP',sans-serif;
            font-size:12px;padding:10px 12px;
            outline:none;line-height:1.7;
            transition:border-color .2s;
          "
          onfocus="this.style.borderColor='var(--gold)'"
          onblur="this.style.borderColor='var(--bd-gold)'"
          onkeydown="if((e=event).key==='Enter'&&(e.metaKey||e.ctrlKey))applyAiPrompt()"
        ></textarea>
        <button
          id="aiSendBtn"
          onclick="applyAiPrompt()"
          style="
            flex-shrink:0;width:40px;height:40px;
            background:var(--gold);border:none;border-radius:6px;
            cursor:pointer;display:flex;align-items:center;justify-content:center;
            transition:opacity .2s;
          "
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
      <p style="font-size:10px;color:var(--t4);margin-top:6px;letter-spacing:0.04em;">⌘+Enter で送信</p>
      <!-- AI処理中インジケーター -->
      <div id="aiStatus" style="display:none;margin-top:10px;display:none;align-items:center;gap:8px;padding:8px 12px;background:rgba(200,168,74,0.05);border:1px solid var(--bd-gold-s);border-radius:4px;">
        <div style="width:6px;height:6px;border-radius:50%;background:var(--gold);animation:pulse-gold 1.2s ease-in-out infinite;flex-shrink:0;"></div>
        <span id="aiStatusText" style="font-family:'DM Mono',monospace;font-size:9px;color:rgba(200,168,74,0.7);letter-spacing:0.12em;">AIが修正しています…</span>
      </div>
    </div>

    <button class="btn-retry" id="btnRetry" onclick="retryGenerate()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
      別パターンを見る
    </button>
    <a href="https://lin.ee/SJDJXQv" target="_blank" class="btn-consult">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="black"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>
      この内容で相談する
    </a>
    <p class="mockup-note">完成サイトのイメージです</p>
  </div>
</div>
```

  </div><!-- /wrap -->
</section>
<div class="rule-line"></div>

<!-- NUMBERS -->

<section class="numbers" id="numbers">
  <div class="numbers-bg">
    <svg style="top:-40px;right:-80px;width:500px;height:500px;" viewBox="0 0 500 500" fill="none"><circle cx="250" cy="250" r="200" stroke="white" stroke-width="0.5"/><circle cx="250" cy="250" r="150" stroke="white" stroke-width="0.3"/><line x1="50" y1="250" x2="450" y2="250" stroke="white" stroke-width="0.3"/><line x1="250" y1="50" x2="250" y2="450" stroke="white" stroke-width="0.3"/></svg>
  </div>
  <div class="wrap"><div class="label r">03 — Results</div></div>
  <div class="numbers-item" data-num="98" id="num1"><div class="num-line"></div><div class="num-ghost">98</div><div class="wrap"><div class="num-val"><span class="count-num">98</span><span class="accent">%</span></div><div class="num-label"><strong>顧客満足度</strong>継続パートナーからの評価スコア</div></div></div>
  <div class="numbers-item" data-num="3" id="num2"><div class="num-line"></div><div class="num-ghost">3×</div><div class="wrap"><div class="num-val"><span class="count-num">3</span><span class="yell">×</span></div><div class="num-label"><strong>CV改善率</strong>平均的な施策開始後3ヶ月の成果</div></div></div>
  <div class="numbers-item" id="num3"><div class="num-line"></div><div class="num-ghost" style="font-size:clamp(5rem,18vw,14rem);">7</div><div class="wrap"><div class="num-val" style="font-size:clamp(5rem,18vw,10rem);">最短<span class="accent">7</span><span style="font-size:0.45em;color:var(--sub);">日</span></div><div class="num-label"><strong>納品スピード</strong>LP1枚、企画から公開まで</div></div></div>
</section>
<div class="rule-line"></div>

<!-- SCARCITY -->

<section class="scarcity"><div class="wrap"><div class="label r">04 — Availability</div><div style="display:flex;flex-direction:column;gap:28px;"><div class="scarcity-heading r">新規パートナーシップは、<br>月に3社まで。</div><div class="r d1"><div style="display:flex;gap:8px;align-items:center;"><span class="slot-dot filled"></span><span class="slot-dot filled"></span><span class="slot-dot empty"></span><span class="slot-dot empty"></span><span class="slot-dot empty"></span><span class="slot-dot empty"></span><span class="scarcity-note">1 / 3 受付中</span></div></div><p class="r d2" style="font-size:13px;color:var(--sub);line-height:1.75;max-width:420px;">1社1社と本気で向き合うために、受付数を絞っています。<br>現在は新規のご相談を承っております。</p></div></div></section>
<div class="rule-line"></div>

<!-- FAQ -->

<section style="padding:100px 0;" id="faq"><div class="wrap"><div class="label r">05 — FAQ</div><div style="display:flex;flex-direction:column;gap:8px;border:1px solid var(--bd-gold);border-top:2px solid var(--gold);border-radius:8px;overflow:hidden;padding:0 4px;background:rgba(200,168,74,0.02);"><div class="r" style="padding:24px 20px;border-bottom:1px solid var(--bd-gold-s);"><p style="font-size:14px;font-weight:700;color:#fff;margin-bottom:10px;">制作費が本当に0円なのですか？</p><p style="font-size:13px;color:var(--sub);line-height:1.8;">はい。月額サブスクを前提に、制作費はいただいていません。</p></div><div class="r d1" style="padding:24px 20px;border-bottom:1px solid var(--bd-gold-s);"><p style="font-size:14px;font-weight:700;color:#fff;margin-bottom:10px;">3ヶ月後に解約できますか？</p><p style="font-size:13px;color:var(--sub);line-height:1.8;">できます。最低契約期間3ヶ月後は、月単位でいつでも解約いただけます。</p></div><div class="r d2" style="padding:24px 20px;"><p style="font-size:14px;font-weight:700;color:#fff;margin-bottom:10px;">しつこい営業はありますか？</p><p style="font-size:13px;color:var(--sub);line-height:1.8;">一切ありません。「話だけ聞く」からで構いません。</p></div></div></div></section>
<div class="rule-line"></div>

<!-- FOOTER -->

<footer><div style="max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:20px;"><div class="footer-logo"><em>NEXT</em>GAME</div><div style="display:flex;gap:24px;flex-wrap:wrap;"><a href="mailto:support@nextgame-limited.com" style="font-size:12px;color:var(--sub);">support@nextgame-limited.com</a><a href="/privacy" style="font-size:12px;color:var(--sub);">プライバシーポリシー</a></div><p class="footer-copy">© 2026 NEXTGAME Inc. All rights reserved.</p></div></footer>

<!-- FIXED CTA -->

<div class="fixed-cta" id="fixedCta"><a href="https://lin.ee/SJDJXQv" target="_blank"><svg width="18" height="18" viewBox="0 0 24 24" fill="black"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>無料相談する</a></div>

<!-- ============================================================
     JAVASCRIPT
     ============================================================ -->`;

const JS_CONTENT = `
/* ── Scroll reveal ── */
const ro = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){e.target.classList.add(‘on’);ro.unobserve(e.target);} }), {threshold:0.07,rootMargin:‘0px 0px -40px 0px’});
document.querySelectorAll(’.r’).forEach(el=>ro.observe(el));

/* ── Fixed CTA ── */
const heroEl=document.getElementById(‘hero’), fixedCta=document.getElementById(‘fixedCta’);
new IntersectionObserver(([e])=>fixedCta.classList.toggle(‘show’,!e.isIntersecting),{threshold:0.1}).observe(heroEl);

/* ── Count-up ── */
function easeOut(t){return 1-Math.pow(1-t,3);}
function countUp(el,target,dur){let s=null;function step(ts){if(!s)s=ts;const p=Math.min((ts-s)/dur,1);el.textContent=Math.round(easeOut(p)*target);if(p<1)requestAnimationFrame(step);else el.textContent=target;}requestAnimationFrame(step);}
const nio=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;const item=e.target;item.classList.add(‘on’);const ne=item.querySelector(’.count-num’),ve=item.querySelector(’.num-val’);if(ne){const t=parseInt(item.dataset.num||‘0’,10);setTimeout(()=>countUp(ne,t,1200),200);}if(ve)setTimeout(()=>ve.classList.add(‘on’),100);nio.unobserve(item);});},{threshold:0.25});
document.querySelectorAll(’.numbers-item’).forEach(el=>nio.observe(el));

/* ============================================================
COLOR PALETTE
============================================================ */
const COLORS = [
{name:‘ディープブルー’, hex:’#1E3A8A’, bg:’#060d1f’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(30,58,138,0.25) 0%,transparent 60%)’},
{name:‘シアン’,         hex:’#00D1FF’, bg:’#020c12’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(0,209,255,0.1) 0%,transparent 60%)’},
{name:‘エメラルド’,     hex:’#10B981’, bg:’#050f0a’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(16,185,129,0.12) 0%,transparent 60%)’},
{name:‘ゴールド’,       hex:’#F59E0B’, bg:’#0d0a02’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(245,158,11,0.1) 0%,transparent 60%)’},
{name:‘コーラルレッド’, hex:’#EF4444’, bg:’#0f0505’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(239,68,68,0.1) 0%,transparent 60%)’},
{name:‘パープル’,       hex:’#8B5CF6’, bg:’#09050f’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(139,92,246,0.12) 0%,transparent 60%)’},
{name:‘ローズゴールド’, hex:’#EC4899’, bg:’#0f0509’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(236,72,153,0.1) 0%,transparent 60%)’},
{name:‘サンセット’,     hex:’#F97316’, bg:’#0d0702’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(249,115,22,0.1) 0%,transparent 60%)’},
{name:‘スレート’,       hex:’#64748B’, bg:’#080a0d’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(100,116,139,0.1) 0%,transparent 60%)’},
{name:‘ミントグリーン’, hex:’#6EE7B7’, bg:’#040d09’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(110,231,183,0.08) 0%,transparent 60%)’},
{name:‘ネイビー’,       hex:’#1E40AF’, bg:’#05080f’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(30,64,175,0.18) 0%,transparent 60%)’},
{name:‘ホワイト’,       hex:’#E8E8E8’, bg:’#0a0a0a’, heroGrad:‘radial-gradient(ellipse at 80% 20%,rgba(232,232,232,0.05) 0%,transparent 60%)’},
];

let selectedColor = COLORS[0];
let selectedType = ‘lp’;
let selectedLayout = ‘minimal’;
let patternIndex = 0;

/* Render color swatches */
const cg = document.getElementById(‘colorGrid’);
COLORS.forEach((c,i) => {
const sw = document.createElement(‘div’);
sw.className = ‘color-swatch’ + (i===0?’ selected’:’’);
sw.style.background = c.hex;
sw.title = c.name;
sw.onclick = () => {
document.querySelectorAll(’.color-swatch’).forEach(s=>s.classList.remove(‘selected’));
sw.classList.add(‘selected’);
selectedColor = c;
document.getElementById(‘colorPreviewBox’).style.background = c.hex;
document.getElementById(‘colorPreviewName’).textContent = c.name;
document.getElementById(‘colorPreviewHex’).textContent = c.hex;
};
cg.appendChild(sw);
});
// init preview
document.getElementById(‘colorPreviewBox’).style.background = COLORS[0].hex;
document.getElementById(‘colorPreviewName’).textContent = COLORS[0].name;
document.getElementById(‘colorPreviewHex’).textContent = COLORS[0].hex;

/* ── Type select ── */
function selectType(el, type){
document.querySelectorAll(’.type-option’).forEach(o=>o.classList.remove(‘selected’));
el.classList.add(‘selected’); selectedType = type;
}

/* ── Layout select ── */
function selectLayout(el, layout){
document.querySelectorAll(’.layout-option’).forEach(o=>o.classList.remove(‘selected’));
el.classList.add(‘selected’); selectedLayout = layout;
}

/* ── Step navigation ── */
function goStep(n) {
if(n===2){
const name = document.getElementById(‘f_name’).value.trim();
const ind  = document.getElementById(‘f_industry’).value.trim();
if(!name||!ind){ alert(‘屋号と業種を入力してください。’); return; }
}
[1,2,3,4].forEach(i=>{
document.getElementById(‘step’+i).style.display = i===n?‘block’:‘none’;
[‘sn’,‘sl’,‘st’].forEach(p=>{
const el=document.getElementById(p+i);
if(!el)return;
el.classList.toggle(‘active’, i<=n);
});
});
}

/* ── Reset ── */
function resetDemo(){
goStep(1);
document.getElementById(‘demoLoading’).classList.remove(‘active’);
document.getElementById(‘mockupOuter’).classList.remove(‘active’);
document.getElementById(‘navBack’).classList.remove(‘show’);
document.getElementById(‘navLinks’).style.display=‘flex’;
document.getElementById(‘iphoneScreen’).innerHTML=’’;
}

/* ============================================================
CONTENT GENERATION
============================================================ */
/* ============================================================
BUSINESS CONTENT — 業種のビジネス内容を生成
※ NEXTGAMEのサービスではなく、入力業種のサービスを表示
============================================================ */

/* 業種キーワード → そのビジネスのサービス内容 */
const BIZ_DB = {
// ── 美容・健康 ──
‘整体’: {
kw:[‘整体’,‘整骨’,‘骨格’,‘矯正’,‘カイロ’],
eyebrow:(n)=>`${n} — 整体院 / 骨格矯正 / リラクゼーション`,
h1s:(n)=>[`${n}へようこそ。<br>体のお悩み、お任せください。`,`あなたの<br>体を、整える。`,`地域No.1の<br>整体院へ。`],
subh:(n)=>`${n}は、骨格矯正・コリ・痛みのお悩みに<br>丁寧に向き合います。`,
about:(n)=>`${n}は、身体の歪みや慢性的なコリ・痛みに悩む方のためのサロンです。\n\n豊富な経験を持つ施術者が、お一人おひとりの体の状態を丁寧に確認し、根本からのケアを提供します。`,
svcs:()=>[
{n:‘骨格矯正・姿勢改善’, d:‘歪みを整え、慢性的な痛みの根本から改善します。’},
{n:‘もみほぐし・リラクゼーション’, d:‘日々の疲れとコリをしっかりほぐします。’},
{n:‘スポーツケア・テーピング’, d:‘競技パフォーマンスの向上と怪我予防をサポート。’},
],
cta:(n)=>`まずは${n}へご相談ください。`,
ctaSub:`初回のご相談・お問い合わせはお気軽に。\n営業時間内にお電話・LINEで承ります。`,
ctaBtn:`予約・お問い合わせ`,
},
‘美容室’: {
kw:[‘美容室’,‘美容院’,‘ヘア’,‘hair’,‘サロン’,‘カット’],
eyebrow:(n)=>`${n} — ヘアサロン / カット / カラー`,
h1s:(n)=>[`${n}で、<br>なりたい自分へ。`,`毎日を、<br>もっと好きになれるヘアへ。`,`似合うを、<br>一緒に見つける。`],
subh:(n)=>`${n}は、カット・カラー・パーマまで<br>お客様一人ひとりに合わせたスタイルをご提案します。`,
about:(n)=>`${n}は、地域に根ざした美容室です。\n\n経験豊富なスタイリストが、あなたの骨格・髪質・ライフスタイルをしっかりヒアリングし、長持ちするスタイルをご提案します。`,
svcs:()=>[
{n:‘カット’, d:‘骨格に合わせた似合わせカットで、毎日のスタイリングが楽になります。’},
{n:‘カラー・ハイライト’, d:‘トレンドを取り入れながら、ダメージを最小限に抑えたカラーリング。’},
{n:‘パーマ・縮毛矯正’, d:‘扱いやすいスタイルで、朝の時間を短縮します。’},
],
cta:(n)=>`${n}のご予約はこちら。`,
ctaSub:`ご予約はお電話・LINEで承ります。\n初めてのお客様も大歓迎です。`,
ctaBtn:`ご予約・お問い合わせ`,
},
‘ネイル’: {
kw:[‘ネイル’,‘nail’],
eyebrow:(n)=>`${n} — ネイルサロン / ジェルネイル`,
h1s:(n)=>[`${n}で、<br>指先から美しく。`,`こだわりの<br>ネイルデザインを。`,`ていねいな施術で、<br>長持ちするネイルへ。`],
subh:(n)=>`${n}は、ジェルネイル・アート・ケアまで<br>お客様の理想を丁寧に仕上げます。`,
about:(n)=>`${n}は、おひとりおひとりの爪の状態と好みに合わせた施術をご提供するネイルサロンです。\n\n清潔で落ち着いた空間で、ゆったりとした時間をお過ごしください。`,
svcs:()=>[
{n:‘ジェルネイル’, d:‘豊富なカラーとデザインからお選びいただけます。’},
{n:‘ネイルアート’, d:‘シンプルからパーティーネイルまで幅広く対応。’},
{n:‘ネイルケア・補強’, d:‘爪の状態を整え、健康的で美しい指先をキープ。’},
],
cta:(n)=>`${n}のご予約・お問い合わせ。`,
ctaSub:`ご予約はLINE・お電話で受け付けています。\nお気軽にご連絡ください。`,
ctaBtn:`ご予約はこちら`,
},
‘エステ’: {
kw:[‘エステ’,‘フェイシャル’,‘脱毛’,‘痩身’,‘スキンケア’],
eyebrow:(n)=>`${n} — エステサロン / フェイシャル / ボディケア`,
h1s:(n)=>[`${n}で、<br>本来の美しさを取り戻す。`,`肌と体を、<br>内側から整える。`,`自分へのご褒美を、<br>${n}で。`],
subh:(n)=>`${n}は、フェイシャル・ボディケア・脱毛まで<br>トータルビューティーをサポートします。`,
about:(n)=>`${n}は、お肌と体のお悩みに真摯に向き合うプライベートエステサロンです。\n\n丁寧なカウンセリングから始まり、お一人おひとりに最適なメニューをご提案します。`,
svcs:()=>[
{n:‘フェイシャルエステ’, d:‘毛穴・ハリ・くすみなど、お肌の悩みを根本ケア。’},
{n:‘ボディ痩身ケア’, d:‘気になる部位を集中ケアし、理想のラインへ。’},
{n:‘脱毛・美肌ケア’, d:‘サロン品質の脱毛でなめらかな肌へ。’},
],
cta:(n)=>`${n}の無料カウンセリング受付中。`,
ctaSub:`初回限定のお試しメニューをご用意しています。\nお気軽にお問い合わせください。`,
ctaBtn:`無料カウンセリングを予約`,
},
‘歯科’: {
kw:[‘歯科’,‘デンタル’,‘口腔’,‘dental’],
eyebrow:(n)=>`${n} — 歯科クリニック / 一般歯科 / 審美歯科`,
h1s:(n)=>[`${n}で、<br>健康な歯を守る。`,`痛みに配慮した<br>やさしい歯科治療を。`,`歯のお悩み、<br>お気軽にご相談を。`],
subh:(n)=>`${n}は、一般歯科から審美歯科まで<br>地域の皆さまの口腔健康を守ります。`,
about:(n)=>`${n}は、患者様の「痛みへの不安」に寄り添い、丁寧でやさしい治療を心がけています。\n\n定期検診から緊急対応まで、地域のかかりつけ歯科として幅広く対応しています。`,
svcs:()=>[
{n:‘一般歯科・虫歯治療’, d:‘痛みに配慮した丁寧な治療で、歯を長持ちさせます。’},
{n:‘予防歯科・クリーニング’, d:‘定期的なケアで、虫歯・歯周病を予防します。’},
{n:‘審美歯科・ホワイトニング’, d:‘白くきれいな歯で、自信ある笑顔へ。’},
],
cta:(n)=>`${n}へのご予約・お問い合わせ。`,
ctaSub:`お電話・ネットでご予約いただけます。\n初診の方もお気軽にどうぞ。`,
ctaBtn:`ご予約・お問い合わせ`,
},
‘カフェ’: {
kw:[‘カフェ’,‘cafe’,‘コーヒー’,‘喫茶’],
eyebrow:(n)=>`${n} — カフェ / コーヒー / スイーツ`,
h1s:(n)=>[`${n}で、<br>ゆったりとした時間を。`,`こだわりの一杯が、<br>あなたを待っています。`,`日常に、<br>特別なひとときを。`],
subh:(n)=>`${n}は、こだわりのコーヒーと<br>手作りスイーツでお迎えします。`,
about:(n)=>`${n}は、日々の喧噪を忘れてゆっくり過ごせるカフェです。\n\n厳選したコーヒー豆を使ったドリンクと、毎日手作りのスイーツで、大切な時間をご提供します。`,
svcs:()=>[
{n:‘コーヒー・ドリンク’, d:‘スペシャルティコーヒーをはじめ、季節のドリンクをご用意。’},
{n:‘手作りスイーツ・フード’, d:‘毎朝丁寧に作るケーキとフードメニュー。’},
{n:‘貸切・テイクアウト’, d:‘少人数の集まりや持ち帰りにも対応しています。’},
],
cta:(n)=>`${n}へのご予約・お問い合わせ。`,
ctaSub:`貸切・予約のご相談はお電話またはSNSまで。\nテイクアウトも承っています。`,
ctaBtn:`お問い合わせ・予約`,
},
‘飲食’: {
kw:[‘飲食’,‘レストラン’,‘食堂’,‘居酒屋’,‘料理’,‘ラーメン’,‘そば’,‘うどん’,‘焼肉’,‘寿司’,‘イタリアン’,‘フレンチ’,‘中華’],
eyebrow:(n)=>`${n} — レストラン / お食事`,
h1s:(n)=>[`${n}の味を、<br>ぜひ体験してください。`,`こだわりの料理で、<br>特別なひとときを。`,`地域に愛される<br>${n}へ。`],
subh:(n)=>`${n}は、厳選した素材と丁寧な調理で<br>心に残る料理をご提供します。`,
about:(n)=>`${n}は、地域の皆さまに愛され続けるお店を目指しています。\n\n食材の仕入れから調理まで、手を抜かない真摯な姿勢で、お客様に喜んでいただける料理をお届けします。`,
svcs:()=>[
{n:‘ランチメニュー’, d:‘毎日変わる日替わりランチからコースまで。’},
{n:‘ディナー・コース’, d:‘特別な日のディナーにも対応したコースメニュー。’},
{n:‘宴会・貸切’, d:‘グループでのご利用・ご宴会のご予約承ります。’},
],
cta:(n)=>`${n}のご予約はこちら。`,
ctaSub:`ご予約はお電話・ネットで承ります。\nお気軽にお問い合わせください。`,
ctaBtn:`ご予約・お問い合わせ`,
},
‘不動産’: {
kw:[‘不動産’,‘賃貸’,‘売買’,‘物件’,‘マンション’,‘土地’,‘建売’],
eyebrow:(n)=>`${n} — 不動産 / 賃貸・売買`,
h1s:(n)=>[`理想の住まいを、<br>${n}で見つける。`,`安心の取引を、<br>プロがサポート。`,`${n}で、<br>新しい暮らしを始める。`],
subh:(n)=>`${n}は、賃貸・売買・管理まで<br>あなたの不動産の悩みをワンストップで解決します。`,
about:(n)=>`${n}は、地域に密着した不動産会社です。\n\n豊富な物件情報と経験豊かなスタッフが、お客様の予算・条件・希望に寄り添い、最適な物件をご提案します。`,
svcs:()=>[
{n:‘賃貸物件紹介’, d:‘豊富な賃貸物件の中から、ご希望に合った物件を提案。’},
{n:‘売買・購入サポート’, d:‘土地・マンション・一戸建ての購入を全面サポート。’},
{n:‘物件管理・リフォーム’, d:‘所有物件の管理・修繕・リフォームにも対応。’},
],
cta:(n)=>`${n}への無料相談はこちら。`,
ctaSub:`物件探しのご相談はお気軽に。\n来店不要のオンライン相談も承ります。`,
ctaBtn:`無料相談・お問い合わせ`,
},
‘学習塾’: {
kw:[‘塾’,‘学習’,‘予備校’,‘家庭教師’,‘英会話’,‘習い事’],
eyebrow:(n)=>`${n} — 学習塾 / 個別指導`,
h1s:(n)=>[`${n}で、<br>成績を変える。`,`一人ひとりに<br>寄り添う指導を。`,`目標に向かって、<br>${n}で一緒に進もう。`],
subh:(n)=>`${n}は、個別指導・少人数クラスで<br>お子さまの「わかった!」を大切にします。`,
about:(n)=>`${n}は、お子さま一人ひとりの学力・目標・ペースに合わせた指導を行う学習塾です。\n\n丁寧なヒアリングと定期的な面談で、保護者の方とも連携しながら、着実に成績アップを目指します。`,
svcs:()=>[
{n:‘個別指導・定期テスト対策’, d:‘弱点を徹底的に補強し、テストで点数を上げます。’},
{n:‘受験対策・志望校合格サポート’, d:‘高校・大学受験を目指す生徒の志望校合格を全力サポート。’},
{n:‘自習室・質問対応’, d:‘自由に使える自習室と、いつでも聞けるサポート環境。’},
],
cta:(n)=>`${n}の無料体験授業受付中。`,
ctaSub:`まずは無料体験授業でお試しください。\n入塾のご相談もお気軽にどうぞ。`,
ctaBtn:`無料体験授業を申し込む`,
},
‘建設’: {
kw:[‘建設’,‘工務店’,‘リフォーム’,‘建築’,‘内装’,‘外壁’,‘屋根’],
eyebrow:(n)=>`${n} — 建設 / リフォーム / 新築`,
h1s:(n)=>[`${n}で、<br>理想の空間を実現する。`,`確かな技術で、<br>長く安心して暮らせる家を。`,`リフォームから新築まで、<br>${n}にお任せください。`],
subh:(n)=>`${n}は、新築・リフォーム・外壁塗装まで<br>住まいのことなら何でもご相談ください。`,
about:(n)=>`${n}は、地域密着で30年以上の実績を持つ建設会社です。\n\n丁寧なヒアリングと高い施工品質で、お客様が長く安心して暮らせる住まいをご提供します。`,
svcs:()=>[
{n:‘新築・注文住宅’, d:‘お客様の希望を形にする、完全オーダーメイドの家づくり。’},
{n:‘リフォーム・リノベーション’, d:‘キッチン・浴室・内装から全面改装まで幅広く対応。’},
{n:‘外壁塗装・屋根工事’, d:‘防水・断熱・美観を保つ外装メンテナンス。’},
],
cta:(n)=>`${n}の無料見積もり・相談はこちら。`,
ctaSub:`まずはお気軽にご相談ください。\n現地調査・お見積りは無料で承ります。`,
ctaBtn:`無料見積もり・相談`,
},
‘医院’: {
kw:[‘医院’,‘クリニック’,‘病院’,‘内科’,‘外科’,‘皮膚科’,‘眼科’,‘耳鼻科’,‘整形外科’],
eyebrow:(n)=>`${n} — クリニック / 地域医療`,
h1s:(n)=>[`${n}が、<br>地域の健康を守ります。`,`お体のお悩みを、<br>お気軽にご相談ください。`,`安心・丁寧な診療を、<br>${n}で。`],
subh:(n)=>`${n}は、丁寧な診察と<br>わかりやすい説明を心がけています。`,
about:(n)=>`${n}は、地域のかかりつけ医として、患者様一人ひとりに向き合う診療を行っています。\n\nお体の不調はもちろん、予防・健康管理まで気軽に相談できるクリニックを目指しています。`,
svcs:()=>[
{n:‘一般外来・各種診療’, d:‘症状に合わせた丁寧な診察と処方を行います。’},
{n:‘健康診断・予防接種’, d:‘定期健診・各種ワクチンの接種に対応しています。’},
{n:‘往診・オンライン診療’, d:‘外出が難しい方のための往診・オンライン診療も実施。’},
],
cta:(n)=>`${n}のご予約・お問い合わせ。`,
ctaSub:`ご予約はお電話またはネット予約で。\n初めての方もお気軽にどうぞ。`,
ctaBtn:`ご予約・お問い合わせ`,
},
‘士業’: {
kw:[‘弁護士’,‘税理士’,‘司法書士’,‘行政書士’,‘社労士’,‘会計士’,‘社会保険’],
eyebrow:(n)=>`${n} — 専門家 / 法律・税務・労務`,
h1s:(n)=>[`${n}が、<br>あなたの悩みを解決します。`,`専門知識で、<br>安心をお届けします。`,`まずは、<br>${n}にご相談ください。`],
subh:(n)=>`${n}は、法律・税務・労務のお悩みを<br>丁寧にサポートします。`,
about:(n)=>`${n}は、個人・中小企業のお客様から多くのご相談をいただいている専門家事務所です。\n\n難しい問題をわかりやすく説明し、最善の解決策をご提案します。`,
svcs:()=>[
{n:‘初回無料相談’, d:‘まずはお気軽にご相談ください。方針をご説明します。’},
{n:‘各種手続き・申請代行’, d:‘複雑な書類作成・申請手続きをすべて代行します。’},
{n:‘継続サポート・顧問契約’, d:‘定期的なサポートで、安心のビジネス運営を支援。’},
],
cta:(n)=>`${n}への無料相談受付中。`,
ctaSub:`初回のご相談は無料です。\nお電話・メールでお気軽にどうぞ。`,
ctaBtn:`無料相談を申し込む`,
},
};

/* サイト種別ごとの追加コンテキスト */
const TYPE_CONTEXT = {
lp:        { sectionLabel:‘Services’, pageNote:‘成果重視のLP構成’ },
corporate: { sectionLabel:‘事業内容’, pageNote:‘コーポレートサイト’ },
ec:        { sectionLabel:‘商品・サービス’, pageNote:‘ECサイト’ },
recruit:   { sectionLabel:‘募集職種・福利厚生’, pageNote:‘採用サイト’ },
portfolio: { sectionLabel:‘実績・Works’, pageNote:‘ポートフォリオ’ },
};

/* レイアウトスタイル */
const LAYOUT_STYLES = {
minimal: { heroBg:’#000’, lineColor:‘rgba(255,255,255,0.06)’, sectionBg:’#000’, sectionBg2:’#060606’, grid:’’ },
bold:    { heroBg:’#000’, lineColor:‘rgba(255,255,255,0.09)’, sectionBg:’#000’, sectionBg2:’#090909’, grid:’’ },
warm:    { heroBg:’#0d0a08’, lineColor:‘rgba(255,255,255,0.06)’, sectionBg:’#0a0806’, sectionBg2:’#0e0b09’, grid:’’ },
tech:    { heroBg:’#050810’, lineColor:‘rgba(0,209,255,0.07)’, sectionBg:’#050810’, sectionBg2:’#080c18’, grid:’’ },
};

/* ── 業種マッチ ── */
function matchBiz(industry) {
const lower = industry.toLowerCase();
for(const [,val] of Object.entries(BIZ_DB)){
if(val.kw.some(k => lower.includes(k.toLowerCase()))) return val;
}
return null; // 未登録業種
}

/* ── 未登録業種用 汎用コンテンツ（業種固有のコピーを生成） ── */
function genericBiz(industry) {
return {
eyebrow:(n)=>`${n} — ${industry}`,
h1s:(n)=>[
`${n}で、<br>お待ちしております。`,
`${industry}のことなら、<br>${n}へ。`,
`地域に愛される<br>${n}を目指して。`,
],
subh:(n)=>`${n}は、${industry}として<br>お客様に選ばれるサービスをご提供します。`,
about:(n)=>`${n}は、${industry}として地域の皆さまに信頼していただける会社・お店を目指しています。\n\nお一人おひとりのご要望に丁寧に向き合い、満足いただけるサービスをご提供します。`,
svcs:(n)=>[
{n:`${industry}サービス`, d:`${n}が提供するメインサービスです。詳細はお問い合わせください。`},
{n:‘ご相談・お見積もり’, d:`まずはお気軽にご相談ください。無料でご対応します。`},
{n:‘アフターサポート’, d:`ご利用後も安心のサポート体制でお客様をお守りします。`},
],
cta:(n)=>`${n}へのお問い合わせはこちら。`,
ctaSub:`ご質問・ご相談はお気軽にどうぞ。\nお電話・メールにて承ります。`,
ctaBtn:`お問い合わせ`,
};
}

/* ── HTMLビルド ── */

/* ============================================================
PHOTO DATABASE — Unsplash直接URL（動作確認済み・固定写真）
https://images.unsplash.com/photo-{ID}?w=640&h=400&q=80&auto=format&fit=crop
============================================================ */
const PHOTO_DB = {
‘焼肉’: [
‘https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1544025162-d76694265947?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1558030137-a56c1b002c85?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘ラーメン’: [
‘https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘寿司’: [
‘https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1553621042-f6e147245754?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘飲食’: [
‘https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘居酒屋’: [
‘https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘整体’: [
‘https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘美容室’: [
‘https://images.unsplash.com/photo-1562322140-8baeececf3df?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘ネイル’: [
‘https://images.unsplash.com/photo-1604654894610-df63bc536371?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1604654894595-7b52aa04ee8f?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘エステ’: [
‘https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘歯科’: [
‘https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1588776814546-1ffedac8ef7e?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘カフェ’: [
‘https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘不動産’: [
‘https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘学習塾’: [
‘https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘建設’: [
‘https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1590725121839-892b458a4929?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘医院’: [
‘https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘士業’: [
‘https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=640&h=400&q=80&auto=format&fit=crop’,
],
‘default’: [
‘https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=640&h=400&q=80&auto=format&fit=crop’,
‘https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=640&h=400&q=80&auto=format&fit=crop’,
],
};

function getPhotoUrl(industry, pattern) {
const lower = industry.toLowerCase();
const kmap = [
{ keys:[‘焼肉’,‘やきにく’,‘bbq’,‘バーベキュー’],   db:‘焼肉’   },
{ keys:[‘ラーメン’,‘らーめん’,‘中華’],             db:‘ラーメン’},
{ keys:[‘寿司’,‘すし’,‘鮨’],                      db:‘寿司’   },
{ keys:[‘居酒屋’,‘izakaya’],                      db:‘居酒屋’ },
{ keys:[‘整体’,‘整骨’,‘骨格’,‘矯正’,‘マッサージ’],  db:‘整体’   },
{ keys:[‘美容室’,‘美容院’,‘ヘア’,‘hair’,‘カット’],  db:‘美容室’ },
{ keys:[‘ネイル’,‘nail’],                         db:‘ネイル’ },
{ keys:[‘エステ’,‘フェイシャル’,‘脱毛’,‘痩身’],     db:‘エステ’ },
{ keys:[‘歯科’,‘デンタル’,‘歯医者’],               db:‘歯科’   },
{ keys:[‘カフェ’,‘cafe’,‘コーヒー’,‘喫茶’],        db:‘カフェ’ },
{ keys:[‘飲食’,‘レストラン’,‘料理’,‘食堂’,‘うどん’,‘そば’], db:‘飲食’ },
{ keys:[‘不動産’,‘賃貸’,‘売買’,‘物件’,‘マンション’], db:‘不動産’ },
{ keys:[‘塾’,‘学習’,‘予備校’,‘英会話’,‘スクール’],  db:‘学習塾’ },
{ keys:[‘建設’,‘工務店’,‘リフォーム’,‘建築’,‘外壁’], db:‘建設’  },
{ keys:[‘医院’,‘クリニック’,‘病院’,‘内科’,‘外科’],  db:‘医院’   },
{ keys:[‘弁護士’,‘税理士’,‘司法書士’,‘行政書士’,‘社労士’], db:‘士業’ },
];
const match = kmap.find(m => m.keys.some(k => lower.includes(k.toLowerCase())));
const list = PHOTO_DB[match?.db] || PHOTO_DB[‘default’];
return list[pattern % list.length];
}

/* ============================================================
HERO ILLUSTRATION — 業種別フルカラーSVGイラスト（外部画像不要）
============================================================ */
function getHeroIllustration(bizKey, accent) {
const a  = accent;
const a3 = accent + ‘33’;
const a6 = accent + ‘66’;
const a9 = accent + ‘aa’;

const ills = {

/* ── 焼肉 ── 炭火・肉・煙 */
‘焼肉’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="coal" cx="50%" cy="50%" r="50%">
<stop offset="0%" stop-color="#ff6b00" stop-opacity="0.9"/>
<stop offset="60%" stop-color="#c43200" stop-opacity="0.7"/>
<stop offset="100%" stop-color="#2a0a00" stop-opacity="0.4"/>
</radialGradient>
<radialGradient id="glow1" cx="50%" cy="50%" r="50%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.35"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>

  <!-- 背景グロー -->

  <ellipse cx="160" cy="130" rx="140" ry="80" fill="url(#glow1)"/>
  <!-- 炭床 -->
  <rect x="40" y="140" width="240" height="20" rx="4" fill="#1a0800" opacity="0.9"/>
  <ellipse cx="75" cy="148" rx="14" ry="8" fill="url(#coal)"/>
  <ellipse cx="115" cy="145" rx="16" ry="9" fill="url(#coal)"/>
  <ellipse cx="160" cy="148" rx="14" ry="8" fill="url(#coal)"/>
  <ellipse cx="205" cy="145" rx="16" ry="9" fill="url(#coal)"/>
  <ellipse cx="245" cy="148" rx="13" ry="8" fill="url(#coal)"/>
  <!-- 網 -->
  <g stroke="#888" stroke-width="1.2" opacity="0.7">
    <line x1="40" y1="130" x2="280" y2="130"/>
    <line x1="40" y1="120" x2="280" y2="120"/>
    <line x1="40" y1="110" x2="280" y2="110"/>
    <line x1="60"  y1="105" x2="60"  y2="135"/>
    <line x1="90"  y1="105" x2="90"  y2="135"/>
    <line x1="120" y1="105" x2="120" y2="135"/>
    <line x1="150" y1="105" x2="150" y2="135"/>
    <line x1="180" y1="105" x2="180" y2="135"/>
    <line x1="210" y1="105" x2="210" y2="135"/>
    <line x1="240" y1="105" x2="240" y2="135"/>
    <line x1="270" y1="105" x2="270" y2="135"/>
  </g>
  <!-- 肉（カルビ風） -->
  <path d="M55,115 Q75,105 100,112 Q115,107 130,114 Q120,122 95,120 Q70,124 55,115Z" fill="#c84b20" opacity="0.95"/>
  <path d="M58,116 Q75,110 98,116" fill="none" stroke="#e87050" stroke-width="1" opacity="0.6"/>
  <path d="M140,113 Q165,103 195,111 Q210,106 228,112 Q218,121 192,119 Q165,122 140,113Z" fill="#c84b20" opacity="0.95"/>
  <path d="M143,114 Q165,108 192,114" fill="none" stroke="#e87050" stroke-width="1" opacity="0.6"/>
  <!-- ロース -->
  <path d="M80,108 Q100,98 125,105 Q115,114 90,112Z" fill="#e05030" opacity="0.85"/>
  <path d="M165,107 Q188,97 210,104 Q200,113 175,111Z" fill="#e05030" opacity="0.85"/>
  <!-- 煙 -->
  <path d="M80,100 Q76,88 82,76 Q86,64 80,52" fill="none" stroke="#ccc" stroke-width="2.5" stroke-linecap="round" opacity="0.2"/>
  <path d="M130,100 Q126,85 133,70 Q138,55 132,40" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" opacity="0.15"/>
  <path d="M190,100 Q186,83 193,67 Q198,52 192,36" fill="none" stroke="#ccc" stroke-width="2.5" stroke-linecap="round" opacity="0.2"/>
  <path d="M240,100 Q237,88 243,75 Q247,62 241,50" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" opacity="0.15"/>
  <!-- アクセントライン -->
  <line x1="0" y1="160" x2="320" y2="160" stroke="\${a}" stroke-width="0.5" opacity="0.3"/>
</svg>\`,

/* ── 整体 ── 施術シルエット */
‘整体’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="bg_s" cx="50%" cy="40%" r="60%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.1"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<ellipse cx="160" cy="100" rx="130" ry="90" fill="url(#bg_s)"/>

  <!-- ベッド -->

  <rect x="40" y="135" width="200" height="18" rx="6" fill="#1a1a1a" stroke="#333" stroke-width="1"/>
  <rect x="60" y="125" width="180" height="14" rx="4" fill="#222" stroke="#2a2a2a" stroke-width="1"/>
  <!-- 施術される人（横臥） -->
  <ellipse cx="180" cy="122" rx="16" ry="16" fill="#d4a88a" opacity="0.9"/>
  <path d="M164,122 Q140,118 100,120 Q80,121 70,124" fill="none" stroke="#d4a88a" stroke-width="16" stroke-linecap="round"/>
  <path d="M100,128 Q90,136 85,145" fill="none" stroke="#d4a88a" stroke-width="10" stroke-linecap="round"/>
  <path d="M115,128 Q110,138 108,148" fill="none" stroke="#d4a88a" stroke-width="10" stroke-linecap="round"/>
  <!-- 施術する人（立位） -->
  <circle cx="230" cy="88" r="14" fill="#b8957a" opacity="0.9"/>
  <path d="M230,102 L230,145" stroke="#b8957a" stroke-width="12" stroke-linecap="round"/>
  <path d="M230,115 Q210,122 185,122" stroke="#b8957a" stroke-width="9" stroke-linecap="round" fill="none"/>
  <path d="M230,115 Q248,118 255,125" stroke="#b8957a" stroke-width="9" stroke-linecap="round" fill="none"/>
  <!-- エネルギーライン -->
  <path d="M100,60 Q130,45 160,55 Q190,45 220,60" fill="none" stroke="\${a}" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
  <path d="M90,75 Q130,62 160,70 Q195,60 225,72" fill="none" stroke="\${a}" stroke-width="0.8" stroke-dasharray="3,3" opacity="0.35"/>
  <!-- 光のアクセント -->
  <circle cx="185" cy="122" r="22" fill="none" stroke="\${a}" stroke-width="0.7" opacity="0.3"/>
  <circle cx="185" cy="122" r="32" fill="none" stroke="\${a}" stroke-width="0.4" opacity="0.15"/>
</svg>\`,

/* ── 美容室 ── カット・鏡・シルエット */
‘美容室’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="bg_b" cx="60%" cy="40%" r="55%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.12"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_b)"/>

  <!-- 鏡 -->

  <rect x="60" y="20" width="90" height="130" rx="6" fill="#111" stroke="#2a2a2a" stroke-width="1.5"/>
  <rect x="64" y="24" width="82" height="122" rx="4" fill="#0d0d0d" stroke="#333" stroke-width="0.5"/>
  <!-- 鏡の光沢 -->
  <line x1="68" y1="28" x2="78" y2="50" stroke="rgba(255,255,255,0.08)" stroke-width="3" stroke-linecap="round"/>
  <!-- 鏡の中の人 -->
  <circle cx="105" cy="60" r="18" fill="#c8967a" opacity="0.8"/>
  <path d="M87,78 Q105,130 105,145" stroke="#c8967a" stroke-width="22" stroke-linecap="round" fill="none" opacity="0.8"/>
  <!-- 髪 -->
  <path d="M87,52 Q95,38 105,42 Q115,38 123,52 Q128,65 120,72 Q115,65 105,60 Q95,65 90,72 Q82,65 87,52Z" fill="#2a1a10" opacity="0.9"/>
  <!-- スタイリスト -->
  <circle cx="185" cy="65" r="16" fill="#b8907a" opacity="0.85"/>
  <path d="M185,81 L185,135" stroke="#b8907a" stroke-width="14" stroke-linecap="round"/>
  <!-- ハサミを持つ腕 -->
  <path d="M185,100 Q210,90 230,95" stroke="#b8907a" stroke-width="9" stroke-linecap="round" fill="none"/>
  <path d="M185,100 Q165,92 148,90" stroke="#b8907a" stroke-width="9" stroke-linecap="round" fill="none"/>
  <!-- ハサミ -->
  <circle cx="244" cy="82" r="6" fill="none" stroke="\${a}" stroke-width="1.2"/>
  <circle cx="244" cy="95" r="6" fill="none" stroke="\${a}" stroke-width="1.2"/>
  <line x1="248" y1="86" x2="270" y2="70" stroke="\${a}" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="248" y1="91" x2="270" y2="107" stroke="\${a}" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="244" cy="88" r="3" fill="\${a}" opacity="0.7"/>
  <!-- 床 -->
  <line x1="40" y1="165" x2="280" y2="165" stroke="#222" stroke-width="1"/>
  <!-- 散らばった髪 -->
  <path d="M100,168 Q110,163 120,168" fill="none" stroke="#2a1a10" stroke-width="1.5" opacity="0.5"/>
  <path d="M155,170 Q162,165 170,170" fill="none" stroke="#2a1a10" stroke-width="1.5" opacity="0.4"/>
</svg>\`,

/* ── ネイル ── 手・ネイルアート */
‘ネイル’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="bg_n" cx="50%" cy="50%" r="60%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.15"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_n)"/>

  <!-- 手の形 -->

  <path d="M100,180 L100,95 Q100,80 112,80 Q124,80 124,95 L124,120" stroke="#d4a080" stroke-width="22" stroke-linecap="round" fill="none"/>
  <path d="M124,120 L124,78 Q124,63 136,63 Q148,63 148,78 L148,120" stroke="#d4a080" stroke-width="22" stroke-linecap="round" fill="none"/>
  <path d="M148,120 L148,75 Q148,60 160,60 Q172,60 172,75 L172,120" stroke="#d4a080" stroke-width="22" stroke-linecap="round" fill="none"/>
  <path d="M172,120 L172,82 Q172,67 184,67 Q196,67 196,82 L196,120" stroke="#d4a080" stroke-width="22" stroke-linecap="round" fill="none"/>
  <path d="M100,180 Q100,195 148,195 Q196,195 196,180 L196,120 Q196,132 180,132 L116,132 Q100,132 100,180" stroke="#d4a080" stroke-width="22" stroke-linecap="round" fill="none"/>
  <!-- 手の塗り -->
  <path d="M100,175 L100,95 Q100,82 112,82 Q122,82 122,95 L122,118 L122,76 Q122,65 136,65 Q148,65 148,76 L148,118 L148,73 Q148,62 160,62 Q172,62 172,73 L172,118 L172,80 Q172,69 184,69 Q194,69 194,80 L194,118 L194,178 Q194,190 148,190 Q102,190 100,175Z" fill="#d4a080" opacity="0.9"/>
  <!-- ネイルチップ -->
  <rect x="101" y="74" width="20" height="14" rx="5" fill="\${a}" opacity="0.95"/>
  <rect x="123" y="62" width="22" height="14" rx="5" fill="\${a}" opacity="0.9"/>
  <rect x="149" y="59" width="22" height="14" rx="5" fill="\${a}" opacity="1"/>
  <rect x="173" y="66" width="20" height="14" rx="5" fill="\${a}" opacity="0.85"/>
  <!-- ネイルアートデコ -->
  <circle cx="111" cy="80" r="3" fill="white" opacity="0.7"/>
  <circle cx="134" cy="68" r="3" fill="white" opacity="0.7"/>
  <circle cx="160" cy="65" r="4" fill="white" opacity="0.8"/>
  <circle cx="183" cy="72" r="3" fill="white" opacity="0.6"/>
  <!-- キラキラ -->
  <text x="240" y="80" font-size="18" opacity="0.5" fill="\${a}">✦</text>
  <text x="260" y="120" font-size="12" opacity="0.4" fill="\${a}">✦</text>
  <text x="225" y="140" font-size="14" opacity="0.35" fill="\${a}">✦</text>
</svg>\`,

/* ── エステ ── リラクゼーション */
‘エステ’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="bg_e" cx="50%" cy="50%" r="55%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.1"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_e)"/>

  <!-- キャンドル -->

  <rect x="40" y="130" width="14" height="40" rx="3" fill="#e8c870" opacity="0.8"/>
  <path d="M47,128 Q44,118 47,110 Q50,118 47,128Z" fill="#ffaa00" opacity="0.9"/>
  <ellipse cx="47" cy="130" rx="7" ry="3" fill="#c8a050"/>
  <!-- 大キャンドル -->
  <rect x="68" y="115" width="18" height="55" rx="3" fill="#e8c870" opacity="0.8"/>
  <path d="M77,113 Q73,100 77,90 Q81,100 77,113Z" fill="#ffaa00" opacity="0.9"/>
  <ellipse cx="77" cy="115" rx="9" ry="3.5" fill="#c8a050"/>
  <!-- タオル・施術台 -->
  <rect x="110" y="140" width="160" height="20" rx="5" fill="#222" stroke="#333" stroke-width="1"/>
  <rect x="115" y="132" width="150" height="12" rx="3" fill="white" opacity="0.08"/>
  <!-- 人のシルエット（横臥・顔向け） -->
  <ellipse cx="230" cy="128" rx="15" ry="15" fill="#d4a080" opacity="0.85"/>
  <path d="M215,128 Q185,124 155,126 Q138,127 130,130" fill="none" stroke="#d4a080" stroke-width="20" stroke-linecap="round"/>
  <path d="M155,135 Q148,145 145,155" fill="none" stroke="#d4a080" stroke-width="14" stroke-linecap="round"/>
  <path d="M170,136 Q165,147 163,158" fill="none" stroke="#d4a080" stroke-width="14" stroke-linecap="round"/>
  <!-- 石・アロマ -->
  <ellipse cx="120" cy="122" rx="9" ry="6" fill="#555" opacity="0.9"/>
  <ellipse cx="138" cy="118" rx="7" ry="5" fill="#555" opacity="0.9"/>
  <ellipse cx="154" cy="120" rx="8" ry="5" fill="#555" opacity="0.9"/>
  <!-- 花びら -->
  <circle cx="50" cy="108" r="4" fill="\${a}" opacity="0.5"/>
  <circle cx="58" cy="104" r="3" fill="\${a}" opacity="0.4"/>
  <circle cx="65" cy="110" r="4" fill="\${a}" opacity="0.5"/>
  <circle cx="57" cy="116" r="3" fill="\${a}" opacity="0.4"/>
  <circle cx="57" cy="108" r="3" fill="white" opacity="0.2"/>
  <!-- アロマの煙 -->
  <path d="M47,108 Q43,95 48,82" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round"/>
  <path d="M77,88 Q72,73 78,58" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-linecap="round"/>
</svg>\`,

/* ── 歯科 ── クリニック・歯ブラシ */
‘歯科’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="bg_d" cx="50%" cy="40%" r="55%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.1"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_d)"/>

  <!-- 大きな歯 -->

  <path d="M100,40 Q118,22 140,28 Q162,22 180,40 Q200,60 186,95 Q176,118 164,155 Q158,175 148,162 Q140,142 140,140 Q140,142 132,162 Q122,175 116,155 Q104,118 94,95 Q80,60 100,40Z" fill="white" opacity="0.12" stroke="\${a}" stroke-width="1.5"/>
  <!-- 歯の内部ライン -->
  <path d="M118,42 L118,90" stroke="\${a}" stroke-width="0.8" opacity="0.4"/>
  <path d="M162,42 L162,90" stroke="\${a}" stroke-width="0.8" opacity="0.4"/>
  <path d="M96,100 Q118,88 140,92 Q162,88 184,100" fill="none" stroke="\${a}" stroke-width="0.8" opacity="0.4"/>
  <!-- 歯ブラシ -->
  <rect x="215" y="40" width="12" height="120" rx="6" fill="#e0e0e0" opacity="0.8"/>
  <rect x="211" y="40" width="20" height="30" rx="5" fill="\${a}" opacity="0.85"/>
  <!-- ブラシ毛 -->
  <line x1="213" y1="45" x2="213" y2="68" stroke="white" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
  <line x1="217" y1="43" x2="217" y2="69" stroke="white" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
  <line x1="221" y1="43" x2="221" y2="69" stroke="white" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
  <line x1="225" y1="45" x2="225" y2="68" stroke="white" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
  <line x1="229" y1="47" x2="229" y2="67" stroke="white" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
  <!-- 歯磨き粉 -->
  <rect x="255" y="105" width="30" height="50" rx="8" fill="#e0e0e0" opacity="0.7"/>
  <rect x="258" y="98" width="24" height="12" rx="4" fill="#e0e0e0" opacity="0.9"/>
  <rect x="260" y="115" width="20" height="6" rx="2" fill="\${a}" opacity="0.6"/>
  <rect x="260" y="124" width="16" height="4" rx="2" fill="\${a}" opacity="0.4"/>
  <!-- 十字マーク -->
  <rect x="52" y="55" width="36" height="10" rx="3" fill="\${a}" opacity="0.6"/>
  <rect x="62" y="45" width="10" height="30" rx="3" fill="\${a}" opacity="0.6"/>
  <!-- 泡 -->
  <circle cx="190" cy="60" r="4" fill="white" opacity="0.15"/>
  <circle cx="198" cy="72" r="3" fill="white" opacity="0.1"/>
  <circle cx="184" cy="75" r="5" fill="white" opacity="0.12"/>
</svg>\`,

/* ── カフェ ── コーヒーカップ・ラテアート */
‘カフェ’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="coffee" cx="50%" cy="40%" r="55%">
<stop offset="0%" stop-color="#6b3a1f" stop-opacity="0.9"/>
<stop offset="100%" stop-color="#2a1208" stop-opacity="0.8"/>
</radialGradient>
<radialGradient id="bg_c" cx="50%" cy="50%" r="55%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.1"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_c)"/>

  <!-- ソーサー -->

  <ellipse cx="150" cy="168" rx="72" ry="14" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="1"/>
  <!-- カップ -->
  <path d="M88,90 L98,168 Q100,178 150,178 Q200,178 202,168 L212,90Z" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="1.2"/>
  <!-- カップ内部コーヒー -->
  <ellipse cx="150" cy="92" rx="60" ry="14" fill="url(#coffee)"/>
  <!-- ラテアート（ハート） -->
  <path d="M135,88 Q130,80 140,82 Q150,76 160,82 Q170,80 165,88 Q155,96 150,100 Q145,96 135,88Z" fill="#d4956a" opacity="0.7"/>
  <path d="M142,86 Q148,92 150,96 Q152,92 158,86" fill="none" stroke="#c47850" stroke-width="1.2" opacity="0.6"/>
  <!-- カップの耳 -->
  <path d="M212,110 Q238,110 238,130 Q238,150 212,150" fill="none" stroke="#2a2a2a" stroke-width="8" stroke-linecap="round"/>
  <path d="M212,110 Q230,110 230,130 Q230,150 212,150" fill="none" stroke="#111" stroke-width="4"/>
  <!-- 湯気 -->
  <path d="M125,78 Q120,62 126,48" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M150,74 Q145,56 151,40" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-linecap="round"/>
  <path d="M175,78 Q170,60 176,45" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2.5" stroke-linecap="round"/>
  <!-- コーヒー豆 -->
  <ellipse cx="255" cy="80" rx="10" ry="7" fill="#4a2010" opacity="0.8"/>
  <line x1="255" y1="73" x2="255" y2="87" stroke="#6b3a1f" stroke-width="1" opacity="0.5"/>
  <ellipse cx="272" cy="95" rx="9" ry="6" fill="#4a2010" opacity="0.7" transform="rotate(-20,272,95)"/>
  <line x1="264" y1="93" x2="280" y2="97" stroke="#6b3a1f" stroke-width="1" opacity="0.5"/>
  <ellipse cx="260" cy="112" rx="10" ry="6" fill="#4a2010" opacity="0.75" transform="rotate(15,260,112)"/>
  <!-- アクセント -->
  <circle cx="50" cy="60" r="18" fill="none" stroke="\${a}" stroke-width="0.6" opacity="0.3"/>
  <circle cx="280" cy="155" r="22" fill="none" stroke="\${a}" stroke-width="0.5" opacity="0.25"/>
</svg>\`,

/* ── 飲食（汎用） ── テーブル・料理 */
‘飲食’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="plate" cx="50%" cy="50%" r="50%">
<stop offset="0%" stop-color="white" stop-opacity="0.15"/>
<stop offset="100%" stop-color="white" stop-opacity="0.05"/>
</radialGradient>
<radialGradient id="bg_f" cx="50%" cy="50%" r="55%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.1"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_f)"/>

  <!-- テーブル -->

  <rect x="20" y="148" width="280" height="20" rx="4" fill="#111" stroke="#1e1e1e" stroke-width="1"/>
  <!-- メインプレート -->
  <ellipse cx="150" cy="138" rx="62" ry="14" fill="white" opacity="0.08" stroke="white" stroke-width="0.8" stroke-opacity="0.15"/>
  <ellipse cx="150" cy="134" rx="52" ry="11" fill="url(#plate)"/>
  <!-- 料理（パスタ風） -->
  <path d="M115,132 Q130,118 150,122 Q170,118 185,132" fill="none" stroke="\${a}" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
  <path d="M118,138 Q135,124 150,128 Q165,124 182,138" fill="none" stroke="\${a}" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
  <path d="M120,128 Q140,114 160,120 Q175,114 188,128" fill="none" stroke="#e8a050" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  <!-- ガーニッシュ -->
  <circle cx="150" cy="118" r="6" fill="#3a7a30" opacity="0.7"/>
  <circle cx="162" cy="115" r="4" fill="#3a7a30" opacity="0.6"/>
  <circle cx="138" cy="116" r="4" fill="#3a7a30" opacity="0.6"/>
  <!-- ワイングラス -->
  <path d="M58,148 Q48,120 48,105 Q48,90 68,90 Q88,90 88,105 Q88,120 78,148Z" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <ellipse cx="68" cy="90" rx="20" ry="5" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
  <!-- ワイン（赤） -->
  <path d="M50,115 Q48,105 68,105 Q88,105 86,115 Q86,108 68,108 Q50,108 50,115Z" fill="#8b1a1a" opacity="0.6"/>
  <line x1="68" y1="148" x2="68" y2="168" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
  <!-- フォーク＆ナイフ -->
  <line x1="222" y1="105" x2="222" y2="148" stroke="rgba(255,255,255,0.25)" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M214,105 L214,125 Q214,132 222,132" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.2"/>
  <path d="M230,105 L230,125 Q230,132 222,132" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.2"/>
  <line x1="254" y1="105" x2="254" y2="148" stroke="rgba(255,255,255,0.2)" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M250,105 Q248,115 254,118" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.2"/>
  <!-- キャンドル -->
  <rect x="270" y="118" width="10" height="30" rx="2" fill="#f0d060" opacity="0.6"/>
  <path d="M275,116 Q272,108 275,102 Q278,108 275,116Z" fill="#ffaa00" opacity="0.8"/>
</svg>\`,

/* ── 不動産 ── 家・街並み */
‘不動産’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="bg_r" cx="50%" cy="40%" r="60%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.1"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_r)"/>

  <!-- 月 -->

  <circle cx="260" cy="45" r="20" fill="none" stroke="\${a}" stroke-width="0.8" opacity="0.4"/>
  <circle cx="265" cy="40" r="16" fill="#000" opacity="0.95"/>
  <!-- 星 -->
  <circle cx="200" cy="30" r="1.5" fill="\${a}" opacity="0.5"/>
  <circle cx="220" cy="50" r="1" fill="\${a}" opacity="0.4"/>
  <circle cx="280" cy="70" r="1.5" fill="\${a}" opacity="0.5"/>
  <circle cx="40" cy="40" r="1" fill="\${a}" opacity="0.4"/>
  <!-- ビル群（背景） -->
  <rect x="30" y="100" width="30" height="80" fill="#0d0d0d" stroke="#1a1a1a" stroke-width="1"/>
  <rect x="25" y="118" width="40" height="62" fill="#111" stroke="#1a1a1a" stroke-width="1"/>
  <rect x="240" y="90" width="35" height="90" fill="#0d0d0d" stroke="#1a1a1a" stroke-width="1"/>
  <rect x="255" y="110" width="40" height="70" fill="#111" stroke="#1a1a1a" stroke-width="1"/>
  <!-- ビル窓 -->
  <rect x="32" y="108" width="5" height="5" fill="\${a}" opacity="0.3"/><rect x="42" y="108" width="5" height="5" fill="\${a}" opacity="0.2"/>
  <rect x="32" y="118" width="5" height="5" fill="\${a}" opacity="0.25"/><rect x="42" y="118" width="5" height="5" fill="\${a}" opacity="0.35"/>
  <rect x="245" y="96" width="5" height="5" fill="\${a}" opacity="0.3"/><rect x="258" y="96" width="5" height="5" fill="\${a}" opacity="0.2"/>
  <rect x="245" y="108" width="5" height="5" fill="\${a}" opacity="0.25"/><rect x="258" y="108" width="5" height="5" fill="\${a}" opacity="0.35"/>
  <!-- メイン住宅 -->
  <polygon points="160,50 90,110 230,110" fill="#1a1a1a" stroke="\${a}" stroke-width="1.2"/>
  <rect x="95" y="110" width="130" height="68" fill="#111" stroke="\${a}" stroke-width="1.2"/>
  <!-- ドア -->
  <rect x="148" y="128" width="24" height="50" rx="2" fill="#0d0d0d" stroke="\${a}" stroke-width="0.8"/>
  <circle cx="167" cy="155" r="2.5" fill="\${a}" opacity="0.8"/>
  <!-- 窓 -->
  <rect x="102" y="118" width="28" height="24" rx="2" fill="#0d0d0d" stroke="\${a}" stroke-width="0.8"/>
  <line x1="116" y1="118" x2="116" y2="142" stroke="\${a}" stroke-width="0.5" opacity="0.5"/>
  <line x1="102" y1="130" x2="130" y2="130" stroke="\${a}" stroke-width="0.5" opacity="0.5"/>
  <rect x="190" y="118" width="28" height="24" rx="2" fill="#0d0d0d" stroke="\${a}" stroke-width="0.8"/>
  <line x1="204" y1="118" x2="204" y2="142" stroke="\${a}" stroke-width="0.5" opacity="0.5"/>
  <line x1="190" y1="130" x2="218" y2="130" stroke="\${a}" stroke-width="0.5" opacity="0.5"/>
  <!-- 窓の灯り -->
  <rect x="103" y="119" width="12" height="10" fill="\${a}" opacity="0.1"/>
  <rect x="191" y="119" width="12" height="10" fill="\${a}" opacity="0.15"/>
  <!-- 地面 -->
  <line x1="20" y1="178" x2="300" y2="178" stroke="#1a1a1a" stroke-width="1.5"/>
  <!-- 木 -->
  <line x1="75" y1="178" x2="75" y2="148" stroke="#2a2a2a" stroke-width="3"/>
  <ellipse cx="75" cy="140" rx="14" ry="18" fill="#0d1a0d" opacity="0.8"/>
  <line x1="255" y1="178" x2="255" y2="152" stroke="#2a2a2a" stroke-width="3"/>
  <ellipse cx="255" cy="144" rx="12" ry="16" fill="#0d1a0d" opacity="0.8"/>
</svg>\`,

/* ── 学習塾 ── 本・黒板 */
‘学習塾’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="bg_j" cx="50%" cy="40%" r="55%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.1"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_j)"/>

  <!-- 黒板 -->

  <rect x="40" y="30" width="200" height="120" rx="4" fill="#0d1a0d" stroke="#1a2a1a" stroke-width="1.5"/>
  <rect x="46" y="36" width="188" height="108" rx="2" fill="#0f1f0f" stroke="#1a2a1a" stroke-width="0.5"/>
  <!-- 数式・テキスト -->
  <text x="60" y="65" font-family="monospace" font-size="14" fill="rgba(255,255,255,0.55)" opacity="1">y = ax² + bx + c</text>
  <text x="60" y="88" font-family="monospace" font-size="12" fill="rgba(255,255,255,0.35)">∫f(x)dx = F(x) + C</text>
  <line x1="56" y1="98" x2="222" y2="98" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
  <text x="60" y="114" font-family="monospace" font-size="11" fill="\${a}" opacity="0.6">E = mc²</text>
  <text x="130" y="114" font-family="monospace" font-size="11" fill="rgba(255,255,255,0.3)">v = λf</text>
  <text x="60" y="130" font-family="monospace" font-size="11" fill="rgba(255,255,255,0.25)">sin²θ + cos²θ = 1</text>
  <!-- チョーク受け -->
  <rect x="40" y="150" width="200" height="8" rx="2" fill="#1a1a1a"/>
  <!-- チョーク -->
  <rect x="50" y="151" width="22" height="5" rx="2" fill="white" opacity="0.7"/>
  <rect x="78" y="151" width="16" height="5" rx="2" fill="\${a}" opacity="0.7"/>
  <!-- 本（積み重ね） -->
  <rect x="258" y="110" width="46" height="12" rx="2" fill="#c84040" opacity="0.8"/>
  <rect x="255" y="98" width="48" height="12" rx="2" fill="#4040c8" opacity="0.8"/>
  <rect x="260" y="86" width="44" height="12" rx="2" fill="#40a840" opacity="0.8"/>
  <rect x="256" y="74" width="46" height="12" rx="2" fill="\${a}" opacity="0.8"/>
  <!-- 本のライン -->
  <line x1="278" y1="110" x2="278" y2="122" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
  <line x1="278" y1="98" x2="278" y2="110" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
  <!-- 鉛筆 -->
  <rect x="40" y="165" width="90" height="8" rx="3" fill="#f0c030" opacity="0.75"/>
  <polygon points="130,165 130,173 142,169" fill="#f0a020" opacity="0.75"/>
  <rect x="36" y="165" width="6" height="8" rx="1" fill="#cc8888" opacity="0.6"/>
  <!-- 消しゴム -->
  <rect x="215" y="165" width="25" height="12" rx="3" fill="#e0c0c0" opacity="0.7"/>
</svg>\`,

/* ── 建設 ── 工事現場・家 */
‘建設’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="bg_k" cx="50%" cy="40%" r="55%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.1"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_k)"/>

  <!-- クレーン -->

  <line x1="240" y1="170" x2="240" y2="20" stroke="#444" stroke-width="5" stroke-linecap="round"/>
  <line x1="238" y1="25" x2="300" y2="25" stroke="#444" stroke-width="4" stroke-linecap="round"/>
  <line x1="238" y1="25" x2="200" y2="55" stroke="#333" stroke-width="2.5" stroke-dasharray="5,3"/>
  <line x1="290" y1="25" x2="290" y2="60" stroke="#555" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- クレーンフック -->
  <rect x="282" y="60" width="16" height="12" rx="2" fill="#666" stroke="#555" stroke-width="1"/>
  <path d="M290,72 Q286,80 290,84 Q294,80 290,72Z" fill="#666"/>
  <!-- 建設中の建物 -->
  <rect x="50" y="100" width="160" height="78" fill="none" stroke="#333" stroke-width="1.5"/>
  <!-- 鉄骨フレーム -->
  <line x1="50" y1="100" x2="210" y2="100" stroke="#555" stroke-width="2"/>
  <line x1="50" y1="125" x2="210" y2="125" stroke="#444" stroke-width="1.5"/>
  <line x1="50" y1="150" x2="210" y2="150" stroke="#444" stroke-width="1.5"/>
  <line x1="90" y1="100" x2="90" y2="178" stroke="#444" stroke-width="1.5"/>
  <line x1="130" y1="100" x2="130" y2="178" stroke="#444" stroke-width="1.5"/>
  <line x1="170" y1="100" x2="170" y2="178" stroke="#444" stroke-width="1.5"/>
  <!-- 完成部分の壁 -->
  <rect x="52" y="152" width="76" height="26" fill="#1a1a1a" opacity="0.8"/>
  <rect x="132" y="126" width="76" height="52" fill="#1a1a1a" opacity="0.8"/>
  <!-- 窓 -->
  <rect x="58" y="158" width="18" height="14" fill="\${a}" opacity="0.2"/>
  <rect x="82" y="158" width="18" height="14" fill="\${a}" opacity="0.15"/>
  <rect x="138" y="132" width="18" height="14" fill="\${a}" opacity="0.25"/>
  <rect x="162" y="132" width="18" height="14" fill="\${a}" opacity="0.2"/>
  <!-- 屋根フレーム -->
  <polygon points="130,50 45,100 215,100" fill="none" stroke="\${a}" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- ヘルメット -->
  <ellipse cx="70" cy="88" rx="16" ry="10" fill="\${a}" opacity="0.8"/>
  <rect x="54" y="92" width="32" height="5" rx="2" fill="\${a}" opacity="0.6"/>
  <!-- 地面 -->
  <line x1="20" y1="178" x2="300" y2="178" stroke="#2a2a2a" stroke-width="2"/>
</svg>\`,

/* ── 医院 ── 聴診器・カルテ */
‘医院’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="bg_m" cx="50%" cy="40%" r="55%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.1"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_m)"/>

  <!-- 聴診器 -->

  <circle cx="150" cy="148" r="28" fill="none" stroke="\${a}" stroke-width="3" opacity="0.85"/>
  <circle cx="150" cy="148" r="20" fill="none" stroke="\${a}" stroke-width="1.5" opacity="0.5"/>
  <circle cx="150" cy="148" r="10" fill="\${a}" opacity="0.25"/>
  <path d="M122,148 Q90,148 75,115 Q68,95 75,80" fill="none" stroke="\${a}" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M178,148 Q210,148 225,115 Q232,95 225,80" fill="none" stroke="\${a}" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="75" cy="72" r="9" fill="none" stroke="\${a}" stroke-width="2.5"/>
  <circle cx="75" cy="72" r="4" fill="\${a}" opacity="0.5"/>
  <circle cx="225" cy="72" r="9" fill="none" stroke="\${a}" stroke-width="2.5"/>
  <circle cx="225" cy="72" r="4" fill="\${a}" opacity="0.5"/>
  <path d="M84,72 L216,72" stroke="\${a}" stroke-width="2.5" stroke-linecap="round"/>
  <!-- 十字マーク -->
  <rect x="38" y="30" width="44" height="12" rx="4" fill="\${a}" opacity="0.6"/>
  <rect x="50" y="18" width="12" height="36" rx="4" fill="\${a}" opacity="0.6"/>
  <!-- カルテ -->
  <rect x="235" y="95" width="65" height="80" rx="4" fill="#f0f0f0" opacity="0.08" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <line x1="242" y1="110" x2="292" y2="110" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
  <line x1="242" y1="120" x2="292" y2="120" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
  <line x1="242" y1="130" x2="285" y2="130" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
  <line x1="242" y1="140" x2="288" y2="140" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
  <line x1="242" y1="150" x2="278" y2="150" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
  <!-- 薬 -->
  <ellipse cx="55" cy="140" rx="12" ry="8" fill="#e0e0e0" opacity="0.3" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <line x1="43" y1="140" x2="67" y2="140" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <ellipse cx="78" cy="152" rx="10" ry="7" fill="\${a}" opacity="0.25" stroke="\${a}" stroke-width="0.8" stroke-opacity="0.4"/>
</svg>\`,

/* ── 士業 ── 法廷・天秤 */
‘士業’: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
<defs>
<radialGradient id="bg_l" cx="50%" cy="40%" r="55%">
<stop offset="0%" stop-color="\${a}" stop-opacity="0.1"/>
<stop offset="100%" stop-color="\${a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="320" height="200" fill="url(#bg_l)"/>

  <!-- 本棚 背景 -->

  <rect x="20" y="30" width="18" height="140" fill="#3a1a0a" opacity="0.5" rx="2"/>
  <rect x="42" y="45" width="18" height="125" fill="#1a1a5a" opacity="0.5" rx="2"/>
  <rect x="64" y="38" width="18" height="132" fill="#1a4a1a" opacity="0.5" rx="2"/>
  <rect x="86" y="50" width="18" height="120" fill="#5a3a0a" opacity="0.5" rx="2"/>
  <rect x="264" y="35" width="18" height="135" fill="#3a1a0a" opacity="0.5" rx="2"/>
  <rect x="284" y="48" width="18" height="122" fill="#1a1a5a" opacity="0.5" rx="2"/>
  <!-- 天秤 -->
  <line x1="160" y1="40" x2="160" y2="168" stroke="\${a}" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
  <line x1="90" y1="72" x2="230" y2="72" stroke="\${a}" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
  <circle cx="160" cy="67" r="7" fill="\${a}" opacity="0.7"/>
  <!-- 左皿 -->
  <path d="M90,72 Q70,100 68,118 Q88,126 112,118 Q110,100 90,72Z" fill="none" stroke="\${a}" stroke-width="1.5" opacity="0.8"/>
  <ellipse cx="90" cy="118" rx="24" ry="6" fill="\${a}" opacity="0.2" stroke="\${a}" stroke-width="0.8" stroke-opacity="0.5"/>
  <!-- 左皿のコイン -->
  <ellipse cx="84" cy="115" rx="8" ry="4" fill="\${a}" opacity="0.3"/>
  <ellipse cx="96" cy="112" rx="7" ry="3" fill="\${a}" opacity="0.3"/>
  <!-- 右皿 -->
  <path d="M230,72 Q250,100 252,118 Q232,126 208,118 Q210,100 230,72Z" fill="none" stroke="\${a}" stroke-width="1.5" opacity="0.8"/>
  <ellipse cx="230" cy="118" rx="24" ry="6" fill="\${a}" opacity="0.2" stroke="\${a}" stroke-width="0.8" stroke-opacity="0.5"/>
  <!-- 右皿の書類 -->
  <rect x="218" y="108" width="18" height="14" rx="1" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
  <line x1="221" y1="113" x2="233" y2="113" stroke="rgba(255,255,255,0.2)" stroke-width="0.6"/>
  <line x1="221" y1="117" x2="233" y2="117" stroke="rgba(255,255,255,0.2)" stroke-width="0.6"/>
  <!-- 台座 -->
  <polygon points="145,168 175,168 168,178 152,178" fill="\${a}" opacity="0.35"/>
  <rect x="140" y="176" width="40" height="6" rx="2" fill="\${a}" opacity="0.4"/>
  <!-- ハンマー -->
  <rect x="240" y="140" width="50" height="10" rx="3" fill="#5a3a0a" opacity="0.7" transform="rotate(-30,265,145)"/>
  <rect x="255" y="132" width="20" height="16" rx="3" fill="#8a6a3a" opacity="0.7" transform="rotate(-30,265,140)"/>
</svg>\`,

};

return ills[bizKey] || ills[‘飲食’];
}

/* ============================================================
SVG BACKGROUND ART — セクション装飾
============================================================ */
function getAboutDecoration(accent) {
return `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"
style="position:absolute;right:12px;top:12px;width:60px;height:60px;opacity:0.4;pointer-events:none;">
<circle cx="30" cy="30" r="28" fill="none" stroke="\${accent}" stroke-width="0.7"/>
<circle cx="30" cy="30" r="20" fill="none" stroke="\${accent}" stroke-width="0.4"/>
<circle cx="30" cy="30" r="12" fill="none" stroke="\${accent}" stroke-width="0.3"/>
<line x1="2"  y1="30" x2="58" y2="30" stroke="\${accent}" stroke-width="0.4"/>
<line x1="30" y1="2"  x2="30" y2="58" stroke="\${accent}" stroke-width="0.4"/>
</svg>`;
}

function getSvcIcon(idx, accent) {
const icons = [
`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="\${accent}" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.85;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="\${accent}" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.65;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="\${accent}" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.55;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="\${accent}" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.7;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
];
return icons[idx % icons.length];
}

/* ============================================================
BIZ KEY MAPPING
============================================================ */
function getBizKey(industry) {
const lower = industry.toLowerCase();
const kmap = {
‘整体’:  [‘整体’,‘整骨’,‘骨格’,‘矯正’,‘カイロ’,‘マッサージ’],
‘美容室’: [‘美容室’,‘美容院’,‘ヘア’,‘hair’,‘サロン’,‘カット’,‘美容’],
‘ネイル’: [‘ネイル’,‘nail’],
‘エステ’: [‘エステ’,‘フェイシャル’,‘脱毛’,‘痩身’,‘スキンケア’],
‘歯科’:  [‘歯科’,‘デンタル’,‘dental’,‘歯医者’],
‘カフェ’: [‘カフェ’,‘cafe’,‘coffee’,‘コーヒー’,‘喫茶’],
‘焼肉’:  [‘焼肉’,‘やきにく’,‘bbq’,‘バーベキュー’],
‘飲食’:  [‘飲食’,‘レストラン’,‘食堂’,‘居酒屋’,‘料理’,‘ラーメン’,‘そば’,‘うどん’,‘寿司’,‘フード’],
‘不動産’: [‘不動産’,‘賃貸’,‘売買’,‘物件’,‘マンション’,‘土地’],
‘学習塾’: [‘塾’,‘学習’,‘予備校’,‘家庭教師’,‘英会話’,‘スクール’],
‘建設’:  [‘建設’,‘工務店’,‘リフォーム’,‘建築’,‘外壁’,‘屋根’,‘内装’],
‘医院’:  [‘医院’,‘クリニック’,‘病院’,‘内科’,‘外科’,‘皮膚科’,‘眼科’,‘耳鼻’],
‘士業’:  [‘弁護士’,‘税理士’,‘司法書士’,‘行政書士’,‘社労士’,‘会計士’,‘法律’],
};
for(const [key,kws] of Object.entries(kmap)){
if(kws.some(k=>lower.includes(k.toLowerCase()))) return key;
}
return ‘飲食’; // default fallback illustration
}

/* ============================================================
buildSiteHTML — イラスト統合版
============================================================ */
function buildSiteHTML(name, industry, catchCopy, contact, color, type, layout, pattern, custom={}) {
const biz    = matchBiz(industry) || genericBiz(industry);
const bizKey = getBizKey(industry);
const ls     = LAYOUT_STYLES[layout] || LAYOUT_STYLES.minimal;
const tc     = TYPE_CONTEXT[type]    || TYPE_CONTEXT.lp;
const accent = color.hex;
const tt     = isLight(accent) ? ‘#000’ : ‘#fff’;

const ill      = getHeroIllustration(bizKey, accent);
const decor    = getAboutDecoration(accent);
const photoUrl = getPhotoUrl(industry, pattern);
const uid      = Math.random().toString(36).slice(2,8);

const eyebrow   = biz.eyebrow(name);
const h1raw     = catchCopy || biz.h1s(name)[pattern % biz.h1s(name).length];
const subh      = biz.subh(name);
const ctaHead   = biz.cta(name);
const ctaSub    = biz.ctaSub.replace(/\n/g,’<br>’);
const ctaBtn    = biz.ctaBtn;
const ctaContact= contact || ‘お問い合わせ’;

/* カスタム値を優先、なければ自動生成 */
const aboutBase = custom.about || biz.about(name);
const about     = aboutBase.replace(/\n\n/g,’<br><br>’).replace(/\n/g,’<br>’);
const svcs      = (custom.svcs && custom.svcs.length > 0) ? custom.svcs : biz.svcs(name);

const voices    = getVoices(industry, accent);
const svcNote   = `${name}では、上記サービスの他にもお客様のニーズに合わせた対応が可能です。ご要望に応じてお見積もり・プランのご提案をいたします。`;

/* 店舗情報ブロック（入力された項目のみ表示） */
const infoRows = [
custom.hours   ? `<div style="display:flex;gap:8px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.04);"><span style="font-family:'DM Mono',monospace;font-size:8px;color:\${accent};opacity:0.7;width:52px;flex-shrink:0;padding-top:1px;">営業時間</span><span style="font-size:10px;color:#888;">${custom.hours}${custom.holiday?’　定休：’+custom.holiday:’’}</span></div>` : ‘’,
custom.address ? `<div style="display:flex;gap:8px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.04);"><span style="font-family:'DM Mono',monospace;font-size:8px;color:\${accent};opacity:0.7;width:52px;flex-shrink:0;padding-top:1px;">アクセス</span><span style="font-size:10px;color:#888;">${custom.address}</span></div>` : ‘’,
custom.price   ? `<div style="display:flex;gap:8px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.04);"><span style="font-family:'DM Mono',monospace;font-size:8px;color:\${accent};opacity:0.7;width:52px;flex-shrink:0;padding-top:1px;">料金</span><span style="font-size:10px;color:#888;white-space:pre-line;">${custom.price}</span></div>` : ‘’,
(custom.instagram||custom.booking) ? `<div style="display:flex;gap:8px;padding:7px 0;"><span style="font-family:'DM Mono',monospace;font-size:8px;color:\${accent};opacity:0.7;width:52px;flex-shrink:0;padding-top:1px;">リンク</span><span style="font-size:10px;color:#888;">${[custom.instagram?`<a href="\${custom.instagram}" style="color:\${accent};text-decoration:none;">Instagram</a>`:’’,custom.booking?`<a href="\${custom.booking}" style="color:\${accent};text-decoration:none;">ご予約</a>`:’’].filter(Boolean).join(’　‘)}</span></div>` : ‘’,
].filter(Boolean).join(’’);

const infoSection = infoRows ? `

<div style="padding:18px 16px;background:\${ls.sectionBg};border:1px solid rgba(200,168,74,0.2);border-left:3px solid rgba(200,168,74,0.55);margin:8px;border-radius:6px;">
  <div style="font-family:'DM Mono',monospace;font-size:7px;letter-spacing:0.35em;color:\${accent};text-transform:uppercase;opacity:0.6;margin-bottom:10px;">Info</div>
  \${infoRows}
</div>\` : '';

// ── ヘルパー：ネストしたテンプレートを避けるため関数化 ──
function makeSvcRow(s, i, accent) {
var icons = [
‘<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="'+accent+'" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.85;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>’,
‘<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="'+accent+'" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.65;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>’,
‘<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="'+accent+'" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.55;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>’,
‘<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="'+accent+'" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.7;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>’,
];
return ‘<div style="display:flex;gap:10px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">’
+ icons[i % icons.length]
+ ‘<div style="flex:1;">’
+ ‘<div style="font-family:Syne,sans-serif;font-size:12px;font-weight:700;color:#fff;margin-bottom:4px;">’ + s.n + ‘</div>’
+ ‘<div style="font-size:10px;color:#666;line-height:1.72;">’ + s.d + ‘</div>’
+ ‘</div></div>’;
}

function makeVoiceRow(v, accent) {
var star = ‘<span style="color:' + accent + ';font-size:11px;line-height:1;">★</span>’;
var stars = star + star + star + star + star;
return ‘<div style="margin-bottom:10px;padding:12px 14px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:4px;border-left:2px solid ' + accent + ';">’
+ ‘<div style="display:flex;gap:3px;margin-bottom:6px;">’ + stars + ‘</div>’
+ ‘<div style="font-size:10px;color:#aaa;line-height:1.75;margin-bottom:6px;">’ + (v.text||’’) + ‘</div>’
+ ‘<div style="font-size:9px;color:#555;">’ + (v.author||’’) + ‘</div>’
+ ‘</div>’;
}

var navLogoHTML = logoDataUrl
? ‘<img src="' + logoDataUrl + '" style="height:26px;max-width:110px;object-fit:contain;vertical-align:middle;" alt="' + name + '">’
: name;
var footerLogoHTML = logoDataUrl
? ‘<img src="' + logoDataUrl + '" style="height:22px;max-width:100px;object-fit:contain;vertical-align:middle;opacity:0.85;" alt="' + name + '">’
: name;
var svcsHTML   = svcs.map(function(s,i){ return makeSvcRow(s,i,accent); }).join(’’);
var voicesHTML = voices.map(function(v){ return makeVoiceRow(v,accent); }).join(’’);
var contactHTML = contact ? ‘<div style="font-size:9px;color:#444;margin-bottom:3px;">’ + contact + ‘</div>’ : ‘’;

var html = ‘’

- ‘<!-- Island spacer -->’
- ‘<div style="height:46px;background:' + ls.heroBg + ';flex-shrink:0;"></div>’
- ‘<!-- Nav -->’
- ‘<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:' + ls.heroBg + ';border-bottom:1px solid rgba(255,255,255,0.06);">’
- ‘<span style="font-family:Syne,sans-serif;font-size:12px;font-weight:800;color:#fff;letter-spacing:0.06em;">’ + navLogoHTML + ‘</span>’
- ‘<span style="background:' + accent + ';color:' + tt + ';font-size:9px;padding:4px 10px;border-radius:3px;font-weight:700;">’ + ctaContact + ‘</span>’
- ‘</div>’
- ‘<!-- Hero photo -->’
- ‘<div style="position:relative;height:200px;overflow:hidden;background:' + ls.heroBg + ';">’
- ‘<img src=”’ + photoUrl + ‘” alt=”’ + industry + ‘” data-role=“hero-photo”’
- ```
  ' style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;"'
  ```
- ```
  ' onerror="this.style.display=\\'none\\'">'
  ```
- ‘<div id="ill_' + uid + '" style="position:absolute;inset:0;z-index:0;opacity:0.15;">’ + ill + ‘</div>’
- ‘<div style="position:absolute;inset:0;z-index:2;background:linear-gradient(135deg,' + accent + '22 0%,transparent 60%);pointer-events:none;"></div>’
- ‘</div>’
- ‘<!-- Text block -->’
- ‘<div style="padding:20px 16px 18px;background:' + ls.sectionBg2 + ';border-bottom:1px solid ' + ls.lineColor + ';">’
- ‘<div style="font-family:DM Mono,monospace;font-size:8px;letter-spacing:0.22em;color:' + accent + ';margin-bottom:8px;opacity:0.8;">’ + eyebrow + ‘</div>’
- ‘<h2 style="font-family:Syne,sans-serif;font-size:1.35rem;font-weight:800;color:#fff;line-height:1.12;letter-spacing:-0.02em;margin-bottom:10px;">’ + h1raw + ‘</h2>’
- ‘<p style="font-size:11px;color:#888;line-height:1.75;margin-bottom:14px;">’ + subh + ‘</p>’
- ‘<div style="display:flex;gap:8px;flex-wrap:wrap;">’
- ```
  '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:6px 10px;">'
  ```
- ```
    '<div style="font-family:DM Mono,monospace;font-size:11px;font-weight:700;color:' + accent + ';">★ 4.8</div>'
  ```
- ```
    '<div style="font-size:8px;color:#444;margin-top:1px;">お客様評価</div>'
  ```
- ```
  '</div>'
  ```
- ```
  '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:6px 10px;">'
  ```
- ```
    '<div style="font-family:DM Mono,monospace;font-size:11px;font-weight:700;color:' + accent + ';">200+</div>'
  ```
- ```
    '<div style="font-size:8px;color:#444;margin-top:1px;">累計実績</div>'
  ```
- ```
  '</div>'
  ```
- ```
  '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:6px 10px;">'
  ```
- ```
    '<div style="font-family:DM Mono,monospace;font-size:11px;font-weight:700;color:' + accent + ';">92%</div>'
  ```
- ```
    '<div style="font-size:8px;color:#444;margin-top:1px;">リピート率</div>'
  ```
- ```
  '</div>'
  ```
- ‘</div>’
- ‘</div>’
- ‘<!-- About -->’
- ‘<div style="padding:24px 16px;background:' + ls.sectionBg2 + ';border:1px solid rgba(200,168,74,0.2);border-top:2px solid rgba(200,168,74,0.45);margin:8px;border-radius:6px;position:relative;overflow:hidden;">’
- decor
- ‘<div style="font-family:DM Mono,monospace;font-size:7px;letter-spacing:0.35em;color:' + accent + ';text-transform:uppercase;opacity:0.6;margin-bottom:9px;">About Us</div>’
- ‘<div style="font-family:Syne,sans-serif;font-size:14px;font-weight:700;color:#fff;line-height:1.25;margin-bottom:11px;">’ + name + ‘について</div>’
- ‘<div style="font-size:11px;color:#888;line-height:1.85;">’ + about + ‘</div>’
- ‘<div style="font-size:11px;color:#666;line-height:1.85;margin-top:9px;">スタッフ一同、誠心誠意でお客様のご要望にお応えします。お気軽にご連絡ください。</div>’
- ‘<div style="margin-top:16px;height:1px;background:linear-gradient(90deg,' + accent + '44,transparent);"></div>’
- ‘</div>’
- ‘<!-- Services -->’
- ‘<div style="padding:22px 16px;background:' + ls.sectionBg + ';border:1px solid rgba(200,168,74,0.2);border-left:3px solid rgba(200,168,74,0.55);margin:8px;border-radius:6px;">’
- ‘<div style="font-family:DM Mono,monospace;font-size:7px;letter-spacing:0.35em;color:' + accent + ';text-transform:uppercase;opacity:0.6;margin-bottom:12px;">’ + tc.sectionLabel + ‘</div>’
- svcsHTML
- ‘<div style="margin-top:12px;padding:11px 13px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:4px;">’
- ```
  '<div style="font-size:10px;color:#555;line-height:1.75;">' + svcNote + '</div>'
  ```
- ‘</div>’
- ‘</div>’
- ‘<!-- Voices -->’
- ‘<div style="padding:20px 16px;background:' + ls.sectionBg2 + ';border:1px solid rgba(200,168,74,0.2);border-top:2px solid rgba(200,168,74,0.45);margin:8px;border-radius:6px;">’
- ‘<div style="font-family:DM Mono,monospace;font-size:7px;letter-spacing:0.35em;color:' + accent + ';text-transform:uppercase;opacity:0.6;margin-bottom:12px;">Voice</div>’
- voicesHTML
- ‘</div>’
- infoSection
- ‘<!-- CTA -->’
- ‘<div style="padding:26px 16px;background:' + ls.sectionBg + ';border:1px solid rgba(200,168,74,0.28);border-top:2px solid rgba(200,168,74,0.6);margin:8px;border-radius:6px;text-align:center;position:relative;overflow:hidden;">’
- ‘<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" style="position:absolute;right:0;top:0;width:100px;height:60px;opacity:0.1;pointer-events:none;"><circle cx="85" cy="30" r="45" fill="none" stroke="' + accent + '" stroke-width="0.7"/><circle cx="85" cy="30" r="30" fill="none" stroke="' + accent + '" stroke-width="0.5"/></svg>’
- ‘<div style="font-family:Syne,sans-serif;font-size:14px;font-weight:700;color:#fff;line-height:1.35;margin-bottom:8px;">’ + ctaHead + ‘</div>’
- ‘<div style="font-size:10px;color:#666;line-height:1.75;margin-bottom:16px;">’ + ctaSub + ‘</div>’
- ‘<div style="background:' + accent + ';color:' + tt + ';font-weight:700;font-size:13px;padding:13px;border-radius:4px;letter-spacing:0.03em;">’ + ctaBtn + ‘</div>’
- ‘</div>’
- ‘<!-- Footer -->’
- ‘<div style="padding:16px 16px 22px;background:' + ls.sectionBg2 + ';border:1px solid rgba(200,168,74,0.15);margin:8px;border-radius:6px;">’
- ‘<div style="font-family:Syne,sans-serif;font-size:11px;font-weight:700;color:#fff;margin-bottom:4px;">’ + footerLogoHTML + ‘</div>’
- contactHTML
- ’<div style="font-size:8px;color:#2a2a2a;margin-top:6px;">© 2026 ’ + name + ‘. All rights reserved.</div>’
- ‘</div>’;

return html;
}

/* ── お客様の声（業種別） ── */
function getVoices(industry, accent) {
const lower = industry.toLowerCase();
const db = {
‘整体’:  [{text:‘長年の肩こりが3回の施術で楽になりました。先生が丁寧に体の状態を説明してくれて安心できました。’,author:‘30代・女性’},{text:‘初めての骨格矯正でしたが、緊張しませんでした。また通います。’,author:‘40代・男性’}],
‘美容室’:[{text:‘希望通りのスタイルに仕上げてもらえます。カラーの発色がよく色持ちも長いです。’,author:‘20代・女性’},{text:‘担当スタイリストさんが上手で毎回テンションが上がります。’,author:‘30代・女性’}],
‘ネイル’:[{text:‘デザインの提案が的確で毎回理想以上の仕上がりです。持ちもよくて大満足。’,author:‘20代・女性’},{text:‘丁寧な施術でした。また来ます！’,author:‘30代・女性’}],
‘エステ’:[{text:‘毎回丁寧なカウンセリングがあり安心して通えます。肌の調子がよくなりました。’,author:‘30代・女性’},{text:‘スタッフがとても親切で、リラックスして施術を受けられました。’,author:‘40代・女性’}],
‘歯科’:  [{text:‘痛みに配慮した治療で、歯医者が苦手な私でも安心して通えています。’,author:‘40代・男性’},{text:‘定期検診で毎回しっかり説明してもらえます。子どもも怖がらずに来られるようになりました。’,author:‘30代・女性’}],
‘カフェ’:[{text:‘コーヒーの種類が豊富で毎回違うものを楽しめます。落ち着いた雰囲気がお気に入りです。’,author:‘20代・女性’},{text:‘テレワークでよく利用します。Wi-Fiも安定していてスタッフも親切です。’,author:‘30代・男性’}],
‘焼肉’:  [{text:‘肉の質がとても高く、タレも自家製で絶品でした。記念日に利用しましたが最高の思い出になりました。’,author:‘40代・夫婦’},{text:‘食べ放題のコスパが最高です。お肉の種類が豊富で何度来ても飽きません。’,author:‘20代・グループ’}],
‘飲食’:  [{text:‘料理の質が高く接客も丁寧でとても満足しました。また来ます。’,author:‘30代・カップル’},{text:‘ランチに毎週来ています。日替わりメニューがいつも楽しみです。’,author:‘40代・女性’}],
‘不動産’:[{text:‘希望条件を細かく聞いてもらい理想の物件が見つかりました。契約後のフォローも丁寧でした。’,author:‘30代・ファミリー’},{text:‘初めての一人暮らしで不安でしたが、わかりやすく説明してもらえて安心できました。’,author:‘20代・男性’}],
};
const key = Object.keys(db).find(k => lower.includes(k));
return db[key] || [{text:‘スタッフの方がとても親切で初めてでも安心して利用できました。また来ます。’,author:‘30代・女性’},{text:‘サービスのクオリティが高く満足しています。友人にも紹介しました。’,author:‘40代・男性’}];
}

function isLight(hex){
const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
return (r*299+g*587+b*114)/1000>128;
}

/* ── ロゴ画像アップロード ── */
let logoDataUrl = null;

function handleLogoFile(input) {
const file = input.files[0];
if (!file) return;
readLogoFile(file);
}
function handleLogoDrop(event) {
event.preventDefault();
const zone = document.getElementById(‘logoDropZone’);
zone.style.borderColor = ‘var(–bd-gold)’;
zone.style.background  = ‘rgba(200,168,74,0.02)’;
const file = event.dataTransfer.files[0];
if (file && file.type.startsWith(‘image/’)) readLogoFile(file);
}
function readLogoFile(file) {
const reader = new FileReader();
reader.onload = e => {
logoDataUrl = e.target.result;
document.getElementById(‘logoPreviewImg’).src = logoDataUrl;
document.getElementById(‘logoPreviewWrap’).style.display = ‘block’;
document.getElementById(‘logoPlaceholder’).style.display = ‘none’;
};
reader.readAsDataURL(file);
}
function clearLogo(e) {
e.preventDefault(); e.stopPropagation();
logoDataUrl = null;
document.getElementById(‘logoPreviewImg’).src = ‘’;
document.getElementById(‘logoPreviewWrap’).style.display = ‘none’;
document.getElementById(‘logoPlaceholder’).style.display = ‘flex’;
document.getElementById(‘logoFileInput’).value = ‘’;
}

/* ── 詳細設定アコーディオン ── */
function toggleDetail() {
const btn  = document.getElementById(‘detailToggle’);
const body = document.getElementById(‘detailBody’);
btn.classList.toggle(‘open’);
body.classList.toggle(‘open’);
}

/* ── カスタム入力値を収集 ── */
function getCustomData() {
const v = id => (document.getElementById(id)?.value || ‘’).trim();
const s1n = v(‘d_svc1_name’), s1d = v(‘d_svc1_desc’);
const s2n = v(‘d_svc2_name’), s2d = v(‘d_svc2_desc’);
const s3n = v(‘d_svc3_name’), s3d = v(‘d_svc3_desc’);
return {
about:     v(‘d_about’),
svcs:      [
s1n ? {n:s1n, d:s1d||‘詳細はお問い合わせください。’} : null,
s2n ? {n:s2n, d:s2d||‘詳細はお問い合わせください。’} : null,
s3n ? {n:s3n, d:s3d||‘詳細はお問い合わせください。’} : null,
].filter(Boolean),
hours:     v(‘d_hours’),
holiday:   v(‘d_holiday’),
address:   v(‘d_address’),
price:     v(‘d_price’),
instagram: v(‘d_instagram’),
booking:   v(‘d_booking’),
};
}

/* ── Generate ── */
function startGenerate(){
const name=document.getElementById(‘f_name’).value.trim();
const industry=document.getElementById(‘f_industry’).value.trim();
const catchCopy=document.getElementById(‘f_catch’).value.trim();
const contact=document.getElementById(‘f_contact’).value.trim();
const custom=getCustomData();
if(!name||!industry){alert(‘屋号と業種を入力してください。’);return;}
document.getElementById(‘step4’).style.display=‘none’;
document.getElementById(‘demoLoading’).classList.add(‘active’);
document.getElementById(‘mockupOuter’).classList.remove(‘active’);
document.getElementById(‘navBack’).classList.add(‘show’);
document.getElementById(‘navLinks’).style.display=‘none’;
[1,2,3,4,5].forEach((n,i)=>setTimeout(()=>document.getElementById(‘ls’+n).classList.add(‘done’),400+i*480));
setTimeout(()=>{
document.getElementById(‘iphoneScreen’).innerHTML=buildSiteHTML(name,industry,catchCopy,contact,selectedColor,selectedType,selectedLayout,patternIndex,custom);
document.getElementById(‘demoLoading’).classList.remove(‘active’);
document.getElementById(‘mockupOuter’).classList.add(‘active’);
[1,2,3,4,5].forEach(n=>document.getElementById(‘ls’+n).classList.remove(‘done’));
setTimeout(()=>document.getElementById(‘mockupOuter’).scrollIntoView({behavior:‘smooth’,block:‘start’}),200);
},2800);
}

/* ── Retry ── */
function retryGenerate(){
patternIndex++;
const name=document.getElementById(‘f_name’).value.trim();
const industry=document.getElementById(‘f_industry’).value.trim();
const catchCopy=document.getElementById(‘f_catch’).value.trim();
const contact=document.getElementById(‘f_contact’).value.trim();
const custom=getCustomData();
const mo=document.getElementById(‘mockupOuter’);
mo.style.opacity=‘0’;mo.style.transition=‘opacity .2s’;
setTimeout(()=>{
document.getElementById(‘iphoneScreen’).innerHTML=buildSiteHTML(name,industry,catchCopy,contact,selectedColor,selectedType,selectedLayout,patternIndex,custom);
mo.style.opacity=‘1’;
document.getElementById(‘iphoneScreen’).scrollTo({top:0,behavior:‘smooth’});
},220);
}

/* ============================================================
AI プロンプト修正機能 — Anthropic API
============================================================ */
async function applyAiPrompt() {
const promptInput = document.getElementById(‘aiPromptInput’);
const userPrompt  = promptInput.value.trim();
if (!userPrompt) return;

const screen  = document.getElementById(‘iphoneScreen’);
const sendBtn = document.getElementById(‘aiSendBtn’);
const status  = document.getElementById(‘aiStatus’);
const statusTxt = document.getElementById(‘aiStatusText’);

// 現在のHTML取得
const currentHTML = screen.innerHTML;
if (!currentHTML || currentHTML.length < 50) {
alert(‘先にサイトを生成してください。’);
return;
}

// UI: 送信中
sendBtn.disabled = true;
sendBtn.style.opacity = ‘0.4’;
status.style.display = ‘flex’;
statusTxt.textContent = ‘AIが修正内容を確認しています…’;
promptInput.disabled = true;

// 入力情報を取得（コンテキスト用）
const name     = document.getElementById(‘f_name’).value.trim();
const industry = document.getElementById(‘f_industry’).value.trim();

try {
statusTxt.textContent = ‘AIが修正しています…’;

```
// ── 「画像が合わない」系の指示はJSで直接対応（APIを使わない）
const lower = userPrompt.toLowerCase();
if (lower.includes('画像') || lower.includes('写真') || lower.includes('image') || lower.includes('photo')) {
  // 次のパターンの写真URLを取得
  const ind = document.getElementById('f_industry').value.trim();
  const newUrl = getPhotoUrl(ind, patternIndex + 1);
  // data-role="hero-photo" で確実に取得
  const heroImg = screen.querySelector('[data-role="hero-photo"]');
  if (heroImg) {
    heroImg.style.display = '';
    heroImg.src = newUrl;
    patternIndex++;
    promptInput.value = '';
    statusTxt.textContent = '✓ 画像を差し替えました';
    setTimeout(() => { status.style.display = 'none'; }, 2000);
  } else {
    // fallback: alt属性で探す
    const altImg = screen.querySelector('img[alt="' + ind + '"]');
    if (altImg) {
      altImg.style.display = '';
      altImg.src = newUrl;
      patternIndex++;
      promptInput.value = '';
      statusTxt.textContent = '✓ 画像を差し替えました';
    } else {
      statusTxt.textContent = '画像要素が見つかりませんでした';
    }
    setTimeout(() => { status.style.display = 'none'; }, 2000);
  }
  sendBtn.disabled = false;
  sendBtn.style.opacity = '1';
  promptInput.disabled = false;
  return;
}

// ── テキスト系の修正
// DOMからテキストコンテンツだけを安全に抽出
const tmp = document.createElement('div');
tmp.innerHTML = currentHTML;
tmp.querySelectorAll('svg, img, script').forEach(el => el.remove());
const textContent = tmp.textContent
  .replace(/\\s+/g, ' ')
  .trim()
  .slice(0, 3000);

// /api/ai-edit (Next.js server route) 経由でAnthropicを呼ぶ
const response = await fetch('/api/ai-edit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userPrompt: userPrompt, textContent: textContent, industry: industry, name: name })
});
if (!response.ok) {
  let errJson = {};
  try { errJson = await response.json(); } catch(_) {}
  throw new Error(errJson.error || 'API Error ' + response.status);
}
const result = await response.json();

if (!result.changes || result.changes.length === 0) {
  statusTxt.textContent = '変更箇所が見つかりませんでした';
  setTimeout(function() { status.style.display = 'none'; }, 2000);
  return;
}

let applied = 0;
let html = screen.innerHTML;
result.changes.forEach(function(ch) {
  if (!ch.oldText || !ch.newText) return;
  if (html.includes(ch.oldText)) {
    html = html.split(ch.oldText).join(ch.newText);
    applied++;
  }
});
if (applied > 0) screen.innerHTML = html;

screen.scrollTo({ top: 0, behavior: 'smooth' });
promptInput.value = '';
statusTxt.textContent = applied > 0 ? ('✓ ' + applied + '箇所を修正しました') : '該当テキストが見つかりませんでした';
setTimeout(function() { status.style.display = 'none'; }, 2500);
```

} catch(err) {
console.error(‘AI Error:’, err);
statusTxt.textContent = `エラー: ${err.message}`;
setTimeout(() => { status.style.display = ‘none’; }, 3500);
} finally {
sendBtn.disabled = false;
sendBtn.style.opacity = ‘1’;
promptInput.disabled = false;
}
}

`;

export default function Page() {
useEffect(() => {
const styleEl = document.createElement(‘style’);
styleEl.textContent = CSS_CONTENT;
document.head.appendChild(styleEl);

```
const linkEl = document.createElement('link');
linkEl.rel = 'stylesheet';
linkEl.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap';
document.head.appendChild(linkEl);

const scriptEl = document.createElement('script');
scriptEl.textContent = JS_CONTENT;
document.body.appendChild(scriptEl);

return () => {
  try { document.head.removeChild(styleEl); } catch(_) {}
  try { document.head.removeChild(linkEl); } catch(_) {}
  try { document.body.removeChild(scriptEl); } catch(_) {}
};
```

}, []);

return (
<div
id=“app-root”
suppressHydrationWarning
dangerouslySetInnerHTML={{ __html: HTML_CONTENT }}
/>
);
}