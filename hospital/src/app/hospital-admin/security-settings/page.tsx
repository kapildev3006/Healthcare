'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/hospital-admin/Sidebar';
import { Header } from '@/components/hospital-admin/Header';
import { SecuritySettingsHeader } from '@/components/hospital-admin/security-settings/SecuritySettingsHeader';
import { SecurityMetricsRow } from '@/components/hospital-admin/security-settings/SecurityMetricsRow';

import { AccessControlCard } from '@/components/hospital-admin/security-settings/AccessControlCard';
import { SessionManagementCard } from '@/components/hospital-admin/security-settings/SessionManagementCard';
import { DataRetentionCard } from '@/components/hospital-admin/security-settings/DataRetentionCard';

import { AuthenticationSettingsCard } from '@/components/hospital-admin/security-settings/AuthenticationSettingsCard';
import { PasswordPolicyCard } from '@/components/hospital-admin/security-settings/PasswordPolicyCard';
import { NotificationPreferencesCard } from '@/components/hospital-admin/security-settings/NotificationPreferencesCard';

import { RecentSecurityEventsCard } from '@/components/hospital-admin/security-settings/RecentSecurityEventsCard';
import { ComplianceStatusCard } from '@/components/hospital-admin/security-settings/ComplianceStatusCard';
import { ActiveDevicesCard } from '@/components/hospital-admin/security-settings/ActiveDevicesCard';
import { SaveBar } from '@/components/hospital-admin/security-settings/SaveBar';

import { SecurityEventsModal } from '@/components/hospital-admin/security-settings/modals/SecurityEventsModal';
import { ComplianceDetailsModal } from '@/components/hospital-admin/security-settings/modals/ComplianceDetailsModal';
import { ActiveSessionsModal } from '@/components/hospital-admin/security-settings/modals/ActiveSessionsModal';
import { ResetSettingsConfirmModal } from '@/components/hospital-admin/security-settings/modals/ResetSettingsConfirmModal';

import {
  mockSecurityMetrics,
  defaultSecuritySettingsState,
  mockRecentSecurityEvents,
  mockComplianceItems,
  mockActiveDeviceSessions,
} from '@/features/hospital-admin/securitySettingsMockData';
import {
  SecuritySettingsState,
  SecurityEventItem,
  ActiveDeviceSession,
} from '@/features/hospital-admin/securitySettingsTypes';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function SecuritySettingsPage() {
  const [activeTab, setActiveTab] = useState('Security & Settings');
  const [headerSearch, setHeaderSearch] = useState('');

  // Main Settings Form State
  const [settings, setSettings] = useState<SecuritySettingsState>(defaultSecuritySettingsState);
  const [sessions, setSessions] = useState<ActiveDeviceSession[]>(mockActiveDeviceSessions);
  const [events, setEvents] = useState<SecurityEventItem[]>(mockRecentSecurityEvents);
  const [isSaving, setIsSaving] = useState(false);

  // Modal States
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);
  const [isSessionsModalOpen, setIsSessionsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

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

  // Handle generic form field changes
  const handleFieldChange = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save changes handler
  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Hospital security policies and settings successfully updated.', 'success');
    }, 700);
  };

  // Reset to default handler
  const handleConfirmReset = () => {
    setSettings(defaultSecuritySettingsState);
    showToast('Security settings restored to hospital baseline configuration.', 'info');
  };

  // Revoke session handler
  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    showToast('Authentication token revoked. Device signed out immediately.', 'info');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* 1. Shared Hospital Admin Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Global Hospital Admin Header */}
        <Header
          searchQuery={headerSearch}
          onSearchChange={(val) => setHeaderSearch(val)}
          onNotificationClick={() => setIsEventsModalOpen(true)}
        />

        {/* Content Body Container */}
        <main className="p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto space-y-6 pb-12">
          {/* Header Title & Date Banner */}
          <SecuritySettingsHeader />

          {/* 4 Metric Stats Cards */}
          <SecurityMetricsRow metrics={mockSecurityMetrics} />

          {/* 3-Column Configuration Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            {/* Column 1: Access Control, Session Management, Data Retention */}
            <div className="space-y-5">
              <AccessControlCard
                defaultAccessLevel={settings.defaultAccessLevel}
                sessionTimeout={settings.sessionTimeout}
                requireReauth={settings.requireReauth}
                restrictExternalAccess={settings.restrictExternalAccess}
                onChange={handleFieldChange}
              />

              <SessionManagementCard
                sessionTimeoutDuration={settings.sessionTimeoutDuration}
                rememberMeDuration={settings.rememberMeDuration}
                concurrentSessions={settings.concurrentSessions}
                showLoginAlerts={settings.showLoginAlerts}
                onChange={handleFieldChange}
              />

              <DataRetentionCard
                patientRecordsRetention={settings.patientRecordsRetention}
                accessLogsRetention={settings.accessLogsRetention}
                systemLogsRetention={settings.systemLogsRetention}
                autoDeleteOldLogs={settings.autoDeleteOldLogs}
                onChange={handleFieldChange}
              />
            </div>

            {/* Column 2: Authentication Settings, Password Policy, Notification Preferences */}
            <div className="space-y-5">
              <AuthenticationSettingsCard
                twoFactorAuth={settings.twoFactorAuth}
                allowSmsAuth={settings.allowSmsAuth}
                allowAuthenticatorApp={settings.allowAuthenticatorApp}
                emailVerification={settings.emailVerification}
                singleSignOn={settings.singleSignOn}
                onChange={handleFieldChange}
              />

              <PasswordPolicyCard
                minPasswordLength={settings.minPasswordLength}
                requireUppercase={settings.requireUppercase}
                requireNumbers={settings.requireNumbers}
                requireSpecialChars={settings.requireSpecialChars}
                passwordExpiry={settings.passwordExpiry}
                onChange={handleFieldChange}
              />

              <NotificationPreferencesCard
                securityAlerts={settings.securityAlerts}
                complianceUpdates={settings.complianceUpdates}
                systemHealthAlerts={settings.systemHealthAlerts}
                weeklySecurityReport={settings.weeklySecurityReport}
                onChange={handleFieldChange}
              />
            </div>

            {/* Column 3: Recent Security Events, Compliance Status, Active Devices & Sessions */}
            <div className="space-y-5">
              <RecentSecurityEventsCard
                events={events}
                onViewAll={() => setIsEventsModalOpen(true)}
              />

              <ComplianceStatusCard
                items={mockComplianceItems}
                onViewDetails={() => setIsComplianceModalOpen(true)}
              />

              <ActiveDevicesCard
                sessions={sessions}
                onViewAll={() => setIsSessionsModalOpen(true)}
              />
            </div>
          </div>

          {/* Bottom Bar: Save Changes */}
          <SaveBar
            onReset={() => setIsResetModalOpen(true)}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
        </main>
      </div>

      {/* Modals */}
      <SecurityEventsModal
        isOpen={isEventsModalOpen}
        onClose={() => setIsEventsModalOpen(false)}
        events={events}
      />

      <ComplianceDetailsModal
        isOpen={isComplianceModalOpen}
        onClose={() => setIsComplianceModalOpen(false)}
        items={mockComplianceItems}
      />

      <ActiveSessionsModal
        isOpen={isSessionsModalOpen}
        onClose={() => setIsSessionsModalOpen(false)}
        sessions={sessions}
        onRevokeSession={handleRevokeSession}
      />

      <ResetSettingsConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmReset}
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
