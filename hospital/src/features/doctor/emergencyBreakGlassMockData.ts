import { RecentEmergencyAccessItem } from './emergencyBreakGlassTypes';

export const mockRecentEmergencyAccesses: RecentEmergencyAccessItem[] = [
  {
    id: 'bg-1',
    patientName: 'Rahul Kumar',
    patientUhid: 'MLK00456',
    initials: 'RK',
    reason: 'Unconscious patient in ER',
    accessScope: 'Critical Info Only',
    requestedOn: '15 Sep 2026, 02:15 PM',
    duration: '4 hours',
    status: 'Completed',
    accessorName: 'Dr. Kapil Dev',
    accessorRole: 'General Physician',
    clinicalNotes:
      'Patient arrived unresponsive via ambulance with acute hypotensive collapse. Immediate access authorized to verify allergy profile and cardiac history.',
  },
  {
    id: 'bg-2',
    patientName: 'Sneha Gupta',
    patientUhid: 'MLK01011',
    initials: 'SG',
    reason: 'Road traffic accident',
    accessScope: 'Critical Info Only',
    requestedOn: '10 Sep 2026, 11:40 AM',
    duration: '4 hours',
    status: 'Completed',
    accessorName: 'Dr. Kapil Dev',
    accessorRole: 'General Physician',
    clinicalNotes:
      'Polytrauma secondary to motor vehicle collision with Glasgow Coma Scale (GCS) score 8. Emergency access utilized to check baseline medications.',
  },
  {
    id: 'bg-3',
    patientName: 'Neha Tiwari',
    patientUhid: 'MLK01321',
    initials: 'NT',
    reason: 'Severe breathing difficulty',
    accessScope: 'Full Medical Record',
    requestedOn: '05 Sep 2026, 09:30 PM',
    duration: '8 hours',
    status: 'Completed',
    accessorName: 'Dr. Kapil Dev',
    accessorRole: 'General Physician',
    clinicalNotes:
      'Status asthmaticus with acute respiratory distress and severe hypoxia. Full records reviewed to check recent steroid regimens and spirometry history.',
  },
  {
    id: 'bg-4',
    patientName: 'Amit Rao',
    patientUhid: 'MLK01234',
    initials: 'AR',
    reason: 'Cardiac emergency',
    accessScope: 'Critical Info Only',
    requestedOn: '28 Aug 2026, 07:20 PM',
    duration: '4 hours',
    status: 'Completed',
    accessorName: 'Dr. Kapil Dev',
    accessorRole: 'General Physician',
    clinicalNotes:
      'ST-elevation myocardial infarction (STEMI) protocol. Urgent confirmation of anticoagulation therapy and antiplatelet contraindications.',
  },
  {
    id: 'bg-5',
    patientName: 'Vikram Singh',
    patientUhid: 'MLK00901',
    initials: 'VK',
    reason: 'Unconscious patient',
    accessScope: 'Critical Info Only',
    requestedOn: '18 Aug 2026, 01:10 PM',
    duration: '4 hours',
    status: 'Expired',
    accessorName: 'Dr. Kapil Dev',
    accessorRole: 'General Physician',
    clinicalNotes:
      'Hypoglycemic coma in elderly diabetic individual found unresponsive at home. Emergency override closed following glycemic stabilization.',
  },
];

export const emergencyReasonsList = [
  'Unconscious patient in ER',
  'Road traffic accident / Severe trauma',
  'Severe breathing difficulty / Acute respiratory failure',
  'Cardiac emergency / Cardiac arrest',
  'Unconscious patient - Unknown etiology',
  'Inability to communicate / Severe confusion',
  'Anaphylactic shock / Acute severe allergic reaction',
];
