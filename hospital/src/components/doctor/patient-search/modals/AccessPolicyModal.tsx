'use client';

import React from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, AlertOctagon } from 'lucide-react';

interface AccessPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessPolicyModal({ isOpen, onClose }: AccessPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Patient Record Access Policy</h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                CityCare Hospital & ABDM Privacy Compliance
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
        <div className="p-6 space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-900 space-y-1">
            <strong className="font-bold block text-sm">Principle of Least Privilege</strong>
            <p>
              Healthcare practitioners may only access patient records when actively assigned to provide direct clinical care, triage, or consultation.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-sm">Standard Requirements:</h4>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Patient Consent:</strong> Standard longitudinal records require active patient authorization via digital OTP or mobile push consent.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Break-Glass Auditing:</strong> Emergency override access is logged in the hospital immutable ledger and alerts compliance officers within 5 minutes.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Session Expiry:</strong> All clinical viewing sessions expire automatically after 30 minutes of idle inactivity.</span>
            </div>
          </div>

          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-900">
            <AlertOctagon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p>
              Browsing patient records without active clinical relationship is a punishable HIPAA / DISHA regulatory violation subject to immediate credential suspension.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
