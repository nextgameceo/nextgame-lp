'use client';

import styles from './page.module.css';
import ButtonLink from '@/app/_components/ButtonLink';

const chartData = [
  { month: '1ヶ月',  revenue: 40,  expense: 265, profit: -225 },
  { month: '2ヶ月',  revenue: 50,  expense: 265, profit: -215 },
  { month: '3ヶ月',  revenue: 150, expense: 280, profit: -130 },
  { month: '4ヶ月',  revenue: 190, expense: 285, profit: -95  },
  { month: '5ヶ月',  revenue: 220, expense: 295, profit: -75  },
  { month: '6ヶ月',  revenue: 250, expense: 310, profit: -60  },
  { month: '7ヶ月',  revenue: 300, expense: 315, profit: -15  },
  { month: '8ヶ月',  revenue: 350, expense: 320, profit: 30   },
  { month: '9ヶ月',  revenue: 400, expense: 325, profit: 75   },
  { month: '10ヶ月', revenue: 440, expense: 328, profit: 112  },
  { month: '11ヶ月', revenue: 470, expense: 330, profit: 140  },
  { month: '12ヶ月', revenue: 500, expense: 330, profit: 170  },
  { month: '13ヶ月', revenue: 560, expense: 350, profit: 210  },
  { month: '18ヶ月', revenue: 650, expense: 380, profit: 270  },
  { month: '24ヶ月', revenue: 700, expense: 400, profit: 300  },
];

const CHART_W = 900;
const CHART_H = 300;
const PAD = { top: 24, right: 24, bottom: 40, left: 56 };
const innerW = CHART_W - PAD.left - PAD.right;
const innerH = CHART_H - PAD.top - PAD.bottom;

const allValues = chartData.flatMap(d => [d.revenue, d.expense, d.profit]);
const minVal = Math.min(...allValues);
const maxVal = Math.max(...allValues);
const range = maxVal - minVal;

const xScale = (i: number) => PAD.left + (i / (chartData.length - 1)) * innerW;
const yScale = (v: number) => PAD.top + innerH - ((v - minVal) / range) * innerH;

