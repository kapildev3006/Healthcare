'use client';

import React from 'react';
import { User, GraduationCap, Briefcase, Users } from 'lucide-react';

interface DetailsGridCardsProps {
  onEditSection?: (section: string) => void;
}

export const DetailsGridCards: React.FC<DetailsGridCardsProps> = ({
  onEditSection,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Personal Details */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-blue-100 transition-all">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                <User className="w-4 h-4" strokeWidth={2.4} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Personal Details
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onEditSection?.('personal')}
              className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
            >
              Edit/View
            </button>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Full Name</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Dr. Priya Sharma
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Date of Birth</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Feb 14, 1988 (37 years)
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Gender</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Female
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Nationality</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Indian
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Email Address</span>
              <span className="font-semibold text-slate-800 mt-0.5 block truncate">
                priya.sharma@citycare.com
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Phone Number</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                +91 98765 43210
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Residential Address</span>
              <span className="font-medium text-slate-700 mt-0.5 block leading-relaxed text-[11.5px]">
                A-1203, Green Park Apartments New Delhi, Delhi 110016
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">ID Proof Number</span>
              <span className="font-mono font-medium text-slate-700 mt-0.5 block">
                Aadhaar: 9876 5432 1098
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Professional Credentials */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-blue-100 transition-all">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" strokeWidth={2.4} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Professional Credentials
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onEditSection?.('credentials')}
              className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
            >
              Edit/View
            </button>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Highest Qualification</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                MBBS, MD (Cardiology)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">
                Medical Council Registration
              </span>
              <span className="font-mono font-semibold text-slate-800 mt-0.5 block">
                MED784521
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Registration Authority</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Medical Council of India (MCI)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Registration Valid Until</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Mar 31, 2030
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Specialization</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Cardiology
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Additional Certifications</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Interventional Cardiology (Fellowship)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Employment Information */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-blue-100 transition-all">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" strokeWidth={2.4} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Employment Information
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onEditSection?.('employment')}
              className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
            >
              Edit/View
            </button>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Current Position</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Consultant Cardiologist
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Preferred Department</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Cardiology
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Expected Start Date</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Jul 1, 2025
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Previous Employer</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Apollo Hospitals, New Delhi
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Years of Experience</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                8 years
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Notice Period</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                30 days
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Employment Type</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Full Time
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Department Assignment */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-blue-100 transition-all">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" strokeWidth={2.4} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Department Assignment
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onEditSection?.('assignment')}
              className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Primary Department</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Cardiology
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Access Level</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#0066FF] border border-blue-200 mt-0.5">
                Standard Access
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Reporting To</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Dr. Sameer Khan
              </span>
              <span className="text-slate-400 text-[11px]">Head of Cardiology</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Work Location</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Main Hospital – Block A
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Start Date</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                Jul 1, 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
