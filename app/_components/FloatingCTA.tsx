"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  { en: "WEB", ja: "Web運用サブスク", href: "/contact?type=business&service=web", icon: "🌐" },
  { en: "MUSIC", ja: "楽曲制作・配信", href: "/contact?type=business&service=music", icon: "🎵" },
  { en: "AI", ja: "AI導入コンサル", href: "/contact?type=business&service=ai", icon: "🤖" },
  { en: "OTHER", ja: "その他のお問い合わせ", href: "/contact", icon: "📩" },
];

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .ng-fixed-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 9998;
        }

        .ng-dropdown {
          overflow: hidden;
          max-height: 0;
          transition: max-height 350ms cubic-bezier(0.22,1,0.36,1);
          background: rgba(4,10,20,0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(109,190,214,0.15);
        }
        .ng-dropdown.open {
          max-height: 300px;
        }

        .ng-dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          text-decoration: none;
          border-bottom: 1px solid rgba(109,190,214,0.08);
          transition: background 200ms ease;
        }
        .ng-dropdown-item:last-child {
          border-bottom: none;
        }
        .ng-dropdown-item:hover {
          background: rgba(109,190,214,0.08);
        }

        .ng-dropdown-icon {
          font-size: 1.1rem;
          width: 28px;
          text-align: center;
          flex-shrink: 0;
        }

        .ng-dropdown-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .ng-dropdown-en {
          font-family: var(--font-orbitron, monospace);
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #6dbed6;
        }

        .ng-dropdown-ja {
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.03em;
        }

        .ng-main-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(6,14,28,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(109,190,214,0.25);
          cursor: pointer;
          border: none;
          width: 100%;
          transition: background 200ms ease;
        }
        .ng-main-bar:hover {
          background: rgba(9,20,40,0.98);
        }

        .ng-main-pulse {
          position: relative;
          width: 7px;
          height: 7px;
          flex-shrink: 0;
        }
        .ng-main-pulse::before,
        .ng-main-pulse::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }
        .ng-main-pulse::before {
          background: #6dbed6;
          box-shadow: 0 0 6px #6dbed6;
        }
        .ng-main-pulse::after {
          background: rgba(109,190,214,0.35);
          animation: ng-pulse-fixed 2s ease-out infinite;
        }
        @keyframes ng-pulse-fixed {
          0%   { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }

        .ng-main-label {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1px;
        }
        .ng-main-en {
          font-family: var(--font-orbitron, monospace);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: #6dbed6;
        }
        .ng-main-ja {
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.04em;
        }

        .ng-main-caret {
          margin-left: 8px;
          color: rgba(109,190,214,0.7);
          transition: transform 350ms cubic-bezier(0.22,1,0.36,1);
          font-size: 0.7rem;
        }
        .ng-main-caret.open {
          transform: rotate(180deg);
        }
      `}</style>

      <div className="ng-fixed-bar">
        <div className={`ng-dropdown${open ? " open" : ""}`}>
          {services.map((s) => (
            <Link
              key={s.en}
              href={s.href}
              className="ng-dropdown-item"
              onClick={() => setOpen(false)}
            >
              <span className="ng-dropdown-icon">{s.icon}</span>
              <span className="ng-dropdown-text">
                <span className="ng-dropdown-en">{s.en}</span>
                <span className="ng-dropdown-ja">{s.ja}</span>
              </span>
            </Link>
          ))}
        </div>

        <button
          className="ng-main-bar"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="ng-main-pulse" />
          <span className="ng-main-label">
            <span className="ng-main-en">CONTACT</span>
            <span className="ng-main-ja">お問い合わせ・サービスを選ぶ</span>
          </span>
          <span className={`ng-main-caret${open ? " open" : ""}`}>▲</span>
        </button>
      </div>
    </>
  );
}
