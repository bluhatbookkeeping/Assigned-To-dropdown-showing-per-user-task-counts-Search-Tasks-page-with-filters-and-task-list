import React from 'react';
import { User } from 'lucide-react';
export function Header() {
  return (
    <header style={{ backgroundColor: '#850F89' }} className="text-white px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="flex flex-col leading-tight">
          <span className="font-extrabold text-white text-sm tracking-wide">leidos</span>
          <span className="text-white text-[9px] tracking-widest font-semibold">OTC HEALTH SERVICES</span>
        </div>
        <div className="h-6 w-px bg-purple-300 mx-2" />
        <span className="text-purple-200 text-xs font-semibold tracking-wide">Controlled Unclassified Information</span>
      </div>
      <div className="flex items-center space-x-3 text-xs">
        <span className="text-purple-200">astrauss - Last Login: 04/27/2026 01:47:56 PM</span>
        <div className="bg-white rounded-full p-1">
          <User className="w-4 h-4" style={{ color: '#850F89' }} />
        </div>
        <button className="font-bold text-white px-3 py-1 rounded text-xs" style={{ backgroundColor: '#5a5c69' }}>Log Off</button>
      </div>
    </header>);

}