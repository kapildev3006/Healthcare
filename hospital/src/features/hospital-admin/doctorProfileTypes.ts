export interface DoctorProfileHero {
  id: string;
  name: string;
  avatar: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  degrees: string;
  subRole: string;
  email: string;
  phone: string;
  hospitalId: string;
  licenseNumber: string;
  department: string;
  specialty: string;
  joinDate: string;
  currentShift: string;
  workLocation: string;
  assignedRoles: string[];
}

export interface DoctorProfileStats {
  totalPatients: number;
  totalPatientsTrend: string;
  appointmentsThisMonth: number;
  appointmentsTrend: string;
  appointmentsCompleted: number;
  appointmentsCancelled: number;
  activeCaseLoad: number;
  activeCaseLoadTrend: string;
  patientSatisfaction: number;
  patientSatisfactionMax: number;
  patientSatisfactionTrend: string;
  totalReviews: number;
  avgConsultationTime: number; // in mins
  avgConsultationTrend: string;
  hospitalAvgConsultation: number; // in mins
}

export interface QualificationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  number: string;
  validUntil: string;
  status: 'Valid' | 'Expired' | 'Renewing';
}

export interface DepartmentAssignmentData {
  primaryDepartment: string;
  secondaryDepartments: string;
  departmentHead: string;
  location: string;
  roomOPD: string;
}

export interface ScheduleDayItem {
  day: string;
  shiftTime: string;
  availability: 'Available' | 'Limited' | 'Unavailable';
  statusColor: 'green' | 'amber' | 'red';
}

export interface DoctorActivityItem {
  id: string;
  dateTime: string;
  activity: string;
  recordNumber: string;
  performedBy: string;
}

export interface AccessPermissionItem {
  id: string;
  name: string;
  status: string;
  enabled: boolean;
}

export interface MonthlyPerformancePoint {
  month: string;
  visits: number;
}

export interface PerformanceOverview {
  totalPatientVisits: number;
  visitsTrend: string;
  newPatients: number;
  newPatientsTrend: string;
  followUpVisits: number;
  followUpTrend: string;
  referralsMade: number;
  referralsTrend: string;
  patientSatisfaction: string;
  satisfactionTrend: string;
  chartData: MonthlyPerformancePoint[];
}

export interface FullDoctorProfile {
  hero: DoctorProfileHero;
  stats: DoctorProfileStats;
  qualifications: QualificationItem[];
  certifications: CertificationItem[];
  departmentAssignment: DepartmentAssignmentData;
  schedule: ScheduleDayItem[];
  recentActivity: DoctorActivityItem[];
  permissions: AccessPermissionItem[];
  performance: PerformanceOverview;
}
