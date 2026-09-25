'use client';

import React from 'react';

export const AccessAuditHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Access Audit Logs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Review and monitor standard patient-record access activity across CityCare Hospital.
        </p>
      </div>

      <div className="text-left sm:text-right">
        <p className="text-xs sm:text-sm font-semibold text-slate-700">
          Thursday, 12 June 2025
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Ensure patient data privacy and compliance with hospital policies.
        </p>
      </div>
    </div>
  );
};
