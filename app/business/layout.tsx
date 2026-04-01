import { Metadata } from 'next';
import Sheet from '@/app/_components/Sheet';

export const metadata: Metadata = {
  title: '事業内容 | Web制作・楽曲制作・AIコンサルティング',
  description: '初期費用ゼロ・月額10万円で始めるWeb制作サブスク。WordPressより速く、制作会社より安い。名古屋発のAI特化チームが設計・開発・運用まで一括サポート。楽曲制作・AIコンサルティングも提供。',
  alternates: { canonical: '/business' },
  openGraph: {
    title: '事業内容 | NEXTGAME株式会社',
    description: '初期費用ゼロ・月額10万円で始めるWeb制作サブスク。WordPressより速く、制作会社より安い。名古屋発のAI特化チームが設計・開発・運用まで一括サポート。',
    url: 'https://nextgame-limited.com/business',
    siteName: 'NEXTGAME株式会社',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '事業内容 | NEXTGAME株式会社',
    description: '初期費用ゼロ・月額10万円で始めるWeb制作サブスク。WordPressより速く、制作会社より安い。名古屋発のAI特化チームが設計・開発・運用まで一括サポート。',
  },
  keywords: ['Web制作', 'ホームページ制作 名古屋', 'LP制作', '月額 Web制作', '楽曲制作 依頼', 'AIコンサルティング', 'Next.js', 'WordPress 乗り換え'],
};

type Props = {
  children: React.ReactNode;
};

export default function BusinessLayout({ children }: Props) {
  return <Sheet>{children}</Sheet>;
}
