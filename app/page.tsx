"use client"

import { useEffect } from "react"

export default function Page() {
useEffect(() => {
// 外部フォントの読み込み
const link = document.createElement(‘link’);
link.rel = ‘stylesheet’;
link.href = ‘https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap’;
document.head.appendChild(link);
}, []);

const html = `<!DOCTYPE html>

<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NEXTGAME — サイトジェネレーター</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--black:#000;--white:#fff;--sub:#a0a0a0;--ice:#00d1ff;--yell:#ffd600;--green:#06C755;--rule:rgba(255,255,255,0.07);--rule2:rgba(255,255,255,0.04);--gold:#c8a84a;--gold-dim:rgba(200,168,74,0.18);--gold-glow:rgba(200,168,74,0.08);--bd-gold:rgba(200,168,74,0.22);--bd-gold-s:rgba(200,168,74,0.12);}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#000;color:#fff;font-family:'Noto Sans JP',sans-serif;line-height:1.8;overflow-x:hidden;padding-bottom:80px;}
a{text-decoration:none;color:inherit;}
nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:52px;background:rgba(0,0,0,0.94);backdrop-filter:blur(16px);border-bottom:1px solid var(--rule2);}
.nav-logo{font-family:'Syne',sans-serif;font-size:13px;font-weight:800;letter-spacing:0.18em;}
.nav-logo em{color:var(--ice);font-style:normal;}
.nav-back{font-size:10px;letter-spacing:0.14em;color:var(--sub);cursor:pointer;display:none;align-items:center;gap:6px;}
.nav-back.show{display:flex;}
.fixed-cta{position:fixed;bottom:0;left:0;right:0;z-index:300;padding:10px 16px 14px;background:#000;border-top:1px solid var(--rule);opacity:0;pointer-events:none;transition:opacity .4s;}
.fixed-cta.show{opacity:1;pointer-events:all;}
.fixed-cta a{display:flex;align-items:center;justify-content:center;gap:8px;background:var(--yell);color:#000;font-weight:700;font-size:14px;letter-spacing:0.06em;padding:15px 24px;border-radius:4px;width:100%;max-width:480px;margin:0 auto;}
.wrap{max-width:680px;margin:0 auto;padding:0 24px;}
.rule-line{height:1px;background:var(--rule);}
.label{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.4em;color:var(--sub);text-transform:uppercase;margin-bottom:40px;display:flex;align-items:center;gap:12px;}
.label::after{content:'';flex:1;height:1px;background:var(--rule);}
.r{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease;}
.r.on{opacity:1;transform:none;}
.r.d1{transition-delay:.1s;}.r.d2{transition-delay:.2s;}.r.d3{transition-delay:.3s;}
.hero{min-height:100svh;display:flex;flex-direction:column;justify-content:center;padding:120px 24px 80px;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,0.018) 79px,rgba(255,255,255,0.018) 80px);pointer-events:none;}
.hero::after{content:'';position:absolute;top:-120px;right:-60px;width:360px;height:360px;background:radial-gradient(circle,rgba(0,209,255,0.06) 0%,transparent 65%);pointer-events:none;}
.hero-eyebrow{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.3em;color:var(--ice);margin-bottom:32px;}
.hero-h1{font-family:'Syne',sans-serif;font-size:clamp(2.6rem,9vw,5.2rem);font-weight:800;line-height:1.06;letter-spacing:-0.025em;color:#fff;margin-bottom:36px;max-width:640px;}
.hero-h1 em{font-style:normal;color:var(--ice);}
.hero-sub{font-size:15px;color:var(--sub);line-height:1.85;max-width:460px;margin-bottom:60px;}
.hero-scroll{display:flex;align-items:center;gap:10px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.25em;color:rgba(255,255,255,0.25);}
.hero-scroll-line{width:40px;height:1px;background:rgba(255,255,255,0.2);position:relative;overflow:hidden;}
.hero-scroll-line::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:var(--ice);animation:slide-line 2s ease-in-out infinite;}
@keyframes slide-line{0%{left:-100%}100%{left:100%}}
.services{padding:100px 0;}
.service-item{display:flex;align-items:baseline;padding:36px 24px;border-bottom:1px solid var(--bd-gold-s);position:relative;cursor:default;transition:background .25s;}
.service-item:first-of-type{border-top:2px solid var(--gold);}
.service-item:hover{background:rgba(255,255,255,0.02);}
.service-item::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:2px;height:0;background:var(--ice);transition:height .3s ease;}
.service-item:hover::before{height:60%;}
.service-num{font-family:'DM Mono',monospace;font-size:10px;color:var(--sub);width:36px;flex-shrink:0;letter-spacing:0.1em;}
.service-title{font-family:'Syne',sans-serif;font-size:clamp(1.3rem,3.5vw,1.8rem);font-weight:700;color:#fff;letter-spacing:-0.01em;margin-bottom:6px;}
.service-desc{font-size:13px;color:var(--sub);line-height:1.7;max-width:480px;}
.service-tag{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.15em;color:var(--ice);border:1px solid rgba(0,209,255,0.2);padding:3px 8px;border-radius:2px;flex-shrink:0;align-self:center;display:none;}
@media(min-width:600px){.service-tag{display:block;}}
.numbers{padding:120px 0;position:relative;overflow:hidden;}
.numbers-item{padding:72px 24px;border-bottom:1px solid var(--bd-gold-s);position:relative;overflow:hidden;}
.numbers-item:first-child{border-top:2px solid var(--gold);}
.num-val{font-family:'Syne',sans-serif;font-size:clamp(5rem,20vw,12rem);font-weight:800;color:#fff;line-height:0.9;letter-spacing:-0.04em;margin-bottom:20px;opacity:0;transform:translateX(-16px);transition:opacity .8s ease,transform .8s ease;}
.num-val.on{opacity:1;transform:none;}
.num-val .accent{color:var(--ice);}
.num-val .yell{color:var(--yell);}
.num-label{font-size:16px;color:var(--sub);letter-spacing:0.04em;position:relative;z-index:1;}
.num-label strong{color:#fff;font-weight:700;margin-right:8px;}
.num-ghost{position:absolute;right:-20px;top:50%;transform:translateY(-50%);font-family:'Syne',sans-serif;font-size:clamp(8rem,30vw,20rem);font-weight:800;line-height:1;color:rgba(255,255,255,0.018);pointer-events:none;letter-spacing:-0.05em;user-select:none;}
.num-line{position:absolute;left:0;top:0;height:1px;width:0;background:var(--ice);transition:width 1s ease;}
.numbers-item.on .num-line{width:60px;}
.scarcity{padding:100px 0;}
.scarcity-heading{font-family:'Syne',sans-serif;font-size:clamp(1.1rem,3vw,1.5rem);font-weight:700;color:#fff;letter-spacing:-0.01em;max-width:480px;}
.slot-dot{width:10px;height:10px;border-radius:50%;}
.slot-dot.filled{background:var(--yell);}
.slot-dot.empty{background:rgba(255,255,255,0.12);}
.scarcity-note{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.15em;color:var(--sub);margin-left:12px;}
footer{padding:60px 24px 40px;border-top:1px solid var(--rule);}
.footer-logo{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;letter-spacing:0.14em;}
.footer-logo em{color:var(--ice);font-style:normal;}
.footer-copy{font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.2);letter-spacing:0.1em;}
.demo{padding:100px 0;}
.step-bar{display:flex;gap:0;margin-bottom:40px;}
.step-container{padding:28px 24px;border:1px solid var(--bd-gold);border-top:2px solid var(--gold);border-radius:8px;background:rgba(200,168,74,0.03);position:relative;}
.step-container::before{content:'';position:absolute;top:0;left:24px;right:24px;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.3),transparent);}
.step-item{flex:1;display:flex;flex-direction:column;gap:6px;cursor:default;}
.step-num{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.2em;color:rgba(160,160,160,0.35);}
.step-num.active{color:var(--ice);}
.step-line{height:1px;background:rgba(255,255,255,0.08);}
.step-line.active{background:var(--ice);}
.step-name{font-size:11px;color:rgba(160,160,160,0.35);letter-spacing:0.04em;}
.step-name.active{color:var(--sub);}
.field-group{margin-bottom:28px;}
.field-label{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.3em;color:rgba(160,160,160,0.5);text-transform:uppercase;margin-bottom:10px;display:block;}
.field-input{width:100%;background:rgba(200,168,74,0.03);border:1px solid var(--bd-gold);border-radius:4px;color:#fff;font-family:'Noto Sans JP',sans-serif;font-size:15px;padding:14px 18px;outline:none;transition:border-color .2s,background .2s;}
.field-input::placeholder{color:rgba(255,255,255,0.18);}
.field-input:focus{border-color:var(--gold);background:rgba(200,168,74,0.06);}
.field-textarea{width:100%;background:rgba(200,168,74,0.03);border:1px solid var(--bd-gold);border-radius:4px;color:#fff;font-family:'Noto Sans JP',sans-serif;font-size:14px;padding:12px 16px;outline:none;resize:vertical;min-height:80px;line-height:1.7;transition:border-color .2s;}
.field-textarea::placeholder{color:rgba(255,255,255,0.18);}
.field-textarea:focus{border-color:var(--gold);}
.color-grid{display:flex;flex-wrap:wrap;gap:10px;}
.color-swatch{width:44px;height:44px;border-radius:6px;cursor:pointer;border:2px solid transparent;transition:transform .15s,border-color .15s;position:relative;flex-shrink:0;}
.color-swatch:hover{transform:scale(1.08);}
.color-swatch.selected{border-color:#fff;}
.color-swatch.selected::after{content:'checkmark';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;}
.type-grid{display:flex;flex-direction:column;gap:8px;}
.type-option{display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid var(--bd-gold-s);border-radius:4px;cursor:pointer;transition:all .2s;background:rgba(200,168,74,0.02);}
.type-option:hover{border-color:var(--bd-gold);background:rgba(200,168,74,0.05);}
.type-option.selected{border-color:var(--gold);background:rgba(200,168,74,0.08);}
.type-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.type-name{font-size:14px;font-weight:700;color:#fff;}
.type-desc{font-size:11px;color:var(--sub);margin-top:2px;}
.type-badge{margin-left:auto;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.12em;color:var(--ice);border:1px solid rgba(0,209,255,0.2);padding:2px 8px;border-radius:2px;}
.layout-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.layout-option{border:1px solid var(--bd-gold-s);border-radius:6px;padding:12px;cursor:pointer;transition:all .2s;background:rgba(200,168,74,0.02);}
.layout-option:hover{border-color:var(--bd-gold);}
.layout-option.selected{border-color:var(--gold);background:rgba(200,168,74,0.08);}
.layout-thumb{height:60px;border-radius:4px;overflow:hidden;margin-bottom:8px;background:#111;}
.layout-name{font-size:12px;font-weight:700;color:#fff;margin-bottom:2px;}
.layout-sub{font-size:10px;color:var(--sub);line-height:1.5;}
.next-btn{width:100%;padding:16px;background:var(--gold);color:#000;font-family:'DM Mono',monospace;font-size:11px;letter-spacing:0.2em;font-weight:700;border:none;border-radius:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;margin-top:20px;transition:opacity .2s;}
.next-btn:hover{opacity:0.85;}
.back-link{display:flex;align-items:center;gap:6px;font-family:'DM Mono',monospace;font-size:10px;color:var(--sub);background:none;border:none;cursor:pointer;margin-top:16px;padding:4px 0;}
.loading-screen{display:none;flex-direction:column;align-items:center;justify-content:center;padding:60px 24px;text-align:center;}
.loading-screen.active{display:flex;}
.loading-bar-wrap{width:100%;max-width:300px;height:2px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;margin:24px 0 16px;}
.loading-bar{height:100%;background:var(--ice);border-radius:2px;width:0;transition:width .4s ease;}
.loading-step{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.2em;color:var(--sub);}
.mockup-outer{display:none;gap:24px;align-items:flex-start;}
.mockup-outer.active{display:flex;}
.iphone-frame{width:320px;flex-shrink:0;background:#1a1a1a;border-radius:40px;padding:14px;box-shadow:0 0 0 1px #333,0 32px 80px rgba(0,0,0,0.7),inset 0 0 0 1px #2a2a2a;position:sticky;top:80px;}
.iphone-notch{width:90px;height:26px;background:#000;border-radius:0 0 16px 16px;margin:0 auto 8px;}
.iphone-screen{height:580px;border-radius:28px;overflow-y:auto;overflow-x:hidden;background:#0d0d0d;scrollbar-width:none;}
.iphone-screen::-webkit-scrollbar{display:none;}
.iphone-home{width:120px;height:4px;background:#333;border-radius:2px;margin:10px auto 0;}
.ai-panel{flex:1;min-width:0;display:flex;flex-direction:column;gap:16px;}
.ai-panel-head{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.3em;color:var(--sub);}
.ai-input-wrap{display:flex;gap:8px;}
.ai-input{flex:1;background:rgba(200,168,74,0.03);border:1px solid var(--bd-gold);border-radius:4px;color:#fff;font-family:'Noto Sans JP',sans-serif;font-size:13px;padding:12px 14px;outline:none;resize:none;min-height:80px;transition:border-color .2s;}
.ai-input:focus{border-color:var(--gold);}
.ai-send-btn{align-self:flex-end;padding:10px 16px;background:var(--gold);color:#000;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.15em;font-weight:700;border:none;border-radius:4px;cursor:pointer;transition:opacity .2s;white-space:nowrap;}
.ai-send-btn:hover{opacity:0.85;}
.ai-status{display:none;align-items:center;gap:8px;font-family:'DM Mono',monospace;font-size:10px;color:var(--sub);}
.ai-status-dot{width:6px;height:6px;border-radius:50%;background:var(--ice);animation:pulse-dot 1s ease-in-out infinite;}
@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:0.3}}
.action-row{display:flex;gap:8px;flex-wrap:wrap;}
.action-btn{padding:9px 16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:4px;color:#fff;font-size:12px;cursor:pointer;transition:all .2s;}
.action-btn:hover{background:rgba(255,255,255,0.08);}
.action-btn.primary{background:var(--ice);color:#000;border-color:var(--ice);font-weight:700;}
.action-btn.primary:hover{opacity:0.85;}
.detail-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;padding:12px 0;background:none;border:none;border-top:1px solid var(--bd-gold-s);color:var(--sub);font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.15em;cursor:pointer;margin-top:8px;}
.detail-body{display:none;padding-top:20px;}
.detail-body.open{display:block;}
.detail-section-title{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:0.3em;color:rgba(200,168,74,0.5);text-transform:uppercase;margin:20px 0 10px;}
.detail-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
@media(max-width:768px){.mockup-outer.active{flex-direction:column;}.iphone-frame{width:100%;max-width:360px;margin:0 auto;}.iphone-frame{position:static;}.detail-row{grid-template-columns:1fr;}}
</style>
</head>
<body>

<nav>
  <div class="nav-logo"><em>NEXT</em>GAME</div>
  <div id="navLinks" style="display:flex;align-items:center;gap:20px;">
    <a href="#demo" style="font-size:11px;color:var(--sub);letter-spacing:0.1em;">Demo</a>
    <a href="https://lin.ee/SJDJXQv" target="_blank" style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.15em;color:var(--ice);border:1px solid rgba(0,209,255,0.25);padding:6px 14px;border-radius:3px;">相談する</a>
  </div>
  <button class="nav-back" id="navBack" onclick="resetDemo()">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
    戻る
  </button>
</nav>

<section class="hero" id="hero">
  <div class="wrap">
    <div class="hero-eyebrow r">NEXTGAME — AI Web Production</div>
    <h1 class="hero-h1 r d1">情報を入れるだけで、<br><em>完成した</em>サイトが現れる。</h1>
    <p class="hero-sub r d2">屋号・業種・カラー・レイアウトを入力するだけ。<br>そのまま使えるレベルのサイトが、その場で完成します。</p>
    <div class="hero-scroll r d3"><div class="hero-scroll-line"></div>SCROLL</div>
  </div>
</section>
<div class="rule-line"></div>

<section class="services"><div style="max-width:1000px;margin:0 auto;padding:0 24px;">
  <div class="wrap"><div class="label r">01 — Services</div></div>
  <div class="service-item r"><span class="service-num">01</span><div><div class="service-title">AI Web制作</div><div class="service-desc">LLMを設計の核に据えた、成果最優先のLP・コーポレートサイト。初期費用なし、運用まで一貫して担います。</div></div><span class="service-tag">制作費0円</span></div>
  <div class="service-item r d1"><span class="service-num">02</span><div><div class="service-title">SEO / MEO対策</div><div class="service-desc">検索・地図からの流入を設計段階から最適化。コンテンツ戦略・構造改善・継続モニタリングまで。</div></div><span class="service-tag">月次改善</span></div>
  <div class="service-item r d2"><span class="service-num">03</span><div><div class="service-title">運用・改善支援</div><div class="service-desc">公開後のデータを読み、毎月改善を重ねます。CV率・直帰率・滞在時間を継続的に最適化。</div></div><span class="service-tag">伴走型</span></div>
</div></section>
<div class="rule-line"></div>

<section class="demo" id="demo">
  <div class="wrap">
    <div class="label r">02 — Demo</div>
    <h2 class="r" style="font-family:'Syne',sans-serif;font-size:clamp(1.6rem,5vw,2.4rem);font-weight:800;line-height:1.15;letter-spacing:-0.02em;margin-bottom:16px;">情報を入れるだけで、<br>完成したサイトが現れる。</h2>
    <p class="r d1" style="font-size:14px;color:var(--sub);line-height:1.85;margin-bottom:44px;">屋号・業種・カラー・レイアウトを入力するだけ。<br>そのまま使えるレベルのサイトが、その場で完成します。</p>

```
<div class="step-bar r d1" id="stepBar">
  <div class="step-item"><div class="step-num active" id="sn1">STEP 01</div><div class="step-line active" id="sl1"></div><div class="step-name active" id="st1">基本情報</div></div>
  <div class="step-item"><div class="step-num" id="sn2">STEP 02</div><div class="step-line" id="sl2"></div><div class="step-name" id="st2">カラー</div></div>
  <div class="step-item"><div class="step-num" id="sn3">STEP 03</div><div class="step-line" id="sl3"></div><div class="step-name" id="st3">種別</div></div>
  <div class="step-item"><div class="step-num" id="sn4">STEP 04</div><div class="step-line" id="sl4"></div><div class="step-name" id="st4">レイアウト</div></div>
</div>

<!-- STEP 1 -->
<div id="step1" class="step-container">
  <div class="field-group r d2">
    <label class="field-label">屋号 / 会社名 *</label>
    <input class="field-input" id="f_name" type="text" placeholder="例：山田整体院 / 鈴木美容室">
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
  <div class="field-group r d2">
    <label class="field-label">ロゴ画像（任意）</label>
    <label id="logoDropZone" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;border:1px dashed var(--bd-gold);border-radius:6px;padding:22px 16px;cursor:pointer;background:rgba(200,168,74,0.02);transition:all .2s;" onclick="document.getElementById('logoFileInput').click()" ondragover="event.preventDefault();this.style.borderColor='var(--gold)'" ondragleave="this.style.borderColor='var(--bd-gold)'" ondrop="handleLogoDrop(event)">
      <div id="logoPreviewWrap" style="display:none;position:relative;">
        <img id="logoPreviewImg" style="max-height:56px;max-width:180px;border-radius:4px;object-fit:contain;" alt="logo">
        <button onclick="clearLogo(event)" style="position:absolute;top:-8px;right:-8px;width:20px;height:20px;border-radius:50%;background:#333;border:1px solid #555;color:#aaa;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;">x</button>
      </div>
      <div id="logoPlaceholder" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,74,0.5)" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <span style="font-size:12px;color:rgba(200,168,74,0.6);">クリックまたはドラッグ＆ドロップ</span>
        <span style="font-size:10px;color:var(--sub);">PNG / JPG / SVG — 推奨サイズ 200x60px以上</span>
      </div>
      <input type="file" id="logoFileInput" accept="image/*" style="display:none;" onchange="handleLogoFile(this)">
    </label>
  </div>
  <button class="detail-toggle r d2" id="detailToggle" onclick="toggleDetail()">
    <span>詳細設定（任意）</span>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
  </button>
  <div class="detail-body" id="detailBody">
    <div class="detail-section-title">サービス内容</div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <div><label class="field-label" style="margin-bottom:6px;display:block;">サービス①</label><div class="detail-row"><input class="field-input" id="d_svc1_name" type="text" placeholder="例：骨格矯正"><input class="field-input" id="d_svc1_desc" type="text" placeholder="例：歪みを整え、慢性的な痛みを改善します。"></div></div>
      <div><label class="field-label" style="margin-bottom:6px;display:block;">サービス②</label><div class="detail-row"><input class="field-input" id="d_svc2_name" type="text" placeholder="例：もみほぐし"><input class="field-input" id="d_svc2_desc" type="text" placeholder="例：日々の疲れとコリをしっかりほぐします。"></div></div>
      <div><label class="field-label" style="margin-bottom:6px;display:block;">サービス③</label><div class="detail-row"><input class="field-input" id="d_svc3_name" type="text" placeholder="例：スポーツケア"><input class="field-input" id="d_svc3_desc" type="text" placeholder="例：パフォーマンス向上と怪我予防をサポート。"></div></div>
    </div>
    <div class="detail-section-title">お店のこだわり・強み</div>
    <textarea class="field-textarea" id="d_about" placeholder="例：当院は開業15年。地域の方々に信頼いただいてきた整体院です。"></textarea>
    <div class="detail-section-title">営業情報</div>
    <div class="detail-row">
      <div><label class="field-label" style="margin-bottom:6px;display:block;">営業時間</label><input class="field-input" id="d_hours" type="text" placeholder="例：10:00〜20:00"></div>
      <div><label class="field-label" style="margin-bottom:6px;display:block;">定休日</label><input class="field-input" id="d_holiday" type="text" placeholder="例：毎週火曜日"></div>
    </div>
    <div class="detail-section-title">住所・アクセス</div>
    <input class="field-input" id="d_address" type="text" placeholder="例：名古屋市中区錦1-2-3（地下鉄栄駅 徒歩3分）" style="margin-bottom:10px;">
    <div class="detail-section-title">料金・プラン</div>
    <textarea class="field-textarea" id="d_price" placeholder="例：初回体験 3,000円 / 60分コース 6,000円" style="min-height:64px;"></textarea>
    <div class="detail-section-title">SNS・予約サイトURL</div>
    <div class="detail-row">
      <input class="field-input" id="d_instagram" type="text" placeholder="Instagram URL">
      <input class="field-input" id="d_booking" type="text" placeholder="予約サイト URL">
    </div>
    <div style="height:16px;"></div>
  </div>
  <button class="next-btn r d3" onclick="goStep(2)">次へ — カラーを選ぶ <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
