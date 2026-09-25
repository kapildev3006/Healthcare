'use client';

import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';
import {
  StaffMember,
  AccessLevel,
} from '@/features/hospital-admin/staffRolesTypes';

interface InviteStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (newStaff: Omit<StaffMember, 'id' | 'avatar' | 'lastActive'>) => void;
}

export const InviteStaffModal: React.FC<InviteStaffModalProps> = ({
  isOpen,
  onClose,
  onInvite,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Cardiology');
  const [role, setRole] = useState('Consultant Doctor');
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('Standard');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const staffId = `STAFF0${Math.floor(100 + Math.random() * 900)}`;

    onInvite({
      name,
      email,
      phone,
      department,
      role,
      accessLevel,
      staffId,
      status: 'Active',
      joinDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Invite New Staff Member
              </h3>
              <p className="text-xs text-slate-500">
                Grant hospital system access and assign role permissions
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
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Rajesh Verma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. rajesh.verma@citycare.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98111 22334"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Emergency">Emergency</option>
                <option value="Neurology">Neurology</option>
                <option value="Radiology">Radiology</option>
                <option value="Administration">Administration</option>
                <option value="IT & Systems">IT & Systems</option>
                <option value="Health Information">Health Information</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Role Title
              </label>
              <input
                type="text"
                placeholder="e.g. Consultant Doctor, Staff Nurse"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Access Level & Permissions
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['Standard', 'Elevated', 'Admin'] as AccessLevel[]).map(
                (level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => setAccessLevel(level)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
                      accessLevel === level
                        ? 'border-blue-500 bg-blue-50/70 text-[#0066FF] shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{level}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {level === 'Standard'
                        ? 'Basic Clinical'
                        : level === 'Elevated'
                        ? 'Senior Staff'
                        : 'Full Admin'}
                    </span>
                  </button>
                )
              )}
            </div>
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
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
