'use client';

import React from 'react';
import Image from 'next/image';
import {
  Mail,
  Phone,
  CreditCard,
  FileText,
  Building2,
  Stethoscope,
  Calendar,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';
import { DoctorProfileHero } from '@/features/hospital-admin/doctorProfileTypes';

interface DoctorProfileHeroCardProps {
  hero: DoctorProfileHero;
}

export const DoctorProfileHeroCard: React.FC<DoctorProfileHeroCardProps> = ({
  hero,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (Avatar + Core Details) - approx 4 cols */}
        <div className="lg:col-span-5 flex items-start gap-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm shrink-0 bg-blue-50">
            <Image
              src={hero.avatar}
              alt={hero.name}
              fill
              className="object-cover"
              sizes="96px"
              priority
            />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {hero.name}
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                {hero.status}
              </span>
            </div>

            <p className="text-xs sm:text-[13px] font-semibold text-slate-600">
              {hero.degrees}
            </p>
            <p className="text-xs text-slate-400 font-medium">{hero.subRole}</p>

            <div className="pt-2 space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="truncate hover:text-blue-600 cursor-pointer">
                  {hero.email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{hero.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column (Hospital ID, License, Department, Specialty) - approx 3 cols */}
        <div className="lg:col-span-3 lg:border-l lg:border-slate-100 lg:pl-6 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5 text-blue-500" />
              Hospital ID
            </span>
            <span className="font-semibold text-slate-800">{hero.hospitalId}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              License Number
            </span>
            <span className="font-semibold text-slate-800">
              {hero.licenseNumber}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              Department
            </span>
            <span className="font-semibold text-slate-800">
              {hero.department}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              <Stethoscope className="w-3.5 h-3.5 text-blue-500" />
              Specialty
            </span>
            <span className="font-semibold text-slate-800">
              {hero.specialty}
            </span>
          </div>
        </div>

        {/* Right Column (Joining, Shift, Location, Assigned Roles) - approx 4 cols */}
        <div className="lg:col-span-4 lg:border-l lg:border-slate-100 lg:pl-6 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              Date of Joining
            </span>
            <span className="font-semibold text-slate-800">{hero.joinDate}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Current Shift
            </span>
            <span className="font-semibold text-slate-800">
              {hero.currentShift}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              Work Location
            </span>
            <span className="font-semibold text-slate-800">
              {hero.workLocation}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="text-slate-400 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              Assigned Roles
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {hero.assignedRoles.map((role) => (
                <span
                  key={role}
                  className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
