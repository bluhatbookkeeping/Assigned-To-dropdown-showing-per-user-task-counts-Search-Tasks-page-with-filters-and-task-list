import React from 'react';
import { User, LogOut } from 'lucide-react';
export function Header() {
  return (
    <header className="bg-[#1a1a40] text-white px-6 py-2 flex justify-between items-center border-b-4 border-purple-800">
      <div className="font-bold text-purple-300 text-sm tracking-wide">
        Controlled Unclassified Information
      </div>

      <div className="flex items-center space-x-4 text-xs">
        <div className="text-gray-300">
          astrauss - Last Login: 02/05/2026 02:03:45 PM
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-400 rounded-full p-1">
            <User className="w-4 h-4 text-white" />
          </div>
          <button className="bg-[#1a1a40] border border-purple-500 hover:bg-purple-900 px-3 py-1 rounded text-white flex items-center space-x-1 transition-colors">
            <span>Log Off</span>
          </button>
        </div>
      </div>
    </header>);

}