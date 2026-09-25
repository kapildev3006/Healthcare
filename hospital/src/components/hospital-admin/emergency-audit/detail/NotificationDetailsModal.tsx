'use client';

import React, { useState } from 'react';
import {
  X,
  Mail,
  CheckCircle2,
  Clock,
  Smartphone,
  RotateCw,
  ShieldCheck,
} from 'lucide-react';

interface NotificationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResend: () => void;
}

export const NotificationDetailsModal: React.FC<NotificationDetailsModalProps> = ({
  isOpen,
  onClose,
  onResend,
}) => {
  const [isResending, setIsResending] = useState(false);

  if (!isOpen) return null;

  const handleResendClick = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      onResend();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-blue-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Patient Notification Transmission Details
              </h3>
              <p className="text-[11px] text-slate-500">
                Event EA-20250612-77123 • Patient Record #77123
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
        <div className="p-5 space-y-4 text-xs">
          {/* Status Banner */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="font-bold text-emerald-900 text-xs block">
                  Delivered & Confirmed
                </span>
                <span className="text-[11px] text-emerald-700">
                  Transmitted via Patient Mobile App & SMS Gateway
                </span>
              </div>
            </div>
            <span className="font-mono text-[11px] text-emerald-800 bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
              Jun 12, 2025 08:30 AM
            </span>
          </div>

          {/* Details Table */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Recipient:</span>
              <span className="font-bold text-slate-800">John Matthews (Patient)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Mobile Number:</span>
              <span className="font-mono text-slate-800">+91 98765-XXXXX</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Email Address:</span>
              <span className="text-slate-800">j.matthews@example.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Accessing Doctor:</span>
              <span className="font-medium text-slate-800">Dr. Vikram Singh</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Emergency Reason:</span>
              <span className="text-rose-600 font-medium">Life-threatening emergency</span>
            </div>
          </div>

          {/* Notification Message Text */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
              Dispatched Message Content
            </label>
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-[11.5px] leading-relaxed">
              &ldquo;CityCare Hospital Alert: Your medical record was accessed under emergency break-glass protocol on Jun 12, 2025 at 02:18 AM by Dr. Vikram Singh (Emergency Department) due to acute clinical urgency. If you have questions, view details in your patient app or contact our Privacy Office at privacy@citycare.com.&rdquo;
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Complies with ABDM Health Data Management Policy Sec 4.2.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            disabled={isResending}
            onClick={handleResendClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
            <span>{isResending ? 'Resending...' : 'Resend Notification'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
