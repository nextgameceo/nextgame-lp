'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import styles from './index.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'こんにちは！NEXTGAME株式会社のAIアシスタントです。ご質問やお問い合わせはお気軽にどうぞ。',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // NextGame の事業内容に基づいた回答
    if (
      lowerMessage.includes('b型') ||
      lowerMessage.includes('作業所') ||
      lowerMessage.includes('障害')
    ) {
      return 'NEXTGAME株式会社は、B型作業所を運営しており、障害者の方々の就労支援と自立を支援しています。詳細についてはお問い合わせフォームからご連絡ください。';
    }

    if (
      lowerMessage.includes('ai') ||
      lowerMessage.includes('教育') ||
      lowerMessage.includes('スキル')
    ) {
      return 'AI教育プログラムを提供し、次世代の人材育成に力を入れています。スキルアップや研修についてのご相談は、お気軽にお問い合わせください。';
    }

    if (
      lowerMessage.includes('投資') ||
      lowerMessage.includes('事業') ||
      lowerMessage.includes('パートナー')
    ) {
      return '投資やビジネスパートナーシップについてのご相談は、お問い合わせフォームからお気軽にご連絡ください。詳しい情報をお送りします。';
    }

    if (
      lowerMessage.includes('料金') ||
      lowerMessage.includes('価格') ||
      lowerMessage.includes('コスト')
    ) {
      return 'サービスの料金についてはご相談内容により異なります。お問い合わせフォームから詳細をお知らせいただければ、見積もりをさせていただきます。';
    }

    if (
      lowerMessage.includes('利用者') ||
      lowerMessage.includes('ユーザー') ||
      lowerMessage.includes('申し込み')
    ) {
      return '利用者向けのお申し込みやご相談は、お問い合わせフォームからお気軽にご連絡ください。詳しい手続きについてご説明します。';
    }

    if (
      lowerMessage.includes('企業') ||
      lowerMessage.includes('法人') ||
      lowerMessage.includes('導入')
    ) {
      return '企業向けのサービス導入についてのご相談は、お問い合わせフォームからお気軽にご連絡ください。専門チームがサポートいたします。';
    }

    if (
      lowerMessage.includes('時間') ||
      lowerMessage.includes('営業時間') ||
      lowerMessage.includes('営業日')
    ) {
      return 'お問い合わせは24時間受け付けています。営業時間については、お問い合わせフォームからご確認ください。';
    }

    if (
      lowerMessage.includes('連絡') ||
      lowerMessage.includes('メール') ||
      lowerMessage.includes('電話')
    ) {
      return 'ご連絡は、お問い合わせフォームからお気軽にどうぞ。メールでのご返信となります。';
    }

    // デフォルト回答
    return 'ご質問ありがとうございます。詳しくはお問い合わせフォームからお気軽にご連絡ください。専門チームがサポートいたします。';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // ユーザーメッセージを追加
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // LINE に通知を送信
    try {
      await fetch('/api/send-line-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `【チャットボット問い合わせ】\n${inputValue}`,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('LINE 通知送信エラー:', error);
    }

    // ボット応答を生成
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* チャットボットウィジェット */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={styles.chatbotButton}
          aria-label="チャットボットを開く"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* チャットボットウィンドウ */}
      {isOpen && (
        <div className={styles.chatbotWindow}>
          {/* ヘッダー */}
          <div className={styles.header}>
            <h3>NEXTGAME AIアシスタント</h3>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="チャットボットを閉じる"
            >
              <X size={20} />
            </button>
          </div>

          {/* メッセージ表示エリア */}
          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${styles[message.sender]}`}
              >
                <div className={styles.messageBubble}>{message.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.bot}`}>
                <div className={styles.messageBubble}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 入力エリア */}
          <div className={styles.inputContainer}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="メッセージを入力..."
              className={styles.input}
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className={styles.sendButton}
              disabled={isLoading || !inputValue.trim()}
              aria-label="送信"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
