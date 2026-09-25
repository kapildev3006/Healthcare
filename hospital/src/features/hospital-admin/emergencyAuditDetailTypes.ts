export interface EmergencyDetailOverview {
  eventId: string;
  isReviewed: boolean;
  reviewStatus: 'Reviewed' | 'Under Review' | 'Expired';
  reviewedBy?: string;
  reviewedAt?: string;
  accessedBy: {
    name: string;
    role: string;
    staffId: string;
  };
  dateTime: {
    date: string;
    time: string;
  };
  department: {
    name: string;
    location: string;
  };
  patientRecord: {
    recordNumber: string;
    name: string;
    mrn: string;
  };
  emergencyReason: {
    title: string;
    description: string;
  };
  duration: {
    total: string;
    timeRange: string;
  };
}

export interface AccessTimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  isTerminal?: boolean;
}

export interface AccessedDataCategory {
  id: string;
  name: string;
  status: 'Viewed' | 'Not Accessed';
  icon: string;
}

export interface AuditEvidenceItem {
  id: string;
  title: string;
  filename: string;
  size?: string;
  downloadUrl?: string;
}

export interface JustificationData {
  quote: string;
  author: string;
  timestamp: string;
}

export interface ReviewerNotesData {
  notes: string;
  author: string;
  role: string;
  timestamp: string;
}

export interface LocationDeviceData {
  workstation: string;
  location: string;
  ipAddress: string;
  deviceType: string;
  browserApp: string;
  os: string;
}

export interface ReviewChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}
