export interface AccessAuditStat {
  totalEventsToday: number;
  totalEventsTrend: string;
  totalEventsSub: string;
  standardAccesses: number;
  standardAccessesTrend: string;
  standardAccessesSub: string;
  flaggedEvents: number;
  flaggedEventsTrend: string;
  flaggedEventsSub: string;
  activeSessions: number;
  activeSessionsTrend: string;
  activeSessionsSub: string;
}

export type AccessType = 'View' | 'Export' | 'Edit' | 'Print';
export type AuditLogStatus = 'Standard' | 'Flagged';

export interface AccessAuditLogRow {
  id: string;
  index: number;
  user: string;
  role: string;
  patientRecord: string;
  patientId: string;
  patientName: string;
  accessType: AccessType;
  reason: string;
  timestamp: string;
  duration: string;
  department: string;
  status: AuditLogStatus;
  ipAddress?: string;
  deviceId?: string;
  flagReason?: string;
  hash?: string;
}

export interface AuditLogFilterState {
  dateRange: string;
  user: string;
  department: string;
  accessType: string;
  showFlaggedOnly: boolean;
}

export interface AuditInsightItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  trend?: string;
  trendUp?: boolean;
}

export interface SuspiciousTrendItem {
  id: string;
  title: string;
  description: string;
  count: string;
  trend: string;
}

export interface ComplianceReminderItem {
  id: string;
  title: string;
  description: string;
  status: string;
  statusType: 'green' | 'blue';
  iconType: 'check' | 'calendar' | 'user-badge' | 'clock';
}
