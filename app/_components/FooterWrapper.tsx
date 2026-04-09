'use client';
import { usePathname } from 'next/navigation';
import Footer from '@/app/_components/Footer';
export default function FooterWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith('/lp/')) return null;
  return <Footer />;
}