'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { useSearchParams } from 'next/navigation';
import { hashProfile } from '@/lib/memo';
import { sendRegistration } from '@/lib/memo';
import { getCharacterClass } from '@/lib/rpg';
import type { NeurotageId, GoalId } from '@/lib/neurotags';

type Status = 'idle' | 'signing' | 'confirming' | 'success' | 'error';

interface Props {
  neurotags: NeurotageId[];
  goals: GoalId[];
  onComplete: (txHash: string | null) => void;
}

export default function RegistrationStep({ neurotags, goals, onComplete }: Props) {
  const { t } = useTranslation('onboarding');
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') !== null;

  const [status, setStatus] = useState<Status>('idle');
  const [hash, setHash] = useState<string>('');
  const [txSignature, setTxSignature] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const characterClass = getCharacterClass(neurotags);

  useEffect(() => {
    const wallet = isDemo ? 'DeMoWaLLeT...0000' : publicKey?.toBase58() ?? '';
    if (wallet) {
      hashProfile(wallet, neurotags, goals).then(setHash);
    }
  }, [publicKey, neurotags, goals, isDemo]);

  const handleRegister = useCallback(async () => {
    if (isDemo) {
      setStatus('signing');
      await new Promise((r) => setTimeout(r, 800));
      setStatus('confirming');
      await new Promise((r) => setTimeout(r, 1200));
      setTxSignature('DeMo' + hash + 'FaKeTx1234567890');
      setStatus('success');
      return;
    }

    if (!publicKey || !sendTransaction) return;

    try {
      setStatus('signing');
      setErrorMsg('');
      const result = await sendRegistration(
        publicKey,
        connection,
        sendTransaction,
        neurotags,
        goals,
        characterClass.name,
      );
      setStatus('confirming');
      setTxSignature(result.txSignature);
      setHash(result.hash);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg(t('registration.error'));
    }
  }, [isDemo, publicKey, sendTransaction, connection, neurotags, goals, characterClass.name, hash, t]);

  const handleSkip = useCallback(() => {
    onComplete(null);
  }, [onComplete]);

  const handleGoToDashboard = useCallback(() => {
    onComplete(txSignature);
  }, [onComplete, txSignature]);

  return (
    <div className="flex flex-col items-center px-4 w-full max-w-md">
      <h1 className="font-display text-xl font-bold uppercase tracking-wider">
        {t('registration.title')}
      </h1>

      <p className="mt-2 text-sm text-text-secondary text-center">
        {t('registration.subtitle')}
      </p>

      {/* Info card */}
      <div className="mt-6 w-full card chamfer-md border-primary/20 bg-primary-muted/30 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {t('registration.hashLabel')}
          </span>
          <span className="font-mono text-xs text-primary">
            {hash || '...'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {t('registration.classLabel')}
          </span>
          <span className="text-sm text-foreground">
            {characterClass.icon} {characterClass.title}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {t('registration.networkLabel')}
          </span>
          <span className="text-sm text-foreground">
            {t('registration.network')}
          </span>
        </div>
      </div>

      {/* Action area */}
      <div className="mt-6 w-full flex flex-col items-center gap-3">
        {status === 'idle' && (
          <>
            <button
              onClick={handleRegister}
              className="w-full chamfer-md border border-primary bg-primary/10 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-primary transition-all glow-primary hover:bg-primary hover:text-background"
            >
              {t('registration.cta')}
            </button>
            <button
              onClick={handleSkip}
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              {t('registration.skip')}
            </button>
            <p className="text-[10px] text-text-muted text-center">
              {t('registration.cost')}
            </p>
          </>
        )}

        {status === 'signing' && (
          <div className="flex items-center gap-2 py-3">
            <span className="animate-spin text-primary">&#9702;</span>
            <span className="text-sm text-text-secondary">
              {t('registration.signing')}
            </span>
          </div>
        )}

        {status === 'confirming' && (
          <div className="flex items-center gap-2 py-3">
            <span className="animate-spin text-primary">&#9702;</span>
            <span className="text-sm text-text-secondary">
              {t('registration.confirming')}
            </span>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="text-3xl animate-bounce">&#10003;</div>
            <p className="text-sm font-semibold text-primary">
              {t('registration.success')}
            </p>
            {isDemo && (
              <p className="text-xs text-text-muted">
                {t('registration.demoSuccess')}
              </p>
            )}
            {!isDemo && txSignature && (
              <a
                href={`https://solscan.io/tx/${txSignature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-plum-light hover:underline"
              >
                {t('registration.viewTx')} &#8599;
              </a>
            )}
            <span className="inline-block chamfer-sm bg-primary/20 px-3 py-1 font-mono text-xs font-bold text-primary animate-pulse">
              {t('registration.xpEarned')}
            </span>
            <button
              onClick={handleGoToDashboard}
              className="mt-2 w-full chamfer-md border border-primary bg-transparent px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-primary transition-all glow-primary hover:bg-primary hover:text-background"
            >
              {t('registration.goToDashboard')}
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-sm text-red-400 text-center">{errorMsg}</p>
            <button
              onClick={handleRegister}
              className="chamfer-md border border-primary bg-transparent px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-background"
            >
              {t('registration.retry')}
            </button>
            <button
              onClick={handleSkip}
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              {t('registration.skip')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
