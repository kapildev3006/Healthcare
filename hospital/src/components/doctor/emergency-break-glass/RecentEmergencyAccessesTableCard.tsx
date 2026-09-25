'use client';

import React from 'react';
import { Clock, ArrowRight, CheckCircle2, Ban } from 'lucide-react';
import { RecentEmergencyAccessItem } from '@/features/doctor/emergencyBreakGlassTypes';

interface RecentEmergencyAccessesTableCardProps {
  accesses: RecentEmergencyAccessItem[];
  onViewDetails: (item: RecentEmergencyAccessItem) => void;
  onViewAllLogs?: () => void;
}

const avatarColorMap: Record<string, { bg: string; text: string }> = {
  RK: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  SG: { bg: 'bg-blue-100', text: 'text-blue-700' },
  NT: { bg: 'bg-purple-100', text: 'text-purple-700' },
  AR: { bg: 'bg-pink-100', text: 'text-pink-700' },
  VK: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
};

export function RecentEmergencyAccessesTableCard({
  accesses,
  onViewDetails,
  onViewAllLogs,
}: RecentEmergencyAccessesTableCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              Recent Emergency Accesses
            </h3>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              View your recent break-glass access requests.
            </p>
          </div>
        </div>

        {/* View All Logs Link */}
        <button
          onClick={onViewAllLogs}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <span>View All Logs</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pr-4 font-semibold">Patient</th>
              <th className="pb-3 pr-4 font-semibold">Reason</th>
              <th className="pb-3 pr-4 font-semibold">Access Scope</th>
              <th className="pb-3 pr-4 font-semibold">Requested On</th>
              <th className="pb-3 pr-4 font-semibold">Duration</th>
              <th className="pb-3 pr-4 font-semibold">Status</th>
              <th className="pb-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {accesses.map((item) => {
              const colors = avatarColorMap[item.initials] || {
                bg: 'bg-slate-100',
                text: 'text-slate-700',
              };

              return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Patient Name & UHID */}
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${colors.bg} ${colors.text} font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}
                      >
                        {item.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.patientName}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          UHID: {item.patientUhid}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Reason */}
                  <td className="py-3.5 pr-4 text-slate-700 font-medium">
                    {item.reason}
                  </td>

                  {/* Access Scope */}
                  <td className="py-3.5 pr-4 text-slate-600 font-normal">
                    {item.accessScope}
                  </td>

                  {/* Requested On */}
                  <td className="py-3.5 pr-4 text-slate-600 font-normal">
                    {item.requestedOn}
                  </td>

                  {/* Duration */}
                  <td className="py-3.5 pr-4 text-slate-600 font-normal">
                    {item.duration}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 pr-4">
                    {item.status === 'Completed' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Completed
                      </span>
                    ) : item.status === 'Expired' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        <Ban className="w-3 h-3 text-slate-400" />
                        Expired
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Active
                      </span>
                    )}
                  </td>

                  {/* Action: View Details */}
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onViewDetails(item)}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-lg text-xs font-semibold text-blue-600 hover:text-blue-700 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
