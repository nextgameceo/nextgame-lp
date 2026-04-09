'use client';
import { usePathname } from 'next/navigation';
import FloatingCTA from '@/app/_components/FloatingCTA';
export default function FloatingCTAWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith('/lp/')) return null;
  return <FloatingCTA />;
}