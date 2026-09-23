'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/hospital-admin/Sidebar';
import { Header } from '../../../components/hospital-admin/Header';
import { DoctorStatsRow } from '../../../components/hospital-admin/doctors/DoctorStatsRow';
import { DoctorTable } from '../../../components/hospital-admin/doctors/DoctorTable';
import { DoctorDetailModal } from '../../../components/hospital-admin/doctors/DoctorDetailModal';
import { DoctorAddModal } from '../../../components/hospital-admin/doctors/DoctorAddModal';

import {
  mockDoctorStats,
  mockDoctorDirectory,
} from '../../../features/hospital-admin/doctorMockData';

import {
  DoctorItem,
  DoctorTabFilter,
  DoctorStatus,
  DoctorStats,
} from '../../../features/hospital-admin/doctorTypes';

export default function DoctorManagementPage() {
  const [activeTab, setActiveTab] = useState('Doctor Management');
  const [headerSearch, setHeaderSearch] = useState('');

  // Table filter states
  const [tableFilterTab, setTableFilterTab] =
    useState<DoctorTabFilter>('all');
  const [tableSearch, setTableSearch] = useState('');

  // Doctor state
  const [doctors, setDoctors] = useState<DoctorItem[]>(mockDoctorDirectory);
  const [stats, setStats] = useState<DoctorStats>(mockDoctorStats);

  // Modals state
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorItem | null>(null);
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Status Change Handler
  const handleStatusChange = (doctorId: string, newStatus: DoctorStatus) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === doctorId ? { ...d, status: newStatus } : d))
    );

    // Recalculate stats
    setStats((prev) => {
      const activeCount = doctors.filter((d) =>
        d.id === doctorId ? newStatus === 'Active' : d.status === 'Active'
      ).length;
      const leaveCount = doctors.filter((d) =>
        d.id === doctorId ? newStatus === 'On Leave' : d.status === 'On Leave'
      ).length;
      const inactiveCount = doctors.filter((d) =>
        d.id === doctorId ? newStatus === 'Inactive' : d.status === 'Inactive'
      ).length;

      return {
        ...prev,
        activeDoctors: activeCount + 102, // base count offset to match 112
        onLeave: leaveCount + 7,
        inactive: inactiveCount + 5,
      };
    });

    showToast(`Status updated to "${newStatus}"`);
  };

  // Add Doctor Handler
  const handleAddDoctor = (
    newDoc: Omit<DoctorItem, 'id' | 'avatar' | 'joinDate'>
  ) => {
    const item: DoctorItem = {
      ...newDoc,
      id: `doc-${Date.now()}`,
      avatar: '/doc_avatar_1.png',
      joinDate: 'Just now',
    };

    setDoctors((prev) => [item, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalDoctors: prev.totalDoctors + 1,
      activeDoctors: prev.activeDoctors + 1,
    }));

    showToast(`✓ ${item.name} has been successfully added to the directory.`);
  };

  // Filtered Doctors list
  const filteredDoctors = doctors.filter((doc) => {
    // Tab filter
    if (tableFilterTab === 'active' && doc.status !== 'Active') return false;
    if (tableFilterTab === 'on-leave' && doc.status !== 'On Leave') return false;
    if (tableFilterTab === 'inactive' && doc.status !== 'Inactive') return false;

    // Search query (table search or header search)
    const q = (tableSearch || headerSearch).trim().toLowerCase();
    if (!q) return true;

    return (
      doc.name.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q) ||
      doc.department.toLowerCase().includes(q) ||
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
          searchQuery={headerSearch}
          onSearchChange={setHeaderSearch}
          onNotificationClick={() => showToast('3 Unread Doctor Verifications')}
          onProfileClick={() => showToast('Viewing Administrator Profile')}
        />

        {/* Doctor Management Main Body */}
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

          {/* Greeting Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
                Doctor Management
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                View, manage and maintain all active doctors in your hospital.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm font-medium text-slate-600">
                Thursday, 12 June 2025
              </p>
              <p className="text-xs text-slate-400">
                Manage your hospital&apos;s doctor network efficiently.
              </p>
            </div>
          </div>

          {/* 4 Stats Cards + 1 Add Doctor Action */}
          <DoctorStatsRow
            stats={stats}
            onAddDoctor={() => setIsAddDoctorOpen(true)}
          />

          {/* Main Doctor Table Card */}
          <DoctorTable
            doctors={filteredDoctors}
            activeTab={tableFilterTab}
            onTabChange={setTableFilterTab}
            searchQuery={tableSearch}
            onSearchChange={setTableSearch}
            onViewDoctor={(doc) => setSelectedDoctor(doc)}
            onStatusChange={handleStatusChange}
          />
        </main>
      </div>

      {/* Interactive Modals */}
      <DoctorDetailModal
        doctor={selectedDoctor}
        isOpen={Boolean(selectedDoctor)}
        onClose={() => setSelectedDoctor(null)}
        onStatusChange={handleStatusChange}
      />

      <DoctorAddModal
        isOpen={isAddDoctorOpen}
        onClose={() => setIsAddDoctorOpen(false)}
        onDoctorAdded={handleAddDoctor}
      />
    </div>
  );
}
