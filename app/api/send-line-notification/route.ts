import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, timestamp } = await request.json();

    const lineChannelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const lineUserId = process.env.LINE_USER_ID;

    if (!lineChannelAccessToken || !lineUserId) {
      return NextResponse.json(
        { error: 'LINE credentials not configured' },
        { status: 500 }
      );
    }

    const lineMessage = {
      to: lineUserId,
      messages: [
        {
          type: 'text',
          text: `【チャットボット問い合わせ】\n\nメッセージ: ${message}\n\n送信時刻: ${new Date(timestamp).toLocaleString('ja-JP')}`,
        },
      ],
    };

    const response = await fetch('https://api.line.biz/v1/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lineChannelAccessToken}`,
      },
      body: JSON.stringify(lineMessage),
    });

    if (!response.ok) {
      console.error('LINE API error:', await response.text());
      return NextResponse.json(
        { error: 'Failed to send LINE message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in send-line-notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
