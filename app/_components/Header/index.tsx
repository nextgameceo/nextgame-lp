'use client';

import Menu from '@/app/_components/Menu';
import styles from './index.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LANGUAGES = [
  { code: 'ja', label: 'JP' },
  { code: 'en', label: 'EN' },
  { code: 'zh-CN', label: '简' },
  { code: 'zh-TW', label: '繁' },
];

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function Header() {
  const [activeLang, setActiveLang] = useState('ja');

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'ja',
          autoDisplay: false,
        },
        'google-translate-element'
      );
    };

    const script = document.createElement('script');
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleLanguage = (code: string) => {
    setActiveLang(code);

    if (code === 'ja') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      window.location.reload();
      return;
    }

    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="NEXTGAME"
          width={140}
          height={40}
        />
      </Link>

      <div className={styles.right}>
        <div className={styles.langSwitch}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.langBtn} ${activeLang === lang.code ? styles.langBtnActive : ''}`}
              onClick={() => handleLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <Menu />
      </div>

      {/* Google Translate 非表示要素 */}
      <div id="google-translate-element" className={styles.translateHidden} />
    </header>
  );
}
