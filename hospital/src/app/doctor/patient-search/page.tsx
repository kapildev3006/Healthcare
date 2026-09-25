'use client';

import React, { useState, useMemo } from 'react';
import { DoctorSidebar } from '@/components/doctor/DoctorSidebar';
import { DoctorHeader } from '@/components/doctor/DoctorHeader';
import { DoctorGreetingHeader } from '@/components/doctor/dashboard/DoctorGreetingHeader';
import { PatientSearchFiltersCard } from '@/components/doctor/patient-search/PatientSearchFiltersCard';
import { PatientSearchResultsCard } from '@/components/doctor/patient-search/PatientSearchResultsCard';
import { EmergencyLookupSidebarCard } from '@/components/doctor/patient-search/EmergencyLookupSidebarCard';
import { RequestAccessSidebarCard } from '@/components/doctor/patient-search/RequestAccessSidebarCard';
import { RecentSearchesCard } from '@/components/doctor/patient-search/RecentSearchesCard';
import { PrivacySecurityCard } from '@/components/doctor/patient-search/PrivacySecurityCard';

// Modals
import { PatientProfilePreviewModal } from '@/components/doctor/patient-search/modals/PatientProfilePreviewModal';
import { RequestConsentModal } from '@/components/doctor/patient-search/modals/RequestConsentModal';
import { EmergencyLookupModal } from '@/components/doctor/dashboard/modals/EmergencyLookupModal';
import { QrScannerModal } from '@/components/doctor/patient-search/modals/QrScannerModal';
import { AccessPolicyModal } from '@/components/doctor/patient-search/modals/AccessPolicyModal';

