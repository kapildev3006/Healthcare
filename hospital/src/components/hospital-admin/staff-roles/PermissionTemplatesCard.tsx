'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  User,
  Users,
  Settings,
  Crown,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { PermissionTemplate } from '@/features/hospital-admin/staffRolesTypes';

interface PermissionTemplatesCardProps {
  templates: PermissionTemplate[];
  onManageAll?: () => void;
  onSelectTemplate?: (tpl: PermissionTemplate) => void;
}

export const PermissionTemplatesCard: React.FC<PermissionTemplatesCardProps> = ({
  templates,
  onManageAll,
  onSelectTemplate,
}) => {
  const router = useRouter();
  const getIcon = (type: string, color: string) => {
    switch (type) {
      case 'user':
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
        );
      case 'users':
        return (
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
        );
      case 'gear':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Settings className="w-4 h-4" />
          </div>
        );
      case 'crown':
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Crown className="w-4 h-4" />
          </div>
        );
    }
  };

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
              Permission Templates
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onManageAll) onManageAll();
              router.push('/hospital-admin/staff-roles/permissions');
            }}
            className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Manage All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Templates List */}
        <div className="space-y-2.5">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => {
                if (onSelectTemplate) onSelectTemplate(tpl);
                router.push('/hospital-admin/staff-roles/permissions');
              }}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                {getIcon(tpl.iconType, tpl.color)}
                <div className="min-w-0">
                  <p className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition-colors">
                    {tpl.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {tpl.description}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
