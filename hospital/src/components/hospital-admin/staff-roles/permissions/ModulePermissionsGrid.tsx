'use client';

import React from 'react';
import {
  Settings,
  User,
  Building2,
  Users,
  Building,
  FileText,
  AlertTriangle,
  Bell,
  BarChart3,
  Info,
  ChevronDown,
} from 'lucide-react';
import { ModulePermissionGroup } from '@/features/hospital-admin/rolePermissionsTypes';

interface ModulePermissionsGridProps {
  modules: ModulePermissionGroup[];
  onTogglePermission: (moduleId: string, permId: string) => void;
  onOpenApplyTemplate: () => void;
}

export const ModulePermissionsGrid: React.FC<ModulePermissionsGridProps> = ({
  modules,
  onTogglePermission,
  onOpenApplyTemplate,
}) => {
  const getModuleIcon = (iconType: string) => {
    switch (iconType) {
      case 'doctor':
        return <User className="w-4 h-4 text-blue-600" />;
      case 'department':
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'staff':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'hospital':
        return <Building className="w-4 h-4 text-blue-600" />;
      case 'audit':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'emergency':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'security':
        return <Settings className="w-4 h-4 text-blue-600" />;
      case 'notifications':
        return <Bell className="w-4 h-4 text-blue-600" />;
      case 'reports':
      default:
        return <BarChart3 className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-5">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 tracking-tight">
              Module Permissions
            </h3>
            <p className="text-xs text-slate-400">
              Configure what this role can access and perform across different modules.
            </p>
          </div>
        </div>

        {/* Apply Template Button */}
        <button
          type="button"
          onClick={onOpenApplyTemplate}
          className="h-8 px-3 rounded-xl border border-blue-200 bg-white hover:bg-blue-50/60 text-[#0066FF] font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Apply Template</span>
          <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      {/* Grid of 9 Modules + 1 Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-blue-200 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Module Header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                {getModuleIcon(mod.iconType)}
                <h4 className="font-bold text-xs text-slate-800 tracking-tight truncate">
                  {mod.moduleName}
                </h4>
              </div>

              {/* Permissions List */}
              <div className="space-y-2">
                {mod.permissions.map((perm) => (
                  <div
                    key={perm.id}
                    className="flex items-center justify-between text-xs py-0.5"
                  >
                    <span className="text-slate-600 font-medium text-[11.5px] truncate pr-2">
                      {perm.label}
                    </span>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={perm.enabled}
                      onClick={() => onTogglePermission(mod.id, perm.id)}
                      className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        perm.enabled ? 'bg-[#0066FF]' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          perm.enabled ? 'translate-x-3' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* 10. Permission Levels Information Box */}
        <div className="p-4 rounded-xl border border-blue-100 bg-[#F4F9FF] flex items-start gap-3 md:col-span-2 lg:col-span-3">
          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-slate-800">
              Permission Levels
            </h5>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Different modules may have different permission options based on functionality. Enable only the permissions that are required for this role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
