'use client';

import React from 'react';
import { Clock, Search } from 'lucide-react';
import { RecentSearchItem } from '@/features/doctor/patientSearchTypes';

interface RecentSearchesCardProps {
  searches: RecentSearchItem[];
  onSelectSearch: (search: RecentSearchItem) => void;
  onClearAll: () => void;
}

export function RecentSearchesCard({
  searches,
  onSelectSearch,
  onClearAll,
}: RecentSearchesCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-bold text-slate-900">Recent Searches</h3>
        </div>
        <button
          onClick={onClearAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {searches.length > 0 ? (
          searches.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectSearch(item)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {item.query}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono truncate">
                    {item.displayDetail}
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap shrink-0">
                {item.timeAgo}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 py-3 text-center">
            No recent searches.
          </p>
        )}
      </div>
    </div>
  );
}
