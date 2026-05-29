import React, { useEffect, useState } from 'react';
import { X, AlertCircle, AlertTriangle, CheckCircle2, Clock, CheckCircle } from 'lucide-react';
import { TeamMember, Task, SlaStatus } from '../types';
import { mockTeamMembers, mockTasks } from '../data/mockData';

interface ReassignModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceUser: TeamMember | null;
}

export function ReassignModal({ isOpen, onClose, sourceUser }: ReassignModalProps) {
  const [step, setStep] = useState<'select' | 'success'>('select');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (sourceUser) {
      setUserTasks(mockTasks.filter((t) => t.assignedTo === sourceUser.username));
      setSelectedTaskIds(new Set());
      setStep('select');
      setSelectedTarget('');
    }
  }, [sourceUser, isOpen]);

  if (!isOpen || !sourceUser) return null;

  const toggleTask = (id: string) => {
    const s = new Set(selectedTaskIds);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelectedTaskIds(s);
  };
  const toggleAll = () =>
  setSelectedTaskIds(
    selectedTaskIds.size === userTasks.length ?
    new Set() :
    new Set(userTasks.map((t) => t.id))
  );
  const resetAndClose = () => {
    setStep('select');
    setSelectedTarget('');
    setSelectedTaskIds(new Set());
    onClose();
  };

  const getSlaIcon = (status: SlaStatus) => {
    if (status === 'Breached') return <AlertTriangle className="w-4 h-4" style={{ color: '#e74a3b' }} title="Breached" />;
    if (status === 'At Risk') return <Clock className="w-4 h-4" style={{ color: '#f6c23e' }} title="At Risk" />;
    return <CheckCircle className="w-4 h-4" style={{ color: '#1cc88a' }} title="On Track" />;
  };

  // Workflow badge always shows MBA — same queue context as Team Workload Overview
  const WorkflowBadge = () =>
  <span
    className="inline-block px-2 py-0.5 rounded text-xs font-bold"
    style={{ backgroundColor: '#cce5ff', color: '#004085' }}>
    
      MBA
    </span>;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh', border: '1px solid #d1d3e2', fontFamily: 'Nunito Sans, sans-serif' }}>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-3" style={{ backgroundColor: '#2d2d5e' }}>
          <h3 className="text-white font-extrabold text-base">Reassign Tasks</h3>
          <button onClick={resetAndClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col p-5">
          {step === 'select' &&
          <div className="flex flex-col h-full space-y-3">

              {/* Info box */}
              <div className="rounded p-3 flex items-start" style={{ backgroundColor: '#cce5ff', border: '1px solid #b8daff' }}>
                <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: '#004085' }} />
                <div>
                  <p className="text-xs font-bold" style={{ color: '#004085' }}>Reassigning from:</p>
                  <p className="text-sm font-extrabold" style={{ color: '#004085' }}>{sourceUser.username}</p>
                  <p className="text-xs" style={{ color: '#004085' }}>Total Assigned: {sourceUser.taskCount} tasks</p>
                </div>
              </div>

              {/* Warning box */}
              <div className="rounded p-3 flex items-start" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107' }}>
                <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: '#856404' }} />
                <p className="text-xs" style={{ color: '#856404' }}>
                  <strong>Note:</strong> Tasks may belong to different queues (MBA, CSA, QA). Please select specific tasks to reassign.
                </p>
              </div>

              {/* Task table */}
              <div className="flex-1 overflow-auto" style={{ border: '1px solid #e3e6f0', borderRadius: '0.25rem' }}>
                <table className="wfq-table">
                  <thead>
                    <tr>
                      <th style={{ width: '2rem', textAlign: 'center' }}>
                        <input
                        type="checkbox"
                        checked={userTasks.length > 0 && selectedTaskIds.size === userTasks.length}
                        onChange={toggleAll}
                        className="rounded" />
                      
                      </th>
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
                        <td colSpan={8} className="text-center py-6 text-xs" style={{ color: '#858796' }}>No tasks found.</td>
                      </tr> :

                  userTasks.map((task) =>
                  <tr
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    style={{ cursor: 'pointer', backgroundColor: selectedTaskIds.has(task.id) ? '#f3e6f4' : undefined }}>
                    
                          <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                            <input
                        type="checkbox"
                        checked={selectedTaskIds.has(task.id)}
                        onChange={() => toggleTask(task.id)}
                        className="rounded" />
                      
                          </td>
                          <td style={{ textAlign: 'center' }}>{getSlaIcon(task.slaStatus)}</td>
                          <td><WorkflowBadge /></td>
                          <td>{task.requestType}</td>
                          <td><span className="wfq-link">{task.eventId}</span></td>
                          <td className="truncate" style={{ maxWidth: '140px' }} title={task.serviceComponent}>
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

              {/* Footer */}
              <div className="flex items-end justify-between pt-3" style={{ borderTop: '1px solid #e3e6f0' }}>
                <div className="flex-1 mr-4">
                  <label className="block text-xs font-bold mb-1" style={{ color: '#5a5c69' }}>
                    Reassign Selected ({selectedTaskIds.size}) To:
                  </label>
                  <select
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="w-full border rounded px-2 py-1.5 text-xs focus:outline-none"
                  style={{ borderColor: '#d1d3e2' }}>
                  
                    <option value="">- Select Team Member -</option>
                    {mockTeamMembers.
                  filter((m) => m.id !== sourceUser.id && m.status === 'Available').
                  map((m) =>
                  <option key={m.id} value={m.id}>
                          {m.username} (Current: {m.taskCount})
                        </option>
                  )}
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button onClick={resetAndClose} className="btn-secondary">Cancel</button>
                  <button
                  onClick={() => setStep('success')}
                  disabled={!selectedTarget || selectedTaskIds.size === 0}
                  className="btn-primary"
                  style={{ opacity: !selectedTarget || selectedTaskIds.size === 0 ? 0.5 : 1 }}>
                  
                    Confirm Reassignment
                  </button>
                </div>
              </div>
            </div>
          }

          {step === 'success' &&
          <div className="text-center py-12 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#d4edda' }}>
                <CheckCircle2 className="w-10 h-10" style={{ color: '#1cc88a' }} />
              </div>
              <h4 className="text-xl font-extrabold mb-2" style={{ color: '#5a5c69' }}>Reassignment Complete</h4>
              <p className="text-sm mb-6" style={{ color: '#858796' }}>
                <strong>{selectedTaskIds.size} tasks</strong> transferred from <strong>{sourceUser.username}</strong>.
              </p>
              <button onClick={resetAndClose} className="btn-primary" style={{ backgroundColor: '#1cc88a' }}>Close</button>
            </div>
          }
        </div>
      </div>
    </div>);

}