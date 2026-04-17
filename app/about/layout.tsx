import HeaderWrapper from '@/app/_components/HeaderWrapper';
import FooterWrapper from '@/app/_components/FooterWrapper';
import MotionWrapper from '@/app/_components/MotionWrapper';
import styles from '@/app/layout.module.css';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderWrapper />
      <main className={styles.main}>
        <MotionWrapper>
          {children}
        </MotionWrapper>
      </main>
      <FooterWrapper />
    </>
  );
}
