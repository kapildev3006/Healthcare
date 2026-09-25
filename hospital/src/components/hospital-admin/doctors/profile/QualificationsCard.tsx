'use client';

import React from 'react';
import { GraduationCap, Plus } from 'lucide-react';
import { QualificationItem } from '@/features/hospital-admin/doctorProfileTypes';

interface QualificationsCardProps {
  qualifications: QualificationItem[];
  onAddQualification: () => void;
}

export const QualificationsCard: React.FC<QualificationsCardProps> = ({
  qualifications,
  onAddQualification,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Qualifications</h3>
          </div>

          <button
            type="button"
            onClick={onAddQualification}
            className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Qualification</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100/80">
                <th className="pb-2 font-medium">Degree</th>
                <th className="pb-2 font-medium">Institution</th>
                <th className="pb-2 font-medium text-right">Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {qualifications.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 font-bold text-slate-800 whitespace-nowrap">
                    {q.degree}
                  </td>
                  <td className="py-2.5 text-slate-600 font-medium whitespace-nowrap pr-2">
                    {q.institution}
                  </td>
                  <td className="py-2.5 text-slate-500 text-right font-medium">
                    {q.year}
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
