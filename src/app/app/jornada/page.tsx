'use client';

import { useState } from 'react';

import { useDashboard } from '@/contexts/DashboardContext';
import JourneyCard from '@/components/dashboard/JourneyCard';
import ActionCards from '@/components/dashboard/ActionCards';
import EducationModal, { type EducationTopicId } from '@/components/dashboard/EducationModal';

export default function JornadaPage() {
  const {
    goals, goalProgressList, commProfile,
    nudgeScore, hasKamino, handleTopicRead,
  } = useDashboard();

  const [educationTopic, setEducationTopic] = useState<EducationTopicId | null>(null);

  return (
    <>
      <div className="mt-6 space-y-4">
        {/* 1. Journey Card — goal progress */}
        {goals.length > 0 && (
          <JourneyCard
            goals={goals}
            progressList={goalProgressList}
            onOpenEducation={(topicId) => setEducationTopic(topicId as EducationTopicId)}
          />
        )}

        {/* 2. Action Cards — LINKS UTEIS */}
        {nudgeScore && (
          <ActionCards
            zone={nudgeScore.zone}
            hasKaminoPosition={hasKamino}
            commProfile={commProfile}
            onOpenEducation={(topicId) => setEducationTopic(topicId)}
          />
        )}
      </div>

      {educationTopic && (
        <EducationModal
          topicId={educationTopic}
          onClose={() => setEducationTopic(null)}
          onTopicRead={handleTopicRead}
        />
      )}
    </>
  );
}
