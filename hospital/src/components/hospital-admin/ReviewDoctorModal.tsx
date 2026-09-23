'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, ShieldCheck, FileText, User } from 'lucide-react';
import { DoctorVerificationItem } from '../../features/hospital-admin/types';

interface ReviewDoctorModalProps {
  doctor: DoctorVerificationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (doctorId: string) => void;
  onReject: (doctorId: string, reason: string) => void;
}

export const ReviewDoctorModal: React.FC<ReviewDoctorModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1877F2] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Doctor Verification Review
              </h3>
              <p className="text-xs text-slate-500">
                Medical Council License & Hospital Credentialing
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
        <div className="p-6 space-y-4 text-xs md:text-sm">
          <div className="flex items-center gap-3 p-3 bg-blue-50/60 border border-blue-100 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {doctor.doctorName.replace('Dr. ', '').charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                {doctor.doctorName}
              </h4>
              <p className="text-slate-600 font-medium">
                {doctor.specialty} • {doctor.department}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">License ID</span>
              <span className="font-mono font-bold text-slate-800 text-[13px]">
                {doctor.licenseId}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">Submission Date</span>
              <span className="font-bold text-slate-800 text-[13px]">
                {doctor.submittedOn}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">Qualification</span>
              <span className="font-semibold text-slate-800">
                {doctor.qualification || 'MD / MBBS'}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 block font-medium">Clinical Experience</span>
              <span className="font-semibold text-slate-800">
                {doctor.experience || '5+ Years'}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
            <span className="text-slate-400 block font-medium mb-1">
              Contact Information
            </span>
            <p className="text-slate-700">
              <strong>Email:</strong> {doctor.email || 'doctor@citycare.org'}
            </p>
            <p className="text-slate-700">
              <strong>Phone:</strong> {doctor.phone || '+91 98000 00000'}
            </p>
          </div>

          {showRejectInput && (
            <div className="animate-in fade-in">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Rejection / Additional Information Needed:
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="State the missing documents or credential issue..."
                className="w-full p-2.5 border border-red-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-red-100"
                rows={2}
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200/70 font-semibold text-xs cursor-pointer"
          >
            Cancel
          </button>

          {!showRejectInput ? (
            <>
              <button
                type="button"
                onClick={() => setShowRejectInput(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-semibold text-xs cursor-pointer transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
              <button
                type="button"
                onClick={() => onApprove(doctor.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16A34A] hover:bg-green-700 text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Verification</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => onReject(doctor.id, rejectReason)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors"
            >
              Confirm Rejection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
