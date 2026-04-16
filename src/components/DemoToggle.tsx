'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DEMO_PERSONA_IDS } from '@/lib/demo';
import type { DemoPersonaId } from '@/lib/demo';

export function useDemo(): string | null {
  const searchParams = useSearchParams();
  const raw = searchParams.get('demo');
  if (!raw) return null;
  if (raw === 'true') return 'marina';
  return raw;
}

export default function DemoToggle() {
  const { t } = useTranslation('dashboard');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const raw = searchParams.get('demo');

  const activeId: DemoPersonaId | null = raw
    ? (raw === 'true' ? 'marina' : raw as DemoPersonaId)
    : null;

  const isDemo = activeId !== null;

  const navigate = useCallback((personaId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (personaId) {
      params.set('demo', personaId);
    } else {
      params.delete('demo');
    }
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`);
  }, [pathname, router, searchParams]);

  const cycle = useCallback((direction: 1 | -1) => {
    if (!activeId) {
      navigate(DEMO_PERSONA_IDS[0]);
      return;
    }
    const idx = DEMO_PERSONA_IDS.indexOf(activeId);
    const next = (idx + direction + DEMO_PERSONA_IDS.length) % DEMO_PERSONA_IDS.length;
    navigate(DEMO_PERSONA_IDS[next]);
  }, [activeId, navigate]);

  const toggle = useCallback(() => {
    navigate(isDemo ? null : DEMO_PERSONA_IDS[0]);
  }, [isDemo, navigate]);

  if (!isDemo) {
    return (
      <button
        onClick={toggle}
        className="demo-badge chamfer-sm opacity-40 hover:opacity-70 transition-all"
      >
        DEMO
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => cycle(-1)}
        className="demo-badge chamfer-sm px-1.5 hover:opacity-70 transition-all"
        aria-label={t('demo.prev')}
      >
        &lt;
      </button>
      <button
        onClick={toggle}
        className="demo-badge chamfer-sm transition-all min-w-[80px] text-center"
      >
        {activeId ? t(`demo.personas.${activeId}.name`) : 'DEMO'}
      </button>
      <button
        onClick={() => cycle(1)}
        className="demo-badge chamfer-sm px-1.5 hover:opacity-70 transition-all"
        aria-label={t('demo.next')}
      >
        &gt;
      </button>
    </div>
  );
}
