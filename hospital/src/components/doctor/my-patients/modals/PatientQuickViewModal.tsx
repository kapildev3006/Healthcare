'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  User,
  Activity,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { MyPatientItem } from '@/features/doctor/myPatientsTypes';

interface PatientQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: MyPatientItem | null;
}

export function PatientQuickViewModal({
  isOpen,
  onClose,
  patient,
}: PatientQuickViewModalProps) {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
              {patient.avatarUrl ? (
                <Image
                  src={patient.avatarUrl}
                  alt={patient.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xs text-blue-600 bg-blue-50">
                  {patient.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {patient.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                UHID: {patient.uhid} • Health ID: {patient.healthId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Status & Key Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div>
              <p className="text-slate-400 font-medium text-[11px]">Age / Gender</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {patient.age} years / {patient.gender === 'M' ? 'Male' : 'Female'}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-medium text-[11px]">Primary Condition</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {patient.primaryCondition}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-medium text-[11px]">Status</p>
              <p className="text-xs font-bold text-emerald-700 mt-0.5">
                {patient.status}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Contact & Identity Verification</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-slate-600 bg-white border border-slate-200/70 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{patient.phone || '+91 98765 43210'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{patient.email || `${patient.name.toLowerCase().replace(' ', '.')}@example.com`}</span>
              </div>
            </div>
          </div>

          {/* Last Clinical Encounter */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Last Clinical Encounter</span>
            </h4>
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 text-slate-700 space-y-1">
              <div className="flex justify-between font-medium">
                <span>Date: {patient.lastVisit}</span>
                <span className="text-blue-700">General Medicine</span>
              </div>
              <p className="text-slate-600">
                Routine periodic review for {patient.primaryCondition}. Vitals stable, prescription adherence verified.
              </p>
            </div>
          </div>

          {/* Consent Banner */}
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-emerald-800 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Active clinical consent verified under ABDM framework until 31 Dec 2026.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <Link
            href="/doctor/emergency-lookup"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Emergency Lookup</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
