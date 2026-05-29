import React, { useMemo, useState, Component } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  AlertCircle } from
'lucide-react';
import { mockTeamMembers, mockTasks } from '../data/mockData';
import { Task, SlaStatus } from '../types';
interface MemberSlaReportProps {
  memberId: string;
  onBack: () => void;
}
// Simple seeded random for consistent mock data per member
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
export function MemberSlaReport({ memberId, onBack }: MemberSlaReportProps) {
  const [timeRange, setTimeRange] = useState<'1m' | '6m'>('1m');
  const member = mockTeamMembers.find((m) => m.id === memberId);
  if (!member) {
    return (
      <div className="p-6 text-center">
        <p>Member not found.</p>
        <button
          onClick={onBack}
          className="mt-4 text-purple-600 hover:underline">
          
          Go Back
        </button>
      </div>);

  }
  // Seeded random for this member so data is consistent across re-renders
  const rand = useMemo(
    () => seededRandom(parseInt(member.id) * 7 + 31),
    [member.id]
  );
  // Calculate team average breach rate for comparison
  const teamStats = mockTeamMembers.map((m) => {
    const total = m.taskCount * (timeRange === '1m' ? 5 : 25);
    const breaches = Math.floor(total * (m.username.length % 15 / 100));
    return {
      total,
      breaches
    };
  });
  const totalTeamTasks = teamStats.reduce((acc, curr) => acc + curr.total, 0);
  const totalTeamBreaches = teamStats.reduce(
    (acc, curr) => acc + curr.breaches,
    0
  );
  const teamAvgBreachRate =
  totalTeamTasks > 0 ? totalTeamBreaches / totalTeamTasks * 100 : 0;
  // Real tasks from mockTasks
  const realAssignedTasks = mockTasks.filter(
    (t) => t.assignedTo === member.username
  );
  // Generate additional mock tasks so every member has 8-12 tasks to display
  const generatedTasks = useMemo(() => {
    const r = seededRandom(parseInt(member.id) * 13 + 47);
    const workflows: Array<'MBA' | 'CSA' | 'QA'> = ['MBA', 'CSA', 'QA'];
    const requestTypes = ['In-Clinic', 'Event'];
    const statuses: Array<SlaStatus> = ['On Track', 'At Risk', 'Breached'];
    const serviceComponents = [
    'U.S. Army Reserve (USAR)',
    'Army National Guard (ARNG)',
    'U.S. Navy Reserve',
    'U.S. Air Force Reserve (USAFR)',
    'U.S. Marine Corps Reserve',
    'U.S. Coast Guard Reserve (USCGR)',
    'Air National Guard',
    'Joint/Combined Event'];

    // Generate enough tasks to fill out the table (target ~10 total including real tasks)
    const needed = Math.max(0, 10 - realAssignedTasks.length);
    const tasks: Task[] = [];
    for (let i = 0; i < needed; i++) {
      const wf = workflows[Math.floor(r() * workflows.length)];
      const daysOffset = Math.floor(r() * 14) - 5; // -5 to +9 days from now
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + daysOffset);
      let slaStatus: SlaStatus;
      if (daysOffset < -1) slaStatus = 'Breached';else
      if (daysOffset <= 1) slaStatus = 'At Risk';else
      slaStatus = 'On Track';
      const assignedDaysAgo = Math.floor(r() * 10) + 1;
      const assignedDate = new Date();
      assignedDate.setDate(assignedDate.getDate() - assignedDaysAgo);
      // Some tasks are completed (historical)
      const isCompleted = r() > 0.6;
      const completedDate = isCompleted ? new Date() : null;
      if (completedDate) {
        completedDate.setDate(completedDate.getDate() - Math.floor(r() * 5));
        // Completed tasks: recalculate SLA status based on whether completed before deadline
        if (completedDate > deadline) slaStatus = 'Breached';else
        slaStatus = 'On Track';
      }
      tasks.push({
        id: `gen-${member.id}-${i}`,
        requestType: requestTypes[Math.floor(r() * requestTypes.length)],
        requestDate: assignedDate.toLocaleDateString('en-US'),
        requestStatus: isCompleted ? 'Completed' : 'Received',
        serviceComponent:
        serviceComponents[Math.floor(r() * serviceComponents.length)],
        eventDate: '',
        eventId: `WFQ-${1000 + parseInt(member.id) * 10 + i}`,
        ssn: Math.floor(r() * 9000 + 1000).toString(),
        services: true,
        taskStatus: isCompleted ?
        'COMPLETED' :
        r() > 0.5 ?
        'IN PROGRESS' :
        'NEW',
        lastModifiedDate: new Date().toLocaleDateString('en-US'),
        assignedTo: member.username,
        workflow: wf,
        slaDeadline: deadline.toISOString(),
        slaStatus
      });
    }
    return tasks;
  }, [member.id, member.username, realAssignedTasks.length]);
  const allTasks = [...realAssignedTasks, ...generatedTasks];
  const activeTasksCount = allTasks.filter(
    (t) => t.taskStatus !== 'COMPLETED'
  ).length;
  const totalHistorical = member.taskCount * (timeRange === '1m' ? 5 : 25);
  const historicalBreaches = Math.floor(
    totalHistorical * (member.username.length % 15 / 100)
  );
  const breachRate =
  totalHistorical > 0 ? historicalBreaches / totalHistorical * 100 : 0;
  const breachRateDiff = breachRate - teamAvgBreachRate;
  // Mock trend data with more variation and always-visible values
  const trendData = useMemo(() => {
    const r = seededRandom(parseInt(member.id) * 19 + 53);
    const baseRate = Math.max(3, breachRate || 6); // Ensure a visible baseline even if breach rate is 0
    if (timeRange === '1m') {
      return [
      {
        label: 'Week 1',
        rate: +(baseRate + (r() * 8 - 3)).toFixed(1)
      },
      {
        label: 'Week 2',
        rate: +(baseRate + (r() * 10 - 4)).toFixed(1)
      },
      {
        label: 'Week 3',
        rate: +(baseRate + (r() * 6 - 2)).toFixed(1)
      },
      {
        label: 'Week 4',
        rate: +(baseRate + (r() * 8 - 3)).toFixed(1)
      }].
      map((d) => ({
        ...d,
        rate: Math.max(0.5, d.rate)
      }));
    } else {
      return [
      {
        label: 'Oct',
        rate: +(baseRate + (r() * 10 - 4)).toFixed(1)
      },
      {
        label: 'Nov',
        rate: +(baseRate + (r() * 12 - 5)).toFixed(1)
      },
      {
        label: 'Dec',
        rate: +(baseRate + (r() * 8 - 2)).toFixed(1)
      },
      {
        label: 'Jan',
        rate: +(baseRate + (r() * 14 - 6)).toFixed(1)
      },
      {
        label: 'Feb',
        rate: +(baseRate + (r() * 10 - 4)).toFixed(1)
      },
      {
        label: 'Mar',
        rate: +(baseRate + (r() * 8 - 3)).toFixed(1)
      }].
      map((d) => ({
        ...d,
        rate: Math.max(0.5, d.rate)
      }));
    }
  }, [member.id, breachRate, timeRange]);
  // Find the max rate for scaling the chart
  const maxTrendRate = Math.max(...trendData.map((d) => d.rate), 15);
  // Workflow breakdown stats (mocked based on total)
  const workflowStats = [
  {
    type: 'MBA',
    total: Math.floor(totalHistorical * 0.4),
    breaches: Math.floor(historicalBreaches * 0.5)
  },
  {
    type: 'CSA',
    total: Math.floor(totalHistorical * 0.35),
    breaches: Math.floor(historicalBreaches * 0.3)
  },
  {
    type: 'QA',
    total: Math.floor(totalHistorical * 0.25),
    breaches: Math.floor(historicalBreaches * 0.2)
  }].
  map((w) => ({
    ...w,
    rate: w.total > 0 ? w.breaches / w.total * 100 : 0
  }));
  // Sort tasks: Flagged (Breached/At Risk) first, then On Track, completed last
  const sortedTasks = [...allTasks].sort((a, b) => {
    const statusWeight: Record<string, number> = {
      Breached: 4,
      'At Risk': 3,
      'On Track': 2
    };
    const aWeight =
    a.taskStatus === 'COMPLETED' ? 1 : statusWeight[a.slaStatus] || 2;
    const bWeight =
    b.taskStatus === 'COMPLETED' ? 1 : statusWeight[b.slaStatus] || 2;
    return bWeight - aWeight;
  });
  const getSlaBadge = (status: Task['slaStatus']) => {
    switch (status) {
      case 'On Track':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800 border border-green-200">
            On Track
          </span>);

      case 'At Risk':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
            At Risk
          </span>);

      case 'Breached':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800 border border-red-200">
            Breached
          </span>);

    }
  };
  const getWorkflowBadge = (workflow: Task['workflow']) => {
    switch (workflow) {
      case 'MBA':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            MBA
          </span>);

      case 'CSA':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
            CSA
          </span>);

      case 'QA':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
            QA
          </span>);

    }
  };
  const calculateDaysRemaining = (deadline: string) => {
    const diffTime = new Date(deadline).getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    return `${diffDays} days remaining`;
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
              
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg mr-4 border-2 border-purple-200">
                {member.username.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1a1a40]">
                  {member.username}
                </h1>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${member.status === 'Available' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                    
                    {member.status}
                  </span>
                  <span className="text-sm text-gray-500 ml-3">
                    Team Member SLA Report
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTimeRange('1m')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${timeRange === '1m' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange('6m')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${timeRange === '6m' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              
              Last 6 Months
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Overall Breach Rate
              </p>
              {breachRate > 5 ?
              <AlertTriangle className="w-4 h-4 text-red-500" /> :

              <CheckCircle className="w-4 h-4 text-green-500" />
              }
            </div>
            <p
              className={`text-2xl font-bold mt-1 ${breachRate > 5 ? 'text-red-600' : 'text-gray-900'}`}>
              
              {breachRate.toFixed(1)}%
            </p>
            <div className="flex items-center mt-1">
              {breachRateDiff > 0 ?
              <TrendingUp className="w-3 h-3 text-red-500 mr-1" /> :

              <TrendingDown className="w-3 h-3 text-green-500 mr-1" />
              }
              <p
                className={`text-xs ${breachRateDiff > 0 ? 'text-red-600' : 'text-green-600'}`}>
                
                {Math.abs(breachRateDiff).toFixed(1)}%{' '}
                {breachRateDiff > 0 ? 'above' : 'below'} team avg
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Current Active Tasks
              </p>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {activeTasksCount}
            </p>
            <p className="text-xs text-gray-400 mt-1">Currently assigned</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Total Breached
              </p>
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {historicalBreaches}
            </p>
            <p className="text-xs text-gray-400 mt-1">In selected period</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Total Processed
              </p>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {totalHistorical}
            </p>
            <p className="text-xs text-gray-400 mt-1">In selected period</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Trend Chart */}
          <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Breach Rate Trend
              </h3>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-sm bg-green-500 mr-1"></span>
                  &lt; 5%
                </span>
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 mr-1"></span>
                  5–10%
                </span>
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-500 mr-1"></span>
                  &gt; 10%
                </span>
              </div>
            </div>
            <div className="h-52 flex items-end space-x-3 pt-6 px-2">
              {trendData.map((data, i) => {
                const height = Math.max(8, data.rate / maxTrendRate * 100);
                const colorClass =
                data.rate > 10 ?
                'bg-red-500' :
                data.rate > 5 ?
                'bg-yellow-400' :
                'bg-green-500';
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center group">
                    
                    <div className="w-full flex flex-col items-center relative h-full justify-end">
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                        {data.rate.toFixed(1)}%
                      </div>
                      <div className="text-xs font-bold text-gray-600 mb-1">
                        {data.rate.toFixed(1)}%
                      </div>
                      <div
                        className={`w-full max-w-[44px] rounded-t ${colorClass} transition-all duration-500`}
                        style={{
                          height: `${Math.min(100, height)}%`
                        }}>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 font-medium">
                      {data.label}
                    </div>
                  </div>);

              })}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Team avg: {teamAvgBreachRate.toFixed(1)}%</span>
              <span>Target: &lt; 5%</span>
            </div>
          </div>

          {/* Workflow Breakdown */}
          <div className="col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">
              By Workflow Type
            </h3>
            <div className="space-y-4">
              {workflowStats.map((stat) =>
              <div key={stat.type}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      {getWorkflowBadge(stat.type as any)}
                    </div>
                    <span
                    className={`text-sm font-bold ${stat.rate > 5 ? 'text-red-600' : 'text-gray-700'}`}>
                    
                      {stat.rate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                    className={`h-full rounded-full ${stat.rate > 5 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{
                      width: `${Math.min(100, stat.rate * 5)}%`
                    }} // Scaled for visibility
                  ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">
                      {stat.breaches} breaches
                    </span>
                    <span className="text-xs text-gray-400">
                      {stat.total} total
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Task Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              Current Assigned Tasks
            </h3>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                {sortedTasks.filter((t) => t.taskStatus !== 'COMPLETED').length}{' '}
                Active
              </span>
              <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                {sortedTasks.filter((t) => t.taskStatus === 'COMPLETED').length}{' '}
                Completed
              </span>
              <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                {sortedTasks.length} Total
              </span>
            </div>
          </div>

          {sortedTasks.length > 0 ?
          <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Task ID
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Workflow
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Request Type
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Date Assigned
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    SLA Deadline
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Task Status
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    SLA Status
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Time Remaining
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedTasks.map((task) =>
              <tr
                key={task.id}
                className={`hover:bg-gray-50 transition-colors ${task.slaStatus === 'Breached' && task.taskStatus !== 'COMPLETED' ? 'bg-red-50/40' : task.slaStatus === 'At Risk' && task.taskStatus !== 'COMPLETED' ? 'bg-yellow-50/40' : task.taskStatus === 'COMPLETED' ? 'bg-gray-50/40' : ''}`}>
                
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium text-purple-700">
                        {task.eventId || task.id}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      {getWorkflowBadge(task.workflow)}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">
                      {task.requestType}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">
                      {new Date(task.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {new Date(task.slaDeadline).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${task.taskStatus === 'COMPLETED' ? 'bg-gray-100 text-gray-600 border border-gray-200' : task.taskStatus === 'IN PROGRESS' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-purple-50 text-purple-700 border border-purple-200'}`}>
                    
                        {task.taskStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      {getSlaBadge(task.slaStatus)}
                    </td>
                    <td
                  className={`px-5 py-3 whitespace-nowrap text-right text-sm font-medium ${task.taskStatus === 'COMPLETED' ? 'text-gray-400' : task.slaStatus === 'Breached' ? 'text-red-600' : task.slaStatus === 'At Risk' ? 'text-yellow-600' : 'text-gray-600'}`}>
                  
                      {task.taskStatus === 'COMPLETED' ?
                  'Completed' :
                  calculateDaysRemaining(task.slaDeadline)}
                    </td>
                  </tr>
              )}
              </tbody>
            </table> :

          <div className="p-8 text-center text-gray-500">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p>No active tasks currently assigned to this member.</p>
            </div>
          }
        </div>
      </div>
    </div>);

}