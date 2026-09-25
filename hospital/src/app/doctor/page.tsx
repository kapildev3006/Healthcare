'use client';

import React, { useState, useEffect } from 'react';
import { DoctorSidebar } from '@/components/doctor/DoctorSidebar';
import { DoctorHeader } from '@/components/doctor/DoctorHeader';
import { DoctorGreetingHeader } from '@/components/doctor/dashboard/DoctorGreetingHeader';
import { DoctorStatsRow } from '@/components/doctor/dashboard/DoctorStatsRow';
import { TodayAppointmentsCard } from '@/components/doctor/dashboard/TodayAppointmentsCard';
import { EmergencyAlertsCard } from '@/components/doctor/dashboard/EmergencyAlertsCard';
import { AiInsightsCard } from '@/components/doctor/dashboard/AiInsightsCard';
import { QuickActionsCard } from '@/components/doctor/dashboard/QuickActionsCard';
import { PatientActivityBarChart } from '@/components/doctor/dashboard/PatientActivityBarChart';
import { PatientDistributionDonutChart } from '@/components/doctor/dashboard/PatientDistributionDonutChart';
import { RecentActivityCard } from '@/components/doctor/dashboard/RecentActivityCard';

// Modals
import { AppointmentDetailModal } from '@/components/doctor/dashboard/modals/AppointmentDetailModal';
import { AiFindingReviewModal } from '@/components/doctor/dashboard/modals/AiFindingReviewModal';
import { QuickPatientSearchModal } from '@/components/doctor/dashboard/modals/QuickPatientSearchModal';
import { EmergencyLookupModal } from '@/components/doctor/dashboard/modals/EmergencyLookupModal';
import { CreateEncounterModal } from '@/components/doctor/dashboard/modals/CreateEncounterModal';

