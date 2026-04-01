import Image from 'next/image';
import { Metadata } from 'next';
import { formatRichText } from '@/app/_libs/utils';
import { getBusinessDetail } from '@/app/_libs/microcms';
import ButtonLink from '@/app/_components/ButtonLink';
import styles from './page.module.css';

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    dk: string;
  }>;
};

export const runtime = 'edge';

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getBusinessDetail(params.id, {
    draftKey: searchParams.dk,
  });

  return {
    title: '事業内容',
    description: data.description,
    openGraph: {
      title: '事業内容',
      description: data.description,
      images: [data?.image?.url || data?.logo?.url || ''],
    },
    alternates: {
      canonical: `/business/${params.id}`,
    },
  };
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getBusinessDetail(params.id, {
    draftKey: searchParams.dk,
  });

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        {data.logo ? (
          <Image
            src={data.logo.url}
            alt=""
            width={data.logo.width}
            height={data.logo.height}
            className={styles.logo}
          />
        ) : (
          '事業内容'
        )}
      </h1>
      <p className={styles.description}>{data.description}</p>
      {data.image && (
        <Image
          src={data.image.url}
          alt=""
          width={data.image.width}
          height={data.image.height}
          className={styles.thumbnail}
        />
      )}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: `${formatRichText(data.content)}`,
        }}
      />
      <div className={styles.footer}>
        <ButtonLink href={data.link} isExternal>
          サービスサイトへ
        </ButtonLink>
        <ButtonLink href="/business">事業一覧へ</ButtonLink>
      </div>
    </main>
  );
}
