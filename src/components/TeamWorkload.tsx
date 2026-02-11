import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Calendar } from 'lucide-react';
import { mockTeamMembers } from '../data/mockData';
import { TeamMember } from '../types';
import { ReassignModal } from './ReassignModal';
interface TeamWorkloadProps {
  onBack: () => void;
  onNavigateToAvailability: () => void;
}
export function TeamWorkload({
  onBack,
  onNavigateToAvailability
}: TeamWorkloadProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  // Stats
  const totalTasks = mockTeamMembers.reduce(
    (acc, curr) => acc + curr.taskCount,
    0
  );
  const avgTasks = Math.round(totalTasks / mockTeamMembers.length);
  const zeroTasks = mockTeamMembers.filter((m) => m.taskCount === 0).length;
  const oooMembers = mockTeamMembers.filter(
    (m) => m.status === 'Out of Office'
  ).length;
  const filteredMembers = mockTeamMembers.
  filter((m) => m.username.toLowerCase().includes(searchTerm.toLowerCase())).
  sort((a, b) => b.taskCount - a.taskCount);
  const getWorkloadColor = (count: number) => {
    if (count > 40) return 'bg-red-500';
    if (count > 20) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  const getWorkloadWidth = (count: number) => {
    const max = Math.max(...mockTeamMembers.map((m) => m.taskCount));
    return `${count / max * 100}%`;
  };
  const handleReassignClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsReassignModalOpen(true);
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Team Workload Overview
              </h1>
              <p className="text-sm text-gray-500">
                MBA Queue • {mockTeamMembers.length} Team Members
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onNavigateToAvailability}
              className="flex items-center px-4 py-2 border border-purple-300 rounded-md text-sm font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors mr-2">

              <Calendar className="w-4 h-4 mr-2" />
              Manage Availability
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Find team member..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none w-64" />

            </div>
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Total Tasks
            </p>
            <p className="text-2xl font-bold text-purple-900 mt-1">
              {totalTasks}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Avg Tasks/Person
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{avgTasks}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Members w/ 0 Tasks
            </p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {zeroTasks}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Out of Office
            </p>
            <p className="text-2xl font-bold text-orange-500 mt-1">
              {oooMembers}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">
                  Workload Distribution
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                  Task Count
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.map((member) =>
              <tr
                key={member.id}
                className="hover:bg-gray-50 transition-colors">

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs mr-3">
                        {member.username.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {member.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {member.status === 'Available' ?
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Available
                      </span> :

                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Out of Office
                      </span>
                  }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                      className={`h-2.5 rounded-full ${getWorkloadColor(member.taskCount)}`}
                      style={{
                        width: getWorkloadWidth(member.taskCount)
                      }}>
                    </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                    className={`text-sm font-bold ${member.taskCount > 40 ? 'text-red-600' : 'text-gray-900'}`}>

                      {member.taskCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900 mr-4">
                      View Tasks
                    </button>
                    <button
                    onClick={() => handleReassignClick(member)}
                    className="text-[#6a5acd] font-bold hover:text-[#5a4abd] border border-[#6a5acd] px-3 py-1 rounded hover:bg-purple-50 transition-colors">

                      Reassign
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ReassignModal
        isOpen={isReassignModalOpen}
        onClose={() => setIsReassignModalOpen(false)}
        sourceUser={selectedMember} />

    </div>);

}