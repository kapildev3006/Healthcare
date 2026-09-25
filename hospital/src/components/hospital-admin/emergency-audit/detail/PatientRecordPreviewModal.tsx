'use client';

import React from 'react';
import {
  X,
  FileText,
  User,
  HeartPulse,
  AlertCircle,
  Clock,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

interface PatientRecordPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientRecordPreviewModal: React.FC<PatientRecordPreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  Patient Medical Record Snapshot
                </h3>
                <span className="font-mono text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  #77123
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Audited View • MRN: CC-458921 • Read-Only Scoped Access
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Patient Bio Box */}
          <div className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                JM
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">John Matthews</p>
                <p className="text-slate-500 text-[11px]">
                  42 yrs • Male • Blood Group: <span className="font-semibold text-rose-600">O+</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Emergency Contact
              </span>
              <span className="text-slate-700 text-xs font-medium">
                Sarah Matthews (Spouse)
              </span>
              <span className="text-[11px] text-slate-400 block">+91 98765-XXXXX</span>
            </div>
          </div>

          {/* Critical Clinical Vitals & Flags */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/30 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-700 font-bold text-[11px] uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                Severe Allergies
              </div>
              <p className="text-xs text-rose-950 font-medium">
                Penicillin (Anaphylaxis risk), NSAIDs (Mild rash)
              </p>
            </div>

            <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/30 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-700 font-bold text-[11px] uppercase tracking-wider">
                <HeartPulse className="w-3.5 h-3.5 text-amber-600" />
                Chronic Conditions
              </div>
              <p className="text-xs text-amber-950 font-medium">
                Type 2 Diabetes Mellitus, Mild Hypertension
              </p>
            </div>
          </div>

          {/* Recent Encounters in Break-Glass Session */}
          <div>
            <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-2">
              Recent Clinical Encounters
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-xs">
                    Trauma Surgery & Resuscitation (Emergency Admission)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Dr. Vikram Singh • Emergency Medicine • Jun 12, 2025 02:18 AM
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700">
                  Critical
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-xs">
                    Cardiovascular Health Checkup & ECG
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Dr. Rohan Malhotra • Cardiology • Mar 14, 2025
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                  Routine
                </span>
              </div>
            </div>
          </div>

          {/* Scoped Read Notice */}
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-900 leading-relaxed">
              This read-only snapshot was retrieved from the encrypted longitudinal EHR store as part of compliance audit verification.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close Snapshot
          </button>
        </div>
      </div>
    </div>
  );
};
