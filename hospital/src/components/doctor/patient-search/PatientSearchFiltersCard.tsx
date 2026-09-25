'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal, QrCode, Phone, IdCard, UserCheck, X } from 'lucide-react';
import { SearchTabType, PatientSearchFiltersState } from '@/features/doctor/patientSearchTypes';

interface PatientSearchFiltersCardProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
  activeTab: SearchTabType;
  onTabChange: (tab: SearchTabType) => void;
  filters: PatientSearchFiltersState;
  onFilterChange: (key: keyof PatientSearchFiltersState, value: string) => void;
  onClearFilters: () => void;
  onScanQrClick: () => void;
}

export function PatientSearchFiltersCard({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  activeTab,
  onTabChange,
  filters,
  onFilterChange,
  onClearFilters,
  onScanQrClick,
}: PatientSearchFiltersCardProps) {
  const [showAdvanced, setShowAdvanced] = useState(true);

  const tabs: { id: SearchTabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'details', label: 'Search by Details', icon: UserCheck },
    { id: 'health-id', label: 'Search by Health ID', icon: IdCard },
    { id: 'phone', label: 'Search by Phone', icon: Phone },
    { id: 'qr', label: 'Scan QR Code', icon: QrCode },
  ];

  const handleTabClick = (tabId: SearchTabType) => {
    if (tabId === 'qr') {
      onScanQrClick();
      return;
    }
    onTabChange(tabId);
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'health-id':
        return 'Enter Patient Health ID (e.g. 91-2345-6789-1234 or AHC-26-84X71K)...';
      case 'phone':
        return 'Enter registered mobile phone number (e.g. +91 98765 43210)...';
      default:
        return 'Enter patient name, UHID, Health ID, or phone number...';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
      {/* Search Mode Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200/80 text-sm font-semibold overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`pb-3 transition-colors relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Search Input & Submit Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
            placeholder={getPlaceholder()}
            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={onSearchSubmit}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-blue-500/25 transition-all shrink-0 cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Advanced Filters Header */}
      <div className="pt-1 flex items-center justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Advanced Filters</span>
        </button>

        <button
          onClick={onClearFilters}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {/* Advanced Filter Dropdowns */}
      {showAdvanced && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          {/* Gender */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Gender
            </label>
            <select
              value={filters.gender}
              onChange={(e) => onFilterChange('gender', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Age Range */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Age Range
            </label>
            <select
              value={filters.ageRange}
              onChange={(e) => onFilterChange('ageRange', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="0-18">0 - 18 yrs</option>
              <option value="19-40">19 - 40 yrs</option>
              <option value="41-60">41 - 60 yrs</option>
              <option value="60+">60+ yrs</option>
            </select>
          </div>

          {/* Location / Department */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>

          {/* Patient Type */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Patient Type
            </label>
            <select
              value={filters.patientType}
              onChange={(e) => onFilterChange('patientType', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
              <option value="Regular">Regular</option>
            </select>
          </div>

          {/* Access Status */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Access Status
            </label>
            <select
              value={filters.accessStatus}
              onChange={(e) => onFilterChange('accessStatus', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="Authorized">Authorized</option>
              <option value="Request Access">Request Access</option>
              <option value="Pending">Pending</option>
              <option value="Access Denied">Access Denied</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
