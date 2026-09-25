'use client';

import React, { useState } from 'react';
import {
  X,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  RotateCw,
  Send,
  Smartphone,
  Mail,
  ShieldCheck,
} from 'lucide-react';

interface NotificationLog {
  id: string;
  patientRecord: string;
  patientName: string;
  doctor: string;
  channel: 'Mobile App Push' | 'SMS' | 'Email';
  status: 'Notified' | 'Pending Notification' | 'Notification Failed' | 'Not Required';
  timestamp: string;
  details: string;
}

const mockNotificationLogs: NotificationLog[] = [
  {
    id: 'NOTIF-01',
    patientRecord: 'Patient Record #77123',
    patientName: 'Aarav Patel',
    doctor: 'Dr. Vikram Singh',
    channel: 'Mobile App Push',
    status: 'Notified',
    timestamp: 'Jun 12, 2025 02:22 AM',
    details: 'Push notification delivered to patient mobile device and emergency contact.',
  },
  {
    id: 'NOTIF-02',
    patientRecord: 'Patient Record #66218',
    patientName: 'Sunita Sharma',
    doctor: 'Nurse Emily Carter',
    channel: 'SMS',
    status: 'Notified',
    timestamp: 'Jun 11, 2025 11:45 PM',
    details: 'SMS delivery confirmed via telecom gateway (+91 98765-XXXXX).',
  },
  {
    id: 'NOTIF-03',
    patientRecord: 'Patient Record #33901',
    patientName: 'Kavita Menon',
    doctor: 'Dr. Rohan Malhotra',
    channel: 'Mobile App Push',
    status: 'Notified',
    timestamp: 'Jun 11, 2025 08:14 PM',
    details: 'Viewed and acknowledged in patient mobile app.',
  },
  {
    id: 'NOTIF-04',
    patientRecord: 'Patient Record #63901',
    patientName: 'Devendra Rao',
    doctor: 'IT Support (Rohan)',
    channel: 'Email',
    status: 'Not Required',
    timestamp: 'Jun 11, 2025 06:45 AM',
    details: 'System internal maintenance protocol exemption.',
  },
  {
    id: 'NOTIF-05',
    patientRecord: 'Patient Record #45872',
    patientName: 'Meera Deshmukh',
    doctor: 'Dr. Priya Sharma',
    channel: 'Mobile App Push',
    status: 'Pending Notification',
    timestamp: 'Jun 10, 2025 10:20 PM',
    details: 'Queued in delivery queue. Retrying network push.',
  },
  {
    id: 'NOTIF-06',
    patientRecord: 'Patient Record #99321',
    patientName: 'Rajesh Verma',
    doctor: 'Dr. Ananya Iyer',
    channel: 'SMS',
    status: 'Notification Failed',
    timestamp: 'Jun 10, 2025 07:38 PM',
    details: 'Gateway timeout. Primary contact unreachable.',
  },
];

interface PatientNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResendNotification?: (id: string) => void;
}

export const PatientNotificationModal: React.FC<PatientNotificationModalProps> = ({
  isOpen,
  onClose,
  onResendNotification,
}) => {
  const [logs, setLogs] = useState<NotificationLog[]>(mockNotificationLogs);
  const [resendingId, setResendingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleResend = (id: string) => {
    setResendingId(id);
    setTimeout(() => {
      setLogs((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: 'Notified' as const } : l))
      );
      setResendingId(null);
      if (onResendNotification) onResendNotification(id);
    }, 800);
  };

  const getStatusBadge = (status: NotificationLog['status']) => {
    switch (status) {
      case 'Notified':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Notified
          </span>
        );
      case 'Pending Notification':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
            <Clock className="w-2.5 h-2.5" />
            Pending
          </span>
        );
      case 'Notification Failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]">
            <AlertCircle className="w-2.5 h-2.5" />
            Failed
          </span>
        );
      case 'Not Required':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
            <HelpCircle className="w-2.5 h-2.5" />
            Not Required
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-blue-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  Patient Emergency Notification Logs
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                  18 Total Events
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Automated transparency notifications sent to patients upon break-glass access
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
        <div className="p-5 overflow-y-auto space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{log.patientRecord}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-medium text-slate-700">{log.patientName}</span>
                  {getStatusBadge(log.status)}
                </div>

                <p className="text-[11px] text-slate-500">
                  Accessed by <span className="font-medium text-slate-700">{log.doctor}</span> •{' '}
                  <span className="text-slate-400">{log.channel}</span> • {log.timestamp}
                </p>

                <p className="text-[11px] text-slate-600 italic bg-white/70 px-2 py-1 rounded border border-slate-100">
                  {log.details}
                </p>
              </div>

              {log.status === 'Notification Failed' && (
                <button
                  type="button"
                  disabled={resendingId === log.id}
                  onClick={() => handleResend(log.id)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RotateCw
                    className={`w-3.5 h-3.5 ${resendingId === log.id ? 'animate-spin' : ''}`}
                  />
                  {resendingId === log.id ? 'Sending...' : 'Retry'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Complies with Healthcare Information Privacy & ABDM Patient Charter.</span>
          </div>
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
  );
};
