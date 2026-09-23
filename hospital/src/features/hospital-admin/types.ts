export interface DoctorVerificationItem {
  id: string;
  doctorName: string;
  specialty: string;
  licenseId: string;
  department: string;
  submittedOn: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  email?: string;
  phone?: string;
  experience?: string;
  qualification?: string;
}

export interface AccessAuditItem {
  id: string;
  user: string;
  accessedRecord: string;
  timestamp: string;
  accessType: 'Standard' | 'Emergency';
  department?: string;
  reason?: string;
}

export interface DepartmentMetric {
  id: string;
  name: string;
  count: number;
  capacity: number;
}

export interface StaffRoleCount {
  role: string;
  count: number;
  color: string;
  bgColor: string;
}

export interface EmergencyAlertItem {
  id: string;
  doctorName: string;
  patientRecord: string;
  timestamp: string;
  status: 'Emergency';
}

export interface ComplianceStatusItem {
  id: string;
  label: string;
  status: string;
  type: 'green' | 'blue';
}

export interface MetricStat {
  id: string;
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  trendColor?: 'green' | 'red' | 'neutral';
  subtext: string;
  iconType: 'stethoscope' | 'pending' | 'department' | 'staff' | 'access' | 'emergency';
}