</div>

<!-- STEP 2 -->
<div id="step2" class="step-container" style="display:none;">
  <div class="field-group r">
    <label class="field-label">メインカラーを選択</label>
    <div class="color-grid" id="colorGrid"></div>
  </div>
  <div class="field-group r d1" id="colorPreviewWrap" style="margin-top:20px;">
    <label class="field-label">選択中のカラー</label>
    <div style="display:flex;align-items:center;gap:12px;padding:14px 18px;border:1px solid var(--rule);border-radius:4px;">
      <div id="colorPreviewBox" style="width:36px;height:36px;border-radius:6px;flex-shrink:0;"></div>
      <div><div id="colorPreviewName" style="font-size:13px;font-weight:700;color:#fff;margin-bottom:2px;"></div><div id="colorPreviewHex" style="font-family:'DM Mono',monospace;font-size:10px;color:var(--sub);letter-spacing:0.1em;"></div></div>
    </div>
  </div>
  <button class="next-btn r d2" onclick="goStep(3)">次へ — サイト種別を選ぶ <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
  <button class="back-link" onclick="goStep(1)"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> 戻る</button>
</div>

<!-- STEP 3 -->
<div id="step3" class="step-container" style="display:none;">
  <div class="field-group r">
    <label class="field-label">サイトの種類を選択</label>
    <div class="type-grid" id="typeGrid">
      <div class="type-option selected" data-type="lp" onclick="selectType(this,'lp')"><div class="type-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div><div><div class="type-name">LP（ランディングページ）</div><div class="type-desc">問い合わせ・予約・購入に特化した1ページ構成</div></div><span class="type-badge">おすすめ</span></div>
      <div class="type-option" data-type="corporate" onclick="selectType(this,'corporate')"><div class="type-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div><div><div class="type-name">コーポレートサイト</div><div class="type-desc">会社・サービス・採用情報を網羅した多ページ構成</div></div></div>
      <div class="type-option" data-type="ec" onclick="selectType(this,'ec')"><div class="type-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg></div><div><div class="type-name">ECサイト</div><div class="type-desc">商品販売・カート機能を持つ通販サイト</div></div></div>
      <div class="type-option" data-type="recruit" onclick="selectType(this,'recruit')"><div class="type-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div><div><div class="type-name">採用サイト</div><div class="type-desc">求人・採用情報に特化した応募促進サイト</div></div></div>
      <div class="type-option" data-type="portfolio" onclick="selectType(this,'portfolio')"><div class="type-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div><div><div class="type-name">ポートフォリオ</div><div class="type-desc">実績・作品を魅せるブランドサイト</div></div></div>
    </div>
  </div>
  <button class="next-btn r d1" onclick="goStep(4)">次へ — レイアウトを選ぶ <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
  <button class="back-link" onclick="goStep(2)"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> 戻る</button>
