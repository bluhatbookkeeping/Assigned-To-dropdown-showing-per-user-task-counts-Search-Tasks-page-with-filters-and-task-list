import React from 'react';
import { X, AlertTriangle, Calendar, Trash2 } from 'lucide-react';
import { AvailabilityEntry } from '../types';
interface DeleteAvailabilityModalProps {
  isOpen: boolean;
  entry: AvailabilityEntry | null;
  onClose: () => void;
  onConfirm: () => void;
}
export function DeleteAvailabilityModal({
  isOpen,
  entry,
  onClose,
  onConfirm
}: DeleteAvailabilityModalProps) {
  if (!isOpen || !entry) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-[#1a1a40] px-6 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-[#ffd700]" />
            Confirm Deletion
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-gray-700 mb-4">
            Are you sure you want to delete this availability entry? This action
            cannot be undone.
          </p>

          {/* Entry summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-2">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs mr-3">
                {entry.username.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-bold text-gray-900">
                {entry.username}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              {new Date(entry.startDate).toLocaleDateString()} –{' '}
              {new Date(entry.endDate).toLocaleDateString()}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Reason: </span>
              <span className="font-medium text-gray-800">{entry.reason}</span>
            </div>
            {entry.notes &&
            <div className="text-sm text-gray-500 italic">
                "{entry.notes}"
              </div>
            }
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded border border-gray-300">
              
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded flex items-center">
              
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Entry
            </button>
          </div>
        </div>
      </div>
    </div>);

}