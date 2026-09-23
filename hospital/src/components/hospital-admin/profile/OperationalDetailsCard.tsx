'use client';

import React from 'react';
import {
  Clock,
  PhoneCall,
  Phone,
  Bed,
  Activity,
  ShieldAlert,
  Edit2,
} from 'lucide-react';
import { OperationalDetails } from '../../../features/hospital-admin/profileTypes';

interface OperationalDetailsCardProps {
  details: OperationalDetails;
  onEdit: () => void;
}

export const OperationalDetailsCard: React.FC<OperationalDetailsCardProps> = ({
  details,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
            <h3 className="font-bold text-[15px] text-slate-900">
              Hospital Operational Details
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
          {/* Operating Hours */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Operating Hours</span>
            </span>
            <span className="font-semibold text-slate-900 text-right">
              {details.operatingHours}
            </span>
          </div>

          {/* Emergency Contact */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <PhoneCall className="w-4 h-4 text-slate-400" />
              <span>Emergency Contact</span>
            </span>
            <span className="font-semibold text-slate-900 text-right">
              {details.emergencyContact}
            </span>
          </div>

          {/* Helpline Number */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>Helpline Number</span>
            </span>
            <span className="font-semibold text-slate-900 text-right font-mono">
              {details.helplineNumber}
            </span>
          </div>

          {/* Number of Beds */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>Number of Beds</span>
            </span>
            <span className="font-bold text-slate-900 text-right">
              {details.numberOfBeds}
            </span>
          </div>

          {/* ICU Beds */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <Activity className="w-4 h-4 text-slate-400" />
              <span>ICU Beds</span>
            </span>
            <span className="font-bold text-slate-900 text-right">
              {details.icuBeds}
            </span>
          </div>

          {/* Emergency Services */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 font-medium flex items-center gap-2 shrink-0">
              <ShieldAlert className="w-4 h-4 text-slate-400" />
              <span>Emergency Services</span>
            </span>
            <span className="font-semibold text-slate-900 text-right">
              {details.emergencyServices}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
