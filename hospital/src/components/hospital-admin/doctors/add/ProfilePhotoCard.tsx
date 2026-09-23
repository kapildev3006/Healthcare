'use client';

import React, { useRef } from 'react';
import { User, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ProfilePhotoCardProps {
  photoPreview: string | null;
  onPhotoChange: (file: File, previewUrl: string) => void;
  onRemovePhoto?: () => void;
}

export const ProfilePhotoCard: React.FC<ProfilePhotoCardProps> = ({
  photoPreview,
  onPhotoChange,
  onRemovePhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onPhotoChange(file, previewUrl);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-blue-100 transition-all">
      {/* Card Header */}
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
          <User className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Profile Photo
        </h2>
      </div>

      {/* Upload Box Area */}
      <div className="flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-dashed border-slate-200/90 bg-slate-50/40 text-center">
        {/* Avatar Circular Preview */}
        <div className="relative w-20 h-20 rounded-full bg-slate-200/70 overflow-hidden flex items-center justify-center shadow-inner mb-3">
          {photoPreview ? (
            <Image
              src={photoPreview}
              alt="Doctor preview"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <User className="w-10 h-10 text-slate-400" strokeWidth={1.8} />
          )}
        </div>

        <h3 className="text-sm font-semibold text-slate-800">
          Upload Doctor Photo
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          JPG, PNG (Max 2 MB)
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex items-center gap-2 mt-3.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-1.5 rounded-lg border border-blue-200 text-blue-600 bg-blue-50/70 hover:bg-blue-100 text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-98"
          >
            Choose File
          </button>
          {photoPreview && onRemovePhoto && (
            <button
              type="button"
              onClick={onRemovePhoto}
              className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 text-xs font-semibold transition-all cursor-pointer"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
