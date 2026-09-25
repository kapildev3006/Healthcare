export interface SecurityMetrics {
  securityScore: number;
  securityScoreTrend: string;
  securityScoreSub: string;
  twoFactorAdoption: number;
  twoFactorTrend: string;
  twoFactorSub: string;
  auditCoverage: number;
  auditCoverageTrend: string;
  auditCoverageSub: string;
  systemHealth: string;
  systemHealthSub: string;
}

export interface SecurityEventItem {
  id: string;
  user: string;
  event: string;
  eventColor: 'red' | 'green' | 'blue';
  timestamp: string;
  ipAddress?: string;
  location?: string;
}

export interface ComplianceItem {
  id: string;
  title: string;
  status: 'Compliant' | 'Active' | 'Configured' | 'Enabled' | 'Up to Date';
}

export interface ActiveDeviceSession {
  id: string;
  user: string;
  device: string;
  location: string;
  status: 'Active' | 'Idle';
  lastSeen?: string;
  ipAddress?: string;
}

export interface SecuritySettingsState {
  // Access Control
  defaultAccessLevel: string;
  sessionTimeout: string;
  requireReauth: boolean;
  restrictExternalAccess: boolean;

  // Session Management
  sessionTimeoutDuration: string;
  rememberMeDuration: string;
  concurrentSessions: string;
  showLoginAlerts: boolean;

  // Data Retention
  patientRecordsRetention: string;
  accessLogsRetention: string;
  systemLogsRetention: string;
  autoDeleteOldLogs: boolean;

  // Authentication Settings
  twoFactorAuth: boolean;
  allowSmsAuth: boolean;
  allowAuthenticatorApp: boolean;
  emailVerification: boolean;
  singleSignOn: boolean;

  // Password Policy
  minPasswordLength: string;
  requireUppercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  passwordExpiry: string;

  // Notification Preferences
  securityAlerts: boolean;
  complianceUpdates: boolean;
  systemHealthAlerts: boolean;
  weeklySecurityReport: boolean;
}
