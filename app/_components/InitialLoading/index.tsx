'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const MIN_LOADING_MS = 2000;
const LOGO_FADE_MS = 800;
export default function InitialLoading() {
  const [isActive, setIsActive] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    document.body.classList.add('loading-active');
    videoRef.current?.play().catch(() => {});

    const logoTimer = window.setTimeout(() => {
      setShowLogo(true);
    }, MIN_LOADING_MS);

    let fadeOutTimer: number | undefined;
    const hideTimer = window.setTimeout(() => {
      setIsFadingOut(true);
      fadeOutTimer = window.setTimeout(() => {
        setIsActive(false);
        document.body.classList.remove('loading-active');
      }, 500);
    }, MIN_LOADING_MS + LOGO_FADE_MS);

    return () => {
      window.clearTimeout(logoTimer);
      window.clearTimeout(hideTimer);
      if (fadeOutTimer) {
        window.clearTimeout(fadeOutTimer);
      }
      document.body.classList.remove('loading-active');
    };
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <div
      className={`${styles.overlay} ${isFadingOut ? styles.overlayFadeOut : ''}`}
      data-loading-overlay="true"
      aria-live="polite"
    >
      <div className={styles.content}>
        <video
          ref={videoRef}
          className={`${styles.video} ${showLogo ? styles.videoHidden : ''}`}
          src="/loads/loading_video.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div className={`${styles.logoWrapper} ${showLogo ? styles.logoVisible : ''}`}>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="NEXTGAME ロゴ"
            width={512}
            height={512}
            priority
          />
        </div>
      </div>
    </div>
  );
}
