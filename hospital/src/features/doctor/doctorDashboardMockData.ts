import {
  DoctorDashboardStats,
  AppointmentItem,
  EmergencyAlertItem,
  AiInsightItem,
  QuickActionItem,
  DailyActivityMetric,
  DepartmentDistributionItem,
  DoctorRecentActivityItem,
} from './doctorDashboardTypes';

export const mockDoctorStats: DoctorDashboardStats = {
  todayPatients: {
    count: 12,
    trendText: '20% from yesterday',
    trendDirection: 'up',
  },
  upcomingAppointments: {
    count: 8,
    nextTime: '10:30 AM',
  },
  emergencyCases: {
    count: 2,
    periodText: 'In last 24 hours',
  },
  pendingReports: {
    count: 5,
    statusText: 'Needs your review',
  },
};

export const mockAppointments: AppointmentItem[] = [
  {
    id: 'apt-1',
    time: '10:30 AM',
    patientName: 'Rohit Sharma',
    patientUhid: 'MLK00123',
    patientGender: 'Male',
    patientAge: 38,
    reason: 'Follow-up (Diabetes)',
    type: 'Consultation',
    status: 'Checked In',
    phone: '+91 98765 43210',
    room: 'OPD Room 204',
  },
  {
    id: 'apt-2',
    time: '11:00 AM',
    patientName: 'Priya Verma',
    patientUhid: 'MLK00456',
    patientGender: 'Female',
    patientAge: 29,
    reason: 'Fever & Cold',
    type: 'Consultation',
    status: 'Scheduled',
    phone: '+91 98112 34567',
    room: 'OPD Room 204',
  },
  {
    id: 'apt-3',
    time: '11:30 AM',
    patientName: 'Amit Kumar',
    patientUhid: 'MLK00789',
    patientGender: 'Male',
    patientAge: 45,
    reason: 'Chest Pain',
    type: 'Consultation',
    status: 'Scheduled',
    phone: '+91 99223 34455',
    room: 'OPD Room 204',
  },
  {
    id: 'apt-4',
    time: '12:00 PM',
    patientName: 'Neha Singh',
    patientUhid: 'MLK00234',
    patientGender: 'Female',
    patientAge: 34,
    reason: 'Report Discussion',
    type: 'Follow-up',
    status: 'Scheduled',
    phone: '+91 97123 45678',
    room: 'OPD Room 204',
  },
  {
    id: 'apt-5',
    time: '12:30 PM',
    patientName: 'Vikas Mehta',
    patientUhid: 'MLK00987',
    patientGender: 'Male',
    patientAge: 52,
    reason: 'General Checkup',
    type: 'Consultation',
    status: 'Scheduled',
    phone: '+91 98456 78901',
    room: 'OPD Room 204',
  },
];

export const mockEmergencyAlerts: EmergencyAlertItem[] = [
  {
    id: 'alert-1',
    title: 'Possible pneumonia detected',
    subtitle: 'AI analysis flag • 1 hour ago',
    severity: 'high',
    actionType: 'Review',
    timeAgo: '1 hour ago',
    patientName: 'Sunil Malhotra',
    patientUhid: 'MLK00845',
    aiModel: 'ResNet50-ChestCAD v2.1',
    confidence: 89.4,
    findingDetails:
      'Consolidation opacity noted in the right lower lobe consistent with bacterial pneumonia. Clinical correlation advised.',
  },
  {
    id: 'alert-2',
    title: 'High-risk patient in ER',
    subtitle: 'Needs immediate attention • 2 hours ago',
    severity: 'critical',
    actionType: 'View',
    timeAgo: '2 hours ago',
    patientName: 'Meenakshi Iyer',
    patientUhid: 'MLK00612',
    aiModel: 'TriageAlert v1.4',
    confidence: 94.2,
    findingDetails:
      'Elevated troponin levels and abnormal ECG rhythm flagged in Emergency Ward. Break-glass emergency access authorized.',
  },
];

