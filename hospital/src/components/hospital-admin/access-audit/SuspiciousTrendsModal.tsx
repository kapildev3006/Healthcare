'use client';

import React from 'react';
import { X, AlertTriangle, ShieldAlert, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SuspiciousTrendItem } from '@/features/hospital-admin/accessAuditTypes';

interface SuspiciousTrendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trends: SuspiciousTrendItem[];
  onReviewAll: () => void;
}

export const SuspiciousTrendsModal: React.FC<SuspiciousTrendsModalProps> = ({
  isOpen,
  onClose,
  trends,
  onReviewAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Suspicious Access Trends
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Automated security pattern and outlier detections
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

        {/* List */}
        <div className="p-5 space-y-3 overflow-y-auto">
          {trends.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-rose-200 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <p className="font-bold text-xs text-slate-900">
                    {item.title}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    {item.count}
                  </span>
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                    {item.trend}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 pl-4 leading-relaxed">
                {item.description}. Recommended action: Review session IP
                addresses and compare against clinical shift rosters.
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onReviewAll}
            className="h-8 px-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mark All Outliers Reviewed</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-8 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
