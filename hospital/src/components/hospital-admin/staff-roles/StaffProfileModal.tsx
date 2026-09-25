'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  Clock,
  Shield,
  CheckCircle2,
  UserX,
  UserCheck,
} from 'lucide-react';
import { StaffMember } from '@/features/hospital-admin/staffRolesTypes';

interface StaffProfileModalProps {
  member: StaffMember | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleStatus: (staffId: string) => void;
}

export const StaffProfileModal: React.FC<StaffProfileModalProps> = ({
  member,
  isOpen,
  onClose,
  onToggleStatus,
}) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Staff Member Profile
              </h3>
              <p className="text-xs text-slate-500">
                Hospital personnel information and credentials
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Top Hero Section */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-slate-200">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-slate-900">
                  {member.name}
                </h4>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                    member.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-rose-50 text-rose-600 border border-rose-200'
                  }`}
                >
                  {member.status}
                </span>
              </div>
              <p className="text-slate-600 font-medium">{member.role}</p>
              <p className="text-slate-400 text-[11px] font-mono mt-0.5">
                Staff ID: {member.staffId}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-slate-100 bg-white">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                Department
              </span>
              <p className="font-semibold text-slate-800 mt-1">
                {member.department}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-100 bg-white">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-purple-500" />
                Access Level
              </span>
              <p className="font-semibold text-slate-800 mt-1">
                {member.accessLevel}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-100 bg-white">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                Email
              </span>
              <p className="font-semibold text-slate-800 mt-1 truncate">
                {member.email}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-100 bg-white">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                Phone
              </span>
              <p className="font-semibold text-slate-800 mt-1">
                {member.phone || '+91 98000 00000'}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-100 bg-white">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Last Active
              </span>
              <p className="font-semibold text-slate-800 mt-1">
                {member.lastActive}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-100 bg-white">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Joined On
              </span>
              <p className="font-semibold text-slate-800 mt-1">
                {member.joinDate || 'Jan 15, 2023'}
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onToggleStatus(member.id)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                member.status === 'Active'
                  ? 'border-red-200 text-red-600 hover:bg-red-50'
                  : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              {member.status === 'Active' ? (
                <>
                  <UserX className="w-3.5 h-3.5" />
                  Suspend Access
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  Activate User
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
