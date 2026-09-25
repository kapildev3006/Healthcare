'use client';

import React, { useState, useEffect } from 'react';
import { X, Shield, CheckCircle2 } from 'lucide-react';
import {
  StaffMember,
  AccessLevel,
} from '@/features/hospital-admin/staffRolesTypes';

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: StaffMember | null;
  onSave: (staffId: string, updatedRole: string, accessLevel: AccessLevel) => void;
}

export const EditRoleModal: React.FC<EditRoleModalProps> = ({
  isOpen,
  onClose,
  member,
  onSave,
}) => {
  const [role, setRole] = useState(member?.role || '');
  const [accessLevel, setAccessLevel] = useState<AccessLevel>(
    member?.accessLevel || 'Standard'
  );

  useEffect(() => {
    if (member) {
      setRole(member.role);
      setAccessLevel(member.accessLevel);
    }
  }, [member]);

  if (!isOpen || !member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(member.id, role, accessLevel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Modify Staff Role & Access
              </h3>
              <p className="text-xs text-slate-500">
                Update permissions for {member.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Designation / Role Title
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Assigned Access Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Standard', 'Elevated', 'Admin'] as AccessLevel[]).map(
                (level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => setAccessLevel(level)}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
                      accessLevel === level
                        ? 'border-blue-500 bg-blue-50/70 text-[#0066FF] shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{level}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {level === 'Standard'
                        ? 'Standard EHR'
                        : level === 'Elevated'
                        ? 'Senior Lead'
                        : 'Full Admin'}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 space-y-1">
            <p>
              <strong className="text-slate-700">Staff ID:</strong> {member.staffId}
            </p>
            <p>
              <strong className="text-slate-700">Department:</strong>{' '}
              {member.department}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-medium text-white bg-[#0066FF] hover:bg-blue-600 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Update Permissions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
