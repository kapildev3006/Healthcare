'use client';

import React from 'react';
import { Stethoscope, FileText, ChevronRight } from 'lucide-react';
import {
  EmergencyEncounterItem,
  EmergencyReportItem,
} from '@/features/doctor/emergencyLookupTypes';

interface EmergencyHistoryTablesRowProps {
  encounters: EmergencyEncounterItem[];
  reports: EmergencyReportItem[];
  onViewAllEncounters?: () => void;
  onViewAllReports?: () => void;
  onSelectEncounter?: (encounter: EmergencyEncounterItem) => void;
  onSelectReport?: (report: EmergencyReportItem) => void;
}

export function EmergencyHistoryTablesRow({
  encounters,
  reports,
  onViewAllEncounters,
  onViewAllReports,
  onSelectEncounter,
  onSelectReport,
}: EmergencyHistoryTablesRowProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* 1. Recent Encounters Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Recent Encounters</h3>
          </div>
          <button
            onClick={onViewAllEncounters}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 bg-slate-50/50">
                <th className="py-2.5 px-4 font-semibold">Date</th>
                <th className="py-2.5 px-4 font-semibold">Department</th>
                <th className="py-2.5 px-4 font-semibold">Reason</th>
                <th className="py-2.5 px-4 font-semibold">Doctor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {encounters.map((enc) => (
                <tr
                  key={enc.id}
                  onClick={() => onSelectEncounter?.(enc)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {enc.date}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {enc.department}
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {enc.reason}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`font-medium group-hover:text-blue-600 transition-colors ${
                        enc.hasLink ? 'text-blue-600 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      {enc.doctor}
                      {enc.hasLink && <span className="ml-1 text-xs">»</span>}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Recent Reports Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Recent Reports</h3>
          </div>
          <button
            onClick={onViewAllReports}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 bg-slate-50/50">
                <th className="py-2.5 px-4 font-semibold">Date</th>
                <th className="py-2.5 px-4 font-semibold">Report Type</th>
                <th className="py-2.5 px-4 font-semibold">Findings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((rep) => (
                <tr
                  key={rep.id}
                  onClick={() => onSelectReport?.(rep)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {rep.date}
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium whitespace-nowrap">
                    {rep.reportType}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        rep.isAbnormal
                          ? 'text-rose-600'
                          : rep.findings === 'Normal'
                          ? 'text-emerald-600'
                          : 'text-slate-800'
                      }`}
                    >
                      {rep.findings}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
