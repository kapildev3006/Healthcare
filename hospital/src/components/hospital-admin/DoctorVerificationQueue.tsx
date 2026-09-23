'use client';

import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { DoctorVerificationItem } from '../../features/hospital-admin/types';

interface DoctorVerificationQueueProps {
  items: DoctorVerificationItem[];
  onReview: (doctor: DoctorVerificationItem) => void;
  onViewAll?: () => void;
}

export const DoctorVerificationQueue: React.FC<DoctorVerificationQueueProps> = ({
  items,
  onReview,
  onViewAll,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
            <h2 className="font-bold text-[15px] text-slate-900 tracking-tight">
              Doctor Verification Queue
            </h2>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-1 text-[12.5px] font-semibold text-[#1877F2] hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>View All (8)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 pr-3">Doctor Name</th>
                <th className="py-2.5 px-3">Specialty</th>
                <th className="py-2.5 px-3">License ID</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Submitted On</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 pl-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {items.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  <td className="py-3 pr-3 font-semibold text-slate-800 whitespace-nowrap">
                    {doc.doctorName}
                  </td>
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {doc.specialty}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11.5px] text-slate-500 whitespace-nowrap">
                    {doc.licenseId}
                  </td>
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {doc.department}
                  </td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                    {doc.submittedOn}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#D97706]">
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 pl-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onReview(doc)}
                      className="px-3 py-1 rounded-lg bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer active:scale-95"
                    >
                      Review
                    </button>
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
