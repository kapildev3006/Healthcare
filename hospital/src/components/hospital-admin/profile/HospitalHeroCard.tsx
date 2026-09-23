'use client';

import React from 'react';
import Image from 'next/image';
import {
  Building2,
  Camera,
  CheckCircle2,
  Sparkles,
  Activity,
} from 'lucide-react';
import { HospitalProfileInfo } from '../../../features/hospital-admin/profileTypes';

interface HospitalHeroCardProps {
  info: HospitalProfileInfo;
  onChangeCover?: () => void;
  onChangeLogo?: () => void;
}

export const HospitalHeroCard: React.FC<HospitalHeroCardProps> = ({
  info,
  onChangeCover,
  onChangeLogo,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden relative mb-6">
      {/* Right Background Hospital Building Exterior */}
      <div className="absolute right-0 top-0 bottom-0 w-2/5 md:w-[45%] overflow-hidden pointer-events-none hidden sm:block">
        <Image
          src="/citycare_building.png"
          alt="CityCare Hospital Building"
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover object-left"
          priority
        />
        {/* Soft edge blend on the left edge only */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      </div>

      {/* Change Cover Button (Top Right) */}
      <div className="absolute top-4 right-4 z-10">
        <button
          type="button"
          onClick={onChangeCover}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-700 text-xs font-semibold backdrop-blur-xs border border-slate-200/90 shadow-xs cursor-pointer active:scale-95 transition-all"
        >
          <Camera className="w-3.5 h-3.5 text-slate-600" />
          <span>Change Cover</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center gap-6 max-w-2xl lg:max-w-3xl">
        {/* Hospital Logo Avatar Badge with Edit Camera button */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#E5F2FE] border-4 border-white shadow-sm flex flex-col items-center justify-center p-2 text-center select-none">
            <Building2 className="w-8 h-8 text-[#1877F2] mb-1" strokeWidth={2.2} />
            <span className="font-bold text-[11px] leading-tight text-[#1877F2]">
              CityCare
              <br />
              Hospital
            </span>
          </div>

          <button
            type="button"
            onClick={onChangeLogo}
            className="w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-900 text-white flex items-center justify-center absolute bottom-1 right-1 shadow-sm cursor-pointer transition-colors"
            title="Update hospital logo"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hospital Info & Status */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
            {info.name}
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            {info.tagline}
          </p>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A]">
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.4} />
              <span>Verified Hospital</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A]">
              <Activity className="w-3.5 h-3.5" strokeWidth={2.4} />
              <span>{info.status}</span>
            </span>
          </div>

          {/* Meta Details Line */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1 font-medium">
            <span>
              <span className="text-slate-400 font-normal">Hospital ID:</span>{' '}
              <span className="font-mono text-slate-800 font-semibold">{info.hospitalId}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span>
              <span className="text-slate-400 font-normal">Registration No.:</span>{' '}
              <span className="font-mono text-slate-800 font-semibold">{info.registrationNo}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span>{info.type}</span>
            <span className="text-slate-300">|</span>
            <span>
              <span className="text-slate-400 font-normal">Established:</span>{' '}
              <span className="text-slate-800 font-semibold">{info.establishedYear}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
