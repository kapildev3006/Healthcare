'use client';

import React, { useState } from 'react';
import {
  X,
  Clock,
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { SecurityEventItem } from '@/features/hospital-admin/securitySettingsTypes';

interface SecurityEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: SecurityEventItem[];
}

export const SecurityEventsModal: React.FC<SecurityEventsModalProps> = ({
  isOpen,
  onClose,
  events,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = events.filter(
    (e) =>
      e.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.location && e.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                All Hospital Security Events
              </h3>
              <p className="text-[11px] text-slate-500">
                Real-time security telemetry &amp; authentication event feed
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

        {/* Search */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter events by user, type, or department..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-2 text-xs">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{item.user}</span>
                  <span
                    className={`font-semibold ${
                      item.eventColor === 'red'
                        ? 'text-rose-600'
                        : item.eventColor === 'green'
                        ? 'text-emerald-600'
                        : 'text-blue-600'
                    }`}
                  >
                    • {item.event}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Location: {item.location || 'Hospital Terminal'} • IP: {item.ipAddress || '10.0.0.1'}
                </p>
              </div>

              <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                {item.timestamp}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
