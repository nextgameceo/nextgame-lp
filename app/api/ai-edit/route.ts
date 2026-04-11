// app/api/ai-edit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { userPrompt, textContent, industry, name } = await req.json()
    if (!userPrompt || !textContent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const sysPrompt =
      'あなたはWebコピーライターです。ユーザーの指示に従いサイトのテキストを修正し、' +
      '必ずJSON形式のみで返してください。' +
      `形式: {"changes":[{"oldText":"変更前","newText":"変更後"}]} ` +
      `業種:${industry} 屋号:${name} ` +
      '変更なしの場合は{"changes":[]}を返す。コードブロック・説明文は不要。'

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: sysPrompt,
      messages: [{
        role: 'user',
        content: `【修正指示】${userPrompt}\n\n【現在のテキスト】\n${String(textContent).slice(0, 3000)}`,
      }],
    })

    let resultText = ''
    for (const block of message.content) {
      if (block.type === 'text') resultText += block.text
    }

    resultText = resultText.replace(/^```[\w]*\n?/i, '').replace(/\n?```\s*$/, '').trim()

    let result: { changes: { oldText: string; newText: string }[] }
    try {
      result = JSON.parse(resultText)
    } catch {
      const match = resultText.match(/\{[\s\S]*\}/)
      if (match) {
        result = JSON.parse(match[0])
      } else {
        return NextResponse.json(
          { error: 'AI response parse failed', raw: resultText.slice(0, 200) },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('AI edit error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
