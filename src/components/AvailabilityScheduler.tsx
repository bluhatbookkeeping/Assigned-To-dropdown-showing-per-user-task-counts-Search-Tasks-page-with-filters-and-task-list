import React, { useState } from 'react';
import { ArrowLeft, Plus, Calendar, Trash2, Edit2, Search } from 'lucide-react';
import { mockAvailability } from '../data/mockData';
import { AvailabilityEntry } from '../types';
import { AddAvailabilityModal } from './AddAvailabilityModal';
import { DeleteAvailabilityModal } from './DeleteAvailabilityModal';
interface AvailabilitySchedulerProps {
  onBack: () => void;
}
export function AvailabilityScheduler({ onBack }: AvailabilitySchedulerProps) {
  const [entries, setEntries] = useState<AvailabilityEntry[]>(mockAvailability);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<AvailabilityEntry | null>(
    null
  );
  const [deletingEntry, setDeletingEntry] = useState<AvailabilityEntry | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const handleSaveEntry = (data: any) => {
    if (data.id) {
      // Edit mode — update existing entry
      setEntries(
        entries.map((e) =>
        e.id === data.id ?
        {
          ...e,
          ...data
        } :
        e
        )
      );
    } else {
      // Add mode — create new entry
      const entry: AvailabilityEntry = {
        id: Math.random().toString(36).substr(2, 9),
        ...data
      };
      setEntries([...entries, entry]);
    }
  };
  const handleOpenAdd = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };
  const handleOpenEdit = (entry: AvailabilityEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };
  const handleConfirmDelete = () => {
    if (deletingEntry) {
      setEntries(entries.filter((e) => e.id !== deletingEntry.id));
      setDeletingEntry(null);
    }
  };
  const filteredEntries = entries.
  filter((e) => e.username.toLowerCase().includes(searchTerm.toLowerCase())).
  sort(
    (a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'Vacation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Sick Leave':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Training':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const isCurrent = (start: string, end: string) => {
    const now = new Date();
    const s = new Date(start);
    const e = new Date(end);
    return now >= s && now <= e;
  };
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
                Team Availability Scheduler
              </h1>
              <p className="text-sm text-gray-500">
                Manage time-off and availability for the team
              </p>
            </div>
          </div>
          <button
            onClick={handleOpenAdd}
            className="bg-[#6a5acd] hover:bg-[#5a4abd] text-[#ffd700] px-4 py-2 rounded text-sm font-bold flex items-center shadow-sm transition-colors">
            
            <Plus className="w-4 h-4 mr-2" />
            Add Schedule Entry
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none w-64" />
            
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Date Range
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEntries.length === 0 ?
              <tr>
                  <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-gray-500">
                  
                    No availability entries found. Click "Add Schedule Entry" to
                    create one.
                  </td>
                </tr> :

              filteredEntries.map((entry) => {
                const active = isCurrent(entry.startDate, entry.endDate);
                return (
                  <tr
                    key={entry.id}
                    className="hover:bg-gray-50 transition-colors">
                    
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs mr-3">
                            {entry.username.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {entry.username}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(
                          entry.startDate
                        ).toLocaleDateString()} -{' '}
                          {new Date(entry.endDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getReasonColor(entry.reason)}`}>
                        
                          {entry.reason}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {active ?
                      <span className="text-xs font-bold text-orange-600 flex items-center">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                            Currently Out
                          </span> :

                      <span className="text-xs font-medium text-gray-500">
                            Upcoming
                          </span>
                      }
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {entry.notes || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                        onClick={() => handleOpenEdit(entry)}
                        className="text-gray-400 hover:text-blue-600 mr-3"
                        title="Edit entry">
                        
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                        onClick={() => setDeletingEntry(entry)}
                        className="text-gray-400 hover:text-red-600"
                        title="Delete entry">
                        
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>);

              })
              }
            </tbody>
          </table>
        </div>
      </div>

      <AddAvailabilityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEntry}
        editEntry={editingEntry} />
      

      <DeleteAvailabilityModal
        isOpen={!!deletingEntry}
        entry={deletingEntry}
        onClose={() => setDeletingEntry(null)}
        onConfirm={handleConfirmDelete} />
      
    </div>);

}