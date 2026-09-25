'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  MoreHorizontal,
  Eye,
  Flag,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { AccessAuditLogRow } from '@/features/hospital-admin/accessAuditTypes';

interface AccessAuditTableProps {
  logs: AccessAuditLogRow[];
  totalRecordsCount?: number;
  onExport: () => void;
  onViewDetails: (log: AccessAuditLogRow) => void;
  onToggleFlag: (logId: string) => void;
}

export const AccessAuditTable: React.FC<AccessAuditTableProps> = ({
  logs,
  totalRecordsCount = 1284,
  onExport,
  onViewDetails,
  onToggleFlag,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Table Header Row */}
      <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
            Access Audit Logs ({totalRecordsCount.toLocaleString()} records)
          </h2>
        </div>

        <button
          type="button"
          onClick={onExport}
          className="h-8 px-3.5 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-[#0066FF] font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold select-none">
              <th className="py-3 px-3.5 text-center font-medium w-10">#</th>
              <th className="py-3 px-3 font-medium">User</th>
              <th className="py-3 px-3 font-medium">Role</th>
              <th className="py-3 px-3 font-medium">Patient Record</th>
              <th className="py-3 px-3 text-center font-medium">Access Type</th>
              <th className="py-3 px-3 font-medium">Reason / Purpose</th>
              <th className="py-3 px-3 font-medium">Timestamp</th>
              <th className="py-3 px-3 font-medium">Duration</th>
              <th className="py-3 px-3 font-medium">Department</th>
              <th className="py-3 px-3 text-center font-medium">Status</th>
              <th className="py-3 px-3.5 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-10 text-center text-slate-400">
                  No access audit logs match the selected filter criteria.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                  onClick={() => onViewDetails(log)}
                >
                  {/* # Index */}
                  <td className="py-3 px-3.5 text-center text-slate-400 font-medium text-[11.5px]">
                    {log.index}
                  </td>

                  {/* User */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {log.user}
                    </span>
                  </td>

                  {/* Role */}
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {log.role}
                  </td>

                  {/* Patient Record */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-mono text-slate-800 text-[11.5px]">
                      {log.patientRecord}
                    </span>
                  </td>

                  {/* Access Type Badge */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {log.accessType === 'Export' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FAF5FF] text-[#9333EA] border border-[#E9D5FF]">
                        Export
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#0066FF] border border-[#BFDBFE]/60">
                        View
                      </span>
                    )}
                  </td>

                  {/* Reason / Purpose */}
                  <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                    {log.reason}
                  </td>

                  {/* Timestamp */}
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                    {log.timestamp}
                  </td>

                  {/* Duration */}
                  <td className="py-3 px-3 text-slate-700 whitespace-nowrap font-medium text-[11.5px]">
                    {log.duration}
                  </td>

                  {/* Department */}
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {log.department}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {log.status === 'Standard' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#0066FF] border border-[#BFDBFE]/60">
                        Standard
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]">
                        Flagged
                      </span>
                    )}
                  </td>

                  {/* Actions Dropdown */}
                  <td
                    className="py-3 px-3.5 text-center whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenuId(
                            activeMenuId === log.id ? null : log.id
                          )
                        }
                        className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                        aria-label="Actions"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>

                      {activeMenuId === log.id && (
                        <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-left text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              onViewDetails(log);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-left cursor-pointer flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-500" />
                            View Event Details
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onToggleFlag(log.id);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-left cursor-pointer flex items-center gap-2"
                          >
                            <Flag
                              className={`w-3.5 h-3.5 ${
                                log.status === 'Flagged'
                                  ? 'text-emerald-500'
                                  : 'text-rose-500'
                              }`}
                            />
                            {log.status === 'Flagged'
                              ? 'Mark as Reviewed'
                              : 'Flag for Inspection'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onExport();
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-left cursor-pointer flex items-center gap-2"
                          >
                            <Share2 className="w-3.5 h-3.5 text-slate-500" />
                            Export Audit Trail
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
