'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/hospital-admin/Sidebar';
import { Header } from '@/components/hospital-admin/Header';
import { DetailHeader } from '@/components/hospital-admin/emergency-audit/detail/DetailHeader';
import { EventOverviewCard } from '@/components/hospital-admin/emergency-audit/detail/EventOverviewCard';
import { AccessTimelineCard } from '@/components/hospital-admin/emergency-audit/detail/AccessTimelineCard';
import { AccessedCategoriesCard } from '@/components/hospital-admin/emergency-audit/detail/AccessedCategoriesCard';
import { DetailPatientNotificationCard } from '@/components/hospital-admin/emergency-audit/detail/DetailPatientNotificationCard';
import { AuditEvidenceCard } from '@/components/hospital-admin/emergency-audit/detail/AuditEvidenceCard';
import { JustificationCard } from '@/components/hospital-admin/emergency-audit/detail/JustificationCard';
import { ReviewerNotesCard } from '@/components/hospital-admin/emergency-audit/detail/ReviewerNotesCard';
import { LocationDeviceCard } from '@/components/hospital-admin/emergency-audit/detail/LocationDeviceCard';
import { RiskActionPanel } from '@/components/hospital-admin/emergency-audit/detail/RiskActionPanel';
import { ReviewChecklistCard } from '@/components/hospital-admin/emergency-audit/detail/ReviewChecklistCard';

import { EscalateInvestigationModal } from '@/components/hospital-admin/emergency-audit/detail/EscalateInvestigationModal';
import { NotificationDetailsModal } from '@/components/hospital-admin/emergency-audit/detail/NotificationDetailsModal';
import { PatientRecordPreviewModal } from '@/components/hospital-admin/emergency-audit/detail/PatientRecordPreviewModal';
import { EditReviewerNotesModal } from '@/components/hospital-admin/emergency-audit/detail/EditReviewerNotesModal';