</div>

<!-- STEP 4 -->
<div id="step4" class="step-container" style="display:none;">
  <div class="field-group r">
    <label class="field-label">レイアウトスタイルを選択</label>
    <div class="layout-grid" id="layoutGrid">
      <div class="layout-option selected" data-layout="minimal" onclick="selectLayout(this,'minimal')"><div class="layout-thumb"><svg viewBox="0 0 120 60" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="60" fill="#111"/><rect x="10" y="8" width="50" height="6" rx="2" fill="rgba(255,255,255,0.5)"/><rect x="10" y="18" width="35" height="3" rx="1" fill="rgba(255,255,255,0.15)"/><rect x="10" y="28" width="40" height="3" rx="1" fill="rgba(255,255,255,0.1)"/><rect x="10" y="46" width="22" height="7" rx="2" fill="#c8a84a"/></svg></div><div class="layout-name">ミニマル</div><div class="layout-sub">余白重視・高級感・文字で魅せる</div></div>
      <div class="layout-option" data-layout="bold" onclick="selectLayout(this,'bold')"><div class="layout-thumb"><svg viewBox="0 0 120 60" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="60" fill="#111"/><rect width="120" height="28" fill="#c8a84a" opacity="0.2"/><rect x="10" y="6" width="60" height="10" rx="2" fill="rgba(255,255,255,0.8)"/><rect x="10" y="20" width="40" height="4" rx="1" fill="rgba(255,255,255,0.3)"/><rect x="10" y="38" width="25" height="8" rx="2" fill="#c8a84a"/></svg></div><div class="layout-name">ボールド</div><div class="layout-sub">インパクト重視・若年層・エネルギッシュ</div></div>
      <div class="layout-option" data-layout="split" onclick="selectLayout(this,'split')"><div class="layout-thumb"><svg viewBox="0 0 120 60" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="60" fill="#111"/><rect width="60" height="60" fill="rgba(255,255,255,0.03)"/><rect x="8" y="12" width="44" height="6" rx="2" fill="rgba(255,255,255,0.6)"/><rect x="8" y="22" width="35" height="3" rx="1" fill="rgba(255,255,255,0.2)"/><rect x="8" y="42" width="24" height="7" rx="2" fill="#c8a84a"/><rect x="66" y="8" width="48" height="44" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(200,168,74,0.3)" stroke-width="1"/></svg></div><div class="layout-name">スプリット</div><div class="layout-sub">左テキスト・右ビジュアル・バランス型</div></div>
      <div class="layout-option" data-layout="centered" onclick="selectLayout(this,'centered')"><div class="layout-thumb"><svg viewBox="0 0 120 60" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="60" fill="#111"/><rect x="20" y="10" width="80" height="7" rx="2" fill="rgba(255,255,255,0.5)"/><rect x="30" y="21" width="60" height="3" rx="1" fill="rgba(255,255,255,0.15)"/><rect x="35" y="28" width="50" height="3" rx="1" fill="rgba(255,255,255,0.1)"/><rect x="42" y="43" width="36" height="7" rx="3" fill="#c8a84a"/></svg></div><div class="layout-name">センタード</div><div class="layout-sub">中央揃え・ブランド訴求・洗練された印象</div></div>
    </div>
  </div>
  <button class="next-btn r d1" id="generateBtn" onclick="generateSite()">このサイトを生成する <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
  <button class="back-link" onclick="goStep(3)"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> 戻る</button>
