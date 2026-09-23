import 'package:flutter/material.dart';

/// Centralized patient clinical profile model.
class PatientProfile {
  final String id;
  final String name;
  final String email;
  final String phone;
  final String dob;
  final int age;
  final String gender;
  final String healthId;
  final String bloodGroup;
  final String address;
  final bool isVerified;

  const PatientProfile({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.dob,
    required this.age,
    required this.gender,
    required this.healthId,
    required this.bloodGroup,
    required this.address,
    this.isVerified = true,
  });

  PatientProfile copyWith({
    String? name,
    String? email,
    String? phone,
    String? address,
  }) {
    return PatientProfile(
      id: id,
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      dob: dob,
      age: age,
      gender: gender,
      healthId: healthId,
      bloodGroup: bloodGroup,
      address: address ?? this.address,
      isVerified: isVerified,
    );
  }
}

/// Allergy item
class PatientAllergy {
  final String id;
  final String allergen;
  final String severity; // Mild, Moderate, Severe
  final String reaction;

  const PatientAllergy({
    required this.id,
    required this.allergen,
    required this.severity,
    required this.reaction,
  });

  String get name => allergen;
}

/// Chronic medical condition
class ChronicCondition {
  final String id;
  final String name;
  final String diagnosedYear;
  final String status; // Active, Managed

  const ChronicCondition({
    required this.id,
    required this.name,
    required this.diagnosedYear,
    required this.status,
  });

  String get diagnosedDate => 'Diagnosed in $diagnosedYear';
}

typedef PatientCondition = ChronicCondition;

/// Current medication item
class PatientMedication {
  final String id;
  final String name;
  final String dosage;
  final String frequency;
  final String instructions;
  final bool isActive;
  final bool isSos;

  const PatientMedication({
    required this.id,
    required this.name,
    required this.dosage,
    required this.frequency,
    required this.instructions,
    this.isActive = true,
    this.isSos = false,
  });
}

/// Emergency contact
class EmergencyContact {
  final String id;
  final String name;
  final String relation;
  final String phone;
  final String email;
  final String address;
  final bool isPrimary;

  const EmergencyContact({
    required this.id,
    required this.name,
    required this.relation,
    required this.phone,
    this.email = '',
    this.address = '',
    this.isPrimary = false,
  });

  String get relationship => relation;
}

/// Health Record Categories
enum RecordCategory {
  all,
  labTests,
  prescriptions,
  imaging,
  documents,
  vaccinations,
}

extension RecordCategoryExt on RecordCategory {
  String get displayName => label;

  String get label {
    switch (this) {
      case RecordCategory.all:
        return 'All';
      case RecordCategory.labTests:
        return 'Lab Tests';
      case RecordCategory.prescriptions:
        return 'Prescriptions';
      case RecordCategory.imaging:
        return 'Imaging';
      case RecordCategory.documents:
        return 'Documents';
      case RecordCategory.vaccinations:
        return 'Vaccinations';
    }
  }

  IconData get icon {
    switch (this) {
      case RecordCategory.all:
        return Icons.description_rounded;
      case RecordCategory.labTests:
        return Icons.science_rounded;
      case RecordCategory.prescriptions:
        return Icons.medication_rounded;
      case RecordCategory.imaging:
        return Icons.image_rounded;
      case RecordCategory.documents:
        return Icons.folder_shared_rounded;
      case RecordCategory.vaccinations:
        return Icons.vaccines_rounded;
    }
  }
}

/// Uploaded health record / report
class HealthRecord {
  final String id;
  final String title;
  final String facilityName;
  final String date;
  final RecordCategory category;
  final String fileSize;
  final bool hasAiAnalysis;
  final String? aiConfidence;
  final String? doctorName;

  const HealthRecord({
    required this.id,
    required this.title,
    required this.facilityName,
    required this.date,
    required this.category,
    required this.fileSize,
    this.hasAiAnalysis = false,
    this.aiConfidence,
    this.doctorName,
  });

  String get facility => facilityName;
  String get fileFormat => 'PDF';
}

/// Access Request Status
enum AccessRequestStatus { pending, approved, denied, revoked }

/// Incoming consent access request
class AccessRequestItem {
  final String id;
  final String doctorName;
  final String specialty;
  final String hospitalName;
  final String timestamp;
  final String requestedScope;
  final int durationDays;
  final AccessRequestStatus status;
  final String? doctorAvatar;

  const AccessRequestItem({
    required this.id,
    required this.doctorName,
    required this.specialty,
    required this.hospitalName,
    required this.timestamp,
    required this.requestedScope,
    required this.durationDays,
    required this.status,
    this.doctorAvatar,
  });

  AccessRequestItem copyWith({AccessRequestStatus? status}) {
    return AccessRequestItem(
      id: id,
      doctorName: doctorName,
      specialty: specialty,
      hospitalName: hospitalName,
      timestamp: timestamp,
      requestedScope: requestedScope,
      durationDays: durationDays,
      status: status ?? this.status,
      doctorAvatar: doctorAvatar,
    );
  }

  String get scope => requestedScope;
  String get expiryTime => '$durationDays days';
  String get purpose => 'OPD consultation & medical record evaluation';
}

/// Emergency break-glass access session
class EmergencyAccessSession {
  final String id;
  final String doctorName;
  final String specialty;
  final String clinicName;
  final String grantedTime;
  final String validTill;
  final String reason;
  final bool isActive;

  const EmergencyAccessSession({
    required this.id,
    required this.doctorName,
    required this.specialty,
    required this.clinicName,
    required this.grantedTime,
    required this.validTill,
    required this.reason,
    required this.isActive,
  });

  EmergencyAccessSession copyWith({bool? isActive}) {
    return EmergencyAccessSession(
      id: id,
      doctorName: doctorName,
      specialty: specialty,
      clinicName: clinicName,
      grantedTime: grantedTime,
      validTill: validTill,
      reason: reason,
      isActive: isActive ?? this.isActive,
    );
  }

  String get hospitalName => clinicName;
  String get timestamp => grantedTime;
}

/// Insurance policy
class InsurancePolicy {
  final String id;
  final String providerName;
  final String planName;
  final String policyNumber;
  final String policyHolder;
  final String validTill;
  final String sumInsured;
  final bool isActive;

  const InsurancePolicy({
    required this.id,
    required this.providerName,
    required this.planName,
    required this.policyNumber,
    required this.policyHolder,
    required this.validTill,
    required this.sumInsured,
    this.isActive = true,
  });

  String get policyName => planName;
  String get expiryDate => validTill;
  String get status => isActive ? 'Active' : 'Expired';
  String get remainingBalance => '₹8,45,000';
  String get tpaName => 'Medi Assist TPA Services';
}

/// Appointment item
class AppointmentItem {
  final String id;
  final String doctorName;
  final String specialty;
  final String hospitalName;
  final String date;
  final String time;
  final String status; // Upcoming, Completed, Cancelled

  const AppointmentItem({
    required this.id,
    required this.doctorName,
    required this.specialty,
    required this.hospitalName,
    required this.date,
    required this.time,
    required this.status,
  });

  bool get isUpcoming => status == 'Upcoming';
  String get hospital => hospitalName;
}
