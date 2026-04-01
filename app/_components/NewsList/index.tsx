import { Article } from '@/app/_libs/microcms';
import NewsListItem from '../NewsListItem';
import styles from './index.module.css';

type Props = {
  articles?: Article[];
};

export default function NewsList({ articles }: Props) {
  if (!articles) {
    return null;
  }
  if (articles.length === 0) {
    return (
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', padding: '48px 0' }}>
        記事がありません。
      </p>
    );
  }
  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <NewsListItem key={article.id} news={article} />
      ))}
    </ul>
  );
}
