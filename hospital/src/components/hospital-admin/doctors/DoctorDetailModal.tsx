'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  User,
  Building,
  Briefcase,
  IdCard,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  UserX,
} from 'lucide-react';
import { DoctorItem, DoctorStatus } from '../../../features/hospital-admin/doctorTypes';

interface DoctorDetailModalProps {
  doctor: DoctorItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (doctorId: string, newStatus: DoctorStatus) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onStatusChange,
}) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1877F2] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Doctor Profile & Credentials
              </h3>
              <p className="text-xs text-slate-500">
                CityCare Hospital Medical Staff Registry
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs md:text-sm">
          {/* Doctor Header Banner */}
          <div className="flex items-center gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0">
              <Image
                src={doctor.avatar}
                alt={doctor.name}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                {doctor.name}
              </h4>
              <p className="text-slate-600 font-medium text-xs">
                {doctor.qualification}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-semibold text-[#1877F2]">
                  {doctor.specialty}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">
                  {doctor.department}
                </span>
              </div>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">License ID</span>
              <span className="font-mono font-bold text-slate-800 text-[13px]">
                {doctor.licenseId}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">Experience</span>
              <span className="font-bold text-slate-800 text-[13px]">
                {doctor.experience}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">Joining Date</span>
              <span className="font-semibold text-slate-800">
                {doctor.joinDate}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">Current Status</span>
              <span
                className={`inline-block mt-0.5 px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                  doctor.status === 'Active'
                    ? 'bg-[#DCFCE7] text-[#16A34A]'
                    : doctor.status === 'On Leave'
                    ? 'bg-[#FEF3C7] text-[#D97706]'
                    : 'bg-[#FEECEC] text-[#EF4444]'
                }`}
              >
                {doctor.status}
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
            <span className="text-slate-400 block font-medium mb-1">
              Contact Information
            </span>
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{doctor.email || 'doctor@citycarehospital.in'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{doctor.phone || '+91 98000 12345'}</span>
            </div>
          </div>

          {/* Status Change Shortcuts */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              Update Practitioner Status:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  onStatusChange?.(doctor.id, 'Active');
                  onClose();
                }}
                className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-colors cursor-pointer ${
                  doctor.status === 'Active'
                    ? 'bg-[#DCFCE7] border-green-300 text-[#16A34A]'
                    : 'border-slate-200 text-slate-600 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onStatusChange?.(doctor.id, 'On Leave');
                  onClose();
                }}
                className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-colors cursor-pointer ${
                  doctor.status === 'On Leave'
                    ? 'bg-[#FEF3C7] border-amber-300 text-[#D97706]'
                    : 'border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>On Leave</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onStatusChange?.(doctor.id, 'Inactive');
                  onClose();
                }}
                className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-colors cursor-pointer ${
                  doctor.status === 'Inactive'
                    ? 'bg-[#FEECEC] border-red-300 text-[#EF4444]'
                    : 'border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-700'
                }`}
              >
                <UserX className="w-3.5 h-3.5" />
                <span>Inactive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 font-semibold text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
