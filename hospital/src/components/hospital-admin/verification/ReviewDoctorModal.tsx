'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Check,
  Mail,
} from 'lucide-react';
import {
  DoctorVerificationApplication,
  VerificationApplicationStatus,
} from '../../../features/hospital-admin/verificationTypes';

interface ReviewDoctorModalProps {
  doctor: DoctorVerificationApplication | null;
  isOpen: boolean;
  onClose: () => void;
  onDecision: (
    doctorId: string,
    decision: VerificationApplicationStatus,
    note?: string
  ) => void;
}

export const ReviewDoctorModal: React.FC<ReviewDoctorModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onDecision,
}) => {
  const [reviewNote, setReviewNote] = useState('');

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Review Credentials: {doctor.doctorName}
              </h3>
              <p className="text-xs text-slate-400">
                Department: {doctor.department} • License: {doctor.licenseId}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Doctor Bio */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white shadow-xs shrink-0">
              <Image
                src={doctor.avatar}
                alt={doctor.doctorName}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                {doctor.doctorName}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">{doctor.degrees}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                <span>Submitted: {doctor.submittedOn}</span>
                <span>•</span>
                <span>Background Check: {doctor.backgroundCheck}</span>
              </div>
            </div>
          </div>

          {/* Uploaded Documents Review Checklist */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Verified Document Submissions
            </h5>
            <div className="space-y-2">
              {doctor.uploadedDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-white hover:border-blue-200 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#0066FF]" />
                    <span className="font-medium text-slate-800">
                      {doc.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-semibold text-[11px] border border-emerald-200">
                      Verified
                    </span>
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-600"
                    >
                      View Document
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Note / Remarks */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Verification Remarks / Internal Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={reviewNote}
              onChange={(e) => setReviewNote(e.target.value)}
              placeholder="Enter notes about document verification, council confirmation, or additional requirements..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white text-xs font-semibold transition-all"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                onDecision(doctor.id, 'Requested More Info', reviewNote);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Request Info</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onDecision(doctor.id, 'Rejected', reviewNote);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onDecision(doctor.id, 'Approved', reviewNote);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={2.4} />
              <span>Approve Doctor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
