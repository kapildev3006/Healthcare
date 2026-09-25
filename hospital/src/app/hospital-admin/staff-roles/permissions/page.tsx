'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/hospital-admin/Sidebar';
import { Header } from '@/components/hospital-admin/Header';
import { RolePermissionsHeader } from '@/components/hospital-admin/staff-roles/permissions/RolePermissionsHeader';
import { RoleHeroCard } from '@/components/hospital-admin/staff-roles/permissions/RoleHeroCard';
import { ModulePermissionsGrid } from '@/components/hospital-admin/staff-roles/permissions/ModulePermissionsGrid';
import { AssignedUsersCard } from '@/components/hospital-admin/staff-roles/permissions/AssignedUsersCard';
import { RolePermissionsFooter } from '@/components/hospital-admin/staff-roles/permissions/RolePermissionsFooter';

import { ApplyTemplateModal } from '@/components/hospital-admin/staff-roles/permissions/ApplyTemplateModal';
import { ManageUsersModal } from '@/components/hospital-admin/staff-roles/permissions/ManageUsersModal';
import { DuplicateRoleModal } from '@/components/hospital-admin/staff-roles/permissions/DuplicateRoleModal';

import { mockDefaultRolePermissions } from '@/features/hospital-admin/rolePermissionsMockData';
import {
  RoleHeroData,
  ModulePermissionGroup,
  AssignedRoleUser,
} from '@/features/hospital-admin/rolePermissionsTypes';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function RolePermissionsPage() {
  const [activeTab, setActiveTab] = useState('Staff & Roles');
  const [headerSearch, setHeaderSearch] = useState('');

  // Role State
  const [hero, setHero] = useState<RoleHeroData>(
    mockDefaultRolePermissions.hero
  );
  const [modules, setModules] = useState<ModulePermissionGroup[]>(
    mockDefaultRolePermissions.modules
  );
  const [assignedUsers, setAssignedUsers] = useState<AssignedRoleUser[]>(
    mockDefaultRolePermissions.assignedUsers
  );

  // Modals State
  const [isApplyTemplateOpen, setIsApplyTemplateOpen] = useState(false);
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'warn';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'warn' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3800);
  };

  // Toggle single permission switch
  const handleTogglePermission = (moduleId: string, permId: string) => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            permissions: mod.permissions.map((p) =>
              p.id === permId ? { ...p, enabled: !p.enabled } : p
            ),
          };
        }
        return mod;
      })
    );
  };

  // Apply template
  const handleApplyTemplate = (templateName: string) => {
    // If standard user, enable mostly view perms
    // If elevated, enable view + edit
    // If system admin, enable all
    setModules((prev) =>
      prev.map((mod) => ({
        ...mod,
        permissions: mod.permissions.map((p) => {
          if (templateName === 'System Admin') return { ...p, enabled: true };
          if (templateName === 'Standard User')
            return { ...p, enabled: p.label.startsWith('View') };
          if (templateName === 'Elevated User')
            return {
              ...p,
              enabled:
                p.label.startsWith('View') ||
                p.label.startsWith('Edit') ||
                p.label.startsWith('Filter') ||
                p.label.startsWith('Export'),
            };
          return p;
        }),
      }))
    );
    showToast(`Permission template "${templateName}" applied to all modules.`);
  };

  // Save changes
  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHero((prev) => ({
        ...prev,
        lastUpdated: 'Just now',
        updatedBy: 'Rajesh Kumar',
      }));
      showToast(
        'Policy matrix saved successfully. Updated permissions applied to all 12 users.'
      );
    }, 600);
  };

  // Disable role
  const handleDisableRole = () => {
    const nextStatus = hero.status === 'Active' ? 'Inactive' : 'Active';
    setHero((prev) => ({ ...prev, status: nextStatus }));
    showToast(
      nextStatus === 'Inactive'
        ? 'Role disabled. Assigned users will no longer receive elevated privileges.'
        : 'Role re-activated.',
      nextStatus === 'Inactive' ? 'warn' : 'success'
    );
  };

  // Duplicate role
  const handleDuplicateRole = (newRoleName: string) => {
    showToast(
      `Role cloned successfully as "${newRoleName}". New policy saved in draft state.`
    );
  };

  // Remove user
  const handleRemoveUser = (userId: string) => {
    setAssignedUsers((prev) => prev.filter((u) => u.id !== userId));
    setHero((prev) => ({
      ...prev,
      assignedStaffCount: Math.max(0, prev.assignedStaffCount - 1),
    }));
    showToast('User removed from Department Manager role.');
  };

  // Add user
  const handleAddUser = (userName: string, department: string) => {
    const newUser: AssignedRoleUser = {
      id: `u-${Date.now()}`,
      name: userName,
      department,
      avatar: '/doc_avatar_1.png',
      status: 'Active',
    };
    setAssignedUsers((prev) => [newUser, ...prev]);
    setHero((prev) => ({
      ...prev,
      assignedStaffCount: prev.assignedStaffCount + 1,
    }));
    showToast(`${userName} assigned to Department Manager role.`);
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

      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header searchQuery={headerSearch} onSearchChange={setHeaderSearch} />

        <main className="p-6 md:p-8 space-y-6 max-w-[1700px] w-full mx-auto">
          {/* Header & Back Button */}
          <RolePermissionsHeader roleName={hero.name} />

          {/* Top Hero Card */}
          <RoleHeroCard hero={hero} />

          {/* Main Grid: Left Module Permissions (8 cols) + Right Assigned Users (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Module Permissions Grid */}
            <div className="lg:col-span-8">
              <ModulePermissionsGrid
                modules={modules}
                onTogglePermission={handleTogglePermission}
                onOpenApplyTemplate={() => setIsApplyTemplateOpen(true)}
              />
            </div>

            {/* Right Column: Assigned Users */}
            <div className="lg:col-span-4">
              <AssignedUsersCard
                users={assignedUsers}
                onManageUsers={() => setIsManageUsersOpen(true)}
                onViewAllUsers={() => setIsManageUsersOpen(true)}
                onRemoveUser={handleRemoveUser}
              />
            </div>
          </div>

          {/* Bottom Danger Zone & Action Bar */}
          <RolePermissionsFooter
            onDisableRole={handleDisableRole}
            onDuplicateRole={() => setIsDuplicateOpen(true)}
            onSaveChanges={handleSaveChanges}
            isSaving={isSaving}
          />
        </main>
      </div>

      {/* Apply Template Modal */}
      <ApplyTemplateModal
        isOpen={isApplyTemplateOpen}
        onClose={() => setIsApplyTemplateOpen(false)}
        onApplyTemplate={handleApplyTemplate}
      />

      {/* Manage Users Modal */}
      <ManageUsersModal
        isOpen={isManageUsersOpen}
        onClose={() => setIsManageUsersOpen(false)}
        users={assignedUsers}
        onRemoveUser={handleRemoveUser}
        onAddUser={handleAddUser}
      />

      {/* Duplicate Role Modal */}
      <DuplicateRoleModal
        isOpen={isDuplicateOpen}
        onClose={() => setIsDuplicateOpen(false)}
        currentRoleName={hero.name}
        onDuplicate={handleDuplicateRole}
      />
    </div>
  );
}
