'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter, useSearchParams } from 'next/navigation';
import WalletButton from '@/components/WalletButton';
import LanguageToggle from '@/components/LanguageToggle';
import PermissionsStep from '@/components/onboarding/PermissionsStep';
import QuizStep from '@/components/onboarding/QuizStep';
import GoalsStep from '@/components/onboarding/GoalsStep';
import ProfileStep from '@/components/onboarding/ProfileStep';
import RegistrationStep from '@/components/onboarding/RegistrationStep';
import { generateNeurotags, type QuizAnswers, type NeurotageId, type GoalId, type Gender } from '@/lib/neurotags';
import { saveProfile, saveRegistration, completeActivity, getProfile } from '@/lib/store';
import Link from 'next/link';

type Step = 'permissions' | 'quiz' | 'goals' | 'profile' | 'registration';
const ALL_STEPS: Step[] = ['permissions', 'quiz', 'goals', 'profile', 'registration'];

export default function OnboardingPage() {
  const { t } = useTranslation();
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>('permissions');
  const [neurotags, setNeurotags] = useState<NeurotageId[]>([]);
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [gender, setGender] = useState<Gender>('f');
  const [goals, setGoals] = useState<GoalId[]>([]);

  // Deep-link: ?step=registration or ?step=goals for users who already have a profile
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam !== 'registration' && stepParam !== 'goals') return;
    if (!publicKey) return;
    const profile = getProfile(publicKey.toBase58());
    if (!profile) return;
    setNeurotags(profile.neurotags);
    setAnswers(profile.answers ?? null);
    setGender(profile.gender ?? 'f');
    setGoals(profile.goals ?? []);
    setStep(stepParam);
  }, [searchParams, publicKey]);

  const handleQuizComplete = useCallback(
    (quizAnswers: QuizAnswers, quizGender: Gender) => {
      const tags = generateNeurotags(quizAnswers);
      setNeurotags(tags);
      setAnswers(quizAnswers);
      setGender(quizGender);
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
          gender,
          neurotags,
          answers,
          goals: selectedGoals,
          createdAt: new Date().toISOString(),
        });
      }

      setStep('profile');
    },
    [publicKey, answers, gender, neurotags],
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

  const stepIndex = ALL_STEPS.indexOf(step);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-surface-border">
        <Link href="/" className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
          <span className="n2-gradient-text font-display text-[20px] sm:text-[28px] font-bold uppercase tracking-[0.06em]">
            {t('brand.name')}
          </span>
          <span className="font-accent text-[11px] sm:text-[17px] text-plum">
            {t('brand.byline')}
          </span>
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <LanguageToggle />
          <WalletButton />
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        {/* Step indicator */}
        {connected && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {ALL_STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === stepIndex
                    ? 'w-8 bg-primary'
                    : i < stepIndex
                      ? 'w-2 bg-primary/40'
                      : 'w-2 bg-surface-border'
                }`}
              />
            ))}
          </div>
        )}

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
