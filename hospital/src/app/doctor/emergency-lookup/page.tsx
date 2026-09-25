'use client';

import React, { useState } from 'react';
import { DoctorSidebar } from '@/components/doctor/DoctorSidebar';
import { DoctorHeader } from '@/components/doctor/DoctorHeader';
import { DoctorGreetingHeader } from '@/components/doctor/dashboard/DoctorGreetingHeader';

// Components
import { EmergencySearchCard } from '@/components/doctor/emergency-lookup/EmergencySearchCard';
import { PatientEmergencyProfileCard } from '@/components/doctor/emergency-lookup/PatientEmergencyProfileCard';
import { CriticalMedicalSnapshotRow } from '@/components/doctor/emergency-lookup/CriticalMedicalSnapshotRow';
import { EmergencyHistoryTablesRow } from '@/components/doctor/emergency-lookup/EmergencyHistoryTablesRow';
import { EmergencyNoticeSidebarCard } from '@/components/doctor/emergency-lookup/EmergencyNoticeSidebarCard';
import { CriticalAlertActionCard } from '@/components/doctor/emergency-lookup/CriticalAlertActionCard';
import { EmergencyAccessLogCard } from '@/components/doctor/emergency-lookup/EmergencyAccessLogCard';
import { RequestAccessCtaCard } from '@/components/doctor/emergency-lookup/RequestAccessCtaCard';
import { EmergencyDisclaimerBanner } from '@/components/doctor/emergency-lookup/EmergencyDisclaimerBanner';

// Modals
import { FullMedicalRecordModal } from '@/components/doctor/emergency-lookup/modals/FullMedicalRecordModal';
import { RequestExtendedAccessModal } from '@/components/doctor/emergency-lookup/modals/RequestExtendedAccessModal';
import { QrScannerLookupModal } from '@/components/doctor/emergency-lookup/modals/QrScannerLookupModal';
import { AccessPolicyModal } from '@/components/doctor/patient-search/modals/AccessPolicyModal';

// Mock Data & Types
import { mockEmergencyPatientData } from '@/features/doctor/emergencyLookupMockData';
import { EmergencyLookupTab } from '@/features/doctor/emergencyLookupTypes';
import { AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DoctorEmergencyLookupPage() {
  const [searchQuery, setSearchQuery] = useState('91-2345-6789-1234');
  const [activeTab, setActiveTab] = useState<EmergencyLookupTab>('health-id');
  const [patientData, setPatientData] = useState(mockEmergencyPatientData);

  // Modals
  const [isFullRecordOpen, setIsFullRecordOpen] = useState(false);
  const [isExtendedAccessOpen, setIsExtendedAccessOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
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

  const handleLookup = () => {
    showToast(`Emergency lookup resolved record for ${patientData.name}.`, 'alert');
  };

  const handleQrScanSuccess = (healthId: string, name: string) => {
    setSearchQuery(healthId);
    showToast(`Emergency QR scan resolved for ${name} (${healthId}).`, 'alert');
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
            const input = document.querySelector<HTMLInputElement>('input[placeholder*="Health ID"]');
            input?.focus();
          }}
          onNotificationsClick={() =>
            showToast('You have 3 unread emergency & access notifications.', 'info')
          }
        />

        {/* Page Content Body with Independent Scrollbar */}
        <main className="flex-1 workspace-scroll p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto pb-16">
          {/* Greeting Header & Location */}
          <DoctorGreetingHeader
            doctorName="Dr. Kapil Dev"
            hospitalName="CityCare Hospital"
            hospitalLocation="Noida, Uttar Pradesh"
            dateStr="Tue, 16 Sep 2026"
            timeStr="10:24 AM"
          />

          {/* Emergency Title Banner */}
          <div className="-mt-3 flex items-start gap-3 pb-1">
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
              <AlertTriangle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                Emergency Lookup
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Get immediate access to critical patient information in emergency situations.
              </p>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 cols): Search, Profile, Snapshot, Tables, Disclaimer */}
            <div className="lg:col-span-8 space-y-5">
              {/* Search Card */}
              <EmergencySearchCard
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onLookup={handleLookup}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onScanQrClick={() => setIsQrScannerOpen(true)}
              />

              {/* Patient Emergency Profile Overview */}
              <PatientEmergencyProfileCard patient={patientData} />

              {/* 3 Critical Medical Snapshot Cards */}
              <CriticalMedicalSnapshotRow
                allergies={patientData.allergies}
                chronicConditions={patientData.chronicConditions}
                currentMedications={patientData.currentMedications}
                onConditionInfoClick={(c) => {
                  showToast(`Condition info: ${c.name} (${c.sinceYear})`, 'info');
                }}
              />

              {/* History Tables: Recent Encounters & Recent Reports */}
              <EmergencyHistoryTablesRow
                encounters={patientData.recentEncounters}
                reports={patientData.recentReports}
                onViewAllEncounters={() =>
                  showToast('Viewing full historical clinical encounters...', 'info')
                }
                onViewAllReports={() =>
                  showToast('Viewing diagnostic reports archive...', 'info')
                }
                onSelectEncounter={(enc) => {
                  showToast(`Encounter: ${enc.reason} by ${enc.doctor}`, 'info');
                }}
                onSelectReport={(rep) => {
                  showToast(`Report: ${rep.reportType} (${rep.findings})`, 'info');
                }}
              />

              {/* Disclaimer Banner */}
              <EmergencyDisclaimerBanner />
            </div>

            {/* Right Column (4 cols): For Emergency Notice, Critical Alert, Access Log, Request Access */}
            <div className="lg:col-span-4 space-y-5">
              {/* For Emergency Use Only Card */}
              <EmergencyNoticeSidebarCard
                onViewPolicy={() => setIsPolicyModalOpen(true)}
              />

              {/* Critical Information Available Card */}
              <CriticalAlertActionCard
                onViewFullRecord={() => setIsFullRecordOpen(true)}
                onRequestExtendedAccess={() => setIsExtendedAccessOpen(true)}
              />

              {/* Emergency Access Log Card */}
              <EmergencyAccessLogCard
                logs={patientData.accessLogs}
                onViewAll={() =>
                  showToast('Opening complete hospital emergency audit log...', 'info')
                }
              />

              {/* Need to Request Access CTA Card */}
              <RequestAccessCtaCard
                onRequestAccess={() => {
                  showToast('Opening standard patient consent request workflow...', 'info');
                }}
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
      <FullMedicalRecordModal
        isOpen={isFullRecordOpen}
        onClose={() => setIsFullRecordOpen(false)}
        patient={patientData}
      />

      <RequestExtendedAccessModal
        isOpen={isExtendedAccessOpen}
        onClose={() => setIsExtendedAccessOpen(false)}
        patient={patientData}
        onSubmitExtension={(hours, reason) => {
          showToast(
            `Extended access request for ${hours} hours submitted. Audit recorded.`,
            'alert'
          );
        }}
      />

      <QrScannerLookupModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        onScanSuccess={handleQrScanSuccess}
      />

      <AccessPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />
    </div>
  );
}
