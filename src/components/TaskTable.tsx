import React, { Component } from 'react';
import { mockTasks } from '../data/mockData';
import { ExternalLink, Edit2 } from 'lucide-react';
export function TaskTable() {
  return (
    <div className="bg-white border-t border-gray-200">
      {/* Table Controls */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-gray-600 uppercase">
            Display
          </span>
          <select className="h-7 text-xs border border-gray-300 rounded px-1 bg-white">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-gray-600 uppercase">
            Filter:
          </span>
          <input
            type="text"
            className="h-7 border border-gray-300 rounded px-2 text-xs w-48" />

        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Request Type
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Request Date
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Request Status
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Service Component
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Event Date
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Event ID/DOD ID
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                SSN
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Services
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Task Status
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Last Modified
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Assigned To
              </th>
              <th className="p-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap text-center">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-700">
            {mockTasks.map((task, index) =>
            <tr
              key={task.id}
              className={`border-b border-gray-100 hover:bg-blue-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>

                <td className="p-3 whitespace-nowrap">{task.requestType}</td>
                <td className="p-3 whitespace-nowrap">{task.requestDate}</td>
                <td className="p-3 whitespace-nowrap text-gray-500">
                  {task.requestStatus}
                </td>
                <td
                className="p-3 max-w-[200px] truncate"
                title={task.serviceComponent}>

                  {task.serviceComponent}
                </td>
                <td className="p-3 whitespace-nowrap">{task.eventDate}</td>
                <td className="p-3 whitespace-nowrap font-medium text-purple-800 flex items-center">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {task.eventId}
                </td>
                <td className="p-3 whitespace-nowrap font-medium text-purple-800 flex items-center">
                  {task.ssn && <ExternalLink className="w-3 h-3 mr-1" />}
                  {task.ssn}
                </td>
                <td className="p-3 whitespace-nowrap text-purple-800 text-center">
                  {task.services && <Edit2 className="w-3 h-3 mx-auto" />}
                </td>
                <td className="p-3 whitespace-nowrap">{task.taskStatus}</td>
                <td className="p-3 whitespace-nowrap">
                  {task.lastModifiedDate}
                </td>
                <td className="p-3 whitespace-nowrap">{task.assignedTo}</td>
                <td className="p-3 text-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end p-4 border-t border-gray-200 bg-white space-x-1">
        <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
          Previous
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>);

}