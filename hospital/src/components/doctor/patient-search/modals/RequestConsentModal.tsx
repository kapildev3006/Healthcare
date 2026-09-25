'use client';

import React, { useState } from 'react';
import { X, KeyRound, ShieldCheck, Send, Calendar } from 'lucide-react';
import { PatientSearchResultItem } from '@/features/doctor/patientSearchTypes';

interface RequestConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientSearchResultItem | null;
  onSubmitRequest?: (patient: PatientSearchResultItem, scope: string, duration: string) => void;
}

export function RequestConsentModal({
  isOpen,
  onClose,
  patient,
  onSubmitRequest,
}: RequestConsentModalProps) {
  const [scope, setScope] = useState('full');
  const [duration, setDuration] = useState('7-days');
  const [reason, setReason] = useState('Scheduled clinical consultation and treatment planning');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patient) {
      onSubmitRequest?.(patient, scope, duration);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Request Patient Consent</h3>
              <p className="text-xs text-blue-100 mt-0.5">
                {patient ? `${patient.name} (${patient.uhid})` : 'Select Patient'}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Target Patient info */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient</span>
              <p className="font-bold text-slate-900">{patient?.name || 'Neha Sharma'}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Health ID</span>
              <p className="font-mono text-slate-700">{patient?.healthId || '91-2345-6789-5678'}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
              <span className="text-blue-600 font-bold">Request Access</span>
            </div>
          </div>

          {/* Scope Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Requested Medical Data Scope
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="scope"
                  value="full"
                  checked={scope === 'full'}
                  onChange={() => setScope('full')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-800">
                  <strong>Full Longitudinal History:</strong> Encounters, medications, imaging, and lab reports.
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="scope"
                  value="diagnostic"
                  checked={scope === 'diagnostic'}
                  onChange={() => setScope('diagnostic')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-800">
                  <strong>Diagnostic Reports Only:</strong> Chest X-Rays, Blood work, and pathology findings.
                </span>
              </label>
            </div>
          </div>

          {/* Duration Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Access Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24-hours">24 Hours (Single Episode)</option>
              <option value="7-days">7 Days (Consultation & Follow-up)</option>
              <option value="30-days">30 Days (Ongoing Treatment Course)</option>
            </select>
          </div>

          {/* Clinical Justification */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Reason for Access
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Consent Notice */}
          <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900 leading-snug">
            A notification will be dispatched to the patient&apos;s mobile app. Once approved, the record will transition to <strong>Authorized</strong> status.
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Request to Patient</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
