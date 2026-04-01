import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: '企業情報 | NEXTGAME株式会社',
  description: 'NEXTGAME株式会社の企業情報です。',
};

export default function Page() {
  return <AboutClient />;
}
