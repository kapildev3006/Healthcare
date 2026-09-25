'use client';

import React from 'react';
import { Paperclip, FileText, Download } from 'lucide-react';
import { AuditEvidenceItem } from '@/features/hospital-admin/emergencyAuditDetailTypes';

interface AuditEvidenceCardProps {
  evidence: AuditEvidenceItem[];
  onDownloadEvidence?: (item: AuditEvidenceItem) => void;
}

export const AuditEvidenceCard: React.FC<AuditEvidenceCardProps> = ({
  evidence,
  onDownloadEvidence,
}) => {
  const handleDownload = (item: AuditEvidenceItem) => {
    if (onDownloadEvidence) {
      onDownloadEvidence(item);
    } else {
      // Simulate real download
      const content = `Audit Evidence File: ${item.title}\nFilename: ${item.filename}\nTimestamp: ${new Date().toISOString()}\nVerified by Hospital Administrator (Immutable Hash Validated)`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3.5 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <Paperclip className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-sm text-slate-900 tracking-tight">
          Related Audit Evidence
        </h3>
      </div>

      {/* Files List */}
      <div className="space-y-2.5">
        {evidence.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-1 text-xs gap-2 group"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center shrink-0 mt-0.5 text-slate-400 group-hover:text-[#0066FF] transition-colors">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-slate-900 truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-400 font-mono truncate">
                  {item.filename}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDownload(item)}
              className="w-7 h-7 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-400 hover:text-[#0066FF] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              title={`Download ${item.filename}`}
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
