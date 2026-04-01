import { Metadata } from 'next';
import { getNewsDetail } from '@/app/_libs/microcms';
import Article from '@/app/_components/Article';
import styles from './page.module.css';
import ButtonLink from '@/app/_components/ButtonLink';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    dk: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  const baseUrl = process.env.BASE_URL || 'https://nextgame-limited.com';

  // descriptionがない場合はタイトルで補完
  const description = data.description ||
    `${data.title} | NEXTGAME株式会社のお知らせです。名古屋市の就労継続支援B型事業所NEXTGAMEからの最新情報をお届けします。`;

  return {
    title: data.title,
    description,
    openGraph: {
      title: data.title,
      description,
      images: data?.thumbnail?.url ? [{ url: data.thumbnail.url }] : undefined,
      type: 'article',
      locale: 'ja_JP',
      siteName: 'NEXTGAME株式会社',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description,
      images: data?.thumbnail?.url ? [data.thumbnail.url] : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/news/${params.slug}`,
    },
  };
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  const baseUrl = process.env.BASE_URL || 'https://nextgame-limited.com';

  const description = data.description ||
    `${data.title} | NEXTGAME株式会社のお知らせです。名古屋市の就労継続支援B型事業所NEXTGAMEからの最新情報をお届けします。`;

  // 記事のJSON-LD構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: data.title,
    description,
    image: data?.thumbnail?.url ? [data.thumbnail.url] : undefined,
    datePublished: data.publishedAt,
    dateModified: data.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'NEXTGAME株式会社',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NEXTGAME株式会社',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/news/${params.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/news">ニュース一覧へ</ButtonLink>
      </div>
    </>
  );
}
