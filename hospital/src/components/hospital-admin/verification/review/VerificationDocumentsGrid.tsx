'use client';

import React from 'react';
import { FileText, Eye } from 'lucide-react';

export interface VerificationDoc {
  id: string;
  name: string;
  size: string;
  date: string;
  status: 'Verified' | 'Pending Review';
}

interface VerificationDocumentsGridProps {
  documents?: VerificationDoc[];
  onPreviewDoc?: (doc: VerificationDoc) => void;
}

const defaultDocs: VerificationDoc[] = [
  {
    id: 'doc-1',
    name: 'MBBS_Degree_Certificate.pdf',
    size: '1.2 MB',
    date: 'Jun 10, 2025',
    status: 'Verified',
  },
  {
    id: 'doc-2',
    name: 'MCI_Registration_Certificate.pdf',
    size: '825 KB',
    date: 'Jun 10, 2025',
    status: 'Verified',
  },
  {
    id: 'doc-3',
    name: 'Aadhaar_ID_Proof.pdf',
    size: '420 KB',
    date: 'Jun 9, 2025',
    status: 'Verified',
  },
  {
    id: 'doc-4',
    name: 'Experience_Letter.pdf',
    size: '610 KB',
    date: 'Jun 9, 2025',
    status: 'Pending Review',
  },
];

export const VerificationDocumentsGrid: React.FC<
  VerificationDocumentsGridProps
> = ({ documents = defaultDocs, onPreviewDoc }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Uploaded Verification Documents
          </h3>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
        >
          View All →
        </button>
      </div>

      {/* 4 Document Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => onPreviewDoc?.(doc)}
            className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2.5">
                {/* PDF Red Badge Icon */}
                <div className="w-8 h-9 rounded-md bg-[#EF4444] text-white flex flex-col items-center justify-center font-bold text-[9px] shadow-2xs shrink-0 tracking-wider">
                  <span>PDF</span>
                </div>

                {/* Eye Icon Preview Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreviewDoc?.(doc);
                  }}
                  className="w-7 h-7 rounded-full bg-blue-50 text-[#0066FF] hover:bg-blue-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  title="Preview document"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title */}
              <h4 className="text-xs font-semibold text-slate-900 group-hover:text-[#0066FF] transition-colors truncate">
                {doc.name}
              </h4>

              {/* Subtext */}
              <p className="text-[11px] text-slate-400 mt-0.5">
                {doc.size} • {doc.date}
              </p>
            </div>

            {/* Status Badge */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center">
              {doc.status === 'Verified' ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                  Pending Review
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