const toPath = (key: 'revenue' | 'expense' | 'profit') =>
  chartData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i).toFixed(1)},${yScale(d[key]).toFixed(1)}`)
    .join(' ');

const toArea = (key: 'revenue' | 'expense' | 'profit', baseY: number) => {
  const line = toPath(key);
  const last = `L ${xScale(chartData.length - 1).toFixed(1)},${baseY} L ${xScale(0).toFixed(1)},${baseY} Z`;
  return `${line} ${last}`;
};

const zeroY = yScale(0);

export default function Page() {
  return (
    <div className={styles.container}>

      {/* 1. Hero */}
      <div className={styles.header}>
        <p className={styles.headerEn}>FOR INVESTORS</p>
        <h1 className={styles.headerTitle}>投資家・金融機関の方へ</h1>
        <p className={styles.headerLead}>
          NEXTGAMEは、AIとITスキルを活用し、障害のある方が本当に稼げる就労環境を創ることを目的とした次世代型の就労支援事業です。
        </p>
        <p className={styles.headerLead}>
          本ホームページはNEXTGAMEの事業構想・ビジョン・ビジネスモデルを公開するオンライン事業計画書として作成されています。現在、事業立ち上げ資金として3,500万円の資金調達を計画しています。
        </p>
        <div className={styles.headerBadge}>
          このページは融資審査・投資検討のための情報開示ページです
        </div>
      </div>

      {/* KPI */}
      <div className={styles.kpiRow}>
        <div className={styles.kpi}>
          <p className={styles.kpiNumber}>3,500万円</p>
          <p className={styles.kpiLabel}>融資目標額</p>
        </div>
        <div className={styles.kpi}>
          <p className={styles.kpiNumber}>20名+α</p>
          <p className={styles.kpiLabel}>定員（施設外就労で拡大可）</p>
        </div>
        <div className={styles.kpi}>
          <p className={styles.kpiNumber}>3ヶ月目</p>
          <p className={styles.kpiLabel}>給付金収入開始</p>
        </div>
        <div className={styles.kpi}>
          <p className={styles.kpiNumber}>1年以内</p>
          <p className={styles.kpiLabel}>開所目標</p>
        </div>
      </div>

      {/* 2. Market Opportunity */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEn}>MARKET OPPORTUNITY</p>
          <h2 className={styles.sectionTitle}>市場機会</h2>
          <p className={styles.sectionLead}>
            日本の障害者就労支援市場は拡大を続けており、NEXTGAMEが参入する領域には明確な課題と大きな機会が存在します。
          </p>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.cardEn}>01</p>
            <h3 className={styles.cardTitle}>市場規模</h3>
            <p className={styles.cardText}>
              日本の障害者人口は現在約964万人とされており、就労支援サービスの需要は年々拡大しています。就労継続支援B型事業所は全国約17,000事業所が存在し、市場規模は年間1兆円を超えています。
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardEn}>02</p>
            <h3 className={styles.cardTitle}>構造的課題</h3>
            <p className={styles.cardText}>
              しかし多くの事業所では平均工賃が月額約23,000円に留まり、収益性と持続可能性の課題を抱えています。単純作業中心のビジネスモデルでは、利用者の収入向上と事業継続の両立が困難な状況です。
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardEn}>03</p>
            <h3 className={styles.cardTitle}>NEXTGAMEの解答</h3>
            <p className={styles.cardText}>
              NEXTGAMEはAI・ITスキルを活用した高付加価値業務により、この構造を変えることを目指します。利用者の収入向上と事業の持続可能性を同時に実現する新しいモデルです。
            </p>
          </div>
        </div>
      </div>

      {/* 3. Business Model */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEn}>BUSINESS MODEL</p>
          <h2 className={styles.sectionTitle}>ビジネスモデル</h2>
          <p className={styles.sectionLead}>
            NEXTGAMEは福祉給付金を基盤収益としながら、IT受託・教育・自社サービスの3軸で収益を積み上げます。
          </p>
        </div>
        <div className={styles.revenueList}>

          <div className={styles.revenueItem}>
            <div className={styles.revenueLeft}>
              <p className={styles.revenueNum}>01</p>
              <div className={styles.revenueLine} />
            </div>
            <div className={styles.revenueBody}>
              <p className={styles.revenueTag}>基盤収益</p>
              <h3 className={styles.revenueTitle}>障害福祉給付金</h3>
              <p className={styles.revenueText}>
                国が支払う公費であり、景気に左右されない安定収益です。施設内利用者20名が上限ですが、施設外就労（在宅勤務）の活用により定員を超えた売上拡大が可能です。さらに業務委託フェーズへ移行した利用者は個人事業主として独立し、外部からの受託収益も加わります。指定申請から3ヶ月後より給付金収入開始。
              </p>
            </div>
            <div className={styles.revenueAmount}>
              <p className={styles.revenueAmountNum}>〜396万円</p>
              <p className={styles.revenueAmountLabel}>月額（20名時）</p>
            </div>
          </div>

          <div className={styles.revenueItem}>
            <div className={styles.revenueLeft}>
              <p className={styles.revenueNum}>02</p>
              <div className={styles.revenueLine} />
            </div>
            <div className={styles.revenueBody}>
              <p className={styles.revenueTag}>IT業務アウトソーシング</p>
              <h3 className={styles.revenueTitle}>企業からの受託業務</h3>
              <p className={styles.revenueText}>
                企業からデータ処理・AI業務・コンテンツ制作・Web制作などを受託します。利用者がOJTで習得したスキルを実際の業務に活用し、工賃と事業収益を同時に生み出す構造です。
              </p>
            </div>
            <div className={styles.revenueAmount}>
              <p className={styles.revenueAmountNum}>10万円×社数</p>
              <p className={styles.revenueAmountLabel}>月額</p>
            </div>
          </div>

          <div className={styles.revenueItem}>
            <div className={styles.revenueLeft}>
              <p className={styles.revenueNum}>03</p>
              <div className={styles.revenueLine} />
            </div>
            <div className={styles.revenueBody}>
              <p className={styles.revenueTag}>AI / ITスキル教育</p>
              <h3 className={styles.revenueTitle}>高付加価値業務への参加環境</h3>
              <p className={styles.revenueText}>
                利用者がAIツールやITスキルを習得し、高付加価値業務へ参加できる環境を構築します。楽曲制作でAIプロンプトを学び、Web制作・ITスキルへとステップアップするカリキュラムを設計しています。
              </p>
            </div>
            <div className={styles.revenueAmount}>
              <p className={styles.revenueAmountNum}>月3〜5曲/人</p>
              <p className={styles.revenueAmountLabel}>楽曲制作目標</p>
            </div>
          </div>

          <div className={styles.revenueItem}>
            <div className={styles.revenueLeft}>
              <p className={styles.revenueNum}>04</p>
            </div>
            <div className={styles.revenueBody}>
              <p className={styles.revenueTag}>Web / AIサービス事業 + 業務委託</p>
              <h3 className={styles.revenueTitle}>自社サービス展開・個人事業主として独立</h3>
              <p className={styles.revenueText}>
                自社のWebサービスやAI関連サービスを展開します。AIコンサルティング（月額30,000円/社）・Web制作サブスク（月額100,000円/社）により収益化します。またスキルを習得した利用者は業務委託フェーズへ移行し、個人事業主として独立。外部受託収益がさらに積み上がる構造です。
              </p>
            </div>
            <div className={styles.revenueAmount}>
              <p className={styles.revenueAmountNum}>3万円〜/社</p>
              <p className={styles.revenueAmountLabel}>月額</p>
            </div>
          </div>

        </div>
      </div>

      {/* 収支シミュレーション + SVGグラフ */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEn}>FINANCIAL SIMULATION</p>
          <h2 className={styles.sectionTitle}>収支シミュレーション</h2>
          <p className={styles.sectionLead}>
            開所から24ヶ月の収支見通しです。3ヶ月目より給付金収入が開始し、8ヶ月目前後での損益分岐点通過を目指します。
          </p>
        </div>

        {/* SVGグラフ */}
        <div className={styles.chartWrap}>
          <div className={styles.chartLegendRow}>
            <span className={styles.chartLegendRevenue}>■ 売上</span>
            <span className={styles.chartLegendExpense}>■ 支出</span>
            <span className={styles.chartLegendProfit}>■ 損益</span>
          </div>

          <div className={styles.chartSvgWrap}>
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              preserveAspectRatio="xMidYMid meet"
              className={styles.chartSvg}
            >
              <defs>
                <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(109,190,214,0.35)" />
                  <stop offset="100%" stopColor="rgba(109,190,214,0.02)" />
                </linearGradient>
                <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(255,100,100,0.25)" />
                  <stop offset="100%" stopColor="rgba(255,100,100,0.02)" />
                </linearGradient>
                <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(100,220,150,0.3)" />
                  <stop offset="100%" stopColor="rgba(100,220,150,0.02)" />
                </linearGradient>
              </defs>

              {/* グリッド横線 */}
              {[-200, -100, 0, 100, 200, 300, 400, 500, 600, 700].map((v) => (
                <line
                  key={v}
                  x1={PAD.left}
                  x2={CHART_W - PAD.right}
                  y1={yScale(v)}
                  y2={yScale(v)}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}

              {/* Y軸ラベル */}
              {[-200, 0, 200, 400, 700].map((v) => (
                <text
                  key={v}
                  x={PAD.left - 8}
                  y={yScale(v) + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="rgba(255,255,255,0.25)"
                >
                  {v}万
                </text>
              ))}

              {/* X軸ラベル */}
              {chartData.map((d, i) => (
                i % 2 === 0 && (
                  <text
                    key={i}
                    x={xScale(i)}
                    y={CHART_H - 8}
                    textAnchor="middle"
                    fontSize="10"
                    fill="rgba(255,255,255,0.25)"
                  >
                    {d.month}
                  </text>
                )
              ))}

              {/* 損益分岐ライン (y=0) */}
              <line
                x1={PAD.left}
                x2={CHART_W - PAD.right}
                y1={zeroY}
                y2={zeroY}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeDasharray="6 4"
              />
              <text
                x={CHART_W - PAD.right - 4}
                y={zeroY - 6}
                textAnchor="end"
                fontSize="10"
                fill="rgba(255,255,255,0.3)"
              >
                損益分岐ライン
              </text>

              {/* エリア塗り */}
              <path d={toArea('expense', PAD.top + innerH)} fill="url(#gradExpense)" />
              <path d={toArea('revenue', PAD.top + innerH)} fill="url(#gradRevenue)" />
              <path d={toArea('profit', zeroY)}             fill="url(#gradProfit)" />

              {/* ライン */}
              <path d={toPath('expense')} fill="none" stroke="rgba(255,100,100,0.7)"  strokeWidth="2" strokeLinejoin="round" />
              <path d={toPath('revenue')} fill="none" stroke="rgba(109,190,214,0.9)"  strokeWidth="2" strokeLinejoin="round" />
              <path d={toPath('profit')}  fill="none" stroke="rgba(100,220,150,0.85)" strokeWidth="2" strokeLinejoin="round" />

              {/* 損益分岐点マーカー（8ヶ月目） */}
              <circle
                cx={xScale(7)}
                cy={yScale(chartData[7].profit)}
                r="5"
                fill="rgba(100,220,150,1)"
              />
              <line
                x1={xScale(7)}
                x2={xScale(7)}
                y1={yScale(chartData[7].profit) - 8}
                y2={PAD.top + 4}
                stroke="rgba(100,220,150,0.3)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x={xScale(7)}
                y={PAD.top - 2}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(100,220,150,0.8)"
              >
                ▲ 黒字転換
              </text>
            </svg>
          </div>

          <p className={styles.chartNote}>
            ※ 8ヶ月目前後で損益分岐点を通過し、黒字転換を目指します。施設外就労・業務委託フェーズ移行により更なる売上拡大を見込みます。
          </p>
        </div>

        {/* テーブル */}
        <div className={styles.simTable}>
          <div className={styles.simHeader}>
            <p className={styles.simHeaderCell}>期間</p>
            <p className={styles.simHeaderCell}>利用者数</p>
            <p className={styles.simHeaderCell}>月次売上目安</p>
            <p className={styles.simHeaderCell}>月次支出目安</p>
            <p className={styles.simHeaderCell}>状況</p>
          </div>
          <div className={styles.simRow}>
            <p className={styles.simCell}>1〜2ヶ月目</p>
            <p className={styles.simCell}>2〜4名</p>
            <p className={styles.simCell}>約30〜50万円</p>
            <p className={styles.simCell}>約265万円</p>
            <p className={`${styles.simCell} ${styles.simNegative}`}>赤字（運転資金で補填）</p>
          </div>
          <div className={styles.simRow}>
            <p className={styles.simCell}>3〜6ヶ月目</p>
            <p className={styles.simCell}>6〜12名</p>
            <p className={styles.simCell}>約150〜250万円</p>
            <p className={styles.simCell}>約280〜310万円</p>
            <p className={`${styles.simCell} ${styles.simNegative}`}>縮小傾向の赤字</p>
          </div>
          <div className={styles.simRow}>
            <p className={styles.simCell}>7〜12ヶ月目</p>
            <p className={styles.simCell}>15〜20名</p>
            <p className={styles.simCell}>約300〜500万円</p>
            <p className={styles.simCell}>約310〜330万円</p>
            <p className={`${styles.simCell} ${styles.simBreakeven}`}>損益分岐点通過</p>
          </div>
          <div className={styles.simRow}>
            <p className={styles.simCell}>13ヶ月目〜</p>
            <p className={styles.simCell}>20名＋施設外就労</p>
            <p className={styles.simCell}>約500〜700万円</p>
            <p className={styles.simCell}>約350〜400万円</p>
            <p className={`${styles.simCell} ${styles.simPositive}`}>安定黒字</p>
          </div>
        </div>
      </div>

      {/* 4. Funding Plan */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEn}>FUNDING PLAN</p>
          <h2 className={styles.sectionTitle}>資金調達計画</h2>
          <p className={styles.sectionLead}>
            NEXTGAMEでは事業立ち上げ資金として3,500万円の資金調達を計画しています。複数の調達先を組み合わせることでリスクを分散します。
          </p>
        </div>
        <div className={styles.fundingGrid}>
          <div className={styles.fundingUse}>
            <p className={styles.fundingSubTitle}>資金用途</p>
            <div className={styles.fundingItems}>
              <div className={styles.fundingItem}>
                <p className={styles.fundingItemLabel}>事業所開設費（物件取得・内装）</p>
                <p className={styles.fundingItemAmount}>750万円</p>
              </div>
              <div className={styles.fundingItem}>
                <p className={styles.fundingItemLabel}>設備投資（PC・IT環境 24台）</p>
                <p className={styles.fundingItemAmount}>750万円</p>
              </div>
              <div className={styles.fundingItem}>
                <p className={styles.fundingItemLabel}>人材採用・運転資金（6ヶ月分）</p>
                <p className={styles.fundingItemAmount}>1,590万円</p>
              </div>
              <div className={styles.fundingItem}>
                <p className={styles.fundingItemLabel}>指定申請・許認可費用</p>
                <p className={styles.fundingItemAmount}>約100万円</p>
              </div>
              <div className={styles.fundingItem}>
                <p className={styles.fundingItemLabel}>予備費</p>
                <p className={styles.fundingItemAmount}>約310万円</p>
              </div>
              <div className={`${styles.fundingItem} ${styles.fundingTotal}`}>
                <p className={styles.fundingItemLabel}>合計</p>
                <p className={styles.fundingItemAmount}>3,500万円</p>
              </div>
            </div>
          </div>
          <div className={styles.fundingSource}>
            <p className={styles.fundingSubTitle}>調達先</p>
            <div className={styles.fundingItems}>
              <div className={styles.fundingItem}>
                <p className={styles.fundingItemLabel}>日本政策金融公庫（創業融資）</p>
                <p className={styles.fundingItemAmount}>〜2,000万円</p>
              </div>
              <div className={styles.fundingItem}>
                <p className={styles.fundingItemLabel}>銀行・信用金庫</p>
                <p className={styles.fundingItemAmount}>〜1,500万円</p>
              </div>
              <div className={styles.fundingItem}>
                <p className={styles.fundingItemLabel}>補助金・助成金</p>
                <p className={styles.fundingItemAmount}>〜500万円</p>
              </div>
              <div className={styles.fundingItem}>
                <p className={styles.fundingItemLabel}>エンジェル投資家</p>
                <p className={styles.fundingItemAmount}>応相談</p>
              </div>
              <div className={`${styles.fundingItem} ${styles.fundingTotal}`}>
                <p className={styles.fundingItemLabel}>目標合計</p>
                <p className={styles.fundingItemAmount}>3,500万円</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ロードマップ */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEn}>ROADMAP</p>
          <h2 className={styles.sectionTitle}>開所までのロードマップ</h2>
        </div>
        <div className={styles.roadmap}>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapLeft}>
              <p className={styles.roadmapNum}>01</p>
              <div className={styles.roadmapLine} />
            </div>
            <div className={styles.roadmapBody}>
              <p className={styles.roadmapTag}>完了 / 2025.02.19</p>
              <h3 className={styles.roadmapTitle}>法人登記完了</h3>
              <p className={styles.roadmapText}>NEXTGAME株式会社として法人登記完了。法人番号：5180001170695</p>
            </div>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapLeft}>
              <p className={styles.roadmapNum}>02</p>
              <div className={styles.roadmapLine} />
            </div>
            <div className={styles.roadmapBody}>
              <p className={styles.roadmapTag}>完了 / 2025.03.05</p>
              <h3 className={styles.roadmapTitle}>名古屋市 障害福祉サービス事業 新規参入者研修 受講</h3>
              <p className={styles.roadmapText}>名古屋市主催の新規参入者研修を受講済み。指定申請に向けた要件確認・手続きを進めている。</p>
            </div>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapLeft}>
              <p className={styles.roadmapNum}>03</p>
              <div className={styles.roadmapLine} />
            </div>
            <div className={styles.roadmapBody}>
              <p className={styles.roadmapTag}>完了 / 2025.03.11</p>
              <h3 className={styles.roadmapTitle}>オンライン事業計画書（本サイト）公開</h3>
              <p className={styles.roadmapText}>事業構想・ビジョン・ビジネスモデルをまとめたオンライン事業計画書として本ホームページを公開。</p>
            </div>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapLeft}>
              <p className={styles.roadmapNum}>04</p>
              <div className={styles.roadmapLine} />
            </div>
            <div className={styles.roadmapBody}>
              <p className={styles.roadmapTag}>進行中</p>
              <h3 className={styles.roadmapTitle}>融資申請・物件探し</h3>
              <p className={styles.roadmapText}>日本政策金融公庫・銀行・信用金庫への融資申請。名古屋市内での物件選定を並行して進める。</p>
            </div>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapLeft}>
              <p className={styles.roadmapNum}>05</p>
              <div className={styles.roadmapLine} />
            </div>
            <div className={styles.roadmapBody}>
              <p className={styles.roadmapTag}>予定</p>
              <h3 className={styles.roadmapTitle}>指定申請・スタッフ採用</h3>
              <p className={styles.roadmapText}>名古屋市への就労継続支援B型指定申請。サービス管理責任者・指導員の採用開始。</p>
            </div>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapLeft}>
              <p className={styles.roadmapNum}>06</p>
            </div>
            <div className={styles.roadmapBody}>
              <p className={styles.roadmapTag}>目標</p>
              <h3 className={styles.roadmapTitle}>開所・利用者受け入れ開始</h3>
              <p className={styles.roadmapText}>1年以内の開所を目標。初年度は利用者5名からスタートし、定員20名＋施設外就労での拡大を目指す。</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Vision */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEn}>VISION</p>
          <h2 className={styles.sectionTitle}>ビジョン</h2>
        </div>
        <div className={styles.message}>
          <p className={styles.messageText}>
            NEXTGAMEは、福祉 × AI × IT という新しい領域で、社会課題の解決と持続可能な事業成長を両立する次世代型の福祉モデルを創ります。
          </p>
          <p className={styles.messageText}>
            障害のある方が「通うための場所」ではなく、「稼ぐスキルを会得する場所」として機能する事業所を目指しています。利用者がAIスキルを武器に個人事業主として独立するキャリアパスを設計することで、福祉の在り方そのものを変えていきます。
          </p>
          <p className={styles.messageText}>
            資本金30万円からのスタートです。しかし、この確信は誰にも負けません。数字と熱量、両方で判断していただければ幸いです。
          </p>
          <p className={styles.messageSignature}>代表取締役　内山 博貴</p>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <ButtonLink href="/contact">融資・投資のお問い合わせ</ButtonLink>
        <ButtonLink href="/business">事業内容を見る</ButtonLink>
      </div>

    </div>
  );
}