import {
  mockEmergencyDetailOverview,
  mockAccessTimeline,
  mockAccessedCategories,
  mockRelatedAuditEvidence,
  mockJustificationData,
  mockReviewerNotesData,
  mockLocationDeviceData,
  mockReviewChecklist,
} from '@/features/hospital-admin/emergencyAuditDetailMockData';
import {
  EmergencyDetailOverview,
  ReviewerNotesData,
  ReviewChecklistItem,
  AuditEvidenceItem,
} from '@/features/hospital-admin/emergencyAuditDetailTypes';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function EmergencyAccessDetailPage() {
  const [activeTab, setActiveTab] = useState('Emergency Access Audit');
  const [headerSearch, setHeaderSearch] = useState('');

  // Main Page States
  const [overview, setOverview] = useState<EmergencyDetailOverview>(mockEmergencyDetailOverview);
  const [reviewerNotes, setReviewerNotes] = useState<ReviewerNotesData>(mockReviewerNotesData);
  const [checklist, setChecklist] = useState<ReviewChecklistItem[]>(mockReviewChecklist);

  // Modal States
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isPatientRecordModalOpen, setIsPatientRecordModalOpen] = useState(false);
  const [isEditNotesModalOpen, setIsEditNotesModalOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'info';
  }>({ show: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3800);
  };

  // Actions
  const handleMarkReviewed = () => {
    setOverview((prev) => ({
      ...prev,
      isReviewed: true,
      reviewStatus: 'Reviewed',
      reviewedBy: 'Rajesh Kumar (Hospital Administrator)',
      reviewedAt: 'Jun 12, 2025 09:15 AM',
    }));
    showToast('Event EA-20250612-77123 verified and marked Reviewed.', 'success');
  };

  const handleEscalateConfirm = (reason: string, notes: string) => {
    setOverview((prev) => ({
      ...prev,
      reviewStatus: 'Under Review',
    }));
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === 'chk-7' ? { ...item, completed: true } : item
      )
    );
    showToast(`Escalation registered: "${reason}". Compliance board notified.`, 'info');
  };

  const handleToggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleSaveNotes = (newNotes: string) => {
    setReviewerNotes((prev) => ({
      ...prev,
      notes: newNotes,
      timestamp: 'Just now',
    }));
    showToast('Compliance reviewer notes updated.', 'success');
  };

  const handleDownloadReport = () => {
    const reportData = {
      event: overview,
      timeline: mockAccessTimeline,
      categories: mockAccessedCategories,
      evidence: mockRelatedAuditEvidence,
      justification: mockJustificationData,
      reviewerNotes: reviewerNotes,
      locationDevice: mockLocationDeviceData,
      checklist: checklist,
      generatedAt: new Date().toISOString(),
      integrityHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emergency-audit-report-${overview.eventId}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast(`Downloaded full audit report for ${overview.eventId}.`, 'success');
  };

  const handleDownloadEvidence = (item: AuditEvidenceItem) => {
    const content = `Evidence Record: ${item.title}\nFilename: ${item.filename}\nEvent ID: ${overview.eventId}\nVerified by Hospital Administrator.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded evidence file: ${item.filename}`, 'info');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* 1. Shared Hospital Admin Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Global Hospital Admin Header */}
        <Header
          searchQuery={headerSearch}
          onSearchChange={(val) => setHeaderSearch(val)}
          onNotificationClick={() => setIsNotificationModalOpen(true)}
        />

        {/* Content Body Container */}
        <main className="p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto space-y-6">
          {/* Back link + Header Title & Subtitle + Date Banner */}
          <DetailHeader />

          {/* Top Card: Emergency Access Event Overview */}
          <EventOverviewCard overview={overview} />

          {/* 2-Column Main Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left / Center Major Area (9 cols) */}
            <div className="lg:col-span-9 space-y-5">
              {/* Middle Row: 3 Equal Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                {/* 1. Access Timeline */}
                <AccessTimelineCard timeline={mockAccessTimeline} />

                {/* 2. Accessed Data Categories */}
                <AccessedCategoriesCard categories={mockAccessedCategories} />

                {/* 3. Stacked: Patient Notification Status + Related Audit Evidence */}
                <div className="flex flex-col gap-5 justify-between">
                  <DetailPatientNotificationCard
                    onViewDetails={() => setIsNotificationModalOpen(true)}
                  />
                  <AuditEvidenceCard
                    evidence={mockRelatedAuditEvidence}
                    onDownloadEvidence={handleDownloadEvidence}
                  />
                </div>
              </div>

              {/* Bottom Row: 3 Equal Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                {/* 1. Justification Provided */}
                <JustificationCard justification={mockJustificationData} />

                {/* 2. Reviewer Notes */}
                <ReviewerNotesCard
                  reviewerNotes={reviewerNotes}
                  onEditNotes={() => setIsEditNotesModalOpen(true)}
                />

                {/* 3. Location & Device Information */}
                <LocationDeviceCard locationDevice={mockLocationDeviceData} />
              </div>
            </div>

            {/* Right Column (3 cols) */}
            <div className="lg:col-span-3 space-y-5">
              {/* Risk & Action Panel */}
              <RiskActionPanel
                isReviewed={overview.isReviewed}
                onMarkReviewed={handleMarkReviewed}
                onEscalate={() => setIsEscalateModalOpen(true)}
                onDownloadReport={handleDownloadReport}
                onViewPatientRecord={() => setIsPatientRecordModalOpen(true)}
              />

              {/* Review Checklist */}
              <ReviewChecklistCard
                checklist={checklist}
                onToggleItem={handleToggleChecklistItem}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <EscalateInvestigationModal
        isOpen={isEscalateModalOpen}
        onClose={() => setIsEscalateModalOpen(false)}
        onConfirmEscalation={handleEscalateConfirm}
      />

      <NotificationDetailsModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        onResend={() => {
          showToast('Notification re-dispatched to patient via SMS & Portal.', 'success');
        }}
      />

      <PatientRecordPreviewModal
        isOpen={isPatientRecordModalOpen}
        onClose={() => setIsPatientRecordModalOpen(false)}
      />

      <EditReviewerNotesModal
        isOpen={isEditNotesModalOpen}
        onClose={() => setIsEditNotesModalOpen(false)}
        currentNotes={reviewerNotes}
        onSaveNotes={handleSaveNotes}
      />

      {/* Live Toast Popup */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-medium animate-in slide-in-from-bottom-5 duration-200">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
