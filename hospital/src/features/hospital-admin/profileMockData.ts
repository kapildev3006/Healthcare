import {
  HospitalProfileInfo,
  AdministratorInfo,
  OperationalDetails,
  AccreditationItem,
  ComplianceDocumentItem,
  ProfileQuickStat,
} from './profileTypes';

export const mockHospitalInfo: HospitalProfileInfo = {
  name: 'CityCare Hospital',
  tagline: 'Compassion. Technology. Better Health.',
  type: 'Private Multi-Speciality Hospital',
  hospitalId: 'CCH-2025-001',
  registrationNo: 'UP/HC/2024/01876',
  establishedYear: '2020',
  address: 'Plot No. 12, Sector 62, Noida, Uttar Pradesh - 201309',
  contactNumber: '+91 120 456 7890',
  email: 'contact@citycarehospital.in',
  website: 'www.citycarehospital.in',
  status: 'Active',
  verified: true,
};

export const mockAdministratorInfo: AdministratorInfo = {
  name: 'Rajesh Kumar',
  designation: 'Hospital Administrator',
  employeeId: 'CCH-ADM-001',
  contactNumber: '+91 98765 43210',
  email: 'rajesh.kumar@citycarehospital.in',
};

export const mockOperationalDetails: OperationalDetails = {
  operatingHours: '24 Hours (Mon - Sun)',
  emergencyContact: '+91 120 456 7800',
  helplineNumber: '1800 123 4567',
  numberOfBeds: 250,
  icuBeds: 32,
  emergencyServices: 'Available (24/7)',
};

export const mockProfileQuickStats: ProfileQuickStat[] = [
  {
    id: 'stat-doc',
    label: 'Doctors',
    value: '128',
    iconType: 'doctor',
    viewAllLink: '#doctors',
  },
  {
    id: 'stat-staff',
    label: 'Staff Members',
    value: '342',
    iconType: 'staff',
    viewAllLink: '#staff',
  },
  {
    id: 'stat-dept',
    label: 'Departments',
    value: '12',
    iconType: 'department',
    viewAllLink: '#departments',
  },
  {
    id: 'stat-beds',
    label: 'Total Beds',
    value: '250',
    iconType: 'beds',
  },
  {
    id: 'stat-icu',
    label: 'ICU Beds',
    value: '32',
    iconType: 'icu',
  },
  {
    id: 'stat-emerg',
    label: 'Emergency',
    value: '24/7',
    iconType: 'emergency',
  },
];

export const mockAccreditations: AccreditationItem[] = [
  {
    id: 'acc-nabh',
    name: 'NABH',
    status: 'Accredited',
    validity: 'Valid till Dec 2026',
    logo: '/cert_nabh.png',
  },
  {
    id: 'acc-iso',
    name: 'ISO 9001:2015',
    status: 'Certified',
    validity: 'Valid till Jan 2027',
    logo: '/cert_iso.png',
  },
  {
    id: 'acc-nabl',
    name: 'NABL',
    status: 'Certified',
    validity: 'Valid till Mar 2027',
    logo: '/cert_nabl.png',
  },
];

export const mockFacilities: string[] = [
  '24/7 Emergency Care',
  'ICU & Critical Care',
  'Advanced Diagnostic Laboratory',
  'Pharmacy',
  'Operation Theatres',
  'Radiology & Imaging',
  'Blood Bank',
  'Ambulance Services',
];

export const mockComplianceDocuments: ComplianceDocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Hospital Registration Certificate',
    fileType: 'PDF',
    size: '2.4 MB',
  },
  {
    id: 'doc-2',
    title: 'NABH Accreditation Certificate',
    fileType: 'PDF',
    size: '1.8 MB',
  },
  {
    id: 'doc-3',
    title: 'Fire Safety Certificate',
    fileType: 'PDF',
    size: '1.2 MB',
  },
];
