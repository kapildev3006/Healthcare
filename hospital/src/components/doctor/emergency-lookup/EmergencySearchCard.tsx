'use client';

import React from 'react';
import { Search, IdCard, QrCode, Phone } from 'lucide-react';
import { EmergencyLookupTab } from '@/features/doctor/emergencyLookupTypes';

interface EmergencySearchCardProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLookup: () => void;
  activeTab: EmergencyLookupTab;
  onTabChange: (tab: EmergencyLookupTab) => void;
  onScanQrClick: () => void;
}

export function EmergencySearchCard({
  searchQuery,
  onSearchChange,
  onLookup,
  activeTab,
  onTabChange,
  onScanQrClick,
}: EmergencySearchCardProps) {
  const tabs = [
    { id: 'health-id' as EmergencyLookupTab, label: 'Search by Health ID / UHID' },
    { id: 'qr' as EmergencyLookupTab, label: 'Scan QR Code' },
    { id: 'phone' as EmergencyLookupTab, label: 'Search by Phone' },
  ];

  const handleTabClick = (tabId: EmergencyLookupTab) => {
    if (tabId === 'qr') {
      onScanQrClick();
      return;
    }
    onTabChange(tabId);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
      {/* 3 Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200/80 text-sm font-semibold">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`pb-3 transition-colors relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Input Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onLookup()}
            placeholder="Enter Health ID, UHID, or patient name..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs font-medium"
          />
        </div>

        <button
          onClick={onLookup}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-blue-500/25 transition-all shrink-0 cursor-pointer"
        >
          Lookup
        </button>
      </div>

      {/* Example Hint */}
      <p className="text-xs text-slate-400 font-mono">
        Example: 91-2345-6789-1234 or MLK00123
      </p>
    </div>
  );
}
