'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { Sidebar } from '../../../../components/hospital-admin/Sidebar';
import { Header } from '../../../../components/hospital-admin/Header';
import { VerificationHeroCard } from '../../../../components/hospital-admin/verification/review/VerificationHeroCard';
import { DetailsGridCards } from '../../../../components/hospital-admin/verification/review/DetailsGridCards';
import {
  VerificationDocumentsGrid,
  VerificationDoc,
} from '../../../../components/hospital-admin/verification/review/VerificationDocumentsGrid';
import { AdminNotesCard } from '../../../../components/hospital-admin/verification/review/AdminNotesCard';
import { VerificationSummaryCard } from '../../../../components/hospital-admin/verification/review/VerificationSummaryCard';
import { ComplianceChecklistCard } from '../../../../components/hospital-admin/verification/review/ComplianceChecklistCard';
import { AdminDecisionCard } from '../../../../components/hospital-admin/verification/review/AdminDecisionCard';
import {
  PreviousActivityCard,
  ActivityItem,
} from '../../../../components/hospital-admin/verification/review/PreviousActivityCard';
import { DocumentViewerModal } from '../../../../components/hospital-admin/verification/review/DocumentViewerModal';

export default function DoctorVerificationReviewPage() {
  const router = useRouter();

  // Doctor Application State
  const [doctorStatus, setDoctorStatus] = useState<'Pending Review' | 'Approved' | 'Rejected' | 'More Info Requested'>('Pending Review');
  const [verificationScore, setVerificationScore] = useState(80);
  const [scoreLabel, setScoreLabel] = useState('Good');
  const [verifiedCount, setVerifiedCount] = useState(4);

  // Documents State
  const [documents, setDocuments] = useState<VerificationDoc[]>([
    {
      id: 'doc-1',
      name: 'MBBS_Degree_Certificate.pdf',
      size: '1.2 MB',
      date: 'Jun 10, 2025',
      status: 'Verified',
    },
    {
      id: 'doc-2',
      name: 'MCI_Registration_Certificate.pdf',
      size: '825 KB',
      date: 'Jun 10, 2025',
      status: 'Verified',
    },
    {
      id: 'doc-3',
      name: 'Aadhaar_ID_Proof.pdf',
      size: '420 KB',
      date: 'Jun 9, 2025',
      status: 'Verified',
    },
    {
      id: 'doc-4',
      name: 'Experience_Letter.pdf',
      size: '610 KB',
      date: 'Jun 9, 2025',
      status: 'Pending Review',
    },
  ]);

  // Document Viewer Modal State
  const [activeDoc, setActiveDoc] = useState<VerificationDoc | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  // Timeline Activities State
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 'a-1',
      title: 'Application submitted',
      timestamp: 'Jun 11, 2025 10:24 AM',
      author: 'By Dr. Priya Sharma',
    },
    {
      id: 'a-2',
      title: 'Documents uploaded',
      timestamp: 'Jun 11, 2025 10:24 AM',
      author: 'By Dr. Priya Sharma',
    },
  ]);

  // Toast State
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3800);
  };

  // Document Toggle Handler
  const handleToggleDocVerified = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => {
        if (d.id === docId) {
          const nextStatus = d.status === 'Verified' ? 'Pending Review' : 'Verified';
          return { ...d, status: nextStatus };
        }
        return d;
      })
    );

    // Recalculate score
    setTimeout(() => {
      const vCount = documents.filter((d) => d.id === docId ? d.status !== 'Verified' : d.status === 'Verified').length;
      setVerifiedCount(vCount);
      const newScore = Math.round((vCount / documents.length) * 100);
      setVerificationScore(newScore);
      setScoreLabel(newScore >= 80 ? 'Good' : newScore >= 50 ? 'Moderate' : 'Needs Attention');
    }, 50);

    showToast('Document verification status updated.', 'info');
  };

  // Decisions
  const handleApprove = () => {
    setDoctorStatus('Approved');
    setVerificationScore(100);
    setScoreLabel('Excellent');
    setVerifiedCount(5);

    const newAct: ActivityItem = {
      id: `a-${Date.now()}`,
      title: 'Doctor Approved & Verified',
      timestamp: 'Just now',
      author: 'By Rajesh Kumar (Admin)',
    };
    setActivities((prev) => [newAct, ...prev]);

    showToast('✓ Dr. Priya Sharma has been approved and granted hospital access!', 'success');
  };

  const handleReject = () => {
    setDoctorStatus('Rejected');

    const newAct: ActivityItem = {
      id: `a-${Date.now()}`,
      title: 'Application Rejected',
      timestamp: 'Just now',
      author: 'By Rajesh Kumar (Admin)',
    };
    setActivities((prev) => [newAct, ...prev]);

    showToast('✕ Application for Dr. Priya Sharma has been rejected.', 'error');
  };

  const handleRequestInfo = () => {
    setDoctorStatus('More Info Requested');

    const newAct: ActivityItem = {
      id: `a-${Date.now()}`,
      title: 'Additional Information Requested',
      timestamp: 'Just now',
      author: 'By Rajesh Kumar (Admin)',
    };
    setActivities((prev) => [newAct, ...prev]);

    showToast('ℹ Additional information requested from Dr. Priya Sharma.', 'info');
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen text-slate-800 antialiased selection:bg-blue-500 selection:text-white">
      {/* Sidebar with Doctor Verification Active */}
      <Sidebar activeTab="Doctor Verification" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-6 md:p-8 max-w-[1520px] w-full mx-auto pb-16">
          {/* Breadcrumb & Back Navigation Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Link
                href="/hospital-admin/doctor-verification"
                className="text-[#0066FF] hover:underline"
              >
                Doctor Verification
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-700 font-semibold">Review Application</span>
            </nav>

            <Link
              href="/hospital-admin/doctor-verification"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066FF] hover:underline self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Doctor Verification</span>
            </Link>
          </div>

          {/* Page Heading Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Doctor Verification Review
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Review and verify doctor credentials, documents and eligibility for hospital access.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-semibold text-slate-700 block">
                Application ID:{' '}
                <span className="font-mono text-slate-900">APP-2025-001247</span>
              </span>
              <span className="text-xs text-slate-400 mt-0.5 block">
                Submitted on Jun 11, 2025, 10:24 AM
              </span>
            </div>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 cols): Hero Banner + Details Grid + Documents + Notes */}
            <div className="xl:col-span-8 space-y-6">
              {/* Doctor Hero Card */}
              <VerificationHeroCard status={doctorStatus} />

              {/* 2x2 Information Grid Cards */}
              <DetailsGridCards
                onEditSection={(section) =>
                  showToast(`Opened editor for ${section} details`, 'info')
                }
              />

              {/* Uploaded Verification Documents Grid */}
              <VerificationDocumentsGrid
                documents={documents}
                onPreviewDoc={(doc) => {
                  setActiveDoc(doc);
                  setIsDocModalOpen(true);
                }}
              />

              {/* Admin Notes & Comments */}
              <AdminNotesCard />
            </div>

            {/* Right Column (4 cols): Summary Gauge + Checklist + Decision + Activity */}
            <div className="xl:col-span-4 space-y-6">
              {/* Verification Summary (80% Gauge) */}
              <VerificationSummaryCard
                score={verificationScore}
                statusLabel={scoreLabel}
                verifiedCount={verifiedCount}
                totalCount={documents.length}
              />

              {/* Compliance Checklist */}
              <ComplianceChecklistCard />

              {/* Admin Decision */}
              <AdminDecisionCard
                onApprove={handleApprove}
                onReject={handleReject}
                onRequestInfo={handleRequestInfo}
              />

              {/* Previous Activity Timeline */}
              <PreviousActivityCard activities={activities} />
            </div>
          </div>
        </main>
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        document={activeDoc}
        isOpen={isDocModalOpen}
        onClose={() => {
          setIsDocModalOpen(false);
          setActiveDoc(null);
        }}
        onToggleVerified={handleToggleDocVerified}
      />

      {/* Floating Notification Toast */}
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
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 shrink-0" />
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
