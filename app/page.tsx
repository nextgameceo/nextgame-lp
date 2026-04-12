/* eslint-disable */
"use client";

import { useState } from "react";

export default function Home() {
  const [industry, setIndustry] = useState("");
  const [site, setSite] = useState<any>(null);

  const generateDemo = () => {
    if (!industry) return;

    setSite({
      name: `${industry}ソリューション`,
      catch: `${industry}の価値を最大化する`,
      about: `私たちは${industry}に特化したサービスを提供し、集客・ブランディング・成約率向上まで一貫してサポートします。シンプルで使いやすく、成果に直結する設計を実現しています。`,
      service: `${industry}において重要なのは第一印象と信頼性です。本サービスではユーザー導線を最適化し、問い合わせや購入へと自然に繋げます。`,
      strengths: ["即日公開可能", "コスト削減", "スマホ最適化"],
    });
  };

  const tags = [
    "焼肉",
    "美容室",
    "不動産",
    "整体院",
    "B型作業所",
    "カフェ",
    "EC",
    "士業",
    "ジム",
    "クリニック",
    "歯科",
    "美容クリニック",
    "サロン",
  ];

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* ヒーロー */}
      <section className="px-6 pt-20 pb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          30秒で“使える”ホームページを作る
        </h1>
        <p className="text-gray-400">
          見た目だけでなく、実際に使える構成・文章まで生成
        </p>
      </section>

      {/* デモ */}
      <section className="px-6 py-12 max-w-xl mx-auto">
        <h2 className="text-xl mb-4">無料デモ</h2>

        <input
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="業種を入力（例：焼肉）"
          className="w-full p-3 mb-4 bg-zinc-900 border border-zinc-700 rounded"
        />

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setIndustry(tag)}
              className="px-3 py-1 bg-zinc-800 rounded text-sm hover:bg-zinc-700"
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          onClick={generateDemo}
          className="w-full py-3 bg-cyan-400 text-black font-bold rounded hover:opacity-90"
        >
          デモ生成（30秒）
        </button>

        {/* 👇ここが進化ポイント（サイト風UI） */}
        {site && (
          <div className="mt-8 border border-zinc-700 rounded overflow-hidden">
            <div className="bg-white text-black p-6 space-y-6">

              <div>
                <h1 className="text-2xl font-bold">{site.name}</h1>
                <p className="text-gray-600">{site.catch}</p>
              </div>

              <div>
                <h2 className="font-bold mb-1">About</h2>
                <p className="text-sm text-gray-700">{site.about}</p>
              </div>

              <div>
                <h2 className="font-bold mb-1">Service</h2>
                <p className="text-sm text-gray-700">{site.service}</p>
              </div>

              <div>
                <h2 className="font-bold mb-1">強み</h2>
                <ul className="text-sm text-gray-700">
                  {site.strengths.map((s: string, i: number) => (
                    <li key={i}>・{s}</li>
                  ))}
                </ul>
              </div>

              <button className="w-full py-2 bg-black text-white rounded">
                お問い合わせ
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ベネフィット */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-xl mb-6">導入するとどう変わるか</h2>
        <div className="space-y-3 text-gray-300">
          <p>制作費を大幅削減</p>
          <p>即日公開可能</p>
          <p>修正も自由</p>
        </div>
      </section>

      {/* 数字 */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-xl mb-6">数字が証明</h2>
        <div className="space-y-6">
          <div>
            <p className="text-4xl text-cyan-400 font-bold">30秒</p>
            <p className="text-gray-400 text-sm">生成時間</p>
          </div>
          <div>
            <p className="text-4xl text-cyan-400 font-bold">95%</p>
            <p className="text-gray-400 text-sm">コスト削減</p>
          </div>
          <div>
            <p className="text-4xl text-cyan-400 font-bold">即日</p>
            <p className="text-gray-400 text-sm">公開可能</p>
          </div>
        </div>
      </section>

      {/* 限定 */}
      <section className="px-6 py-16 text-center">
        <div className="border border-yellow-400 p-5 rounded">
          <p className="text-yellow-400 font-bold text-lg">
            新規パートナーは月3社まで
          </p>
        </div>
      </section>

      {/* CTA固定 */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-zinc-800 p-4 flex justify-between items-center">
        <p className="text-sm">無料で体験できます</p>
        <button className="bg-yellow-400 text-black px-5 py-2 rounded font-bold">
          お問い合わせ
        </button>
      </div>
    </div>
  );
}