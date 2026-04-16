"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface DiagResult {
  score: number
  company: string
  industry: string
  problems: { title: string; desc: string }[]
  suggestion: string
  prompt: string
}

const PROBLEM_ICONS = ["🔍", "⚡", "📉", "🎯", "💬"]

function DiagnoseContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [result, setResult] = useState<DiagResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("サイトにアクセス中...")
  const [error, setError] = useState("")

  const gold = "#c8a84a"
  const cyan = "#6dbed6"
  const bg = "#000"
  const bg2 = "#0a0a0a"
  const bg3 = "#111"
  const border = "rgba(255,255,255,0.07)"
  const borderGold = "rgba(200,168,74,0.2)"
  const muted = "#666"

  useEffect(() => {
    const url = searchParams.get("url")
    if (!url) {
      router.push("/lp/new")
      return
    }

    const msgs = [
      "サイトにアクセス中...",
      "コンテンツを解析中...",
      "SEOスコアを計算中...",
      "デザイン品質を評価中...",
      "リデザインプロンプトを生成中...",
    ]
    let i = 0
    const t = setInterval(() => {
      i = Math.min(i + 1, msgs.length - 1)
      setMessage(msgs[i])
    }, 1400)

    fetch("/api/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((r) => r.json())
      .then((data) => {
        clearInterval(t)
        if (data.error) {
          setError(data.error)
          setLoading(false)
          return
        }
        setResult(data)
        setLoading(false)
      })
      .catch(() => {
        clearInterval(t)
        setError("診断に失敗しました。URLを確認してください。")
        setLoading(false)
      })
  }, [])

  const scoreColor = (s: number) => (s >= 70 ? "#10b981" : s >= 40 ? gold : "#ef4444")
  const scoreLabel = (s: number) => (s >= 70 ? "良好" : s >= 40 ? "要改善" : "緊急改善が必要")

  const handleGoToRedesign = () => {
    if (!result) return

    const url = searchParams.get("url") ?? ""

    // contactへ引き継ぐために sessionStorage に保存
    sessionStorage.setItem("contact_siteUrl", url)
    sessionStorage.setItem("contact_score", String(result.score))
    sessionStorage.setItem("contact_company", result.company ?? "")
    sessionStorage.setItem("contact_industry", result.industry ?? "")
    sessionStorage.setItem("contact_problems", JSON.stringify(result.problems ?? []))
    sessionStorage.setItem("contact_suggestion", result.suggestion ?? "")
    sessionStorage.setItem("contact_prompt", result.prompt ?? "")

    router.push("/contact")
  }

  return (
    <div style={{ minHeight: "100vh", background: bg, color: "#e2e8f0", fontFamily: "Noto Sans JP, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&family=Inter:wght@700;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.5s ease forwards;}
      `}</style>

      <nav
        style={{
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "sticky",
          top: 0,
          background: bg,
          zIndex: 100,
        }}
      >
        <a
          href="/"
          style={{
            textDecoration: "none",
            fontFamily: "Inter, monospace",
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: "0.12em",
          }}
        >
          <span style={{ background: "linear-gradient(90deg,#c8a84a,#e8d48a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            NEXT
          </span>
          <span style={{ color: "#6dbed6" }}>GAME</span>
        </a>
        <span style={{ fontSize: 11, color: "#444", letterSpacing: "0.1em" }}>AI DIAGNOSIS</span>
      </nav>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 20px 100px" }}>
        {loading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "50vh",
              justifyContent: "center",
              gap: 28,
            }}
          >
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: `2px solid rgba(200,168,74,0.15)`,
                  borderTopColor: gold,
                  borderRadius: "50%",
                  animation: "spin 0.9s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 10,
                  border: `1px solid rgba(109,190,214,0.1)`,
                  borderTopColor: cyan,
                  borderRadius: "50%",
                  animation: "spin 1.3s linear infinite reverse",
                }}
              />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
                🔍
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1rem", color: gold, fontWeight: 700, marginBottom: 8 }}>AI診断中...</p>
              <p style={{ fontSize: "0.85rem", color: muted }}>{message}</p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: "center", paddingTop: 60 }}>
            <p style={{ fontSize: "1rem", color: "#f87171", marginBottom: 24 }}>{error}</p>
            <button
              onClick={() => router.push("/")}
              style={{
                padding: "14px 28px",
                background: `linear-gradient(135deg,${gold},#e8d48a)`,
                border: "none",
                borderRadius: 8,
                color: "#000",
                fontWeight: 900,
                cursor: "pointer",
                fontSize: "0.95rem",
              }}
            >
              TOPへ戻る
            </button>
          </div>
        )}

        {!loading && result && (
          <div className="fade-up">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: gold,
                border: `1px solid ${borderGold}`,
                padding: "4px 14px",
                borderRadius: 2,
                marginBottom: 24,
              }}
            >
              DIAGNOSIS COMPLETE
            </div>

            <div style={{ background: bg2, border: `1px solid ${borderGold}`, borderRadius: 16, padding: "28px 24px", marginBottom: 16 }}>
              <div style={{