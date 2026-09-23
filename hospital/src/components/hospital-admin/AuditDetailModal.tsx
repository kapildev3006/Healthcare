'use client';

import React from 'react';
import { X, ShieldAlert, Clock, User, FileText } from 'lucide-react';
import { AccessAuditItem } from '../../features/hospital-admin/types';

interface AuditDetailModalProps {
  item: AccessAuditItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AuditDetailModal: React.FC<AuditDetailModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                item.accessType === 'Emergency'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-blue-100 text-[#1877F2]'
              }`}
            >
              {item.accessType === 'Emergency' ? (
                <ShieldAlert className="w-4 h-4" />
              ) : (
                <Clock className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Access Audit Record
              </h3>
              <p className="text-xs text-slate-500">
                Tamper-evident Security Log #{item.id}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-3.5 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">
                Accessed By
              </span>
              <span className="font-bold text-slate-800 text-sm">
                {item.user}
              </span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                item.accessType === 'Emergency'
                  ? 'bg-[#FEECEC] text-[#E53E3E]'
                  : 'bg-[#E8F1FD] text-[#1E70E8]'
              }`}
            >
              {item.accessType}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-400 block text-[11px] font-medium">
              Target Patient Record
            </span>
            <span className="font-mono font-semibold text-slate-800">
              {item.accessedRecord}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-400 block text-[11px] font-medium">
              Timestamp & Verification
            </span>
            <span className="text-slate-700 font-medium">{item.timestamp}</span>
            <p className="text-[11px] text-slate-400 pt-1">
              Cryptographically verified access token • Hospital LAN Gateway
            </p>
          </div>

          {item.accessType === 'Emergency' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs">
              <span className="font-bold block mb-0.5">
                Break-Glass Protocol Invoked
              </span>
              Patient unable to grant real-time consent. Attending physician
              break-glass justified under Emergency Trauma protocol.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 font-semibold text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
