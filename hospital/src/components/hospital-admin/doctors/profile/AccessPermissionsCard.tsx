'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { AccessPermissionItem } from '@/features/hospital-admin/doctorProfileTypes';

interface AccessPermissionsCardProps {
  permissions: AccessPermissionItem[];
  onManageAccess?: () => void;
}

export const AccessPermissionsCard: React.FC<AccessPermissionsCardProps> = ({
  permissions,
  onManageAccess,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Access Level & Permissions
            </h3>
          </div>

          <button
            type="button"
            onClick={onManageAccess}
            className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
          >
            Manage Access
          </button>
        </div>

        {/* Permissions List */}
        <div className="space-y-2 text-xs">
          {permissions.map((perm) => (
            <div
              key={perm.id}
              className="flex items-center justify-between py-0.5"
            >
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                {perm.enabled ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className={perm.enabled ? 'text-slate-800' : 'text-slate-500'}>
                  {perm.name}
                </span>
              </div>

              <div>
                {perm.status === 'Full Access' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                    Full Access
                  </span>
                ) : perm.status === 'Enabled' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-semibold bg-emerald-50/60 text-emerald-600">
                    Enabled
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-slate-100 text-slate-500">
                    Not Allowed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
