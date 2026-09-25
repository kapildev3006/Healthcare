export type SearchTabType = 'details' | 'health-id' | 'phone' | 'qr';

export type AccessStatusType = 'Authorized' | 'Request Access' | 'Pending' | 'Access Denied';

export interface PatientSearchResultItem {
  id: string;
  name: string;
  uhid: string;
  healthId: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  lastVisitDate: string;
  lastVisitDepartment: string;
  accessStatus: AccessStatusType;
  phone?: string;
  bloodGroup?: string;
  allergies?: string[];
  recentCondition?: string;
}

export interface PatientSearchFiltersState {
  gender: string;
  ageRange: string;
  location: string;
  patientType: string;
  accessStatus: string;
}

export interface RecentSearchItem {
  id: string;
  query: string;
  displayDetail: string; // e.g. "UHID: MLK00123" or "Phone: +91 98765 43210"
  timeAgo: string;
  type: 'name' | 'uhid' | 'phone' | 'health-id';
}
