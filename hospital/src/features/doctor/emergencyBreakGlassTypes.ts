export type BreakGlassAccessScope = 'Critical Information Only' | 'Full Medical Record';

export type BreakGlassAccessDuration = '1 hour' | '4 hours' | '8 hours' | '12 hours' | '24 hours';

export type BreakGlassStatus = 'Completed' | 'Expired' | 'Active';

export interface RecentEmergencyAccessItem {
  id: string;
  patientName: string;
  patientUhid: string;
  initials: string;
  reason: string;
  accessScope: BreakGlassAccessScope | string;
  requestedOn: string;
  duration: BreakGlassAccessDuration | string;
  status: BreakGlassStatus;
  accessorName?: string;
  accessorRole?: string;
  clinicalNotes?: string;
}

export interface BreakGlassFormData {
  patientQuery: string;
  selectedReason: string;
  additionalDetails: string;
  accessScope: BreakGlassAccessScope;
  accessDuration: BreakGlassAccessDuration;
  confirmedGenuine: boolean;
}
