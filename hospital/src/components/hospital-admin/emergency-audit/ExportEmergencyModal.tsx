'use client';

import React, { useState } from 'react';
import {
  X,
  Download,
  FileSpreadsheet,
  FileText,
  FileCode,
  Calendar,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { EmergencyAccessEvent } from '@/features/hospital-admin/emergencyAuditTypes';

interface ExportEmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EmergencyAccessEvent[];
  onExportSuccess: (format: string) => void;
}

export const ExportEmergencyModal: React.FC<ExportEmergencyModalProps> = ({
  isOpen,
  onClose,
  events,
  onExportSuccess,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'pdf' | 'json'>('csv');
  const [dateRange, setDateRange] = useState('7d');
  const [includeSystemMetadata, setIncludeSystemMetadata] = useState(true);
  const [complianceCertified, setComplianceCertified] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);

    setTimeout(() => {
      if (selectedFormat === 'csv') {
        const headers = [
          'Event ID',
          'User',
          'Patient Record',
          'Emergency Reason',
          'Department',
          'Initiated On',
          'Expiry Time',
          'Audit Status',
          'Severity',
        ];
        const rows = events.map((e) => [
          e.id,
          `"${e.user}"`,
          `"${e.patientRecord}"`,
          `"${e.emergencyReason}"`,
          `"${e.department}"`,
          `"${e.initiatedOn}"`,
          `"${e.expiryTime}"`,
          `"${e.auditStatus}"`,
          `"${e.severity}"`,
        ]);
        const csvContent =
          'data:text/csv;charset=utf-8,' +
          [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `emergency-access-audit-${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (selectedFormat === 'json') {
        const dataStr =
          'data:text/json;charset=utf-8,' +
          encodeURIComponent(JSON.stringify(events, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', `emergency-access-audit-${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      } else {
        // PDF simulation / Print
        window.print();
      }

      setIsExporting(false);
      onExportSuccess(selectedFormat.toUpperCase());
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Export Emergency Access Audit Log
              </h3>
              <p className="text-[11px] text-slate-500">
                Generate encrypted audit reports for compliance & clinical governance
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
        <div className="p-5 space-y-4 text-xs text-slate-600">
          {/* Format Selection */}
          <div>
            <label className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block mb-2">
              Select Export Format
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedFormat('csv')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedFormat === 'csv'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-700 font-semibold ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                <span className="text-xs block">CSV Spreadsheet</span>
                <span className="text-[10px] text-slate-400">Excel / Sheets</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('pdf')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedFormat === 'pdf'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-700 font-semibold ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <FileText className="w-5 h-5 mx-auto mb-1 text-rose-600" />
                <span className="text-xs block">PDF Compliance</span>
                <span className="text-[10px] text-slate-400">Signed Report</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('json')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedFormat === 'json'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-700 font-semibold ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <FileCode className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                <span className="text-xs block">Raw JSON</span>
                <span className="text-[10px] text-slate-400">Audit SIEM API</span>
              </button>
            </div>
          </div>

          {/* Time range */}
          <div>
            <label className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block mb-1.5">
              Time Scope
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-700"
              >
                <option value="today">Today only (Last 24 Hours - 3 Events)</option>
                <option value="7d">Last 7 Days (18 Events)</option>
                <option value="30d">Last 30 Days (42 Events)</option>
                <option value="all">All-time Recorded Events</option>
              </select>
            </div>
          </div>

          {/* Compliance & Options */}
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeSystemMetadata}
                onChange={(e) => setIncludeSystemMetadata(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-700 font-medium">
                Include IP addresses, device identifiers, and cryptographic hash verification
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={complianceCertified}
                onChange={(e) => setComplianceCertified(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-700 font-medium">
                Affix Hospital Administrator digital verification stamp (NABH / ABDM standard)
              </span>
            </label>
          </div>

          {/* Notice box */}
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-900 leading-relaxed">
              Exporting emergency audit logs is recorded as an administrative security event in the immutable platform log.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isExporting}
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            {isExporting ? (
              'Generating...'
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Export {selectedFormat.toUpperCase()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
