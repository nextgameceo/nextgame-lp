"use client";

import { useState, useEffect, useRef } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [expanded]);

  return (
    <>
      <style>{`
        @keyframes ng-pulse {
          0%   { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes ng-slideUp {
          from { transform: translateX(-50%) translateY(120px); opacity: 0; }
          to   { transform: translateX(-50%) translateY(0);     opacity: 1; }
        }
        @keyframes ng-slideDown {
          from { transform: translateX(-50%) translateY(0);     opacity: 1; }
          to   { transform: translateX(-50%) translateY(120px); opacity: 0; }
        }

        .ng-cta-wrapper {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(120px);
          z-index: 9999;
          width: calc(100% - 32px);
          max-width: 480px;
          opacity: 0;
          pointer-events: none;
          transition: none;
        }
        .ng-cta-wrapper.visible {
          animation: ng-slideUp 500ms cubic-bezier(0.22,1,0.36,1) forwards;
          pointer-events: auto;
        }

        .ng-panel {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transform: translateY(8px);
          transition:
            max-height 400ms cubic-bezier(0.22,1,0.36,1),
            opacity 300ms ease,
            transform 350ms cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
          margin-bottom: 8px;
        }
        .ng-cta-wrapper.expanded .ng-panel {
          max-height: 300px;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .ng-panel-lead {
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: rgba(109,190,214,0.6);
          text-align: center;
          margin: 0 0 8px;
          text-transform: uppercase;
          font-family: inherit;
        }

        .ng-panel-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ng-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: 12px;
          text-decoration: none;
          border: 1px solid rgba(109,190,214,0.18);
          background: rgba(6,14,28,0.88);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          transition: border-color 200ms ease, background 200ms ease, transform 200ms ease;
          position: relative;
          overflow: hidden;
        }
        .ng-btn:hover {
          border-color: rgba(109,190,214,0.5);
          transform: translateY(-2px);
          background: rgba(6,14,28,0.95);
        }

        .ng-btn-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(109,190,214,0.08);
          border: 1px solid rgba(109,190,214,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6dbed6;
          transition: background 200ms ease, border-color 200ms ease;
        }
        .ng-btn-icon svg { width: 18px; height: 18px; }
        .ng-btn:hover .ng-btn-icon {
          background: rgba(109,190,214,0.15);
          border-color: rgba(109,190,214,0.45);
        }

        .ng-btn-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }
        .ng-btn-en {
          font-size: 0.57rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: rgba(109,190,214,0.65);
          transition: color 200ms ease;
          font-family: var(--font-orbitron, "Orbitron", monospace);
        }
        .ng-btn-ja {
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.9);
        }
        .ng-btn:hover .ng-btn-en { color: #6dbed6; }

        .ng-btn-arrow {
          font-size: 0.9rem;
          color: rgba(109,190,214,0.35);
          transition: color 200ms ease, transform 200ms ease;
          flex-shrink: 0;
        }
        .ng-btn:hover .ng-btn-arrow {
          color: #6dbed6;
          transform: translateX(3px);
        }

        .ng-bar {
          position: relative;
          width: 100%;
          padding: 0;
          border: none;
          cursor: pointer;
          border-radius: 14px;
          overflow: hidden;
          background: transparent;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }

        .ng-bar-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: rgba(6,14,28,0.82);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(109,190,214,0.22);
          border-radius: 14px;
          transition: border-color 250ms ease, background 250ms ease;
        }
        .ng-bar:hover .ng-bar-inner,
        .ng-cta-wrapper.expanded .ng-bar-inner {
          border-color: rgba(109,190,214,0.55);
          background: rgba(6,14,28,0.92);
        }

        .ng-bar-glow {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: 14px;
          background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(109,190,214,0.18) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 300ms ease;
          pointer-events: none;
        }
        .ng-bar:hover .ng-bar-glow { opacity: 1; }

        .ng-bar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ng-pulse {
          position: relative;
          width: 8px;
          height: 8px;
          flex-shrink: 0;
        }
        .ng-pulse::before,
        .ng-pulse::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }
        .ng-pulse::before {
          background: #6dbed6;
          box-shadow: 0 0 6px #6dbed6;
        }
        .ng-pulse::after {
          background: rgba(109,190,214,0.35);
          animation: ng-pulse 2s ease-out infinite;
        }

        .ng-bar-label {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .ng-bar-en {
          font-family: var(--font-orbitron, "Orbitron", monospace);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: #6dbed6;
        }
        .ng-bar-ja {
          font-size: 0.77rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.85);
        }

        .ng-caret {
          display: flex;
          align-items: center;
          width: 20px;
          height: 20px;
          color: rgba(109,190,214,0.65);
          transition: transform 350ms cubic-bezier(0.22,1,0.36,1), color 200ms ease;
        }
        .ng-caret svg { width: 100%; height: 100%; }
        .ng-cta-wrapper.expanded .ng-caret {
          transform: rotate(180deg);
          color: #6dbed6;
        }

        @media (max-width: 480px) {
          .ng-cta-wrapper { bottom: 16px; width: calc(100% - 24px); }
          .ng-bar-inner { padding: 13px 16px; }
          .ng-btn { padding: 12px 14px; }
          .ng-btn-ja { font-size: 0.77rem; }
        }
      `}</style>

      <div
        ref={barRef}
        className={`ng-cta-wrapper${visible ? " visible" : ""}${expanded ? " expanded" : ""}`}
      >
        <div className="ng-panel">
          <p className="ng-panel-lead">どのようなご用件ですか？</p>
          <div className="ng-panel-buttons">
            <a href="/contact?type=business" className="ng-btn">
              <span className="ng-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </span>
              <span className="ng-btn-text">
                <span className="ng-btn-en">FOR BUSINESS</span>
                <span className="ng-btn-ja">サービスを依頼する</span>
              </span>
              <span className="ng-btn-arrow">→</span>
            </a>
            <a href="/contact?type=user" className="ng-btn">
              <span className="ng-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <span className="ng-btn-text">
                <span className="ng-btn-en">FOR USERS</span>
                <span className="ng-btn-ja">見学・利用を相談する</span>
              </span>
              <span className="ng-btn-arrow">→</span>
            </a>
          </div>
        </div>

        <button
          className="ng-bar"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label="お問い合わせ"
        >
          <span className="ng-bar-inner">
            <span className="ng-bar-left">
              <span className="ng-pulse" />
              <span className="ng-bar-label">
                <span className="ng-bar-en">CONTACT</span>
                <span className="ng-bar-ja">お問い合わせ</span>
              </span>
            </span>
            <span className="ng-caret" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 10 L8 6 L12 10" />
              </svg>
            </span>
          </span>
          <span className="ng-bar-glow" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
