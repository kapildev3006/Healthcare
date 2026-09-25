'use client';

import React from 'react';
import {
  Zap,
  Search,
  AlertTriangle,
  CheckCircle2,
  FileText,
  KeyRound,
} from 'lucide-react';
import { QuickActionItem } from '@/features/doctor/doctorDashboardTypes';

interface QuickActionsCardProps {
  actions: QuickActionItem[];
  onActionClick: (actionId: string) => void;
}

const colorStyles: Record<
  string,
  {
    bg: string;
    border: string;
    hoverBg: string;
    iconBg: string;
    iconColor: string;
  }
> = {
  blue: {
    bg: 'bg-sky-50/60',
    border: 'border-sky-100/80',
    hoverBg: 'hover:bg-sky-50',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
  },
  red: {
    bg: 'bg-rose-50/60',
    border: 'border-rose-100/80',
    hoverBg: 'hover:bg-rose-50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
  },
  green: {
    bg: 'bg-emerald-50/60',
    border: 'border-emerald-100/80',
    hoverBg: 'hover:bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  purple: {
    bg: 'bg-purple-50/60',
    border: 'border-purple-100/80',
    hoverBg: 'hover:bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  amber: {
    bg: 'bg-amber-50/60',
    border: 'border-amber-100/80',
    hoverBg: 'hover:bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
};

export function QuickActionsCard({ actions, onActionClick }: QuickActionsCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return Search;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'CheckCircle2':
        return CheckCircle2;
      case 'FileText':
        return FileText;
      case 'KeyRound':
        return KeyRound;
      default:
        return Zap;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3.5 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Zap className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-slate-900">Quick Actions</h2>
      </div>

      {/* Action Buttons List */}
      <div className="space-y-2.5 pt-3">
        {actions.map((act) => {
          const style = colorStyles[act.colorTheme] || colorStyles.blue;
          const Icon = getIcon(act.iconName);

          return (
            <button
              key={act.id}
              onClick={() => onActionClick(act.id)}
              className={`w-full flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all duration-150 group cursor-pointer ${style.bg} ${style.border} ${style.hoverBg} hover:shadow-2xs`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${style.iconBg} ${style.iconColor}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {act.title}
                </p>
                <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                  {act.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
