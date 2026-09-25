export interface AppointmentItem {
  id: string;
  time: string;
  patientName: string;
  patientUhid: string;
  patientAvatar?: string;
  patientGender?: string;
  patientAge?: number;
  reason: string;
  type: 'Consultation' | 'Follow-up' | 'Emergency' | 'Checkup';
  status: 'Checked In' | 'Scheduled' | 'Completed' | 'In Progress';
  phone?: string;
  room?: string;
}

export interface EmergencyAlertItem {
  id: string;
  title: string;
  subtitle: string;
  severity: 'high' | 'critical' | 'medium';
  actionType: 'Review' | 'View';
  timeAgo: string;
  patientName?: string;
  patientUhid?: string;
  aiModel?: string;
  confidence?: number;
  findingDetails?: string;
}

export interface AiInsightItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'reports_attention' | 'critical_finding' | 'reports_analyzed';
  iconType: 'brain' | 'alert' | 'check';
  count?: number;
}

export interface QuickActionItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  colorTheme: 'blue' | 'red' | 'green' | 'purple' | 'amber';
  href?: string;
}

export interface DailyActivityMetric {
  date: string; // e.g. "Sep 10"
  patients: number;
}

export interface DepartmentDistributionItem {
  department: string;
  percentage: number;
  patientsCount: number;
  color: string;
}

export interface DoctorRecentActivityItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  type: 'access_request' | 'lab_report' | 'ai_alert' | 'patient_assigned' | 'report_analyzed';
  isAlert?: boolean;
}

export interface DoctorDashboardStats {
  todayPatients: {
    count: number;
    trendText: string;
    trendDirection: 'up' | 'down';
  };
  upcomingAppointments: {
    count: number;
    nextTime: string;
  };
  emergencyCases: {
    count: number;
    periodText: string;
  };
  pendingReports: {
    count: number;
    statusText: string;
  };
}
