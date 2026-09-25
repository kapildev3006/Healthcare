'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Sidebar } from '../../../components/hospital-admin/Sidebar';
import { Header } from '../../../components/hospital-admin/Header';
import { VerificationStatsRow } from '../../../components/hospital-admin/verification/VerificationStatsRow';
import { PendingApplicationsTable } from '../../../components/hospital-admin/verification/PendingApplicationsTable';
import { DoctorProfilePreviewCard } from '../../../components/hospital-admin/verification/DoctorProfilePreviewCard';
import { RecentVerificationActivityCard } from '../../../components/hospital-admin/verification/RecentVerificationActivityCard';
import { ComplianceGuidelinesCard } from '../../../components/hospital-admin/verification/ComplianceGuidelinesCard';
import { ReviewDoctorModal } from '../../../components/hospital-admin/verification/ReviewDoctorModal';

import {
  mockVerificationStats,
  mockVerificationApplications,
  mockVerificationActivity,
} from '../../../features/hospital-admin/verificationMockData';
import {
  DoctorVerificationApplication,
  VerificationStats,
  VerificationActivityLog,
  VerificationApplicationStatus,
} from '../../../features/hospital-admin/verificationTypes';

export default function DoctorVerificationPage() {
  const router = useRouter();

  // State
  const [stats, setStats] = useState<VerificationStats>(mockVerificationStats);
  const [applications, setApplications] = useState<
    DoctorVerificationApplication[]
  >(mockVerificationApplications);
  const [activities, setActivities] = useState<VerificationActivityLog[]>(
    mockVerificationActivity
  );

  // Selected Doctor for Profile Preview (default to Dr. Priya Sharma)
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorVerificationApplication | null>(
      mockVerificationApplications[0]
    );

  // Modal Review state
  const [modalDoctor, setModalDoctor] =
    useState<DoctorVerificationApplication | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Toast feedback state
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

  // Decision Handler
  const handleDecision = (
    doctorId: string,
    decision: VerificationApplicationStatus,
    note?: string
  ) => {
    const targetDoc = applications.find((d) => d.id === doctorId);
    if (!targetDoc) return;

    // Update applications list
    setApplications((prev) =>
      prev.map((doc) =>
        doc.id === doctorId ? { ...doc, status: decision } : doc
      )
    );

    // Update selected doctor preview if matching
    if (selectedDoctor?.id === doctorId) {
      setSelectedDoctor((prev) => (prev ? { ...prev, status: decision } : null));
    }

    // Update stats counters
    setStats((prev) => {
      let { pendingReviews, approvedToday, rejected, needMoreInfo } = prev;

      if (targetDoc.status === 'Pending') {
        pendingReviews = Math.max(0, pendingReviews - 1);
      }

      if (decision === 'Approved') {
        approvedToday += 1;
      } else if (decision === 'Rejected') {
        rejected += 1;
      } else if (decision === 'Requested More Info') {
        needMoreInfo += 1;
      }

      return {
        ...prev,
        pendingReviews,
        approvedToday,
        rejected,
        needMoreInfo,
      };
    });

    // Add entry to Recent Verification Activity
    const newActivity: VerificationActivityLog = {
      id: `act-${Date.now()}`,
      user: 'Rajesh Kumar (Admin)',
      doctorName: targetDoc.doctorName,
      action: decision as 'Approved' | 'Rejected' | 'Requested More Info',
      timestamp: 'Just now',
    };
    setActivities((prev) => [newActivity, ...prev.slice(0, 4)]);

    // Feedback Toast
    if (decision === 'Approved') {
      showToast(
        `✓ ${targetDoc.doctorName} has been approved and verified successfully!`,
        'success'
      );
    } else if (decision === 'Rejected') {
      showToast(`✕ ${targetDoc.doctorName}'s application has been rejected.`, 'error');
    } else {
      showToast(
        `ℹ Additional information requested from ${targetDoc.doctorName}.`,
        'info'
      );
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen text-slate-800 antialiased selection:bg-blue-500 selection:text-white">
      {/* Sidebar with Doctor Verification Active */}
      <Sidebar activeTab="Doctor Verification" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-6 md:p-8 max-w-[1520px] w-full mx-auto pb-16">
          {/* Page Heading Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Doctor Verification
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Review and verify submitted doctor credentials, licenses and documents.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-600 block">
                Thursday, 12 June 2025
              </span>
              <span className="text-xs text-slate-400 mt-0.5 block">
                Keep our hospital safe, compliant and efficient.
              </span>
            </div>
          </div>

          {/* 4 Top Metric Cards */}
          <VerificationStatsRow stats={stats} />

          {/* Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 cols): Applications Table + Bottom 2 Cards */}
            <div className="xl:col-span-8 space-y-6">
              {/* Pending Doctor Applications Table */}
              <PendingApplicationsTable
                applications={applications}
                selectedDoctorId={selectedDoctor?.id || ''}
                onSelectDoctor={(doc) => setSelectedDoctor(doc)}
                onReviewDoctor={(doc) => {
                  setSelectedDoctor(doc);
                  router.push('/hospital-admin/doctor-verification/review');
                }}
                onStatusChange={(doctorId, newStatus) =>
                  handleDecision(doctorId, newStatus)
                }
              />

              {/* Bottom 2 Cards: Activity & Compliance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentVerificationActivityCard activities={activities} />
                <ComplianceGuidelinesCard />
              </div>
            </div>

            {/* Right Column (4 cols): Sticky Doctor Profile Preview */}
            <div className="xl:col-span-4 xl:sticky xl:top-24">
              <DoctorProfilePreviewCard
                doctor={selectedDoctor}
                onApprove={(doc) => handleDecision(doc.id, 'Approved')}
                onReject={(doc) => handleDecision(doc.id, 'Rejected')}
                onRequestInfo={(doc) =>
                  handleDecision(doc.id, 'Requested More Info')
                }
                onClose={() => setSelectedDoctor(null)}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Review Doctor Modal */}
      <ReviewDoctorModal
        doctor={modalDoctor}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setModalDoctor(null);
        }}
        onDecision={handleDecision}
      />

      {/* Floating Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-lg border text-sm font-semibold flex items-center gap-2.5 ${
              toast.type === 'error'
                ? 'bg-red-500 text-white border-red-600'
                : toast.type === 'info'
                ? 'bg-amber-600 text-white border-amber-700'
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
