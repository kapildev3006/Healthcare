'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  CheckCircle2,
  Calendar,
  Building2,
  User,
  ShieldCheck,
} from 'lucide-react';
import { EmergencyPatientData } from '@/features/doctor/emergencyLookupTypes';

interface PatientEmergencyProfileCardProps {
  patient: EmergencyPatientData;
}

export function PatientEmergencyProfileCard({
  patient,
}: PatientEmergencyProfileCardProps) {
  const [copiedUhid, setCopiedUhid] = useState(false);
  const [copiedHealthId, setCopiedHealthId] = useState(false);

  const copyToClipboard = (text: string, type: 'uhid' | 'healthId') => {
    navigator.clipboard.writeText(text);
    if (type === 'uhid') {
      setCopiedUhid(true);
      setTimeout(() => setCopiedUhid(false), 2000);
    } else {
      setCopiedHealthId(true);
      setTimeout(() => setCopiedHealthId(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Avatar + Details */}
        <div className="flex items-start sm:items-center gap-5">
          {/* Avatar with Salt & Pepper appearance matching reference */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 flex items-center justify-center shrink-0 shadow-2xs">
            <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-100 to-blue-100 flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold text-slate-700">RS</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Patient</span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {patient.name}
            </h2>

            {/* Identifiers */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-mono">
              <div className="flex items-center gap-1.5">
                <span>UHID: <strong className="text-slate-800">{patient.uhid}</strong></span>
                <button
                  onClick={() => copyToClipboard(patient.uhid, 'uhid')}
                  className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
                  title="Copy UHID"
                >
                  {copiedUhid ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Health ID: <strong className="text-slate-800">{patient.healthId}</strong></span>
                <button
                  onClick={() => copyToClipboard(patient.healthId, 'healthId')}
                  className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
                  title="Copy Health ID"
                >
                  {copiedHealthId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Demographics Badges */}
            <div className="flex items-center gap-2 pt-1 text-xs font-semibold">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                {patient.age} years
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                {patient.gender}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-200/80 font-bold">
                {patient.bloodGroup}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Verification Status & Hospital Details */}
        <div className="flex flex-col sm:items-end justify-between gap-3 text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
          {/* Identity Verified Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Identity Verified</span>
          </div>

          <div className="space-y-1.5 text-left sm:text-right text-slate-500">
            <p className="flex items-center sm:justify-end gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Last Updated <strong className="text-slate-700">{patient.lastUpdated}</strong></span>
            </p>
            <p className="flex items-center sm:justify-end gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Primary Hospital <strong className="text-slate-700">{patient.primaryHospital}</strong></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
