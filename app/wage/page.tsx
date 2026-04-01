import styles from './page.module.css';
import ButtonLink from '@/app/_components/ButtonLink';

export const metadata = {
  title: '工賃・キャリアプラン | NEXTGAME株式会社',
  description: 'NEXTGAMEでは最低工賃20,000円からスタートし、スキルと実績に応じて段階的にアップ。GitHubでの成果物評価により、施設外就労・個人事業主として自立するキャリアを支援します。',
};

export default function Page() {
  return (
    <div className={styles.container}>

      {/* ヘッダー */}
      <div className={styles.header}>
        <p className={styles.headerEn}>WAGE & CAREER</p>
        <h1 className={styles.headerTitle}>工賃・キャリアプラン</h1>
        <p className={styles.headerLead}>
          NEXTGAMEは、あなたの努力とスキルを正当に評価します。単純作業の繰り返しではなく、成長とともに収入が上がる本物のキャリアパスを用意しています。
        </p>
      </div>

      {/* 統計 */}
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <p className={styles.statNumber}>¥20,000</p>
          <p className={styles.statLabel}>スタート工賃</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statNumber}>¥50,000</p>
          <p className={styles.statLabel}>目標工賃</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statNumber}>¥70,000</p>
          <p className={styles.statLabel}>施設外就労 + PC付与</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statNumber}>ASK</p>
          <p className={styles.statLabel}>業務委託パートナー</p>
        </div>
      </div>

      {/* キャリアステップ */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEn}>CAREER STEPS</p>
          <h2 className={styles.sectionTitle}>キャリアステップ</h2>
          <p className={styles.sectionLead}>
            通所からはじまり、在宅勤務、そして個人事業主として独立する。NEXTGAMEのキャリアパスは、あなたの自立を本気でゴールにしています。
          </p>
        </div>

        <div className={styles.steps}>

          <div className={styles.step}>
            <div className={styles.stepLeft}>
              <p className={styles.stepNumber}>01</p>
              <div className={styles.stepLine} />
            </div>
            <div className={styles.stepBody}>
              <p className={styles.stepWage}>¥20,000〜</p>
              <h3 className={styles.stepTitle}>通所スタート</h3>
              <p className={styles.stepText}>
                まずはNEXTGAMEに通所しながら、楽曲制作を通じてAIプロンプトの基礎を学びます。実際に音楽を作りながらプロンプトエンジニアリングのスキルを身につけ、徐々にWeb制作などのIT業務へとステップアップ。GitHubで成果物を管理し、通所実績と技術習得に応じて工賃は段階的にアップしていきます。
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepLeft}>
              <p className={styles.stepNumber}>02</p>
              <div className={styles.stepLine} />
            </div>
            <div className={styles.stepBody}>
              <p className={styles.stepWage}>¥50,000〜</p>
              <h3 className={styles.stepTitle}>目標工賃フェーズ</h3>
              <p className={styles.stepText}>
                毎日通所を継続し、5ページ以上のホームページを一人で完成させられる、指導なしでタスクを自走できる、GitHubのプルリクエスト承認率が安定している。この4つが揃ったら¥50,000が見えてきます。この段階が施設外就労に向けた準備フェーズです。
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepLeft}>
              <p className={styles.stepNumber}>03</p>
              <div className={styles.stepLine} />
            </div>
            <div className={styles.stepBody}>
              <p className={styles.stepWage}>¥70,000〜 + PC付与</p>
              <h3 className={styles.stepTitle}>施設外就労（在宅勤務）</h3>
              <p className={styles.stepText}>
                GitHubでの成果物評価によりスキルが認められたら、自宅からリモートで業務に取り組む施設外就労へ移行します。この段階でハイスペックPCを付与。場所を選ばず働ける環境で、より実践的なスキルを磨きながら収入を伸ばしていきます。
              </p>
              <div className={styles.stepBadge}>💻 施設外就労移行時にハイスペックPC付与</div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepLeft}>
              <p className={styles.stepNumber}>04</p>
            </div>
            <div className={styles.stepBody}>
              <p className={styles.stepWage}>委託費用 要相談</p>
              <h3 className={styles.stepTitle}>業務委託・個人事業主として独立</h3>
              <p className={styles.stepText}>
                最終ゴールは、NEXTGAMEからの業務委託を受ける個人事業主としての独立です。自分のスキルで稼ぐ、本当の意味での経済的自立を実現します。
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 工賃が上がる仕組み */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEn}>EVALUATION</p>
          <h2 className={styles.sectionTitle}>工賃が上がる仕組み</h2>
          <p className={styles.sectionLead}>
            NEXTGAMEの工賃は、ただ通所するだけでは上がりません。GitHubに蓄積された成果物とスキルレベルが、正直に収入に反映される仕組みです。
          </p>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.cardEn}>01</p>
            <h3 className={styles.cardTitle}>通所実績</h3>
            <p className={styles.cardText}>
              継続して通所することが、信頼と実績の第一歩。安定した出席が工賃アップの基準になります。
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardEn}>02</p>
            <h3 className={styles.cardTitle}>GitHubの成果物</h3>
            <p className={styles.cardText}>
              実際の業務でGitHubに積み上げた成果物が評価されます。ブランチ・プルリクエストの承認率が、次のステージへの鍵です。
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardEn}>03</p>
            <h3 className={styles.cardTitle}>技術スキル</h3>
            <p className={styles.cardText}>
              AIやITスキルの習熟度が評価されます。できることが増えるほど、あなたの価値と工賃は上がります。
            </p>
          </div>
        </div>
      </div>

      {/* 代表メッセージ */}
      <div className={styles.message}>
        <p className={styles.messageText}>
          NEXTGAMEのゴールは、あなたが通い続けることではありません。あなたが自分の力で稼げるようになること。それが、私たちの本当の成功です。
        </p>
        <p className={styles.messageSignature}>代表取締役　内山 博貴</p>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <ButtonLink href="/recruit">採用情報を見る</ButtonLink>
        <ButtonLink href="/contact">お問い合わせ</ButtonLink>
      </div>

    </div>
  );
}
