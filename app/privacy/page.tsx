import styles from './page.module.css';

export const metadata = {
  title: 'プライバシーポリシー | NEXTGAME株式会社',
  description: 'NEXTGAME株式会社のプライバシーポリシーです。',
};

export default function Page() {
  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <p className={styles.label}>PRIVACY POLICY</p>
        <h1 className={styles.title}>プライバシーポリシー</h1>
      </div>

      <div className={styles.card}>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>個人情報の取り扱いについて</h2>
          <p>NEXTGAME株式会社（以下「当社」）は、お客様の個人情報保護の重要性を認識し、個人情報の保護に関する法律（個人情報保護法）を遵守し、以下のとおりプライバシーポリシーを定めます。</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>収集する個人情報</h2>
          <p>当社は、以下の個人情報を収集することがあります。</p>
          <ul className={styles.list}>
            <li>氏名</li>
            <li>メールアドレス</li>
            <li>電話番号</li>
            <li>お問い合わせ内容</li>
            <li>その他、当社サービスの利用に際して提供いただいた情報</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>個人情報の利用目的</h2>
          <p>収集した個人情報は、以下の目的で利用します。</p>
          <ul className={styles.list}>
            <li>お問い合わせへの対応</li>
            <li>採用選考に関する連絡</li>
            <li>当社サービスに関する情報提供</li>
            <li>法令に基づく対応</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>個人情報の第三者提供</h2>
          <p>当社は、以下の場合を除き、お客様の個人情報を第三者に提供しません。</p>
          <ul className={styles.list}>
            <li>お客様の同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>人の生命・身体・財産の保護のために必要な場合</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>個人情報の管理</h2>
          <p>当社は、個人情報の漏洩・滅失・毀損を防止するため、適切なセキュリティ対策を実施します。また、個人情報を取り扱う従業員に対して、適切な監督を行います。</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>個人情報の開示・訂正・削除</h2>
          <p>お客様は、当社が保有する個人情報について、開示・訂正・削除を請求することができます。請求される場合は、下記のお問い合わせ窓口までご連絡ください。</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Cookieの使用</h2>
          <p>当社のウェブサイトでは、サービス向上のためCookieを使用することがあります。ブラウザの設定によりCookieを無効にすることができますが、一部のサービスが利用できなくなる場合があります。</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>プライバシーポリシーの変更</h2>
          <p>当社は、必要に応じて本プライバシーポリシーを改定することがあります。改定後のプライバシーポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>お問い合わせ窓口</h2>
          <p>個人情報に関するお問い合わせは、以下の窓口までご連絡ください。</p>
          <div className={styles.contact}>
            <p><span>会社名</span>NEXTGAME株式会社</p>
            <p><span>所在地</span>〒460-0001 愛知県名古屋市中区三の丸内</p>
            <p><span>代表者</span>内山 博貴</p>
          </div>
        </section>

        <p className={styles.date}>制定日：2024年1月1日</p>

      </div>

    </div>
  );
}
