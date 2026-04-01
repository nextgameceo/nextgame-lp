'use client';

import { useState } from 'react';
import styles from './page.module.css';
import ButtonLink from '@/app/_components/ButtonLink';
import FadeInSection from '@/app/_components/FadeInSection';

type Tab = 'web' | 'music' | 'ai';

const tracks = [
  {
    title: "NEXTGAME",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/hiroki-uchiyama-905347469/nextgame&color=%236dbed6&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
  },
  {
    title: "1人じゃない",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/hiroki-uchiyama-905347469/1a2&color=%236dbed6&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('web');

  return (
    <div className={styles.container}>

      {/* Hero */}
      <div className={styles.hero}>
        <p className={styles.heroLabel}>BUSINESS</p>
        <h1 className={styles.heroTitle}>OUR SERVICES</h1>
        <p className={styles.heroJa}>名古屋の中小企業・個人事業主向けに、Web運用サブスク・楽曲制作・AI導入コンサルを提供しています。</p>
      </div>

      {/* タブ */}
      <div className={styles.tabBar}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'web' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('web')}
        >
          <span className={styles.tabNum}>01</span>
          <span className={styles.tabLabel}>Web Subscription</span>
          <span className={styles.tabJa}>Web運用サブスク</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'music' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('music')}
        >
          <span className={styles.tabNum}>02</span>
          <span className={styles.tabLabel}>Music Distribution</span>
          <span className={styles.tabJa}>楽曲制作</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'ai' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          <span className={styles.tabNum}>03</span>
          <span className={styles.tabLabel}>AI Consulting</span>
          <span className={styles.tabJa}>AI導入コンサル</span>
        </button>
      </div>

      {/* ===== 01 WEB ===== */}
      {activeTab === 'web' && (
        <FadeInSection key="web">
          <section className={styles.serviceSection}>
            <div className={styles.serviceHeader}>
              <span className={styles.serviceNumber}>01</span>
              <div className={styles.serviceTitleWrap}>
                <span className={styles.serviceTag}>中小企業・個人事業主向け</span>
                <h2 className={styles.serviceTitle}>Web運用サブスク</h2>
                <p className={styles.serviceTitleJa}>作って終わりにしない。毎月育てるWebサイトへ。</p>
              </div>
            </div>
            <div className={styles.serviceBody}>
              <div className={styles.serviceLeft}>
                <div className={styles.problemBlock}>
                  <p className={styles.problemQuestion}>ホームページ、作ったまま放置していませんか？</p>
                  <div className={styles.problemList}>
                    <p className={styles.problemItem}>最後に更新したのは1年以上前</p>
                    <p className={styles.problemItem}>問い合わせがほぼゼロ</p>
                    <p className={styles.problemItem}>Googleで自社名を検索しても出てこない</p>
                  </div>
                  <p className={styles.problemSub}>それは「Webサイトを持っている」のではなく、「眠らせている」状態です。</p>
                </div>
                <div className={styles.oldModelBlock}>
                  <p className={styles.oldModelText}>
                    多くの制作会社は作って納品したら終わり。更新・改善・SEO対策はすべて別料金。結果、誰も触れないまま古くなっていきます。
                  </p>
                  <div className={styles.oldModelResult}>
                    <p className={styles.oldModelResultItem}>更新されない</p>
                    <p className={styles.oldModelResultItem}>集客しない</p>
                    <p className={styles.oldModelResultItem}>資産にならない</p>
                  </div>
                </div>
                <div className={styles.answerBlock}>
                  <p className={styles.answerLabel}>NEXTGAMEは運用がメインです。</p>
                  <p className={styles.answerPrice}>初期費用 0円。月額 100,000円。</p>
                  <p className={styles.answerText}>
                    制作・更新・SEO改善・コンテンツ追加・デザイン修正まで、すべて月額内で対応します。Webサイトを「毎月成長する集客資産」に変えます。
                  </p>
                </div>
                <div className={styles.recommendBlock}>
                  <p className={styles.recommendLabel}>こんな企業におすすめ</p>
                  <div className={styles.recommendList}>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>ホームページが古く、更新できていない</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>WordPressの管理が面倒・セキュリティが不安</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>Webからの問い合わせをもっと増やしたい</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>制作会社に頼むと高額で更新も別料金だった</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>スマホで見たときの表示が崩れている</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>Googleの検索順位を上げたい</p></div>
                  </div>
                </div>
                <div className={styles.beforeAfterBlock}>
                  <p className={styles.beforeAfterLabel}>BEFORE / AFTER</p>
                  <p className={styles.beforeAfterTitle}>導入後、何が変わるか</p>
                  <div className={styles.beforeAfterGrid}>
                    <div className={styles.beforeCol}>
                      <p className={styles.beforeColLabel}>導入前</p>
                      <div className={styles.beforeItem}>表示が遅くユーザーが離脱</div>
                      <div className={styles.beforeItem}>更新のたびに追加費用が発生</div>
                      <div className={styles.beforeItem}>SEO対策が後回しで検索流入ゼロ</div>
                      <div className={styles.beforeItem}>古いデザインで信頼性が低く見られる</div>
                      <div className={styles.beforeItem}>WordPressが脆弱性の温床に</div>
                    </div>
                    <div className={styles.afterCol}>
                      <p className={styles.afterColLabel}>導入後</p>
                      <div className={styles.afterItem}>Next.jsで表示速度スコア95点以上</div>
                      <div className={styles.afterItem}>月額内で更新・改善をすべて対応</div>
                      <div className={styles.afterItem}>AIでSEO記事を毎月追加・検索流入UP</div>
                      <div className={styles.afterItem}>モダンデザインで第一印象から信頼獲得</div>
                      <div className={styles.afterItem}>サーバーレスでハッキングリスク激減</div>
                    </div>
                  </div>
                </div>
                <div className={styles.diffBlock}>
                  <p className={styles.diffLabel}>WHY NEXTGAME</p>
                  <p className={styles.diffTitle}>他社と何が違うのか</p>
                  <div className={styles.diffList}>
                    <div className={styles.diffItem}>
                      <p className={styles.diffItemTitle}>① 運用まで含めた月額定額</p>
                      <p className={styles.diffItemText}>制作会社は作って終わり。NEXTGAMEは運用がメインです。コンテンツ更新・SEO改善・デザイン修正まですべて月額10万円に含まれます。</p>
                    </div>
                    <div className={styles.diffItem}>
                      <p className={styles.diffItemTitle}>② Next.js制作でWordPressの10倍速い</p>
                      <p className={styles.diffItemText}>最新のNext.js制作でGoogleのコアウェブバイタル高スコアを実現。表示速度はSEOに直結します。WordPressからの乗り換えで検索順位が改善します。</p>
                    </div>
                    <div className={styles.diffItem}>
                      <p className={styles.diffItemTitle}>③ AI活用でコンテンツを毎月追加</p>
                      <p className={styles.diffItemText}>AIを活用した記事生成・コンテンツ運用で、毎月新しいページを追加し続けます。更新頻度が上がるほどGoogleの評価も上がります。</p>
                    </div>
                    <div className={styles.diffItem}>
                      <p className={styles.diffItemTitle}>④ 発注が社会貢献につながる</p>
                      <p className={styles.diffItemText}>NEXTGAMEは障害者就労支援とIT事業を兼ねた唯一無二の組織です。発注することで障害のある方のキャリア形成を直接支援できます。</p>
                    </div>
                  </div>
                </div>
                <div className={styles.techStackBlock}>
                  <p className={styles.techStackLabel}>TECH STACK</p>
                  <div className={styles.techStack}>
                    {['Next.js', 'microCMS', 'Cloudflare', 'GitHub', 'Vercel'].map((tech) => (
                      <span key={tech} className={styles.techBadge}>{tech}</span>
                    ))}
                  </div>
                  <p className={styles.techStackDesc}>
                    プラグイン依存のWordPressではなく、高速・安全・拡張可能なNext.jsで構築します。毎月のコンテンツ運用にはAIを活用し、Webサイトを成長し続けるメディアとして運用します。
                  </p>
                </div>
                <div className={styles.whyBox}>
                  <p className={styles.whyLabel}>COST COMPARISON</p>
                  <p className={styles.whyTitle}>Web運用サブスクと従来型の比較</p>
                  <div className={styles.whyList}>
                    <div className={styles.whyItem}>
                      <span className={styles.whyItemLabel}>表示速度（Googleスコア）</span>
                      <div className={styles.whyBar}>
                        <div className={styles.whyBarFill} style={{width: '95%'}}><span>Next.js 95点</span></div>
                      </div>
                      <div className={styles.whyBar}>
                        <div className={`${styles.whyBarFill} ${styles.whyBarSub}`} style={{width: '55%'}}><span>WordPress 55点</span></div>
                      </div>
                    </div>
                    <div className={styles.whyItem}>
                      <span className={styles.whyItemLabel}>コスト比較</span>
                      <div className={styles.whyCompare}>
                        <div className={styles.whyCompareItem}>
                          <p className={styles.whyCompareLabel}>一般制作会社</p>
                          <p className={styles.whyComparePrice}>初期50万円〜 + 月3万円〜（更新別）</p>
                        </div>
                        <div className={styles.whyCompareDivider}>VS</div>
                        <div className={`${styles.whyCompareItem} ${styles.whyCompareHighlight}`}>
                          <p className={styles.whyCompareLabel}>NEXTGAME</p>
                          <p className={styles.whyComparePrice}>初期0円 + 月10万円（運用込み）</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.serviceRight}>
                <div className={styles.priceCard}>
                  <p className={styles.planName}>MONTHLY PLAN</p>
                  <div className={styles.priceRow}>
                    <span className={styles.priceAmount}>¥100,000</span>
                    <span className={styles.priceUnit}>/月</span>
                  </div>
                  <p className={styles.contactNote}>初期費用ゼロ。翌月からすぐにスタートできます。</p>
                  <ul className={styles.featureList}>
                    <li>サイト設計・デザイン・開発</li>
                    <li>毎月のコンテンツ更新・改善</li>
                    <li>SEO対策・記事追加（AI活用）</li>
                    <li>microCMS導入・コンテンツ管理</li>
                    <li>Cloudflare CDN・セキュリティ設定</li>
                    <li>GitHub管理・Vercelホスティング</li>
                    <li>Googleアナリティクス設定・レポート</li>
                  </ul>
                  <ButtonLink href="/contact">無料相談はこちら</ButtonLink>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>
      )}

      {/* ===== 02 MUSIC ===== */}
      {activeTab === 'music' && (
        <FadeInSection key="music">
          <section className={styles.serviceSection}>
            <div className={styles.serviceHeader}>
              <span className={styles.serviceNumber}>02</span>
              <div className={styles.serviceTitleWrap}>
                <span className={styles.serviceTag}>店舗・YouTuber・企業PR向け</span>
                <h2 className={styles.serviceTitle}>楽曲制作・配信</h2>
                <p className={styles.serviceTitleJa}>オリジナルBGM・ジングルを持ちたい方へ</p>
              </div>
            </div>
            <div className={styles.serviceBody}>
              <div className={styles.serviceLeft}>
                <p className={styles.serviceDesc}>オリジナル楽曲の制作から、DistroKid・TuneCoreJapanを通じたSpotify・Apple Music・YouTube Musicなど世界中の配信プラットフォームへのリリースまでをワンストップで対応します。BGM・ジングル・CM曲など、あらゆる用途に対応可能です。</p>
                <div className={styles.techStack}>
                  {['DistroKid', 'TuneCoreJapan', 'Spotify', 'Apple Music', 'YouTube Music'].map((tech) => (
                    <span key={tech} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
                <div className={styles.recommendBlock}>
                  <p className={styles.recommendLabel}>こんな方におすすめ</p>
                  <div className={styles.recommendList}>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>店舗・サービスのオリジナルBGMが欲しい</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>YouTube・SNS動画用のBGMやジングルが必要</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>音楽を作りたいが機材・知識がない</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>Spotifyなどに自分の曲を配信してみたい</p></div>
                  </div>
                </div>

                {/* ===== SoundCloud プレイヤー ===== */}
                <div className={styles.whyBox}>
                  <p className={styles.whyLabel}>SAMPLE TRACKS</p>
                  <p className={styles.whyTitle}>制作サンプルをお聴きください</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                    {tracks.map((track, i) => (
                      <div key={i} style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid rgba(109,190,214,0.2)',
                        background: 'rgba(6,14,28,0.6)',
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 16px 8px',
                        }}>
                          <span style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: '#6dbed6', boxShadow: '0 0 6px #6dbed6',
                            flexShrink: 0, display: 'inline-block',
                          }} />
                          <span style={{
                            fontSize: '0.82rem', fontWeight: 500,
                            letterSpacing: '0.04em', color: 'rgba(255,255,255,0.85)',
                          }}>{track.title}</span>
                        </div>
                        <div style={{ overflow: 'hidden', height: '100px' }}>
                          <iframe
                            src={track.embedUrl}
                            height="166"
                            allow="autoplay"
                            title={track.title}
                            style={{ width: '100%', border: 'none', display: 'block', marginTop: '-8px' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.whyBox}>
                  <p className={styles.whyLabel}>WHY MUSIC?</p>
                  <p className={styles.whyTitle}>音楽は、最も感情に直結するブランド資産。</p>
                  <p className={styles.whyJa}>なぜ楽曲制作がビジネスに価値をもたらすのか</p>
                  <div className={styles.whyList}>
                    <div className={styles.whyItem}>
                      <span className={styles.whyItemLabel}>ブランド認知</span>
                      <p className={styles.whyText}>企業固有のBGMやジングルは視覚情報より記憶に残りやすく、顧客のブランド想起率を向上させます。動画コンテンツの品質を一段引き上げます。</p>
                    </div>
                    <div className={styles.whyItem}>
                      <span className={styles.whyItemLabel}>収益化の可能性</span>
                      <p className={styles.whyText}>配信された楽曲はストリーミング再生数に応じた収益を継続的に生み出します。一度制作すれば資産として積み上がります。</p>
                    </div>
                    <div className={styles.whyItem}>
                      <span className={styles.whyItemLabel}>グローバル配信</span>
                      <p className={styles.whyText}>Spotify・Apple Music・YouTube Musicなど世界150以上のプラットフォームへ即時配信。国内外問わず音楽を届けます。</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.serviceRight}>
                <div className={styles.priceCard}>
                  <p className={styles.planName}>SERVICE</p>
                  <p className={styles.contactNote}>料金はご要望・用途に応じてお見積りします。まずはお気軽にご相談ください。</p>
                  <ul className={styles.featureList}>
                    <li>オリジナル楽曲制作</li>
                    <li>世界主要配信プラットフォームへ配信</li>
                    <li>BGM・ジングル・CM曲など幅広く対応</li>
                    <li>著作権管理サポート</li>
                    <li>リリース戦略のご提案</li>
                  </ul>
                  <ButtonLink href="/contact">お問い合わせ</ButtonLink>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>
      )}

      {/* ===== 03 AI ===== */}
      {activeTab === 'ai' && (
        <FadeInSection key="ai">
          <section className={styles.serviceSection}>
            <div className={styles.serviceHeader}>
              <span className={styles.serviceNumber}>03</span>
              <div className={styles.serviceTitleWrap}>
                <span className={styles.serviceTag}>ChatGPTを使いこなせていない企業向け</span>
                <h2 className={styles.serviceTitle}>AI導入コンサル</h2>
                <p className={styles.serviceTitleJa}>IT人材を採用せずにDXを進めたい会社へ</p>
              </div>
            </div>
            <div className={styles.serviceBody}>
              <div className={styles.serviceLeft}>
                <p className={styles.serviceDesc}>ChatGPT・Claude・Geminiなど最新のAIツールを業務に活用するための導入支援を提供します。ツール選定・社員研修・プロンプト設計まで、現場ですぐ使える形でサポートします。</p>
                <div className={styles.techStack}>
                  {['ChatGPT', 'Claude', 'Gemini', 'Copilot'].map((tech) => (
                    <span key={tech} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
                <div className={styles.recommendBlock}>
                  <p className={styles.recommendLabel}>こんな企業におすすめ</p>
                  <div className={styles.recommendList}>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>ChatGPTを導入したが使いこなせていない</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>社員のAIリテラシーを底上げしたい</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>議事録・メール・資料作成を自動化したい</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>IT人材を採用せずにDXを進めたい</p></div>
                    <div className={styles.recommendItem}><span className={styles.recommendCheck}>✓</span><p>月30万円以上の人件費をAIで削減したい</p></div>
                  </div>
                </div>
                <div className={styles.beforeAfterBlock}>
                  <p className={styles.beforeAfterLabel}>BEFORE / AFTER</p>
                  <p className={styles.beforeAfterTitle}>AI導入コンサル後、何が変わるか</p>
                  <div className={styles.beforeAfterGrid}>
                    <div className={styles.beforeCol}>
                      <p className={styles.beforeColLabel}>導入前</p>
                      <div className={styles.beforeItem}>AIを入れたが誰も使っていない</div>
                      <div className={styles.beforeItem}>資料・メール対応に毎日2〜3時間</div>
                      <div className={styles.beforeItem}>IT人材採用に月40万円以上</div>
                      <div className={styles.beforeItem}>社員間でAI活用に格差がある</div>
                    </div>
                    <div className={styles.afterCol}>
                      <p className={styles.afterColLabel}>導入後</p>
                      <div className={styles.afterItem}>全社員が業務でAIを活用できる状態に</div>
                      <div className={styles.afterItem}>定型業務を1/10の時間で完了</div>
                      <div className={styles.afterItem}>月3万円のコンサルで代替・削減</div>
                      <div className={styles.afterItem}>プロンプト資産を社内に蓄積・共有</div>
                    </div>
                  </div>
                </div>
                <div className={styles.whyBox}>
                  <p className={styles.whyLabel}>WHY AI CONSULTING?</p>
                  <p className={styles.whyTitle}>AIを使える会社と使えない会社の差は、これから10倍になる。</p>
                  <p className={styles.whyJa}>なぜ今AI導入コンサルが必要なのか</p>
                  <div className={styles.whyList}>
                    <div className={styles.whyItem}>
                      <span className={styles.whyItemLabel}>生産性の革命</span>
                      <p className={styles.whyText}>適切なプロンプト設計により、資料作成・メール対応・データ分析などの業務を従来の1/10の時間で完了できます。</p>
                    </div>
                    <div className={styles.whyItem}>
                      <span className={styles.whyItemLabel}>投資対効果</span>
                      <div className={styles.whyCompare}>
                        <div className={styles.whyCompareItem}>
                          <p className={styles.whyCompareLabel}>IT人材採用</p>
                          <p className={styles.whyComparePrice}>月額40万円〜</p>
                        </div>
                        <div className={styles.whyCompareDivider}>VS</div>
                        <div className={`${styles.whyCompareItem} ${styles.whyCompareHighlight}`}>
                          <p className={styles.whyCompareLabel}>AI導入コンサル</p>
                          <p className={styles.whyComparePrice}>月額3万円〜</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.serviceRight}>
                <div className={`${styles.priceCard} ${styles.priceCardHighlight}`}>
                  <p className={styles.planName}>LIGHT PLAN</p>
                  <div className={styles.priceRow}>
                    <span className={styles.priceAmount}>¥30,000</span>
                    <span className={styles.priceUnit}>/月</span>
                  </div>
                  <ul className={styles.featureList}>
                    <li>月2回オンライン相談（各60分）</li>
                    <li>プロンプト添削・改善サポート</li>
                    <li>ChatGPT・Claude・Gemini活用支援</li>
                    <li>業務効率化プロンプトの提案</li>
                    <li>Slackでの質問対応（月10件まで）</li>
                  </ul>
                  <ButtonLink href="/contact">無料相談はこちら</ButtonLink>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>
      )}

      {/* CTA */}
      <FadeInSection>
        <div className={styles.cta}>
          <p className={styles.ctaLabel}>GET IN TOUCH</p>
          <h2 className={styles.ctaTitle}>Let&#39;s Work Together</h2>
          <p className={styles.ctaJa}>まずはお気軽にご相談ください</p>
          <p className={styles.ctaSub}>Web運用サブスク・AI導入コンサル・楽曲制作、どのサービスでもお気軽にどうぞ。</p>
          <ButtonLink href="/contact">無料相談はこちら</ButtonLink>
        </div>
      </FadeInSection>

    </div>
  );
}
