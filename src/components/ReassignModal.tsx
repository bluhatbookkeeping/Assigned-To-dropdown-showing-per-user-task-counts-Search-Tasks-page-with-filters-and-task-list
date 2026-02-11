import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { TeamMember } from '../types';
import { mockTeamMembers } from '../data/mockData';
interface ReassignModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceUser: TeamMember | null;
}
export function ReassignModal({
  isOpen,
  onClose,
  sourceUser
}: ReassignModalProps) {
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [reassignCount, setReassignCount] = useState<string>('all');
  const [customCount, setCustomCount] = useState<string>('');
  if (!isOpen || !sourceUser) return null;
  const handleReassign = () => {
    setStep('success');
    // In a real app, we would update the data here
  };
  const resetAndClose = () => {
    setStep('select');
    setSelectedTarget('');
    setReassignCount('all');
    setCustomCount('');
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-[#1a1a40] px-6 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">Reassign Tasks</h3>
          <button
            onClick={resetAndClose}
            className="text-gray-400 hover:text-white">

            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'select' &&
          <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    Reassigning from:
                  </p>
                  <p className="text-lg font-bold text-blue-900">
                    {sourceUser.username}
                  </p>
                  <p className="text-sm text-blue-700">
                    Current Load: {sourceUser.taskCount} tasks
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    How many tasks to reassign?
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                      type="radio"
                      name="count"
                      value="all"
                      checked={reassignCount === 'all'}
                      onChange={(e) => setReassignCount(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500" />

                      <span className="text-sm text-gray-700">
                        All Tasks ({sourceUser.taskCount})
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                      type="radio"
                      name="count"
                      value="custom"
                      checked={reassignCount === 'custom'}
                      onChange={(e) => setReassignCount(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500" />

                      <span className="text-sm text-gray-700">
                        Specific Amount
                      </span>
                    </label>
                  </div>
                  {reassignCount === 'custom' &&
                <input
                  type="number"
                  value={customCount}
                  onChange={(e) => setCustomCount(e.target.value)}
                  placeholder="Enter number of tasks"
                  className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none" />

                }
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Reassign To
                  </label>
                  <select
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none">

                    <option value="">- Select Team Member -</option>
                    {mockTeamMembers.
                  filter(
                    (m) =>
                    m.id !== sourceUser.id && m.status === 'Available'
                  ).
                  map((member) =>
                  <option key={member.id} value={member.id}>
                          {member.username} (Current: {member.taskCount})
                        </option>
                  )}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                onClick={resetAndClose}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded border border-gray-300">

                  Cancel
                </button>
                <button
                onClick={handleReassign}
                disabled={
                !selectedTarget ||
                reassignCount === 'custom' && !customCount
                }
                className="px-4 py-2 text-sm font-bold text-[#ffd700] bg-[#6a5acd] hover:bg-[#5a4abd] rounded disabled:opacity-50 disabled:cursor-not-allowed">

                  Confirm Reassignment
                </button>
              </div>
            </div>
          }

          {step === 'success' &&
          <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Reassignment Complete
              </h4>
              <p className="text-gray-600 mb-8">
                Tasks have been successfully transferred from{' '}
                <span className="font-semibold">{sourceUser.username}</span>.
              </p>
              <button
              onClick={resetAndClose}
              className="px-6 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded shadow-sm">

                Close
              </button>
            </div>
          }
        </div>
      </div>
    </div>);

}