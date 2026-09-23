'use client';

import React from 'react';
import {
  FileText,
  Building,
  Briefcase,
  FileCheck,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit2,
} from 'lucide-react';
import { HospitalProfileInfo } from '../../../features/hospital-admin/profileTypes';

interface HospitalInfoCardProps {
  info: HospitalProfileInfo;
  onEdit: () => void;
}

export const HospitalInfoCard: React.FC<HospitalInfoCardProps> = ({
  info,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
            <h3 className="font-bold text-[15px] text-slate-900">
              Hospital Information
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
        <div className="mt-4 space-y-3.5 text-xs sm:text-[13px]">
          {/* Hospital Name */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Building className="w-4 h-4 text-slate-400" />
              <span>Hospital Name</span>
            </span>
            <span className="font-semibold text-slate-900 text-right">
              {info.name}
            </span>
          </div>

          {/* Hospital Type */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span>Hospital Type</span>
            </span>
            <span className="font-semibold text-slate-900 text-right">
              {info.type}
            </span>
          </div>

          {/* Registration No. */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <FileCheck className="w-4 h-4 text-slate-400" />
              <span>Registration No.</span>
            </span>
            <span className="font-mono font-semibold text-slate-900 text-right">
              {info.registrationNo}
            </span>
          </div>

          {/* Established Year */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Established Year</span>
            </span>
            <span className="font-semibold text-slate-900 text-right">
              {info.establishedYear}
            </span>
          </div>

          {/* Address */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
              <span>Address</span>
            </span>
            <span className="font-semibold text-slate-900 text-right leading-tight max-w-[260px]">
              {info.address}
            </span>
          </div>

          {/* Contact Number */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>Contact Number</span>
            </span>
            <span className="font-semibold text-slate-900 text-right">
              {info.contactNumber}
            </span>
          </div>

          {/* Email Address */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>Email Address</span>
            </span>
            <a
              href={`mailto:${info.email}`}
              className="font-semibold text-[#1877F2] hover:underline text-right"
            >
              {info.email}
            </a>
          </div>

          {/* Website */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Globe className="w-4 h-4 text-slate-400" />
              <span>Website</span>
            </span>
            <a
              href={`https://${info.website}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#1877F2] hover:underline text-right"
            >
              {info.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
