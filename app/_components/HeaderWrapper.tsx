'use client';
import { usePathname } from 'next/navigation';
import Header from '@/app/_components/Header';
export default function HeaderWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith('/lp/')) return null;
  return <Header />;
}