// Mock Data & Types
import {
  mockPatientSearchResults,
  mockRecentSearches,
} from '@/features/doctor/patientSearchMockData';
import {
  PatientSearchResultItem,
  SearchTabType,
  PatientSearchFiltersState,
  RecentSearchItem,
} from '@/features/doctor/patientSearchTypes';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function DoctorPatientSearchPage() {
  // Search and Filters State
  const [searchQuery, setSearchQuery] = useState('sharma');
  const [activeTab, setActiveTab] = useState<SearchTabType>('details');
  const [sortBy, setSortBy] = useState('Relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [filters, setFilters] = useState<PatientSearchFiltersState>({
    gender: 'All',
    ageRange: 'All',
    location: 'All',
    patientType: 'All',
    accessStatus: 'All',
  });

  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>(mockRecentSearches);

  // Modals
  const [selectedPatient, setSelectedPatient] = useState<PatientSearchResultItem | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'alert' | 'info';
  }>({ show: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'alert' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3800);
  };

  // Filtered & Sorted Patients
  const filteredPatients = useMemo(() => {
    let list = mockPatientSearchResults;

    // Filter by Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.uhid.toLowerCase().includes(q) ||
          p.healthId.toLowerCase().includes(q) ||
          (p.phone && p.phone.toLowerCase().includes(q))
      );
    }

    // Filter by Gender
    if (filters.gender !== 'All') {
      list = list.filter((p) => p.gender === filters.gender);
    }

    // Filter by Age Range
    if (filters.ageRange !== 'All') {
      if (filters.ageRange === '0-18') list = list.filter((p) => p.age <= 18);
      else if (filters.ageRange === '19-40') list = list.filter((p) => p.age >= 19 && p.age <= 40);
      else if (filters.ageRange === '41-60') list = list.filter((p) => p.age >= 41 && p.age <= 60);
      else if (filters.ageRange === '60+') list = list.filter((p) => p.age > 60);
    }

    // Filter by Location / Department
    if (filters.location !== 'All') {
      list = list.filter((p) => p.lastVisitDepartment.toLowerCase().includes(filters.location.toLowerCase()));
    }

    // Filter by Access Status
    if (filters.accessStatus !== 'All') {
      list = list.filter((p) => p.accessStatus === filters.accessStatus);
    }

    // Sorting
    if (sortBy === 'Name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'Age') {
      list = [...list].sort((a, b) => a.age - b.age);
    }

    return list;
  }, [searchQuery, filters, sortBy]);

  // Pagination Slice
  const totalCount = filteredPatients.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;
  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(start, start + itemsPerPage);
  }, [filteredPatients, currentPage, itemsPerPage]);

  // Handlers
  const handleFilterChange = (key: keyof PatientSearchFiltersState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      gender: 'All',
      ageRange: 'All',
      location: 'All',
      patientType: 'All',
      accessStatus: 'All',
    });
    setSearchQuery('sharma');
    setCurrentPage(1);
    showToast('Filters reset to default.', 'info');
  };

  const handleSelectRecentSearch = (item: RecentSearchItem) => {
    setSearchQuery(item.query);
    setCurrentPage(1);
  };

  const handleClearAllRecent = () => {
    setRecentSearches([]);
    showToast('Recent searches cleared.', 'info');
  };

  const handleViewProfile = (patient: PatientSearchResultItem) => {
    setSelectedPatient(patient);
    setIsProfileModalOpen(true);
  };

  const handleRequestAccess = (patient: PatientSearchResultItem) => {
    setSelectedPatient(patient);
    setIsConsentModalOpen(true);
  };

  const handleQrScanSuccess = (healthId: string, name: string) => {
    setSearchQuery(name);
    setCurrentPage(1);
    showToast(`Health Card resolved for ${name} (${healthId})`, 'success');
  };

  return (
    <div className="h-screen w-screen bg-[#f8fafc] text-slate-900 flex overflow-hidden">
      {/* 1. Doctor Sidebar with separate scrollbar */}
      <DoctorSidebar accessRequestsCount={3} notificationsCount={5} />

      {/* 2. Main Content with separate scrollbar */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header pinned at top */}
        <DoctorHeader
          onSearchClick={() => {
            const input = document.querySelector<HTMLInputElement>('input[placeholder*="patient name"]');
            input?.focus();
          }}
          onNotificationsClick={() =>
            showToast('You have 3 unread emergency & access notifications.', 'info')
          }
        />

        {/* Page Content with independent scrolling */}
        <main className="flex-1 workspace-scroll p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto pb-16">
          {/* Greeting & Header */}
          <DoctorGreetingHeader
            doctorName="Dr. Kapil Dev"
            hospitalName="CityCare Hospital"
            hospitalLocation="Noida, Uttar Pradesh"
            dateStr="Tue, 16 Sep 2026"
            timeStr="10:24 AM"
          />

          {/* Page Title & Subtitle Override */}
          <div className="-mt-3 pb-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Patient Search
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Find and access patient records securely
            </p>
          </div>

          {/* 2-Column Main Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Search & Filter Card + Results (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              {/* Search Filters Card */}
              <PatientSearchFiltersCard
                searchQuery={searchQuery}
                onSearchChange={(q) => {
                  setSearchQuery(q);
                  setCurrentPage(1);
                }}
                onSearchSubmit={() => {
                  showToast(`Searching records for "${searchQuery}"...`, 'info');
                }}
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  if (tab === 'health-id') setSearchQuery('91-2345-6789');
                  else if (tab === 'phone') setSearchQuery('+91 98');
                  else setSearchQuery('sharma');
                  setCurrentPage(1);
                }}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onScanQrClick={() => setIsQrModalOpen(true)}
              />

              {/* Search Results Table Card */}
              <PatientSearchResultsCard
                results={paginatedPatients}
                totalCount={totalCount}
                queryText={searchQuery}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onViewProfile={handleViewProfile}
                onRequestAccess={handleRequestAccess}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* Right Column: Emergency, Request Access, Recent Searches, Policy (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Emergency Lookup CTA */}
              <EmergencyLookupSidebarCard
                onOpenEmergency={() => setIsEmergencyModalOpen(true)}
              />

              {/* Request Patient Access CTA */}
              <RequestAccessSidebarCard
                onRequestAccess={() => {
                  setSelectedPatient(mockPatientSearchResults[1]); // Neha Sharma
                  setIsConsentModalOpen(true);
                }}
              />

              {/* Recent Searches */}
              <RecentSearchesCard
                searches={recentSearches}
                onSelectSearch={handleSelectRecentSearch}
                onClearAll={handleClearAllRecent}
              />

              {/* Privacy & Security */}
              <PrivacySecurityCard
                onViewPolicy={() => setIsPolicyModalOpen(true)}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Toast Feedback */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-200">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium ${
              toast.type === 'alert'
                ? 'bg-red-900 text-white border-red-700'
                : toast.type === 'info'
                ? 'bg-slate-900 text-white border-slate-700'
                : 'bg-emerald-900 text-white border-emerald-700'
            }`}
          >
            {toast.type === 'alert' ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <PatientProfilePreviewModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        patient={selectedPatient}
        onOpenRecord={(p) => {
          showToast(`Opening longitudinal health record for ${p.name}...`, 'info');
        }}
        onCreateEncounter={(p) => {
          showToast(`Initiating consultation encounter for ${p.name}...`, 'success');
        }}
      />

      <RequestConsentModal
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
        patient={selectedPatient}
        onSubmitRequest={(p, scope, dur) => {
          showToast(
            `Access consent request sent to ${p.name} for ${dur}.`,
            'success'
          );
        }}
      />

      <EmergencyLookupModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onSubmitOverride={(id, reason) => {
          showToast(
            `Emergency break-glass access authorized for ${id}. Audit record created.`,
            'alert'
          );
        }}
      />

      <QrScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onScanSuccess={handleQrScanSuccess}
      />

      <AccessPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />
    </div>
  );
}
