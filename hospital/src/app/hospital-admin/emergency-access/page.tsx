'use client';

import React, { useState, useMemo } from 'react';
import { Sidebar } from '@/components/hospital-admin/Sidebar';
import { Header } from '@/components/hospital-admin/Header';
import { EmergencyAuditHeader } from '@/components/hospital-admin/emergency-audit/EmergencyAuditHeader';
import { EmergencyAuditStatsRow } from '@/components/hospital-admin/emergency-audit/EmergencyAuditStatsRow';
import { EmergencyAccessTable } from '@/components/hospital-admin/emergency-audit/EmergencyAccessTable';
import { CriticalAlertsCard } from '@/components/hospital-admin/emergency-audit/CriticalAlertsCard';
import { PatientNotificationStatusCard } from '@/components/hospital-admin/emergency-audit/PatientNotificationStatusCard';
import { EmergencyComplianceCard } from '@/components/hospital-admin/emergency-audit/EmergencyComplianceCard';

import { ReviewEmergencyModal } from '@/components/hospital-admin/emergency-audit/ReviewEmergencyModal';
import { ViewEmergencyModal } from '@/components/hospital-admin/emergency-audit/ViewEmergencyModal';
import { ExportEmergencyModal } from '@/components/hospital-admin/emergency-audit/ExportEmergencyModal';
import { CriticalAlertsModal } from '@/components/hospital-admin/emergency-audit/CriticalAlertsModal';
import { PatientNotificationModal } from '@/components/hospital-admin/emergency-audit/PatientNotificationModal';

