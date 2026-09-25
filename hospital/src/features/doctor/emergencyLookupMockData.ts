import { EmergencyPatientData } from './emergencyLookupTypes';

export const mockEmergencyPatientData: EmergencyPatientData = {
  name: 'Rohit Sharma',
  uhid: 'MLK00123',
  healthId: '91-2345-6789-1234',
  age: 45,
  gender: 'Male',
  bloodGroup: 'B+',
  isIdentityVerified: true,
  lastUpdated: '12 Sep 2026',
  primaryHospital: 'CityCare Hospital',
  allergies: [
    {
      id: 'al-1',
      name: 'Penicillin',
      reaction: 'Anaphylaxis',
      severity: 'Severe',
    },
    {
      id: 'al-2',
      name: 'Ibuprofen',
      reaction: 'Rash, Itching',
      severity: 'Moderate',
    },
  ],
  chronicConditions: [
    {
      id: 'cc-1',
      name: 'Type 2 Diabetes Mellitus',
      sinceYear: 'Since 2018',
      infoAvailable: true,
    },
    {
      id: 'cc-2',
      name: 'Hypertension',
      sinceYear: 'Since 2016',
      infoAvailable: true,
    },
    {
      id: 'cc-3',
      name: 'Asthma',
      sinceYear: 'Since 2010',
      infoAvailable: false,
    },
  ],
  currentMedications: [
    {
      id: 'med-1',
      name: 'Metformin 500mg',
      dosageInstructions: '1 tablet twice daily',
    },
    {
      id: 'med-2',
      name: 'Amlodipine 5mg',
      dosageInstructions: '1 tablet once daily',
    },
    {
      id: 'med-3',
      name: 'Salbutamol Inhaler',
      dosageInstructions: 'As needed',
    },
    {
      id: 'med-4',
      name: 'Atorvastatin 10mg',
      dosageInstructions: '1 tablet at night',
    },
  ],
  recentEncounters: [
    {
      id: 'enc-1',
      date: '12 Sep 2026',
      department: 'General Medicine',
      reason: 'Follow-up (Diabetes)',
      doctor: 'Dr. Neha Verma',
      hasLink: true,
    },
    {
      id: 'enc-2',
      date: '05 Aug 2026',
      department: 'Cardiology',
      reason: 'Hypertension Review',
      doctor: 'Dr. Amit Kumar',
    },
    {
      id: 'enc-3',
      date: '18 Jun 2026',
      department: 'Pulmonology',
      reason: 'Asthma Consultation',
      doctor: 'Dr. Priya Singh',
    },
    {
      id: 'enc-4',
      date: '10 Apr 2026',
      department: 'Emergency',
      reason: 'Breathing Difficulty',
      doctor: 'Dr. Suresh Mehta',
    },
  ],
  recentReports: [
    {
      id: 'rep-1',
      date: '12 Sep 2026',
      reportType: 'Blood Test',
      findings: 'HbA1c: 7.2% ↑',
      isAbnormal: true,
    },
    {
      id: 'rep-2',
      date: '05 Aug 2026',
      reportType: 'ECG',
      findings: 'Normal',
      isAbnormal: false,
    },
    {
      id: 'rep-3',
      date: '18 Jun 2026',
      reportType: 'Chest X-Ray',
      findings: 'Mild hyperinflation',
      isAbnormal: false,
    },
    {
      id: 'rep-4',
      date: '10 Apr 2026',
      reportType: 'Blood Test',
      findings: 'Normal',
      isAbnormal: false,
    },
  ],
  accessLogs: [
    {
      id: 'log-1',
      accessor: 'You accessed this record',
      timestamp: '16 Sep 2026, 10:24 AM',
      accessType: 'Current',
    },
    {
      id: 'log-2',
      accessor: 'Dr. Sarah Khan',
      timestamp: '12 Sep 2026, 08:15 PM',
      accessType: 'Emergency',
    },
    {
      id: 'log-3',
      accessor: 'ER Department',
      timestamp: '10 Apr 2026, 11:30 AM',
      accessType: 'Emergency',
    },
    {
      id: 'log-4',
      accessor: 'Dr. Amit Kumar',
      timestamp: '05 Aug 2026, 02:20 PM',
      accessType: 'Consultation',
    },
  ],
};
