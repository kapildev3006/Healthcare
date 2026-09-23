'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Edit2 } from 'lucide-react';
import { AccreditationItem } from '../../../features/hospital-admin/profileTypes';

interface AccreditationsCardProps {
  items: AccreditationItem[];
  onEdit: () => void;
}

export const AccreditationsCard: React.FC<AccreditationsCardProps> = ({
  items,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
            <h3 className="font-bold text-[15px] text-slate-900">
              Accreditations & Certifications
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

        {/* 3 Certifications */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 flex items-center gap-3 hover:border-blue-100 transition-colors"
            >
              {/* Emblem Logo */}
              <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-white border border-slate-200/70 p-0.5 flex items-center justify-center">
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs text-slate-900 leading-snug truncate">
                  {item.name}
                </span>
                <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded-sm text-[10px] font-semibold bg-[#DCFCE7] text-[#16A34A] w-fit">
                  {item.status}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {item.validity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
