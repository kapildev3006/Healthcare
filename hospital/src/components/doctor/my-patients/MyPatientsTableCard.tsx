'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Download,
  List,
  LayoutGrid,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  Activity,
  FileText,
} from 'lucide-react';
import {
  MyPatientItem,
  ViewMode,
} from '@/features/doctor/myPatientsTypes';

interface MyPatientsTableCardProps {
  patients: MyPatientItem[];
  totalCount: number;
  onViewPatient: (patient: MyPatientItem) => void;
  onExport: () => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function MyPatientsTableCard({
  patients,
  totalCount = 48,
  onViewPatient,
  onExport,
  currentPage,
  onPageChange,
}: MyPatientsTableCardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getStatusBadge = (status: MyPatientItem['status']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </span>
        );
      case 'Follow-up Due':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Follow-up Due
          </span>
        );
      case 'Needs Review':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            Needs Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-tight">
            My Patients ({totalCount})
          </h2>
        </div>

        {/* Right Controls: Export & View Mode Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onExport}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('card')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'card'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: List Table or Card Grid */}
      {viewMode === 'list' ? (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-2 w-8 font-semibold">#</th>
                <th className="pb-3 pr-4 font-semibold">Patient Name</th>
                <th className="pb-3 pr-4 font-semibold">UHID / Health ID</th>
                <th className="pb-3 pr-4 font-semibold">Age / Gender</th>
                <th className="pb-3 pr-4 font-semibold">Primary Condition</th>
                <th className="pb-3 pr-4 font-semibold">Last Visit</th>
                <th className="pb-3 pr-4 font-semibold">Status</th>
                <th className="pb-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {patients.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* # Number */}
                  <td className="py-3.5 pr-2 text-slate-400 font-medium">
                    {item.rowNum}
                  </td>

                  {/* Patient Name with Avatar */}
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {item.avatarUrl ? (
                          <Image
                            src={item.avatarUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-xs text-blue-600 bg-blue-50">
                            {item.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* UHID / Health ID */}
                  <td className="py-3.5 pr-4">
                    <p className="font-semibold text-slate-900 font-mono text-xs">
                      {item.uhid}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {item.healthId}
                    </p>
                  </td>

                  {/* Age / Gender */}
                  <td className="py-3.5 pr-4 text-slate-700 font-medium">
                    {item.age} / {item.gender}
                  </td>

                  {/* Primary Condition */}
                  <td className="py-3.5 pr-4 text-slate-700 font-medium">
                    {item.primaryCondition}
                  </td>

                  {/* Last Visit */}
                  <td className="py-3.5 pr-4 text-slate-600 font-normal">
                    {item.lastVisit}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 pr-4">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Action Buttons: View + Options */}
                  <td className="py-3.5 text-right relative">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onViewPatient(item)}
                        className="px-3 py-1 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg text-xs font-semibold text-blue-600 transition-colors shadow-2xs cursor-pointer"
                      >
                        View
                      </button>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuId(
                              activeMenuId === item.id ? null : item.id
                            )
                          }
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {/* Dropdown Options */}
                        {activeMenuId === item.id && (
                          <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 divide-y divide-slate-100 text-left">
                            <button
                              onClick={() => {
                                onViewPatient(item);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              <span>View Full Chart</span>
                            </button>
                            <button
                              onClick={() => {
                                alert(`Creating encounter for ${item.name}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>Schedule Visit</span>
                            </button>
                            <button
                              onClick={() => {
                                alert(`Updating condition for ${item.name}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Activity className="w-3.5 h-3.5 text-slate-400" />
                              <span>Update Treatment</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card Mode Alternative */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
          {patients.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 rounded-xl p-4 transition-all hover:shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                    {item.avatarUrl ? (
                      <Image
                        src={item.avatarUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-xs text-blue-600 bg-blue-50">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {item.uhid}
                    </p>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>

              <div className="text-xs space-y-1 pt-1 border-t border-slate-200/60">
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Condition:</span>
                  <span className="font-semibold text-slate-800">
                    {item.primaryCondition}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Age / Gender:</span>
                  <span>
                    {item.age} / {item.gender}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Last Visit:</span>
                  <span>{item.lastVisit}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onViewPatient(item)}
                  className="w-full py-1.5 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg text-xs font-semibold text-blue-600 transition-colors shadow-2xs"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500 font-medium">
          Showing 1 to {patients.length} of {totalCount} patients
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center justify-center text-xs transition-colors"
          >
            «
          </button>

          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            onClick={() => onPageChange(Math.min(5, currentPage + 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center justify-center text-xs transition-colors"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
