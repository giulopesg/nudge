'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import LyraAvatar from '@/components/dashboard/LyraAvatar';
import { useDashboard } from '@/contexts/DashboardContext';
import { getRecommendation } from '@/lib/lyraRecommendation';

interface Message {
  id: string;
  role: 'lyra' | 'user';
  text: string;
  followUps?: string[]; // topic keys for follow-up buttons
}

interface Props {
  onClose: () => void;
  onTopicExplored?: (topic: string) => void;
  autoAction?: 'recommendation' | null;
  onAutoActionConsumed?: () => void;
}

const TOPIC_KEYWORDS: Record<string, string[]> = {
  xp: ['xp', 'experiencia', 'experience', 'pontos', 'points'],
  level: ['level', 'nivel', 'nível', 'evoluir', 'evolve', 'subir'],
  health: ['health', 'hf', 'health factor', 'saude', 'saúde', 'liquidacao', 'liquidação'],
  kamino: ['kamino', 'emprestimo', 'empréstimo', 'lending', 'colateral', 'collateral'],
  nudgeScore: ['nudge score', 'score', 'pontuacao', 'pontuação', 'nota'],
  nudge: ['nudge', 'app', 'como funciona', 'how it works', 'o que é', 'what is'],
  inventory: ['inventario', 'inventário', 'inventory', 'item', 'itens', 'items', 'conquista'],
  class: ['classe', 'class', 'guardian', 'explorer', 'strategist', 'rpg', 'personagem'],
  blockchain: ['blockchain', 'solana', 'crypto', 'cripto', 'wallet', 'carteira', 'on-chain'],
  recommendation: ['recomendação', 'recomendacao', 'recommendation', 'dica', 'tip', 'conselho', 'sugestão', 'sugestao', 'o que fazer', 'what should i do'],
  howDiversify: ['diversificar', 'diversify', 'como diversif', 'rebalancear', 'rebalance'],
  howStables: ['stablecoin', 'como comprar usdc', 'como ter stable', 'como trocar por usdc'],
  howCollateral: ['adicionar colateral', 'add collateral', 'como adicionar garantia', 'depositar colateral'],
  howReduceDebt: ['pagar dívida', 'pagar divida', 'repay', 'como pagar', 'reduzir dívida'],
  howYield: ['rendimento', 'yield', 'renda passiva', 'como render', 'como ganhar', 'staking'],
  howMonitor: ['monitorar', 'acompanhar', 'como monitorar', 'alertas telegram'],
};

const RELATED_TOPICS: Record<string, string[]> = {
  xp: ['level', 'inventory', 'class'],
  level: ['xp', 'class', 'inventory'],
  health: ['kamino', 'nudge', 'blockchain'],
  kamino: ['health', 'blockchain', 'nudge'],
  nudgeScore: ['health', 'kamino', 'recommendation'],
  nudge: ['xp', 'kamino', 'health'],
  inventory: ['xp', 'level', 'class'],
  class: ['xp', 'level', 'inventory'],
  blockchain: ['kamino', 'health', 'nudge'],
  recommendation: ['kamino', 'health', 'nudge'],
  howDiversify: ['howStables', 'howYield', 'kamino'],
  howStables: ['howDiversify', 'howYield', 'health'],
  howCollateral: ['howReduceDebt', 'health', 'howMonitor'],
  howReduceDebt: ['howCollateral', 'health', 'howMonitor'],
  howYield: ['howDiversify', 'kamino', 'howMonitor'],
  howMonitor: ['health', 'kamino', 'howYield'],
};

function detectTopic(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) return topic;
  }
  return null;
}

const SUGGESTION_TOPICS = ['recommendation', 'nudgeScore', 'nudge', 'xp', 'kamino', 'health', 'class', 'blockchain'] as const;

let msgCounter = 0;

export default function NudgeChatPanel({ onClose, onTopicExplored, autoAction, onAutoActionConsumed }: Props) {
  const { t } = useTranslation('dashboard');
  const { nudgeScore, portfolio, kaminoPosition, character, neurotags, goals } = useDashboard();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [exploredCount, setExploredCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const exploredRef = useRef<Set<string>>(new Set());
  const autoActionFired = useRef(false);

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

  // Auto-action: fire recommendation when triggered externally
  useEffect(() => {
    if (autoAction === 'recommendation' && !autoActionFired.current && messages.length > 0) {
      autoActionFired.current = true;
      const label = t('lyra.suggestions.recommendation');
      // Small delay so panel renders first
      const timer = setTimeout(() => {
        sendMessage(label);
        onAutoActionConsumed?.();
      }, 400);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAction, messages.length]);

  function getFollowUps(topic: string): string[] {
    const related = RELATED_TOPICS[topic] ?? [];
    return related.filter((t) => !exploredRef.current.has(t)).slice(0, 3);
  }

  const buildRecommendationReply = useCallback((): { text: string; followUpKeys: string[] } => {
    const rec = getRecommendation({ nudgeScore, portfolio, kaminoPosition, character, neurotags, goals });
    return { text: t(rec.key, rec.params), followUpKeys: rec.followUpKeys };
  }, [nudgeScore, portfolio, kaminoPosition, character, neurotags, goals, t]);

  function sendMessage(text: string) {
    const userMsg: Message = { id: `user-${++msgCounter}`, role: 'user', text };
    const topic = detectTopic(text);

    let reply: string;
    let followUps: string[];

    if (topic === 'recommendation') {
      const rec = buildRecommendationReply();
      reply = rec.text;
      followUps = rec.followUpKeys;
    } else if (topic) {
      reply = t(`lyra.topics.${topic}`);
      followUps = getFollowUps(topic);
    } else {
      reply = t('lyra.fallback');
      followUps = [];
    }

    const lyraMsg: Message = {
      id: `lyra-${++msgCounter}`,
      role: 'lyra',
      text: reply,
      followUps: followUps.length > 0 ? followUps : undefined,
    };

    setMessages((prev) => [...prev, userMsg, lyraMsg]);
    setShowSuggestions(false);

    if (topic && !exploredRef.current.has(topic)) {
      exploredRef.current.add(topic);
      setExploredCount(exploredRef.current.size);
      onTopicExplored?.(topic);
    } else if (topic) {
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
    <div className="animate-sheet-enter fixed bottom-[88px] left-3 right-3 sm:bottom-20 sm:left-auto sm:right-8 z-40 w-auto sm:w-[340px] max-h-[calc(100dvh-160px)] sm:max-h-[480px] flex flex-col rounded-2xl border border-surface-border bg-[#110e1a] shadow-2xl overflow-hidden">
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

      {/* XP Progress indicator */}
      {exploredCount > 0 && (
        <div className={`flex items-center justify-between px-4 py-2 border-b text-[11px] font-mono ${
          exploredCount >= 3
            ? 'border-safe/20 bg-safe/8 text-safe'
            : 'border-xp/20 bg-xp-muted text-xp'
        }`}>
          <span>{exploredCount >= 3 ? t('lyra.xpComplete') : t('lyra.xpProgress', { count: exploredCount })}</span>
          <span className="font-bold">{t('lyra.xpReward')}</span>
        </div>
      )}

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
