'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  Pencil,
  Ban,
  KeyRound,
  FileBadge,
} from 'lucide-react';

interface DoctorProfileHeaderProps {
  doctorName: string;
  onEditProfile: () => void;
  onSuspendAccess: () => void;
  onResetCredentials: () => void;
}

export const DoctorProfileHeader: React.FC<DoctorProfileHeaderProps> = ({
  doctorName,
  onEditProfile,
  onSuspendAccess,
  onResetCredentials,
}) => {
  const router = useRouter();

  return (
    <div className="space-y-3">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Breadcrumb Right-aligned on desktop as in design */}
        <div className="hidden sm:block"></div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 self-end">
          <Link
            href="/hospital-admin/doctors"
            className="hover:text-blue-600 transition-colors"
          >
            Doctor Management
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Doctor Profile</span>
        </div>
      </div>

      {/* Main Title Row & 4 Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Doctor Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View doctor details, credentials, access, and performance information.
          </p>
        </div>

        {/* 4 Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Edit Profile */}
          <button
            type="button"
            onClick={onEditProfile}
            className="h-9 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>

          {/* Suspend Access */}
          <button
            type="button"
            onClick={onSuspendAccess}
            className="h-9 px-3.5 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50/60 font-medium text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Ban className="w-3.5 h-3.5" />
            <span>Suspend Access</span>
          </button>

          {/* Reset Credentials */}
          <button
            type="button"
            onClick={onResetCredentials}
            className="h-9 px-3.5 rounded-xl bg-white border border-blue-200 text-[#0066FF] hover:bg-blue-50/60 font-medium text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Reset Credentials</span>
          </button>

          {/* View Verification */}
          <button
            type="button"
            onClick={() => router.push('/hospital-admin/doctor-verification/review')}
            className="h-9 px-3.5 rounded-xl bg-white border border-blue-200 text-[#0066FF] hover:bg-blue-50/60 font-medium text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <FileBadge className="w-3.5 h-3.5" />
            <span>View Verification</span>
          </button>
        </div>
      </div>
    </div>
  );
};
