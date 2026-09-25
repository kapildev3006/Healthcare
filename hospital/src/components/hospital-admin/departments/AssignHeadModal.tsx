'use client';

import React, { useState } from 'react';
import { X, UserCheck, Stethoscope, Building2, Calendar, CheckCircle2 } from 'lucide-react';
import { DepartmentItem } from '@/features/hospital-admin/departmentTypes';

interface AssignHeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  departments: DepartmentItem[];
  selectedDepartmentId?: string;
  onAssignHead: (departmentId: string, newHead: string) => void;
}

const AVAILABLE_HEAD_CANDIDATES = [
  { name: 'Dr. Priya Sharma', role: 'Senior Interventional Cardiologist', experience: '14 yrs' },
  { name: 'Dr. Arjun Mehta', role: 'Chief Radiologist', experience: '12 yrs' },
  { name: 'Dr. Neha Kapoor', role: 'Lead Neurologist & Neuro-ICU Director', experience: '11 yrs' },
  { name: 'Dr. Sameer Khan', role: 'Director of Trauma & Emergency Care', experience: '15 yrs' },
  { name: 'Dr. Ananya Iyer', role: 'Senior Internal Medicine Consultant', experience: '13 yrs' },
  { name: 'Dr. Rohit Desai', role: 'Chief Pediatric Specialist', experience: '10 yrs' },
  { name: 'Dr. Kavita Rao', role: 'Head Orthopedic Surgeon', experience: '16 yrs' },
  { name: 'Dr. Sarah Wilson', role: 'Director of OB-GYN & Fetal Medicine', experience: '12 yrs' },
  { name: 'Dr. Vikram Singh', role: 'Chief of Anesthesia & Critical Care', experience: '14 yrs' },
  { name: 'Dr. Meera Nambiar', role: 'Director of Pathology & Diagnostics', experience: '9 yrs' },
];

export function AssignHeadModal({
  isOpen,
  onClose,
  departments,
  selectedDepartmentId,
  onAssignHead,
}: AssignHeadModalProps) {
  const [deptId, setDeptId] = useState(selectedDepartmentId || departments[0]?.id || '');
  const [selectedCandidate, setSelectedCandidate] = useState(AVAILABLE_HEAD_CANDIDATES[0].name);
  const [effectiveDate, setEffectiveDate] = useState('Immediate (Today)');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync state if selectedDepartmentId prop changes
  React.useEffect(() => {
    if (selectedDepartmentId) {
      setDeptId(selectedDepartmentId);
    } else if (departments.length > 0 && !deptId) {
      setDeptId(departments[0].id);
    }
  }, [selectedDepartmentId, departments, deptId]);

  if (!isOpen) return null;

  const currentDept = departments.find((d) => d.id === deptId) || departments[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptId || !selectedCandidate) return;

    onAssignHead(deptId, selectedCandidate);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Assign Department Head</h2>
              <p className="text-xs text-slate-500">Designate clinical leadership and administrative authority</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Banner */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Department Head Assigned!</h3>
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">{selectedCandidate}</span> is now the Head of{' '}
              <span className="font-semibold text-slate-700">{currentDept?.name}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Department Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Department
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={deptId}
                  onChange={(e) => setDeptId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} (Current Head: {dept.head})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Candidate Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Doctor / Lead
              </label>
              <div className="relative">
                <Stethoscope className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={selectedCandidate}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {AVAILABLE_HEAD_CANDIDATES.map((cand) => (
                    <option key={cand.name} value={cand.name}>
                      {cand.name} — {cand.role} ({cand.experience})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Effective Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Effective Timeline
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  placeholder="e.g. Immediate or 1st of next month"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Justification / Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Administrative Remarks / Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Brief justification or transition handover memo..."
                className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Notice */}
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700 flex items-start gap-2">
              <span className="font-bold">Notice:</span>
              <span>
                Assigning a new head immediately updates department authorization policies, roster approvals, and
                clinical sign-off authority for this hospital wing.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                Confirm Assignment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
