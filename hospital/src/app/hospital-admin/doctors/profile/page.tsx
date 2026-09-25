'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/hospital-admin/Sidebar';
import { Header } from '@/components/hospital-admin/Header';
import { DoctorProfileHeader } from '@/components/hospital-admin/doctors/profile/DoctorProfileHeader';
import { DoctorProfileHeroCard } from '@/components/hospital-admin/doctors/profile/DoctorProfileHeroCard';
import { DoctorProfileStatsRow } from '@/components/hospital-admin/doctors/profile/DoctorProfileStatsRow';
import { QualificationsCard } from '@/components/hospital-admin/doctors/profile/QualificationsCard';
import { CertificationsCard } from '@/components/hospital-admin/doctors/profile/CertificationsCard';
import { DepartmentAssignmentCard } from '@/components/hospital-admin/doctors/profile/DepartmentAssignmentCard';
import { ScheduleAvailabilityCard } from '@/components/hospital-admin/doctors/profile/ScheduleAvailabilityCard';
import { RecentActivityCard } from '@/components/hospital-admin/doctors/profile/RecentActivityCard';
import { AccessPermissionsCard } from '@/components/hospital-admin/doctors/profile/AccessPermissionsCard';
import { PerformanceChartCard } from '@/components/hospital-admin/doctors/profile/PerformanceChartCard';

import { EditDoctorProfileModal } from '@/components/hospital-admin/doctors/profile/EditDoctorProfileModal';
import { AddQualificationModal } from '@/components/hospital-admin/doctors/profile/AddQualificationModal';
import { ManageScheduleModal } from '@/components/hospital-admin/doctors/profile/ManageScheduleModal';
import { ManageAccessModal } from '@/components/hospital-admin/doctors/profile/ManageAccessModal';

