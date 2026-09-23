'use client';

import React from 'react';
import { Building2, CheckCircle2, Edit2 } from 'lucide-react';

interface FacilitiesServicesCardProps {
  facilities: string[];
  onEdit: () => void;
}

export const FacilitiesServicesCard: React.FC<FacilitiesServicesCardProps> = ({
  facilities,
  onEdit,
}) => {
  // Split into 2 columns for exact layout matching
  const half = Math.ceil(facilities.length / 2);
  const col1 = facilities.slice(0, half);
  const col2 = facilities.slice(half);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
            <h3 className="font-bold text-[15px] text-slate-900">
              Facilities & Services
            </h3>
          </div>
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#BFDBFE] text-[#1877F2] hover:bg-blue-50 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* 2-Column Facilities Checklist */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-xs sm:text-[13px]">
          <div className="space-y-3">
            {col1.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-[#16A34A] shrink-0"
                  strokeWidth={2.4}
                />
                <span className="font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {col2.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-[#16A34A] shrink-0"
                  strokeWidth={2.4}
                />
                <span className="font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
