'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Bell,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { NotificationItem } from '@/features/hospital-admin/notificationTypes';

interface NotificationDetailModalProps {
  notification: NotificationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleRead: (id: string) => void;
}

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  notification,
  isOpen,
  onClose,
  onToggleRead,
}) => {
  if (!isOpen || !notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  Notification Details
                </h3>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
                  {notification.id}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Source: {notification.source}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Priority & Timestamp banner */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Priority:</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                  notification.priority === 'High'
                    ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]'
                    : notification.priority === 'Medium'
                    ? 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                    : 'bg-[#EFF6FF] text-[#0066FF] border border-[#BFDBFE]'
                }`}
              >
                {notification.priority}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{notification.timestamp}</span>
            </div>
          </div>

          {/* Title & Full Description */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">
              {notification.title}
            </h4>
            <p className="text-slate-600 leading-relaxed text-[12px]">
              {notification.description}
            </p>
          </div>

          {/* Metadata Breakdown if present */}
          {notification.metadata && (
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
              <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                Event Metadata
              </span>
              <div className="space-y-1.5 text-[11.5px]">
                {Object.entries(notification.metadata).map(([key, value]) => (
                  <div key={key} className="flex items-baseline justify-between gap-3">
                    <span className="text-slate-400 capitalize">{key}:</span>
                    <span className="font-medium text-slate-800 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onToggleRead(notification.id)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
          >
            {notification.isRead ? 'Mark as Unread' : 'Mark as Read'}
          </button>

          <div className="flex items-center gap-2">
            {notification.targetUrl && (
              <Link
                href={notification.targetUrl}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                <span>Navigate to Target</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
