'use client';

import React from 'react';
import { ShieldCheck, Users, FileText, Activity } from 'lucide-react';
import { SecurityMetrics } from '@/features/hospital-admin/securitySettingsTypes';

interface SecurityMetricsRowProps {
  metrics: SecurityMetrics;
}

export const SecurityMetricsRow: React.FC<SecurityMetricsRowProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Security Score */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-all">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Security Score</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {metrics.securityScore}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {metrics.securityScoreTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {metrics.securityScoreSub}
          </p>
        </div>
      </div>

      {/* 2. 2FA Adoption */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-all">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <Users className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">2FA Adoption</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {metrics.twoFactorAdoption}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {metrics.twoFactorTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {metrics.twoFactorSub}
          </p>
        </div>
      </div>

      {/* 3. Audit Coverage */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-all">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">Audit Coverage</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {metrics.auditCoverage}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {metrics.auditCoverageTrend}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {metrics.auditCoverageSub}
          </p>
        </div>
      </div>

      {/* 4. System Health */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center gap-3.5 hover:border-blue-200 transition-all">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
          <Activity className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-500 font-medium">System Health</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {metrics.systemHealth}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
            {metrics.systemHealthSub}
          </p>
        </div>
      </div>
    </div>
  );
};
