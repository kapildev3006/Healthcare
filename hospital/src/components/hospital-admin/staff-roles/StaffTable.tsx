'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldCheck,
  RotateCcw,
  UserX,
  UserCheck,
} from 'lucide-react';
import {
  StaffMember,
  AccessLevel,
  StaffStatus,
} from '@/features/hospital-admin/staffRolesTypes';

interface StaffTableProps {
  staff: StaffMember[];
  onInviteStaff: () => void;
  onViewProfile: (member: StaffMember) => void;
  onEditRole: (member: StaffMember) => void;
  onResetInvite: (member: StaffMember) => void;
  onToggleStatus: (staffId: string) => void;
}

export const StaffTable: React.FC<StaffTableProps> = ({
  staff,
  onInviteStaff,
  onViewProfile,
  onEditRole,
  onResetInvite,
  onToggleStatus,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [accessFilter, setAccessFilter] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Filter staff
  const filteredStaff = staff.filter((member) => {
    if (departmentFilter !== 'All' && member.department !== departmentFilter)
      return false;
    if (accessFilter !== 'All' && member.accessLevel !== accessFilter)
      return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = member.name.toLowerCase().includes(q);
      const matchEmail = member.email.toLowerCase().includes(q);
      const matchDept = member.department.toLowerCase().includes(q);
      const matchId = member.staffId.toLowerCase().includes(q);
      const matchRole = member.role.toLowerCase().includes(q);
      return matchName || matchEmail || matchDept || matchId || matchRole;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedStaff = filteredStaff.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const departmentsList = [
    'All',
    'Cardiology',
    'Emergency',
    'Neurology',
    'IT & Systems',
    'Administration',
    'Radiology',
    'Health Information',
    'Pharmacy',
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-base text-slate-900 tracking-tight">
            Staff Directory & Permissions
          </h2>
        </div>

        {/* Right Search, Filter & CTA */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search staff by name, email, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Filter Dropdown Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`h-8 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isFilterOpen || departmentFilter !== 'All' || accessFilter !== 'All'
                  ? 'border-blue-300 text-[#0066FF] bg-blue-50/50'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-blue-500" />
              <span>Filter</span>
            </button>

            {/* Filter Menu Popover */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-30 space-y-3 animate-in fade-in zoom-in-95 duration-150 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full p-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {departmentsList.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Access Level
                  </label>
                  <select
                    value={accessFilter}
                    onChange={(e) => setAccessFilter(e.target.value)}
                    className="w-full p-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="All">All Access Levels</option>
                    <option value="Standard">Standard</option>
                    <option value="Elevated">Elevated</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setDepartmentFilter('All');
                      setAccessFilter('All');
                    }}
                    className="text-[11px] text-slate-400 hover:text-slate-600 font-medium"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="text-[11px] font-semibold text-[#0066FF] hover:underline"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* + Invite Staff Button */}
          <button
            type="button"
            onClick={onInviteStaff}
            className="h-8 px-3.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-98 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.4} />
            <span>Invite Staff</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold select-none">
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-3 font-medium">Role</th>
              <th className="py-3 px-3 font-medium">Department</th>
              <th className="py-3 px-3 font-medium">Email / Staff ID</th>
              <th className="py-3 px-3 text-center font-medium">Access Level</th>
              <th className="py-3 px-3 text-center font-medium">Status</th>
              <th className="py-3 px-3 font-medium">Last Active</th>
              <th className="py-3 px-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {displayedStaff.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  No staff members match your search criteria.
                </td>
              </tr>
            ) : (
              displayedStaff.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  {/* Name & Avatar */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div
                      className="flex items-center gap-2.5 cursor-pointer"
                      onClick={() => onViewProfile(member)}
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0 group-hover:ring-2 group-hover:ring-blue-400 transition-all">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {member.name}
                      </span>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3 px-3 text-slate-700 whitespace-nowrap font-medium">
                    {member.role}
                  </td>

                  {/* Department */}
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {member.department}
                  </td>

                  {/* Email & Staff ID */}
                  <td className="py-3 px-3 whitespace-nowrap leading-tight">
                    <p className="font-medium text-slate-800 text-[11.5px]">
                      {member.email}
                    </p>
                    <p className="text-[10.5px] font-mono text-slate-400 mt-0.5">
                      {member.staffId}
                    </p>
                  </td>

                  {/* Access Level Badge */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {member.accessLevel === 'Standard' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#0066FF] border border-[#BFDBFE]/60">
                        Standard
                      </span>
                    ) : member.accessLevel === 'Elevated' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FAF5FF] text-[#9333EA] border border-[#E9D5FF]">
                        Elevated
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]">
                        Admin
                      </span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {member.status === 'Active' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Last Active */}
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                    {member.lastActive}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      {/* View Profile Button */}
                      <button
                        type="button"
                        onClick={() => onViewProfile(member)}
                        className="px-2.5 py-1 rounded-lg border border-blue-200 text-[#0066FF] hover:bg-blue-50 font-semibold text-[11px] transition-colors cursor-pointer"
                      >
                        View Profile
                      </button>

                      {/* Edit Role or Reset Invite Button */}
                      {member.status === 'Inactive' ? (
                        <button
                          type="button"
                          onClick={() => onResetInvite(member)}
                          className="px-2.5 py-1 rounded-lg border border-blue-200 text-[#0066FF] hover:bg-blue-50 font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          Reset Invite
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onEditRole(member)}
                          className="px-2.5 py-1 rounded-lg border border-blue-200 text-[#0066FF] hover:bg-blue-50 font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          Edit Role
                        </button>
                      )}

                      {/* Three Dots Menu */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuId(
                              activeMenuId === member.id ? null : member.id
                            )
                          }
                          className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                        >
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>

                        {/* Options Dropdown */}
                        {activeMenuId === member.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-left text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                onViewProfile(member);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-left cursor-pointer flex items-center gap-2"
                            >
                              <Users className="w-3.5 h-3.5 text-blue-500" />
                              View Full Details
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onEditRole(member);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-left cursor-pointer flex items-center gap-2"
                            >
                              <Shield className="w-3.5 h-3.5 text-purple-500" />
                              Modify Access
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                router.push('/hospital-admin/staff-roles/permissions');
                              }}
                              className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-left cursor-pointer flex items-center gap-2 font-medium text-blue-600"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                              Role Permissions Matrix
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onResetInvite(member);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-left cursor-pointer flex items-center gap-2"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-blue-500" />
                              Resend Credentials
                            </button>
                            <div className="my-1 border-t border-slate-100" />
                            <button
                              type="button"
                              onClick={() => {
                                onToggleStatus(member.id);
                                setActiveMenuId(null);
                              }}
                              className={`w-full px-3 py-1.5 text-left cursor-pointer flex items-center gap-2 ${
                                member.status === 'Active'
                                  ? 'hover:bg-red-50 text-red-600'
                                  : 'hover:bg-emerald-50 text-emerald-600'
                              }`}
                            >
                              {member.status === 'Active' ? (
                                <>
                                  <UserX className="w-3.5 h-3.5" />
                                  Suspend Access
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-3.5 h-3.5" />
                                  Activate Account
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <span className="text-slate-500 font-medium">
          Showing 1–{displayedStaff.length} of {staff.length > 300 ? staff.length : '342'} staff members
        </span>

        {/* Page Buttons */}
        <div className="flex items-center gap-1.5 self-center sm:self-auto">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer ${
              currentPage === 1
                ? 'bg-[#0066FF] text-white shadow-2xs'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer ${
              currentPage === 2
                ? 'bg-[#0066FF] text-white shadow-2xs'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            2
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer ${
              currentPage === 3
                ? 'bg-[#0066FF] text-white shadow-2xs'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            3
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(4)}
            className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer ${
              currentPage === 4
                ? 'bg-[#0066FF] text-white shadow-2xs'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            4
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(5)}
            className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer ${
              currentPage === 5
                ? 'bg-[#0066FF] text-white shadow-2xs'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            5
          </button>

          <span className="text-slate-400 px-1 font-semibold">...</span>

          <button
            type="button"
            onClick={() => setCurrentPage(43)}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
          >
            43
          </button>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
