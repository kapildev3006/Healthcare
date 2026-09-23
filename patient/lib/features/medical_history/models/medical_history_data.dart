import 'package:flutter/material.dart';

/// Encounter categories for medical history records.
enum EncounterCategory {
  consultation,
  test,
  emergency,
  procedure;

  String get label {
    switch (this) {
      case EncounterCategory.consultation:
        return 'Consultation';
      case EncounterCategory.test:
        return 'Test';
      case EncounterCategory.emergency:
        return 'Emergency';
      case EncounterCategory.procedure:
        return 'Procedure';
    }
  }
}

/// UI filter options for the category chips row.
enum HistoryFilterCategory {
  all,
  consultation,
  test,
  emergency,
  procedure;

  String get label {
    switch (this) {
      case HistoryFilterCategory.all:
        return 'All';
      case HistoryFilterCategory.consultation:
        return 'Consultations';
      case HistoryFilterCategory.test:
        return 'Tests';
      case HistoryFilterCategory.emergency:
        return 'Emergency';
      case HistoryFilterCategory.procedure:
        return 'Procedures';
    }
  }

  IconData? get icon {
    switch (this) {
      case HistoryFilterCategory.all:
        return null;
      case HistoryFilterCategory.consultation:
        return Icons.person_outline_rounded;
      case HistoryFilterCategory.test:
        return Icons.science_outlined;
      case HistoryFilterCategory.emergency:
        return Icons.emergency_outlined;
      case HistoryFilterCategory.procedure:
        return Icons.medical_services_outlined;
    }
  }
}

/// Semantic status for encounter outcome or medication status.
enum EncounterStatusType {
  normal,
  noMedication,
  medicationPrescribed,
  completed,
  attention;

  String get label {
    switch (this) {
      case EncounterStatusType.normal:
        return 'Normal';
      case EncounterStatusType.noMedication:
        return 'No new medications';
      case EncounterStatusType.medicationPrescribed:
        return 'Prescribed medications';
      case EncounterStatusType.completed:
        return 'Completed';
      case EncounterStatusType.attention:
        return 'Requires Attention';
    }
  }

  IconData? get icon {
    switch (this) {
      case EncounterStatusType.normal:
        return null;
      case EncounterStatusType.noMedication:
      case EncounterStatusType.medicationPrescribed:
        return Icons.medication_outlined;
      case EncounterStatusType.completed:
        return Icons.check_circle_outline_rounded;
      case EncounterStatusType.attention:
        return Icons.warning_amber_rounded;
    }
  }
}

/// Model representing a single patient medical encounter or diagnostic test.
class MedicalEncounter {
  final String id;
  final DateTime date;
  final String facilityName;
  final String title;
  final String? doctorName;
  final EncounterCategory category;
  final String description;
  final int reportCount;
  final EncounterStatusType statusType;

  const MedicalEncounter({
    required this.id,
    required this.date,
    required this.facilityName,
    required this.title,
    this.doctorName,
    required this.category,
    required this.description,
    required this.reportCount,
    required this.statusType,
  });

  static const List<String> _months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  /// Formatted date string (e.g. "12 Sep 2026")
  String get formattedDate =>
      '${date.day} ${_months[date.month - 1]} ${date.year}';

  /// Month and year grouping key (e.g. "Sep 2026")
  String get monthYearDisplay => '${_months[date.month - 1]} ${date.year}';
}

/// A month-grouped collection of medical encounters for timeline rendering.
class MonthTimelineGroup {
  final DateTime monthKey;
  final String displayMonth;
  final List<MedicalEncounter> encounters;

  const MonthTimelineGroup({
    required this.monthKey,
    required this.displayMonth,
    required this.encounters,
  });
}

/// Sorts encounters newest-first and dynamically groups them by month and year.
List<MonthTimelineGroup> groupEncountersByMonth(
  List<MedicalEncounter> encounters,
) {
  if (encounters.isEmpty) return [];

  final sorted = List<MedicalEncounter>.from(encounters)
    ..sort((a, b) => b.date.compareTo(a.date));

  final Map<String, MonthTimelineGroup> groups = {};

  for (final encounter in sorted) {
    final key = encounter.monthYearDisplay;
    if (!groups.containsKey(key)) {
      groups[key] = MonthTimelineGroup(
        monthKey: DateTime(encounter.date.year, encounter.date.month),
        displayMonth: key,
        encounters: [],
      );
    }
    groups[key]!.encounters.add(encounter);
  }

  return groups.values.toList();
}

/// Filters encounters locally by category and case-insensitive search term.
List<MedicalEncounter> filterEncounters({
  required List<MedicalEncounter> encounters,
  required HistoryFilterCategory category,
  required String searchQuery,
}) {
  return encounters.where((encounter) {
    // 1. Category check
    if (category != HistoryFilterCategory.all) {
      if (encounter.category.name != category.name) {
        return false;
      }
    }

    // 2. Search query check
    if (searchQuery.trim().isNotEmpty) {
      final query = searchQuery.toLowerCase().trim();
      final titleMatch = encounter.title.toLowerCase().contains(query);
      final facilityMatch = encounter.facilityName.toLowerCase().contains(
        query,
      );
      final doctorMatch =
          encounter.doctorName?.toLowerCase().contains(query) ?? false;
      final descMatch = encounter.description.toLowerCase().contains(query);

      if (!titleMatch && !facilityMatch && !doctorMatch && !descMatch) {
        return false;
      }
    }

    return true;
  }).toList();
}

/// Centralized synthetic mock dataset matching design-references/patient/medical-history.png.
final List<MedicalEncounter> kMockMedicalHistoryData = [
  MedicalEncounter(
    id: 'enc-sep-2026',
    date: DateTime(2026, 9, 12),
    facilityName: 'Max Super Speciality Hospital',
    title: 'General Checkup',
    doctorName: 'Dr. Rahul Mehta',
    category: EncounterCategory.consultation,
    description: 'Routine annual checkup. Overall health is stable.',
    reportCount: 2,
    statusType: EncounterStatusType.noMedication,
  ),
  MedicalEncounter(
    id: 'enc-aug-2026',
    date: DateTime(2026, 8, 5),
    facilityName: 'City Diagnostic Centre',
    title: 'Chest X-Ray',
    doctorName: null,
    category: EncounterCategory.test,
    description: 'Chest X-ray performed as part of respiratory evaluation.',
    reportCount: 1,
    statusType: EncounterStatusType.normal,
  ),
  MedicalEncounter(
    id: 'enc-jun-2026',
    date: DateTime(2026, 6, 18),
    facilityName: 'City General Hospital',
    title: 'Emergency Visit',
    doctorName: 'Dr. Priya Sharma',
    category: EncounterCategory.emergency,
    description: 'Visited for high fever. Treated and discharged.',
    reportCount: 3,
    statusType: EncounterStatusType.medicationPrescribed,
  ),
  MedicalEncounter(
    id: 'enc-may-2026',
    date: DateTime(2026, 5, 22),
    facilityName: 'LifeCare Pathology',
    title: 'Blood Test (Complete Blood Count)',
    doctorName: null,
    category: EncounterCategory.test,
    description: 'Routine blood test. All parameters within normal range.',
    reportCount: 1,
    statusType: EncounterStatusType.normal,
  ),
];
