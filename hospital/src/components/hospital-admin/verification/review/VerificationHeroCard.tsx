'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Building2, Briefcase, Calendar } from 'lucide-react';

interface VerificationHeroCardProps {
  doctorName?: string;
  avatar?: string;
  specialty?: string;
  licenseId?: string;
  email?: string;
  phone?: string;
  department?: string;
  experience?: string;
  submittedOn?: string;
  status?: string;
}

export const VerificationHeroCard: React.FC<VerificationHeroCardProps> = ({
  doctorName = 'Dr. Priya Sharma',
  avatar = '/doc_priya_sharma.png',
  specialty = 'Cardiology',
  licenseId = 'MED784521',
  email = 'priya.sharma@citycare.com',
  phone = '+91 98765 43210',
  department = 'Cardiology',
  experience = '8 years',
  submittedOn = 'Jun 11, 2025\n10:24 AM',
  status = 'Pending Review',
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Avatar + Title & Specialty */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm bg-slate-100">
            <Image
              src={avatar}
              alt={doctorName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {doctorName}
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                {status}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 mt-1">
              {specialty} <span className="text-slate-300 mx-1.5">|</span>{' '}
              <span className="font-mono">{licenseId}</span>
            </p>
          </div>
        </div>

        {/* Right: 4 Metadata Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          {/* Email / Phone */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {email}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{phone}</p>
            </div>
          </div>

          {/* Department */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-400">Department</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                {department}
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-400">Experience</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                {experience}
              </p>
            </div>
          </div>

          {/* Submitted On */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-400">
                Submitted On
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-snug">
                {submittedOn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
