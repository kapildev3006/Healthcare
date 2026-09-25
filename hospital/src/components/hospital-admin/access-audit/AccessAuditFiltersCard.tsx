'use client';

import React, { useState } from 'react';
import {
  Filter,
  Calendar,
  User,
  Building2,
  Tag,
  ChevronDown,
} from 'lucide-react';
import { AuditLogFilterState } from '@/features/hospital-admin/accessAuditTypes';
import { mockFilterOptions } from '@/features/hospital-admin/accessAuditMockData';

interface AccessAuditFiltersCardProps {
  filters: AuditLogFilterState;
  onFilterChange: (filters: AuditLogFilterState) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export const AccessAuditFiltersCard: React.FC<AccessAuditFiltersCardProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 flex-wrap">
        {/* Left Filter Title */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-slate-900">Filters</span>
        </div>

        {/* Filter Controls Row */}
        <div className="flex items-center gap-2.5 flex-wrap flex-1">
          {/* 1. Date Range Dropdown */}
          <div className="relative min-w-[210px] flex-1 sm:flex-initial">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <select
              value={filters.dateRange}
              onChange={(e) =>
                onFilterChange({ ...filters, dateRange: e.target.value })
              }
              className="w-full pl-8 pr-8 py-2 bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:border-[#0066FF] transition-all appearance-none cursor-pointer"
            >
              {mockFilterOptions.dateRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 2. All Users Dropdown */}
          <div className="relative min-w-[150px] flex-1 sm:flex-initial">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-3.5 h-3.5" />
            </div>
            <select
              value={filters.user}
              onChange={(e) =>
                onFilterChange({ ...filters, user: e.target.value })
              }
              className="w-full pl-8 pr-8 py-2 bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:border-[#0066FF] transition-all appearance-none cursor-pointer"
            >
              {mockFilterOptions.users.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 3. All Departments Dropdown */}
          <div className="relative min-w-[160px] flex-1 sm:flex-initial">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <select
              value={filters.department}
              onChange={(e) =>
                onFilterChange({ ...filters, department: e.target.value })
              }
              className="w-full pl-8 pr-8 py-2 bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:border-[#0066FF] transition-all appearance-none cursor-pointer"
            >
              {mockFilterOptions.departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 4. All Access Types Dropdown */}
          <div className="relative min-w-[155px] flex-1 sm:flex-initial">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Tag className="w-3.5 h-3.5" />
            </div>
            <select
              value={filters.accessType}
              onChange={(e) =>
                onFilterChange({ ...filters, accessType: e.target.value })
              }
              className="w-full pl-8 pr-8 py-2 bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200/90 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:border-[#0066FF] transition-all appearance-none cursor-pointer"
            >
              {mockFilterOptions.accessTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 5. Show Flagged Only Checkbox */}
          <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none px-1 py-1">
            <input
              type="checkbox"
              checked={filters.showFlaggedOnly}
              onChange={(e) =>
                onFilterChange({ ...filters, showFlaggedOnly: e.target.checked })
              }
              className="w-4 h-4 rounded text-[#0066FF] border-slate-300 focus:ring-blue-400 focus:ring-offset-0 cursor-pointer"
            />
            <span>Show Flagged Only</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onApplyFilters}
            className="h-8 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-semibold text-xs flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-98"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={onClearFilters}
            className="h-8 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#0066FF] font-semibold text-xs flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-98"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
