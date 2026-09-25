'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/hospital-admin/Sidebar';
import { Header } from '@/components/hospital-admin/Header';
import { StaffStatsRow } from '@/components/hospital-admin/staff-roles/StaffStatsRow';
import { StaffTable } from '@/components/hospital-admin/staff-roles/StaffTable';
import { RoleDistributionCard } from '@/components/hospital-admin/staff-roles/RoleDistributionCard';
import { PermissionTemplatesCard } from '@/components/hospital-admin/staff-roles/PermissionTemplatesCard';
import { RecentRoleChangesCard } from '@/components/hospital-admin/staff-roles/RecentRoleChangesCard';

import { InviteStaffModal } from '@/components/hospital-admin/staff-roles/InviteStaffModal';
import { EditRoleModal } from '@/components/hospital-admin/staff-roles/EditRoleModal';
import { StaffProfileModal } from '@/components/hospital-admin/staff-roles/StaffProfileModal';

import {
  mockStaffStats,
  mockStaffMembers,
  mockRoleDistribution,
  mockPermissionTemplates,
  mockRecentRoleChanges,
} from '@/features/hospital-admin/staffRolesMockData';

import {
  StaffMember,
  StaffStats,
  AccessLevel,
  RecentRoleChangeItem,
} from '@/features/hospital-admin/staffRolesTypes';

import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function StaffRolesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Staff & Roles');
  const [headerSearch, setHeaderSearch] = useState('');

  // Main State
  const [stats, setStats] = useState<StaffStats>(mockStaffStats);
  const [staff, setStaff] = useState<StaffMember[]>(mockStaffMembers);
  const [distribution] = useState(mockRoleDistribution);
  const [templates] = useState(mockPermissionTemplates);
  const [recentChanges, setRecentChanges] = useState<RecentRoleChangeItem[]>(
    mockRecentRoleChanges
  );

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  const [viewingMember, setViewingMember] = useState<StaffMember | null>(null);

  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'warn';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'warn' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3800);
  };

  // Handlers
  const handleInviteStaff = (
    newStaff: Omit<StaffMember, 'id' | 'avatar' | 'lastActive'>
  ) => {
    const member: StaffMember = {
      ...newStaff,
      id: `staff-${Date.now()}`,
      avatar: '/doc_avatar_1.png',
      lastActive: 'Just now',
    };

    setStaff((prev) => [member, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalStaff: prev.totalStaff + 1,
      activeUsers: prev.activeUsers + 1,
    }));

    const changeItem: RecentRoleChangeItem = {
      id: `rc-${Date.now()}`,
      staffName: member.name,
      changeDescription: `Invited as ${member.role}`,
      timestamp: 'Just now',
      dotColor: 'blue',
    };
    setRecentChanges((prev) => [changeItem, ...prev.slice(0, 3)]);

    showToast(`Invitation dispatched to ${member.email}. Staff ID assigned: ${member.staffId}`);
  };

  const handleSaveRole = (
    staffId: string,
    updatedRole: string,
    newAccess: AccessLevel
  ) => {
    setStaff((prev) =>
      prev.map((m) =>
        m.id === staffId ? { ...m, role: updatedRole, accessLevel: newAccess } : m
      )
    );

    const target = staff.find((m) => m.id === staffId);
    if (target) {
      const changeItem: RecentRoleChangeItem = {
        id: `rc-${Date.now()}`,
        staffName: target.name,
        changeDescription: `Role updated to ${updatedRole} (${newAccess})`,
        timestamp: 'Just now',
        dotColor: 'green',
      };
      setRecentChanges((prev) => [changeItem, ...prev.slice(0, 3)]);
    }

    showToast('Staff member role and permissions updated successfully.');
  };

  const handleResetInvite = (member: StaffMember) => {
    showToast(`Access credentials and invite link re-sent to ${member.email}`);
  };

  const handleToggleStatus = (staffId: string) => {
    setStaff((prev) =>
      prev.map((m) => {
        if (m.id === staffId) {
          const nextStatus = m.status === 'Active' ? 'Inactive' : 'Active';
          showToast(
            nextStatus === 'Active'
              ? `Account activated for ${m.name}`
              : `Access suspended for ${m.name}`,
            nextStatus === 'Active' ? 'success' : 'warn'
          );
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );

    if (viewingMember && viewingMember.id === staffId) {
      setViewingMember((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === 'Active' ? 'Inactive' : 'Active',
            }
          : null
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl border animate-in fade-in slide-in-from-top-2 duration-200 ${
            toast.type === 'warn'
              ? 'bg-amber-950 text-white border-amber-800'
              : 'bg-slate-900 text-white border-slate-700'
          }`}
        >
          {toast.type === 'warn' ? (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header searchQuery={headerSearch} onSearchChange={setHeaderSearch} />

        <main className="p-6 md:p-8 space-y-6 max-w-[1700px] w-full mx-auto">
          {/* Page Greeting & Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Staff & Roles
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage user permissions, roles and workforce structure at CityCare Hospital.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                Thursday, 12 June 2025
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Manage people, empower care, build a safer hospital.
              </p>
            </div>
          </div>

          {/* 4 Metric Stat Cards */}
          <StaffStatsRow stats={stats} />

          {/* Center Main: Staff Directory & Permissions Table */}
          <StaffTable
            staff={staff}
            onInviteStaff={() => setIsInviteModalOpen(true)}
            onViewProfile={(m) => setViewingMember(m)}
            onEditRole={(m) => setEditingMember(m)}
            onResetInvite={handleResetInvite}
            onToggleStatus={handleToggleStatus}
          />

          {/* Bottom Row (3 Equal Cards): Role Distribution, Permission Templates, Recent Role Changes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* 1. Role Distribution */}
            <RoleDistributionCard
              distribution={distribution}
              onViewAll={() => router.push('/hospital-admin/staff-roles/permissions')}
            />

            {/* 2. Permission Templates */}
            <PermissionTemplatesCard
              templates={templates}
              onManageAll={() => router.push('/hospital-admin/staff-roles/permissions')}
              onSelectTemplate={() => router.push('/hospital-admin/staff-roles/permissions')}
            />

            {/* 3. Recent Role Changes */}
            <RecentRoleChangesCard
              changes={recentChanges}
              onViewAll={() => showToast('Opening full role and permission audit logs.')}
            />
          </div>
        </main>
      </div>

      {/* Invite Staff Modal */}
      <InviteStaffModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteStaff}
      />

      {/* Edit Role Modal */}
      <EditRoleModal
        isOpen={Boolean(editingMember)}
        onClose={() => setEditingMember(null)}
        member={editingMember}
        onSave={handleSaveRole}
      />

      {/* Staff Profile Modal */}
      <StaffProfileModal
        isOpen={Boolean(viewingMember)}
        onClose={() => setViewingMember(null)}
        member={viewingMember}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}
