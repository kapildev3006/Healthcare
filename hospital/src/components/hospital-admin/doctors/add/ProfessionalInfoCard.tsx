'use client';

import React from 'react';
import { ShieldCheck, ChevronDown } from 'lucide-react';

export interface ProfessionalInfoFormData {
  specialty: string;
  department: string;
  licenseNo: string;
  qualification: string;
  experience: string;
  consultationType: string;
}

interface ProfessionalInfoCardProps {
  formData: ProfessionalInfoFormData;
  onChange: (field: keyof ProfessionalInfoFormData, value: string) => void;
  errors?: Partial<Record<keyof ProfessionalInfoFormData, string>>;
}

const specialties = [
  'Cardiology',
  'Radiology',
  'Neurology',
  'General Medicine',
  'General Surgery',
  'Pediatrics',
  'Orthopedics',
  'Anesthesiology',
  'Dermatology',
  'ENT',
  'Obstetrics & Gynecology',
  'Emergency Medicine',
  'Oncology',
  'Pathology',
];

const departments = [
  'Cardiology',
  'Radiology',
  'Neurology',
  'General Medicine',
  'Surgery',
  'Pediatrics',
  'Orthopedics',
  'Anesthesiology',
  'Dermatology',
  'ENT',
  'Obstetrics & Gynae',
  'Emergency',
];

const consultationTypes = [
  'In-Person Only',
  'Video / Teleconsultation Only',
  'Both In-Person & Teleconsultation',
];

export const ProfessionalInfoCard: React.FC<ProfessionalInfoCardProps> = ({
  formData,
  onChange,
  errors = {},
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-blue-100 transition-all">
      {/* Card Header */}
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
          <ShieldCheck className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Professional Information
        </h2>
      </div>

      <div className="space-y-4">
        {/* Row 1: Specialty, Department, Medical License No. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Specialty */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Specialty <span className="text-red-500 font-semibold">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.specialty}
                onChange={(e) => onChange('specialty', e.target.value)}
                className={`w-full h-10 pl-3.5 pr-9 rounded-xl border text-sm bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  formData.specialty ? 'text-slate-900' : 'text-slate-400'
                } ${errors.specialty ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'}`}
              >
                <option value="" disabled>
                  Select specialty
                </option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec} className="text-slate-900">
                    {spec}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.specialty && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.specialty}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Department <span className="text-red-500 font-semibold">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.department}
                onChange={(e) => onChange('department', e.target.value)}
                className={`w-full h-10 pl-3.5 pr-9 rounded-xl border text-sm bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  formData.department ? 'text-slate-900' : 'text-slate-400'
                } ${errors.department ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'}`}
              >
                <option value="" disabled>
                  Select department
                </option>
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="text-slate-900">
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.department && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.department}</p>
            )}
          </div>

          {/* Medical License No. */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Medical License No. <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              type="text"
              value={formData.licenseNo}
              onChange={(e) => onChange('licenseNo', e.target.value)}
              placeholder="Enter medical license number"
              className={`w-full h-10 px-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                errors.licenseNo ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'
              }`}
            />
            {errors.licenseNo && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.licenseNo}</p>
            )}
          </div>
        </div>

        {/* Row 2: Qualification, Experience, Consultation Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Qualification */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Qualification <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => onChange('qualification', e.target.value)}
              placeholder="e.g. MBBS, MD, DM"
              className={`w-full h-10 px-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                errors.qualification ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'
              }`}
            />
            {errors.qualification && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.qualification}</p>
            )}
          </div>

          {/* Experience (Years) */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Experience (Years) <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => onChange('experience', e.target.value)}
              placeholder="Enter years of experience"
              className={`w-full h-10 px-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                errors.experience ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200/90'
              }`}
            />
            {errors.experience && (
              <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.experience}</p>
            )}
          </div>

          {/* Consultation Type */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              Consultation Type
            </label>
            <div className="relative">
              <select
                value={formData.consultationType}
                onChange={(e) => onChange('consultationType', e.target.value)}
                className={`w-full h-10 pl-3.5 pr-9 rounded-xl border border-slate-200/90 text-sm bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  formData.consultationType ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                <option value="" disabled>
                  Select consultation type
                </option>
                {consultationTypes.map((type) => (
                  <option key={type} value={type} className="text-slate-900">
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
