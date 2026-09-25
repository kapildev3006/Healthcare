'use client';

import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { AppointmentItem } from '@/features/doctor/doctorDashboardTypes';

interface TodayAppointmentsCardProps {
  appointments: AppointmentItem[];
  onSelectAppointment: (appointment: AppointmentItem) => void;
  onViewAll?: () => void;
}

// Color palettes for patient initial avatars
const patientAvatarStyles: Record<string, { bg: string; text: string; initials: string }> = {
  MLK00123: { bg: 'bg-amber-100 text-amber-800 border-amber-200', text: 'RS', initials: 'RS' },
  MLK00456: { bg: 'bg-rose-100 text-rose-800 border-rose-200', text: 'PV', initials: 'PV' },
  MLK00789: { bg: 'bg-blue-100 text-blue-800 border-blue-200', text: 'AK', initials: 'AK' },
  MLK00234: { bg: 'bg-purple-100 text-purple-800 border-purple-200', text: 'NS', initials: 'NS' },
  MLK00987: { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', text: 'VM', initials: 'VM' },
};

export function TodayAppointmentsCard({
  appointments,
  onSelectAppointment,
  onViewAll,
}: TodayAppointmentsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
      {/* Card Header */}
      <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-slate-900">
            Today&apos;s Appointments
          </h2>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50">
              <th className="py-3 px-5 font-semibold">Time</th>
              <th className="py-3 px-5 font-semibold">Patient</th>
              <th className="py-3 px-5 font-semibold">Reason</th>
              <th className="py-3 px-5 font-semibold">Type</th>
              <th className="py-3 px-5 font-semibold">Status</th>
              <th className="py-3 px-5 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {appointments.map((apt) => {
              const avatarInfo = patientAvatarStyles[apt.patientUhid] || {
                bg: 'bg-slate-100 text-slate-700 border-slate-200',
                initials: apt.patientName
                  .split(' ')
                  .map((n) => n[0])
                  .join(''),
              };

              return (
                <tr
                  key={apt.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => onSelectAppointment(apt)}
                >
                  {/* Time */}
                  <td className="py-3.5 px-5 font-semibold text-slate-900 whitespace-nowrap">
                    {apt.time}
                  </td>

                  {/* Patient Info */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3 min-w-[170px]">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 ${avatarInfo.bg}`}
                      >
                        {avatarInfo.initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                          {apt.patientName}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          UHID: {apt.patientUhid}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Reason */}
                  <td className="py-3.5 px-5 text-slate-600 text-xs sm:text-sm font-medium">
                    {apt.reason}
                  </td>

                  {/* Type */}
                  <td className="py-3.5 px-5 text-slate-600 text-xs sm:text-sm">
                    {apt.type}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-5">
                    {apt.status === 'Checked In' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                        Checked In
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200/70">
                        Scheduled
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAppointment(apt);
                      }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/60 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer bar */}
      <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Showing 5 of 8 scheduled appointments for today</span>
        <button
          onClick={onViewAll}
          className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
        >
          Manage Schedule <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
