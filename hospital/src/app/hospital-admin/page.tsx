'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/hospital-admin/Sidebar';
import { Header } from '../../components/hospital-admin/Header';
import { GreetingBanner } from '../../components/hospital-admin/GreetingBanner';
import { MetricCards } from '../../components/hospital-admin/MetricCards';
import { DoctorVerificationQueue } from '../../components/hospital-admin/DoctorVerificationQueue';
import { AccessAuditTable } from '../../components/hospital-admin/AccessAuditTable';
import { DepartmentOverviewCard } from '../../components/hospital-admin/DepartmentOverviewCard';
import { StaffRolesCard } from '../../components/hospital-admin/StaffRolesCard';
import { EmergencyAlertsCard } from '../../components/hospital-admin/EmergencyAlertsCard';
import { ComplianceStatusCard } from '../../components/hospital-admin/ComplianceStatusCard';
import { QuickActionsBar } from '../../components/hospital-admin/QuickActionsBar';
import { ReviewDoctorModal } from '../../components/hospital-admin/ReviewDoctorModal';
import { AddDoctorModal } from '../../components/hospital-admin/AddDoctorModal';
import { AuditDetailModal } from '../../components/hospital-admin/AuditDetailModal';

import {
  mockMetricStats,
  mockDoctorVerificationQueue,
  mockRecentAccessAudit,
  mockDepartmentMetrics,
  mockStaffRoles,
  mockEmergencyAlerts,
  mockComplianceStatus,
} from '../../features/hospital-admin/mockData';

import {
  DoctorVerificationItem,
  AccessAuditItem,
  EmergencyAlertItem,
} from '../../features/hospital-admin/types';

