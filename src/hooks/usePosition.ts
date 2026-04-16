'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PositionResponse } from '@/lib/kamino';
import type { PortfolioBalance, NudgeScore } from '@/lib/portfolio';
import { calculateNudgeScore } from '@/lib/portfolio';
import { getDemoPersona } from '@/lib/demo';

export interface EnrichedPosition {
  position: PositionResponse;
  portfolio: PortfolioBalance;
  nudgeScore: NudgeScore;
}

interface UsePositionResult {
  data: EnrichedPosition | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePosition(
  walletAddress: string | null,
  demoPersonaId: string | null = null,
): UsePositionResult {
  const [data, setData] = useState<EnrichedPosition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosition = useCallback(async () => {
    const persona = getDemoPersona(demoPersonaId);
    if (persona) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 600));
      const positionData: PositionResponse = {
        ...persona.position,
        timestamp: new Date().toISOString(),
      };
      const nudgeScore = calculateNudgeScore(
        persona.portfolio,
        persona.position.position?.healthFactor ?? null,
      );
      setData({
        position: positionData,
        portfolio: persona.portfolio,
        nudgeScore,
      });
      setLoading(false);
      return;
    }

    if (!walletAddress) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/position/${walletAddress}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const json: PositionResponse = await res.json();

      // For real wallets, build a basic portfolio from SOL balance
      // Full multi-token support will come with token account parsing
      const { buildPortfolio } = await import('@/lib/portfolio');
      const portfolio = buildPortfolio([
        {
          symbol: 'SOL',
          mint: 'native',
          amount: json.balance.solBalance,
          valueUsd: json.balance.solValueUsd,
        },
      ]);
      const nudgeScore = calculateNudgeScore(
        portfolio,
        json.position?.healthFactor ?? null,
      );
      setData({ position: json, portfolio, nudgeScore });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [walletAddress, demoPersonaId]);

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  return { data, loading, error, refetch: fetchPosition };
}
