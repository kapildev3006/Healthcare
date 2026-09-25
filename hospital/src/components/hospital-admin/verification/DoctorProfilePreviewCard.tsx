'use client';

import React from 'react';
import Image from 'next/image';
import {
  User,
  GraduationCap,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Mail,
  X,
  Check,
} from 'lucide-react';
import { DoctorVerificationApplication } from '../../../features/hospital-admin/verificationTypes';

interface DoctorProfilePreviewCardProps {
  doctor: DoctorVerificationApplication | null;
  onApprove: (doctor: DoctorVerificationApplication) => void;
  onReject: (doctor: DoctorVerificationApplication) => void;
  onRequestInfo: (doctor: DoctorVerificationApplication) => void;
  onClose?: () => void;
}

export const DoctorProfilePreviewCard: React.FC<
  DoctorProfilePreviewCardProps
> = ({ doctor, onApprove, onReject, onRequestInfo, onClose }) => {
  if (!doctor) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <User className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-700">
          No Doctor Selected
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
          Select any application from the table to preview credentials and documents.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#0066FF]" strokeWidth={2.4} />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Doctor Profile Preview
            </h3>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Doctor Bio Row */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm bg-slate-100">
            <Image
              src={doctor.avatar}
              alt={doctor.doctorName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h4 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                {doctor.doctorName}
              </h4>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                Pending Review
              </span>
            </div>
            <p className="text-[12px] font-medium text-slate-600 mt-0.5 truncate">
              {doctor.degrees}
            </p>
            <p className="text-[11.5px] text-slate-500 mt-0.5">
              {doctor.department}
            </p>
            <p className="text-[11.5px] font-mono text-slate-500 mt-0.5">
              License ID: {doctor.licenseId}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Applied on: {doctor.submittedOn}
            </p>
          </div>
        </div>

        {/* Section 1: Qualifications */}
        <div className="mb-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2.5">
            <GraduationCap className="w-4 h-4 text-[#0066FF]" strokeWidth={2.2} />
            <h5 className="text-[13px] font-bold text-slate-900">
              Qualifications
            </h5>
          </div>
          <div className="space-y-2">
            {doctor.qualifications.map((q, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between text-xs gap-2"
              >
                <div className="flex items-start gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1.5 shrink-0" />
                  <span className="text-slate-700 leading-snug">
                    <span className="font-semibold">{q.degree}</span> - {q.institute}
                  </span>
                </div>
                <span className="text-slate-400 font-medium shrink-0">
                  {q.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Uploaded Documents */}
        <div className="mb-5 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0066FF]" strokeWidth={2.2} />
              <h5 className="text-[13px] font-bold text-slate-900">
                Uploaded Documents
              </h5>
            </div>
            <button
              type="button"
              className="text-[11px] font-semibold text-[#0066FF] hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-2">
            {doctor.uploadedDocs.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs py-0.5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span className="text-slate-700 font-medium truncate">
                    {doc.name}
                  </span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[10px] uppercase font-semibold">
                  {doc.format}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: License Information */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0066FF]" strokeWidth={2.2} />
              <h5 className="text-[13px] font-bold text-slate-900">
                License Information
              </h5>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
              Valid
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-0.5">
              <span className="text-slate-500">License ID</span>
              <span className="font-mono font-medium text-slate-800">
                {doctor.licenseDetail.licenseId}
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-slate-500">Issuing Authority</span>
              <span className="font-medium text-slate-800 text-right">
                {doctor.licenseDetail.issuingAuthority}
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-slate-500">Valid From</span>
              <span className="font-medium text-slate-800">
                {doctor.licenseDetail.validFrom}
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-slate-500">Valid Until</span>
              <span className="font-medium text-slate-800">
                {doctor.licenseDetail.validUntil}{' '}
                <span className="text-[#16A34A] font-semibold">
                  ({doctor.licenseDetail.remainingText})
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 Action Buttons */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2">
        {/* Request Info */}
        <button
          type="button"
          onClick={() => onRequestInfo(doctor)}
          className="h-9 px-2 rounded-xl border border-blue-200 text-[#0066FF] hover:bg-blue-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-98"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Request Info</span>
        </button>

        {/* Reject */}
        <button
          type="button"
          onClick={() => onReject(doctor)}
          className="h-9 px-2 rounded-xl border border-red-200 text-[#DC2626] hover:bg-red-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-98"
        >
          <X className="w-3.5 h-3.5" />
          <span>Reject</span>
        </button>

        {/* Approve */}
        <button
          type="button"
          onClick={() => onApprove(doctor)}
          className="h-9 px-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
        >
          <Check className="w-3.5 h-3.5" strokeWidth={2.4} />
          <span>Approve</span>
        </button>
      </div>
    </div>
  );
};
