// Strongly-typed models for the Patient Digital Health Card screen.
// Data is structured cleanly for future API integration and centralized
// in [kMockHealthCardData] for offline mock presentation.

class HealthCardDetails {
  final String fullName;
  final String initials;
  final String dob;
  final String gender;
  final String healthId;
  final bool isVerified;
  final String bloodGroup;
  final String issuedOn;
  final String qrPayload;
  final String brandTitle;
  final String cardType;
  final String tagline;

  const HealthCardDetails({
    required this.fullName,
    required this.initials,
    required this.dob,
    required this.gender,
    required this.healthId,
    required this.isVerified,
    required this.bloodGroup,
    required this.issuedOn,
    required this.qrPayload,
    this.brandTitle = 'AI-Healthcare',
    this.cardType = 'Digital Health Card',
    this.tagline = 'Your Health. Our Priority.',
  });
}

class AllergySummary {
  final String title;
  final String countText;
  final String details;

  const AllergySummary({
    this.title = 'Allergies',
    required this.countText,
    required this.details,
  });
}

class ConditionSummary {
  final String title;
  final String countText;
  final String details;

  const ConditionSummary({
    this.title = 'Medical Conditions',
    required this.countText,
    required this.details,
  });
}

class EmergencyContactSummary {
  final String label;
  final String relation;
  final String phoneNumber;

  const EmergencyContactSummary({
    this.label = 'Emergency Contact',
    required this.relation,
    required this.phoneNumber,
  });
}

class EmergencyNotice {
  final String title;
  final String description;

  const EmergencyNotice({
    this.title = 'Emergency Use Only',
    required this.description,
  });
}

/// Aggregate model for the Digital Health Card screen.
class HealthCardData {
  final HealthCardDetails card;
  final AllergySummary allergySummary;
  final ConditionSummary conditionSummary;
  final EmergencyContactSummary emergencyContact;
  final EmergencyNotice emergencyNotice;

  const HealthCardData({
    required this.card,
    required this.allergySummary,
    required this.conditionSummary,
    required this.emergencyContact,
    required this.emergencyNotice,
  });
}

/// Centralized typed mock fixture matching the visual source of truth
/// at design-references/patient/health-card.png.
const kMockHealthCardData = HealthCardData(
  card: HealthCardDetails(
    fullName: 'Kapil Dev',
    initials: 'KD',
    dob: '30 Jun 2004',
    gender: 'Male',
    healthId: 'AHC-26-84X71K',
    isVerified: true,
    bloodGroup: 'O+',
    issuedOn: '10 Jan 2026',
    qrPayload: 'aihealthcare://emergency/demo/AHC-26-84X71K',
  ),
  allergySummary: AllergySummary(
    countText: '2 Listed',
    details: 'Peanuts, Pollen',
  ),
  conditionSummary: ConditionSummary(
    countText: '1 Active',
    details: 'Asthma (Mild)',
  ),
  emergencyContact: EmergencyContactSummary(
    relation: 'Spouse',
    phoneNumber: '+91 98765 43210',
  ),
  emergencyNotice: EmergencyNotice(
    description:
        'This Health Card may be used by authorized healthcare professionals during a medical emergency when normal patient consent cannot reasonably be obtained.',
  ),
);
