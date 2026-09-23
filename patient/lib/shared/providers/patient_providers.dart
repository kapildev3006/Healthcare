import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/patient_models.dart';

// --- Profile Notifier ---
class ProfileNotifier extends StateNotifier<PatientProfile> {
  ProfileNotifier()
    : super(
        const PatientProfile(
          id: 'pat-kapil-001',
          name: 'Kapil Dev',
          email: 'kapil.dev@example.com',
          phone: '+91 98765 43210',
          dob: '30 Jun 2004',
          age: 22,
          gender: 'Male',
          healthId: 'AHC-26-84X71K',
          bloodGroup: 'O+',
          address: 'Sector 62, Noida, Uttar Pradesh, 201301',
          isVerified: true,
        ),
      );

  void updateProfile({
    String? name,
    String? email,
    String? phone,
    String? address,
  }) {
    state = state.copyWith(
      name: name,
      email: email,
      phone: phone,
      address: address,
    );
  }
}

final patientProfileProvider =
    StateNotifierProvider<ProfileNotifier, PatientProfile>(
      (ref) => ProfileNotifier(),
    );

// --- Allergies Provider ---
final patientAllergiesProvider = StateProvider<List<PatientAllergy>>((ref) {
  return const [
    PatientAllergy(
      id: 'alg-1',
      allergen: 'Penicillin',
      severity: 'Severe',
      reaction: 'Severe skin rash, respiratory tightness (Anaphylaxis risk)',
    ),
    PatientAllergy(
      id: 'alg-2',
      allergen: 'Dust & Pollen',
      severity: 'Moderate',
      reaction: 'Allergic rhinitis, sneezing, nasal congestion',
    ),
  ];
});

// --- Chronic Conditions Provider ---
final chronicConditionsProvider = StateProvider<List<ChronicCondition>>((ref) {
  return const [
    ChronicCondition(
      id: 'cond-1',
      name: 'Bronchial Asthma',
      diagnosedYear: '2021',
      status: 'Active (Managed with inhaler)',
    ),
  ];
});
final patientConditionsProvider = chronicConditionsProvider;

// --- Current Medications Provider ---
final currentMedicationsProvider = StateProvider<List<PatientMedication>>((
  ref,
) {
  return const [
    PatientMedication(
      id: 'med-1',
      name: 'Salbutamol Inhaler (Asthalin)',
      dosage: '100 mcg',
      frequency: 'As needed (SOS)',
      instructions: '1-2 puffs during breathing difficulty or exercise',
      isActive: true,
      isSos: true,
    ),
    PatientMedication(
      id: 'med-2',
      name: 'Vitamin D3 (Cholecalciferol)',
      dosage: '60,000 IU',
      frequency: 'Once weekly',
      instructions: 'Take after meals with warm milk or water',
      isActive: true,
      isSos: false,
    ),
    PatientMedication(
      id: 'med-3',
      name: 'Montelukast Sodium',
      dosage: '10 mg',
      frequency: 'Once daily at bedtime',
      instructions: 'For allergic rhinitis and asthma prophylaxis',
      isActive: true,
      isSos: false,
    ),
  ];
});
final patientMedicationsProvider = currentMedicationsProvider;

// --- Emergency Contacts Provider ---
final emergencyContactsProvider = StateProvider<List<EmergencyContact>>((ref) {
  return const [
    EmergencyContact(
      id: 'emg-1',
      name: 'Neha Verma',
      relation: 'Sister',
      phone: '+91 98765 43210',
      email: 'neha.verma@example.com',
      address: 'Noida, Uttar Pradesh',
      isPrimary: true,
    ),
    EmergencyContact(
      id: 'emg-2',
      name: 'Rajesh Verma',
      relation: 'Father',
      phone: '+91 98765 67890',
      email: 'rajesh.verma@example.com',
      address: 'Ghaziabad, Uttar Pradesh',
      isPrimary: false,
    ),
  ];
});

// --- Insurance Provider ---
final insurancePolicyProvider = StateProvider<InsurancePolicy>((ref) {
  return const InsurancePolicy(
    id: 'ins-001',
    providerName: 'Star Health Insurance',
    planName: 'Family Health Optima',
    policyNumber: 'SHI12345678',
    policyHolder: 'Kapil Dev',
    validTill: '31 Dec 2036',
    sumInsured: '₹5,00,000',
    isActive: true,
  );
});

