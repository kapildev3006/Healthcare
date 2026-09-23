'use client';

import React from 'react';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { ComplianceDocumentItem } from '../../../features/hospital-admin/profileTypes';

interface ComplianceDocumentsCardProps {
  documents: ComplianceDocumentItem[];
  onViewAll?: () => void;
  onDownload?: (doc: ComplianceDocumentItem) => void;
}

export const ComplianceDocumentsCard: React.FC<ComplianceDocumentsCardProps> = ({
  documents,
  onViewAll,
  onDownload,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1877F2]" strokeWidth={2.2} />
            <h3 className="font-bold text-[15px] text-slate-900">
              Compliance Documents
            </h3>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-1 text-[12px] font-semibold text-[#1877F2] hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Documents list */}
        <div className="mt-3.5 space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-xs sm:text-[13px] text-slate-900 truncate">
                    {doc.title}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {doc.fileType} • {doc.size}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDownload?.(doc)}
                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-[#1877F2] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                title={`Download ${doc.title}`}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
