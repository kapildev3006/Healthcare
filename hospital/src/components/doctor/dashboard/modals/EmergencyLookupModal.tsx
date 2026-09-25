'use client';

import React, { useState } from 'react';
import { X, Siren, AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';

interface EmergencyLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitOverride?: (patientId: string, reason: string) => void;
}

export function EmergencyLookupModal({
  isOpen,
  onClose,
  onSubmitOverride,
}: EmergencyLookupModalProps) {
  const [patientId, setPatientId] = useState('AHC-26-84X71K');
  const [selectedReason, setSelectedReason] = useState('Patient unconscious / life-threatening emergency');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitOverride?.(patientId, selectedReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <Siren className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Emergency Break-Glass Access</h3>
              <p className="text-xs text-red-100 mt-0.5">
                Life-threatening clinical override access
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
          {/* Patient ID Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Patient Health ID or UHID
            </label>
            <input
              type="text"
              required
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="e.g. AHC-26-84X71K or MLK00123"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
          </div>

          {/* Reason Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Emergency Justification Reason
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            >
              <option value="Patient unconscious / life-threatening emergency">
                Patient in critical condition - unconscious
              </option>
              <option value="Severe Trauma / Resuscitation">
                Severe Trauma / Resuscitation
              </option>
              <option value="Acute Cardiac Arrest / Stroke">
                Acute Cardiac Arrest / Stroke Protocol
              </option>
              <option value="Inability to communicate / Dementia">
                Patient incapacitated / unable to give consent
              </option>
            </select>
          </div>

          {/* Clinical notes */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Emergency Clinical Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Brief explanation of clinical urgency..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
          </div>

          {/* Mandatory Warning */}
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Audit Notice:</strong> This break-glass emergency event will be immutably recorded in the Hospital Access Audit Trail and flagged for Compliance Officer review.
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Authorize Break-Glass Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
