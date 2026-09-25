export interface NotificationStatMetrics {
  unreadCount: number;
  unreadTrend: string;
  unreadSub: string;
  highPriorityCount: number;
  highPriorityTrend: string;
  highPrioritySub: string;
  verificationUpdatesCount: number;
  verificationTrend: string;
  verificationSub: string;
  auditEventsCount: number;
  auditTrend: string;
  auditSub: string;
}

export type NotificationCategory = 'All' | 'Verification' | 'Security' | 'Access' | 'System';
export type NotificationPriority = 'High' | 'Medium' | 'Low';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: 'Verification' | 'Security' | 'Access' | 'System';
  source: string;
  timestamp: string;
  priority: NotificationPriority;
  isRead: boolean;
  iconType: 'emergency' | 'verification-doc' | 'security-login' | 'role' | 'maintenance' | 'failed-login' | 'verified-check' | 'audit-chart';
  targetUrl?: string;
  metadata?: Record<string, string>;
}

export interface NotificationPreferencesState {
  verificationUpdates: boolean;
  securityAlerts: boolean;
  accessNotifications: boolean;
  systemUpdates: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}
