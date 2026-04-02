"use client";

import Link from "next/link";

export default function FloatingCTA() {
  return (
    <>
      <style>{`
        .ng-fixed-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 9998;
          background: rgba(6,14,28,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(109,190,214,0.25);
        }

        .ng-main-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 24px;
          text-decoration: none;
          width: 100%;
          transition: background 200ms ease;
        }
        .ng-main-bar:hover {
          background: rgba(109,190,214,0.06);
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
      `}</style>

      <div className="ng-fixed-bar">
        <Link href="/contact" className="ng-main-bar">
          <span className="ng-main-pulse" />
          <span className="ng-main-label">
            <span className="ng-main-en">CONTACT</span>
            <span className="ng-main-ja">お問い合わせ・無料相談はこちら</span>
          </span>
        </Link>
      </div>
    </>
  );
}
