'use client';

import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileText, CheckCircle2 } from 'lucide-react';
import { AccessAuditLogRow } from '@/features/hospital-admin/accessAuditTypes';

interface ExportAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AccessAuditLogRow[];
  onComplete: (format: string) => void;
}

export const ExportAuditModal: React.FC<ExportAuditModalProps> = ({
  isOpen,
  onClose,
  logs,
  onComplete,
}) => {
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [includeForensics, setIncludeForensics] = useState(true);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (format === 'csv') {
      const headers = [
        'ID',
        'Index',
        'User',
        'Role',
        'Patient Record',
        'Access Type',
        'Reason',
        'Timestamp',
        'Duration',
        'Department',
        'Status',
        'IP Address',
        'Device ID',
        'Hash',
      ];

      const csvRows = logs.map((l) => [
        l.id,
        l.index,
        `"${l.user}"`,
        `"${l.role}"`,
        `"${l.patientRecord}"`,
        l.accessType,
        `"${l.reason}"`,
        `"${l.timestamp}"`,
        l.duration,
        `"${l.department}"`,
        l.status,
        l.ipAddress || '',
        l.deviceId || '',
        l.hash || '',
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...csvRows.map((e) => e.join(','))].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `Access_Audit_Logs_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      // Mock PDF export report
      const textContent = `CityCare Hospital - Access Audit Logs Report\nGenerated: ${new Date().toLocaleString()}\nTotal Records: ${logs.length}\n\n` +
        logs.map(l => `[${l.timestamp}] ${l.user} (${l.role}) accessed ${l.patientRecord} - Reason: ${l.reason} [${l.status}]`).join('\n');
      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Access_Audit_Report_${new Date().toISOString().slice(0, 10)}.txt`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    onComplete(format.toUpperCase());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Export Audit Logs
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Download verified access trail report ({logs.length} records)
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
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  format === 'csv'
                    ? 'border-[#0066FF] bg-blue-50/50 text-[#0066FF]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <div className="text-left">
                  <p className="font-bold text-xs">CSV Spreadsheet</p>
                  <p className="text-[10.5px] text-slate-400">Excel / Numbers</p>
                </div>
              </div>

              <div
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  format === 'pdf'
                    ? 'border-[#0066FF] bg-blue-50/50 text-[#0066FF]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <FileText className="w-4 h-4" />
                <div className="text-left">
                  <p className="font-bold text-xs">Audit Report (PDF)</p>
                  <p className="text-[10.5px] text-slate-400">Compliance standard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeForensics}
                onChange={(e) => setIncludeForensics(e.target.checked)}
                className="w-4 h-4 rounded text-[#0066FF] border-slate-300 focus:ring-blue-400 focus:ring-offset-0 cursor-pointer"
              />
              <span>Include IP address and SHA-256 integrity hashes</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="h-8 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="h-8 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate & Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
