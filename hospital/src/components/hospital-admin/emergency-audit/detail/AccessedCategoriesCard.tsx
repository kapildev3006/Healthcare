'use client';

import React from 'react';
import {
  FileText,
  User,
  FileSpreadsheet,
  FlaskConical,
  ImageIcon,
  Pill,
  HeartPulse,
  FolderMinus,
  CreditCard,
  CheckCircle2,
  Minus,
} from 'lucide-react';
import { AccessedDataCategory } from '@/features/hospital-admin/emergencyAuditDetailTypes';

interface AccessedCategoriesCardProps {
  categories: AccessedDataCategory[];
}

export const AccessedCategoriesCard: React.FC<AccessedCategoriesCardProps> = ({
  categories,
}) => {
  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'user':
        return <User className="w-4 h-4 text-[#0066FF]" />;
      case 'notes':
        return <FileText className="w-4 h-4 text-[#0066FF]" />;
      case 'lab':
        return <FlaskConical className="w-4 h-4 text-[#0066FF]" />;
      case 'imaging':
        return <ImageIcon className="w-4 h-4 text-[#0066FF]" />;
      case 'medication':
        return <Pill className="w-4 h-4 text-[#0066FF]" />;
      case 'allergies':
        return <HeartPulse className="w-4 h-4 text-[#0066FF]" />;
      case 'care':
        return <FolderMinus className="w-4 h-4 text-slate-400" />;
      case 'billing':
        return <CreditCard className="w-4 h-4 text-slate-400" />;
      default:
        return <FileSpreadsheet className="w-4 h-4 text-[#0066FF]" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">
            Accessed Data Categories
          </h3>
        </div>

        {/* Categories List */}
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between py-1 text-xs gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center shrink-0">
                  {getCategoryIcon(cat.icon)}
                </div>
                <span className="font-medium text-slate-700 truncate text-[12px]">
                  {cat.name}
                </span>
              </div>

              {cat.status === 'Viewed' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                  Viewed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-medium bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] shrink-0">
                  <Minus className="w-2.5 h-2.5 text-slate-400" />
                  Not Accessed
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
