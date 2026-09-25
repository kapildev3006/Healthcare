'use client';

import React, { useState } from 'react';
import { X, Building2, Plus, ChevronDown } from 'lucide-react';
import {
  DepartmentItem,
  DepartmentCategory,
} from '../../../features/hospital-admin/departmentTypes';

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newDept: Omit<DepartmentItem, 'id'>) => void;
}

export const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [head, setHead] = useState('');
  const [category, setCategory] = useState<DepartmentCategory>('Clinical');
  const [doctorsCount, setDoctorsCount] = useState('8');
  const [staffCount, setStaffCount] = useState('20');
  const [bedCapacity, setBedCapacity] = useState('30');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !head.trim()) {
      setError('Please provide department name and head doctor');
      return;
    }

    onAdd({
      name: name.trim(),
      head: head.trim(),
      category,
      doctorsCount: parseInt(doctorsCount) || 0,
      staffCount: parseInt(staffCount) || 0,
      bedCapacity: parseInt(bedCapacity) || 0,
      status: 'Active',
      location: location.trim() || 'Main Hospital Wing',
      description: description.trim() || 'Newly created clinical department.',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" strokeWidth={2.4} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Add New Department
              </h3>
              <p className="text-xs text-slate-400">
                Register a new medical or support unit
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Department Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dermatology"
                className="w-full h-9 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as DepartmentCategory)
                  }
                  className="w-full h-9 pl-3 pr-8 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Clinical">Clinical</option>
                  <option value="Support">Support Services</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Facilities">Facilities & Operations</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Department Head & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department Head *
              </label>
              <input
                type="text"
                value={head}
                onChange={(e) => setHead(e.target.value)}
                placeholder="e.g. Dr. Meera Iyer"
                className="w-full h-9 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location / Floor
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Block C, 2nd Floor"
                className="w-full h-9 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Numerical Capacities */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Doctors
              </label>
              <input
                type="number"
                value={doctorsCount}
                onChange={(e) => setDoctorsCount(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Staff
              </label>
              <input
                type="number"
                value={staffCount}
                onChange={(e) => setStaffCount(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bed Capacity
              </label>
              <input
                type="number"
                value={bedCapacity}
                onChange={(e) => setBedCapacity(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of department scope..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4" strokeWidth={2.4} />
              <span>Create Department</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
