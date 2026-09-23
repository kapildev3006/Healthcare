'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import {
  DoctorItem,
  DoctorTabFilter,
  DoctorStatus,
} from '../../../features/hospital-admin/doctorTypes';

interface DoctorTableProps {
  doctors: DoctorItem[];
  activeTab: DoctorTabFilter;
  onTabChange: (tab: DoctorTabFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewDoctor: (doctor: DoctorItem) => void;
  onStatusChange?: (doctorId: string, newStatus: DoctorStatus) => void;
}

export const DoctorTable: React.FC<DoctorTableProps> = ({
  doctors,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onViewDoctor,
  onStatusChange,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSelectAll = () => {
    if (selectedIds.length === doctors.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(doctors.map((d) => d.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: DoctorStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#16A34A]">
            Active
          </span>
        );
      case 'On Leave':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#D97706]">
            On Leave
          </span>
        );
      case 'Inactive':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEECEC] text-[#EF4444]">
            Inactive
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Top Filter Tabs & Search Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto [scrollbar-width:none]">
          <button
            type="button"
            onClick={() => onTabChange('all')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-[#E5F2FE] text-[#1877F2]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            All Doctors (128)
          </button>
          <button
            type="button"
            onClick={() => onTabChange('active')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'active'
                ? 'bg-[#E5F2FE] text-[#1877F2]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            Active (112)
          </button>
          <button
            type="button"
            onClick={() => onTabChange('on-leave')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'on-leave'
                ? 'bg-[#E5F2FE] text-[#1877F2]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            On Leave (8)
          </button>
          <button
            type="button"
            onClick={() => onTabChange('inactive')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inactive'
                ? 'bg-[#E5F2FE] text-[#1877F2]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            Inactive (6)
          </button>
        </div>

        {/* Right Search Input & Filter Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, specialty, department..."
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2] transition-colors"
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto [scrollbar-width:none]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/30">
              <th className="py-3 pl-5 pr-2 w-10">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === doctors.length && doctors.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-[#1877F2] focus:ring-blue-100 cursor-pointer"
                />
              </th>
              <th className="py-3 px-3">Doctor Name</th>
              <th className="py-3 px-3">Specialty</th>
              <th className="py-3 px-3">Department</th>
              <th className="py-3 px-3">License ID</th>
              <th className="py-3 px-3">Experience</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3">Join Date</th>
              <th className="py-3 pr-5 pl-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {doctors.map((doc) => {
              const isSelected = selectedIds.includes(doc.id);

              return (
                <tr
                  key={doc.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isSelected ? 'bg-blue-50/30' : ''
                  }`}
                >
                  {/* Row Checkbox */}
                  <td className="py-3 pl-5 pr-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectOne(doc.id)}
                      className="rounded border-slate-300 text-[#1877F2] focus:ring-blue-100 cursor-pointer"
                    />
                  </td>

                  {/* Doctor Avatar, Name, Degree */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                        <Image
                          src={doc.avatar}
                          alt={doc.name}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="font-bold text-slate-900 text-xs sm:text-[13px] whitespace-nowrap">
                          {doc.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap mt-0.5">
                          {doc.qualification}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Specialty */}
                  <td className="py-3 px-3 text-slate-700 whitespace-nowrap font-medium">
                    {doc.specialty}
                  </td>

                  {/* Department */}
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {doc.department}
                  </td>

                  {/* License ID */}
                  <td className="py-3 px-3 font-mono text-[11.5px] text-slate-500 whitespace-nowrap">
                    {doc.licenseId}
                  </td>

                  {/* Experience */}
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {doc.experience}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {getStatusBadge(doc.status)}
                  </td>

                  {/* Join Date */}
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-[11.5px]">
                    {doc.joinDate}
                  </td>

                  {/* Actions (View + More) */}
                  <td className="py-3 pr-5 pl-3 text-right whitespace-nowrap relative">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      <button
                        type="button"
                        onClick={() => onViewDoctor(doc)}
                        className="px-3.5 py-1 rounded-lg border border-[#BFDBFE] text-[#1877F2] hover:bg-blue-50 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        View
                      </button>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuId(
                              activeMenuId === doc.id ? null : doc.id
                            )
                          }
                          className="w-7 h-7 rounded-lg border border-slate-200/90 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {/* Options Dropdown */}
                        {activeMenuId === doc.id && (
                          <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30 text-left text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                onStatusChange?.(doc.id, 'Active');
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-left cursor-pointer"
                            >
                              Set as Active
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onStatusChange?.(doc.id, 'On Leave');
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-left cursor-pointer"
                            >
                              Set On Leave
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onStatusChange?.(doc.id, 'Inactive');
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 hover:bg-red-50 text-red-600 text-left cursor-pointer"
                            >
                              Set Inactive
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Bar */}
      <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <span className="text-slate-500 font-medium">
          Showing 1–10 of 128 doctors
        </span>

        {/* Page Buttons */}
        <div className="flex items-center gap-1.5 self-center">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`w-8 h-8 rounded-lg font-semibold flex items-center justify-center transition-colors cursor-pointer ${
              currentPage === 1
                ? 'bg-[#1877F2] text-white shadow-2xs'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            1
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`w-8 h-8 rounded-lg font-semibold flex items-center justify-center transition-colors cursor-pointer ${
              currentPage === 2
                ? 'bg-[#1877F2] text-white shadow-2xs'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            2
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className={`w-8 h-8 rounded-lg font-semibold flex items-center justify-center transition-colors cursor-pointer ${
              currentPage === 3
                ? 'bg-[#1877F2] text-white shadow-2xs'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            3
          </button>

          <span className="px-1 text-slate-400">...</span>

          <button
            type="button"
            onClick={() => setCurrentPage(13)}
            className={`w-8 h-8 rounded-lg font-semibold flex items-center justify-center transition-colors cursor-pointer ${
              currentPage === 13
                ? 'bg-[#1877F2] text-white shadow-2xs'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            13
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(Math.min(13, currentPage + 1))}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
