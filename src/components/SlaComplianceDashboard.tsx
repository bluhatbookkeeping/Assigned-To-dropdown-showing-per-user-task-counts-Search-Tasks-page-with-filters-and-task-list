import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  Settings } from
'lucide-react';
import { mockTeamMembers, mockTasks } from '../data/mockData';
import { TeamMember, SlaStatus } from '../types';
interface SlaComplianceDashboardProps {
  onBack: () => void;
  onNavigateToConfig: () => void;
  onViewReport: (memberId: string) => void;
}
export function SlaComplianceDashboard({
  onBack,
  onNavigateToConfig,
  onViewReport
}: SlaComplianceDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState<'1m' | '6m'>('1m');
  // Calculate stats per user based on mockTasks
  // In a real app, this would come from the backend
  const userStats = mockTeamMembers.
  map((member) => {
    // Simulate stats since we don't have full history in mockTasks
    // We'll use the few assigned tasks we have plus some randomization for the demo
    const assignedTasks = mockTasks.filter(
      (t) => t.assignedTo === member.username
    );
    const breachedCount = assignedTasks.filter(
      (t) => t.slaStatus === 'Breached'
    ).length;
    const atRiskCount = assignedTasks.filter(
      (t) => t.slaStatus === 'At Risk'
    ).length;
    const onTrackCount = assignedTasks.filter(
      (t) => t.slaStatus === 'On Track'
    ).length;
    // Generate realistic-looking historical data
    const totalHistorical = member.taskCount * (timeRange === '1m' ? 5 : 25);
    const historicalBreaches = Math.floor(
      totalHistorical * (Math.random() * 0.15)
    ); // 0-15% breach rate
    const breachRate =
    totalHistorical > 0 ? historicalBreaches / totalHistorical * 100 : 0;
    return {
      ...member,
      currentBreached: breachedCount,
      currentAtRisk: atRiskCount,
      currentOnTrack: onTrackCount,
      historicalBreaches,
      totalHistorical,
      breachRate
    };
  }).
  sort((a, b) => b.breachRate - a.breachRate); // Sort by highest breach rate
  const filteredStats = userStats.filter((u) =>
  u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Aggregate stats
  const totalBreaches = userStats.reduce(
    (acc, curr) => acc + curr.historicalBreaches,
    0
  );
  const totalTasks = userStats.reduce(
    (acc, curr) => acc + curr.totalHistorical,
    0
  );
  const avgBreachRate = totalTasks > 0 ? totalBreaches / totalTasks * 100 : 0;
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
              
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                SLA Compliance Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Monitor team performance and SLA breach risks
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onNavigateToConfig}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
              
              <Settings className="w-4 h-4 mr-2 text-gray-500" />
              Configure Thresholds
            </button>
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Avg Breach Rate
              </p>
              <TrendingDown
                className={`w-4 h-4 ${avgBreachRate > 5 ? 'text-red-500' : 'text-green-500'}`} />
              
            </div>
            <p
              className={`text-2xl font-bold mt-1 ${avgBreachRate > 5 ? 'text-red-600' : 'text-gray-900'}`}>
              
              {avgBreachRate.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">Target: &lt; 5%</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Current At Risk
              </p>
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {userStats.reduce((acc, curr) => acc + curr.currentAtRisk, 0)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Tasks nearing deadline</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Current Breached
              </p>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {userStats.reduce((acc, curr) => acc + curr.currentBreached, 0)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Tasks past deadline</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Total Processed
              </p>
              <CheckCircle className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {totalTasks}
            </p>
            <p className="text-xs text-gray-400 mt-1">In selected period</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Team Performance</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by team member..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none w-64" />
            
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                  Current Status
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                  Breach Rate ({timeRange})
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                  Total Breaches
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                  Total Tasks
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStats.map((user) =>
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors">
                
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs mr-3">
                        {user.username.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center space-x-2">
                      {user.currentBreached > 0 &&
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                          {user.currentBreached} Breached
                        </span>
                    }
                      {user.currentAtRisk > 0 &&
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                          {user.currentAtRisk} At Risk
                        </span>
                    }
                      {user.currentBreached === 0 &&
                    user.currentAtRisk === 0 &&
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                            All Good
                          </span>
                    }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <span
                      className={`text-sm font-bold ${user.breachRate > 5 ? 'text-red-600' : 'text-gray-900'}`}>
                      
                        {user.breachRate.toFixed(1)}%
                      </span>
                      {user.breachRate > 10 &&
                    <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                    }
                    </div>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full mx-auto mt-1">
                      <div
                      className={`h-1.5 rounded-full ${user.breachRate > 5 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{
                        width: `${Math.min(user.breachRate * 2, 100)}%`
                      }}>
                    </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {user.historicalBreaches}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {user.totalHistorical}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                    onClick={() => onViewReport(user.id)}
                    className="text-purple-600 hover:text-purple-900">
                    
                      View Report
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}