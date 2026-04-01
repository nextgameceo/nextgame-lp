'use client';

import { useState } from 'react';
import styles from './index.module.css';
import ButtonLink from '@/app/_components/ButtonLink';

export default function AboutTabs() {
  const [active, setActive] = useState<'about' | 'message'>('about');

  return (
    <div className={styles.wrapper}>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${active === 'about' ? styles.active : ''}`}
          onClick={() => setActive('about')}
        >
          私たちについて
        </button>
        <button
          className={`${styles.tab} ${active === 'message' ? styles.active : ''}`}
          onClick={() => setActive('message')}
        >
          代表者メッセージ
        </button>
      </div>

      {active === 'about' && (
        <div className={styles.content}>
          <p className={styles.description}>
            私たちは、単なる作業の提供ではなく、最新のAIツールを使いこなす「技術」の習得を支援の柱に据えています。個々の特性をデバッグし、AIというレバレッジを利かせることで、圧倒的な生産性と市場価値を創出する「次世代の就労支援モデル」の確立を目指します。

          </p>
          <dl className={styles.info}>
            <dt className={styles.infoTitle}>社名</dt>
            <dd className={styles.infoDescription}>NEXTGAME株式会社</dd>
          </dl>
          <dl className={styles.info}>
            <dt className={styles.infoTitle}>所在地</dt>
            <dd className={styles.infoDescription}>〒461-0001<br />愛知県名古屋市</dd>
          </dl>
          <dl className={styles.info}>
            <dt className={styles.infoTitle}>代表者</dt>
            <dd className={styles.infoDescription}>内山 博貴</dd>
          </dl>
          <dl className={styles.info}>
            <dt className={styles.infoTitle}>資本金</dt>
            <dd className={styles.infoDescription}>300,000円</dd>
          </dl>
          <dl className={styles.info}>
            <dt className={styles.infoTitle}>事業内容</dt>
            <dd className={styles.infoDescription}>
              1. 障害者の日常生活及び社会生活を総合的に支援するための法律に基づく障害福祉サービス事業<br />
              2. 就労継続支援B型事業所の運営及び管理<br />
              3. 障害者の就労支援、職業訓練、作業支援及び生活支援に関する事業<br />
              4. 情報通信技術（IT）及び人工知能（AI）等を活用した作業支援、職業訓練及び就労支援に関する事業<br />
              5. データ入力、データ処理、情報処理、デジタルコンテンツ制作その他の業務の受託及び請負<br />
              6. 音楽、楽曲、音声その他の表現コンテンツの企画、制作、編集、配信及び販売並びにこれらに関する業務の受託<br />
              7. 福祉事業に関連する物品及びデジタル成果物の企画、制作、販売並びに請負<br />
              8. 福祉事業に関する研修、教育、指導及びコンサルティング事業<br />
              9. 上記各号に附帯関連する一切の事業
            </dd>
          </dl>
        </div>
      )}

      {active === 'message' && (
        <div className={styles.content}>
          <p className={styles.messageLabel}>CEO MESSAGE</p>
          <p className={styles.description}>
            絶望の淵から見出した「正しい努力が報われる社会」を、NEXTGAME はデジタルと福祉の融合で実装します。創業者 内山博貴が、この事業に込めた覚悟をお伝えします。
          </p>
          <p className={styles.excerpt}>
            私は「統合失調感情障害」という精神病を発症し、精神科の隔離病棟へ措置入院という生き地獄を経験しました。退院後はB型事業所の利用者として現場に立ち、福祉業界の構造的問題をこの目で見抜いたのが NEXTGAME の原点です。
          </p>
          <div className={styles.cta}>
            <ButtonLink href="/ceo-message">代表者メッセージを読む</ButtonLink>
          </div>
        </div>
      )}

    </div>
  );
}
