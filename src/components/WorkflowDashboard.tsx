import React from 'react';
import { Key, Users } from 'lucide-react';
import { SearchFilters } from './SearchFilters';
import { TaskTable } from './TaskTable';
interface WorkflowDashboardProps {
  onNavigateToWorkload: () => void;
}
export function WorkflowDashboard({
  onNavigateToWorkload
}: WorkflowDashboardProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SearchFilters />

      {/* Action Bar */}
      <div className="bg-white px-6 py-4 flex justify-end items-center space-x-2 border-b border-gray-200">
        <button className="bg-[#6a5acd] hover:bg-[#5a4abd] text-[#ffd700] px-4 py-1.5 rounded text-sm font-bold flex items-center shadow-sm transition-colors uppercase tracking-wide">
          <Key className="w-3.5 h-3.5 mr-2" />
          Assign
        </button>
        <button className="bg-[#6a5acd] hover:bg-[#5a4abd] text-[#ffd700] px-4 py-1.5 rounded text-sm font-bold flex items-center shadow-sm transition-colors uppercase tracking-wide">
          <Key className="w-3.5 h-3.5 mr-2" />
          Reassign
        </button>
        <button className="bg-[#a0a0a0] text-gray-200 px-4 py-1.5 rounded text-sm font-bold flex items-center shadow-sm cursor-not-allowed uppercase tracking-wide">
          Unassign
        </button>

        {/* NEW Workload Button */}
        <div className="w-px h-8 bg-gray-300 mx-2"></div>

        <button
          onClick={onNavigateToWorkload}
          className="bg-white border-2 border-[#6a5acd] text-[#6a5acd] hover:bg-[#f0f0ff] px-4 py-1.5 rounded text-sm font-bold flex items-center shadow-sm transition-colors uppercase tracking-wide relative group">
          
          <Users className="w-4 h-4 mr-2" />
          Team Workload
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        </button>
      </div>

      <TaskTable />
    </div>);

}