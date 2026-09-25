'use client';

import React, { useState, useMemo } from 'react';
import { DoctorSidebar } from '@/components/doctor/DoctorSidebar';
import { DoctorHeader } from '@/components/doctor/DoctorHeader';

// Components
import { MyPatientsHeader } from '@/components/doctor/my-patients/MyPatientsHeader';
import { MyPatientsStatsRow } from '@/components/doctor/my-patients/MyPatientsStatsRow';
import { MyPatientsFilterBar } from '@/components/doctor/my-patients/MyPatientsFilterBar';
import { MyPatientsTableCard } from '@/components/doctor/my-patients/MyPatientsTableCard';
import { MyPatientsQuickActionsCard } from '@/components/doctor/my-patients/MyPatientsQuickActionsCard';
import { UpcomingFollowupsCard } from '@/components/doctor/my-patients/UpcomingFollowupsCard';
import { PatientDataSecureCard } from '@/components/doctor/my-patients/PatientDataSecureCard';

// Modals
import { AddPatientModal } from '@/components/doctor/my-patients/modals/AddPatientModal';
import { PatientQuickViewModal } from '@/components/doctor/my-patients/modals/PatientQuickViewModal';
import { AccessPolicyModal } from '@/components/doctor/patient-search/modals/AccessPolicyModal';

// Mock Data & Types
import {
  mockMyPatientsList,
  mockMyPatientsStats,
  mockUpcomingFollowups,
} from '@/features/doctor/myPatientsMockData';
import {
  MyPatientItem,
  UpcomingFollowupItem,
} from '@/features/doctor/myPatientsTypes';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function DoctorMyPatientsPage() {
  const [patients, setPatients] = useState<MyPatientItem[]>(mockMyPatientsList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedLastVisit, setSelectedLastVisit] = useState('Last Visit (Any)');
  const [sortBy, setSortBy] = useState('Last Visit (Newest)');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [selectedPatientForModal, setSelectedPatientForModal] =
    useState<MyPatientItem | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'alert' | 'info';
  }>({ show: false, message: '', type: 'success' });

  const showToast = (
    message: string,
    type: 'success' | 'alert' | 'info' = 'success'
  ) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3800);
  };

  // Filter & Sort Logic
  const filteredPatients = useMemo(() => {
    let result = [...patients];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.uhid.toLowerCase().includes(q) ||
          p.healthId.toLowerCase().includes(q) ||
          p.primaryCondition.toLowerCase().includes(q)
      );
    }

    if (selectedCondition !== 'All Conditions') {
      result = result.filter((p) => p.primaryCondition === selectedCondition);
    }

    if (selectedStatus !== 'All Status') {
      result = result.filter((p) => p.status === selectedStatus);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'Patient Name (A-Z)') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'Age (High-Low)') {
        return b.age - a.age;
      }
      if (sortBy === 'Last Visit (Oldest)') {
        return a.rowNum - b.rowNum;
      }
      // default: Last Visit (Newest) preserves natural order
      return a.rowNum - b.rowNum;
    });

    return result;
  }, [patients, searchQuery, selectedCondition, selectedStatus, sortBy]);

  const handleAddPatient = (newPatient: MyPatientItem) => {
    setPatients((prev) => [newPatient, ...prev]);
    showToast(
      `Patient ${newPatient.name} (${newPatient.uhid}) added to your clinical panel.`,
      'success'
    );
  };

  const handleExport = () => {
    showToast(
      'Exporting active patient roster to encrypted CSV/PDF format...',
      'info'
    );
  };

  const handleSelectFollowup = (fu: UpcomingFollowupItem) => {
    const matched = patients.find((p) => p.name === fu.name);
    if (matched) {
      setSelectedPatientForModal(matched);
      setIsQuickViewOpen(true);
    } else {
      showToast(`Selected follow-up for ${fu.name}: ${fu.reason}`, 'info');
    }
  };

  return (
    <div className="h-screen w-screen bg-[#f8fafc] text-slate-900 flex overflow-hidden">
      {/* 1. Doctor Sidebar */}
      <DoctorSidebar accessRequestsCount={3} notificationsCount={5} />

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <DoctorHeader
          onSearchClick={() => {
            const input = document.querySelector<HTMLInputElement>(
              'input[placeholder*="Search in my patients"]'
            );
            input?.focus();
          }}
          onNotificationsClick={() =>
            showToast('You have 5 clinical notifications and updates.', 'info')
          }
        />

        {/* Page Content Body with Independent Scrollbar */}
        <main className="flex-1 workspace-scroll p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto pb-16">
          {/* Header Row */}
          <MyPatientsHeader
            hospitalName="CityCare Hospital"
            hospitalLocation="Noida, Uttar Pradesh"
            dateStr="Tue, 16 Sep 2026"
            timeStr="10:24 AM"
          />

          {/* 4 Stats Cards Row */}
          <MyPatientsStatsRow stats={mockMyPatientsStats} />

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 or 9 cols): Search/Filter Bar & Patients Table */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              {/* Search & Filter Bar */}
              <MyPatientsFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCondition={selectedCondition}
                onConditionChange={setSelectedCondition}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                selectedLastVisit={selectedLastVisit}
                onLastVisitChange={setSelectedLastVisit}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                onAddPatientClick={() => setIsAddPatientOpen(true)}
              />

              {/* Patients Table Card */}
              <MyPatientsTableCard
                patients={filteredPatients}
                totalCount={mockMyPatientsStats.totalPatients}
                onViewPatient={(patient) => {
                  setSelectedPatientForModal(patient);
                  setIsQuickViewOpen(true);
                }}
                onExport={handleExport}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>

            {/* Right Column (4 or 3 cols): Quick Actions, Upcoming Follow-ups, Security Card */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-4">
              {/* Quick Actions Card */}
              <MyPatientsQuickActionsCard
                onRequestAccessClick={() =>
                  showToast(
                    'Opening consent request flow for hospital patient...',
                    'info'
                  )
                }
                onCreateEncounterClick={() =>
                  showToast('Initiating new clinical encounter note...', 'info')
                }
              />

              {/* Upcoming Follow-ups Card */}
              <UpcomingFollowupsCard
                followups={mockUpcomingFollowups}
                onViewAll={() =>
                  showToast('Viewing full 30-day clinical appointment schedule...', 'info')
                }
                onSelectFollowup={handleSelectFollowup}
              />

              {/* Patient Data Secure Card */}
              <PatientDataSecureCard
                onViewAccessPolicy={() => setIsPolicyModalOpen(true)}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Modal: Add Patient */}
      <AddPatientModal
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
        onAddPatient={handleAddPatient}
      />

      {/* Modal: Quick Patient View */}
      <PatientQuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        patient={selectedPatientForModal}
      />

      {/* Modal: ABDM Access Policy */}
      <AccessPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm animate-in fade-in slide-in-from-bottom-5 duration-200 ${
            toast.type === 'alert'
              ? 'bg-red-600 text-white border-red-700 shadow-red-500/20'
              : toast.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-500/20'
              : 'bg-slate-900 text-white border-slate-800 shadow-slate-900/30'
          }`}
        >
          {toast.type === 'alert' ? (
            <AlertCircle className="w-5 h-5 shrink-0 text-white" />
          ) : toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />
          ) : (
            <Info className="w-5 h-5 shrink-0 text-blue-400" />
          )}
          <span className="font-medium text-xs sm:text-sm">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