import { mockDefaultDoctorProfile } from '@/features/hospital-admin/doctorProfileMockData';
import {
  DoctorProfileHero,
  QualificationItem,
  ScheduleDayItem,
  AccessPermissionItem,
} from '@/features/hospital-admin/doctorProfileTypes';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function DoctorProfilePage() {
  const [activeTab, setActiveTab] = useState('Doctor Management');
  const [headerSearch, setHeaderSearch] = useState('');

  // Doctor Profile State (default to Dr. Neha Kapoor)
  const [hero, setHero] = useState<DoctorProfileHero>(
    mockDefaultDoctorProfile.hero
  );
  const [stats] = useState(mockDefaultDoctorProfile.stats);
  const [qualifications, setQualifications] = useState<QualificationItem[]>(
    mockDefaultDoctorProfile.qualifications
  );
  const [certifications] = useState(mockDefaultDoctorProfile.certifications);
  const [assignment, setAssignment] = useState(
    mockDefaultDoctorProfile.departmentAssignment
  );
  const [schedule, setSchedule] = useState<ScheduleDayItem[]>(
    mockDefaultDoctorProfile.schedule
  );
  const [recentActivity] = useState(mockDefaultDoctorProfile.recentActivity);
  const [permissions, setPermissions] = useState<AccessPermissionItem[]>(
    mockDefaultDoctorProfile.permissions
  );
  const [performance] = useState(mockDefaultDoctorProfile.performance);

  // Modals
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddQualOpen, setIsAddQualOpen] = useState(false);
  const [isManageScheduleOpen, setIsManageScheduleOpen] = useState(false);
  const [isManageAccessOpen, setIsManageAccessOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'warn';
  } | null>(null);

  const showToast = (text: string, type: 'success' | 'warn' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Actions
  const handleSuspendAccess = () => {
    const nextStatus = hero.status === 'Inactive' ? 'Active' : 'Inactive';
    setHero((prev) => ({ ...prev, status: nextStatus }));
    showToast(
      nextStatus === 'Inactive'
        ? `Access suspended for ${hero.name}. System credentials deactivated.`
        : `Access restored for ${hero.name}.`,
      nextStatus === 'Inactive' ? 'warn' : 'success'
    );
  };

  const handleResetCredentials = () => {
    showToast(
      `Credential reset link sent to ${hero.email}. New temporary password dispatched.`,
      'success'
    );
  };

  const handleSaveHero = (updated: Partial<DoctorProfileHero>) => {
    setHero((prev) => ({ ...prev, ...updated }));
    showToast('Doctor profile details updated successfully.');
  };

  const handleAddQualification = (newQual: Omit<QualificationItem, 'id'>) => {
    const item: QualificationItem = {
      id: `qual-${Date.now()}`,
      ...newQual,
    };
    setQualifications((prev) => [...prev, item]);
    showToast(`Qualification "${newQual.degree}" added successfully.`);
  };

  const handleSaveSchedule = (updatedSchedule: ScheduleDayItem[]) => {
    setSchedule(updatedSchedule);
    showToast('Weekly schedule updated successfully.');
  };

  const handleSavePermissions = (updatedPermissions: AccessPermissionItem[]) => {
    setPermissions(updatedPermissions);
    showToast('Access privileges and EHR permissions updated.');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border animate-in fade-in slide-in-from-top-2 duration-200 ${
            toastMessage.type === 'warn'
              ? 'bg-amber-900 text-white border-amber-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}
        >
          {toastMessage.type === 'warn' ? (
            <AlertCircle className="w-5 h-5 text-amber-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
          <span className="text-xs font-medium">{toastMessage.text}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header searchQuery={headerSearch} onSearchChange={setHeaderSearch} />

        <main className="p-6 md:p-8 space-y-6 max-w-[1700px] w-full mx-auto">
          {/* Top Title, Subtitle, Breadcrumb & 4 Action Buttons */}
          <DoctorProfileHeader
            doctorName={hero.name}
            onEditProfile={() => setIsEditProfileOpen(true)}
            onSuspendAccess={handleSuspendAccess}
            onResetCredentials={handleResetCredentials}
          />

          {/* Doctor Hero Card */}
          <DoctorProfileHeroCard hero={hero} />

          {/* 5 Performance Stat Cards */}
          <DoctorProfileStatsRow stats={stats} />

          {/* Middle Row (3 Cards Grid): Qualifications, Certifications, Department Assignment */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* 1. Qualifications */}
            <QualificationsCard
              qualifications={qualifications}
              onAddQualification={() => setIsAddQualOpen(true)}
            />

            {/* 2. Certifications & Licenses */}
            <CertificationsCard
              certifications={certifications}
              onViewAll={() =>
                showToast('Displaying all 4 certified medical credentials.')
              }
            />

            {/* 3. Department Assignment */}
            <DepartmentAssignmentCard
              assignment={assignment}
              onEditAssignment={() =>
                showToast('Department re-assignment can be managed in Departments module.')
              }
            />
          </div>

          {/* Bottom Row (4 Cards Grid): Schedule, Recent Activity, Permissions, Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {/* 1. Schedule & Availability */}
            <ScheduleAvailabilityCard
              schedule={schedule}
              onManageSchedule={() => setIsManageScheduleOpen(true)}
            />

            {/* 2. Recent Activity */}
            <RecentActivityCard
              activities={recentActivity}
              onViewAll={() =>
                showToast('Viewing full clinical access audit trail.')
              }
            />

            {/* 3. Access Level & Permissions */}
            <AccessPermissionsCard
              permissions={permissions}
              onManageAccess={() => setIsManageAccessOpen(true)}
            />

            {/* 4. Performance (Last 6 Months) + Line Chart */}
            <PerformanceChartCard
              performance={performance}
              onViewDetails={() =>
                showToast('Exporting 6-month clinical KPI report.')
              }
            />
          </div>
        </main>
      </div>

      {/* Edit Doctor Profile Modal */}
      <EditDoctorProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        hero={hero}
        onSave={handleSaveHero}
      />

      {/* Add Qualification Modal */}
      <AddQualificationModal
        isOpen={isAddQualOpen}
        onClose={() => setIsAddQualOpen(false)}
        onAdd={handleAddQualification}
      />

      {/* Manage Schedule Modal */}
      <ManageScheduleModal
        isOpen={isManageScheduleOpen}
        onClose={() => setIsManageScheduleOpen(false)}
        schedule={schedule}
        onSave={handleSaveSchedule}
      />

      {/* Manage Access Modal */}
      <ManageAccessModal
        isOpen={isManageAccessOpen}
        onClose={() => setIsManageAccessOpen(false)}
        permissions={permissions}
        onSave={handleSavePermissions}
      />
    </div>
  );
}
