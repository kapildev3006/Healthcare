'use client';

import React, { useState } from 'react';
import { DoctorSidebar } from '@/components/doctor/DoctorSidebar';
import { DoctorHeader } from '@/components/doctor/DoctorHeader';

// Components
import { BreakGlassPageHeader } from '@/components/doctor/emergency-break-glass/BreakGlassPageHeader';
import { EmergencyWarningBanner } from '@/components/doctor/emergency-break-glass/EmergencyWarningBanner';
import { RequestEmergencyAccessFormCard } from '@/components/doctor/emergency-break-glass/RequestEmergencyAccessFormCard';
import { RecentEmergencyAccessesTableCard } from '@/components/doctor/emergency-break-glass/RecentEmergencyAccessesTableCard';
import { WhenToUseCard } from '@/components/doctor/emergency-break-glass/WhenToUseCard';
import { WhatHappensNextCard } from '@/components/doctor/emergency-break-glass/WhatHappensNextCard';
import { ImportantGuidelinesCard } from '@/components/doctor/emergency-break-glass/ImportantGuidelinesCard';
import { NeedHelpCard } from '@/components/doctor/emergency-break-glass/NeedHelpCard';

// Modal
import { BreakGlassDetailModal } from '@/components/doctor/emergency-break-glass/modals/BreakGlassDetailModal';

// Mock Data & Types
import { mockRecentEmergencyAccesses } from '@/features/doctor/emergencyBreakGlassMockData';
import {
  RecentEmergencyAccessItem,
  BreakGlassFormData,
} from '@/features/doctor/emergencyBreakGlassTypes';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function DoctorEmergencyBreakGlassPage() {
  const [accessesList, setAccessesList] = useState<RecentEmergencyAccessItem[]>(
    mockRecentEmergencyAccesses
  );
  const [selectedItemForModal, setSelectedItemForModal] =
    useState<RecentEmergencyAccessItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    }, 4000);
  };

  const handleFormSubmit = (data: BreakGlassFormData) => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Create new record
      const matchName = data.patientQuery.split('(')[0].trim();
      const initials = matchName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

      const newRecord: RecentEmergencyAccessItem = {
        id: `bg-${Date.now().toString().slice(-4)}`,
        patientName: matchName || 'Emergency Patient',
        patientUhid:
          data.patientQuery.includes('MLK')
            ? data.patientQuery.match(/MLK\d+/)?.[0] || 'MLK09921'
            : 'MLK09921',
        initials: initials || 'EP',
        reason: data.selectedReason,
        accessScope: data.accessScope,
        requestedOn: 'Just now, 10:24 AM',
        duration: data.accessDuration,
        status: 'Active',
        accessorName: 'Dr. Kapil Dev',
        accessorRole: 'General Physician',
        clinicalNotes:
          data.additionalDetails ||
          'Emergency break-glass access invoked by attending physician under genuine clinical urgency.',
      };

      setAccessesList((prev) => [newRecord, ...prev]);

      showToast(
        `Emergency break-glass access authorized for ${newRecord.patientName}. Action logged and patient notified.`,
        'alert'
      );
    }, 600);
  };

  const handleViewDetails = (item: RecentEmergencyAccessItem) => {
    setSelectedItemForModal(item);
    setIsDetailModalOpen(true);
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
              'input[placeholder*="Search by name"]'
            );
            input?.focus();
          }}
          onNotificationsClick={() =>
            showToast(
              'You have 3 unread emergency & access notifications.',
              'info'
            )
          }
        />

        {/* Page Content Body with Independent Scrollbar */}
        <main className="flex-1 workspace-scroll p-6 lg:p-8 space-y-5 max-w-[1600px] w-full mx-auto pb-16">
          {/* Header row with Red Alert icon and Hospital info */}
          <BreakGlassPageHeader
            hospitalName="CityCare Hospital"
            hospitalLocation="Noida, Uttar Pradesh"
            dateStr="Tue, 16 Sep 2026"
            timeStr="10:24 AM"
          />

          {/* Red Warning Banner */}
          <EmergencyWarningBanner />

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 cols): Request Form & Recent Emergency Accesses */}
            <div className="lg:col-span-8 space-y-6">
              {/* Form Card */}
              <RequestEmergencyAccessFormCard
                onSubmit={handleFormSubmit}
                isLoading={isSubmitting}
              />

              {/* Recent Accesses Table Card */}
              <RecentEmergencyAccessesTableCard
                accesses={accessesList}
                onViewDetails={handleViewDetails}
                onViewAllLogs={() =>
                  showToast(
                    'Opening full hospital audit trail for emergency access logs...',
                    'info'
                  )
                }
              />
            </div>

            {/* Right Column (4 cols): 4 Information & Guideline Cards */}
            <div className="lg:col-span-4 space-y-4">
              {/* When to Use Emergency Access */}
              <WhenToUseCard />

              {/* What Happens Next */}
              <WhatHappensNextCard />

              {/* Important Guidelines */}
              <ImportantGuidelinesCard />

              {/* Need Help */}
              <NeedHelpCard />
            </div>
          </div>
        </main>
      </div>

      {/* Modal: View Break-Glass Log Details */}
      <BreakGlassDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        item={selectedItemForModal}
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
