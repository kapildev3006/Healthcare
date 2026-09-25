'use client';

import React from 'react';
import { X, FileText, CheckCircle2 } from 'lucide-react';

interface ApplyTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (templateName: string) => void;
}

const TEMPLATES = [
  {
    name: 'Standard User',
    desc: 'Basic read access for departmental and clinical staff.',
    badge: 'Standard',
  },
  {
    name: 'Elevated User',
    desc: 'Read/Write access for senior practitioners and supervisors.',
    badge: 'Elevated',
  },
  {
    name: 'Department Manager',
    desc: 'Department operations, staff scheduling, and local audit logs.',
    badge: 'Current',
  },
  {
    name: 'System Admin',
    desc: 'Unrestricted administrative access across all hospital wings.',
    badge: 'Full Access',
  },
];

export const ApplyTemplateModal: React.FC<ApplyTemplateModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Apply Permission Template
              </h3>
              <p className="text-xs text-slate-500">
                Quickly populate policy matrices from approved templates
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

        {/* Templates List */}
        <div className="p-6 space-y-3">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.name}
              onClick={() => {
                onApplyTemplate(tpl.name);
                onClose();
              }}
              className="p-3.5 rounded-xl border border-slate-200/90 hover:border-blue-500 hover:bg-blue-50/40 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs text-slate-800 group-hover:text-blue-600">
                    {tpl.name}
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {tpl.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{tpl.desc}</p>
              </div>

              <CheckCircle2 className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
