'use client';

import React, { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DepartmentItem } from '../../../features/hospital-admin/departmentTypes';

interface DepartmentsTableProps {
  departments: DepartmentItem[];
  onViewDepartment: (department: DepartmentItem) => void;
  onToggleStatus: (deptId: string) => void;
  onAssignHead: (department: DepartmentItem) => void;
}

export const DepartmentsTable: React.FC<DepartmentsTableProps> = ({
  departments,
  onViewDepartment,
  onToggleStatus,
  onAssignHead,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const itemsPerPage = 10;

  // Filter departments
  const filteredDepts = departments.filter((dept) => {
    if (statusFilter !== 'All' && dept.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = dept.name.toLowerCase().includes(q);
      const matchHead = dept.head.toLowerCase().includes(q);
      const matchCat = dept.category.toLowerCase().includes(q);
      return matchName || matchHead || matchCat;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredDepts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDepartments = filteredDepts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Table Header & Controls Bar */}
      <div className="p-4 sm:px-6 sm:py-4.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Building2 className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Departments Overview
          </h2>
        </div>

        {/* Right Search & Filter Actions */}
        <div className="flex items-center gap-2.5">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search departments..."
              className="h-8.5 pl-8 pr-3 w-40 sm:w-52 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="h-8.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-98"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-10 z-30 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter('All');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 hover:bg-slate-50 ${
                    statusFilter === 'All' ? 'text-[#0066FF] font-semibold' : 'text-slate-700'
                  }`}
                >
                  All Statuses
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter('Active');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 hover:bg-slate-50 ${
                    statusFilter === 'Active' ? 'text-emerald-600 font-semibold' : 'text-slate-700'
                  }`}
                >
                  Active Only
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter('Inactive');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 hover:bg-slate-50 ${
                    statusFilter === 'Inactive' ? 'text-red-600 font-semibold' : 'text-slate-700'
                  }`}
                >
                  Inactive Only
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-semibold select-none">
              <th className="py-3 px-4 pl-6">Department Name</th>
              <th className="py-3 px-3">Department Head</th>
              <th className="py-3 px-3 text-center">Doctors</th>
              <th className="py-3 px-3 text-center">Staff</th>
              <th className="py-3 px-3 text-center">Bed Capacity</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-normal">
            {currentDepartments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No departments found matching your criteria.
                </td>
              </tr>
            ) : (
              currentDepartments.map((dept) => (
                <tr
                  key={dept.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Department Name */}
                  <td className="py-3 px-4 pl-6 font-semibold text-slate-900 group-hover:text-[#0066FF] transition-colors whitespace-nowrap">
                    {dept.name}
                  </td>

                  {/* Department Head */}
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {dept.head}
                  </td>

                  {/* Doctors */}
                  <td className="py-3 px-3 text-center text-slate-700 whitespace-nowrap font-medium">
                    {dept.doctorsCount}
                  </td>

                  {/* Staff */}
                  <td className="py-3 px-3 text-center text-slate-700 whitespace-nowrap font-medium">
                    {dept.staffCount}
                  </td>

                  {/* Bed Capacity */}
                  <td className="py-3 px-3 text-center text-slate-700 whitespace-nowrap font-medium">
                    {dept.bedCapacity}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {dept.status === 'Active' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 pr-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onViewDepartment(dept)}
                        className="h-7 px-3 rounded-lg border border-blue-200 text-[#0066FF] hover:bg-blue-50 font-medium text-xs shadow-2xs transition-all active:scale-98 cursor-pointer"
                      >
                        View
                      </button>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(openMenuId === dept.id ? null : dept.id)
                          }
                          className="w-7 h-7 rounded-lg hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {openMenuId === dept.id && (
                          <div className="absolute right-0 top-8 z-30 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                onAssignHead(dept);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
                            >
                              Assign Department Head
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onToggleStatus(dept.id);
                                setOpenMenuId(null);
                              }}
                              className={`w-full text-left px-3.5 py-1.5 hover:bg-slate-50 font-medium ${
                                dept.status === 'Active'
                                  ? 'text-red-600'
                                  : 'text-emerald-600'
                              }`}
                            >
                              {dept.status === 'Active'
                                ? 'Mark as Inactive'
                                : 'Mark as Active'}
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
      <div className="p-4 sm:px-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing {filteredDepts.length === 0 ? 0 : startIndex + 1}–
          {Math.min(startIndex + itemsPerPage, filteredDepts.length)} of{' '}
          {filteredDepts.length} departments
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-[#0066FF] text-white shadow-2xs'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
