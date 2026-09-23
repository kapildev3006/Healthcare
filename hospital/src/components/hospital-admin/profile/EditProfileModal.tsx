'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Edit3 } from 'lucide-react';
import {
  HospitalProfileInfo,
  AdministratorInfo,
  OperationalDetails,
} from '../../../features/hospital-admin/profileTypes';

export type EditModalType =
  | 'hospital-info'
  | 'admin-details'
  | 'operational'
  | 'facilities'
  | null;

interface EditProfileModalProps {
  type: EditModalType;
  isOpen: boolean;
  onClose: () => void;
  hospitalInfo: HospitalProfileInfo;
  adminInfo: AdministratorInfo;
  operationalDetails: OperationalDetails;
  onSaveHospitalInfo: (info: HospitalProfileInfo) => void;
  onSaveAdminInfo: (info: AdministratorInfo) => void;
  onSaveOperationalDetails: (details: OperationalDetails) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  type,
  isOpen,
  onClose,
  hospitalInfo,
  adminInfo,
  operationalDetails,
  onSaveHospitalInfo,
  onSaveAdminInfo,
  onSaveOperationalDetails,
}) => {
  const [hForm, setHForm] = useState<HospitalProfileInfo>(hospitalInfo);
  const [aForm, setAForm] = useState<AdministratorInfo>(adminInfo);
  const [oForm, setOForm] = useState<OperationalDetails>(operationalDetails);

  useEffect(() => {
    setHForm(hospitalInfo);
  }, [hospitalInfo]);

  useEffect(() => {
    setAForm(adminInfo);
  }, [adminInfo]);

  useEffect(() => {
    setOForm(operationalDetails);
  }, [operationalDetails]);

  if (!isOpen || !type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'hospital-info') {
      onSaveHospitalInfo(hForm);
    } else if (type === 'admin-details') {
      onSaveAdminInfo(aForm);
    } else if (type === 'operational') {
      onSaveOperationalDetails(oForm);
    }
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'hospital-info':
        return 'Edit Hospital Information';
      case 'admin-details':
        return 'Edit Administrator Details';
      case 'operational':
        return 'Edit Operational Details';
      default:
        return 'Edit Details';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1877F2] flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {getTitle()}
              </h3>
              <p className="text-xs text-slate-500">
                Update information for CityCare Hospital profile
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {type === 'hospital-info' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Hospital Name
                </label>
                <input
                  type="text"
                  required
                  value={hForm.name}
                  onChange={(e) => setHForm({ ...hForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={hForm.tagline}
                  onChange={(e) => setHForm({ ...hForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Registration No.
                  </label>
                  <input
                    type="text"
                    value={hForm.registrationNo}
                    onChange={(e) =>
                      setHForm({ ...hForm, registrationNo: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Established Year
                  </label>
                  <input
                    type="text"
                    value={hForm.establishedYear}
                    onChange={(e) =>
                      setHForm({ ...hForm, establishedYear: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={hForm.address}
                  onChange={(e) => setHForm({ ...hForm, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={hForm.contactNumber}
                    onChange={(e) =>
                      setHForm({ ...hForm, contactNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Official Website
                  </label>
                  <input
                    type="text"
                    value={hForm.website}
                    onChange={(e) =>
                      setHForm({ ...hForm, website: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                  />
                </div>
              </div>
            </>
          )}

          {type === 'admin-details' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Administrator Full Name
                </label>
                <input
                  type="text"
                  required
                  value={aForm.name}
                  onChange={(e) => setAForm({ ...aForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  value={aForm.designation}
                  onChange={(e) =>
                    setAForm({ ...aForm, designation: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={aForm.contactNumber}
                  onChange={(e) =>
                    setAForm({ ...aForm, contactNumber: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={aForm.email}
                  onChange={(e) => setAForm({ ...aForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>
            </>
          )}

          {type === 'operational' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={oForm.operatingHours}
                  onChange={(e) =>
                    setOForm({ ...oForm, operatingHours: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    value={oForm.emergencyContact}
                    onChange={(e) =>
                      setOForm({ ...oForm, emergencyContact: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Helpline Number
                  </label>
                  <input
                    type="text"
                    value={oForm.helplineNumber}
                    onChange={(e) =>
                      setOForm({ ...oForm, helplineNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Total Number of Beds
                  </label>
                  <input
                    type="number"
                    value={oForm.numberOfBeds}
                    onChange={(e) =>
                      setOForm({
                        ...oForm,
                        numberOfBeds: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    ICU Beds
                  </label>
                  <input
                    type="number"
                    value={oForm.icuBeds}
                    onChange={(e) =>
                      setOForm({
                        ...oForm,
                        icuBeds: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1877F2]"
                  />
                </div>
              </div>
            </>
          )}

          {/* Footer Buttons */}
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
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#1877F2] hover:bg-blue-600 text-white font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
