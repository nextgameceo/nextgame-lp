import Link from 'next/link';
import { Article } from '@/app/_libs/microcms';
import PublishedDate from '../Date';
import Category from '../Category';
import styles from './index.module.css';

type Props = {
  articles?: Article[];
};

export default function TopNewsList({ articles }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <ul className={styles.list}>
      {articles.map((article, i) => (
        <li key={article.id} className={styles.item}>
          <Link href={`/news/${article.id}`} className={styles.link}>
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.body}>
              <span className={styles.meta}>
                <Category category={article.category} />
                <PublishedDate date={article.publishedAt || article.createdAt} />
              </span>
              <span className={styles.title}>{article.title}</span>
            </span>
            <span className={styles.arrow}>→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
