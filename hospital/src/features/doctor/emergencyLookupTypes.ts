export type EmergencyLookupTab = 'health-id' | 'qr' | 'phone';

export interface AllergyItem {
  id: string;
  name: string;
  reaction: string;
  severity: 'Severe' | 'Moderate' | 'Mild';
}

export interface ChronicConditionItem {
  id: string;
  name: string;
  sinceYear: number | string;
  infoAvailable?: boolean;
}

export interface CurrentMedicationItem {
  id: string;
  name: string;
  dosageInstructions: string;
}

export interface EmergencyEncounterItem {
  id: string;
  date: string;
  department: string;
  reason: string;
  doctor: string;
  hasLink?: boolean;
}

export interface EmergencyReportItem {
  id: string;
  date: string;
  reportType: string;
  findings: string;
  isAbnormal?: boolean;
}

export interface EmergencyAccessLogItem {
  id: string;
  accessor: string;
  timestamp: string;
  accessType: 'Current' | 'Emergency' | 'Consultation';
}

export interface EmergencyPatientData {
  name: string;
  uhid: string;
  healthId: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  isIdentityVerified: boolean;
  lastUpdated: string;
  primaryHospital: string;
  allergies: AllergyItem[];
  chronicConditions: ChronicConditionItem[];
  currentMedications: CurrentMedicationItem[];
  recentEncounters: EmergencyEncounterItem[];
  recentReports: EmergencyReportItem[];
  accessLogs: EmergencyAccessLogItem[];
}
