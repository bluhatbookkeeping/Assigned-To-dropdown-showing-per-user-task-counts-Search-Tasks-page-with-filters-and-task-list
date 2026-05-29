import React from 'react';
import { X, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { TeamMember, Task, SlaStatus } from '../types';
import { mockTasks } from '../data/mockData';

interface ViewTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}

export function ViewTasksModal({ isOpen, onClose, member }: ViewTasksModalProps) {
  if (!isOpen || !member) return null;

  const userTasks: Task[] = mockTasks.filter((t) => t.assignedTo === member.username);

  const getSlaIcon = (status: SlaStatus) => {
    if (status === 'Breached')
    return <AlertTriangle className="w-4 h-4" style={{ color: '#e74a3b' }} title="Breached" />;
    if (status === 'At Risk')
    return <Clock className="w-4 h-4" style={{ color: '#f6c23e' }} title="At Risk" />;
    return <CheckCircle className="w-4 h-4" style={{ color: '#1cc88a' }} title="On Track" />;
  };

  // Workflow badge is always MBA — the queue context this screen is launched from
  const WorkflowBadge = () =>
  <span
    className="inline-block px-2 py-0.5 rounded text-xs font-bold"
    style={{ backgroundColor: '#cce5ff', color: '#004085' }}>
    
      MBA
    </span>;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded shadow-2xl w-full max-w-4xl flex flex-col"
        style={{ maxHeight: '90vh', border: '1px solid #d1d3e2', fontFamily: 'Nunito Sans, sans-serif' }}>
        
        {/* Modal Header */}
        <div
          className="flex justify-between items-center px-6 py-3 flex-shrink-0"
          style={{ backgroundColor: '#2d2d5e' }}>
          
          <h3 className="text-white font-extrabold text-base">View Tasks</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Bar */}
        <div
          className="px-5 py-3 flex items-center flex-shrink-0"
          style={{ backgroundColor: '#cce5ff', border: '1px solid #b8daff' }}>
          
          <div>
            <p className="text-xs font-bold" style={{ color: '#004085' }}>Viewing tasks for:</p>
            <p className="text-sm font-extrabold" style={{ color: '#004085' }}>{member.username}</p>
            <p className="text-xs" style={{ color: '#004085' }}>Total Assigned: {member.taskCount} tasks</p>
          </div>
        </div>

        {/* Task Table — read only, no checkboxes, workflow always MBA */}
        <div className="flex-1 overflow-auto">
          <table className="wfq-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>SLA</th>
                <th>WORKFLOW</th>
                <th>REQUEST TYPE</th>
                <th>EVENT ID</th>
                <th>SERVICE COMPONENT</th>
                <th>TASK STATUS</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {userTasks.length === 0 ?
              <tr>
                  <td colSpan={7} className="text-center py-8 text-xs" style={{ color: '#858796' }}>
                    No tasks currently assigned to {member.username}.
                  </td>
                </tr> :

              userTasks.map((task) =>
              <tr key={task.id}>
                    <td style={{ textAlign: 'center' }}>{getSlaIcon(task.slaStatus)}</td>
                    <td><WorkflowBadge /></td>
                    <td>{task.requestType}</td>
                    <td><span className="wfq-link">{task.eventId}</span></td>
                    <td
                  className="truncate"
                  style={{ maxWidth: '160px' }}
                  title={task.serviceComponent}>
                  
                      {task.serviceComponent}
                    </td>
                    <td>{task.taskStatus}</td>
                    <td className="whitespace-nowrap">{task.lastModifiedDate}</td>
                  </tr>
              )
              }
            </tbody>
          </table>
        </div>

        {/* Footer — Close only */}
        <div
          className="flex justify-end px-5 py-3 flex-shrink-0"
          style={{ borderTop: '1px solid #e3e6f0' }}>
          
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </div>
    </div>);

}