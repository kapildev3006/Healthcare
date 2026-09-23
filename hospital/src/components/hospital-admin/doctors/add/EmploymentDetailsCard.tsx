'use client';

import React from 'react';
import { Building2, Calendar, ChevronDown } from 'lucide-react';

export interface EmploymentDetailsFormData {
  joiningDate: string;
  employmentType: string;
  consultationFee: string;
  notes: string;
}

interface EmploymentDetailsCardProps {
  formData: EmploymentDetailsFormData;
  onChange: (field: keyof EmploymentDetailsFormData, value: string) => void;
  errors?: Partial<Record<keyof EmploymentDetailsFormData, string>>;
}

const employmentTypes = [
  'Full-Time',
  'Part-Time',
  'Visiting Consultant',
  'On-Call Consultant',
  'Contractual',
];

export const EmploymentDetailsCard: React.FC<EmploymentDetailsCardProps> = ({
  formData,
  onChange,
  errors = {},
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-blue-100 transition-all">
      {/* Card Header */}
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
          <Building2 className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Employment Details
        </h2>
      </div>

      <div className="space-y-4">
        {/* Row 1: Joining Date, Employment Type, Consultation Fee */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Joining Date */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Joining Date <span className="text-red-500 font-semibold">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.joiningDate}
                onChange={(e) => onChange('joiningDate', e.target.value)}
                placeholder="DD/MM/YYYY"
                className={`w-full h-10 pl-3.5 pr-9 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  errors.joiningDate ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'
                }`}
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.joiningDate && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.joiningDate}</p>
            )}
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Employment Type <span className="text-red-500 font-semibold">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.employmentType}
                onChange={(e) => onChange('employmentType', e.target.value)}
                className={`w-full h-10 pl-3.5 pr-9 rounded-xl border text-sm bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  formData.employmentType ? 'text-slate-900' : 'text-slate-400'
                } ${errors.employmentType ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'}`}
              >
                <option value="" disabled>
                  Select employment type
                </option>
                {employmentTypes.map((type) => (
                  <option key={type} value={type} className="text-slate-900">
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.employmentType && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.employmentType}</p>
            )}
          </div>

          {/* Consultation Fee */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Consultation Fee (₹)
            </label>
            <input
              type="text"
              value={formData.consultationFee}
              onChange={(e) => onChange('consultationFee', e.target.value)}
              placeholder="Enter consultation fee"
              className="w-full h-10 px-3.5 rounded-xl border border-slate-200/90 text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Row 2: Additional Notes */}
        <div>
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
            Additional Notes <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Add any additional information about the doctor..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
};
