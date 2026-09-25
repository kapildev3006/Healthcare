'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Stethoscope, User, Calendar, FileText } from 'lucide-react';
import { mockAppointments } from '@/features/doctor/doctorDashboardMockData';

interface CreateEncounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (patientName: string) => void;
}

export function CreateEncounterModal({
  isOpen,
  onClose,
  onCreated,
}: CreateEncounterModalProps) {
  const [patientId, setPatientId] = useState(mockAppointments[0].id);
  const [complaint, setComplaint] = useState('Type 2 Diabetes routine follow-up with HbA1c review');
  const [notes, setNotes] = useState('Patient reports adherence to Metformin. Fasting blood sugar well controlled.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = mockAppointments.find((a) => a.id === patientId);
    onCreated?.(p?.patientName || 'Patient');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Create Consultation Encounter</h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                New clinical encounter documentation
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Select Patient
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              {mockAppointments.map((apt) => (
                <option key={apt.id} value={apt.id}>
                  {apt.patientName} ({apt.patientUhid}) - {apt.time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Chief Complaint & Reason for Visit
            </label>
            <input
              type="text"
              required
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Vitals quick row */}
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">
                BP (mmHg)
              </label>
              <input
                type="text"
                defaultValue="120/80"
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-center"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">
                Pulse (bpm)
              </label>
              <input
                type="text"
                defaultValue="72"
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-center"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">
                Temp (°F)
              </label>
              <input
                type="text"
                defaultValue="98.6"
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-center"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-1">
                SpO2 (%)
              </label>
              <input
                type="text"
                defaultValue="99"
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-center"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Clinical Notes & Assessment
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Record Encounter</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