export const mockAiInsights: AiInsightItem[] = [
  {
    id: 'insight-1',
    title: '3 reports need attention',
    subtitle: 'Potential abnormalities detected',
    type: 'reports_attention',
    iconType: 'brain',
    count: 3,
  },
  {
    id: 'insight-2',
    title: '1 critical finding',
    subtitle: 'High confidence • Chest X-Ray',
    type: 'critical_finding',
    iconType: 'alert',
    count: 1,
  },
  {
    id: 'insight-3',
    title: '5 reports analyzed today',
    subtitle: 'AI analysis completed',
    type: 'reports_analyzed',
    iconType: 'check',
    count: 5,
  },
];

export const mockQuickActions: QuickActionItem[] = [
  {
    id: 'qa-search',
    title: 'Search Patient',
    subtitle: 'Find patient records',
    iconName: 'Search',
    colorTheme: 'blue',
    href: '/doctor/patient-search',
  },
  {
    id: 'qa-emergency',
    title: 'Emergency Lookup',
    subtitle: 'Quick access in emergencies',
    iconName: 'AlertTriangle',
    colorTheme: 'red',
    href: '/doctor/emergency-lookup',
  },
  {
    id: 'qa-encounter',
    title: 'Create Encounter',
    subtitle: 'Add new consultation record',
    iconName: 'CheckCircle2',
    colorTheme: 'green',
    href: '/doctor/encounters/new',
  },
  {
    id: 'qa-reports',
    title: 'View Reports',
    subtitle: 'See lab reports, imaging, etc.',
    iconName: 'FileText',
    colorTheme: 'purple',
    href: '/doctor/reports',
  },
  {
    id: 'qa-access',
    title: 'Request Access',
    subtitle: 'Request patient record access',
    iconName: 'KeyRound',
    colorTheme: 'amber',
    href: '/doctor/access-requests',
  },
];

export const mockDailyActivityData: DailyActivityMetric[] = [
  { date: 'Sep 10', patients: 18 },
  { date: 'Sep 11', patients: 28 },
  { date: 'Sep 12', patients: 17 },
  { date: 'Sep 13', patients: 31 },
  { date: 'Sep 14', patients: 20 },
  { date: 'Sep 15', patients: 26 },
  { date: 'Sep 16', patients: 23 },
];

export const mockDepartmentDistribution: DepartmentDistributionItem[] = [
  {
    department: 'General Medicine',
    percentage: 40,
    patientsCount: 67,
    color: '#2563eb', // Blue
  },
  {
    department: 'Cardiology',
    percentage: 20,
    patientsCount: 34,
    color: '#ef4444', // Red/Coral
  },
  {
    department: 'Endocrinology',
    percentage: 15,
    patientsCount: 25,
    color: '#f59e0b', // Amber
  },
  {
    department: 'Pulmonology',
    percentage: 15,
    patientsCount: 25,
    color: '#06b6d4', // Teal/Cyan
  },
  {
    department: 'Others',
    percentage: 10,
    patientsCount: 17,
    color: '#eab308', // Yellow
  },
];

export const mockDoctorRecentActivity: DoctorRecentActivityItem[] = [
  {
    id: 'act-1',
    title: 'New access request',
    subtitle: 'Dr. Sarah Khan requested access...',
    timestamp: '10 min ago',
    type: 'access_request',
  },
  {
    id: 'act-2',
    title: 'Lab report available',
    subtitle: 'Patient: Rohit Sharma',
    timestamp: '25 min ago',
    type: 'lab_report',
  },
  {
    id: 'act-3',
    title: 'AI alert',
    subtitle: 'Possible abnormal finding in X-Ray',
    timestamp: '1 hour ago',
    type: 'ai_alert',
    isAlert: true,
  },
  {
    id: 'act-4',
    title: 'Patient assigned to you',
    subtitle: 'New patient assigned',
    timestamp: '2 hours ago',
    type: 'patient_assigned',
  },
  {
    id: 'act-5',
    title: 'Report analyzed',
    subtitle: 'AI analysis completed',
    timestamp: '1 day ago',
    type: 'report_analyzed',
  },
];
