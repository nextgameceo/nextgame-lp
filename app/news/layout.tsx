import { Metadata } from 'next';
import Sheet from '@/app/_components/Sheet';

export const metadata: Metadata = {
  title: 'ニュース | お知らせ',
  description: 'NEXTGAME株式会社からの最新ニュース・お知らせ。事業の新着情報やイベント情報をお届けします。',
  alternates: { canonical: '/news' },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <Sheet>{children}</Sheet>;
}
