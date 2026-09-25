'use client';

import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { CertificationItem } from '@/features/hospital-admin/doctorProfileTypes';

interface CertificationsCardProps {
  certifications: CertificationItem[];
  onViewAll?: () => void;
}

export const CertificationsCard: React.FC<CertificationsCardProps> = ({
  certifications,
  onViewAll,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Certifications & Licenses
            </h3>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100/80">
                <th className="pb-2 font-medium">Certification / License</th>
                <th className="pb-2 font-medium">Number</th>
                <th className="pb-2 font-medium">Valid Until</th>
                <th className="pb-2 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {certifications.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-2.5 font-semibold text-slate-800 whitespace-nowrap">
                    {c.name}
                  </td>
                  <td className="py-2.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {c.number}
                  </td>
                  <td className="py-2.5 text-slate-600 font-medium whitespace-nowrap">
                    {c.validUntil}
                  </td>
                  <td className="py-2.5 text-right whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      {c.status}
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
