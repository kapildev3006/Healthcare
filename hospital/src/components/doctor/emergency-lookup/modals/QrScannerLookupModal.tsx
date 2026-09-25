'use client';

import React, { useState } from 'react';
import { X, QrCode, Camera, RefreshCw } from 'lucide-react';

interface QrScannerLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess?: (healthId: string, name: string) => void;
}

export function QrScannerLookupModal({
  isOpen,
  onClose,
  onScanSuccess,
}: QrScannerLookupModalProps) {
  const [isScanning, setIsScanning] = useState(true);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(false);
    setTimeout(() => {
      onScanSuccess?.('91-2345-6789-1234', 'Rohit Sharma');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Emergency QR Scan</h3>
              <p className="text-xs text-red-100 mt-0.5">
                Scan patient digital or physical Health Card
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="p-6 flex flex-col items-center space-y-5">
          <div className="relative w-64 h-64 bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-800 flex items-center justify-center shadow-inner">
            {/* Viewfinder Corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-red-500 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-red-500 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-red-500 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-red-500 rounded-br-lg" />

            {/* Laser Animation */}
            {isScanning && (
              <div className="absolute inset-x-8 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-lg shadow-rose-500/50 animate-bounce" />
            )}

            <div className="text-center space-y-2 pointer-events-none p-4">
              <Camera className="w-10 h-10 text-slate-600 mx-auto animate-pulse" />
              <p className="text-xs text-slate-400 font-medium">
                Align Emergency QR within frame
              </p>
            </div>
          </div>

          <button
            onClick={handleSimulateScan}
            className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Simulate Scan: Rohit Sharma (#MLK00123)</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Scanner: Operational</span>
          <button
            onClick={onClose}
            className="font-semibold text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
