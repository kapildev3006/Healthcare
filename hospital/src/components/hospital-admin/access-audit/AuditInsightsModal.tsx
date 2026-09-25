'use client';

import React from 'react';
import { X, BarChart3, TrendingUp, Users, Building2, Eye, ShieldCheck } from 'lucide-react';
import { AuditInsightItem } from '@/features/hospital-admin/accessAuditTypes';

interface AuditInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  insights: AuditInsightItem[];
}

export const AuditInsightsModal: React.FC<AuditInsightsModalProps> = ({
  isOpen,
  onClose,
  insights,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Detailed Audit Insights
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Longitudinal access volume and behavioral distributions
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
        <div className="p-5 space-y-4 overflow-y-auto text-xs">
          <div className="grid grid-cols-2 gap-3">
            {insights.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50"
              >
                <p className="text-slate-400 font-medium text-[11px]">
                  {item.label}
                </p>
                <p className="font-bold text-slate-900 text-sm mt-1">
                  {item.value}
                </p>
                <p
                  className={`text-xs mt-1 font-semibold ${
                    item.trend ? 'text-rose-500' : 'text-blue-600'
                  }`}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-slate-700 text-xs leading-relaxed">
            <span className="font-bold text-[#0066FF] block mb-1">
              Audit Compliance Summary
            </span>
            All 1,284 logged accesses conform to the CityCare Hospital EHR Access
            Charter. 97.4% of accesses were classified as Standard Routine Care,
            with 1.8% flagged for secondary administrator sign-off.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
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
