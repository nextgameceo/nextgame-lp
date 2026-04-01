import { Metadata } from 'next';
import { getMeta } from '@/app/_libs/microcms';
import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import InitialLoading from '@/app/_components/InitialLoading';
import MotionWrapper from '@/app/_components/MotionWrapper';
import FloatingCTA from '@/app/_components/FloatingCTA';
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

  const defaultTitle = 'NEXTGAME株式会社 | AIスキルで稼ぐ、名古屋の就労継続支援B型事業所';
  const defaultDesc = '愛知県名古屋市のAI・IT特化型就労継続支援B型事業所。楽曲制作でAIプロンプトを学び、Web制作・ITスキルを習得しながら工賃を獲得。施設外就労・個人事業主として経済的に自立するキャリアパスを支援します。';
  const baseUrl = process.env.BASE_URL || 'https://nextgame-limited.com';

  if (!data) {
    return {
      metadataBase: new URL(baseUrl),
      title: {
        default: defaultTitle,
        template: '%s | NEXTGAME株式会社',
      },
      description: defaultDesc,
      keywords: ['就労継続支援B型', '名古屋', 'AI', 'プロンプトエンジニアリング', '利用者支援', '作業所', 'Web制作', '楽曲制作', 'NEXTGAME'],
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
    keywords: ['就労継続支援B型', '名古屋', 'AI', 'プロンプトエンジニアリング', '利用者支援', '作業所', 'Web制作', '楽曲制作', 'NEXTGAME'],
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
  description: '愛知県名古屋市のAI・IT特化型就労継続支援B型事業所。楽曲制作からWeb制作まで、AIプロンプトスキルを活かして工賃を獲得しながら経済的自立を目指せます。',
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
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://nextgame-limited.com/news?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja" className={orbitron.variable}>
      <body className={`${styles.body} loading-active`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <InitialLoading />
        <Header />
        <main className={styles.main}>
          <MotionWrapper>
            {children}
          </MotionWrapper>
        </main>
        <Footer />
        <FloatingCTA />
        <ChatBot />
        <div style={{
          position: 'fixed',
          bottom: '8px',
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
