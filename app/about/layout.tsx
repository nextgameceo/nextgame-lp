import { Metadata } from 'next';
import Sheet from '@/app/_components/Sheet';

export const metadata: Metadata = {
  title: '企業情報 | 愛知県名古屋市の就労継続支援B型事業所',
  description: 'NEXTGAME株式会社の企業情報。愛知県名古屋市に拠点を置く就労継続支援B型事業所。代表取締役 内山博貴のもと、障害のある方のスキル自立を目指します。',
  alternates: { canonical: '/about' },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <Sheet>{children}</Sheet>;
}
