'use client';

import { useEffect, useRef } from 'react';
import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
  delay?: number;
};

export default function FadeInSection({ children, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add(styles.visible);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={styles.hidden}>
      {children}
    </div>
  );
}