// --- Health Records Notifier ---
class HealthRecordsNotifier extends StateNotifier<List<HealthRecord>> {
  HealthRecordsNotifier()
    : super(const [
        HealthRecord(
          id: 'rec-1',
          title: 'Complete Blood Count (CBC)',
          facilityName: 'Apollo Diagnostics',
          date: '12 Sep 2026',
          category: RecordCategory.labTests,
          fileSize: '1.2 MB',
          doctorName: 'Dr. Rahul Mehta',
        ),
        HealthRecord(
          id: 'rec-2',
          title: 'Prescription - Montelukast 10 mg',
          facilityName: 'Max Super Speciality Hospital',
          date: '05 Sep 2026',
          category: RecordCategory.prescriptions,
          fileSize: '450 KB',
          doctorName: 'Dr. Ananya Singh',
        ),
        HealthRecord(
          id: 'rec-3',
          title: 'Chest X-Ray',
          facilityName: 'Max Super Speciality Hospital',
          date: '28 Aug 2026',
          category: RecordCategory.imaging,
          fileSize: '2.4 MB',
          hasAiAnalysis: true,
          aiConfidence: '96%',
          doctorName: 'Dr. Rahul Mehta',
        ),
        HealthRecord(
          id: 'rec-4',
          title: 'Discharge Summary',
          facilityName: 'City General Hospital, Noida',
          date: '14 Aug 2026',
          category: RecordCategory.documents,
          fileSize: '3.1 MB',
          doctorName: 'Dr. Priya Sharma',
        ),
        HealthRecord(
          id: 'rec-5',
          title: 'COVID-19 Vaccination Certificate',
          facilityName: 'Ministry of Health & Family Welfare',
          date: '10 Jan 2024',
          category: RecordCategory.vaccinations,
          fileSize: '820 KB',
        ),
      ]);

  void addRecord(HealthRecord record) {
    state = [record, ...state];
  }
}

final healthRecordsProvider =
    StateNotifierProvider<HealthRecordsNotifier, List<HealthRecord>>(
      (ref) => HealthRecordsNotifier(),
    );

// --- Access Requests Notifier ---
class AccessRequestsNotifier extends StateNotifier<List<AccessRequestItem>> {
  AccessRequestsNotifier()
    : super(const [
        AccessRequestItem(
          id: 'req-1',
          doctorName: 'Dr. Priya Sharma',
          specialty: 'Pulmonologist',
          hospitalName: 'City Care Hospitals, Noida',
          timestamp: '2 hours ago',
          requestedScope: 'Chest X-Ray Report - For consultation and diagnosis',
          durationDays: 30,
          status: AccessRequestStatus.pending,
        ),
        AccessRequestItem(
          id: 'req-2',
          doctorName: 'Dr. Rohan Mehta',
          specialty: 'General Physician',
          hospitalName: 'Apollo Clinic, Ghaziabad',
          timestamp: '1 day ago',
          requestedScope: 'All Medical Records - For general health review',
          durationDays: 15,
          status: AccessRequestStatus.pending,
        ),
        AccessRequestItem(
          id: 'req-3',
          doctorName: 'Metro Diagnostics',
          specialty: 'Diagnostic Center',
          hospitalName: 'Sector 62, Noida',
          timestamp: '2 days ago',
          requestedScope: 'Chest X-Ray Report - For follow-up analysis',
          durationDays: 7,
          status: AccessRequestStatus.pending,
        ),
        AccessRequestItem(
          id: 'req-4',
          doctorName: 'Dr. Ananya Singh',
          specialty: 'Internal Medicine',
          hospitalName: 'Apollo Hospital',
          timestamp: '12 Sep 2026',
          requestedScope: 'Lab Reports & Prescriptions',
          durationDays: 30,
          status: AccessRequestStatus.approved,
        ),
        AccessRequestItem(
          id: 'req-5',
          doctorName: 'Max Super Speciality Hospital',
          specialty: 'Hospital Network',
          hospitalName: 'Saket, New Delhi',
          timestamp: '28 Aug 2026',
          requestedScope: 'Longitudinal Medical History',
          durationDays: 60,
          status: AccessRequestStatus.approved,
        ),
        AccessRequestItem(
          id: 'req-6',
          doctorName: 'Fortis Health Clinic',
          specialty: 'General Practice',
          hospitalName: 'Sector 50, Noida',
          timestamp: '15 Jul 2026',
          requestedScope: 'Complete Medical File',
          durationDays: 14,
          status: AccessRequestStatus.denied,
        ),
      ]);

  void approve(String id) {
    state = [
      for (final req in state)
        if (req.id == id)
          req.copyWith(status: AccessRequestStatus.approved)
        else
          req,
    ];
  }

  void approveRequest(String id) => approve(id);

  void deny(String id) {
    state = [
      for (final req in state)
        if (req.id == id)
          req.copyWith(status: AccessRequestStatus.denied)
        else
          req,
    ];
  }

  void denyRequest(String id) => deny(id);

  void revoke(String id) {
    state = [
      for (final req in state)
        if (req.id == id)
          req.copyWith(status: AccessRequestStatus.revoked)
        else
          req,
    ];
  }

  void revokeAccess(String id) => revoke(id);
}

final accessRequestsProvider =
    StateNotifierProvider<AccessRequestsNotifier, List<AccessRequestItem>>(
      (ref) => AccessRequestsNotifier(),
    );

