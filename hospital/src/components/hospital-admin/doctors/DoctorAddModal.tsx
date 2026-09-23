'use client';

import React, { useState } from 'react';
import { X, UserPlus, CheckCircle } from 'lucide-react';
import { DoctorItem } from '../../../features/hospital-admin/doctorTypes';

interface DoctorAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDoctorAdded: (doctor: Omit<DoctorItem, 'id' | 'avatar' | 'joinDate'>) => void;
}

export const DoctorAddModal: React.FC<DoctorAddModalProps> = ({
  isOpen,
  onClose,
  onDoctorAdded,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    qualification: 'MBBS, MD',
    specialty: 'Cardiology',
    department: 'Cardiology',
    licenseId: '',
    experience: '5 Years',
    status: 'Active' as const,
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.licenseId) return;

    onDoctorAdded({
      ...formData,
      name: formData.name.startsWith('Dr.') ? formData.name : `Dr. ${formData.name}`,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EAF2FD] text-[#1877F2] flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Add New Doctor
              </h3>
              <p className="text-xs text-slate-500">
                Register medical staff to CityCare Hospital
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-slate-900">
              Doctor Added!
            </h4>
            <p className="text-xs text-slate-500">
              The doctor profile has been created and registered into the directory.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Rajesh Khanna"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Qualification
                </label>
                <input
                  type="text"
                  placeholder="MBBS, MD"
                  value={formData.qualification}
                  onChange={(e) =>
                    setFormData({ ...formData, qualification: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  License ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="MED123456"
                  value={formData.licenseId}
                  onChange={(e) =>
                    setFormData({ ...formData, licenseId: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      department: e.target.value,
                      specialty: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Emergency">Emergency</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Obstetrics & Gynae">Obstetrics & Gynae</option>
                  <option value="Anesthesiology">Anesthesiology</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  placeholder="e.g. 8 Years"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#1877F2] hover:bg-blue-600 text-white font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                Save Doctor
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
