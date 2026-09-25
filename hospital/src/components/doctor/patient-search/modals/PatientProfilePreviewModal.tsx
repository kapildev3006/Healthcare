'use client';

import React from 'react';
import {
  X,
  User,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  FileText,
  Clock,
  ExternalLink,
  Stethoscope,
} from 'lucide-react';
import { PatientSearchResultItem } from '@/features/doctor/patientSearchTypes';

interface PatientProfilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientSearchResultItem | null;
  onOpenRecord?: (patient: PatientSearchResultItem) => void;
  onCreateEncounter?: (patient: PatientSearchResultItem) => void;
}

export function PatientProfilePreviewModal({
  isOpen,
  onClose,
  patient,
  onOpenRecord,
  onCreateEncounter,
}: PatientProfilePreviewModalProps) {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{patient.name}</h3>
              <p className="text-xs text-blue-100 font-mono mt-0.5">
                UHID: {patient.uhid} • Health ID: {patient.healthId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Quick Demographics */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Age & Gender
              </span>
              <p className="font-bold text-slate-900 mt-0.5">
                {patient.age} yrs • {patient.gender === 'M' ? 'Male' : 'Female'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Blood Group
              </span>
              <p className="font-bold text-red-600 mt-0.5">
                {patient.bloodGroup || 'B+'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Access Status
              </span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                {patient.accessStatus}
              </span>
            </div>
          </div>

          {/* Clinical Alert & Allergies */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Documented Allergies:</span>
            </div>
            <p className="text-amber-800">
              {patient.allergies?.join(', ') || 'No known allergies reported'}
            </p>
          </div>

          {/* Recent Diagnosis */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              Active Medical Condition / Reason
            </span>
            <p className="font-bold text-slate-800 text-sm">
              {patient.recentCondition || 'Routine consultation and wellness follow-up'}
            </p>
            <p className="text-slate-500 text-[11px] pt-1">
              Last Encounter: {patient.lastVisitDate} ({patient.lastVisitDepartment})
            </p>
          </div>

          {/* Contact */}
          <div className="text-xs text-slate-500 flex items-center justify-between px-1">
            <span>Primary Phone: <strong className="text-slate-800 font-mono">{patient.phone || '+91 98765 43210'}</strong></span>
            <span>Registered Hospital: <strong>CityCare Hospital</strong></span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onCreateEncounter?.(patient);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Create Encounter</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenRecord?.(patient);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Open Full Record</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
