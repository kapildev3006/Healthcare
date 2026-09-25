'use client';

import React, { useState } from 'react';
import {
  FileText,
  Search,
  ChevronDown,
  MoreVertical,
} from 'lucide-react';
import {
  DoctorVerificationApplication,
  VerificationApplicationStatus,
} from '../../../features/hospital-admin/verificationTypes';

interface PendingApplicationsTableProps {
  applications: DoctorVerificationApplication[];
  selectedDoctorId: string;
  onSelectDoctor: (doctor: DoctorVerificationApplication) => void;
  onReviewDoctor: (doctor: DoctorVerificationApplication) => void;
  onStatusChange?: (
    doctorId: string,
    newStatus: VerificationApplicationStatus
  ) => void;
}

export const PendingApplicationsTable: React.FC<
  PendingApplicationsTableProps
> = ({
  applications,
  selectedDoctorId,
  onSelectDoctor,
  onReviewDoctor,
  onStatusChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Extract unique specialties for the dropdown
  const specialties = [
    'All',
    ...Array.from(new Set(applications.map((a) => a.specialty))),
  ];

  // Filter applications
  const filteredApps = applications.filter((app) => {
    if (specialtyFilter !== 'All' && app.specialty !== specialtyFilter) {
      return false;
    }
    if (statusFilter !== 'All' && app.status !== statusFilter) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = app.doctorName.toLowerCase().includes(q);
      const matchSpecialty = app.specialty.toLowerCase().includes(q);
      const matchDept = app.department.toLowerCase().includes(q);
      const matchLicense = app.licenseId.toLowerCase().includes(q);
      return matchName || matchSpecialty || matchDept || matchLicense;
    }
    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredApps.map((a) => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Table Header & Controls Bar */}
      <div className="p-4 sm:px-6 sm:py-4.5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
            <FileText className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Pending Doctor Applications
          </h2>
        </div>

        {/* Filter Controls on Right */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctors..."
              className="h-8 pl-8 pr-3 w-36 sm:w-44 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Specialty Filter */}
          <div className="relative">
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="h-8 pl-2.5 pr-7 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec === 'All' ? 'All Specialties' : spec}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 pl-2.5 pr-7 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Requested More Info">Requested More Info</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-semibold select-none">
              <th className="py-3 px-3.5 pl-5 w-8">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    filteredApps.length > 0 &&
                    selectedIds.length === filteredApps.length
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              <th className="py-3 px-3">Doctor Name</th>
              <th className="py-3 px-3">Specialty</th>
              <th className="py-3 px-3">License ID</th>
              <th className="py-3 px-3">Department</th>
              <th className="py-3 px-3">Submitted On</th>
              <th className="py-3 px-3 text-center">Documents</th>
              <th className="py-3 px-3 text-center">Background Check</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-4 pr-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-normal">
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-400">
                  No verification applications match your filters.
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => {
                const isSelected = selectedDoctorId === app.id;
                const isChecked = selectedIds.includes(app.id);

                return (
                  <tr
                    key={app.id}
                    onClick={() => onSelectDoctor(app)}
                    className={`transition-colors cursor-pointer group ${
                      isSelected
                        ? 'bg-blue-50/70 border-l-[3px] border-l-[#0066FF]'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* Checkbox */}
                    <td
                      className="py-3 px-3.5 pl-5"
                      onClick={(e) => handleToggleRow(app.id, e)}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>

                    {/* Doctor Name */}
                    <td className="py-3 px-3 font-semibold text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                      {app.doctorName}
                    </td>

                    {/* Specialty */}
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {app.specialty}
                    </td>

                    {/* License ID */}
                    <td className="py-3 px-3 font-mono text-[11.5px] text-slate-500 whitespace-nowrap">
                      {app.licenseId}
                    </td>

                    {/* Department */}
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {app.department}
                    </td>

                    {/* Submitted On */}
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {app.submittedOn}
                    </td>

                    {/* Documents Status */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      {app.documentsStatus === 'Complete' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                          Complete
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]">
                          {app.documentsStatus}
                        </span>
                      )}
                    </td>

                    {/* Background Check */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      {app.backgroundCheck === 'Clear' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                          Clear
                        </span>
                      ) : app.backgroundCheck === 'In Progress' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                          In Progress
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200">
                          Not Started
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      {app.status === 'Pending' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                          Pending
                        </span>
                      ) : app.status === 'Approved' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                          Approved
                        </span>
                      ) : app.status === 'Rejected' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]">
                          Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                          More Info
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 pr-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onReviewDoctor(app);
                          }}
                          className="h-7 px-3 rounded-lg bg-[#0066FF] hover:bg-blue-600 text-white font-medium text-xs shadow-2xs transition-all active:scale-98 cursor-pointer"
                        >
                          Review
                        </button>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(
                                openMenuId === app.id ? null : app.id
                              );
                            }}
                            className="w-7 h-7 rounded-lg hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {openMenuId === app.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-8 z-30 w-38 bg-white rounded-xl shadow-lg border border-slate-200 py-1 text-xs"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  onStatusChange?.(app.id, 'Approved');
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-emerald-600 font-medium"
                              >
                                Mark as Approved
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  onStatusChange?.(app.id, 'Requested More Info');
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-amber-600 font-medium"
                              >
                                Request Info
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  onStatusChange?.(app.id, 'Rejected');
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-red-600 font-medium"
                              >
                                Mark as Rejected
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
