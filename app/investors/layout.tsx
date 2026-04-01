import { Metadata } from 'next';
import Sheet from '@/app/_components/Sheet';

export const metadata: Metadata = {
  title: 'NEXTGAME Investors | AI × 福祉 次世代型就労支援',
  description: 'NEXTGAMEの投資家向けページ。AIとITスキルを活用した次世代型就労支援事業のビジョン、ビジネスモデル、資金計画を公開しています。',
  alternates: { canonical: '/investors' },
};

type Props = {
  children: React.ReactNode;
};

export default function InvestorsLayout({ children }: Props) {
  return <Sheet>{children}</Sheet>;
}
