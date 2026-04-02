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
        }

        .ng-cta-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 16px 24px;
          text-decoration: none;
          width: 100%;
          background: linear-gradient(90deg, #0e7490 0%, #6dbed6 50%, #0e7490 100%);
          background-size: 200% auto;
          animation: ng-shine 3s linear infinite;
          border-top: 1px solid rgba(109,190,214,0.5);
          transition: filter 200ms ease;
        }
        .ng-cta-link:hover {
          filter: brightness(1.15);
        }

        @keyframes ng-shine {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .ng-cta-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          flex-shrink: 0;
        }
        .ng-cta-icon svg {
          width: 20px;
          height: 20px;
          color: #ffffff;
        }

        .ng-cta-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
        .ng-cta-en {
          font-family: var(--font-orbitron, monospace);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.75);
        }
        .ng-cta-ja {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.05em;
        }

        .ng-cta-arrow {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.8);
          margin-left: 4px;
          transition: transform 200ms ease;
        }
        .ng-cta-link:hover .ng-cta-arrow {
          transform: translateX(4px);
        }
      `}</style>

      <div className="ng-fixed-bar">
        <Link href="/contact" className="ng-cta-link">
          <span className="ng-cta-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <span className="ng-cta-text">
            <span className="ng-cta-en">FREE CONSULTATION</span>
            <span className="ng-cta-ja">無料相談・お問い合わせ</span>
          </span>
          <span className="ng-cta-arrow">→</span>
        </Link>
      </div>
    </>
  );
}
