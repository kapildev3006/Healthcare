'use client';

import React from 'react';
import { X, Calendar, Clock, User, Phone, MapPin, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { AppointmentItem } from '@/features/doctor/doctorDashboardTypes';

interface AppointmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentItem | null;
  onStartEncounter?: (appointment: AppointmentItem) => void;
}

export function AppointmentDetailModal({
  isOpen,
  onClose,
  appointment,
  onStartEncounter,
}: AppointmentDetailModalProps) {
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Appointment Details</h3>
              <p className="text-xs text-blue-100 font-mono mt-0.5">
                UHID: {appointment.patientUhid}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {/* Patient Overview */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-base flex items-center justify-center border border-blue-200">
                {appointment.patientName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  {appointment.patientName}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {appointment.patientGender || 'Male'}, {appointment.patientAge || 35} yrs • {appointment.phone || '+91 98765 43210'}
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                appointment.status === 'Checked In'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
            >
              {appointment.status}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <span className="text-slate-400 block mb-1 font-medium">Scheduled Time</span>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                {appointment.time} (Today)
              </p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <span className="text-slate-400 block mb-1 font-medium">Encounter Type</span>
              <p className="text-sm font-bold text-slate-900">
                {appointment.type}
              </p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <span className="text-slate-400 block mb-1 font-medium">Assigned Location</span>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500" />
                {appointment.room || 'OPD Room 204'}
              </p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <span className="text-slate-400 block mb-1 font-medium">Clinical Reason</span>
              <p className="text-sm font-bold text-slate-900">
                {appointment.reason}
              </p>
            </div>
          </div>

          {/* Quick clinical note */}
          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-blue-900 block">Pre-consultation Vitals:</span>
            <p>BP: 124/82 mmHg • Pulse: 74 bpm • Temp: 98.4°F • SpO2: 99%</p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartEncounter?.(appointment);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Start Encounter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
