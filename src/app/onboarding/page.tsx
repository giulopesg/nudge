'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import WalletButton from '@/components/WalletButton';
import PermissionsStep from '@/components/onboarding/PermissionsStep';
import QuizStep from '@/components/onboarding/QuizStep';
import GoalsStep from '@/components/onboarding/GoalsStep';
import ProfileStep from '@/components/onboarding/ProfileStep';
import RegistrationStep from '@/components/onboarding/RegistrationStep';
import { generateNeurotags, type QuizAnswers, type NeurotageId, type GoalId } from '@/lib/neurotags';
import { saveProfile, saveRegistration, completeActivity } from '@/lib/store';
import Link from 'next/link';

type Step = 'permissions' | 'quiz' | 'goals' | 'profile' | 'registration';

export default function OnboardingPage() {
  const { t } = useTranslation();
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const [step, setStep] = useState<Step>('permissions');
  const [neurotags, setNeurotags] = useState<NeurotageId[]>([]);
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [goals, setGoals] = useState<GoalId[]>([]);

  const handleQuizComplete = useCallback(
    (quizAnswers: QuizAnswers) => {
      const tags = generateNeurotags(quizAnswers);
      setNeurotags(tags);
      setAnswers(quizAnswers);
      setStep('goals');
    },
    [],
  );

  const handleGoalsComplete = useCallback(
    (selectedGoals: GoalId[]) => {
      setGoals(selectedGoals);

      if (publicKey && answers) {
        saveProfile({
          wallet: publicKey.toBase58(),
          neurotags,
          answers,
          goals: selectedGoals,
          createdAt: new Date().toISOString(),
        });
      }

      setStep('profile');
    },
    [publicKey, answers, neurotags],
  );

  const handleRegistrationComplete = useCallback(
    (txHash: string | null) => {
      if (txHash && publicKey) {
        const wallet = publicKey.toBase58();
        saveRegistration(wallet, {
          txSignature: txHash,
          hash: '',
          timestamp: new Date().toISOString(),
        });
        completeActivity(wallet, 'onchain-register');
      }
      router.push('/app');
    },
    [publicKey, router],
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
        <Link
          href="/"
          className="font-display text-sm font-bold uppercase tracking-widest text-primary text-glow-primary"
        >
          {t('app.name')}
        </Link>
        <WalletButton />
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center py-12">
        {!connected ? (
          <div className="text-center">
            <p className="text-text-secondary">
              {t('errors.walletNotConnected')}
            </p>
            <div className="mt-4">
              <WalletButton />
            </div>
          </div>
        ) : step === 'permissions' ? (
          <PermissionsStep onContinue={() => setStep('quiz')} />
        ) : step === 'quiz' ? (
          <QuizStep
            onComplete={handleQuizComplete}
            onBack={() => setStep('permissions')}
          />
        ) : step === 'goals' ? (
          <GoalsStep
            onComplete={handleGoalsComplete}
            onBack={() => setStep('quiz')}
          />
        ) : step === 'profile' ? (
          <ProfileStep neurotags={neurotags} goals={goals} onNext={() => setStep('registration')} />
        ) : (
          <RegistrationStep
            neurotags={neurotags}
            goals={goals}
            onComplete={handleRegistrationComplete}
          />
        )}
      </main>
    </div>
  );
}
