import {
  EmergencyDetailOverview,
  AccessTimelineEvent,
  AccessedDataCategory,
  AuditEvidenceItem,
  JustificationData,
  ReviewerNotesData,
  LocationDeviceData,
  ReviewChecklistItem,
} from './emergencyAuditDetailTypes';

export const mockEmergencyDetailOverview: EmergencyDetailOverview = {
  eventId: 'EA-20250612-77123',
  isReviewed: true,
  reviewStatus: 'Reviewed',
  reviewedBy: 'Sarah Wilson',
  reviewedAt: 'Jun 12, 2025 09:15 AM',
  accessedBy: {
    name: 'Dr. Vikram Singh',
    role: 'Consultant, Emergency Medicine',
    staffId: 'MED445678',
  },
  dateTime: {
    date: 'Jun 12, 2025',
    time: '02:18 AM',
  },
  department: {
    name: 'Emergency Medicine',
    location: 'ED - Main Hospital',
  },
  patientRecord: {
    recordNumber: '#77123',
    name: 'John Matthews',
    mrn: 'CC-458921',
  },
  emergencyReason: {
    title: 'Patient in critical condition - unconscious.',
    description: 'Immediate access required for life-saving treatment.',
  },
  duration: {
    total: '28 minutes',
    timeRange: '02:18 AM - 02:46 AM',
  },
};

export const mockAccessTimeline: AccessTimelineEvent[] = [
  {
    id: 'tl-1',
    time: '02:18 AM',
    title: 'Emergency access initiated',
    description: 'Break-glass access granted',
    isTerminal: false,
  },
  {
    id: 'tl-2',
    time: '02:19 AM',
    title: 'Patient record accessed',
    description: 'Record #77123',
    isTerminal: false,
  },
  {
    id: 'tl-3',
    time: '02:20 AM',
    title: 'Clinical data viewed',
    description: 'Lab results, medications, vitals',
    isTerminal: false,
  },
  {
    id: 'tl-4',
    time: '02:42 AM',
    title: 'Additional records accessed',
    description: 'Imaging reports, care notes',
    isTerminal: false,
  },
  {
    id: 'tl-5',
    time: '02:46 AM',
    title: 'Access session ended',
    description: 'Automatic session timeout',
    isTerminal: true,
  },
];

export const mockAccessedCategories: AccessedDataCategory[] = [
  {
    id: 'cat-1',
    name: 'Patient Demographics',
    status: 'Viewed',
    icon: 'user',
  },
  {
    id: 'cat-2',
    name: 'Clinical Notes',
    status: 'Viewed',
    icon: 'notes',
  },
  {
    id: 'cat-3',
    name: 'Laboratory Results',
    status: 'Viewed',
    icon: 'lab',
  },
  {
    id: 'cat-4',
    name: 'Imaging Reports',
    status: 'Viewed',
    icon: 'imaging',
  },
  {
    id: 'cat-5',
    name: 'Medications & Prescriptions',
    status: 'Viewed',
    icon: 'medication',
  },
  {
    id: 'cat-6',
    name: 'Allergies & Conditions',
    status: 'Viewed',
    icon: 'allergies',
  },
  {
    id: 'cat-7',
    name: 'Care Plans',
    status: 'Not Accessed',
    icon: 'care',
  },
  {
    id: 'cat-8',
    name: 'Billing Information',
    status: 'Not Accessed',
    icon: 'billing',
  },
];

export const mockRelatedAuditEvidence: AuditEvidenceItem[] = [
  {
    id: 'ev-1',
    title: 'System Access Log',
    filename: 'access_log_77123.txt',
    size: '142 KB',
  },
  {
    id: 'ev-2',
    title: 'User Session Details',
    filename: 'session_details.json',
    size: '48 KB',
  },
  {
    id: 'ev-3',
    title: 'Screenshots (2)',
    filename: 'access_screens_77123.zip',
    size: '2.4 MB',
  },
  {
    id: 'ev-4',
    title: 'Security Event Log',
    filename: 'security_event_99872.log',
    size: '95 KB',
  },
];

export const mockJustificationData: JustificationData = {
  quote:
    'Patient arrived in ED unconscious following a road traffic accident. Immediate access to medical history, allergies and previous imaging was critical for treatment decisions. Verbal consent not possible due to patient condition.',
  author: 'Dr. Vikram Singh',
  timestamp: 'Jun 12, 2025 02:18 AM',
};

export const mockReviewerNotesData: ReviewerNotesData = {
  notes:
    'Access was appropriate given the emergency circumstances. Patient was notified within required timeframe. No policy violations identified.',
  author: 'Nurse Sarah Wilson',
  role: 'Compliance Officer',
  timestamp: 'Jun 12, 2025 09:15 AM',
};

export const mockLocationDeviceData: LocationDeviceData = {
  workstation: 'ED-WS-03',
  location: 'Emergency Department, Floor 1',
  ipAddress: '10.25.14.67',
  deviceType: 'Hospital Workstation',
  browserApp: 'EHR v4.2.1 (Desktop)',
  os: 'Windows 11 Enterprise',
};

export const mockReviewChecklist: ReviewChecklistItem[] = [
  {
    id: 'chk-1',
    title: 'Verify emergency justification',
    completed: true,
  },
  {
    id: 'chk-2',
    title: 'Confirm accessed data was necessary',
    completed: true,
  },
  {
    id: 'chk-3',
    title: 'Check patient notification status',
    completed: true,
  },
  {
    id: 'chk-4',
    title: 'Review access duration',
    completed: true,
  },
  {
    id: 'chk-5',
    title: 'Assess for policy compliance',
    completed: true,
  },
  {
    id: 'chk-6',
    title: 'Add reviewer notes',
    completed: true,
  },
  {
    id: 'chk-7',
    title: 'Escalate if further investigation needed',
    completed: false,
  },
];
