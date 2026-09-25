'use client';

import React, { useState } from 'react';
import { X, Search, User, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { mockAppointments } from '@/features/doctor/doctorDashboardMockData';

interface QuickPatientSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient?: (patientName: string, uhid: string) => void;
}

export function QuickPatientSearchModal({
  isOpen,
  onClose,
  onSelectPatient,
}: QuickPatientSearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredPatients = mockAppointments.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.patientName.toLowerCase().includes(q) ||
      p.patientUhid.toLowerCase().includes(q) ||
      (p.phone && p.phone.includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients by name, UHID, phone, or Health ID..."
            className="w-full text-base text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-50">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => {
                  onSelectPatient?.(patient.patientName, patient.patientUhid);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
                    {patient.patientName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {patient.patientName}
                      </p>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                        {patient.patientUhid}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {patient.patientGender}, {patient.patientAge} yrs • {patient.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Open Chart</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching patients found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Search hints: Try &ldquo;Rohit&rdquo;, &ldquo;MLK00123&rdquo;</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
