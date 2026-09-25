'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  ShieldAlert,
  Clock,
  User,
  FileText,
  Lock,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Building2,
} from 'lucide-react';
import { RecentEmergencyAccessItem } from '@/features/doctor/emergencyBreakGlassTypes';

interface BreakGlassDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: RecentEmergencyAccessItem | null;
}

export function BreakGlassDetailModal({
  isOpen,
  onClose,
  item,
}: BreakGlassDetailModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Break-Glass Access Record
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Log ID: {item.id.toUpperCase()}-AUDIT-2026
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Patient Overview Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                {item.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {item.patientName}
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  UHID: {item.patientUhid}
                </p>
              </div>
            </div>
            <div>
              {item.status === 'Completed' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Completed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  Expired
                </span>
              )}
            </div>
          </div>

          {/* Access Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Emergency Reason
              </p>
              <p className="text-xs font-bold text-slate-900">
                {item.reason}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Access Scope
              </p>
              <p className="text-xs font-bold text-blue-700">
                {item.accessScope}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Requested On
              </p>
              <p className="text-xs font-medium text-slate-700">
                {item.requestedOn}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Authorized Duration
              </p>
              <p className="text-xs font-medium text-slate-700">
                {item.duration}
              </p>
            </div>
          </div>

          {/* Clinical Justification & Context */}
          {item.clinicalNotes && (
            <div className="space-y-1.5 bg-amber-50/60 border border-amber-200/70 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>Recorded Clinical Context</span>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                {item.clinicalNotes}
              </p>
            </div>
          )}

          {/* Clinician & Compliance Sign-off */}
          <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-200/60 pb-2">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Authorized By:
              </span>
              <span className="font-semibold text-slate-800">
                {item.accessorName || 'Dr. Kapil Dev'} ({item.accessorRole || 'General Physician'})
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Hospital Node:
              </span>
              <span className="font-medium text-slate-700">CityCare Hospital (Noida)</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Patient Post-Access Notification:</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Sent via Health Portal App
              </span>
            </div>
          </div>

          {/* Legal Compliance Footer Notice */}
          <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl flex items-start gap-2 text-red-700 text-[11px]">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <p>
              This emergency override was logged pursuant to National Digital Health Mission (ABDM) Break-Glass protocols. A copy has been preserved for hospital audit.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <Link
            href="/doctor/emergency-lookup"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
          >
            <span>Open Patient Emergency Dossier</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
