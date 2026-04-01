import { Metadata } from 'next';
import Sheet from '@/app/_components/Sheet';

export const metadata: Metadata = {
  title: '採用情報 | 福祉×AIで業界を変える仲間募集',
  description: 'NEXTGAME株式会社の採用情報。AIとITで利用者の経済的自立を実現する挑戦に共に取り組む仲間を募集しています。業界最高峰の給与水準。',
  alternates: { canonical: '/recruit' },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <Sheet>{children}</Sheet>;
}
