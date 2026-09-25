'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { DepartmentUpdateItem } from '../../../features/hospital-admin/departmentTypes';

interface RecentDepartmentUpdatesCardProps {
  updates?: DepartmentUpdateItem[];
}

const defaultUpdates: DepartmentUpdateItem[] = [
  {
    id: 'upd-1',
    title: 'Dr. Kavita Rao assigned as Head of Orthopedics',
    timestamp: 'Jun 12, 2025 10:24 AM',
    category: 'Department Head',
    dotColor: 'green',
  },
  {
    id: 'upd-2',
    title: 'Oncology department marked as Inactive',
    timestamp: 'Jun 11, 2025 04:15 PM',
    category: 'Status Change',
    dotColor: 'red',
  },
  {
    id: 'upd-3',
    title: 'New department budget approved for Pediatrics',
    timestamp: 'Jun 10, 2025 11:32 AM',
    category: 'Budget Update',
    dotColor: 'green',
  },
  {
    id: 'upd-4',
    title: '5 new staff positions added in Emergency Medicine',
    timestamp: 'Jun 9, 2025 09:18 AM',
    category: 'Staffing',
    dotColor: 'blue',
  },
];

export const RecentDepartmentUpdatesCard: React.FC<
  RecentDepartmentUpdatesCardProps
> = ({ updates = defaultUpdates }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Recent Department Updates
          </h3>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
        >
          View All →
        </button>
      </div>

      {/* Updates List */}
      <div className="space-y-3.5">
        {updates.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              {/* Colored Dot */}
              <span
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  item.dotColor === 'green'
                    ? 'bg-[#16A34A]'
                    : item.dotColor === 'red'
                    ? 'bg-[#DC2626]'
                    : 'bg-[#0066FF]'
                }`}
              />
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 leading-snug truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {item.timestamp}
                </p>
              </div>
            </div>

            {/* Category Tag */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 whitespace-nowrap ${
                item.category === 'Status Change'
                  ? 'bg-red-50 text-[#DC2626] border border-red-200'
                  : item.category === 'Budget Update'
                  ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                  : 'bg-blue-50 text-[#0066FF] border border-blue-200'
              }`}
            >
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
