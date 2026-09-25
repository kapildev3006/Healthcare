'use client';

import React from 'react';
import {
  Filter,
  Bell,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Key,
  Settings,
} from 'lucide-react';

interface QuickFiltersCardProps {
  activeFilter: string | null;
  onSelectFilter: (filter: string | null) => void;
}

export const QuickFiltersCard: React.FC<QuickFiltersCardProps> = ({
  activeFilter,
  onSelectFilter,
}) => {
  const filters = [
    {
      id: 'unread',
      label: 'Unread Only',
      count: 12,
      icon: <Bell className="w-3.5 h-3.5 text-slate-500" />,
    },
    {
      id: 'high-priority',
      label: 'High Priority',
      count: 3,
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />,
    },
    {
      id: 'verification',
      label: 'Verification Updates',
      count: 8,
      icon: <FileText className="w-3.5 h-3.5 text-emerald-600" />,
    },
    {
      id: 'security',
      label: 'Security Events',
      count: 10,
      icon: <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />,
    },
    {
      id: 'access',
      label: 'Access Notifications',
      count: 12,
      icon: <Key className="w-3.5 h-3.5 text-[#0066FF]" />,
    },
    {
      id: 'system',
      label: 'System Updates',
      count: 17,
      icon: <Settings className="w-3.5 h-3.5 text-slate-500" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3.5 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <Filter className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-sm text-slate-900 tracking-tight">
          Quick Filters
        </h3>
      </div>

      {/* Filters List */}
      <div className="space-y-1.5 text-xs">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onSelectFilter(isActive ? null : filter.id)}
              className={`w-full flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-[#0066FF] font-semibold border border-blue-200/60'
                  : 'text-slate-700 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {filter.icon}
                <span className="text-[12px]">{filter.label}</span>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                  isActive
                    ? 'bg-[#0066FF] text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
