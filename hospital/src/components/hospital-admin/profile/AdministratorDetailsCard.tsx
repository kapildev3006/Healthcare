'use client';

import React from 'react';
import {
  UserCheck,
  User,
  Briefcase,
  BadgePercent,
  Phone,
  Mail,
  Edit2,
  IdCard,
} from 'lucide-react';
import { AdministratorInfo } from '../../../features/hospital-admin/profileTypes';

interface AdministratorDetailsCardProps {
  admin: AdministratorInfo;
  onEdit: () => void;
}

export const AdministratorDetailsCard: React.FC<AdministratorDetailsCardProps> = ({
  admin,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
            <h3 className="font-bold text-[15px] text-slate-900">
              Administrator Details
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

        {/* Details list */}
        <div className="mt-4 space-y-4 text-xs sm:text-[13px]">
          {/* Name */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <User className="w-4 h-4 text-slate-400" />
              <span>Name</span>
            </span>
            <span className="font-semibold text-slate-900 text-right">
              {admin.name}
            </span>
          </div>

          {/* Designation */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span>Designation</span>
            </span>
            <span className="font-semibold text-slate-900 text-right">
              {admin.designation}
            </span>
          </div>

          {/* Employee ID */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <IdCard className="w-4 h-4 text-slate-400" />
              <span>Employee ID</span>
            </span>
            <span className="font-mono font-semibold text-slate-900 text-right">
              {admin.employeeId}
            </span>
          </div>

          {/* Contact Number */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>Contact Number</span>
            </span>
            <span className="font-semibold text-slate-900 text-right">
              {admin.contactNumber}
            </span>
          </div>

          {/* Email Address */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>Email Address</span>
            </span>
            <a
              href={`mailto:${admin.email}`}
              className="font-semibold text-[#1877F2] hover:underline text-right truncate max-w-[200px]"
            >
              {admin.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
