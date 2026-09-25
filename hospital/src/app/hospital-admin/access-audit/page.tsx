'use client';

import React, { useState, useMemo } from 'react';
import { Sidebar } from '@/components/hospital-admin/Sidebar';
import { Header } from '@/components/hospital-admin/Header';
import { AccessAuditHeader } from '@/components/hospital-admin/access-audit/AccessAuditHeader';
import { AccessAuditStatsRow } from '@/components/hospital-admin/access-audit/AccessAuditStatsRow';
import { AccessAuditFiltersCard } from '@/components/hospital-admin/access-audit/AccessAuditFiltersCard';
import { AccessAuditTable } from '@/components/hospital-admin/access-audit/AccessAuditTable';
import { AuditInsightsCard } from '@/components/hospital-admin/access-audit/AuditInsightsCard';
import { SuspiciousTrendsCard } from '@/components/hospital-admin/access-audit/SuspiciousTrendsCard';
import { ComplianceRemindersCard } from '@/components/hospital-admin/access-audit/ComplianceRemindersCard';

import { EventDetailModal } from '@/components/hospital-admin/access-audit/EventDetailModal';
import { ExportAuditModal } from '@/components/hospital-admin/access-audit/ExportAuditModal';
import { SuspiciousTrendsModal } from '@/components/hospital-admin/access-audit/SuspiciousTrendsModal';
import { AuditInsightsModal } from '@/components/hospital-admin/access-audit/AuditInsightsModal';

