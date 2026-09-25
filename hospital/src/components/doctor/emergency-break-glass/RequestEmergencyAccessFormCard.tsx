'use client';

import React, { useState } from 'react';
import {
  Lock,
  Search,
  ChevronDown,
  Check,
  AlertCircle,
  UserCheck,
} from 'lucide-react';
import {
  BreakGlassFormData,
  BreakGlassAccessScope,
  BreakGlassAccessDuration,
} from '@/features/doctor/emergencyBreakGlassTypes';
import { emergencyReasonsList } from '@/features/doctor/emergencyBreakGlassMockData';

interface RequestEmergencyAccessFormCardProps {
  onSubmit: (data: BreakGlassFormData) => void;
  isLoading?: boolean;
}

const mockPatientsQuickSelect = [
  { name: 'Rahul Kumar', uhid: 'MLK00456', phone: '+91 98765 43210' },
  { name: 'Sneha Gupta', uhid: 'MLK01011', phone: '+91 98111 22334' },
  { name: 'Neha Tiwari', uhid: 'MLK01321', phone: '+91 97234 56789' },
  { name: 'Amit Rao', uhid: 'MLK01234', phone: '+91 99887 76655' },
  { name: 'Vikram Singh', uhid: 'MLK00901', phone: '+91 98123 45678' },
  { name: 'Priya Sharma', uhid: 'MLK00789', phone: '+91 98321 65498' },
];

export function RequestEmergencyAccessFormCard({
  onSubmit,
  isLoading = false,
}: RequestEmergencyAccessFormCardProps) {
  const [patientQuery, setPatientQuery] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [accessScope, setAccessScope] =
    useState<BreakGlassAccessScope>('Critical Information Only');
  const [accessDuration, setAccessDuration] =
    useState<BreakGlassAccessDuration>('4 hours');
  const [confirmedGenuine, setConfirmedGenuine] = useState(true);

  // Quick select popover state
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredPatients = mockPatientsQuickSelect.filter(
    (p) =>
      p.name.toLowerCase().includes(patientQuery.toLowerCase()) ||
      p.uhid.toLowerCase().includes(patientQuery.toLowerCase()) ||
      p.phone.includes(patientQuery)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!patientQuery.trim()) {
      setFormError('Please specify the patient by name, UHID, or Health ID.');
      return;
    }
    if (!selectedReason || selectedReason === 'Select reason') {
      setFormError('Please select a valid reason for emergency break-glass access.');
      return;
    }
    if (!confirmedGenuine) {
      setFormError('You must confirm that this is a genuine emergency.');
      return;
    }

    onSubmit({
      patientQuery: patientQuery.trim(),
      selectedReason,
      additionalDetails: additionalDetails.trim(),
      accessScope,
      accessDuration,
      confirmedGenuine,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      {/* Header with Blue Lock Icon */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs shadow-blue-500/20">
          <Lock className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-tight">
            Request Emergency Access
          </h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Enter patient details and reason for emergency access.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="pt-5 space-y-4">
        {formError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{formError}</span>
          </div>
        )}

        {/* Row 1: Search Patient & Access Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Patient */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Search Patient <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={patientQuery}
                onChange={(e) => {
                  setPatientQuery(e.target.value);
                  setIsPatientDropdownOpen(true);
                }}
                onFocus={() => setIsPatientDropdownOpen(true)}
                placeholder="Search by name, UHID, phone, or Health ID..."
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
              />
            </div>

            {/* Autocomplete Suggestions */}
            {isPatientDropdownOpen && patientQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden divide-y divide-slate-100 max-h-48 overflow-y-auto">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((p) => (
                    <button
                      key={p.uhid}
                      type="button"
                      onClick={() => {
                        setPatientQuery(`${p.name} (${p.uhid})`);
                        setIsPatientDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-blue-50/70 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-600">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          UHID: {p.uhid} • {p.phone}
                        </p>
                      </div>
                      <UserCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" />
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-xs text-slate-500 text-center">
                    No matching patient in system directory. Custom ID will be logged.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Access Scope */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Access Scope <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={accessScope}
                onChange={(e) =>
                  setAccessScope(e.target.value as BreakGlassAccessScope)
                }
                className="w-full appearance-none px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-10 shadow-2xs font-normal"
              >
                <option value="Critical Information Only">
                  Critical Information Only
                </option>
                <option value="Full Medical Record">
                  Full Medical Record
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Includes allergies, medications, major conditions, and recent encounters.
            </p>
          </div>
        </div>

        {/* Row 2: Reason for Emergency Access & Access Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reason for Emergency Access */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Reason for Emergency Access <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className={`w-full appearance-none px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-10 shadow-2xs ${
                  !selectedReason ? 'text-slate-400' : 'text-slate-800'
                }`}
              >
                <option value="" disabled>
                  Select reason
                </option>
                {emergencyReasonsList.map((reason) => (
                  <option key={reason} value={reason} className="text-slate-800">
                    {reason}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Access Duration */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              Access Duration <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={accessDuration}
                onChange={(e) =>
                  setAccessDuration(e.target.value as BreakGlassAccessDuration)
                }
                className="w-full appearance-none px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-10 shadow-2xs font-normal"
              >
                <option value="1 hour">1 hour</option>
                <option value="4 hours">4 hours</option>
                <option value="8 hours">8 hours</option>
                <option value="12 hours">12 hours</option>
                <option value="24 hours">24 hours</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Minimum duration for emergency access.
            </p>
          </div>
        </div>

        {/* Row 3: Additional Details (Optional) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Additional Details (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={additionalDetails}
              maxLength={500}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Provide additional context about the emergency situation..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-2xs"
            />
            <div className="text-right pr-2 -mt-1 pb-1">
              <span className="text-[11px] font-medium text-slate-400">
                {additionalDetails.length}/500
              </span>
            </div>
          </div>
        </div>

        {/* Row 4: Confirmation Amber Box & Red Request Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
          {/* Amber confirmation banner with checkbox */}
          <div
            onClick={() => setConfirmedGenuine(!confirmedGenuine)}
            className="bg-[#fffbeb] border border-[#fef3c7] hover:border-[#fde68a] rounded-xl p-3 flex items-start gap-3 flex-1 cursor-pointer transition-colors"
          >
            <div className="pt-0.5">
              <input
                type="checkbox"
                id="emergency-confirm"
                checked={confirmedGenuine}
                onChange={(e) => setConfirmedGenuine(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-amber-300 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
              />
            </div>
            <label
              htmlFor="emergency-confirm"
              className="text-left cursor-pointer select-none"
            >
              <p className="text-xs font-bold text-slate-800 leading-snug">
                I confirm this is a genuine emergency situation and patient consent is not available.
              </p>
              <p className="text-[11px] text-slate-600 font-normal mt-0.5 leading-snug">
                I understand that this access will be logged, monitored, and the patient will be notified.
              </p>
            </label>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0 disabled:opacity-70 cursor-pointer"
          >
            <Lock className="w-4 h-4 text-white" />
            <span>Request Emergency Access</span>
          </button>
        </div>
      </form>
    </div>
  );
}
