import { Metadata } from 'next';
import Sheet from '@/app/_components/Sheet';

export const metadata: Metadata = {
  title: '工賃・キャリア | スキルに応じて工賃アップ',
  description: 'NEXTGAMEの工賃・キャリアパス。通所実績とスキルに応じて工賃が上がる仕組み。最終的には業務委託・個人事業主として独立するキャリアパスを設計します。',
  alternates: { canonical: '/wage' },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <Sheet>{children}</Sheet>;
}
