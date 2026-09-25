'use client';

import React from 'react';
import {
  X,
  FileText,
  Download,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  ExternalLink,
} from 'lucide-react';
import { VerificationDoc } from './VerificationDocumentsGrid';

interface DocumentViewerModalProps {
  document: VerificationDoc | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleVerified?: (docId: string) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  isOpen,
  onClose,
  onToggleVerified,
}) => {
  const [zoom, setZoom] = React.useState(100);

  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate">
                {document.name}
              </h3>
              <p className="text-xs text-slate-400">
                {document.size} • Uploaded on {document.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 border border-slate-200 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(50, z - 15))}
                className="w-7 h-7 rounded hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono font-medium text-slate-600 px-1.5 select-none">
                {zoom}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(200, z + 15))}
                className="w-7 h-7 rounded hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Download */}
            <button
              type="button"
              className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              title="Download file"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Simulated Viewer Canvas */}
        <div className="flex-1 p-6 bg-slate-100/70 overflow-auto flex items-center justify-center min-h-[360px]">
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-150 w-full max-w-xl bg-white rounded-xl shadow-md border border-slate-200/90 p-8 sm:p-12 text-slate-800 text-center select-none"
          >
            {/* Document Decorative Seal / Header */}
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0066FF] mx-auto flex items-center justify-center mb-4 border border-blue-200">
              <FileText className="w-8 h-8" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0066FF]">
              Official Hospital Credential Verification
            </span>
            <h4 className="text-xl font-bold text-slate-900 mt-1 mb-2">
              {document.name.replace('.pdf', '')}
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
              Certificate issued by accredited regulatory authority. Verified against the National Medical Registry under license ID: MED784521.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs text-left bg-slate-50 p-4 rounded-xl border border-slate-100 max-w-md mx-auto mb-6">
              <div>
                <span className="text-slate-400 block text-[11px]">Beneficiary</span>
                <span className="font-semibold text-slate-800">Dr. Priya Sharma</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Specialization</span>
                <span className="font-semibold text-slate-800">Cardiology</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Registration No</span>
                <span className="font-mono font-semibold text-slate-800">MED784521</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Validity Status</span>
                <span className="font-semibold text-emerald-600">Active & Confirmed</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Digital Signature Authenticated</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Document Status:</span>
            {document.status === 'Verified' ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                Pending Review
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-all cursor-pointer"
            >
              Close
            </button>

            {onToggleVerified && (
              <button
                type="button"
                onClick={() => {
                  onToggleVerified(document.id);
                  onClose();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  document.status === 'Verified'
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-[#0066FF] hover:bg-blue-600 text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {document.status === 'Verified'
                    ? 'Mark as Pending'
                    : 'Mark as Verified'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
