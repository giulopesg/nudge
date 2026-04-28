'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { useSearchParams } from 'next/navigation';
import { hashProfile, sendRegistration } from '@/lib/memo';
import { getCharacterClass } from '@/lib/rpg';
import { hasRegistration, getRegistration } from '@/lib/store';
import type { NeurotageId, GoalId } from '@/lib/neurotags';

type Status = 'idle' | 'signing' | 'confirming' | 'success' | 'error' | 'already';

interface Props {
  neurotags: NeurotageId[];
  goals: GoalId[];
  onComplete: (result: { txSignature: string; hash: string } | null) => void;
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

  // Duplicate guard — check if already registered
  const walletKey = isDemo ? '' : publicKey?.toBase58() ?? '';
  const [prevWalletKey, setPrevWalletKey] = useState('');
  if (walletKey && walletKey !== prevWalletKey) {
    setPrevWalletKey(walletKey);
    if (hasRegistration(walletKey)) {
      const reg = getRegistration(walletKey);
      if (reg) {
        setTxSignature(reg.txSignature);
        setHash(reg.hash);
        setStatus('already');
      }
    }
  }

  // Compute hash for display
  useEffect(() => {
    const wallet = isDemo ? 'DeMoWaLLeT...0000' : publicKey?.toBase58() ?? '';
    if (wallet && !hash) {
      hashProfile(wallet, neurotags, goals).then(setHash);
    }
  }, [publicKey, neurotags, goals, isDemo, hash]);

  const registerForCron = useCallback(async (wallet: string) => {
    try {
      await fetch('/api/monitor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet }),
      });
    } catch {
      // Non-blocking — cron registration failure shouldn't block onboarding
    }
  }, []);

  const handleRegister = useCallback(async () => {
    if (isDemo) {
      setStatus('signing');
      await new Promise((r) => setTimeout(r, 800));
      setStatus('confirming');
      await new Promise((r) => setTimeout(r, 1200));
      const demoSig = 'DeMo' + hash + 'FaKeTx1234567890';
      setTxSignature(demoSig);
      setStatus('success');
      return;
    }

    if (!publicKey || !sendTransaction) return;

    try {
      setStatus('signing');
      setErrorMsg('');

      // Phase 1: build + send (wallet signs here)
      const result = await sendRegistration(
        publicKey,
        connection,
        sendTransaction,
        neurotags,
        goals,
        characterClass.name,
      );
      setTxSignature(result.txSignature);
      setHash(result.hash);

      // Phase 2: confirm on-chain (user sees "confirming" state)
      setStatus('confirming');
      await connection.confirmTransaction(result.txSignature, 'confirmed');

      // Phase 3: register for cron monitoring
      await registerForCron(publicKey.toBase58());

      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('User rejected') || msg.includes('rejected')) {
        setErrorMsg(t('registration.errorRejected'));
      } else {
        setErrorMsg(t('registration.errorNetwork'));
      }
    }
  }, [isDemo, publicKey, sendTransaction, connection, neurotags, goals, characterClass.name, hash, t, registerForCron]);

  const handleSkip = useCallback(() => {
    onComplete(null);
  }, [onComplete]);

  const handleGoToDashboard = useCallback(() => {
    if (isDemo) {
      onComplete(null);
      return;
    }
    onComplete({ txSignature, hash });
  }, [onComplete, txSignature, hash, isDemo]);

  return (
    <div className="flex flex-col items-center px-4 w-full max-w-md">
      <h1 className="font-display text-2xl font-bold uppercase tracking-wider">
        {t('registration.title')}
      </h1>

      <p className="mt-2 text-[15px] leading-[1.7] text-text-secondary text-center">
        {t('registration.subtitle')}
      </p>

      {/* Info card */}
      <div className="mt-6 w-full card rounded-xl border-primary/20 bg-primary-muted/30 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[12px] uppercase tracking-wider text-text-muted">
            {t('registration.hashLabel')}
          </span>
          <span className="font-mono text-[13px] text-primary">
            {hash || '...'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-[12px] uppercase tracking-wider text-text-muted">
            {t('registration.classLabel')}
          </span>
          <span className="text-[15px] text-foreground">
            {characterClass.icon} {characterClass.title}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-[12px] uppercase tracking-wider text-text-muted">
            {t('registration.networkLabel')}
          </span>
          <span className="text-[15px] text-foreground">
            {t('registration.network')}
          </span>
        </div>
      </div>

      {/* Action area */}
      <div className="mt-6 w-full flex flex-col items-center gap-3">
        {status === 'already' && (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="text-3xl">&#10003;</div>
            <p className="text-[15px] font-semibold text-primary">
              {t('registration.alreadyRegistered')}
            </p>
            {txSignature && (
              <a
                href={`https://solscan.io/tx/${txSignature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-plum-light hover:underline"
              >
                {t('registration.viewTx')} &#8599;
              </a>
            )}
            <button
              onClick={handleGoToDashboard}
              className="n2-btn-primary mt-2 w-full"
            >
              {t('registration.goToDashboard')}
            </button>
          </div>
        )}

        {status === 'idle' && (
          <>
            <button
              onClick={handleRegister}
              className="n2-btn-primary w-full"
            >
              {t('registration.cta')}
            </button>
            <button
              onClick={handleSkip}
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              {t('registration.skip')}
            </button>
            <p className="text-[12px] text-text-muted text-center">
              {t('registration.cost')}
            </p>
          </>
        )}

        {status === 'signing' && (
          <div className="flex items-center gap-2 py-3">
            <span className="animate-spin text-primary">&#9702;</span>
            <span className="text-[15px] text-text-secondary">
              {t('registration.signing')}
            </span>
          </div>
        )}

        {status === 'confirming' && (
          <div className="flex items-center gap-2 py-3">
            <span className="animate-spin text-primary">&#9702;</span>
            <span className="text-[15px] text-text-secondary">
              {t('registration.confirming')}
            </span>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="text-3xl animate-bounce">&#10003;</div>
            <p className="text-[15px] font-semibold text-primary">
              {t('registration.success')}
            </p>
            {isDemo && (
              <p className="text-[13px] text-text-muted">
                {t('registration.demoSuccess')}
              </p>
            )}
            {!isDemo && txSignature && (
              <a
                href={`https://solscan.io/tx/${txSignature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-plum-light hover:underline"
              >
                {t('registration.viewTx')} &#8599;
              </a>
            )}
            <span className="inline-block rounded-lg bg-primary/20 px-3 py-1 font-mono text-[13px] font-bold text-primary animate-pulse">
              {t('registration.xpEarned')}
            </span>
            <button
              onClick={handleGoToDashboard}
              className="n2-btn-primary mt-2 w-full"
            >
              {t('registration.goToDashboard')}
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-[15px] text-red-400 text-center">{errorMsg}</p>
            <button
              onClick={handleRegister}
              className="n2-btn-ghost"
            >
              {t('registration.retry')}
            </button>
            <button
              onClick={handleSkip}
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              {t('registration.skip')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
