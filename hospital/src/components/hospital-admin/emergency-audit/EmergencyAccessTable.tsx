'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { EmergencyAccessEvent } from '@/features/hospital-admin/emergencyAuditTypes';

interface EmergencyAccessTableProps {
  events: EmergencyAccessEvent[];
  onExport: () => void;
  onViewAll?: () => void;
  onReviewEvent: (event: EmergencyAccessEvent) => void;
  onViewEvent: (event: EmergencyAccessEvent) => void;
}

export const EmergencyAccessTable: React.FC<EmergencyAccessTableProps> = ({
  events,
  onExport,
  onViewAll,
  onReviewEvent,
  onViewEvent,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Table Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h2 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
              Emergency Access Events
            </h2>
            <span className="text-xs text-slate-400 hidden md:inline">
              Break-glass and emergency access to patient records. These events are logged, monitored and require review.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={onExport}
            className="h-8 px-3 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-[#0066FF] font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold select-none">
              <th className="py-3 px-4 font-medium">User</th>
              <th className="py-3 px-3 font-medium">Patient Record</th>
              <th className="py-3 px-3 font-medium">Emergency Reason</th>
              <th className="py-3 px-3 font-medium">Department</th>
              <th className="py-3 px-3 font-medium">Initiated On</th>
              <th className="py-3 px-3 font-medium">Expiry Time</th>
              <th className="py-3 px-3 text-center font-medium">Audit Status</th>
              <th className="py-3 px-3 text-center font-medium">Severity</th>
              <th className="py-3 px-4 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {events.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-slate-400">
                  No emergency access events recorded.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                  onClick={() =>
                    event.auditStatus === 'Under Review'
                      ? onReviewEvent(event)
                      : onViewEvent(event)
                  }
                >
                  {/* User */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {event.user}
                    </span>
                  </td>

                  {/* Patient Record */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <Link
                      href="/hospital-admin/emergency-access/detail"
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-slate-700 text-[11.5px] hover:text-[#0066FF] hover:underline cursor-pointer"
                    >
                      {event.patientRecord}
                    </Link>
                  </td>

                  {/* Emergency Reason */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`font-semibold ${
                        event.isReasonCritical
                          ? 'text-rose-600'
                          : 'text-slate-700'
                      }`}
                    >
                      {event.emergencyReason}
                    </span>
                  </td>

                  {/* Department */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`font-semibold ${
                        event.isDepartmentCritical
                          ? 'text-rose-600'
                          : 'text-slate-600'
                      }`}
                    >
                      {event.department}
                    </span>
                  </td>

                  {/* Initiated On */}
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                    {event.initiatedOn}
                  </td>

                  {/* Expiry Time */}
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                    {event.expiryTime}
                  </td>

                  {/* Audit Status */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {event.auditStatus === 'Under Review' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                        Under Review
                      </span>
                    ) : event.auditStatus === 'Reviewed' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
                        Reviewed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                        Expired
                      </span>
                    )}
                  </td>

                  {/* Severity */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {event.severity === 'High' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]">
                        High
                      </span>
                    ) : event.severity === 'Medium' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                        Medium
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#0066FF] border border-[#BFDBFE]/60">
                        Low
                      </span>
                    )}
                  </td>

                  {/* Action Button */}
                  <td
                    className="py-3 px-4 text-center whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {event.auditStatus === 'Under Review' ? (
                      <button
                        type="button"
                        onClick={() => onReviewEvent(event)}
                        className="px-3.5 py-1 rounded-lg bg-[#0066FF] hover:bg-blue-600 text-white font-semibold text-xs shadow-xs transition-all active:scale-98 cursor-pointer"
                      >
                        Review
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onViewEvent(event)}
                        className="px-3.5 py-1 rounded-lg border border-blue-200 hover:bg-blue-50 text-[#0066FF] font-semibold text-xs transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    )}
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
