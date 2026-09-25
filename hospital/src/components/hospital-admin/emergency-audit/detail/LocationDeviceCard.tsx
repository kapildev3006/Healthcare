'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { LocationDeviceData } from '@/features/hospital-admin/emergencyAuditDetailTypes';

interface LocationDeviceCardProps {
  locationDevice: LocationDeviceData;
}

export const LocationDeviceCard: React.FC<LocationDeviceCardProps> = ({
  locationDevice,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3.5 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">
            Location & Device Information
          </h3>
        </div>

        {/* 2-column Key-Value Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
          {/* Workstation */}
          <div>
            <span className="text-[11px] text-slate-400 block">Workstation</span>
            <span className="font-bold text-slate-800 font-mono text-[11.5px]">
              {locationDevice.workstation}
            </span>
          </div>

          {/* Device Type */}
          <div>
            <span className="text-[11px] text-slate-400 block">Device Type</span>
            <span className="font-medium text-slate-800 text-[11.5px]">
              {locationDevice.deviceType}
            </span>
          </div>

          {/* Location */}
          <div>
            <span className="text-[11px] text-slate-400 block">Location</span>
            <span className="font-medium text-slate-800 text-[11.5px] truncate block">
              {locationDevice.location}
            </span>
          </div>

          {/* Browser / App */}
          <div>
            <span className="text-[11px] text-slate-400 block">Browser / App</span>
            <span className="font-medium text-slate-800 text-[11.5px]">
              {locationDevice.browserApp}
            </span>
          </div>

          {/* IP Address */}
          <div>
            <span className="text-[11px] text-slate-400 block">IP Address</span>
            <span className="font-mono text-slate-800 text-[11.5px]">
              {locationDevice.ipAddress}
            </span>
          </div>

          {/* OS */}
          <div>
            <span className="text-[11px] text-slate-400 block">OS</span>
            <span className="font-medium text-slate-800 text-[11.5px]">
              {locationDevice.os}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
