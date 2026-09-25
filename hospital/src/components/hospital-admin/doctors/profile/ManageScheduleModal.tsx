'use client';

import React, { useState } from 'react';
import { X, Clock, CheckCircle2 } from 'lucide-react';
import { ScheduleDayItem } from '@/features/hospital-admin/doctorProfileTypes';

interface ManageScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: ScheduleDayItem[];
  onSave: (updatedSchedule: ScheduleDayItem[]) => void;
}

export const ManageScheduleModal: React.FC<ManageScheduleModalProps> = ({
  isOpen,
  onClose,
  schedule,
  onSave,
}) => {
  const [items, setItems] = useState<ScheduleDayItem[]>(schedule);

  if (!isOpen) return null;

  const handleShiftChange = (day: string, shiftTime: string) => {
    setItems((prev) =>
      prev.map((item) => (item.day === day ? { ...item, shiftTime } : item))
    );
  };

  const handleAvailabilityChange = (
    day: string,
    availability: 'Available' | 'Limited' | 'Unavailable'
  ) => {
    const statusColor =
      availability === 'Available'
        ? 'green'
        : availability === 'Limited'
        ? 'amber'
        : 'red';

    setItems((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, availability, statusColor } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(items);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Manage Weekly Schedule
              </h3>
              <p className="text-xs text-slate-500">
                Configure clinic shifts and on-call rotations
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3 text-xs">
          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.day}
                className="grid grid-cols-12 gap-2 items-center p-2 rounded-lg bg-slate-50/80 border border-slate-100"
              >
                <div className="col-span-3 font-semibold text-slate-800">
                  {item.day}
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    value={item.shiftTime}
                    onChange={(e) =>
                      handleShiftChange(item.day, e.target.value)
                    }
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-4">
                  <select
                    value={item.availability}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        item.day,
                        e.target.value as
                          | 'Available'
                          | 'Limited'
                          | 'Unavailable'
                      )
                    }
                    className="w-full px-2 py-1 text-xs border border-slate-200 rounded bg-white font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Limited">Limited / On Call</option>
                    <option value="Unavailable">Unavailable / Off</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-medium text-white bg-[#0066FF] hover:bg-blue-600 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
