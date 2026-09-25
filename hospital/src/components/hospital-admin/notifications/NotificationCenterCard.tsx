'use client';

import React, { useState } from 'react';
import {
  Bell,
  Check,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Users,
  Settings,
  BarChart3,
  MoreHorizontal,
  Trash2,
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import {
  NotificationItem,
  NotificationCategory,
} from '@/features/hospital-admin/notificationTypes';

interface NotificationCenterCardProps {
  notifications: NotificationItem[];
  activeTab: NotificationCategory;
  onTabChange: (tab: NotificationCategory) => void;
  onMarkAllAsRead: () => void;
  onViewNotification: (item: NotificationItem) => void;
  onToggleRead: (id: string) => void;
  onDeleteNotification: (id: string) => void;
}

export const NotificationCenterCard: React.FC<NotificationCenterCardProps> = ({
  notifications,
  activeTab,
  onTabChange,
  onMarkAllAsRead,
  onViewNotification,
  onToggleRead,
  onDeleteNotification,
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Tab definitions with counts
  const tabs: { key: NotificationCategory; label: string; count: number }[] = [
    { key: 'All', label: 'All', count: 47 },
    { key: 'Verification', label: 'Verification', count: 8 },
    { key: 'Security', label: 'Security', count: 10 },
    { key: 'Access', label: 'Access', count: 12 },
    { key: 'System', label: 'System', count: 17 },
  ];

  const getNotificationIcon = (type: NotificationItem['iconType']) => {
    switch (type) {
      case 'emergency':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-50 text-[#EF4444] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
          </div>
        );
      case 'verification-doc':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-[#0066FF]" />
          </div>
        );
      case 'security-login':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
          </div>
        );
      case 'role':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-purple-600" />
          </div>
        );
      case 'maintenance':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Settings className="w-4 h-4 text-[#0066FF]" />
          </div>
        );
      case 'failed-login':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-50 text-[#EF4444] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
          </div>
        );
      case 'verified-check':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-[#16A34A]" />
          </div>
        );
      case 'audit-chart':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 text-purple-600" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
        );
    }
  };

  const getPriorityBadge = (priority: NotificationItem['priority']) => {
    switch (priority) {
      case 'High':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]">
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
            Medium
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#0066FF] border border-[#BFDBFE]/60">
            Low
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
            Notifications Center
          </h2>
        </div>

        <button
          type="button"
          onClick={onMarkAllAsRead}
          className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div className="px-4 sm:px-5 pt-3 pb-2 border-b border-slate-100 flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-[#0066FF] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

      {/* Notifications Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 bg-slate-50/50">
              <th className="py-2.5 px-4 font-medium">Notification</th>
              <th className="py-2.5 px-3 font-medium">Source</th>
              <th className="py-2.5 px-3 font-medium">Time</th>
              <th className="py-2.5 px-3 font-medium text-center">Priority</th>
              <th className="py-2.5 px-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400">
                  No notifications in this category.
                </td>
              </tr>
            ) : (
              notifications.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  onClick={() => onViewNotification(item)}
                >
                  {/* Notification Icon, Title, Description */}
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(item.iconType)}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                            {item.title}
                          </p>
                          {!item.isRead && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Source */}
                  <td className="py-3.5 px-3 whitespace-nowrap text-slate-700 font-medium text-[11.5px]">
                    {item.source}
                  </td>

                  {/* Time */}
                  <td className="py-3.5 px-3 whitespace-nowrap text-slate-500 text-[11px] font-mono">
                    {item.timestamp}
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-3 whitespace-nowrap text-center">
                    {getPriorityBadge(item.priority)}
                  </td>

                  {/* Actions */}
                  <td
                    className="py-3.5 px-4 whitespace-nowrap text-center relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewNotification(item)}
                        className="px-3 py-1 rounded-lg border border-blue-200 hover:bg-blue-50 text-[#0066FF] font-semibold text-xs transition-colors cursor-pointer"
                      >
                        View
                      </button>

                      {/* Three-dots menu */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(openMenuId === item.id ? null : item.id)
                          }
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {openMenuId === item.id && (
                          <div className="absolute right-0 top-8 z-30 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                onToggleRead(item.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                            >
                              <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                              <span>{item.isRead ? 'Mark Unread' : 'Mark as Read'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onDeleteNotification(item.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
