'use client';

import React from 'react';
import { X, Building2, User, Users, Bed, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { DepartmentItem } from '../../../features/hospital-admin/departmentTypes';

interface DepartmentDetailModalProps {
  department: DepartmentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleStatus: (deptId: string) => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  department,
  isOpen,
  onClose,
  onToggleStatus,
}) => {
  if (!isOpen || !department) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" strokeWidth={2.4} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {department.name}
                </h3>
                {department.status === 'Active' ? (
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]">
                    Inactive
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Category: {department.category}
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
        <div className="p-6 space-y-5 text-xs">
          {/* Head & Location Row */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-slate-400 block text-[11px]">
                Department Head
              </span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                {department.head}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Location</span>
              <span className="font-medium text-slate-700 mt-0.5 block flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{department.location || 'Hospital Main Complex'}</span>
              </span>
            </div>
          </div>

          {/* Metrics Snapshot */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border border-slate-100 bg-white text-center">
              <span className="text-[11px] text-slate-400 font-medium block">
                Doctors
              </span>
              <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                {department.doctorsCount}
              </span>
            </div>
            <div className="p-3 rounded-xl border border-slate-100 bg-white text-center">
              <span className="text-[11px] text-slate-400 font-medium block">
                Total Staff
              </span>
              <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                {department.staffCount}
              </span>
            </div>
            <div className="p-3 rounded-xl border border-slate-100 bg-white text-center">
              <span className="text-[11px] text-slate-400 font-medium block">
                Bed Capacity
              </span>
              <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                {department.bedCapacity}
              </span>
            </div>
          </div>

          {/* Description */}
          {department.description && (
            <div>
              <span className="text-slate-400 block text-[11px] mb-1 font-semibold uppercase tracking-wider">
                Overview & Scope
              </span>
              <p className="text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                {department.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onToggleStatus(department.id);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              department.status === 'Active'
                ? 'border-red-200 text-red-600 bg-red-50 hover:bg-red-100'
                : 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            {department.status === 'Active'
              ? 'Mark as Inactive'
              : 'Activate Department'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