export default function HospitalAdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorVerificationItem | null>(null);
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<AccessAuditItem | null>(
    null
  );

  // Dynamic data states so user interactions update UI live
  const [verificationQueue, setVerificationQueue] = useState<
    DoctorVerificationItem[]
  >(mockDoctorVerificationQueue);
  const [metricStats, setMetricStats] = useState(mockMetricStats);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Review handlers
  const handleApproveDoctor = (doctorId: string) => {
    const doc = verificationQueue.find((d) => d.id === doctorId);
    setVerificationQueue((prev) => prev.filter((d) => d.id !== doctorId));
    setMetricStats((prev) =>
      prev.map((m) => {
        if (m.id === 'pending-verifications') {
          const newVal = Math.max(0, Number(m.value) - 1);
          return { ...m, value: newVal.toString() };
        }
        if (m.id === 'total-doctors') {
          return { ...m, value: (Number(m.value) + 1).toString() };
        }
        return m;
      })
    );
    setSelectedDoctor(null);
    showToast(
      `✓ ${doc?.doctorName || 'Doctor'} has been approved and granted hospital access.`
    );
  };

  const handleRejectDoctor = (doctorId: string, reason: string) => {
    const doc = verificationQueue.find((d) => d.id === doctorId);
    setVerificationQueue((prev) => prev.filter((d) => d.id !== doctorId));
    setMetricStats((prev) =>
      prev.map((m) => {
        if (m.id === 'pending-verifications') {
          const newVal = Math.max(0, Number(m.value) - 1);
          return { ...m, value: newVal.toString() };
        }
        return m;
      })
    );
    setSelectedDoctor(null);
    showToast(`Notice sent for ${doc?.doctorName}: "${reason || 'Rejected'}"`);
  };

  const handleDoctorAdded = (newDoc: {
    doctorName: string;
    specialty: string;
    licenseId: string;
    department: string;
    email: string;
  }) => {
    const item: DoctorVerificationItem = {
      id: `DOC-VERIF-${Date.now()}`,
      doctorName: newDoc.doctorName,
      specialty: newDoc.specialty,
      licenseId: newDoc.licenseId,
      department: newDoc.department,
      submittedOn: 'Just now',
      status: 'Pending',
      email: newDoc.email,
    };
    setVerificationQueue((prev) => [item, ...prev]);
    setMetricStats((prev) =>
      prev.map((m) => {
        if (m.id === 'pending-verifications') {
          return { ...m, value: (Number(m.value) + 1).toString() };
        }
        return m;
      })
    );
    showToast(`Invite sent to ${newDoc.doctorName}. Added to verification queue.`);
  };

  const handleEmergencyAlertClick = (alert: EmergencyAlertItem) => {
    setSelectedAudit({
      id: alert.id,
      user: alert.doctorName,
      accessedRecord: alert.patientRecord,
      timestamp: alert.timestamp,
      accessType: 'Emergency',
    });
  };

  // Filter verification queue based on top search
  const filteredQueue = verificationQueue.filter((doc) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      doc.doctorName.toLowerCase().includes(q) ||
      doc.department.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q) ||
      doc.licenseId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F4F8FA] flex flex-row font-sans text-slate-800 antialiased selection:bg-blue-100 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNotificationClick={() => showToast('3 Unread Emergency & Access alerts')}
          onProfileClick={() => showToast('Rajesh Kumar (Hospital Administrator)')}
        />

        {/* Dashboard Main Body */}
        <main className="p-6 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Toast notification banner */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs sm:text-sm font-medium animate-in slide-in-from-bottom duration-200 flex items-center gap-3">
              <span>{toastMessage}</span>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          {/* Greeting Banner */}
          <GreetingBanner
            adminName="Rajesh Kumar"
            hospitalName="CityCare Hospital"
            dateString="Thursday, 12 June 2025"
          />

          {/* 6 Metric Stat Cards */}
          <MetricCards stats={metricStats} />

          {/* Middle Section: 2 Wide Side-by-Side Tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left: Doctor Verification Queue */}
            <DoctorVerificationQueue
              items={filteredQueue}
              onReview={(doc) => setSelectedDoctor(doc)}
              onViewAll={() => showToast('Showing all 8 verification items')}
            />

            {/* Right: Recent Access Audit Activity */}
            <AccessAuditTable
              items={mockRecentAccessAudit}
              onViewAll={() => showToast('Navigating to Full Access Audit Logs')}
              onSelectAudit={(audit) => setSelectedAudit(audit)}
            />
          </div>

          {/* Bottom Section: 4 Metric Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* 1. Department Overview */}
            <DepartmentOverviewCard
              departments={mockDepartmentMetrics}
              onViewAll={() => showToast('Navigating to Department Manager')}
            />

            {/* 2. Staff & Roles Snapshot */}
            <StaffRolesCard roles={mockStaffRoles} />

            {/* 3. Emergency Access Alerts */}
            <EmergencyAlertsCard
              alerts={mockEmergencyAlerts}
              onViewAll={() => showToast('Viewing all Emergency Access Audit Events')}
              onSelectAlert={handleEmergencyAlertClick}
            />

            {/* 4. Hospital Compliance / Security Status */}
            <ComplianceStatusCard items={mockComplianceStatus} />
          </div>

          {/* Bottom Bar: Quick Actions */}
          <QuickActionsBar
            onAddDoctor={() => setIsAddDoctorOpen(true)}
            onReviewVerifications={() => {
              if (verificationQueue.length > 0) {
                setSelectedDoctor(verificationQueue[0]);
              } else {
                showToast('Verification queue is empty!');
              }
            }}
            onViewAuditLogs={() => showToast('Opening Audit Logs viewer')}
            onManageDepartments={() => showToast('Opening Department Configuration')}
          />
        </main>
      </div>

      {/* Interactive Modals */}
      <ReviewDoctorModal
        doctor={selectedDoctor}
        isOpen={Boolean(selectedDoctor)}
        onClose={() => setSelectedDoctor(null)}
        onApprove={handleApproveDoctor}
        onReject={handleRejectDoctor}
      />

      <AddDoctorModal
        isOpen={isAddDoctorOpen}
        onClose={() => setIsAddDoctorOpen(false)}
        onDoctorAdded={handleDoctorAdded}
      />

      <AuditDetailModal
        item={selectedAudit}
        isOpen={Boolean(selectedAudit)}
        onClose={() => setSelectedAudit(null)}
      />
    </div>
  );
}
