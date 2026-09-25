export type MyPatientStatus = 'Active' | 'Follow-up Due' | 'Needs Review';

export interface MyPatientItem {
  id: string;
  rowNum: number;
  name: string;
  avatarUrl?: string;
  uhid: string;
  healthId: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  primaryCondition: string;
  lastVisit: string;
  status: MyPatientStatus;
  phone?: string;
  email?: string;
  bloodGroup?: string;
}

export interface MyPatientsStats {
  totalPatients: number;
  totalPatientsTrend: string;
  activeTreatments: number;
  activeTreatmentsSubtitle: string;
  followupsDue: number;
  followupsDueSubtitle: string;
  newThisMonth: number;
  newThisMonthTrend: string;
}

export interface UpcomingFollowupItem {
  id: string;
  name: string;
  avatarUrl?: string;
  reason: string;
  dueDate: string;
}

export type ViewMode = 'list' | 'card';
