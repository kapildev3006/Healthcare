'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Users, Search, MoreVertical, ArrowRight } from 'lucide-react';
import { AssignedRoleUser } from '@/features/hospital-admin/rolePermissionsTypes';

interface AssignedUsersCardProps {
  users: AssignedRoleUser[];
  onManageUsers: () => void;
  onViewAllUsers: () => void;
  onRemoveUser?: (userId: string) => void;
}

export const AssignedUsersCard: React.FC<AssignedUsersCardProps> = ({
  users,
  onManageUsers,
  onViewAllUsers,
  onRemoveUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredUsers = users.filter((u) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q)
    );
  });

  const displayedUsers = filteredUsers.slice(0, 8);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Assigned Users ({users.length})
            </h3>
          </div>

          <button
            type="button"
            onClick={onManageUsers}
            className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Manage Users</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search input */}
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Users Table Header */}
        <div className="grid grid-cols-12 text-[11px] font-semibold text-slate-400 pb-1.5 border-b border-slate-100 px-1">
          <div className="col-span-5">Name</div>
          <div className="col-span-4">Department</div>
          <div className="col-span-3 text-right">Status</div>
        </div>

        {/* Users List */}
        <div className="divide-y divide-slate-50 text-xs">
          {displayedUsers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-12 items-center py-2 px-1 hover:bg-slate-50/60 rounded-lg transition-colors group"
            >
              {/* Avatar & Name */}
              <div className="col-span-5 flex items-center gap-2 min-w-0 pr-1">
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={24}
                    height={24}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="font-semibold text-slate-800 text-[11.5px] truncate">
                  {user.name}
                </span>
              </div>

              {/* Department */}
              <div className="col-span-4 text-slate-500 text-[11px] truncate">
                {user.department}
              </div>

              {/* Status & Options */}
              <div className="col-span-3 flex items-center justify-end gap-1">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-600">
                  {user.status}
                </span>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMenuId(
                        activeMenuId === user.id ? null : user.id
                      )
                    }
                    className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>

                  {activeMenuId === user.id && (
                    <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-30 text-[11px]">
                      <button
                        type="button"
                        onClick={() => {
                          onRemoveUser?.(user.id);
                          setActiveMenuId(null);
                        }}
                        className="w-full px-2.5 py-1 text-left text-red-600 hover:bg-red-50"
                      >
                        Remove from Role
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-slate-100 text-center">
        <button
          type="button"
          onClick={onViewAllUsers}
          className="text-xs font-semibold text-[#0066FF] hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <span>View All {users.length} Users</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
