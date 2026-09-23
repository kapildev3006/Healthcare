/// Strongly-typed models for the Patient Home Dashboard.
/// Uses centralized mock data fixtures for offline/mock development.
class PatientProfileSummary {
  final String patientName;
  final String greetingSubtitle;
  final String avatarAsset;
  final int unreadNotificationsCount;
  final String healthId;
  final bool isVerified;
  final String digitalCardSubtitle;
  final String qrPayload;
  final String bloodGroup;
  final int allergiesCount;
  final String allergiesSubtitle;
  final int conditionsCount;
  final String conditionsSubtitle;
  final String emergencyContactRelation;
  final String emergencyContactPhone;

  const PatientProfileSummary({
    required this.patientName,
    required this.greetingSubtitle,
    required this.avatarAsset,
    required this.unreadNotificationsCount,
    required this.healthId,
    required this.isVerified,
    required this.digitalCardSubtitle,
    required this.qrPayload,
    required this.bloodGroup,
    required this.allergiesCount,
    required this.allergiesSubtitle,
    required this.conditionsCount,
    required this.conditionsSubtitle,
    required this.emergencyContactRelation,
    required this.emergencyContactPhone,
  });
}

class PendingAccessRequest {
  final String hospitalName;
  final String requesterDoctor;
  final String timeAgo;
  final String message;

  const PendingAccessRequest({
    required this.hospitalName,
    required this.requesterDoctor,
    required this.timeAgo,
    required this.message,
  });
}

class RecentMedicalActivity {
  final String hospitalName;
  final String encounterType;
  final String doctorName;
  final String date;
  final String categoryTag;

  const RecentMedicalActivity({
    required this.hospitalName,
    required this.encounterType,
    required this.doctorName,
    required this.date,
    required this.categoryTag,
  });
}

class LatestReportSummary {
  final String title;
  final String date;
  final String status;
  final String thumbnailAsset;

  const LatestReportSummary({
    required this.title,
    required this.date,
    required this.status,
    required this.thumbnailAsset,
  });
}

class EmergencyAccessStatus {
  final bool hasRecentAccess;
  final String title;
  final String description;

  const EmergencyAccessStatus({
    required this.hasRecentAccess,
    required this.title,
    required this.description,
  });
}

/// Aggregate data model for the entire Patient Home Dashboard.
class PatientHomeData {
  final PatientProfileSummary profile;
  final PendingAccessRequest pendingAccess;
  final RecentMedicalActivity recentActivity;
  final LatestReportSummary latestReport;
  final EmergencyAccessStatus emergencyStatus;

  const PatientHomeData({
    required this.profile,
    required this.pendingAccess,
    required this.recentActivity,
    required this.latestReport,
    required this.emergencyStatus,
  });
}

/// Centralized typed mock fixture matching the visual source of truth
/// at design-references/patient/home.png.
const kMockPatientHomeData = PatientHomeData(
  profile: PatientProfileSummary(
    patientName: 'Kapil Dev',
    greetingSubtitle: 'Good to see you again!',
    avatarAsset: 'assets/images/demo_avatar.png',
    unreadNotificationsCount: 3,
    healthId: 'AHC-26-84X71K',
    isVerified: true,
    digitalCardSubtitle: 'Healthier You,\nBrighter Tomorrow',
    qrPayload: 'aihealthcare://emergency/demo/AHC-26-84X71K',
    bloodGroup: 'O+',
    allergiesCount: 2,
    allergiesSubtitle: 'Listed',
    conditionsCount: 1,
    conditionsSubtitle: 'Active',
    emergencyContactRelation: 'Spouse',
    emergencyContactPhone: '+91 98765 43210',
  ),
  pendingAccess: PendingAccessRequest(
    hospitalName: 'Metro General Hospital',
    requesterDoctor: 'Dr. Sarah Jenkins',
    timeAgo: '2 days ago',
    message: 'Dr. Sarah Jenkins has requested access to your medical records.',
  ),
  recentActivity: RecentMedicalActivity(
    hospitalName: 'Max Super Speciality Hospital',
    encounterType: 'General Checkup',
    doctorName: 'Dr. Rahul Mehta',
    date: '12 Sep 2024',
    categoryTag: 'Routine',
  ),
  latestReport: LatestReportSummary(
    title: 'Chest X-Ray',
    date: '5 Sep 2024',
    status: 'Normal',
    thumbnailAsset: 'assets/images/demo_chest_xray.png',
  ),
  emergencyStatus: EmergencyAccessStatus(
    hasRecentAccess: false,
    title: 'No Emergency Access Used',
    description: 'No emergency access has been recorded in the last 30 days.',
  ),
);
