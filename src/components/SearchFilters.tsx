import React, { Component } from 'react';
import { Search, RotateCcw, Link } from 'lucide-react';
import { mockTeamMembers } from '../data/mockData';
export function SearchFilters() {
  return (
    <div className="bg-gradient-to-br from-[#1a1a40] to-[#4a2c68] p-6 text-white shadow-lg">
      <div className="flex items-center mb-4">
        <Search className="w-5 h-5 mr-2 text-white" />
        <h2 className="text-xl font-semibold">Search Tasks</h2>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        {/* Row 1 */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#ffd700] uppercase tracking-wider">
            Task Status
          </label>
          <select className="w-full h-8 px-2 text-black text-sm bg-white rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500">
            <option>NEW</option>
            <option>IN PROGRESS</option>
            <option>COMPLETED</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#ffd700] uppercase tracking-wider">
            Workflow
          </label>
          <select className="w-full h-8 px-2 text-black text-sm bg-white rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500">
            <option>CSA</option>
            <option>MBA</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#ffd700] uppercase tracking-wider">
            Assigned To
          </label>
          <select className="w-full h-8 px-2 text-black text-sm bg-white rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500">
            <option>- Select Assigned To -</option>
            {mockTeamMembers.map((member) =>
            <option key={member.id} value={member.username}>
                {member.username}
              </option>
            )}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#ffd700] uppercase tracking-wider">
            Request Type
          </label>
          <select className="w-full h-8 px-2 text-black text-sm bg-white rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500">
            <option>- Select Request Type -</option>
            <option>In-Clinic</option>
            <option>Event</option>
          </select>
        </div>

        {/* Row 2 */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#ffd700] uppercase tracking-wider">
            Request Date
          </label>
          <input
            type="text"
            placeholder="- Select Date -"
            className="w-full h-8 px-2 text-black text-sm bg-white rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500" />

        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#ffd700] uppercase tracking-wider">
            Request Status
          </label>
          <select className="w-full h-8 px-2 text-black text-sm bg-white rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500">
            <option>- Select Request Status -</option>
            <option>Partially Scheduled</option>
            <option>Received</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#ffd700] uppercase tracking-wider">
            Service Component
          </label>
          <select className="w-full h-8 px-2 text-black text-sm bg-white rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500">
            <option>- Select Service Component -</option>
            <option>U.S. Air Force Reserve</option>
            <option>U.S. Army Reserve</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-[#ffd700] uppercase tracking-wider">
            Event Date
          </label>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs w-8 text-right">From:</span>
            <input
              type="text"
              placeholder="- Select Date -"
              className="flex-1 h-7 px-2 text-black text-xs bg-white rounded-sm border border-gray-300" />

          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs w-8 text-right">To:</span>
            <input
              type="text"
              placeholder="- Select Date -"
              className="flex-1 h-7 px-2 text-black text-xs bg-white rounded-sm border border-gray-300" />

          </div>
        </div>

        {/* Row 3 */}
        <div className="space-y-1 col-span-2">
          <label className="block text-[10px] font-bold text-[#ffd700] uppercase tracking-wider">
            Event ID/Service Member DOD ID
          </label>
          <input
            type="text"
            placeholder="Enter Event ID/Service Member DOD ID"
            className="w-full h-8 px-2 text-black text-sm bg-white rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500" />

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-8">
        <button className="bg-[#1a1a40] hover:bg-[#2a2a60] text-white px-4 py-1.5 rounded text-sm font-medium flex items-center shadow-md border border-purple-500/30 transition-colors">
          <RotateCcw className="w-3.5 h-3.5 mr-2" />
          Reset
        </button>
        <button className="bg-[#1a1a40] hover:bg-[#2a2a60] text-white px-4 py-1.5 rounded text-sm font-medium flex items-center shadow-md border border-purple-500/30 transition-colors">
          <Link className="w-3.5 h-3.5 mr-2" />
          User View
        </button>
        <button className="bg-[#1a1a40] hover:bg-[#2a2a60] text-white px-4 py-1.5 rounded text-sm font-medium flex items-center shadow-md border border-purple-500/30 transition-colors">
          <Search className="w-3.5 h-3.5 mr-2" />
          Search
        </button>
      </div>
    </div>);

}