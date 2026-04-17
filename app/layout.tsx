import { Metadata } from 'next';
import { getMeta } from '@/app/_libs/microcms';
import FooterWrapper from '@/app/_components/FooterWrapper';
import HeaderWrapper from '@/app/_components/HeaderWrapper';
import InitialLoading from '@/app/_components/InitialLoading';
import MotionWrapper from '@/app/_components/MotionWrapper';
import ChatBot from '@/app/_components/ChatBot';
import { Orbitron } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  variable: '--font-orbitron',
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMeta();

  const defaultTitle = 'NEXTGAME株式会社 | Web制作・運用代行のサブスク専門会社';
  const defaultDesc = '愛知県名古屋市のWeb制作・運用代行・AI導入支援のサブスク専門会社。初期費用0円・制作費0円・月額29,800円〜。';
  const baseUrl = process.env.BASE_URL || 'https://nextgame-limited.com';

  if (!data) {
    return {
      metadataBase: new URL(baseUrl),
      title: {
        default: defaultTitle,
        template: '%s | NEXTGAME株式会社',
      },
      description: defaultDesc,
      keywords: ['Web制作', 'Web運用', 'サブスク', '名古屋', 'AI', 'LP制作', 'NEXTGAME'],
      verification: {
        google: '2sC_rYGGxiVwF5tE6DUiqsp8HhszO7aGSl_ka14Yj1Q',
      },
      openGraph: {
        type: 'website',
        locale: 'ja_JP',
        siteName: 'NEXTGAME株式会社',
        title: defaultTitle,
        description: defaultDesc,
        images: [{ url: `${baseUrl}/ogp.png`, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: defaultTitle,
        description: defaultDesc,
        images: [`${baseUrl}/ogp.png`],
      },
      icons: {
        icon: [
          { url: '/favicons/favicon.ico' },
          { url: '/favicons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
          { url: '/favicons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
          { url: '/favicons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { url: '/favicons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180' }],
      },
      manifest: '/favicons/manifest.json',
      alternates: {
        canonical: baseUrl,
      },
    };
  }

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: data.title || defaultTitle,
      template: '%s | NEXTGAME株式会社',
    },
    description: data.description || defaultDesc,
    keywords: ['Web制作', 'Web運用', 'サブスク', '名古屋', 'AI', 'LP制作', 'NEXTGAME'],
    verification: {
      google: '2sC_rYGGxiVwF5tE6DUiqsp8HhszO7aGSl_ka14Yj1Q',
    },
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: baseUrl,
      siteName: 'NEXTGAME株式会社',
      title: data.ogTitle || data.title || defaultTitle,
      description: data.ogDescription || data.description || defaultDesc,
      images: data.ogImage?.url
        ? [{ url: data.ogImage.url }]
        : [{ url: `${baseUrl}/ogp.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.ogTitle || data.title || defaultTitle,
      description: data.ogDescription || data.description || defaultDesc,
      images: data.ogImage?.url
        ? [data.ogImage.url]
        : [`${baseUrl}/ogp.png`],
    },
    icons: {
      icon: [
        { url: '/favicons/favicon.ico' },
        { url: '/favicons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/favicons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/favicons/manifest.json',
    alternates: {
      canonical: data.canonical || baseUrl,
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NEXTGAME株式会社',
  alternateName: 'NEXTGAME LIMITED',
  url: 'https://nextgame-limited.com',
  logo: 'https://nextgame-limited.com/logo.png',
  description: 'Web制作・運用代行・AI導入支援のサブスク専門会社。初期費用0円・制作費0円。',
  address: {
    '@type': 'PostalAddress',
    addressRegion: '愛知県',
    addressLocality: '名古屋市',
    addressCountry: 'JP',
  },
  sameAs: [
    'https://x.com/woomemorys?s=21',
    'https://www.instagram.com/nextgame.ltd',
  ],
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NEXTGAME株式会社',
  url: 'https://nextgame-limited.com',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja" className={orbitron.variable}>
      <body className={styles.body}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <InitialLoading />
        <HeaderWrapper />
        <main className={styles.main}>
          <MotionWrapper>
            {children}
          </MotionWrapper>
        </main>
        <FooterWrapper />
        <ChatBot />
        <div style={{
          position: 'fixed',
          bottom: '64px',
          right: '8px',
          fontSize: '0.55rem',
          color: 'rgba(255,255,255,0.15)',
          zIndex: 9999,
          pointerEvents: 'none',
          letterSpacing: '0.05em',
        }}>
          Powered by Google Translate
        </div>
      </body>
    </html>
  );
}
