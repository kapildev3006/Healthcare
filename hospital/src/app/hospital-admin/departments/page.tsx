'use client';

import React, { useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { Sidebar } from '@/components/hospital-admin/Sidebar';
import { Header } from '@/components/hospital-admin/Header';
import { DepartmentStatsRow } from '@/components/hospital-admin/departments/DepartmentStatsRow';
import { DepartmentsTable } from '@/components/hospital-admin/departments/DepartmentsTable';
import { DepartmentDistributionCard } from '@/components/hospital-admin/departments/DepartmentDistributionCard';
import { BedCapacityCard } from '@/components/hospital-admin/departments/BedCapacityCard';
import { RecentDepartmentUpdatesCard } from '@/components/hospital-admin/departments/RecentDepartmentUpdatesCard';
import { DepartmentQuickActionsBar } from '@/components/hospital-admin/departments/DepartmentQuickActionsBar';

import { AddDepartmentModal } from '@/components/hospital-admin/departments/AddDepartmentModal';
import { DepartmentDetailModal } from '@/components/hospital-admin/departments/DepartmentDetailModal';
import { AssignHeadModal } from '@/components/hospital-admin/departments/AssignHeadModal';

import {
  mockDepartments,
  mockDepartmentStats,
  mockDepartmentDistribution,
  mockBedCapacity,
  mockDepartmentUpdates,
} from '@/features/hospital-admin/departmentMockData';
import {
  DepartmentItem,
  DepartmentStats,
  DepartmentUpdateItem,
} from '@/features/hospital-admin/departmentTypes';

export default function DepartmentsPage() {
  const [activeTab, setActiveTab] = useState('Departments');
  const [headerSearch, setHeaderSearch] = useState('');

  // Main State
  const [departments, setDepartments] = useState<DepartmentItem[]>(mockDepartments);
  const [stats, setStats] = useState<DepartmentStats>(mockDepartmentStats);
  const [updates, setUpdates] = useState<DepartmentUpdateItem[]>(mockDepartmentUpdates);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDeptForAssign, setSelectedDeptForAssign] = useState<string | undefined>(undefined);
  const [detailModalDept, setDetailModalDept] = useState<DepartmentItem | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle department active/inactive status
  const handleToggleStatus = (deptId: string) => {
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.id === deptId) {
          const newStatus = d.status === 'Active' ? 'Inactive' : 'Active';
          const updateItem: DepartmentUpdateItem = {
            id: `upd-${Date.now()}`,
            title: `${d.name} department marked as ${newStatus}`,
            timestamp: 'Just now',
            category: 'Status Change',
            dotColor: newStatus === 'Active' ? 'green' : 'red',
          };
          setUpdates((u) => [updateItem, ...u.slice(0, 3)]);
          showToast(`${d.name} status updated to ${newStatus}`);
          return { ...d, status: newStatus };
        }
        return d;
      })
    );
  };

  // Add new department handler
  const handleAddDepartment = (newDept: Omit<DepartmentItem, 'id'>) => {
    const id = `dept-${Date.now()}`;
    const fullDept: DepartmentItem = { id, ...newDept };
    setDepartments((prev) => [fullDept, ...prev]);

    // Update stats
    setStats((prev) => ({
      ...prev,
      totalDepartments: prev.totalDepartments + 1,
      activeHeads: newDept.head ? prev.activeHeads + 1 : prev.activeHeads,
    }));

    // Add to recent updates
    const updateItem: DepartmentUpdateItem = {
      id: `upd-${Date.now()}`,
      title: `New department created: ${newDept.name}`,
      timestamp: 'Just now',
      category: 'Department Head',
      dotColor: 'green',
    };
    setUpdates((u) => [updateItem, ...u.slice(0, 3)]);

    showToast(`Department "${newDept.name}" created successfully`);
  };

  // Assign department head handler
  const handleAssignHead = (departmentId: string, newHead: string) => {
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.id === departmentId) {
          const updateItem: DepartmentUpdateItem = {
            id: `upd-${Date.now()}`,
            title: `${newHead} assigned as Head of ${d.name}`,
            timestamp: 'Just now',
            category: 'Department Head',
            dotColor: 'green',
          };
          setUpdates((u) => [updateItem, ...u.slice(0, 3)]);
          showToast(`${newHead} designated as Head of ${d.name}`);
          return { ...d, head: newHead };
        }
        return d;
      })
    );
  };

  // Export departments CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Department Name', 'Head of Department', 'Doctors', 'Staff', 'Bed Capacity', 'Category', 'Status'];
    const rows = departments.map((d) => [
      d.id,
      `"${d.name}"`,
      `"${d.head}"`,
      d.doctorsCount,
      d.staffCount,
      d.bedCapacity,
      d.category,
      d.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `departments_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Departments directory exported to CSV successfully');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header searchQuery={headerSearch} onSearchChange={setHeaderSearch} />

        <main className="p-6 md:p-8 space-y-6">
          {/* Page Title & Main Top Action */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Department Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Overview and administration of all clinical and administrative departments
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-98 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" strokeWidth={2.4} />
              <span>Add Department</span>
            </button>
          </div>

          {/* 4 Metric Stat Cards */}
          <DepartmentStatsRow stats={stats} />

          {/* Two-Column Grid: Departments Overview & Right Analytical Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Departments Table (approx 65% / 8 cols) */}
            <div className="lg:col-span-8">
              <DepartmentsTable
                departments={departments}
                onViewDepartment={(dept) => setDetailModalDept(dept)}
                onToggleStatus={handleToggleStatus}
                onAssignHead={(dept) => {
                  setSelectedDeptForAssign(dept.id);
                  setIsAssignModalOpen(true);
                }}
              />
            </div>

            {/* Right Column: Donut Distribution, Bed Capacity & Recent Updates (approx 35% / 4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Department Distribution (Donut Chart) */}
              <DepartmentDistributionCard
                distribution={mockDepartmentDistribution}
                totalDepartments={departments.length}
              />

              {/* Bed Capacity Overview */}
              <BedCapacityCard stats={mockBedCapacity} />

              {/* Recent Department Updates */}
              <RecentDepartmentUpdatesCard updates={updates} />
            </div>
          </div>

          {/* Bottom Quick Actions Bar */}
          <DepartmentQuickActionsBar
            onAddDepartment={() => setIsAddModalOpen(true)}
            onAssignHead={() => {
              setSelectedDeptForAssign(undefined);
              setIsAssignModalOpen(true);
            }}
            onExport={handleExportCSV}
          />
        </main>
      </div>

      {/* Add Department Modal */}
      <AddDepartmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDepartment}
      />

      {/* Department Detail Modal */}
      <DepartmentDetailModal
        department={detailModalDept}
        isOpen={!!detailModalDept}
        onClose={() => setDetailModalDept(null)}
        onToggleStatus={handleToggleStatus}
      />

      {/* Assign Department Head Modal */}
      <AssignHeadModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        departments={departments}
        selectedDepartmentId={selectedDeptForAssign}
        onAssignHead={handleAssignHead}
      />
    </div>
  );
}
