'use client';

import React from 'react';
import {
  AlertTriangle,
  HeartPulse,
  Pill,
  Info,
  ShieldAlert,
} from 'lucide-react';
import {
  AllergyItem,
  ChronicConditionItem,
  CurrentMedicationItem,
} from '@/features/doctor/emergencyLookupTypes';

interface CriticalMedicalSnapshotRowProps {
  allergies: AllergyItem[];
  chronicConditions: ChronicConditionItem[];
  currentMedications: CurrentMedicationItem[];
  onConditionInfoClick?: (condition: ChronicConditionItem) => void;
}

export function CriticalMedicalSnapshotRow({
  allergies,
  chronicConditions,
  currentMedications,
  onConditionInfoClick,
}: CriticalMedicalSnapshotRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* 1. Allergies Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Allergies</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100/70 text-rose-700">
            {allergies.length} Allergies
          </span>
        </div>

        {/* Content List */}
        <div className="pt-3.5 space-y-3.5 flex-1">
          {allergies.map((allergy) => (
            <div
              key={allergy.id}
              className="flex items-start justify-between gap-2"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {allergy.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Reaction: {allergy.reaction}
                  </p>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  allergy.severity === 'Severe'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200/80'
                    : 'bg-amber-100 text-amber-800 border border-amber-200/80'
                }`}
              >
                {allergy.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Chronic Conditions Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <HeartPulse className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Chronic Conditions</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100/70 text-purple-700">
            {chronicConditions.length} Conditions
          </span>
        </div>

        {/* Content List */}
        <div className="pt-3.5 space-y-3.5 flex-1">
          {chronicConditions.map((condition) => (
            <div key={condition.id} className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  {condition.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                  <span>{condition.sinceYear}</span>
                  {condition.infoAvailable && (
                    <button
                      onClick={() => onConditionInfoClick?.(condition)}
                      className="text-slate-400 hover:text-purple-600"
                      title="Condition Details"
                    >
                      <Info className="w-3 h-3 inline" />
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Current Medications Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Current Medications</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100/70 text-emerald-700">
            {currentMedications.length} Medications
          </span>
        </div>

        {/* Content List */}
        <div className="pt-3.5 space-y-3 flex-1">
          {currentMedications.map((med) => (
            <div
              key={med.id}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-bold text-slate-900 truncate">
                  {med.name}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap shrink-0">
                {med.dosageInstructions}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
