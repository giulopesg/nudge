'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LyraAvatar from '@/components/dashboard/LyraAvatar';

interface Message {
  id: string;
  role: 'lyra' | 'user';
  text: string;
  followUps?: string[]; // topic keys for follow-up buttons
}

interface Props {
  onClose: () => void;
  onTopicExplored?: (topic: string) => void;
}

const TOPIC_KEYWORDS: Record<string, string[]> = {
  xp: ['xp', 'experiencia', 'experience', 'pontos', 'points'],
  level: ['level', 'nivel', 'nível', 'evoluir', 'evolve', 'subir'],
  health: ['health', 'hf', 'health factor', 'saude', 'saúde', 'liquidacao', 'liquidação'],
  kamino: ['kamino', 'emprestimo', 'empréstimo', 'lending', 'colateral', 'collateral'],
  nudge: ['nudge', 'app', 'como funciona', 'how it works', 'o que é', 'what is'],
  inventory: ['inventario', 'inventário', 'inventory', 'item', 'itens', 'items', 'conquista'],
  class: ['classe', 'class', 'guardian', 'explorer', 'strategist', 'rpg', 'personagem'],
  blockchain: ['blockchain', 'solana', 'crypto', 'cripto', 'wallet', 'carteira', 'on-chain'],
};

const RELATED_TOPICS: Record<string, string[]> = {
  xp: ['level', 'inventory', 'class'],
  level: ['xp', 'class', 'inventory'],
  health: ['kamino', 'nudge', 'blockchain'],
  kamino: ['health', 'blockchain', 'nudge'],
  nudge: ['xp', 'kamino', 'health'],
  inventory: ['xp', 'level', 'class'],
  class: ['xp', 'level', 'inventory'],
  blockchain: ['kamino', 'health', 'nudge'],
};

function detectTopic(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) return topic;
  }
  return null;
}

const SUGGESTION_TOPICS = ['nudge', 'xp', 'kamino', 'health', 'class', 'blockchain'] as const;

let msgCounter = 0;

export default function NudgeChatPanel({ onClose, onTopicExplored }: Props) {
  const { t } = useTranslation('dashboard');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const exploredRef = useRef<Set<string>>(new Set());

  // Initial greeting
  useEffect(() => {
    setMessages([{
      id: `lyra-${++msgCounter}`,
      role: 'lyra',
      text: t('lyra.intro'),
    }]);
  }, [t]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function getFollowUps(topic: string): string[] {
    const related = RELATED_TOPICS[topic] ?? [];
    return related.filter((t) => !exploredRef.current.has(t)).slice(0, 3);
  }

  function sendMessage(text: string) {
    const userMsg: Message = { id: `user-${++msgCounter}`, role: 'user', text };
    const topic = detectTopic(text);
    const reply = topic ? t(`lyra.topics.${topic}`) : t('lyra.fallback');
    const followUps = topic ? getFollowUps(topic) : [];

    const lyraMsg: Message = {
      id: `lyra-${++msgCounter}`,
      role: 'lyra',
      text: reply,
      followUps: followUps.length > 0 ? followUps : undefined,
    };

    setMessages((prev) => [...prev, userMsg, lyraMsg]);
    setShowSuggestions(false);

    if (topic) {
      exploredRef.current.add(topic);
      onTopicExplored?.(topic);
    }
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    sendMessage(trimmed);
  }

  function handleSuggestion(topic: string) {
    const label = t(`lyra.suggestions.${topic}`);
    sendMessage(label);
  }

  function handleFollowUp(topic: string) {
    const label = t(`lyra.suggestions.${topic}`);
    sendMessage(label);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const lastLyraIdx = messages.reduce((acc, m, i) => m.role === 'lyra' ? i : acc, -1);

  return (
    <div className="animate-sheet-enter fixed bottom-36 right-4 sm:bottom-20 sm:right-8 z-40 w-[340px] max-h-[480px] flex flex-col rounded-2xl border border-surface-border bg-[#110e1a] shadow-2xl overflow-hidden">
      {/* Header with avatar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border bg-[#13101e]">
        <div className="flex-shrink-0 rounded-full border border-plum/30 shadow-[0_0_12px_var(--plum-glow)]">
          <LyraAvatar size={36} glow="plum" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-[15px] font-bold text-foreground">{t('lyra.name')}</p>
          <p className="font-mono text-[11px] text-text-muted">{t('lyra.subtitle')}</p>
        </div>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-foreground transition-colors text-[18px] leading-none flex-shrink-0"
          aria-label={t('lyra.close')}
        >
          &times;
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px] max-h-[340px]">
        {messages.map((msg, idx) => (
          <div key={msg.id}>
            <div className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'lyra' && (
                <div className="flex-shrink-0 mt-1">
                  <LyraAvatar size={24} glow="plum" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-3 py-2 text-[13px] leading-relaxed ${
                  msg.role === 'lyra'
                    ? 'bg-plum-muted text-foreground border border-plum/20'
                    : 'bg-primary-muted text-foreground border border-primary/20'
                }`}
              >
                {msg.text}
              </div>
            </div>
            {/* Follow-up buttons — only on last Lyra message */}
            {msg.role === 'lyra' && idx === lastLyraIdx && msg.followUps && msg.followUps.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 ml-8">
                {msg.followUps.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleFollowUp(topic)}
                    className="rounded-full border border-primary/25 bg-primary-muted/60 px-2.5 py-1 font-mono text-[11px] text-primary hover:bg-primary/20 transition-colors"
                  >
                    {t(`lyra.suggestions.${topic}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Initial suggestions */}
      {showSuggestions && (
        <div className="flex flex-wrap gap-1.5 px-4 py-2 border-t border-surface-border/50">
          {SUGGESTION_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => handleSuggestion(topic)}
              className="rounded-full border border-plum/25 bg-plum-muted/60 px-2.5 py-1 font-mono text-[11px] text-plum-light hover:bg-plum/20 transition-colors"
            >
              {t(`lyra.suggestions.${topic}`)}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-surface-border">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('lyra.placeholder')}
          className="flex-1 bg-transparent font-mono text-[13px] text-foreground placeholder:text-text-muted outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="flex-shrink-0 rounded-lg bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-background hover:bg-primary/90 transition-colors disabled:opacity-40"
        >
          {t('lyra.send')}
        </button>
      </div>
    </div>
  );
}