import {
  mockAccessAuditStats,
  mockAuditLogs,
  mockAuditInsights,
  mockSuspiciousTrends,
  mockComplianceReminders,
} from '@/features/hospital-admin/accessAuditMockData';
import {
  AccessAuditLogRow,
  AuditLogFilterState,
} from '@/features/hospital-admin/accessAuditTypes';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function AccessAuditLogsPage() {
  const [activeTab, setActiveTab] = useState('Access Audit Logs');
  const [headerSearch, setHeaderSearch] = useState('');

  // Stats & Logs State
  const [stats, setStats] = useState(mockAccessAuditStats);
  const [logs, setLogs] = useState<AccessAuditLogRow[]>(mockAuditLogs);
  const [insights] = useState(mockAuditInsights);
  const [trends, setTrends] = useState(mockSuspiciousTrends);
  const [compliance] = useState(mockComplianceReminders);

  // Filters State
  const [filters, setFilters] = useState<AuditLogFilterState>({
    dateRange: 'Jun 5, 2025 – Jun 12, 2025',
    user: 'All Users',
    department: 'All Departments',
    accessType: 'All Access Types',
    showFlaggedOnly: false,
  });

  // Modal States
  const [selectedLog, setSelectedLog] = useState<AccessAuditLogRow | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTrendsModalOpen, setIsTrendsModalOpen] = useState(false);
  const [isInsightsModalOpen, setIsInsightsModalOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'warn';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'warn' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Filter computation
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Flagged Only check
      if (filters.showFlaggedOnly && log.status !== 'Flagged') {
        return false;
      }
      // User check
      if (filters.user !== 'All Users' && log.user !== filters.user) {
        return false;
      }
      // Department check
      if (
        filters.department !== 'All Departments' &&
        log.department !== filters.department
      ) {
        return false;
      }
      // Access Type check
      if (
        filters.accessType !== 'All Access Types' &&
        log.accessType !== filters.accessType
      ) {
        return false;
      }
      // Header Search query
      if (headerSearch.trim()) {
        const query = headerSearch.toLowerCase();
        const matchesUser = log.user.toLowerCase().includes(query);
        const matchesRole = log.role.toLowerCase().includes(query);
        const matchesRecord = log.patientRecord.toLowerCase().includes(query);
        const matchesReason = log.reason.toLowerCase().includes(query);
        const matchesDept = log.department.toLowerCase().includes(query);
        if (
          !matchesUser &&
          !matchesRole &&
          !matchesRecord &&
          !matchesReason &&
          !matchesDept
        ) {
          return false;
        }
      }
      return true;
    });
  }, [logs, filters, headerSearch]);

  // Handlers
  const handleApplyFilters = () => {
    showToast(
      `Filters applied: ${filteredLogs.length} matching audit records found.`
    );
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: 'Jun 5, 2025 – Jun 12, 2025',
      user: 'All Users',
      department: 'All Departments',
      accessType: 'All Access Types',
      showFlaggedOnly: false,
    });
    setHeaderSearch('');
    showToast('All audit filters cleared.');
  };

  const handleToggleFlag = (logId: string) => {
    setLogs((prev) =>
      prev.map((log) => {
        if (log.id === logId) {
          const nextStatus = log.status === 'Flagged' ? 'Standard' : 'Flagged';
          showToast(
            nextStatus === 'Flagged'
              ? `Event #${log.index} flagged for compliance audit.`
              : `Event #${log.index} cleared and marked as Standard.`,
            nextStatus === 'Flagged' ? 'warn' : 'success'
          );
          return { ...log, status: nextStatus };
        }
        return log;
      })
    );
    if (selectedLog && selectedLog.id === logId) {
      setSelectedLog((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === 'Flagged' ? 'Standard' : 'Flagged',
            }
          : null
      );
    }
  };

  const handleReviewAllTrends = () => {
    showToast('All 4 suspicious access trend outliers marked as reviewed.');
    setIsTrendsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold animate-in slide-in-from-top-3 duration-200 bg-white border-slate-200 text-slate-800">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header searchQuery={headerSearch} onSearchChange={setHeaderSearch} />

        <main className="p-6 md:p-8 space-y-6 max-w-[1700px] w-full mx-auto">
          {/* Header & Date */}
          <AccessAuditHeader />

          {/* 4 Metric Stat Cards */}
          <AccessAuditStatsRow
            stats={stats}
            onCardClick={(type) => {
              if (type === 'flagged') {
                setFilters((prev) => ({ ...prev, showFlaggedOnly: true }));
                showToast('Filtering to show only flagged access events.');
              } else {
                setFilters((prev) => ({ ...prev, showFlaggedOnly: false }));
              }
            }}
          />

          {/* Filters Card */}
          <AccessAuditFiltersCard
            filters={filters}
            onFilterChange={setFilters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />

          {/* Center Main: Access Audit Logs Table */}
          <AccessAuditTable
            logs={filteredLogs}
            totalRecordsCount={1284}
            onExport={() => setIsExportModalOpen(true)}
            onViewDetails={(log) => {
              setSelectedLog(log);
              setIsDetailModalOpen(true);
            }}
            onToggleFlag={handleToggleFlag}
          />

          {/* Bottom Row (3 Equal Cards): Audit Insights, Suspicious Access Trends, Compliance & Reminders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* 1. Audit Insights */}
            <AuditInsightsCard
              insights={insights}
              onViewDetails={() => setIsInsightsModalOpen(true)}
            />

            {/* 2. Suspicious Access Trends */}
            <SuspiciousTrendsCard
              trends={trends}
              onViewAll={() => setIsTrendsModalOpen(true)}
              onSelectTrend={(trend) => {
                showToast(`Inspecting trend: ${trend.title}`);
                setIsTrendsModalOpen(true);
              }}
            />

            {/* 3. Compliance & Reminders */}
            <ComplianceRemindersCard reminders={compliance} />
          </div>
        </main>
      </div>

      {/* Modals */}
      <EventDetailModal
        log={selectedLog}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedLog(null);
        }}
        onToggleFlag={handleToggleFlag}
      />

      <ExportAuditModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        logs={filteredLogs}
        onComplete={(fmt) =>
          showToast(`Access audit report generated and downloaded as ${fmt}.`)
        }
      />

      <SuspiciousTrendsModal
        isOpen={isTrendsModalOpen}
        onClose={() => setIsTrendsModalOpen(false)}
        trends={trends}
        onReviewAll={handleReviewAllTrends}
      />

      <AuditInsightsModal
        isOpen={isInsightsModalOpen}
        onClose={() => setIsInsightsModalOpen(false)}
        insights={insights}
      />
    </div>
  );
}
