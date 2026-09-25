'use client';

import React from 'react';
import { Users, User, Calendar, ShieldCheck } from 'lucide-react';
import { RoleHeroData } from '@/features/hospital-admin/rolePermissionsTypes';

interface RoleHeroCardProps {
  hero: RoleHeroData;
}

export const RoleHeroCard: React.FC<RoleHeroCardProps> = ({ hero }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Role Info (approx 5 cols) */}
        <div className="md:col-span-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {hero.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {hero.description}
            </p>
          </div>
        </div>

        {/* Column 2: Assigned Staff (approx 2 cols) */}
        <div className="md:col-span-2 md:border-l md:border-slate-100 md:pl-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">
              Assigned Staff
            </p>
            <p className="text-lg font-bold text-slate-900 leading-tight">
              {hero.assignedStaffCount}
            </p>
            <p className="text-[11px] text-slate-400">users</p>
          </div>
        </div>

        {/* Column 3: Created On (approx 2 cols) */}
        <div className="md:col-span-2 md:border-l md:border-slate-100 md:pl-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">Created On</p>
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {hero.createdOn}
            </p>
            <p className="text-[10.5px] text-slate-400">By {hero.createdBy}</p>
          </div>
        </div>

        {/* Column 4: Last Updated (approx 2 cols) */}
        <div className="md:col-span-2 md:border-l md:border-slate-100 md:pl-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">Last Updated</p>
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {hero.lastUpdated}
            </p>
            <p className="text-[10.5px] text-slate-400">By {hero.updatedBy}</p>
          </div>
        </div>

        {/* Column 5: Status (approx 1 col) */}
        <div className="md:col-span-1 md:border-l md:border-slate-100 md:pl-5 flex flex-col justify-center">
          <p className="text-[11px] font-medium text-slate-400 mb-1">Status</p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {hero.status}
          </span>
          <p className="text-[10px] text-slate-400 mt-1 whitespace-nowrap">
            Role is currently active
          </p>
        </div>
      </div>
    </div>
  );
};
