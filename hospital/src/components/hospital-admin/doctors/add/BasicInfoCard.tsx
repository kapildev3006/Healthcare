'use client';

import React from 'react';
import { UserCheck, Calendar, ChevronDown } from 'lucide-react';

export interface BasicInfoFormData {
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  alternatePhone: string;
}

interface BasicInfoCardProps {
  formData: BasicInfoFormData;
  onChange: (field: keyof BasicInfoFormData, value: string) => void;
  errors?: Partial<Record<keyof BasicInfoFormData, string>>;
}

export const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  formData,
  onChange,
  errors = {},
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-blue-100 transition-all">
      {/* Card Header */}
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
          <UserCheck className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Basic Information
        </h2>
      </div>

      <div className="space-y-4">
        {/* Row 1: Full Name, Gender, Date of Birth */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Full Name <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              placeholder="Enter full name"
              className={`w-full h-10 px-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                errors.fullName ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'
              }`}
            />
            {errors.fullName && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.fullName}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Gender <span className="text-red-500 font-semibold">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.gender}
                onChange={(e) => onChange('gender', e.target.value)}
                className={`w-full h-10 pl-3.5 pr-9 rounded-xl border text-sm bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  formData.gender ? 'text-slate-900' : 'text-slate-400'
                } ${errors.gender ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'}`}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.gender && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.gender}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Date of Birth <span className="text-red-500 font-semibold">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.dob}
                onChange={(e) => onChange('dob', e.target.value)}
                placeholder="DD/MM/YYYY"
                className={`w-full h-10 pl-3.5 pr-9 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  errors.dob ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'
                }`}
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.dob && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.dob}</p>
            )}
          </div>
        </div>

        {/* Row 2: Email Address, Phone Number, Alternate Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Email Address */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Email Address <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="Enter email address"
              className={`w-full h-10 px-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                errors.email ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Phone Number with +91 */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Phone Number <span className="text-red-500 font-semibold">*</span>
            </label>
            <div className="flex rounded-xl overflow-hidden shadow-2xs">
              <span className="inline-flex items-center px-3 border border-r-0 border-slate-200/90 bg-slate-50 text-slate-600 text-xs font-semibold select-none rounded-l-xl">
                +91
              </span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="Enter phone number"
                className={`w-full h-10 px-3.5 rounded-r-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  errors.phone ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.phone}</p>
            )}
          </div>

          {/* Alternate Phone (Optional) */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Alternate Phone <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="flex rounded-xl overflow-hidden shadow-2xs">
              <span className="inline-flex items-center px-3 border border-r-0 border-slate-200/90 bg-slate-50 text-slate-600 text-xs font-semibold select-none rounded-l-xl">
                +91
              </span>
              <input
                type="tel"
                value={formData.alternatePhone}
                onChange={(e) => onChange('alternatePhone', e.target.value)}
                placeholder="Enter alternate number"
                className="w-full h-10 px-3.5 rounded-r-xl border border-slate-200/90 text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
