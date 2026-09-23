'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  Plus,
  BookmarkCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Sidebar } from '../../../../components/hospital-admin/Sidebar';
import { Header } from '../../../../components/hospital-admin/Header';
import {
  BasicInfoCard,
  BasicInfoFormData,
} from '../../../../components/hospital-admin/doctors/add/BasicInfoCard';
import {
  ProfessionalInfoCard,
  ProfessionalInfoFormData,
} from '../../../../components/hospital-admin/doctors/add/ProfessionalInfoCard';
import {
  EmploymentDetailsCard,
  EmploymentDetailsFormData,
} from '../../../../components/hospital-admin/doctors/add/EmploymentDetailsCard';
import { ProfilePhotoCard } from '../../../../components/hospital-admin/doctors/add/ProfilePhotoCard';
import {
  DocumentUploadCard,
  DocumentFilesState,
} from '../../../../components/hospital-admin/doctors/add/DocumentUploadCard';

export default function AddDoctorPage() {
  const router = useRouter();

  // Basic Information State
  const [basicInfo, setBasicInfo] = useState<BasicInfoFormData>({
    fullName: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
    alternatePhone: '',
  });

  // Professional Information State
  const [professionalInfo, setProfessionalInfo] =
    useState<ProfessionalInfoFormData>({
      specialty: '',
      department: '',
      licenseNo: '',
      qualification: '',
      experience: '',
      consultationType: '',
    });

  // Employment Details State
  const [employmentDetails, setEmploymentDetails] =
    useState<EmploymentDetailsFormData>({
      joiningDate: '',
      employmentType: '',
      consultationFee: '',
      notes: '',
    });

  // Profile Photo State
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Document Uploads State
  const [documents, setDocuments] = useState<DocumentFilesState>({
    medicalLicense: null,
    degreeCertificate: null,
    experienceCertificate: null,
    govtId: null,
    otherDocs: null,
  });

  // Validation Errors State
  const [basicErrors, setBasicErrors] = useState<
    Partial<Record<keyof BasicInfoFormData, string>>
  >({});
  const [professionalErrors, setProfessionalErrors] = useState<
    Partial<Record<keyof ProfessionalInfoFormData, string>>
  >({});
  const [employmentErrors, setEmploymentErrors] = useState<
    Partial<Record<keyof EmploymentDetailsFormData, string>>
  >({});
  const [docErrors, setDocErrors] = useState<
    Partial<Record<keyof DocumentFilesState, string>>
  >({});

  // Toast Notification State
  const [toast, setToast] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Handlers for Form Changes
  const handleBasicChange = (field: keyof BasicInfoFormData, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
    if (basicErrors[field]) {
      setBasicErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleProfessionalChange = (
    field: keyof ProfessionalInfoFormData,
    value: string
  ) => {
    setProfessionalInfo((prev) => ({ ...prev, [field]: value }));
    if (professionalErrors[field]) {
      setProfessionalErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleEmploymentChange = (
    field: keyof EmploymentDetailsFormData,
    value: string
  ) => {
    setEmploymentDetails((prev) => ({ ...prev, [field]: value }));
    if (employmentErrors[field]) {
      setEmploymentErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDocumentChange = (
    key: keyof DocumentFilesState,
    file: File | null
  ) => {
    setDocuments((prev) => ({ ...prev, [key]: file }));
    if (docErrors[key]) {
      setDocErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  // Save Draft Action
  const handleSaveDraft = () => {
    const draftName = basicInfo.fullName.trim() || 'New Doctor';
    showToast(`✓ Draft for "${draftName}" has been saved successfully.`, 'info');
  };

  // Form Validation & Submit Action
  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();

    const newBasicErrors: Partial<Record<keyof BasicInfoFormData, string>> = {};
    if (!basicInfo.fullName.trim()) newBasicErrors.fullName = 'Full Name is required';
    if (!basicInfo.gender) newBasicErrors.gender = 'Gender is required';
    if (!basicInfo.dob.trim()) newBasicErrors.dob = 'Date of birth is required';
    if (!basicInfo.email.trim()) newBasicErrors.email = 'Email address is required';
    if (!basicInfo.phone.trim()) newBasicErrors.phone = 'Phone number is required';

    const newProfErrors: Partial<Record<keyof ProfessionalInfoFormData, string>> = {};
    if (!professionalInfo.specialty) newProfErrors.specialty = 'Specialty is required';
    if (!professionalInfo.department) newProfErrors.department = 'Department is required';
    if (!professionalInfo.licenseNo.trim()) newProfErrors.licenseNo = 'License number is required';
    if (!professionalInfo.qualification.trim()) newProfErrors.qualification = 'Qualification is required';
    if (!professionalInfo.experience.trim()) newProfErrors.experience = 'Experience is required';

    const newEmpErrors: Partial<Record<keyof EmploymentDetailsFormData, string>> = {};
    if (!employmentDetails.joiningDate.trim()) newEmpErrors.joiningDate = 'Joining date is required';
    if (!employmentDetails.employmentType) newEmpErrors.employmentType = 'Employment type is required';

    const newDocErrors: Partial<Record<keyof DocumentFilesState, string>> = {};
    if (!documents.medicalLicense) newDocErrors.medicalLicense = 'Medical license document is required';
    if (!documents.degreeCertificate) newDocErrors.degreeCertificate = 'Degree certificate is required';
    if (!documents.govtId) newDocErrors.govtId = 'Government ID is required';

    setBasicErrors(newBasicErrors);
    setProfessionalErrors(newProfErrors);
    setEmploymentErrors(newEmpErrors);
    setDocErrors(newDocErrors);

    const hasErrors =
      Object.keys(newBasicErrors).length > 0 ||
      Object.keys(newProfErrors).length > 0 ||
      Object.keys(newEmpErrors).length > 0 ||
      Object.keys(newDocErrors).length > 0;

    if (hasErrors) {
      showToast('Please fill all mandatory fields marked with an asterisk (*)', 'error');
      return;
    }

    showToast(
      `✓ Doctor Dr. ${basicInfo.fullName} has been successfully added to CityCare Hospital network!`,
      'success'
    );

    // Redirect to Doctor Directory after brief feedback
    setTimeout(() => {
      router.push('/hospital-admin/doctors');
    }, 1800);
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen text-slate-800 antialiased selection:bg-blue-500 selection:text-white">
      {/* Sidebar with Add Doctor Active */}
      <Sidebar activeTab="Add Doctor" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-6 md:p-8 max-w-[1400px] w-full mx-auto pb-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 font-medium">
            <Link
              href="/hospital-admin/doctors"
              className="hover:text-blue-600 transition-colors"
            >
              Doctor Management
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-700 font-semibold">Add Doctor</span>
          </nav>

          {/* Page Heading Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Add Doctor
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Enter doctor details, assign department and upload required documents.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-600 block">
                Thursday, 12 June 2025
              </span>
              <span className="text-xs text-slate-400 mt-0.5 block">
                Add a new doctor to your hospital network.
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleAddDoctor}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form Details (8 Columns on desktop) */}
              <div className="lg:col-span-8 space-y-6">
                {/* 1. Basic Information */}
                <BasicInfoCard
                  formData={basicInfo}
                  onChange={handleBasicChange}
                  errors={basicErrors}
                />

                {/* 2. Professional Information */}
                <ProfessionalInfoCard
                  formData={professionalInfo}
                  onChange={handleProfessionalChange}
                  errors={professionalErrors}
                />

                {/* 3. Employment Details */}
                <EmploymentDetailsCard
                  formData={employmentDetails}
                  onChange={handleEmploymentChange}
                  errors={employmentErrors}
                />
              </div>

              {/* Right Column: Uploads (4 Columns on desktop) */}
              <div className="lg:col-span-4 space-y-6">
                {/* 4. Profile Photo */}
                <ProfilePhotoCard
                  photoPreview={photoPreview}
                  onPhotoChange={(file, previewUrl) => setPhotoPreview(previewUrl)}
                  onRemovePhoto={() => setPhotoPreview(null)}
                />

                {/* 5. Document Upload */}
                <DocumentUploadCard
                  documents={documents}
                  onDocumentChange={handleDocumentChange}
                  errors={docErrors}
                />
              </div>
            </div>

            {/* Bottom Form Actions Bar */}
            <div className="mt-8 pt-5 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/hospital-admin/doctors"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-semibold text-center transition-all cursor-pointer shadow-2xs active:scale-98"
              >
                Cancel
              </Link>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-5 py-2.5 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50/80 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-98"
                >
                  <BookmarkCheck className="w-4 h-4" strokeWidth={2.2} />
                  <span>Save as Draft</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  <Plus className="w-4 h-4" strokeWidth={2.4} />
                  <span>Add Doctor</span>
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>

      {/* Floating Feedback Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-lg border text-sm font-semibold flex items-center gap-2.5 ${
              toast.type === 'error'
                ? 'bg-red-500 text-white border-red-600'
                : toast.type === 'info'
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-emerald-600 text-white border-emerald-700'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
