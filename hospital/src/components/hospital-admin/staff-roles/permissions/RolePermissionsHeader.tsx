'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface RolePermissionsHeaderProps {
  roleName: string;
}

export const RolePermissionsHeader: React.FC<RolePermissionsHeaderProps> = ({
  roleName,
}) => {
  const router = useRouter();

  return (
    <div className="space-y-2">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Role Permissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage role access and permissions for system modules and features.
          </p>
        </div>

        {/* Right Navigation & Back Button */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Link
              href="/hospital-admin/staff-roles"
              className="hover:text-blue-600 transition-colors"
            >
              Staff & Roles
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/hospital-admin/staff-roles"
              className="hover:text-blue-600 transition-colors"
            >
              Roles
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700 font-semibold">{roleName}</span>
          </div>

          {/* Back to Roles Button */}
          <button
            type="button"
            onClick={() => router.push('/hospital-admin/staff-roles')}
            className="h-8 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Roles</span>
          </button>
        </div>
      </div>
    </div>
  );
};
