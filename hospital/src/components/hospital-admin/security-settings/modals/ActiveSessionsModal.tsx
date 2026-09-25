'use client';

import React, { useState } from 'react';
import {
  X,
  Monitor,
  ShieldAlert,
  Power,
  CheckCircle2,
  Laptop,
} from 'lucide-react';
import { ActiveDeviceSession } from '@/features/hospital-admin/securitySettingsTypes';

interface ActiveSessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ActiveDeviceSession[];
  onRevokeSession: (sessionId: string) => void;
}

export const ActiveSessionsModal: React.FC<ActiveSessionsModalProps> = ({
  isOpen,
  onClose,
  sessions,
  onRevokeSession,
}) => {
  const [revokingId, setRevokingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRevoke = (id: string) => {
    setRevokingId(id);
    setTimeout(() => {
      onRevokeSession(id);
      setRevokingId(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Active Staff Devices &amp; Sessions
              </h3>
              <p className="text-[11px] text-slate-500">
                Manage live authentication tokens across hospital network workstations
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

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-3 text-xs">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{session.user}</span>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                    {session.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {session.device} • {session.location}
                </p>
                <p className="text-[10.5px] font-mono text-slate-400">
                  IP: {session.ipAddress || '10.0.0.1'} • {session.lastSeen || 'Active now'}
                </p>
              </div>

              {session.user !== 'Rajesh Kumar' && (
                <button
                  type="button"
                  disabled={revokingId === session.id}
                  onClick={() => handleRevoke(session.id)}
                  className="px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-rose-600 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{revokingId === session.id ? 'Terminating...' : 'Revoke'}</span>
                </button>
              )}
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
