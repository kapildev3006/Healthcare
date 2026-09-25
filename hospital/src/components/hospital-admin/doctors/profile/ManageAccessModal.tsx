'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AccessPermissionItem } from '@/features/hospital-admin/doctorProfileTypes';

interface ManageAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  permissions: AccessPermissionItem[];
  onSave: (updated: AccessPermissionItem[]) => void;
}

export const ManageAccessModal: React.FC<ManageAccessModalProps> = ({
  isOpen,
  onClose,
  permissions,
  onSave,
}) => {
  const [items, setItems] = useState<AccessPermissionItem[]>(permissions);

  if (!isOpen) return null;

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextEnabled = !item.enabled;
          const nextStatus = nextEnabled
            ? item.name.includes('Records')
              ? 'Full Access'
              : 'Enabled'
            : 'Not Allowed';
          return { ...item, enabled: nextEnabled, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(items);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Manage Access & Permissions
              </h3>
              <p className="text-xs text-slate-500">
                Configure clinical module and EHR access rights
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
          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200/80 hover:bg-slate-50 cursor-pointer transition-all"
              >
                <div>
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="text-[11px] text-slate-400">
                    Status: {item.status}
                  </p>
                </div>
                <div
                  className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                    item.enabled ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      item.enabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
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
              Save Permissions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
