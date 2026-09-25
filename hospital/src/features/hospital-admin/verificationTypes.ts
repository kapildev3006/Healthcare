export type DocumentStatus = 'Complete' | 'Missing (1)' | 'Missing (2)';
export type BackgroundCheckStatus = 'Clear' | 'In Progress' | 'Not Started';
export type VerificationApplicationStatus =
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Requested More Info';

export interface DoctorQualification {
  degree: string;
  institute: string;
  year: string;
}

export interface UploadedDocItem {
  name: string;
  format: 'PDF' | 'JPG' | 'PNG';
  size?: string;
}

export interface LicenseDetail {
  licenseId: string;
  issuingAuthority: string;
  validFrom: string;
  validUntil: string;
  remainingText: string;
  isValid: boolean;
}

export interface DoctorVerificationApplication {
  id: string;
  doctorName: string;
  avatar: string;
  degrees: string;
  specialty: string;
  department: string;
  licenseId: string;
  submittedOn: string;
  documentsStatus: DocumentStatus;
  backgroundCheck: BackgroundCheckStatus;
  status: VerificationApplicationStatus;
  qualifications: DoctorQualification[];
  uploadedDocs: UploadedDocItem[];
  licenseDetail: LicenseDetail;
}

export interface VerificationStats {
  pendingReviews: number;
  pendingTrend: string;
  approvedToday: number;
  approvedTrend: string;
  rejected: number;
  rejectedTrend: string;
  needMoreInfo: number;
  needMoreInfoTrend: string;
}

export interface VerificationActivityLog {
  id: string;
  user: string;
  doctorName: string;
  action: 'Approved' | 'Rejected' | 'Requested More Info';
  timestamp: string;
}
