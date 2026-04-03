import Image from ‘next/image’;
import { getNewsList } from ‘@/app/_libs/microcms’;
import { TOP_NEWS_LIMIT } from ‘@/app/_constants’;
import TopNewsList from ‘@/app/_components/TopNewsList’;
import styles from ‘./page.module.css’;
import ButtonLink from ‘@/app/_components/ButtonLink’;
import FadeInSection from ‘@/app/_components/FadeInSection’;
import HeroCanvas from ‘@/app/_components/HeroCanvas’;

export const revalidate = 0;

export default async function Page() {
const data = await getNewsList({
limit: TOP_NEWS_LIMIT,
});

return (
<>
{/* Hero */}
<section className={styles.top}>
<HeroCanvas />
<div className={styles.heroContent}>
<div className={styles.heroLogoWrap}>
<Image
className={styles.heroLogo}
src="/logo.png"
alt="NEXTGAME ロゴ"
width={512}
height={512}
priority
/>
</div>
<div className={styles.heroText}>
<p className={styles.heroSubCatch}>
工賃を貰いながら最先端スキルを学べるB型作業所
</p>
<h1 className={styles.title}>YOUR IDEAS INTO ASSETS</h1>
<p className={styles.description}>
あなたのアイデアを資産へ
</p>
</div>
<div className={styles.heroScroll}>scroll</div>
</div>
<Image
className={styles.bgimg}
src="/img-mv.jpg"
alt=""
width={3600}
height={1200}
priority
/>
</section>

```
  {/* Business */}
  <section className={styles.section}>
    <FadeInSection>
      <div className={styles.sectionInner}>
        <div className={styles.sectionLeft}>
          <p className={styles.sectionNumber}>01</p>
          <h2 className={styles.sectionTitleEn}>To The Company</h2>
          <span className={styles.sectionTitleJa}>企業様へ</span>
        </div>
        <div className={styles.sectionRight}>
          <p className={styles.sectionDescription}>
            {`貴社のホームページはまだWordPressですか？\n\n制作会社に100万円以上を支払い、出来上がったサイトを「あとはご自身で」と渡される時代は終わりました。\n\nNEXTGAMEは初期費用ゼロ。設計・デザイン・開発・運用・改善まで、すべてを一括でサポートします。\n\n契約した翌月から、動き続けるWebサイトへ。作って終わりではなく、毎日進化する資産として。`}
          </p>
          <div>
            <ButtonLink href="/business">Read More</ButtonLink>
          </div>
        </div>
      </div>
    </FadeInSection>
  </section>

  <div className={styles.divider} />

  {/* For Users */}
  <div className={styles.wageSection}>
    <section className={styles.section}>
      <FadeInSection>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLeft}>
            <p className={styles.sectionNumber}>02</p>
            <h2 className={styles.sectionTitleEn}>For Users</h2>
            <span className={styles.sectionTitleJa}>利用者の方へ</span>
          </div>
          <div className={styles.sectionRight}>
            <p className={styles.sectionDescription}>
              {`利用者の皆様が、これからの未来に適応したスキルを取得し、アイデアで稼げる未来をビジョンとしています。\n\n弊社は従来の単純作業中心の作業所ではなく、利用者の皆様に工賃を支払いつつ、実際の業務を通じて、プロンプトエンジニアリングスキルをOJT教育し、経済的に自立が出来る支援を行います。\n\nまたNEXTGAMEは、通所実績とスキルに応じて工賃が上がる仕組みを用意しています。\n\n段階的なキャリアアップを経て、最終的には業務委託・個人事業主として独立するキャリアパスプランを設計します。`}
            </p>
            <div>
              <ButtonLink href="/wage">Read More</ButtonLink>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  </div>

  <div className={styles.divider} />

  {/* About */}
  <section className={styles.section}>
    <FadeInSection>
      <div className={styles.sectionInner}>
        <div className={styles.sectionLeft}>
          <p className={styles.sectionNumber}>03</p>
          <h2 className={styles.sectionTitleEn}>About Us</h2>
          <span className={styles.sectionTitleJa}>弊社について</span>
        </div>
        <div className={styles.sectionRight}>
          <p className={styles.sectionDescription}>
            {`NEXTGAME株式会社は、AI特化型の就労継続支援B型事業所です。\n\n楽曲制作でAIプロンプトを学び、GitHubで実績を積み、個人事業主として独立するキャリアパスを提供しています。\n\n「通うための場所」ではなく、「稼ぐスキルを会得する場所」を目指しています。`}
          </p>
          <div>
            <ButtonLink href="/about">Read More</ButtonLink>
          </div>
        </div>
      </div>
    </FadeInSection>
  </section>

  <div className={styles.divider} />

  {/* News */}
  <section className={styles.section}>
    <FadeInSection>
      <div className={styles.sectionInner}>
        <div className={styles.sectionLeft}>
          <p className={styles.sectionNumber}>04</p>
          <h2 className={styles.sectionTitleEn}>News</h2>
          <span className={styles.sectionTitleJa}>お知らせ</span>
        </div>
        <div className={styles.sectionRight}>
          <div className={styles.newsWrap}>
            <TopNewsList articles={data.contents} />
          </div>
          <div>
            <ButtonLink href="/news">Read More</ButtonLink>
          </div>
        </div>
      </div>
    </FadeInSection>
  </section>

  <div className={styles.divider} />

  {/* Recruit */}
  <div className={styles.recruitSection}>
    <section className={styles.section}>
      <FadeInSection>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLeft}>
            <p className={styles.sectionNumber}>05</p>
            <h2 className={styles.sectionTitleEn}>Recruit</h2>
            <span className={styles.sectionTitleJa}>採用情報</span>
          </div>
          <div className={styles.sectionRight}>
            <p className={styles.sectionDescription}>
              {`福祉業界の構造を変える、本気の仲間を募集しています。\n\nAIとITで利用者の経済的自立を実現する、未だかつてない挑戦に共に取り組みませんか？\n\n業界最高峰の給与水準で、あなたの覚悟に応えます。`}
            </p>
            <div>
              <ButtonLink href="/recruit">Read More</ButtonLink>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  </div>

  <div className={styles.divider} />

  {/* Investors */}
  <div className={styles.investorsSection}>
    <section className={styles.section}>
      <FadeInSection>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLeft}>
            <p className={styles.sectionNumber}>06</p>
            <h2 className={styles.sectionTitleEn}>For Investors</h2>
            <span className={styles.sectionTitleJa}>投資家・融資機関の方へ</span>
          </div>
          <div className={styles.sectionRight}>
            <p className={styles.sectionDescription}>
              {`NEXTGAMEは、AIとITスキルを活用し、障害のある方が本当に稼げる就労環境を創ることを目的とした次世代型の就労支援事業です。\n\n日本では現在、障害者人口の増加と共に、就労支援サービスの需要が急速に拡大しています。\n\nしかし多くのB型作業所では、平均工賃が月額2万円前後に留まるなど、持続的な収益モデルの構築が大きな課題となっています。\n\nNEXTGAMEはこの課題に対し、AI・ITスキルを中心とした高付加価値業務を提供することで、利用者の収入向上と事業の持続可能性を両立する新しいモデルを構築します。\n\n本ホームページは、NEXTGAMEの事業構想・ビジョン・事業モデルをまとめた、オンライン事業計画書として公開しています。\n\n現在、事業立ち上げ資金として3,500万円の資金調達を計画しています。\n\n社会課題の解決と持続可能な事業成長を両立する新しい福祉モデルにご関心をお持ちの投資家・金融機関の皆様は、ぜひ詳細をご覧ください。`}
            </p>
            <div>
              <ButtonLink href="/investors">詳細を見る</ButtonLink>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  </div>
</>
```

);
}