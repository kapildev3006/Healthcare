'use client';

import React, { useState } from 'react';
import {
  List,
  LayoutGrid,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  KeyRound,
  Clock,
  Ban,
  Eye,
  Calendar,
  Phone,
} from 'lucide-react';
import {
  PatientSearchResultItem,
  AccessStatusType,
} from '@/features/doctor/patientSearchTypes';

interface PatientSearchResultsCardProps {
  results: PatientSearchResultItem[];
  totalCount: number;
  queryText: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewProfile: (patient: PatientSearchResultItem) => void;
  onRequestAccess: (patient: PatientSearchResultItem) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

// Avatar color palettes
const avatarStyles: Record<string, { bg: string; text: string }> = {
  MLK00123: { bg: 'bg-amber-100 border-amber-200', text: 'text-amber-800' },
  MLK00456: { bg: 'bg-rose-100 border-rose-200', text: 'text-rose-800' },
  MLK00789: { bg: 'bg-blue-100 border-blue-200', text: 'text-blue-800' },
  MLK01011: { bg: 'bg-purple-100 border-purple-200', text: 'text-purple-800' },
  MLK01122: { bg: 'bg-emerald-100 border-emerald-200', text: 'text-emerald-800' },
  MLK01333: { bg: 'bg-sky-100 border-sky-200', text: 'text-sky-800' },
  MLK01544: { bg: 'bg-slate-200 border-slate-300', text: 'text-slate-800' },
  MLK01755: { bg: 'bg-fuchsia-100 border-fuchsia-200', text: 'text-fuchsia-800' },
};

export function PatientSearchResultsCard({
  results,
  totalCount,
  queryText,
  currentPage,
  totalPages,
  onPageChange,
  onViewProfile,
  onRequestAccess,
  sortBy,
  onSortChange,
}: PatientSearchResultsCardProps) {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const renderStatusBadge = (status: AccessStatusType, patient: PatientSearchResultItem) => {
    switch (status) {
      case 'Authorized':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            Authorized
          </span>
        );
      case 'Request Access':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRequestAccess(patient);
            }}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200/80 hover:bg-sky-100 transition-colors cursor-pointer"
          >
            Request Access
          </button>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
            Pending
          </span>
        );
      case 'Access Denied':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200/80">
            Access Denied
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Results Header */}
      <div className="px-6 py-4.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-tight">
            Search Results
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Showing {totalCount} results for &ldquo;{queryText}&rdquo;
          </p>
        </div>

        {/* View mode & Sort controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Relevance">Relevance</option>
              <option value="Name">Patient Name</option>
              <option value="Last Visit">Last Visit</option>
              <option value="Age">Age</option>
            </select>
          </div>

          <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5 inline mr-1" />
              <span className="text-xs">List</span>
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-3.5 h-3.5 inline mr-1" />
              <span className="text-xs">Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table View */}
      {viewMode === 'list' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4 font-semibold w-10">#</th>
                <th className="py-3 px-4 font-semibold">Patient Name</th>
                <th className="py-3 px-4 font-semibold">UHID / Health ID</th>
                <th className="py-3 px-4 font-semibold">Age / Gender</th>
                <th className="py-3 px-4 font-semibold">Last Visit</th>
                <th className="py-3 px-4 font-semibold">Access Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {results.map((patient, index) => {
                const avatar = avatarStyles[patient.uhid] || {
                  bg: 'bg-blue-100 border-blue-200',
                  text: 'text-blue-800',
                };
                const initials = patient.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('');

                const rowNumber = (currentPage - 1) * 8 + index + 1;

                return (
                  <tr
                    key={patient.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onViewProfile(patient)}
                  >
                    {/* Index */}
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-400">
                      {rowNumber}
                    </td>

                    {/* Patient Name + Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 min-w-[150px]">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 ${avatar.bg} ${avatar.text}`}
                        >
                          {initials}
                        </div>
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {patient.name}
                        </span>
                      </div>
                    </td>

                    {/* UHID / Health ID */}
                    <td className="py-3.5 px-4">
                      <div className="min-w-[170px]">
                        <p className="text-xs font-bold text-slate-800 font-mono">
                          UHID: {patient.uhid}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Health ID: {patient.healthId}
                        </p>
                      </div>
                    </td>

                    {/* Age / Gender */}
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-700 whitespace-nowrap">
                      {patient.age} / {patient.gender}
                    </td>

                    {/* Last Visit */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {patient.lastVisitDate}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {patient.lastVisitDepartment}
                      </p>
                    </td>

                    {/* Access Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {renderStatusBadge(patient.accessStatus, patient)}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewProfile(patient);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100 border border-blue-200/70 transition-colors cursor-pointer"
                        >
                          View Profile
                        </button>

                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(
                                activeMenuId === patient.id ? null : patient.id
                              );
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {/* Action Dropdown */}
                          {activeMenuId === patient.id && (
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-40 text-left animate-in fade-in duration-100">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(null);
                                  onViewProfile(patient);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                <span>View Longitudinal History</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(null);
                                  onRequestAccess(patient);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                                <span>Request Full Access</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(null);
                                  navigator.clipboard.writeText(patient.healthId);
                                  alert(`Copied Health ID: ${patient.healthId}`);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>Schedule Consultation</span>
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
      ) : (
        /* Alternative Card View */
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((patient) => {
            const avatar = avatarStyles[patient.uhid] || {
              bg: 'bg-blue-100 border-blue-200',
              text: 'text-blue-800',
            };
            const initials = patient.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <div
                key={patient.id}
                onClick={() => onViewProfile(patient)}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border ${avatar.bg} ${avatar.text}`}
                    >
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{patient.name}</h4>
                      <p className="text-xs text-slate-500 font-mono">UHID: {patient.uhid}</p>
                    </div>
                  </div>
                  {renderStatusBadge(patient.accessStatus, patient)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-1 border-t border-b border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Age / Gender</span>
                    <span className="font-bold text-slate-800">{patient.age} yrs • {patient.gender}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Last Visit</span>
                    <span className="font-bold text-slate-800">{patient.lastVisitDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500">{patient.lastVisitDepartment}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewProfile(patient);
                    }}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 border border-blue-200/70"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Footer */}
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing {(currentPage - 1) * 8 + 1} to{' '}
          {Math.min(currentPage * 8, totalCount)} of {totalCount} results
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
