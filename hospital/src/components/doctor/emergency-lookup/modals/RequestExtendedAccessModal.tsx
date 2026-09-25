'use client';

import React, { useState } from 'react';
import { X, Clock, ShieldCheck, Send } from 'lucide-react';
import { EmergencyPatientData } from '@/features/doctor/emergencyLookupTypes';

interface RequestExtendedAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: EmergencyPatientData;
  onSubmitExtension?: (hours: number, reason: string) => void;
}

export function RequestExtendedAccessModal({
  isOpen,
  onClose,
  patient,
  onSubmitExtension,
}: RequestExtendedAccessModalProps) {
  const [durationHours, setDurationHours] = useState(24);
  const [justification, setJustification] = useState(
    'Patient stabilized in ICU; continuous monitoring and vitals tracking required for next shift.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitExtension?.(durationHours, justification);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                Request Extended Clinical Access
              </h3>
              <p className="text-xs text-blue-100 font-mono mt-0.5">
                {patient.name} ({patient.uhid})
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
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Requested Extension Duration
            </label>
            <select
              value={durationHours}
              onChange={(e) => setDurationHours(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value={12}>12 Hours (Observation Ward)</option>
              <option value={24}>24 Hours (Post-Emergency ICU Care)</option>
              <option value={48}>48 Hours (Extended Critical Care)</option>
              <option value={72}>72 Hours (Inpatient Stabilization)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Clinical Justification
            </label>
            <textarea
              rows={3}
              required
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 leading-snug">
            Extended clinical access maintains logged read-only record rights until normal patient consent can be established.
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
              <span>Submit Extension Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
