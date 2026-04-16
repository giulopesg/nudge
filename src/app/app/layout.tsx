'use client';

import { Suspense } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}
