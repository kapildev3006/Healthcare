'use client';

import React from 'react';

export const NotificationHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Notifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Stay updated with important administrative alerts and system updates.
        </p>
      </div>

      <div className="text-left sm:text-right">
        <p className="text-xs sm:text-sm font-semibold text-slate-700">
          Thursday, 12 June 2025
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Never miss what matters. Keep CityCare running smoothly.
        </p>
      </div>
    </div>
  );
};
