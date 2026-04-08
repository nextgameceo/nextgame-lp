'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import cx from 'classnames';
import styles from './index.module.css';

const NAV_ITEMS = [
  { href: '/', labelEn: 'TOP', labelJa: 'トップ' },
  { href: '/about', labelEn: 'ABOUT', labelJa: '会社概要' },
  { href: '/lp/new', labelEn: 'DEMO', labelJa: 'LP無料生成' },
  { href: '/contact', labelEn: 'CONTACT', labelJa: 'お問い合わせ' },
];

export default function Menu() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <div>
      <nav className={cx(styles.nav, isOpen && styles.open)}>
        <div className={styles.mobileHeader}>
          <span className={styles.mobileLabel}>MENU</span>
          <button className={styles.closeBtn} onClick={close}>
            <Image src="/close.svg" alt="閉じる" width={20} height={20} priority />
          </button>
        </div>
        <ul className={styles.items}>
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.href}
              className={styles.item}
              style={{ '--i': i, '--delay': `${i * 55}ms` } as React.CSSProperties}
            >
              <Link href={item.href} onClick={close} className={styles.link}>
                <span className={styles.linkNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.linkText}>
                  <span className={styles.linkEn}>{item.labelEn}</span>
                  <span className={styles.linkJa}>{item.labelJa}</span>
                </span>
                <span
                  className={cx(styles.underline, isOpen && styles.underlineVisible)}
                  style={{ transitionDelay: isOpen ? `${i * 60 + 200}ms` : '0ms' }}
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileFooter}>
          <a href="https://x.com/woomemorys?s=21" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="X">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/nextgame.ltd" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </nav>
      <button className={styles.menuBtn} onClick={open} aria-label="メニューを開く">
        <span className={styles.hamburger}>
          <span /><span /><span />
        </span>
      </button>
    </div>
  );
}
