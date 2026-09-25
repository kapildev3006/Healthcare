'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Users, Search, Trash2, UserPlus, CheckCircle2 } from 'lucide-react';
import { AssignedRoleUser } from '@/features/hospital-admin/rolePermissionsTypes';

interface ManageUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: AssignedRoleUser[];
  onRemoveUser: (userId: string) => void;
  onAddUser: (userName: string, department: string) => void;
}

export const ManageUsersModal: React.FC<ManageUsersModalProps> = ({
  isOpen,
  onClose,
  users,
  onRemoveUser,
  onAddUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newDept, setNewDept] = useState('Cardiology');

  if (!isOpen) return null;

  const filtered = users.filter((u) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q)
    );
  });

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    onAddUser(newUserName.trim(), newDept);
    setNewUserName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Manage Role Members
              </h3>
              <p className="text-xs text-slate-500">
                Users currently assigned to Department Manager ({users.length})
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

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          {/* Quick Add Form */}
          <form
            onSubmit={handleAddNew}
            className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Add staff member name..."
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <select
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
              className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none"
            >
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Radiology">Radiology</option>
              <option value="Emergency">Emergency</option>
            </select>
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#0066FF] hover:bg-blue-600 text-white rounded-lg font-semibold text-xs flex items-center gap-1 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search assigned members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Users List */}
          <div className="max-h-[280px] overflow-y-auto divide-y divide-slate-100 pr-1">
            {filtered.map((user) => (
              <div
                key={user.id}
                className="py-2 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-xs truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {user.department}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveUser(user.id)}
                  className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove from role"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
