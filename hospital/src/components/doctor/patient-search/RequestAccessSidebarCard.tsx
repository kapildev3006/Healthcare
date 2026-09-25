'use client';

import React from 'react';
import { UserCheck, ArrowRight } from 'lucide-react';

interface RequestAccessSidebarCardProps {
  onRequestAccess: () => void;
}

export function RequestAccessSidebarCard({
  onRequestAccess,
}: RequestAccessSidebarCardProps) {
  return (
    <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-5 space-y-3.5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
          <UserCheck className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            Request Patient Access
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1 leading-snug">
            Don&apos;t have access to a patient&apos;s records? Send an access request.
          </p>
        </div>
      </div>

      <button
        onClick={onRequestAccess}
        className="w-full py-2.5 px-4 bg-white hover:bg-sky-100/60 text-blue-600 border border-sky-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs group cursor-pointer"
      >
        <span>Request Access</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
