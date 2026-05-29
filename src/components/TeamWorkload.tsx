import React, { useState } from 'react';
import { ArrowLeft, BarChart2, Calendar, Search, Filter } from 'lucide-react';
import { mockTeamMembers } from '../data/mockData';
import { TeamMember } from '../types';
import { ReassignModal } from './ReassignModal';
import { ViewTasksModal } from './ViewTasksModal';
interface TeamWorkloadProps {
  onBack: () => void;
  onNavigateToAvailability: () => void;
  onNavigateToSlaDashboard: () => void;
  globalCapacity: number;
  setGlobalCapacity: (capacity: number) => void;
}
export function TeamWorkload({
  onBack,
  onNavigateToAvailability,
  onNavigateToSlaDashboard,
  globalCapacity,
  setGlobalCapacity
}: TeamWorkloadProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [isViewTasksModalOpen, setIsViewTasksModalOpen] = useState(false);
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
  const getPercentage = (count: number) =>
  Math.round(count / globalCapacity * 100);
  const getBarColor = (count: number) => {
    const pct = getPercentage(count);
    return pct > 100 ? '#e74a3b' : pct > 70 ? '#f6c23e' : '#1cc88a';
  };
  const getBarWidth = (count: number) => {
    const pct = getPercentage(count);
    return `${Math.min(pct, 100)}%`;
  };
  const handleViewTasks = (member: TeamMember) => {
    setSelectedMember(member);
    setIsViewTasksModalOpen(true);
  };
  const handleReassign = (member: TeamMember) => {
    setSelectedMember(member);
    setIsReassignModalOpen(true);
  };
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundColor: '#f8f9fc',
        fontFamily: 'Nunito Sans, sans-serif'
      }}>
      
      {/* Page Title Bar */}
      <div
        className="bg-white border-b px-6 py-3"
        style={{
          borderColor: '#d1d3e2'
        }}>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-3"
              style={{
                color: '#858796'
              }}>
              
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1
                className="text-lg font-extrabold"
                style={{
                  color: '#850F89'
                }}>
                
                Team Workload Overview
              </h1>
              <p
                className="text-xs"
                style={{
                  color: '#858796'
                }}>
                
                MBA Queue • {mockTeamMembers.length} Team Members
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="flex items-center space-x-2 mr-2 border-r pr-4"
              style={{
                borderColor: '#d1d3e2'
              }}>
              
              <span
                className="text-xs font-bold"
                style={{
                  color: '#858796'
                }}>
                
                CAPACITY:
              </span>
              <input
                type="number"
                value={globalCapacity}
                onChange={(e) =>
                setGlobalCapacity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 px-2 py-1 border rounded text-xs font-bold text-center focus:outline-none"
                style={{
                  borderColor: '#d1d3e2',
                  color: '#850F89'
                }} />
              
            </div>
            <button onClick={onNavigateToSlaDashboard} className="btn-primary">
              <BarChart2 className="w-3 h-3 mr-1" />
              SLA Dashboard
            </button>
            <button onClick={onNavigateToAvailability} className="btn-primary">
              <Calendar className="w-3 h-3 mr-1" />
              Manage Availability
            </button>
            <div className="relative">
              <Search
                className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2"
                style={{
                  color: '#858796'
                }} />
              
              <input
                type="text"
                placeholder="Find team member..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 pr-3 py-1.5 border rounded text-xs focus:outline-none"
                style={{
                  borderColor: '#d1d3e2',
                  width: '180px'
                }} />
              
            </div>
            <button className="btn-secondary">
              <Filter className="w-3 h-3 mr-1" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {(() => {
        const teamCapacity = globalCapacity * mockTeamMembers.length;
        const teamUtilization =
        teamCapacity > 0 ? Math.round(totalTasks / teamCapacity * 100) : 0;
        const teamColor =
        teamUtilization > 100 ?
        '#e74a3b' :
        teamUtilization > 70 ?
        '#f6c23e' :
        '#1cc88a';
        const teamBarWidth = `${Math.min(teamUtilization, 100)}%`;
        const cards = [
        {
          label: 'TEAM CAPACITY',
          primary: `${totalTasks} / ${teamCapacity}`,
          subtitle: `${teamUtilization}% of team capacity used`,
          color: teamColor,
          showBar: true,
          barWidth: teamBarWidth
        },
        {
          label: 'AVG TASKS/PERSON',
          primary: avgTasks,
          subtitle: `Capacity is ${globalCapacity} per person`,
          color: '#5a5c69'
        },
        {
          label: 'MEMBERS W/ 0 TASKS',
          primary: zeroTasks,
          subtitle: 'Available to take work',
          color: '#1cc88a'
        },
        {
          label: 'OUT OF OFFICE',
          primary: oooMembers,
          subtitle: 'Unavailable members',
          color: '#f6c23e'
        }];

        return (
          <div className="grid grid-cols-4 gap-4 px-6 py-4">
            {cards.map((s) =>
            <div
              key={s.label}
              className="bg-white rounded shadow-sm p-4"
              style={{
                border: '1px solid #e3e6f0'
              }}>
              
                <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{
                  color: '#858796'
                }}>
                
                  {s.label}
                </p>
                <p
                className="text-3xl font-extrabold mt-1"
                style={{
                  color: s.color
                }}>
                
                  {s.primary}
                </p>
                {s.showBar &&
              <div
                className="w-full rounded-full h-1.5 mt-2"
                style={{
                  backgroundColor: '#e3e6f0'
                }}>
                
                    <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: s.barWidth,
                    backgroundColor: s.color
                  }} />
                
                  </div>
              }
                <p
                className="text-xs mt-2"
                style={{
                  color: '#858796'
                }}>
                
                  {s.subtitle}
                </p>
              </div>
            )}
          </div>);

      })()}

      {/* Team Table */}
      <div className="px-6 pb-6">
        <div
          className="bg-white rounded shadow"
          style={{
            border: '1px solid #e3e6f0'
          }}>
          
          <table className="wfq-table">
            <thead>
              <tr>
                <th>TEAM MEMBER</th>
                <th>STATUS</th>
                <th
                  style={{
                    width: '30%'
                  }}>
                  
                  WORKLOAD DISTRIBUTION
                </th>
                <th
                  style={{
                    textAlign: 'center'
                  }}>
                  
                  TASK COUNT
                </th>
                <th
                  style={{
                    textAlign: 'right'
                  }}>
                  
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) =>
              <tr key={member.id}>
                  <td>
                    <div className="flex items-center">
                      <div
                      className="h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2"
                      style={{
                        backgroundColor: '#850F89'
                      }}>
                      
                        {member.username.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-xs">
                        {member.username}
                      </span>
                    </div>
                  </td>
                  <td>
                    {member.status === 'Available' ?
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-semibold"
                    style={{
                      backgroundColor: '#d4edda',
                      color: '#155724'
                    }}>
                    
                        Available
                      </span> :

                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-semibold"
                    style={{
                      backgroundColor: '#fff3cd',
                      color: '#856404'
                    }}>
                    
                        Out of Office
                      </span>
                  }
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div
                      className="w-full rounded-full h-2 flex-grow"
                      style={{
                        backgroundColor: '#e3e6f0'
                      }}>
                      
                        <div
                        className="h-2 rounded-full"
                        style={{
                          width: getBarWidth(member.taskCount),
                          backgroundColor: getBarColor(member.taskCount)
                        }} />
                      
                      </div>
                      <span
                      className="text-xs font-bold w-10 text-right"
                      style={{
                        color: getBarColor(member.taskCount)
                      }}>
                      
                        {getPercentage(member.taskCount)}%
                      </span>
                    </div>
                  </td>
                  <td
                  style={{
                    textAlign: 'center'
                  }}>
                  
                    <span
                    className="font-bold text-xs"
                    style={{
                      color:
                      getPercentage(member.taskCount) > 100 ?
                      '#e74a3b' :
                      '#5a5c69'
                    }}>
                    
                      {member.taskCount} / {globalCapacity}
                    </span>
                  </td>
                  <td
                  style={{
                    textAlign: 'right'
                  }}>
                  
                    <button
                    onClick={() => handleViewTasks(member)}
                    className="text-xs font-bold mr-3"
                    style={{
                      color: '#850F89',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                    
                      View Tasks
                    </button>
                    <button
                    onClick={() => handleReassign(member)}
                    className="btn-primary text-xs">
                    
                      Reassign
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Tasks Modal */}
      <ViewTasksModal
        isOpen={isViewTasksModalOpen}
        onClose={() => setIsViewTasksModalOpen(false)}
        member={selectedMember} />
      

      {/* Reassign Modal */}
      <ReassignModal
        isOpen={isReassignModalOpen}
        onClose={() => setIsReassignModalOpen(false)}
        sourceUser={selectedMember} />
      
    </div>);

}