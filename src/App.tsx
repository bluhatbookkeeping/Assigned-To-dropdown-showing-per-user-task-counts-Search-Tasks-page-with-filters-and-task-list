import React, { useState } from 'react';
import { Header } from './components/Header';
import { WorkflowDashboard } from './components/WorkflowDashboard';
import { TeamWorkload } from './components/TeamWorkload';
import { AvailabilityScheduler } from './components/AvailabilityScheduler';
import { SlaComplianceDashboard } from './components/SlaComplianceDashboard';
import { SlaConfigPanel } from './components/SlaConfigPanel';
import { MemberSlaReport } from './components/MemberSlaReport';
import { ViewState } from './types';
export function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [globalCapacity, setGlobalCapacity] = useState(50);
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
          onNavigateToAvailability={() => setCurrentView('availability')}
          onNavigateToSlaDashboard={() => setCurrentView('sla-dashboard')}
          globalCapacity={globalCapacity}
          setGlobalCapacity={setGlobalCapacity} />

        }
        {currentView === 'availability' &&
        <AvailabilityScheduler onBack={() => setCurrentView('workload')} />
        }
        {currentView === 'sla-dashboard' &&
        <SlaComplianceDashboard
          onBack={() => setCurrentView('workload')}
          onNavigateToConfig={() => setCurrentView('sla-config')}
          onViewReport={(memberId) => {
            setSelectedMemberId(memberId);
            setCurrentView('member-report');
          }} />

        }
        {currentView === 'sla-config' &&
        <SlaConfigPanel onBack={() => setCurrentView('sla-dashboard')} />
        }
        {currentView === 'member-report' && selectedMemberId &&
        <MemberSlaReport
          memberId={selectedMemberId}
          onBack={() => setCurrentView('sla-dashboard')} />

        }
      </main>
    </div>);

}