import {
  mockEmergencyAuditStats,
  mockEmergencyEvents,
  mockCriticalAlerts,
  mockPatientNotificationStatus,
  mockEmergencyComplianceItems,
} from '@/features/hospital-admin/emergencyAuditMockData';
import {
  EmergencyAccessEvent,
  CriticalAlertItem,
} from '@/features/hospital-admin/emergencyAuditTypes';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function EmergencyAccessAuditPage() {
  const [activeTab, setActiveTab] = useState('Emergency Access Audit');
  const [headerSearch, setHeaderSearch] = useState('');

  // Main Datasets State
  const [stats, setStats] = useState(mockEmergencyAuditStats);
  const [events, setEvents] = useState<EmergencyAccessEvent[]>(mockEmergencyEvents);
  const [alerts, setAlerts] = useState<CriticalAlertItem[]>(mockCriticalAlerts);

  // Modal States
  const [selectedEventForReview, setSelectedEventForReview] = useState<EmergencyAccessEvent | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [selectedEventForView, setSelectedEventForView] = useState<EmergencyAccessEvent | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCriticalAlertsModalOpen, setIsCriticalAlertsModalOpen] = useState(false);
  const [isPatientNotificationModalOpen, setIsPatientNotificationModalOpen] = useState(false);

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

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    if (!headerSearch.trim()) return events;
    const query = headerSearch.toLowerCase().trim();
    return events.filter(
      (e) =>
        e.user.toLowerCase().includes(query) ||
        e.patientRecord.toLowerCase().includes(query) ||
        e.emergencyReason.toLowerCase().includes(query) ||
        e.department.toLowerCase().includes(query) ||
        e.auditStatus.toLowerCase().includes(query)
    );
  }, [events, headerSearch]);

  // Handlers for Row Actions
  const handleOpenReview = (event: EmergencyAccessEvent) => {
    setSelectedEventForReview(event);
    setIsReviewModalOpen(true);
  };

  const handleOpenView = (event: EmergencyAccessEvent) => {
    setSelectedEventForView(event);
    setIsViewModalOpen(true);
  };

  // Approve review action
  const handleApproveReview = (eventId: string, notes: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              auditStatus: 'Reviewed' as const,
              reviewNotes: notes || 'Approved by Hospital Administrator. Compliance verified.',
            }
          : e
      )
    );

    // Update awaiting review count
    setStats((prev) => ({
      ...prev,
      awaitingReview: Math.max(0, prev.awaitingReview - 1),
    }));

    showToast(`Audit reviewed and approved for ${eventId}. Immutable record updated.`, 'success');
  };

  // Revoke / Flag emergency session
  const handleRevokeSession = (eventId: string, reason: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              auditStatus: 'Expired' as const,
              reviewNotes: `Flagged & Terminated: ${reason}`,
            }
          : e
      )
    );

    setStats((prev) => ({
      ...prev,
      activeSessions: Math.max(0, prev.activeSessions - 1),
      awaitingReview: Math.max(0, prev.awaitingReview - 1),
    }));

    showToast(`Emergency session ${eventId} revoked immediately. Security incident logged.`, 'info');
  };

  // Resolve alert
  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    showToast('Critical alert resolved and cleared from review queue.', 'success');
  };

  // Card clicks
  const handleStatCardClick = (cardType: string) => {
    if (cardType === 'events' || cardType === 'active') {
      showToast(`Filtering view for ${cardType === 'events' ? 'Emergency Events' : 'Active Sessions'}.`, 'info');
    } else if (cardType === 'high-risk') {
      setIsCriticalAlertsModalOpen(true);
    } else if (cardType === 'awaiting') {
      const pendingEvent = events.find((e) => e.auditStatus === 'Under Review');
      if (pendingEvent) {
        handleOpenReview(pendingEvent);
      } else {
        showToast('All pending emergency events have been reviewed.', 'info');
      }
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* 1. Main Hospital Admin Navigation Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Global Hospital Administrator Header */}
        <Header
          searchQuery={headerSearch}
          onSearchChange={(val) => setHeaderSearch(val)}
          onNotificationClick={() => setIsPatientNotificationModalOpen(true)}
        />

        {/* Content Body Container */}
        <main className="p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto space-y-6">
          {/* Header Title & Date Banner */}
          <EmergencyAuditHeader />

          {/* 4 Metric Stats Cards */}
          <EmergencyAuditStatsRow
            stats={stats}
            onCardClick={handleStatCardClick}
          />

          {/* Emergency Access Events Main Table */}
          <EmergencyAccessTable
            events={filteredEvents}
            onExport={() => setIsExportModalOpen(true)}
            onViewAll={() => {
              setHeaderSearch('');
              showToast('Displaying all break-glass emergency access logs.', 'info');
            }}
            onReviewEvent={handleOpenReview}
            onViewEvent={handleOpenView}
          />

          {/* Bottom 3 Equal Status & Compliance Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* 1. Critical Alerts Requiring Follow-up */}
            <CriticalAlertsCard
              alerts={alerts}
              onViewAll={() => setIsCriticalAlertsModalOpen(true)}
              onSelectAlert={(item) => {
                const matchedEvent = events.find((e) => e.id === item.eventId);
                if (matchedEvent) {
                  handleOpenReview(matchedEvent);
                } else {
                  setIsCriticalAlertsModalOpen(true);
                }
              }}
            />

            {/* 2. Patient Notification Status */}
            <PatientNotificationStatusCard
              data={mockPatientNotificationStatus}
              onViewAll={() => setIsPatientNotificationModalOpen(true)}
            />

            {/* 3. Emergency Access Compliance */}
            <EmergencyComplianceCard items={mockEmergencyComplianceItems} />
          </div>
        </main>
      </div>

      {/* Review Modal */}
      <ReviewEmergencyModal
        event={selectedEventForReview}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedEventForReview(null);
        }}
        onApprove={handleApproveReview}
        onRevoke={handleRevokeSession}
      />

      {/* View Event Modal */}
      <ViewEmergencyModal
        event={selectedEventForView}
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedEventForView(null);
        }}
        onOpenReview={handleOpenReview}
      />

      {/* Export Modal */}
      <ExportEmergencyModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        events={events}
        onExportSuccess={(format) => {
          showToast(`Emergency access audit trail exported successfully as ${format}.`, 'success');
        }}
      />

      {/* Critical Alerts Modal */}
      <CriticalAlertsModal
        isOpen={isCriticalAlertsModalOpen}
        onClose={() => setIsCriticalAlertsModalOpen(false)}
        alerts={alerts}
        onSelectAlert={(alert) => {
          setIsCriticalAlertsModalOpen(false);
          const matchedEvent = events.find((e) => e.id === alert.eventId);
          if (matchedEvent) {
            handleOpenReview(matchedEvent);
          }
        }}
        onResolveAlert={handleResolveAlert}
      />

      {/* Patient Notification Logs Modal */}
      <PatientNotificationModal
        isOpen={isPatientNotificationModalOpen}
        onClose={() => setIsPatientNotificationModalOpen(false)}
        onResendNotification={(id) => {
          showToast(`Patient notification retry initiated for ${id}.`, 'success');
        }}
      />

      {/* Toast Notification Popup */}
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