</div>

<!-- Loading -->
<div class="loading-screen" id="demoLoading">
  <div style="font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.3em;color:var(--ice);margin-bottom:20px;">GENERATING</div>
  <div class="loading-bar-wrap"><div class="loading-bar" id="loadingBar"></div></div>
  <div class="loading-step" id="loadingStep">情報を解析中...</div>
</div>

<!-- Mockup -->
<div class="mockup-outer" id="mockupOuter">
  <div class="iphone-frame">
    <div class="iphone-notch"></div>
    <div class="iphone-screen" id="iphoneScreen"></div>
    <div class="iphone-home"></div>
  </div>
  <div class="ai-panel">
    <div class="ai-panel-head">AI EDITOR — テキストを修正</div>
    <div class="ai-input-wrap">
      <textarea class="ai-input" id="aiPrompt" placeholder="例：ヒーローのコピーをもっと力強くして&#10;例：CTAボタンのテキストを予約するに変えて"></textarea>
      <button class="ai-send-btn" id="aiSendBtn" onclick="sendAiEdit()">修正</button>
    </div>
    <div class="ai-status" id="aiStatus"><div class="ai-status-dot"></div><span id="aiStatusText">AIが修正中...</span></div>
    <div class="action-row">
      <button class="action-btn" onclick="regenerate()">再生成</button>
      <button class="action-btn primary" onclick="downloadHTML()">HTML保存</button>
      <button class="action-btn" onclick="saveToMicroCMS()">LP公開</button>
    </div>
  </div>
