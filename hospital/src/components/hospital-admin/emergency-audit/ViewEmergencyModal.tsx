'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  ShieldAlert,
  User,
  Building2,
  Clock,
  Laptop,
  CheckCircle2,
  FileText,
  Bell,
  Printer,
  Download,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { EmergencyAccessEvent } from '@/features/hospital-admin/emergencyAuditTypes';

interface ViewEmergencyModalProps {
  event: EmergencyAccessEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReview?: (event: EmergencyAccessEvent) => void;
}

export const ViewEmergencyModal: React.FC<ViewEmergencyModalProps> = ({
  event,
  isOpen,
  onClose,
  onOpenReview,
}) => {
  if (!isOpen || !event) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Under Review':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
            Under Review
          </span>
        );
      case 'Reviewed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
            Reviewed
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
            Expired
          </span>
        );
      default:
        return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return (
          <span className="text-[12px] font-semibold text-[#EF4444]">High</span>
        );
      case 'Medium':
        return (
          <span className="text-[12px] font-semibold text-[#F59E0B]">Medium</span>
        );
      case 'Low':
        return (
          <span className="text-[12px] font-semibold text-[#3B82F6]">Low</span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  Emergency Access Event Details
                </h3>
                <span className="font-mono text-xs text-slate-500 bg-slate-200/60 px-1.5 py-0.5 rounded">
                  {event.id}
                </span>
              </div>
              <p className="text-[12px] text-slate-500 mt-0.5">
                Full cryptographic immutable audit log entry
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
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-600">
          {/* Status & Severity banner */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Audit Status
                </span>
                <div className="mt-0.5">{getStatusBadge(event.auditStatus)}</div>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Risk Severity
                </span>
                <div className="mt-0.5">{getSeverityBadge(event.severity)}</div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Patient Notification
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {event.notificationStatus || 'Notified'}
              </span>
            </div>
          </div>

          {/* Accessing Personnel & Patient Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                <User className="w-3.5 h-3.5 text-blue-500" />
                Accessing Personnel
              </div>
              <p className="font-bold text-slate-900 text-sm">{event.user}</p>
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{event.department} Department</span>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                <FileText className="w-3.5 h-3.5 text-emerald-500" />
                Target Patient Record
              </div>
              <p className="font-bold text-slate-900 text-sm">{event.patientRecord}</p>
              <p className="text-slate-500 text-[11px]">
                ID: {event.patientId} {event.patientName ? `• ${event.patientName}` : ''}
              </p>
            </div>
          </div>

          {/* Emergency Reason & Justification */}
          <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                Emergency Reason
              </span>
              <span className="text-[11px] font-semibold text-rose-600 bg-white px-2 py-0.5 rounded border border-rose-200">
                {event.emergencyReason}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-700 block mb-1">
                Clinical Justification:
              </span>
              <p className="text-slate-700 bg-white/90 p-2.5 rounded-lg border border-rose-100 text-[11px] leading-relaxed">
                {event.clinicalJustification ||
                  'Break-glass protocol triggered due to acute clinical urgency requiring immediate retrieval of patient allergy history, current vitals, and surgical history.'}
              </p>
            </div>
          </div>

          {/* Session Timeline & Infrastructure Details */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Initiated On:</span>
              </div>
              <span className="font-semibold text-slate-800">{event.initiatedOn}</span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Session Auto-Expiry:</span>
              </div>
              <span className="font-semibold text-slate-800">{event.expiryTime}</span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Laptop className="w-3.5 h-3.5 text-purple-500" />
                <span>Terminal / IP:</span>
              </div>
              <span className="font-mono text-slate-700">
                {event.ipAddress || '192.168.1.104'} ({event.deviceId || 'ED-STATION-04'})
              </span>
            </div>
          </div>

          {/* Event Review Notes if available */}
          {event.reviewNotes && (
            <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/40 text-[11px] space-y-1">
              <span className="font-semibold text-blue-900 block">
                Administrator Review Notes:
              </span>
              <p className="text-blue-800">{event.reviewNotes}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.print();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs font-medium cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              Print Log
            </button>
            <button
              type="button"
              onClick={() => {
                const blob = new Blob([JSON.stringify(event, null, 2)], {
                  type: 'application/json',
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `emergency-audit-${event.id}.json`;
                a.click();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs font-medium cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export JSON
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/hospital-admin/emergency-access/detail"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 text-[#0066FF] hover:bg-blue-50 text-xs font-semibold cursor-pointer transition-colors"
            >
              <span>Full Detail Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {event.auditStatus === 'Under Review' && onOpenReview && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenReview(event);
                }}
                className="px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Conduct Review
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