// Mock Data
import {
  mockDoctorStats,
  mockAppointments,
  mockEmergencyAlerts,
  mockAiInsights,
  mockQuickActions,
  mockDailyActivityData,
  mockDepartmentDistribution,
  mockDoctorRecentActivity,
} from '@/features/doctor/doctorDashboardMockData';
import {
  AppointmentItem,
  EmergencyAlertItem,
  AiInsightItem,
  DoctorRecentActivityItem,
} from '@/features/doctor/doctorDashboardTypes';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function DoctorDashboardPage() {
  // Modal States
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const [selectedAlert, setSelectedAlert] = useState<EmergencyAlertItem | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isEmergencyLookupOpen, setIsEmergencyLookupOpen] = useState(false);
  const [isCreateEncounterOpen, setIsCreateEncounterOpen] = useState(false);

  // Toast Notification state
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

  // Keyboard shortcut Ctrl + K for quick search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSelectAppointment = (apt: AppointmentItem) => {
    setSelectedAppointment(apt);
    setIsAppointmentModalOpen(true);
  };

  const handleSelectAlert = (alert: EmergencyAlertItem) => {
    setSelectedAlert(alert);
    setIsAlertModalOpen(true);
  };

  const handleSelectInsight = (insight: AiInsightItem) => {
    // Open the primary AI alert modal
    setSelectedAlert(mockEmergencyAlerts[0]);
    setIsAlertModalOpen(true);
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'qa-search':
        setIsSearchModalOpen(true);
        break;
      case 'qa-emergency':
        setIsEmergencyLookupOpen(true);
        break;
      case 'qa-encounter':
        setIsCreateEncounterOpen(true);
        break;
      case 'qa-reports':
        showToast('Navigating to Patient Medical Reports repository...', 'info');
        break;
      case 'qa-access':
        showToast('Initiating standard patient access consent request...', 'info');
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#f8fafc] text-slate-900 flex overflow-hidden">
      {/* 1. Doctor Sidebar with separate scrollbar */}
      <DoctorSidebar accessRequestsCount={3} notificationsCount={5} />

      {/* 2. Main Content Work Area with separate scrollbar */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header pinned at the top of work area */}
        <DoctorHeader
          onSearchClick={() => setIsSearchModalOpen(true)}
          onNotificationsClick={() =>
            showToast('You have 3 unread emergency & access notifications.', 'info')
          }
        />

        {/* Page Body Work Area with independent scrolling */}
        <main className="flex-1 workspace-scroll p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto pb-16">
          {/* Greeting & Date Header */}
          <DoctorGreetingHeader
            doctorName="Dr. Kapil Dev"
            hospitalName="CityCare Hospital"
            hospitalLocation="Noida, Uttar Pradesh"
            dateStr="Tue, 16 Sep 2026"
            timeStr="10:24 AM"
          />

          {/* 4 Metric Stat Cards */}
          <DoctorStatsRow stats={mockDoctorStats} />

          {/* Middle Row (3 Major Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Middle-Left: Today's Appointments Table (6 cols) */}
            <div className="lg:col-span-6 h-full">
              <TodayAppointmentsCard
                appointments={mockAppointments}
                onSelectAppointment={handleSelectAppointment}
                onViewAll={() =>
                  showToast('Opening complete schedule for OPD Room 204...', 'info')
                }
              />
            </div>

            {/* Middle-Center: Emergency Alerts & AI Insights (3 cols) */}
            <div className="lg:col-span-3 space-y-5">
              <EmergencyAlertsCard
                alerts={mockEmergencyAlerts}
                onSelectAlert={handleSelectAlert}
                onViewAll={() =>
                  showToast('Navigating to Hospital Emergency Triage queue...', 'info')
                }
              />

              <AiInsightsCard
                insights={mockAiInsights}
                onSelectInsight={handleSelectInsight}
                onViewAll={() =>
                  showToast('Opening AI Decision Support Analytics dashboard...', 'info')
                }
              />
            </div>

            {/* Middle-Right: Quick Actions (3 cols) */}
            <div className="lg:col-span-3 h-full">
              <QuickActionsCard
                actions={mockQuickActions}
                onActionClick={handleQuickAction}
              />
            </div>
          </div>

          {/* Bottom Row (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Bottom-Left: Patient Activity (Last 7 Days) Bar Chart (5 cols) */}
            <div className="md:col-span-5 h-full">
              <PatientActivityBarChart
                data={mockDailyActivityData}
                totalPatients={168}
                trendText="12%"
              />
            </div>

            {/* Bottom-Center: Patient Distribution Donut Chart (4 cols) */}
            <div className="md:col-span-4 h-full">
              <PatientDistributionDonutChart
                distribution={mockDepartmentDistribution}
                totalPatients={168}
              />
            </div>

            {/* Bottom-Right: Recent Activity Timeline (3 cols) */}
            <div className="md:col-span-3 h-full">
              <RecentActivityCard
                activities={mockDoctorRecentActivity}
                onViewAll={() =>
                  showToast('Viewing full clinical activity history...', 'info')
                }
                onSelectActivity={(act) =>
                  showToast(`Selected event: ${act.title}`, 'info')
                }
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
      <AppointmentDetailModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        appointment={selectedAppointment}
        onStartEncounter={(apt) => {
          setIsCreateEncounterOpen(true);
        }}
      />

      <AiFindingReviewModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        alert={selectedAlert}
        onAcknowledge={() => {
          showToast('Finding acknowledged and attached to patient encounter draft.', 'success');
        }}
      />

      <QuickPatientSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectPatient={(name, uhid) => {
          showToast(`Opening health record for ${name} (${uhid})...`, 'info');
        }}
      />

      <EmergencyLookupModal
        isOpen={isEmergencyLookupOpen}
        onClose={() => setIsEmergencyLookupOpen(false)}
        onSubmitOverride={(id, reason) => {
          showToast(
            `Emergency break-glass access granted for ${id}. Audit logged.`,
            'alert'
          );
        }}
      />

      <CreateEncounterModal
        isOpen={isCreateEncounterOpen}
        onClose={() => setIsCreateEncounterOpen(false)}
        onCreated={(name) => {
          showToast(`Consultation encounter saved for ${name}.`, 'success');
        }}
      />
    </div>
  );
}
