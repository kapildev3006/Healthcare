'use client';

import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { AccessAuditItem } from '../../features/hospital-admin/types';

interface AccessAuditTableProps {
  items: AccessAuditItem[];
  onViewAll?: () => void;
  onSelectAudit?: (item: AccessAuditItem) => void;
}

export const AccessAuditTable: React.FC<AccessAuditTableProps> = ({
  items,
  onViewAll,
  onSelectAudit,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
            <h2 className="font-bold text-[15px] text-slate-900 tracking-tight">
              Recent Access Audit Activity
            </h2>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-1 text-[12.5px] font-semibold text-[#1877F2] hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 pr-3">User</th>
                <th className="py-2.5 px-3">Accessed Record</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 pl-3 text-right">Access Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {items.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => onSelectAudit?.(log)}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                >
                  <td className="py-3 pr-3 font-semibold text-slate-800 whitespace-nowrap">
                    {log.user}
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-medium whitespace-nowrap">
                    {log.accessedRecord}
                  </td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-[11.5px]">
                    {log.timestamp}
                  </td>
                  <td className="py-3 pl-3 text-right whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        log.accessType === 'Emergency'
                          ? 'bg-[#FEECEC] text-[#E53E3E]'
                          : 'bg-[#E8F1FD] text-[#1E70E8]'
                      }`}
                    >
                      {log.accessType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
