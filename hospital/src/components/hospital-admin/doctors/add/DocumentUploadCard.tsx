'use client';

import React, { useRef } from 'react';
import { FileText, Upload, CheckCircle2, X, Info } from 'lucide-react';

export interface DocumentFilesState {
  medicalLicense: File | null;
  degreeCertificate: File | null;
  experienceCertificate: File | null;
  govtId: File | null;
  otherDocs: File | null;
}

interface DocumentUploadCardProps {
  documents: DocumentFilesState;
  onDocumentChange: (key: keyof DocumentFilesState, file: File | null) => void;
  errors?: Partial<Record<keyof DocumentFilesState, string>>;
}

interface DocConfig {
  key: keyof DocumentFilesState;
  label: string;
  required?: boolean;
}

const docConfigs: DocConfig[] = [
  {
    key: 'medicalLicense',
    label: 'Medical License / Registration Certificate',
    required: true,
  },
  {
    key: 'degreeCertificate',
    label: 'Degree Certificate',
    required: true,
  },
  {
    key: 'experienceCertificate',
    label: 'Experience Certificate',
    required: false,
  },
  {
    key: 'govtId',
    label: 'Government ID (Aadhar / Passport)',
    required: true,
  },
  {
    key: 'otherDocs',
    label: 'Other Documents',
    required: false,
  },
];

export const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({
  documents,
  onDocumentChange,
  errors = {},
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-blue-100 transition-all">
      {/* Card Header */}
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
          <FileText className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Document Upload
        </h2>
      </div>

      {/* Document Fields */}
      <div className="space-y-3.5">
        {docConfigs.map(({ key, label, required }) => (
          <DocumentRow
            key={key}
            docKey={key}
            label={label}
            required={required}
            file={documents[key]}
            error={errors[key]}
            onChange={(file) => onDocumentChange(key, file)}
          />
        ))}
      </div>

      {/* Bottom Info Note */}
      <div className="mt-5 p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
        <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-3.5 h-3.5" />
        </div>
        <div className="text-[12px] text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800">
            Accepted formats: <span className="font-normal text-slate-600">PDF, JPG, PNG</span>
          </p>
          <p className="text-slate-500 text-[11.5px]">
            Maximum file size: 5 MB per document.
          </p>
        </div>
      </div>
    </div>
  );
};

interface DocumentRowProps {
  docKey: keyof DocumentFilesState;
  label: string;
  required?: boolean;
  file: File | null;
  error?: string;
  onChange: (file: File | null) => void;
}

const DocumentRow: React.FC<DocumentRowProps> = ({
  label,
  required,
  file,
  error,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onChange(selectedFile);
  };

  return (
    <div>
      <label className="block text-[13px] font-medium text-slate-700 mb-1">
        {label}{' '}
        {required ? (
          <span className="text-red-500 font-semibold">*</span>
        ) : (
          <span className="text-slate-400 font-normal">(Optional)</span>
        )}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        className={`w-full h-10 px-2.5 rounded-xl border flex items-center justify-between transition-all bg-white ${
          error
            ? 'border-red-400 ring-2 ring-red-100'
            : file
            ? 'border-blue-200 bg-blue-50/20'
            : 'border-slate-200/90'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="h-7 px-2.5 rounded-lg border border-blue-200 text-blue-600 bg-blue-50/60 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-2xs active:scale-98"
          >
            <Upload className="w-3.5 h-3.5" strokeWidth={2.2} />
            <span>Choose File</span>
          </button>

          <span
            className={`text-xs truncate ${
              file ? 'text-slate-800 font-medium' : 'text-slate-400'
            }`}
          >
            {file ? file.name : 'No file chosen'}
          </span>
        </div>

        {file && (
          <div className="flex items-center gap-1.5 shrink-0 pl-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <button
              type="button"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = '';
              }}
              className="w-5 h-5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors"
              title="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-red-500 mt-1 font-medium">{error}</p>
      )}
    </div>
  );
};
