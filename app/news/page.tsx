import { getNewsList } from '@/app/_libs/microcms';
import { NEWS_LIST_LIMIT } from '@/app/_constants';
import NewsList from '@/app/_components/NewsList';
import Pagination from '@/app/_components/Pagination';
import styles from './page.module.css';

export const runtime = 'edge';

export default async function Page() {
  const data = await getNewsList({
    limit: NEWS_LIST_LIMIT,
  });
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <p className={styles.headerEn}>NEWS</p>
        <h1 className={styles.headerJa}>お知らせ</h1>
      </div>
      <NewsList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath="/news" />
    </div>
  );
}
