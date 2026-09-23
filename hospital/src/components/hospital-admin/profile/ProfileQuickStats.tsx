'use client';

import React from 'react';
import {
  User,
  Users,
  Building2,
  Bed,
  Activity,
  Ambulance,
  ArrowRight,
} from 'lucide-react';
import { ProfileQuickStat } from '../../../features/hospital-admin/profileTypes';

interface ProfileQuickStatsProps {
  stats: ProfileQuickStat[];
  onViewAll?: (statId: string) => void;
}

export const ProfileQuickStats: React.FC<ProfileQuickStatsProps> = ({
  stats,
  onViewAll,
}) => {
  const getIcon = (type: ProfileQuickStat['iconType']) => {
    switch (type) {
      case 'doctor':
        return (
          <div className="w-10 h-10 rounded-full bg-[#FFF4E5] text-[#F59E0B] flex items-center justify-center shrink-0">
            <User className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
      case 'staff':
        return (
          <div className="w-10 h-10 rounded-full bg-[#EAF2FD] text-[#1877F2] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
      case 'department':
        return (
          <div className="w-10 h-10 rounded-full bg-[#EAF2FD] text-[#1877F2] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
      case 'beds':
        return (
          <div className="w-10 h-10 rounded-full bg-[#E6F8F0] text-[#10B981] flex items-center justify-center shrink-0">
            <Bed className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
      case 'icu':
        return (
          <div className="w-10 h-10 rounded-full bg-[#EAF2FD] text-[#1877F2] flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
      case 'emergency':
        return (
          <div className="w-10 h-10 rounded-full bg-[#FEECEC] text-[#EF4444] flex items-center justify-center shrink-0">
            <Ambulance className="w-5 h-5" strokeWidth={2.2} />
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all duration-150"
        >
          {/* Top row: Icon on left, Big number on right */}
          <div className="flex items-center gap-3">
            {getIcon(item.iconType)}
            <span className="text-2xl font-bold text-slate-900 leading-tight">
              {item.value}
            </span>
          </div>

          {/* Bottom row: Label and View All on separate left/right */}
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-[12.5px] font-medium text-slate-500">
              {item.label}
            </span>
            {item.viewAllLink && (
              <button
                type="button"
                onClick={() => onViewAll?.(item.id)}
                className="text-[11.5px] font-semibold text-[#1877F2] hover:underline flex items-center shrink-0 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3 ml-0.5" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
