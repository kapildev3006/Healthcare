'use client';

import React from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';

interface MyPatientsFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCondition: string;
  onConditionChange: (c: string) => void;
  selectedStatus: string;
  onStatusChange: (s: string) => void;
  selectedLastVisit: string;
  onLastVisitChange: (v: string) => void;
  sortBy: string;
  onSortByChange: (s: string) => void;
  onAddPatientClick: () => void;
}

export function MyPatientsFilterBar({
  searchQuery,
  onSearchChange,
  selectedCondition,
  onConditionChange,
  selectedStatus,
  onStatusChange,
  selectedLastVisit,
  onLastVisitChange,
  sortBy,
  onSortByChange,
  onAddPatientClick,
}: MyPatientsFilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Top Row: Search Input + Add Patient CTA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search in my patients..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
          />
        </div>

        {/* Add Patient Button */}
        <button
          type="button"
          onClick={onAddPatientClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>

      {/* Bottom Row: Filters & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Left side: 3 filter dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Condition Filter */}
          <div className="relative min-w-[150px]">
            <select
              value={selectedCondition}
              onChange={(e) => onConditionChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
            >
              <option value="All Conditions">All Conditions</option>
              <option value="Type 2 Diabetes">Type 2 Diabetes</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Cardiac Care">Cardiac Care</option>
              <option value="Asthma">Asthma</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Thyroid Disorder">Thyroid Disorder</option>
              <option value="COPD">COPD</option>
              <option value="Migraine">Migraine</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Follow-up Due">Follow-up Due</option>
              <option value="Needs Review">Needs Review</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Last Visit Filter */}
          <div className="relative min-w-[150px]">
            <select
              value={selectedLastVisit}
              onChange={(e) => onLastVisitChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
            >
              <option value="Last Visit (Any)">Last Visit (Any)</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Right side: Sort by */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
            Sort by
          </span>
          <div className="relative min-w-[160px]">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
            >
              <option value="Last Visit (Newest)">Last Visit (Newest)</option>
              <option value="Last Visit (Oldest)">Last Visit (Oldest)</option>
              <option value="Patient Name (A-Z)">Patient Name (A-Z)</option>
              <option value="Age (High-Low)">Age (High-Low)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
