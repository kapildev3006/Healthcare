export interface HospitalProfileInfo {
  name: string;
  tagline: string;
  type: string;
  hospitalId: string;
  registrationNo: string;
  establishedYear: string;
  address: string;
  contactNumber: string;
  email: string;
  website: string;
  status: 'Active' | 'Inactive';
  verified: boolean;
}

export interface AdministratorInfo {
  name: string;
  designation: string;
  employeeId: string;
  contactNumber: string;
  email: string;
}

export interface OperationalDetails {
  operatingHours: string;
  emergencyContact: string;
  helplineNumber: string;
  numberOfBeds: number;
  icuBeds: number;
  emergencyServices: string;
}

export interface AccreditationItem {
  id: string;
  name: string;
  status: string;
  validity: string;
  logo: string;
}

export interface ComplianceDocumentItem {
  id: string;
  title: string;
  fileType: string;
  size: string;
}

export interface ProfileQuickStat {
  id: string;
  label: string;
  value: string | number;
  iconType: 'doctor' | 'staff' | 'department' | 'beds' | 'icu' | 'emergency';
  viewAllLink?: string;
}
