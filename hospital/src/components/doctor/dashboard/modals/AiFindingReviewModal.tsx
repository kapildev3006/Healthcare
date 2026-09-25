'use client';

import React from 'react';
import { X, Brain, AlertTriangle, ShieldAlert, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { EmergencyAlertItem } from '@/features/doctor/doctorDashboardTypes';

interface AiFindingReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: EmergencyAlertItem | null;
  onAcknowledge?: () => void;
}

export function AiFindingReviewModal({
  isOpen,
  onClose,
  alert,
  onAcknowledge,
}: AiFindingReviewModalProps) {
  if (!isOpen || !alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg leading-tight">AI Clinical Alert Review</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 uppercase tracking-wider">
                  {alert.severity}
                </span>
              </div>
              <p className="text-xs text-red-100 mt-0.5">{alert.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Patient Header */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">
                Patient
              </span>
              <p className="text-sm font-bold text-slate-900">
                {alert.patientName || 'Sunil Malhotra'}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">
                UHID
              </span>
              <p className="text-sm font-mono font-bold text-slate-700">
                {alert.patientUhid || 'MLK00845'}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">
                Confidence
              </span>
              <p className="text-sm font-bold text-red-600">
                {alert.confidence || 89.4}%
              </p>
            </div>
          </div>

          {/* Model Finding & Grad-CAM Visualization Area */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 font-mono">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                Chest X-Ray PA View (DICOM)
              </span>
              <span className="font-mono text-[11px] text-cyan-400">
                Model: {alert.aiModel || 'ResNet50-ChestCAD v2.1'}
              </span>
            </div>

            {/* Grad-CAM heatmap visualization mockup */}
            <div className="relative h-44 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-red-600/30 via-amber-500/15 to-transparent blur-md transform translate-x-8 translate-y-2" />
              <div className="relative z-10 text-center space-y-1">
                <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-red-400 flex items-center justify-center bg-red-500/20 animate-pulse">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  Grad-CAM Feature Heatmap: Right Lower Lobe Opacity
                </p>
                <p className="text-[10px] text-slate-500">
                  Calculated gradient saliency peak at lung periphery (x: 342, y: 512)
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {alert.findingDetails ||
                'Consolidation opacity noted in the right lower lobe consistent with bacterial pneumonia. Clinical correlation advised.'}
            </p>
          </div>

          {/* Mandatory Clinical Disclaimer */}
          <div className="p-3.5 bg-amber-50 border border-amber-200/90 rounded-xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-snug">
              <strong className="font-bold">AI Decision Support Notice:</strong> AI-generated decision support. Not a final diagnosis. Clinical interpretation and treatment decisions must be made by a qualified healthcare professional.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Dismiss
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onAcknowledge?.();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Acknowledge & Add to Clinical Notes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
