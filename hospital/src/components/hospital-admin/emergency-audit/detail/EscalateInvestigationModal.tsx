'use client';

import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  ShieldAlert,
  Send,
  UserCheck,
} from 'lucide-react';

interface EscalateInvestigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmEscalation: (reason: string, notes: string) => void;
}

export const EscalateInvestigationModal: React.FC<EscalateInvestigationModalProps> = ({
  isOpen,
  onClose,
  onConfirmEscalation,
}) => {
  const [reason, setReason] = useState('Disproportionate record view duration');
  const [targetCommittee, setTargetCommittee] = useState('Clinical Governance & Privacy Board');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmEscalation(reason, notes);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-rose-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Escalate for Formal Investigation
              </h3>
              <p className="text-[11px] text-slate-500">
                Flag event EA-20250612-77123 for clinical compliance inquiry
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5">
              Escalation Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-rose-500"
            >
              <option value="Disproportionate record view duration">
                Disproportionate record view duration (28 mins)
              </option>
              <option value="Missing detailed post-hoc clinical summary">
                Missing detailed post-hoc clinical summary
              </option>
              <option value="Sensitive categories viewed without clear urgency">
                Sensitive categories viewed without clear urgency
              </option>
              <option value="Potential credential sharing flag">
                Potential credential sharing flag
              </option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5">
              Assign Review Committee
            </label>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <input
                type="text"
                value={targetCommittee}
                onChange={(e) => setTargetCommittee(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5">
              Investigator Guidance & Instructions
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide specific directions or flags for the compliance review board..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          {/* Warning box */}
          <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-rose-900 leading-relaxed">
              Escalating freezes the reviewer checklist, notifies the Chief Medical Officer, and logs a high-priority security audit milestone.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#EF4444] hover:bg-red-600 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Escalating...' : 'Confirm Escalation'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
