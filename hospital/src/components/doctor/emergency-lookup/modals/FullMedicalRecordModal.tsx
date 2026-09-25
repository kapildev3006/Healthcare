'use client';

import React from 'react';
import {
  X,
  FileText,
  AlertTriangle,
  HeartPulse,
  Pill,
  Download,
  Calendar,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { EmergencyPatientData } from '@/features/doctor/emergencyLookupTypes';

interface FullMedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: EmergencyPatientData;
}

export function FullMedicalRecordModal({
  isOpen,
  onClose,
  patient,
}: FullMedicalRecordModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg leading-tight">
                  Longitudinal Emergency Health Record
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 uppercase tracking-wider">
                  Break-Glass Scoped
                </span>
              </div>
              <p className="text-xs text-red-100 font-mono mt-0.5">
                {patient.name} • UHID: {patient.uhid} • Health ID: {patient.healthId}
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

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Patient Banner */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Demographics</span>
              <p className="font-bold text-slate-900 text-sm">{patient.age} yrs • {patient.gender} • Blood Group {patient.bloodGroup}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Emergency Override Duration</span>
              <p className="font-bold text-rose-600">Active (Expires in 28 mins)</p>
            </div>
          </div>

          {/* Allergies & Warnings */}
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Critical Allergies</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-rose-800">
              {patient.allergies.map((a) => (
                <div key={a.id} className="p-2 bg-white/80 rounded-lg border border-rose-200">
                  <strong className="block text-slate-900">{a.name}</strong>
                  <span>{a.reaction} ({a.severity})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chronic Conditions & Baseline */}
          <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-900 text-sm">
              <HeartPulse className="w-4 h-4 text-purple-600" />
              <span>Chronic Medical Conditions</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-purple-900">
              {patient.chronicConditions.map((c) => (
                <div key={c.id} className="p-2 bg-white/80 rounded-lg border border-purple-200">
                  <strong className="block text-slate-900">{c.name}</strong>
                  <span className="text-slate-500">{c.sinceYear}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Medications */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
              <Pill className="w-4 h-4 text-emerald-600" />
              <span>Current Regimen & Prescriptions</span>
            </div>
            <div className="space-y-1.5 text-slate-800">
              {patient.currentMedications.map((m) => (
                <div key={m.id} className="flex justify-between p-2 bg-white/80 rounded-lg border border-emerald-100">
                  <strong>{m.name}</strong>
                  <span className="text-slate-500">{m.dosageInstructions}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert('Downloading signed Emergency Clinical Summary PDF...');
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Emergency Briefing</span>
          </button>
        </div>
      </div>
    </div>
  );
}
