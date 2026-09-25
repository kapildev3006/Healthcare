export interface EmergencyAuditStat {
  emergencyEventsToday: number;
  emergencyEventsTrend: string;
  emergencyEventsSub: string;
  activeSessions: number;
  activeSessionsTrend: string;
  activeSessionsSub: string;
  highRiskCases: number;
  highRiskCasesTrend: string;
  highRiskCasesSub: string;
  awaitingReview: number;
  awaitingReviewTrend: string;
  awaitingReviewSub: string;
}

export type EmergencyAuditStatus = 'Under Review' | 'Reviewed' | 'Expired';
export type EmergencySeverity = 'High' | 'Medium' | 'Low';

export interface EmergencyAccessEvent {
  id: string;
  user: string;
  role?: string;
  patientRecord: string;
  patientId: string;
  patientName?: string;
  emergencyReason: string;
  isReasonCritical?: boolean;
  department: string;
  isDepartmentCritical?: boolean;
  initiatedOn: string;
  expiryTime: string;
  auditStatus: EmergencyAuditStatus;
  severity: EmergencySeverity;
  ipAddress?: string;
  deviceId?: string;
  clinicalJustification?: string;
  notificationStatus?: 'Notified' | 'Pending Notification' | 'Notification Failed' | 'Not Required';
  reviewNotes?: string;
}

export interface CriticalAlertItem {
  id: string;
  user: string;
  patientRecord: string;
  timestamp: string;
  severity: EmergencySeverity;
  alertType: string;
  alertColor?: 'red' | 'amber';
  eventId?: string;
}

export interface NotificationStatusItem {
  status: 'Notified' | 'Pending Notification' | 'Notification Failed' | 'Not Required';
  count: number;
  percentage: number;
  color: string;
}

export interface PatientNotificationBreakdown {
  totalEvents: number;
  items: NotificationStatusItem[];
}

export interface EmergencyComplianceItem {
  id: string;
  title: string;
  status: 'Compliant' | 'Active';
}
