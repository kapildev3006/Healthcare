'use client';

import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  ShieldCheck,
  User,
  Building2,
  Clock,
  Laptop,
  CheckCircle2,
  XCircle,
  FileText,
  Bell,
} from 'lucide-react';
import { EmergencyAccessEvent } from '@/features/hospital-admin/emergencyAuditTypes';

interface ReviewEmergencyModalProps {
  event: EmergencyAccessEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (eventId: string, notes: string) => void;
  onRevoke: (eventId: string, reason: string) => void;
}

export const ReviewEmergencyModal: React.FC<ReviewEmergencyModalProps> = ({
  event,
  isOpen,
  onClose,
  onApprove,
  onRevoke,
}) => {
  const [adminNotes, setAdminNotes] = useState('');

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-rose-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  Break-Glass Audit Review
                </h3>
                <span className="font-mono text-xs text-slate-500">
                  {event.id}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]">
                  {event.severity} Severity
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Initiated on {event.initiatedOn} • Auto-expiry: {event.expiryTime}
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

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Emergency Alert Callout */}
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-900 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[13px] text-rose-800">
                Reason: {event.emergencyReason}
              </span>
              <span className="font-semibold text-rose-700 bg-white/80 px-2 py-0.5 rounded-md border border-rose-200 text-[11px]">
                {event.department} Dept
              </span>
            </div>
            <p className="text-[11.5px] text-rose-700 leading-relaxed pt-1">
              {event.clinicalJustification ||
                'Immediate emergency bypass invoked under hospital break-glass protocol. Scoped EHR read access granted with audit logging.'}
            </p>
          </div>

          {/* Key Event Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-blue-500" />
                Invoking Practitioner
              </p>
              <p className="font-bold text-slate-800">{event.user}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">{event.role || 'Attending Physician'}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5 text-purple-500" />
                Patient Record
              </p>
              <p className="font-bold text-slate-800 font-mono">{event.patientRecord}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                {event.patientName || 'Emergency Admission'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5 mb-1">
                <Laptop className="w-3.5 h-3.5 text-slate-500" />
                Device & Terminal
              </p>
              <p className="font-bold text-slate-800 font-mono text-[11.5px]">
                {event.deviceId || 'ER-RESUS-01'}
              </p>
              <p className="text-slate-500 text-[11px] mt-0.5 font-mono">
                IP: {event.ipAddress || '192.168.3.12'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5 mb-1">
                <Bell className="w-3.5 h-3.5 text-amber-500" />
                Notification Status
              </p>
              <p className="font-bold text-slate-800 text-[11.5px]">
                {event.notificationStatus || 'Pending Notification'}
              </p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                SMS & App Notification
              </p>
            </div>
          </div>

          {/* Admin Review Notes Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Administrator Compliance Findings & Sign-Off Notes
            </label>
            <textarea
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Enter compliance justification remarks, medical supervisor consultation details, or post-incident review confirmation..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:border-[#0066FF] transition-all resize-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onRevoke(event.id, adminNotes)}
            className="h-8 px-3.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Revoke Session Now</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onApprove(event.id, adminNotes)}
              className="h-8 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve Break-Glass Access</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
