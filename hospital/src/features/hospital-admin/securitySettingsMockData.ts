import {
  SecurityMetrics,
  SecurityEventItem,
  ComplianceItem,
  ActiveDeviceSession,
  SecuritySettingsState,
} from './securitySettingsTypes';

export const mockSecurityMetrics: SecurityMetrics = {
  securityScore: 92,
  securityScoreTrend: '↑ 4%',
  securityScoreSub: 'Good security posture',
  twoFactorAdoption: 78,
  twoFactorTrend: '↑ 12%',
  twoFactorSub: 'of active users',
  auditCoverage: 100,
  auditCoverageTrend: '↑ 0%',
  auditCoverageSub: 'All critical systems',
  systemHealth: 'Healthy',
  systemHealthSub: 'All security systems operational',
};

export const defaultSecuritySettingsState: SecuritySettingsState = {
  // Access Control
  defaultAccessLevel: 'Role-based (Recommended)',
  sessionTimeout: '30 minutes',
  requireReauth: true,
  restrictExternalAccess: true,

  // Session Management
  sessionTimeoutDuration: '30 minutes',
  rememberMeDuration: '7 days',
  concurrentSessions: 'Limit to 3 devices',
  showLoginAlerts: true,

  // Data Retention
  patientRecordsRetention: '7 years (HIPAA)',
  accessLogsRetention: '2 years',
  systemLogsRetention: '1 year',
  autoDeleteOldLogs: true,

  // Authentication Settings
  twoFactorAuth: true,
  allowSmsAuth: true,
  allowAuthenticatorApp: true,
  emailVerification: true,
  singleSignOn: false,

  // Password Policy
  minPasswordLength: '12 characters',
  requireUppercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  passwordExpiry: '90 days',

  // Notification Preferences
  securityAlerts: true,
  complianceUpdates: true,
  systemHealthAlerts: true,
  weeklySecurityReport: false,
};

export const mockRecentSecurityEvents: SecurityEventItem[] = [
  {
    id: 'sec-1',
    user: 'Dr. Ananya Iyer',
    event: 'Failed login attempt',
    eventColor: 'red',
    timestamp: 'Jun 12, 2025 10:14 AM',
    ipAddress: '192.168.1.105',
    location: 'Emergency Department',
  },
  {
    id: 'sec-2',
    user: 'Admin (Rajesh)',
    event: 'Password changed',
    eventColor: 'green',
    timestamp: 'Jun 12, 2025 09:32 AM',
    ipAddress: '192.168.1.10',
    location: 'Admin Office',
  },
  {
    id: 'sec-3',
    user: 'Nurse Sarah Wilson',
    event: 'New device login',
    eventColor: 'blue',
    timestamp: 'Jun 12, 2025 08:17 AM',
    ipAddress: '10.25.14.67',
    location: 'ICU Floor 2',
  },
  {
    id: 'sec-4',
    user: 'IT Support (Rohan)',
    event: 'Access level updated',
    eventColor: 'blue',
    timestamp: 'Jun 12, 2025 06:42 AM',
    ipAddress: '192.168.2.40',
    location: 'IT Operations Center',
  },
  {
    id: 'sec-5',
    user: 'Dr. Vikram Singh',
    event: 'Emergency access used',
    eventColor: 'red',
    timestamp: 'Jun 11, 2025 11:21 PM',
    ipAddress: '192.168.3.12',
    location: 'Emergency Department',
  },
  {
    id: 'sec-6',
    user: 'Dr. Priya Sharma',
    event: '2FA enabled',
    eventColor: 'green',
    timestamp: 'Jun 11, 2025 04:18 PM',
    ipAddress: '192.168.4.15',
    location: 'Cardiology Clinic',
  },
];

export const mockComplianceItems: ComplianceItem[] = [
  {
    id: 'cmp-1',
    title: 'HIPAA Compliance',
    status: 'Compliant',
  },
  {
    id: 'cmp-2',
    title: 'Audit Logging',
    status: 'Active',
  },
  {
    id: 'cmp-3',
    title: 'Access Controls',
    status: 'Configured',
  },
  {
    id: 'cmp-4',
    title: 'Data Encryption',
    status: 'Enabled',
  },
  {
    id: 'cmp-5',
    title: 'Business Associate Agreements',
    status: 'Compliant',
  },
  {
    id: 'cmp-6',
    title: 'Disaster Recovery Plan',
    status: 'Up to Date',
  },
];

export const mockActiveDeviceSessions: ActiveDeviceSession[] = [
  {
    id: 'dev-1',
    user: 'Rajesh Kumar',
    device: 'Chrome / Windows',
    location: 'New York, NY',
    status: 'Active',
    lastSeen: 'Active now',
    ipAddress: '192.168.1.10',
  },
  {
    id: 'dev-2',
    user: 'Dr. Priya Sharma',
    device: 'Safari / macOS',
    location: 'New York, NY',
    status: 'Active',
    lastSeen: '2 mins ago',
    ipAddress: '192.168.4.15',
  },
  {
    id: 'dev-3',
    user: 'Nurse Sarah Wilson',
    device: 'iPhone / iOS',
    location: 'New York, NY',
    status: 'Active',
    lastSeen: '5 mins ago',
    ipAddress: '10.25.14.67',
  },
  {
    id: 'dev-4',
    user: 'IT Support (Rohan)',
    device: 'Chrome / Windows',
    location: 'Boston, MA',
    status: 'Active',
    lastSeen: '12 mins ago',
    ipAddress: '192.168.2.40',
  },
];