// --- Emergency Access Sessions Notifier ---
class EmergencyAccessNotifier
    extends StateNotifier<List<EmergencyAccessSession>> {
  EmergencyAccessNotifier()
    : super(const [
        EmergencyAccessSession(
          id: 'emg-session-1',
          doctorName: 'Dr. Rohan Mehta',
          specialty: 'Emergency Physician',
          clinicName: 'Apollo Clinic, Noida',
          grantedTime: '16 Sep 2026, 07:24 PM',
          validTill: '17 Sep 2026, 07:24 PM (24 hours)',
          reason:
              'Patient brought to ER with severe chest pain. Immediate access required to evaluate medical history and allergies.',
          isActive: true,
        ),
      ]);

  void revoke(String id) {
    state = [
      for (final s in state)
        if (s.id == id) s.copyWith(isActive: false) else s,
    ];
  }
}

final emergencyAccessProvider =
    StateNotifierProvider<
      EmergencyAccessNotifier,
      List<EmergencyAccessSession>
    >((ref) => EmergencyAccessNotifier());

// --- Appointments Provider ---
final appointmentsProvider = StateProvider<List<AppointmentItem>>((ref) {
  return const [
    AppointmentItem(
      id: 'apt-1',
      doctorName: 'Dr. Rahul Mehta',
      specialty: 'Internal Medicine Specialist',
      hospitalName: 'Max Super Speciality Hospital',
      date: '25 Sep 2026',
      time: '10:30 AM',
      status: 'Upcoming',
    ),
    AppointmentItem(
      id: 'apt-2',
      doctorName: 'Dr. Priya Sharma',
      specialty: 'Pulmonologist',
      hospitalName: 'City Care Hospital',
      date: '12 Sep 2026',
      time: '04:00 PM',
      status: 'Completed',
    ),
  ];
});

// --- Settings State Model & Notifier ---
class PatientSettings {
  final String appearance; // 'Light', 'Dark', 'System'
  final String language; // 'English', 'Hindi'
  final String units; // 'Metric (kg, cm)', 'Imperial (lbs, in)'
  final bool pushNotifications;
  final bool emailNotifications;
  final bool smsAlerts;
  final bool quietHours;
  final bool biometricAuth;
  final bool appLock;

  const PatientSettings({
    this.appearance = 'Light',
    this.language = 'English',
    this.units = 'Metric (kg, cm)',
    this.pushNotifications = true,
    this.emailNotifications = true,
    this.smsAlerts = true,
    this.quietHours = false,
    this.biometricAuth = true,
    this.appLock = true,
  });

  PatientSettings copyWith({
    String? appearance,
    String? language,
    String? units,
    bool? pushNotifications,
    bool? emailNotifications,
    bool? smsAlerts,
    bool? quietHours,
    bool? biometricAuth,
    bool? appLock,
  }) {
    return PatientSettings(
      appearance: appearance ?? this.appearance,
      language: language ?? this.language,
      units: units ?? this.units,
      pushNotifications: pushNotifications ?? this.pushNotifications,
      emailNotifications: emailNotifications ?? this.emailNotifications,
      smsAlerts: smsAlerts ?? this.smsAlerts,
      quietHours: quietHours ?? this.quietHours,
      biometricAuth: biometricAuth ?? this.biometricAuth,
      appLock: appLock ?? this.appLock,
    );
  }

  String get themeMode => appearance;
  bool get biometricsEnabled => biometricAuth;
  bool get accessRequestNotif => pushNotifications;
  bool get aiCompletedNotif => pushNotifications;
  bool get appointmentReminders => pushNotifications;
}

class SettingsNotifier extends StateNotifier<PatientSettings> {
  SettingsNotifier() : super(const PatientSettings());

  void setAppearance(String mode) => state = state.copyWith(appearance: mode);
  void setLanguage(String lang) => state = state.copyWith(language: lang);
  void setUnits(String units) => state = state.copyWith(units: units);
  void togglePush(bool val) => state = state.copyWith(pushNotifications: val);
  void toggleEmail(bool val) => state = state.copyWith(emailNotifications: val);
  void toggleSms(bool val) => state = state.copyWith(smsAlerts: val);
  void toggleQuietHours(bool val) => state = state.copyWith(quietHours: val);
  void toggleBiometrics(bool val) => state = state.copyWith(biometricAuth: val);
  void toggleAppLock(bool val) => state = state.copyWith(appLock: val);

  void update({
    String? theme,
    String? language,
    bool? biometrics,
    bool? accessRequest,
    bool? aiCompleted,
    bool? appointmentReminders,
  }) {
    state = state.copyWith(
      appearance: theme,
      language: language,
      biometricAuth: biometrics,
      pushNotifications: accessRequest ?? aiCompleted ?? appointmentReminders,
    );
  }
}

final patientSettingsProvider =
    StateNotifierProvider<SettingsNotifier, PatientSettings>(
      (ref) => SettingsNotifier(),
    );