</div>
```

  </div>
</section>
<div class="rule-line"></div>

<section class="numbers"><div class="wrap">
  <div class="label r">03 — Numbers</div>
  <div class="numbers-item" data-num="3"><div class="num-line"></div><div class="num-val"><span class="count-num">0</span><span class="accent">日</span></div><div class="num-label"><strong>最短</strong>納品までの日数</div><div class="num-ghost">3</div></div>
  <div class="numbers-item" data-num="0"><div class="num-line"></div><div class="num-val"><span class="count-num">0</span><span class="yell">円</span></div><div class="num-label"><strong>初期費用</strong>制作費0円スタート</div><div class="num-ghost">0</div></div>
  <div class="numbers-item" data-num="100"><div class="num-line"></div><div class="num-val"><span class="count-num">0</span><span class="accent">%</span></div><div class="num-label"><strong>AI活用率</strong>すべての工程にAIを統合</div><div class="num-ghost">100</div></div>
</div></section>
<div class="rule-line"></div>

<section class="scarcity"><div class="wrap">
  <div class="label r">04 — Availability</div>
  <div style="display:flex;flex-direction:column;gap:28px;">
    <div class="scarcity-heading r">新規パートナーシップは、<br>月に3社まで。</div>
    <div class="r d1"><div style="display:flex;gap:8px;align-items:center;"><span class="slot-dot filled"></span><span class="slot-dot filled"></span><span class="slot-dot empty"></span><span class="slot-dot empty"></span><span class="slot-dot empty"></span><span class="slot-dot empty"></span><span class="scarcity-note">1 / 3 受付中</span></div></div>
    <p class="r d2" style="font-size:13px;color:var(--sub);line-height:1.75;max-width:420px;">1社1社と本気で向き合うために、受付数を絞っています。<br>現在は新規のご相談を承っております。</p>
  </div>
</div></section>
<div class="rule-line"></div>

<section style="padding:100px 0;" id="faq"><div class="wrap">
  <div class="label r">05 — FAQ</div>
  <div style="display:flex;flex-direction:column;gap:8px;border:1px solid var(--bd-gold);border-top:2px solid var(--gold);border-radius:8px;overflow:hidden;padding:0 4px;background:rgba(200,168,74,0.02);">
    <div class="r" style="padding:24px 20px;border-bottom:1px solid var(--bd-gold-s);"><p style="font-size:14px;font-weight:700;color:#fff;margin-bottom:10px;">制作費が本当に0円なのですか？</p><p style="font-size:13px;color:var(--sub);line-height:1.8;">はい。月額サブスクを前提に、制作費はいただいていません。</p></div>
    <div class="r d1" style="padding:24px 20px;border-bottom:1px solid var(--bd-gold-s);"><p style="font-size:14px;font-weight:700;color:#fff;margin-bottom:10px;">3ヶ月後に解約できますか？</p><p style="font-size:13px;color:var(--sub);line-height:1.8;">できます。最低契約期間3ヶ月後は、月単位でいつでも解約いただけます。</p></div>
    <div class="r d2" style="padding:24px 20px;"><p style="font-size:14px;font-weight:700;color:#fff;margin-bottom:10px;">しつこい営業はありますか？</p><p style="font-size:13px;color:var(--sub);line-height:1.8;">一切ありません。「話だけ聞く」からで構いません。</p></div>
  </div>
</div></section>
<div class="rule-line"></div>

<footer><div style="max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:20px;"><div class="footer-logo"><em>NEXT</em>GAME</div><div style="display:flex;gap:24px;flex-wrap:wrap;"><a href="mailto:info@nextgame-limited.com" style="font-size:12px;color:var(--sub);">info@nextgame-limited.com</a><a href="/privacy" style="font-size:12px;color:var(--sub);">プライバシーポリシー</a></div><p class="footer-copy">© 2026 NEXTGAME Inc. All rights reserved.</p></div></footer>

<div class="fixed-cta" id="fixedCta"><a href="https://lin.ee/SJDJXQv" target="_blank"><svg width="18" height="18" viewBox="0 0 24 24" fill="black"><path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.91 1.42 5.5 3.64 7.28L5 22l3.45-1.82C9.56 20.7 10.75 21 12 21c5.52 0 10-4.27 10-9.5S17.52 2 12 2z"/></svg>無料相談する</a></div>

<script>
/* Scroll reveal */
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');ro.unobserve(e.target);}}),{threshold:0.07,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.r').forEach(el=>ro.observe(el));
const heroEl=document.getElementById('hero'),fixedCta=document.getElementById('fixedCta');
new IntersectionObserver(([e])=>fixedCta.classList.toggle('show',!e.isIntersecting),{threshold:0.1}).observe(heroEl);
function easeOut(t){return 1-Math.pow(1-t,3);}
function countUp(el,target,dur){let s=null;function step(ts){if(!s)s=ts;const p=Math.min((ts-s)/dur,1);el.textContent=Math.round(easeOut(p)*target);if(p<1)requestAnimationFrame(step);else el.textContent=target;}requestAnimationFrame(step);}
const nio=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;const item=e.target;item.classList.add('on');const ne=item.querySelector('.count-num'),ve=item.querySelector('.num-val');if(ne){const t=parseInt(item.dataset.num||'0',10);setTimeout(()=>countUp(ne,t,1200),200);}if(ve)setTimeout(()=>ve.classList.add('on'),100);nio.unobserve(item);});},{threshold:0.25});
document.querySelectorAll('.numbers-item').forEach(el=>nio.observe(el));

/* Colors */
const COLORS=[
{name:'ディープブルー',hex:'#1E3A8A',bg:'#060d1f',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(30,58,138,0.25) 0%,transparent 60%)'},
{name:'シアン',hex:'#00D1FF',bg:'#020c12',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(0,209,255,0.1) 0%,transparent 60%)'},
{name:'エメラルド',hex:'#10B981',bg:'#050f0a',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(16,185,129,0.12) 0%,transparent 60%)'},
{name:'ゴールド',hex:'#F59E0B',bg:'#0d0a02',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(245,158,11,0.1) 0%,transparent 60%)'},
{name:'コーラルレッド',hex:'#EF4444',bg:'#0f0505',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(239,68,68,0.1) 0%,transparent 60%)'},
{name:'パープル',hex:'#8B5CF6',bg:'#09050f',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(139,92,246,0.12) 0%,transparent 60%)'},
{name:'ローズゴールド',hex:'#EC4899',bg:'#0f0509',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(236,72,153,0.1) 0%,transparent 60%)'},
{name:'サンセット',hex:'#F97316',bg:'#0d0702',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(249,115,22,0.1) 0%,transparent 60%)'},
{name:'スレート',hex:'#64748B',bg:'#080a0d',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(100,116,139,0.1) 0%,transparent 60%)'},
{name:'ミントグリーン',hex:'#6EE7B7',bg:'#040d09',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(110,231,183,0.08) 0%,transparent 60%)'},
{name:'ネイビー',hex:'#1E40AF',bg:'#05080f',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(30,64,175,0.18) 0%,transparent 60%)'},
{name:'ホワイト',hex:'#E8E8E8',bg:'#0a0a0a',heroGrad:'radial-gradient(ellipse at 80% 20%,rgba(232,232,232,0.05) 0%,transparent 60%)'},
];
let selectedColor=COLORS[0],selectedType='lp',selectedLayout='minimal',patternIndex=0,logoDataUrl='';
const cg=document.getElementById('colorGrid');
COLORS.forEach((c,i)=>{const sw=document.createElement('div');sw.className='color-swatch'+(i===0?' selected':'');sw.style.background=c.hex;sw.title=c.name;sw.onclick=()=>{document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('selected'));sw.classList.add('selected');selectedColor=c;document.getElementById('colorPreviewBox').style.background=c.hex;document.getElementById('colorPreviewName').textContent=c.name;document.getElementById('colorPreviewHex').textContent=c.hex;};cg.appendChild(sw);});
document.getElementById('colorPreviewBox').style.background=COLORS[0].hex;
document.getElementById('colorPreviewName').textContent=COLORS[0].name;
document.getElementById('colorPreviewHex').textContent=COLORS[0].hex;
function selectType(el,type){document.querySelectorAll('.type-option').forEach(o=>o.classList.remove('selected'));el.classList.add('selected');selectedType=type;}
function selectLayout(el,layout){document.querySelectorAll('.layout-option').forEach(o=>o.classList.remove('selected'));el.classList.add('selected');selectedLayout=layout;}
function goStep(n){if(n===2){const name=document.getElementById('f_name').value.trim(),ind=document.getElementById('f_industry').value.trim();if(!name||!ind){alert('屋号と業種を入力してください。');return;}}[1,2,3,4].forEach(i=>{document.getElementById('step'+i).style.display=i===n?'block':'none';['sn','sl','st'].forEach(p=>{const el=document.getElementById(p+i);if(!el)return;el.classList.toggle('active',i<=n);});});}
function resetDemo(){goStep(1);document.getElementById('demoLoading').classList.remove('active');document.getElementById('mockupOuter').classList.remove('active');document.getElementById('navBack').classList.remove('show');document.getElementById('navLinks').style.display='flex';document.getElementById('iphoneScreen').innerHTML='';}
function toggleDetail(){const b=document.getElementById('detailBody');b.classList.toggle('open');}
function handleLogoFile(input){const file=input.files[0];if(!file)return;const reader=new FileReader();reader.onload=e=>{logoDataUrl=e.target.result;document.getElementById('logoPreviewImg').src=logoDataUrl;document.getElementById('logoPreviewWrap').style.display='block';document.getElementById('logoPlaceholder').style.display='none';};reader.readAsDataURL(file);}
function handleLogoDrop(e){e.preventDefault();document.getElementById('logoDropZone').style.borderColor='var(--bd-gold)';const file=e.dataTransfer.files[0];if(file&&file.type.startsWith('image/')){const input=document.getElementById('logoFileInput');const dt=new DataTransfer();dt.items.add(file);input.files=dt.files;handleLogoFile(input);}}
function clearLogo(e){e.stopPropagation();logoDataUrl='';document.getElementById('logoPreviewWrap').style.display='none';document.getElementById('logoPlaceholder').style.display='flex';document.getElementById('logoFileInput').value='';}

/* BIZ DB */
const BIZ_DB={
'整体':{kw:['整体','整骨','骨格','矯正','カイロ'],eyebrow:(n)=>n+' — 整体院 / 骨格矯正',h1s:(n)=>[n+'へようこそ。<br>体のお悩み、お任せください。','あなたの<br>体を、整える。','地域No.1の<br>整体院へ。'],subh:(n)=>n+'は、骨格矯正・コリ・痛みのお悩みに<br>丁寧に向き合います。',about:(n)=>n+'は、身体の歪みや慢性的なコリ・痛みに悩む方のためのサロンです。\n\n豊富な経験を持つ施術者が、お一人おひとりの体の状態を丁寧に確認し、根本からのケアを提供します。',svcs:()=>[{n:'骨格矯正・姿勢改善',d:'歪みを整え、慢性的な痛みの根本から改善します。'},{n:'もみほぐし・リラクゼーション',d:'日々の疲れとコリをしっかりほぐします。'},{n:'スポーツケア',d:'競技パフォーマンスの向上と怪我予防をサポート。'}],cta:(n)=>'まずは'+n+'へご相談ください。',ctaSub:'初回のご相談・お問い合わせはお気軽に。',ctaBtn:'予約・お問い合わせ'},
'美容室':{kw:['美容室','美容院','ヘア','hair','サロン','カット'],eyebrow:(n)=>n+' — ヘアサロン',h1s:(n)=>[n+'で、<br>なりたい自分へ。','毎日を、<br>もっと好きになれるヘアへ。'],subh:(n)=>n+'は、カット・カラー・パーマまで<br>お客様に合わせたスタイルをご提案します。',about:(n)=>n+'は、地域に根ざした美容室です。\n\n経験豊富なスタイリストが、あなたの骨格・髪質・ライフスタイルをしっかりヒアリングし、長持ちするスタイルをご提案します。',svcs:()=>[{n:'カット',d:'骨格に合わせた似合わせカットで、毎日のスタイリングが楽になります。'},{n:'カラー・ハイライト',d:'トレンドを取り入れながら、ダメージを最小限に抑えたカラーリング。'},{n:'パーマ・縮毛矯正',d:'扱いやすいスタイルで、朝の時間を短縮します。'}],cta:(n)=>n+'のご予約はこちら。',ctaSub:'ご予約はお電話・LINEで承ります。\n初めてのお客様も大歓迎です。',ctaBtn:'ご予約・お問い合わせ'},
'ネイル':{kw:['ネイル','nail'],eyebrow:(n)=>n+' — ネイルサロン',h1s:(n)=>[n+'で、<br>指先から美しく。','こだわりの<br>ネイルデザインを。'],subh:(n)=>n+'は、ジェルネイル・アート・ケアまで<br>お客様の理想を丁寧に仕上げます。',about:(n)=>n+'は、おひとりおひとりの爪の状態と好みに合わせた施術をご提供するネイルサロンです。',svcs:()=>[{n:'ジェルネイル',d:'豊富なカラーとデザインからお選びいただけます。'},{n:'ネイルアート',d:'シンプルからパーティーネイルまで幅広く対応。'},{n:'ネイルケア・補強',d:'爪の状態を整え、健康的で美しい指先をキープ。'}],cta:(n)=>n+'のご予約・お問い合わせ。',ctaSub:'ご予約はLINE・お電話で受け付けています。',ctaBtn:'ご予約はこちら'},
'歯科':{kw:['歯科','デンタル','口腔','dental','歯医者'],eyebrow:(n)=>n+' — 歯科クリニック',h1s:(n)=>[n+'で、<br>健康な歯を守る。','痛みに配慮した<br>やさしい歯科治療を。'],subh:(n)=>n+'は、一般歯科から審美歯科まで<br>地域の皆さまの口腔健康を守ります。',about:(n)=>n+'は、患者様の「痛みへの不安」に寄り添い、丁寧でやさしい治療を心がけています。',svcs:()=>[{n:'一般歯科・虫歯治療',d:'痛みに配慮した丁寧な治療で、歯を長持ちさせます。'},{n:'予防歯科・クリーニング',d:'定期的なケアで、虫歯・歯周病を予防します。'},{n:'審美歯科・ホワイトニング',d:'白くきれいな歯で、自信ある笑顔へ。'}],cta:(n)=>n+'へのご予約・お問い合わせ。',ctaSub:'お電話・ネットでご予約いただけます。',ctaBtn:'ご予約・お問い合わせ'},
'カフェ':{kw:['カフェ','cafe','コーヒー','喫茶'],eyebrow:(n)=>n+' — カフェ / コーヒー',h1s:(n)=>[n+'で、<br>ゆったりとした時間を。','こだわりの一杯が、<br>あなたを待っています。'],subh:(n)=>n+'は、こだわりのコーヒーと<br>手作りスイーツでお迎えします。',about:(n)=>n+'は、日々の喧噪を忘れてゆっくり過ごせるカフェです。',svcs:()=>[{n:'コーヒー・ドリンク',d:'スペシャルティコーヒーをはじめ、季節のドリンクをご用意。'},{n:'手作りスイーツ・フード',d:'毎朝丁寧に作るケーキとフードメニュー。'},{n:'貸切・テイクアウト',d:'少人数の集まりや持ち帰りにも対応しています。'}],cta:(n)=>n+'へのご予約・お問い合わせ。',ctaSub:'貸切・予約のご相談はお電話またはSNSまで。',ctaBtn:'お問い合わせ・予約'},
'飲食':{kw:['飲食','レストラン','食堂','居酒屋','料理','ラーメン','そば','うどん','焼肉','寿司','イタリアン','フレンチ','中華'],eyebrow:(n)=>n+' — レストラン',h1s:(n)=>[n+'の味を、<br>ぜひ体験してください。','こだわりの料理で、<br>特別なひとときを。'],subh:(n)=>n+'は、厳選した素材と丁寧な調理で<br>心に残る料理をご提供します。',about:(n)=>n+'は、地域の皆さまに愛され続けるお店を目指しています。',svcs:()=>[{n:'ランチメニュー',d:'毎日変わる日替わりランチからコースまで。'},{n:'ディナー・コース',d:'特別な日のディナーにも対応したコースメニュー。'},{n:'宴会・貸切',d:'グループでのご利用・ご宴会のご予約承ります。'}],cta:(n)=>n+'のご予約はこちら。',ctaSub:'ご予約はお電話・ネットで承ります。',ctaBtn:'ご予約・お問い合わせ'},
'不動産':{kw:['不動産','賃貸','売買','物件','マンション','土地'],eyebrow:(n)=>n+' — 不動産',h1s:(n)=>['理想の住まいを、<br>'+n+'で見つける。','安心の取引を、<br>プロがサポート。'],subh:(n)=>n+'は、賃貸・売買・管理まで<br>あなたの不動産の悩みをワンストップで解決します。',about:(n)=>n+'は、地域に密着した不動産会社です。',svcs:()=>[{n:'賃貸物件紹介',d:'豊富な賃貸物件の中から、ご希望に合った物件を提案。'},{n:'売買・購入サポート',d:'土地・マンション・一戸建ての購入を全面サポート。'},{n:'物件管理・リフォーム',d:'所有物件の管理・修繕・リフォームにも対応。'}],cta:(n)=>n+'への無料相談はこちら。',ctaSub:'物件探しのご相談はお気軽に。',ctaBtn:'無料相談・お問い合わせ'},
'建設':{kw:['建設','工務店','リフォーム','建築','内装','外壁','屋根'],eyebrow:(n)=>n+' — 建設 / リフォーム',h1s:(n)=>[n+'で、<br>理想の空間を実現する。','確かな技術で、<br>長く安心して暮らせる家を。'],subh:(n)=>n+'は、新築・リフォーム・外壁塗装まで<br>住まいのことなら何でもご相談ください。',about:(n)=>n+'は、地域密着で実績を持つ建設会社です。',svcs:()=>[{n:'新築・注文住宅',d:'お客様の希望を形にする、完全オーダーメイドの家づくり。'},{n:'リフォーム・リノベーション',d:'キッチン・浴室・内装から全面改装まで幅広く対応。'},{n:'外壁塗装・屋根工事',d:'防水・断熱・美観を保つ外装メンテナンス。'}],cta:(n)=>n+'の無料見積もり・相談はこちら。',ctaSub:'まずはお気軽にご相談ください。',ctaBtn:'無料見積もり・相談'},
};
const GENERIC={eyebrow:(n)=>n+' — プロフェッショナルサービス',h1s:(n)=>[n+'が、<br>あなたの課題を解決する。',''+n+'の<br>専門性をあなたに。'],subh:(n)=>n+'は、お客様一人ひとりに寄り添い、<br>最適なサービスをご提供します。',about:(n)=>n+'は、お客様のご要望に真摯に向き合い、高品質なサービスを提供しています。',svcs:(n)=>[{n:'ご相談・ヒアリング',d:'お客様のお悩みやご要望を丁寧にお伺いします。'},{n:'ご提案・お見積もり',d:'最適なプランとお見積もりをご提案いたします。'},{n:'サービス提供・アフターフォロー',d:'高品質なサービスの提供とその後のサポートまで。'}],cta:(n)=>n+'へのお問い合わせはこちら。',ctaSub:'お気軽にお問い合わせください。',ctaBtn:'お問い合わせ'};
function matchBiz(ind){const l=ind.toLowerCase();for(const key of Object.keys(BIZ_DB)){const b=BIZ_DB[key];if(b.kw.some(k=>l.includes(k.toLowerCase())))return b;}return null;}
function genericBiz(ind){return{...GENERIC,svcs:()=>GENERIC.svcs(ind)};}

/* Photo DB */
const PHOTO_DB={'整体':['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=640&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=640&q=80&auto=format&fit=crop'],'美容室':['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=640&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=640&q=80&auto=format&fit=crop'],'ネイル':['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=640&q=80&auto=format&fit=crop'],'歯科':['https://images.unsplash.com/photo-1588776814546-1ffbb2c64a55?w=640&q=80&auto=format&fit=crop'],'カフェ':['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=640&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640&q=80&auto=format&fit=crop'],'飲食':['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=640&q=80&auto=format&fit=crop'],'不動産':['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=640&q=80&auto=format&fit=crop'],'建設':['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=640&q=80&auto=format&fit=crop'],'default':['https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=640&q=80&auto=format&fit=crop']};
function getPhotoUrl(ind,pat){const l=ind.toLowerCase();const kmap=[{keys:['整体','整骨','骨格','矯正','マッサージ'],db:'整体'},{keys:['美容室','美容院','ヘア','hair','カット'],db:'美容室'},{keys:['ネイル','nail'],db:'ネイル'},{keys:['歯科','デンタル','歯医者'],db:'歯科'},{keys:['カフェ','cafe','コーヒー','喫茶'],db:'カフェ'},{keys:['飲食','レストラン','料理','食堂','ラーメン','うどん','そば','焼肉','寿司'],db:'飲食'},{keys:['不動産','賃貸','売買','物件','マンション'],db:'不動産'},{keys:['建設','工務店','リフォーム','建築','外壁'],db:'建設'}];const match=kmap.find(m=>m.keys.some(k=>l.includes(k.toLowerCase())));const list=PHOTO_DB[match?.db]||PHOTO_DB['default'];return list[pat%list.length];}

/* Layout styles */
const LAYOUT_STYLES={minimal:{heroBg:'#000',sectionBg:'#0a0a0a',sectionBg2:'#050505',lineColor:'rgba(255,255,255,0.06)',cardBg:'rgba(255,255,255,0.02)'},bold:{heroBg:'#080808',sectionBg:'#0f0f0f',sectionBg2:'#0a0a0a',lineColor:'rgba(255,255,255,0.08)',cardBg:'rgba(255,255,255,0.03)'},split:{heroBg:'#050505',sectionBg:'#0a0a0a',sectionBg2:'#080808',lineColor:'rgba(255,255,255,0.06)',cardBg:'rgba(255,255,255,0.02)'},centered:{heroBg:'#000',sectionBg:'#080808',sectionBg2:'#040404',lineColor:'rgba(255,255,255,0.06)',cardBg:'rgba(255,255,255,0.02)'}};
function isLight(hex){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return(r*299+g*587+b*114)/1000>128;}

function buildSiteHTML(name,industry,catchCopy,contact,color,type,layout,pattern,custom){
custom=custom||{};
const biz=matchBiz(industry)||genericBiz(industry);
const ls=LAYOUT_STYLES[layout]||LAYOUT_STYLES.minimal;
const accent=color.hex;
const tt=isLight(accent)?'#000':'#fff';
const photoUrl=getPhotoUrl(industry,pattern);
const eyebrow=biz.eyebrow(name);
const h1raw=catchCopy||biz.h1s(name)[pattern%biz.h1s(name).length];
const subh=biz.subh(name);
const ctaHead=biz.cta(name);
const ctaSub=biz.ctaSub.replace(/\n/g,'<br>');
const ctaBtn=biz.ctaBtn;
const ctaContact=contact||'お問い合わせ';
const aboutBase=custom.about||biz.about(name);
const about=aboutBase.replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>');
const svcs=(custom.svcs&&custom.svcs.length>0)?custom.svcs:biz.svcs(name);
var navLogoHTML=logoDataUrl?'<img src="'+logoDataUrl+'" style="height:26px;max-width:110px;object-fit:contain;vertical-align:middle;" alt="'+name+'">':name;
function makeSvcRow(s,i,a){var icons=['<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="'+a+'" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.85;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>','<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="'+a+'" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.65;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>','<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="'+a+'" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;margin-top:3px;opacity:0.55;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'];return '<div style="display:flex;gap:10px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">'+icons[i%icons.length]+'<div style="flex:1;"><div style="font-family:Syne,sans-serif;font-size:12px;font-weight:700;color:#fff;margin-bottom:4px;">'+s.n+'</div><div style="font-size:10px;color:#666;line-height:1.72;">'+s.d+'</div></div></div>';}
var svcsHTML=svcs.map(function(s,i){return makeSvcRow(s,i,accent);}).join('');
var infoRows=[(custom.hours?'<div style="display:flex;gap:8px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.04);"><span style="font-family:DM Mono,monospace;font-size:8px;color:'+accent+';opacity:0.7;width:52px;flex-shrink:0;">営業時間</span><span style="font-size:10px;color:#888;">'+custom.hours+(custom.holiday?'　定休：'+custom.holiday:'')+'</span></div>':''),
(custom.address?'<div style="display:flex;gap:8px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.04);"><span style="font-family:DM Mono,monospace;font-size:8px;color:'+accent+';opacity:0.7;width:52px;flex-shrink:0;">アクセス</span><span style="font-size:10px;color:#888;">'+custom.address+'</span></div>':''),
(custom.price?'<div style="display:flex;gap:8px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.04);"><span style="font-family:DM Mono,monospace;font-size:8px;color:'+accent+';opacity:0.7;width:52px;flex-shrink:0;">料金</span><span style="font-size:10px;color:#888;white-space:pre-line;">'+custom.price+'</span></div>':'')].filter(Boolean).join('');
var infoSection=infoRows?'<div style="padding:18px 16px;background:'+ls.sectionBg+';border:1px solid rgba(200,168,74,0.2);border-left:3px solid rgba(200,168,74,0.55);margin:8px;border-radius:6px;"><div style="font-family:DM Mono,monospace;font-size:7px;letter-spacing:0.35em;color:'+accent+';text-transform:uppercase;opacity:0.6;margin-bottom:10px;">Info</div>'+infoRows+'</div>':'';

return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:'+ls.heroBg+';color:#fff;font-family:Noto Sans JP,sans-serif;font-size:14px;line-height:1.7;}a{color:inherit;text-decoration:none;}</style></head><body>'

+’<div style="height:46px;background:'+ls.heroBg+';flex-shrink:0;"></div>’
+’<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:'+ls.heroBg+';border-bottom:1px solid rgba(255,255,255,0.06);"><span style="font-family:Syne,sans-serif;font-size:12px;font-weight:800;color:#fff;">’+navLogoHTML+’</span><span style="background:'+accent+';color:'+tt+';font-size:9px;padding:4px 10px;border-radius:3px;font-weight:700;">’+ctaContact+’</span></div>’
+’<div style="position:relative;height:200px;overflow:hidden;background:'+ls.heroBg+';"><img src="'+photoUrl+'" alt="'+industry+'" data-role="hero-photo" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;" onerror="this.style.display=\'none\'"><div style="position:absolute;inset:0;z-index:2;background:linear-gradient(135deg,'+accent+'22 0%,transparent 60%);pointer-events:none;"></div></div>’
+’<div style="padding:20px 16px 18px;background:'+ls.sectionBg2+';border-bottom:1px solid rgba(255,255,255,0.06);"><div style="font-family:DM Mono,monospace;font-size:8px;letter-spacing:0.22em;color:'+accent+';margin-bottom:8px;opacity:0.8;">’+eyebrow+’</div><h2 style="font-family:Syne,sans-serif;font-size:1.35rem;font-weight:800;color:#fff;line-height:1.12;letter-spacing:-0.02em;margin-bottom:10px;">’+h1raw+’</h2><p style="font-size:11px;color:#888;line-height:1.75;margin-bottom:14px;">’+subh+’</p><a href="#" style="display:inline-block;background:'+accent+';color:'+tt+';font-size:11px;font-weight:700;padding:10px 20px;border-radius:4px;">’+ctaBtn+’</a></div>’
+’<div style="padding:20px 16px;background:'+ls.sectionBg+';border-bottom:1px solid rgba(255,255,255,0.06);"><div style="font-family:DM Mono,monospace;font-size:7px;letter-spacing:0.35em;color:'+accent+';text-transform:uppercase;opacity:0.6;margin-bottom:14px;">Services</div>’+svcsHTML+’</div>’
+’<div style="padding:20px 16px;background:'+ls.sectionBg2+';border-bottom:1px solid rgba(255,255,255,0.06);"><div style="font-family:DM Mono,monospace;font-size:7px;letter-spacing:0.35em;color:'+accent+';text-transform:uppercase;opacity:0.6;margin-bottom:14px;">About</div><p style="font-size:11px;color:#888;line-height:1.8;">’+about+’</p></div>’
+infoSection
+’<div style="padding:24px 16px;background:'+accent+';text-align:center;"><div style="font-family:Syne,sans-serif;font-size:1rem;font-weight:800;color:'+tt+';margin-bottom:8px;">’+ctaHead+’</div><div style="font-size:10px;color:'+tt+';opacity:0.75;line-height:1.7;margin-bottom:14px;">’+ctaSub+’</div><a href="#" style="display:inline-block;background:'+tt+';color:'+accent+';font-size:11px;font-weight:700;padding:10px 20px;border-radius:4px;">’+ctaBtn+’</a></div>’
+’<div style="padding:16px;background:'+ls.heroBg+';border-top:1px solid rgba(255,255,255,0.06);"><div style="font-family:Syne,sans-serif;font-size:11px;font-weight:800;color:#fff;margin-bottom:6px;">’+name+’</div><div style="font-size:9px;color:#333;">© 2026 ‘+name+’. All rights reserved.</div></div>’
+’</body></html>’;}

function generateSite(){
const name=document.getElementById(‘f_name’).value.trim();
const industry=document.getElementById(‘f_industry’).value.trim();
const catchCopy=document.getElementById(‘f_catch’).value.trim();
const contact=document.getElementById(‘f_contact’).value.trim();
const s1n=document.getElementById(‘d_svc1_name’).value.trim(),s1d=document.getElementById(‘d_svc1_desc’).value.trim();
const s2n=document.getElementById(‘d_svc2_name’).value.trim(),s2d=document.getElementById(‘d_svc2_desc’).value.trim();
const s3n=document.getElementById(‘d_svc3_name’).value.trim(),s3d=document.getElementById(‘d_svc3_desc’).value.trim();
const custom={about:document.getElementById(‘d_about’).value.trim(),hours:document.getElementById(‘d_hours’).value.trim(),holiday:document.getElementById(‘d_holiday’).value.trim(),address:document.getElementById(‘d_address’).value.trim(),price:document.getElementById(‘d_price’).value.trim(),instagram:document.getElementById(‘d_instagram’).value.trim(),booking:document.getElementById(‘d_booking’).value.trim(),svcs:[s1n?{n:s1n,d:s1d}:null,s2n?{n:s2n,d:s2d}:null,s3n?{n:s3n,d:s3d}:null].filter(Boolean)};
[1,2,3,4].forEach(i=>document.getElementById(‘step’+i).style.display=‘none’);
document.getElementById(‘stepBar’).style.display=‘none’;
const loading=document.getElementById(‘demoLoading’);
loading.classList.add(‘active’);
const bar=document.getElementById(‘loadingBar’),stepTxt=document.getElementById(‘loadingStep’);
const steps=[‘業種を解析中…’,‘カラーパレットを適用中…’,‘レイアウトを構築中…’,‘コンテンツを生成中…’,‘最終調整中…’];
let si=0;bar.style.width=‘0%’;
const interval=setInterval(()=>{si++;bar.style.width=(si/steps.length*100)+’%’;stepTxt.textContent=steps[Math.min(si,steps.length-1)];if(si>=steps.length){clearInterval(interval);setTimeout(()=>{loading.classList.remove(‘active’);const html=buildSiteHTML(name,industry,catchCopy,contact,selectedColor,selectedType,selectedLayout,patternIndex,custom);const screen=document.getElementById(‘iphoneScreen’);screen.innerHTML=’’;const iframe=document.createElement(‘iframe’);iframe.style.cssText=‘width:100%;height:100%;border:none;’;screen.appendChild(iframe);iframe.contentDocument.open();iframe.contentDocument.write(html);iframe.contentDocument.close();document.getElementById(‘mockupOuter’).classList.add(‘active’);document.getElementById(‘navBack’).classList.add(‘show’);document.getElementById(‘navLinks’).style.display=‘none’;window.scrollTo({top:document.getElementById(‘demo’).offsetTop-60,behavior:‘smooth’});},300);}},600);}

function regenerate(){patternIndex++;const name=document.getElementById(‘f_name’).value.trim(),industry=document.getElementById(‘f_industry’).value.trim(),catchCopy=document.getElementById(‘f_catch’).value.trim(),contact=document.getElementById(‘f_contact’).value.trim();const html=buildSiteHTML(name,industry,catchCopy,contact,selectedColor,selectedType,selectedLayout,patternIndex,{});const screen=document.getElementById(‘iphoneScreen’);screen.innerHTML=’’;const iframe=document.createElement(‘iframe’);iframe.style.cssText=‘width:100%;height:100%;border:none;’;screen.appendChild(iframe);iframe.contentDocument.open();iframe.contentDocument.write(html);iframe.contentDocument.close();}

function downloadHTML(){const iframe=document.querySelector(’#iphoneScreen iframe’);if(!iframe){alert(‘先にサイトを生成してください。’);return;}const html=iframe.contentDocument.documentElement.outerHTML;const blob=new Blob([html],{type:‘text/html’});const a=document.createElement(‘a’);a.href=URL.createObjectURL(blob);a.download=‘site.html’;a.click();}

async function saveToMicroCMS(){
const iframe=document.querySelector(’#iphoneScreen iframe’);
if(!iframe){alert(‘先にサイトを生成してください。’);return;}
const name=document.getElementById(‘f_name’).value.trim();
const catchCopy=document.getElementById(‘f_catch’).value.trim();
const random=Math.random().toString(36).substring(2,8);
const slug=‘lp-’+random;
try{
const res=await fetch(’/api/create-lp’,{method:‘POST’,headers:{‘Content-Type’:‘application/json’},body:JSON.stringify({title:name,sub_title:catchCopy||name,content:’<p>’+name+‘のサービスページです。</p>’,accent_color:‘cyan’,layout:‘hero-center’,client_name:name,is_published:true,slug:slug})});
const data=await res.json();
if(res.ok){alert(‘LP公開完了！\nhttps://nextgame-limited.com/lp/’+data.slug+’\n\n約1〜2分後に公開されます。’);}
else{alert(’エラー: ’+data.error);}
}catch(e){alert(’エラー: ’+e.message);}}

async function sendAiEdit(){
const promptInput=document.getElementById(‘aiPrompt’);
const userPrompt=promptInput.value.trim();
if(!userPrompt){alert(‘修正内容を入力してください。’);return;}
const iframe=document.querySelector(’#iphoneScreen iframe’);
if(!iframe){alert(‘先にサイトを生成してください。’);return;}
const sendBtn=document.getElementById(‘aiSendBtn’);
const status=document.getElementById(‘aiStatus’);
const statusTxt=document.getElementById(‘aiStatusText’);
sendBtn.disabled=true;sendBtn.style.opacity=‘0.4’;status.style.display=‘flex’;statusTxt.textContent=‘AIが確認中…’;promptInput.disabled=true;
try{
const tmp=document.createElement(‘div’);tmp.innerHTML=iframe.contentDocument.body.innerHTML;tmp.querySelectorAll(‘svg,img,script’).forEach(el=>el.remove());
const textContent=tmp.textContent.replace(/\s+/g,’ ‘).trim().slice(0,3000);
const name=document.getElementById(‘f_name’).value.trim();
const industry=document.getElementById(‘f_industry’).value.trim();
const payload={model:‘claude-haiku-4-5-20251001’,max_tokens:1000,system:‘あなたはWebコピーライターです。ユーザーの指示に従いサイトのテキストを修正し、必ずJSON形式のみで返してください。形式: {“changes”:[{“oldText”:“変更前”,“newText”:“変更後”}]} 業種:’+industry+’ 屋号:’+name,messages:[{role:‘user’,content:’【修正指示】’+userPrompt+’\n\n【現在のテキスト】\n’+textContent}]};
const response=await fetch(‘https://api.anthropic.com/v1/messages’,{method:‘POST’,headers:{‘Content-Type’:‘application/json’,‘anthropic-version’:‘2023-06-01’,‘anthropic-dangerous-direct-browser-access’:‘true’},body:JSON.stringify(payload)});
const rawText=await response.text();
if(!response.ok)throw new Error(‘API Error ‘+response.status);
let data;try{data=JSON.parse(rawText);}catch(*){throw new Error(‘JSONパース失敗’);}
let resultText=’’;if(Array.isArray(data.content)){data.content.forEach(function(block){if(block.type===‘text’&&block.text)resultText+=block.text;});}
resultText=resultText.replace(/^`[\w]*\n?/i,'').replace(/\n?`\s*$/,’’).trim();
if(!resultText)throw new Error(‘レスポンスが空です’);
let result;try{result=JSON.parse(resultText);}catch(*){const match=resultText.match(/{[\s\S]*}/);if(match){try{result=JSON.parse(match[0]);}catch(_){throw new Error(‘JSONパース失敗’);}}else{throw new Error(‘JSONが見つかりません’);}}
if(!result.changes||result.changes.length===0){statusTxt.textContent=‘変更箇所が見つかりませんでした’;setTimeout(()=>{status.style.display=‘none’;},2000);return;}
let applied=0;let html=iframe.contentDocument.body.innerHTML;result.changes.forEach(function(ch){if(!ch.oldText||!ch.newText)return;if(html.includes(ch.oldText)){html=html.split(ch.oldText).join(ch.newText);applied++;}});
if(applied>0)iframe.contentDocument.body.innerHTML=html;
promptInput.value=’’;statusTxt.textContent=applied>0?(’✓ ’+applied+‘箇所を修正しました’):‘該当テキストが見つかりませんでした’;setTimeout(()=>{status.style.display=‘none’;},2500);
}catch(err){statusTxt.textContent=’エラー: ’+err.message;setTimeout(()=>{status.style.display=‘none’;},3500);}
finally{sendBtn.disabled=false;sendBtn.style.opacity=‘1’;promptInput.disabled=false;}}
</script>

</body>
</html>`;

return (
<div
style={{ width: ‘100%’, height: ‘100vh’, overflow: ‘hidden’ }}
dangerouslySetInnerHTML={{ __html: ‘’ }}
>
<iframe
srcDoc={html}
style={{ width: ‘100%’, height: ‘100vh’, border: ‘none’ }}
title=“NEXTGAME サイトジェネレーター”
/>
</div>
);
}