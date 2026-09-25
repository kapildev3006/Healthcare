'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  Copy,
  Check,
  User,
  Calendar,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { EmergencyDetailOverview } from '@/features/hospital-admin/emergencyAuditDetailTypes';

interface EventOverviewCardProps {
  overview: EmergencyDetailOverview;
}

export const EventOverviewCard: React.FC<EventOverviewCardProps> = ({ overview }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(overview.eventId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
          </div>
          <h2 className="font-bold text-base text-slate-900 tracking-tight">
            Emergency Access Event Overview
          </h2>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Event ID with copy action */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <span className="font-medium">Event ID:</span>
            <span className="font-mono font-semibold text-slate-800">{overview.eventId}</span>
            <button
              type="button"
              onClick={handleCopyId}
              className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 cursor-pointer"
              title="Copy Event ID"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Status Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            {overview.reviewStatus}
          </span>
        </div>
      </div>

      {/* Card Content Grid */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Upper 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* 1. Accessed By */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <User className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                Accessed By
              </span>
              <p className="font-bold text-sm text-slate-900 mt-0.5 truncate">
                {overview.accessedBy.name}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {overview.accessedBy.role}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Staff ID: {overview.accessedBy.staffId}
              </p>
            </div>
          </div>

          {/* 2. Date & Time */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                Date & Time
              </span>
              <p className="font-bold text-sm text-slate-900 mt-0.5">
                {overview.dateTime.date}
              </p>
              <p className="text-xs text-slate-500">
                {overview.dateTime.time}
              </p>
            </div>
          </div>

          {/* 3. Department */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                Department
              </span>
              <p className="font-bold text-sm text-slate-900 mt-0.5 truncate">
                {overview.department.name}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {overview.department.location}
              </p>
            </div>
          </div>

          {/* 4. Patient Record */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                Patient Record
              </span>
              <p className="font-bold text-sm text-slate-900 mt-0.5">
                {overview.patientRecord.recordNumber}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {overview.patientRecord.name}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                MRN: {overview.patientRecord.mrn}
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="h-px bg-slate-100" />

        {/* Lower 3-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-1">
          {/* 1. Emergency Reason */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                Emergency Reason
              </span>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                {overview.emergencyReason.title}
              </p>
              <p className="text-[11.5px] text-slate-500 mt-0.5 leading-relaxed">
                {overview.emergencyReason.description}
              </p>
            </div>
          </div>

          {/* 2. Duration of Access */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                Duration of Access
              </span>
              <p className="font-bold text-sm text-slate-900 mt-0.5">
                {overview.duration.total}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {overview.duration.timeRange}
              </p>
            </div>
          </div>

          {/* 3. Current Review Status */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                Current Review Status
              </span>
              <p className="font-bold text-sm text-emerald-600 mt-0.5">
                {overview.reviewStatus}
              </p>
              <p className="text-[11.5px] text-slate-500 mt-0.5 leading-relaxed">
                Reviewed by {overview.reviewedBy} on {overview.reviewedAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
