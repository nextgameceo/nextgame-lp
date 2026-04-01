import { getRecruitList } from '../_libs/microcms';
import styles from './page.module.css';
import ButtonLink from '../_components/ButtonLink';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page(props: any) {
  const searchParams = await props?.searchParams;

  let data = { contents: [] as any[] };

  try {
    const draftKey =
      typeof searchParams?.dk === 'string'
        ? searchParams.dk
        : undefined;

    data = await getRecruitList(
      draftKey ? { draftKey } : undefined
    );
  } catch (error) {
    console.error('Failed to fetch recruit list:', error);
  }

  return (
    <div className={styles.container}>

      {/* ヘッダー */}
      <div className={styles.header}>
        <p className={styles.headerEn}>RECRUIT</p>
        <h1 className={styles.headerTitle}>採用情報</h1>
        <p className={styles.headerLead}>
          福祉の枠を超えた、本気の仕事をしませんか。{'\n'}
          NEXTGAMEで共にチャレンジする仲間を募集しています。
        </p>
      </div>

      {/* 募集職種 */}
      <section className={styles.positions}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEn}>OPEN POSITIONS</p>
          <h2 className={styles.sectionTitle}>募集職種</h2>
        </div>

        {data.contents.length === 0 ? (
          <div className={styles.empty}>現在募集中のポジションはありません</div>
        ) : (
          <div className={styles.grid}>
            {data.contents.map((item) => (
              <div key={item.id} className={styles.card}>

                <div className={styles.cardHeader}>
                  <h3 className={styles.roleTitle}>{item.role}</h3>
                  <span className={styles.cardBadge}>OPEN</span>
                </div>

                <div className={styles.cardBody}>
                  {item.job_description && (
                    <div className={styles.cardRow}>
                      <p className={styles.cardLabel}>DESCRIPTION</p>
                      <div
                        className={styles.cardValue}
                        dangerouslySetInnerHTML={{ __html: item.job_description }}
                      />
                    </div>
                  )}

                  {item.salary && (
                    <div className={styles.cardRow}>
                      <p className={styles.cardLabel}>SALARY</p>
                      <div
                        className={styles.cardValue}
                        dangerouslySetInnerHTML={{ __html: item.salary }}
                      />
                    </div>
                  )}

                  {item.capacity && (
                    <div className={styles.cardRow}>
                      <p className={styles.cardLabel}>HEADCOUNT</p>
                      <div
                        className={styles.cardValue}
                        dangerouslySetInnerHTML={{ __html: item.capacity }}
                      />
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* 選考フロー */}
      <section>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEn}>HIRING PROCESS</p>
          <h2 className={styles.sectionTitle}>選考フロー</h2>
        </div>

        <ol className={styles.processList}>
          <li className={styles.processItem}>
            <span className={styles.processNumber}>01</span>
            <div className={styles.processContent}>
              <p className={styles.processTitle}>書類選考</p>
              <p className={styles.processText}>ご応募内容をもとに選考を行います。</p>
            </div>
          </li>
          <li className={styles.processItem}>
            <span className={styles.processNumber}>02</span>
            <div className={styles.processContent}>
              <p className={styles.processTitle}>一次面接</p>
              <p className={styles.processText}>業務内容やスキルについて確認します。</p>
            </div>
          </li>
          <li className={styles.processItem}>
            <span className={styles.processNumber}>03</span>
            <div className={styles.processContent}>
              <p className={styles.processTitle}>最終面接</p>
              <p className={styles.processText}>ビジョンの共感度とカルチャーフィットを確認します。</p>
            </div>
          </li>
        </ol>
      </section>

      {/* CTA */}
      <div className={styles.footer}>
        <div className={styles.footerText}>
          <h2 className={styles.message}>WE ARE HIRING</h2>
          <p className={styles.messageSub}>私たちは共にチャレンジする仲間を募集しています。</p>
        </div>
        <ButtonLink href="/contact">エントリーする</ButtonLink>
      </div>

    </div>
  );
}
