'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/hospital-admin/Sidebar';
import { Header } from '../../../components/hospital-admin/Header';
import { HospitalHeroCard } from '../../../components/hospital-admin/profile/HospitalHeroCard';
import { ProfileQuickStats } from '../../../components/hospital-admin/profile/ProfileQuickStats';
import { HospitalInfoCard } from '../../../components/hospital-admin/profile/HospitalInfoCard';
import { AdministratorDetailsCard } from '../../../components/hospital-admin/profile/AdministratorDetailsCard';
import { OperationalDetailsCard } from '../../../components/hospital-admin/profile/OperationalDetailsCard';
import { AccreditationsCard } from '../../../components/hospital-admin/profile/AccreditationsCard';
import { FacilitiesServicesCard } from '../../../components/hospital-admin/profile/FacilitiesServicesCard';
import { ComplianceDocumentsCard } from '../../../components/hospital-admin/profile/ComplianceDocumentsCard';
import {
  EditProfileModal,
  EditModalType,
} from '../../../components/hospital-admin/profile/EditProfileModal';

import {
  mockHospitalInfo,
  mockAdministratorInfo,
  mockOperationalDetails,
  mockProfileQuickStats,
  mockAccreditations,
  mockFacilities,
  mockComplianceDocuments,
} from '../../../features/hospital-admin/profileMockData';

import {
  HospitalProfileInfo,
  AdministratorInfo,
  OperationalDetails,
  ComplianceDocumentItem,
} from '../../../features/hospital-admin/profileTypes';

export default function HospitalProfilePage() {
  const [activeTab, setActiveTab] = useState('Hospital Profile');
  const [searchQuery, setSearchQuery] = useState('');

  // Live state for hospital profile
  const [hospitalInfo, setHospitalInfo] =
    useState<HospitalProfileInfo>(mockHospitalInfo);
  const [adminInfo, setAdminInfo] =
    useState<AdministratorInfo>(mockAdministratorInfo);
  const [operationalDetails, setOperationalDetails] =
    useState<OperationalDetails>(mockOperationalDetails);

  // Modal & Toast states
  const [editModalType, setEditModalType] = useState<EditModalType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadDoc = (doc: ComplianceDocumentItem) => {
    showToast(`Downloading: ${doc.title} (${doc.size})`);
  };

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
          onNotificationClick={() => showToast('3 Unread System Notifications')}
          onProfileClick={() => showToast('Viewing Administrator Profile')}
        />

        {/* Profile Main Body */}
        <main className="p-6 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Toast Notification Banner */}
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

          {/* Page Greeting Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
                Hospital Profile
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                View and manage your hospital information, documents and settings.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm font-medium text-slate-600">
                Thursday, 12 June 2025
              </p>
              <p className="text-xs text-slate-400">
                Manage hospital information, keep details up to date.
              </p>
            </div>
          </div>

          {/* Hospital Hero Banner Card */}
          <HospitalHeroCard
            info={hospitalInfo}
            onChangeCover={() => showToast('Hospital cover photo updated')}
            onChangeLogo={() => showToast('Hospital logo upload dialog opened')}
          />

          {/* 6 Quick Metric Stats */}
          <ProfileQuickStats
            stats={mockProfileQuickStats}
            onViewAll={(id) => showToast(`Navigating to ${id} directory`)}
          />

          {/* Middle Row: 3 Wide Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hospital Information */}
            <HospitalInfoCard
              info={hospitalInfo}
              onEdit={() => setEditModalType('hospital-info')}
            />

            {/* Administrator Details */}
            <AdministratorDetailsCard
              admin={adminInfo}
              onEdit={() => setEditModalType('admin-details')}
            />

            {/* Operational Details */}
            <OperationalDetailsCard
              details={operationalDetails}
              onEdit={() => setEditModalType('operational')}
            />
          </div>

          {/* Bottom Row: 3 Wide Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Accreditations & Certifications */}
            <AccreditationsCard
              items={mockAccreditations}
              onEdit={() => showToast('Certification editor opened')}
            />

            {/* Facilities & Services */}
            <FacilitiesServicesCard
              facilities={mockFacilities}
              onEdit={() => showToast('Facility services editor opened')}
            />

            {/* Compliance Documents */}
            <ComplianceDocumentsCard
              documents={mockComplianceDocuments}
              onViewAll={() => showToast('Viewing all compliance files repository')}
              onDownload={handleDownloadDoc}
            />
          </div>
        </main>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        type={editModalType}
        isOpen={Boolean(editModalType)}
        onClose={() => setEditModalType(null)}
        hospitalInfo={hospitalInfo}
        adminInfo={adminInfo}
        operationalDetails={operationalDetails}
        onSaveHospitalInfo={(newInfo) => {
          setHospitalInfo(newInfo);
          showToast('✓ Hospital information updated successfully!');
        }}
        onSaveAdminInfo={(newInfo) => {
          setAdminInfo(newInfo);
          showToast('✓ Administrator details updated successfully!');
        }}
        onSaveOperationalDetails={(newDetails) => {
          setOperationalDetails(newDetails);
          showToast('✓ Operational details updated successfully!');
        }}
      />
    </div>
  );
}
