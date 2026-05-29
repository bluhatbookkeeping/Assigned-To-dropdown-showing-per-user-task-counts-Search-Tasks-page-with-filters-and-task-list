import React, { useEffect, useState } from 'react';
import { X, Calendar, User } from 'lucide-react';
import { AvailabilityEntry } from '../types';
import { mockTeamMembers } from '../data/mockData';
interface AddAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  editEntry?: AvailabilityEntry | null;
}
export function AddAvailabilityModal({
  isOpen,
  onClose,
  onSave,
  editEntry
}: AddAvailabilityModalProps) {
  const isEditMode = !!editEntry;
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('Vacation');
  const [notes, setNotes] = useState('');
  // Sync form state when entering edit mode or opening fresh
  useEffect(() => {
    if (isOpen) {
      if (editEntry) {
        setUserId(editEntry.userId);
        setStartDate(editEntry.startDate);
        setEndDate(editEntry.endDate);
        setReason(editEntry.reason);
        setNotes(editEntry.notes || '');
      } else {
        setUserId('');
        setStartDate('');
        setEndDate('');
        setReason('Vacation');
        setNotes('');
      }
    }
  }, [isOpen, editEntry]);
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockTeamMembers.find((m) => m.id === userId);
    if (!user) return;
    onSave({
      ...(editEntry ?
      {
        id: editEntry.id
      } :
      {}),
      userId,
      username: user.username,
      startDate,
      endDate,
      reason,
      notes
    });
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-[#1a1a40] px-6 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">
            {isEditMode ? 'Edit Availability Entry' : 'Add Availability Entry'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Team Member
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none">
                
                <option value="">- Select Team Member -</option>
                {mockTeamMembers.map((member) =>
                <option key={member.id} value={member.id}>
                    {member.username}
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none" />
                
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none" />
                
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none">
              
              <option>Vacation</option>
              <option>Sick Leave</option>
              <option>Training</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none"
              placeholder="Additional details..." />
            
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded border border-gray-300">
              
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-bold text-[#ffd700] bg-[#6a5acd] hover:bg-[#5a4abd] rounded">
              
              {isEditMode ? 'Save Changes' : 'Save Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>);

}