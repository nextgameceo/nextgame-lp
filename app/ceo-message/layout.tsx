import { Metadata } from 'next';
import Sheet from '@/app/_components/Sheet';

export const metadata: Metadata = {
  title: '代表者メッセージ | 代表取締役 内山博貴',
  description: 'NEXTGAME株式会社 代表取締役 内山博貴からのメッセージ。障害のある方々がスキルで稼ぎ、自立できる社会の実現を目指す想いをお伝えします。',
  alternates: { canonical: '/ceo-message' },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <Sheet>{children}</Sheet>;
}
