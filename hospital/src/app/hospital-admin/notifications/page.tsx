'use client';

import React, { useState, useMemo } from 'react';
import { Sidebar } from '@/components/hospital-admin/Sidebar';
import { Header } from '@/components/hospital-admin/Header';
import { NotificationHeader } from '@/components/hospital-admin/notifications/NotificationHeader';
import { NotificationStatsRow } from '@/components/hospital-admin/notifications/NotificationStatsRow';
import { NotificationCenterCard } from '@/components/hospital-admin/notifications/NotificationCenterCard';
import { NotificationPreferencesSidebarCard } from '@/components/hospital-admin/notifications/NotificationPreferencesSidebarCard';
import { QuickFiltersCard } from '@/components/hospital-admin/notifications/QuickFiltersCard';
import { NotificationDetailModal } from '@/components/hospital-admin/notifications/NotificationDetailModal';

import {
  mockNotificationStats,
  defaultNotificationPreferences,
  mockNotificationsList,
} from '@/features/hospital-admin/notificationMockData';
import {
  NotificationItem,
  NotificationCategory,
  NotificationPreferencesState,
} from '@/features/hospital-admin/notificationTypes';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function NotificationsPage() {
  const [activeNavTab, setActiveNavTab] = useState('Notifications');
  const [headerSearch, setHeaderSearch] = useState('');

  // Main Page States
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotificationsList);
  const [activeCategoryTab, setActiveCategoryTab] = useState<NotificationCategory>('All');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<NotificationPreferencesState>(defaultNotificationPreferences);

  // Modal State
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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

  // Filtered Notifications List
  const filteredNotifications = useMemo(() => {
    let result = notifications;

    // Filter by Category Tab
    if (activeCategoryTab !== 'All') {
      result = result.filter((n) => n.category === activeCategoryTab);
    }

    // Filter by Quick Filter
    if (activeQuickFilter) {
      if (activeQuickFilter === 'unread') {
        result = result.filter((n) => !n.isRead);
      } else if (activeQuickFilter === 'high-priority') {
        result = result.filter((n) => n.priority === 'High');
      } else if (activeQuickFilter === 'verification') {
        result = result.filter((n) => n.category === 'Verification');
      } else if (activeQuickFilter === 'security') {
        result = result.filter((n) => n.category === 'Security');
      } else if (activeQuickFilter === 'access') {
        result = result.filter((n) => n.category === 'Access');
      } else if (activeQuickFilter === 'system') {
        result = result.filter((n) => n.category === 'System');
      }
    }

    // Filter by Header Search
    if (headerSearch.trim()) {
      const q = headerSearch.toLowerCase().trim();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.source.toLowerCase().includes(q)
      );
    }

    return result;
  }, [notifications, activeCategoryTab, activeQuickFilter, headerSearch]);

  // Actions
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications have been marked as read.', 'success');
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast('Notification cleared from feed.', 'info');
  };

  const handleViewNotification = (item: NotificationItem) => {
    setSelectedNotification(item);
    setIsDetailModalOpen(true);
    // Mark as read when viewed
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );
  };

  const handlePreferenceChange = (key: keyof NotificationPreferencesState, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    showToast('Notification preferences updated.', 'info');
  };

  const handleStatCardClick = (type: string) => {
    if (type === 'unread') {
      setActiveQuickFilter(activeQuickFilter === 'unread' ? null : 'unread');
    } else if (type === 'high-priority') {
      setActiveQuickFilter(activeQuickFilter === 'high-priority' ? null : 'high-priority');
    } else if (type === 'verification') {
      setActiveCategoryTab('Verification');
      setActiveQuickFilter(null);
    } else if (type === 'audit') {
      setActiveCategoryTab('Access');
      setActiveQuickFilter(null);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* 1. Shared Hospital Admin Sidebar */}
      <Sidebar activeTab={activeNavTab} onTabChange={setActiveNavTab} />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Global Hospital Admin Header */}
        <Header
          searchQuery={headerSearch}
          onSearchChange={(val) => setHeaderSearch(val)}
          onNotificationClick={() => {
            setActiveQuickFilter('unread');
            showToast('Showing unread notifications.', 'info');
          }}
        />

        {/* Content Body Container */}
        <main className="p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto space-y-6 pb-12">
          {/* Header Title & Date Banner */}
          <NotificationHeader />

          {/* 4 Metric Stats Cards */}
          <NotificationStatsRow
            stats={mockNotificationStats}
            onStatClick={handleStatCardClick}
          />

          {/* 2-Column Main Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column: Notifications Center (8 cols) */}
            <div className="lg:col-span-8">
              <NotificationCenterCard
                notifications={filteredNotifications}
                activeTab={activeCategoryTab}
                onTabChange={(tab) => {
                  setActiveCategoryTab(tab);
                  setActiveQuickFilter(null);
                }}
                onMarkAllAsRead={handleMarkAllAsRead}
                onViewNotification={handleViewNotification}
                onToggleRead={handleToggleRead}
                onDeleteNotification={handleDeleteNotification}
              />
            </div>

            {/* Right Column: Preferences & Quick Filters (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Notification Preferences Card */}
              <NotificationPreferencesSidebarCard
                preferences={preferences}
                onChange={handlePreferenceChange}
              />

              {/* Quick Filters Card */}
              <QuickFiltersCard
                activeFilter={activeQuickFilter}
                onSelectFilter={(filter) => setActiveQuickFilter(filter)}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      <NotificationDetailModal
        notification={selectedNotification}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedNotification(null);
        }}
        onToggleRead={handleToggleRead}
      />

      {/* Live Toast Feedback Popup */}
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
