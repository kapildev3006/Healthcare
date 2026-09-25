'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { VerificationActivityLog } from '../../../features/hospital-admin/verificationTypes';

interface RecentVerificationActivityCardProps {
  activities: VerificationActivityLog[];
}

export const RecentVerificationActivityCard: React.FC<
  RecentVerificationActivityCardProps
> = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Recent Verification Activity
            </h3>
          </div>
          <button
            type="button"
            className="text-xs font-semibold text-[#0066FF] hover:underline"
          >
            View All →
          </button>
        </div>

        {/* Activity Table */}
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100">
                <th className="pb-2.5 font-medium">User</th>
                <th className="pb-2.5 font-medium">Doctor Name</th>
                <th className="pb-2.5 font-medium">Action</th>
                <th className="pb-2.5 font-medium text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activities.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 font-medium text-slate-700 whitespace-nowrap">
                    {act.user}
                  </td>
                  <td className="py-2.5 text-slate-600 whitespace-nowrap">
                    {act.doctorName}
                  </td>
                  <td className="py-2.5 whitespace-nowrap">
                    {act.action === 'Approved' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                        Approved
                      </span>
                    ) : act.action === 'Rejected' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]">
                        Rejected
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                        Requested More Info
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-slate-400 text-right whitespace-nowrap text-[11px]">
                    {act.timestamp}
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
