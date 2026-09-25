'use client';

import React from 'react';
import { Building2 } from 'lucide-react';
import { DepartmentAssignmentData } from '@/features/hospital-admin/doctorProfileTypes';

interface DepartmentAssignmentCardProps {
  assignment: DepartmentAssignmentData;
  onEditAssignment?: () => void;
}

export const DepartmentAssignmentCard: React.FC<DepartmentAssignmentCardProps> = ({
  assignment,
  onEditAssignment,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Department Assignment
            </h3>
          </div>

          <button
            type="button"
            onClick={onEditAssignment}
            className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
          >
            Edit
          </button>
        </div>

        {/* Details list */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Primary Department</span>
            <span className="font-semibold text-slate-800">
              {assignment.primaryDepartment}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">
              Secondary Departments
            </span>
            <span className="font-semibold text-slate-800">
              {assignment.secondaryDepartments}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Department Head</span>
            <span className="font-semibold text-slate-800">
              {assignment.departmentHead}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Location</span>
            <span className="font-semibold text-slate-800">
              {assignment.location}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Room / OPD</span>
            <span className="font-semibold text-slate-800">
              {assignment.roomOPD}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
