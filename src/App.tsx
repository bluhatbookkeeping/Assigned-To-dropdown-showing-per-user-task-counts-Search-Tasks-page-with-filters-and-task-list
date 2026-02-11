import React, { useState } from 'react';
import { Header } from './components/Header';
import { WorkflowDashboard } from './components/WorkflowDashboard';
import { TeamWorkload } from './components/TeamWorkload';
import { AvailabilityScheduler } from './components/AvailabilityScheduler';
import { ViewState } from './types';
export function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <Header />

      <main>
        {currentView === 'dashboard' &&
        <WorkflowDashboard
          onNavigateToWorkload={() => setCurrentView('workload')} />

        }
        {currentView === 'workload' &&
        <TeamWorkload
          onBack={() => setCurrentView('dashboard')}
          onNavigateToAvailability={() => setCurrentView('availability')} />

        }
        {currentView === 'availability' &&
        <AvailabilityScheduler onBack={() => setCurrentView('workload')} />
        }
      </main>
    </div>);

}