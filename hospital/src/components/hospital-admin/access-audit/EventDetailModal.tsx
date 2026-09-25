'use client';

import React from 'react';
import {
  X,
  ShieldCheck,
  User,
  Building2,
  Clock,
  Laptop,
  AlertTriangle,
  Download,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { AccessAuditLogRow } from '@/features/hospital-admin/accessAuditTypes';

interface EventDetailModalProps {
  log: AccessAuditLogRow | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFlag: (logId: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  log,
  isOpen,
  onClose,
  onToggleFlag,
}) => {
  if (!isOpen || !log) return null;

  const handleDownloadProof = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(log, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `Audit_Certificate_${log.id}_${Date.now()}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  Event Audit Detail
                </h3>
                <span className="font-mono text-xs text-slate-500">
                  {log.id}
                </span>
                {log.status === 'Standard' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EFF6FF] text-[#0066FF] border border-[#BFDBFE]/60">
                    Standard
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]">
                    Flagged
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Logged at {log.timestamp} • Duration {log.duration}
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
          {/* Flag warning if flagged */}
          {log.status === 'Flagged' && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Anomaly Detection Alert</span>
                <span className="text-[11.5px] mt-0.5 block text-rose-700">
                  {log.flagReason ||
                    'Suspicious EHR record access event flagged by compliance engine.'}
                </span>
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-blue-500" />
                Staff Member
              </p>
              <p className="font-bold text-slate-800">{log.user}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">{log.role}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5 mb-1">
                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                Department
              </p>
              <p className="font-bold text-slate-800">{log.department}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                CityCare Main Facility
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5 text-purple-500" />
                Patient Record
              </p>
              <p className="font-bold text-slate-800 font-mono">
                {log.patientRecord}
              </p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Patient ID: {log.patientId}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                Access Type & Reason
              </p>
              <p className="font-bold text-slate-800">{log.accessType} Access</p>
              <p className="text-slate-500 text-[11px] mt-0.5">{log.reason}</p>
            </div>
          </div>

          {/* Network & Device Forensics */}
          <div className="p-3.5 rounded-xl border border-slate-200/90 bg-white space-y-2">
            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-slate-500" />
              Security & Forensics
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11.5px] text-slate-600">
              <div>
                <span className="text-slate-400">Client IP:</span>{' '}
                <span className="font-mono text-slate-800">
                  {log.ipAddress || '192.168.1.100'}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Workstation:</span>{' '}
                <span className="font-mono text-slate-800">
                  {log.deviceId || 'WS-GENERAL-01'}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[10.5px] text-slate-400 mb-0.5">
                Cryptographic Integrity Hash (SHA-256):
              </p>
              <p className="font-mono text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded-lg break-all border border-slate-200/60">
                {log.hash ||
                  'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDownloadProof}
            className="h-8 px-3 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-[#0066FF] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Audit Proof</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFlag(log.id)}
              className={`h-8 px-3.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                log.status === 'Flagged'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200'
              }`}
            >
              {log.status === 'Flagged' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as Reviewed</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Flag for Audit Review</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
