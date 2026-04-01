import { Metadata } from 'next';
import Sheet from '@/app/_components/Sheet';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'NEXTGAME株式会社へのお問い合わせはこちら。Web制作・楽曲制作・AIコンサルティングのご相談、採用に関するご質問など、お気軽にご連絡ください。',
  alternates: { canonical: '/contact' },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <Sheet>{children}</Sheet>;
}
