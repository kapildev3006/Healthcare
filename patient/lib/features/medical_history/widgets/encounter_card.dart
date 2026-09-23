import 'package:flutter/material.dart';
import '../models/medical_history_data.dart';

/// Medical encounter card matching design-references/patient/medical-history.png.
class EncounterCard extends StatelessWidget {
  final MedicalEncounter encounter;
  final VoidCallback onTap;

  const EncounterCard({
    super.key,
    required this.encounter,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    // Determine category visual styling (icon and container background)
    Color iconBgColor;
    Color iconColor;
    IconData iconData;

    switch (encounter.category) {
      case EncounterCategory.consultation:
        iconBgColor = const Color(0xFFE0F2FE); // Pale sky blue
        iconColor = const Color(0xFF0284C7); // Clinical blue
        iconData = Icons.domain_rounded; // Hospital building
        break;
      case EncounterCategory.test:
        if (encounter.title.toLowerCase().contains('x-ray')) {
          iconBgColor = const Color(0xFFF3E8FF); // Pale lavender
          iconColor = const Color(0xFF7E22CE); // Purple
          iconData = Icons.science_rounded; // Flask/chemistry
        } else {
          iconBgColor = const Color(0xFFDCFCE7); // Pale mint
          iconColor = const Color(0xFF16A34A); // Green
          iconData = Icons.description_rounded; // Document / test report
        }
        break;
      case EncounterCategory.emergency:
        iconBgColor = const Color(0xFFFFE4E6); // Pale rose
        iconColor = const Color(0xFFE11D48); // Red
        iconData = Icons.emergency_rounded; // Emergency beacon
        break;
      case EncounterCategory.procedure:
        iconBgColor = const Color(0xFFE0F2FE);
        iconColor = const Color(0xFF0284C7);
        iconData = Icons.medical_services_rounded;
        break;
    }

    // Subtitle text: e.g. "General Checkup • Dr. Rahul Mehta" or facility/doctor info
    final String subtitleText;
    if (encounter.doctorName != null && encounter.doctorName!.isNotEmpty) {
      subtitleText = '${encounter.title} • ${encounter.doctorName}';
    } else {
      subtitleText = encounter.facilityName;
    }

    // Main title: Facility or Test Title
    // In reference:
    // - For Consultation: Main Title = "Max Super Speciality Hospital", Subtitle = "General Checkup • Dr. Rahul Mehta"
    // - For Chest X-Ray: Main Title = "Chest X-Ray", Subtitle = "City Diagnostic Centre"
    // - For City General Hospital: Main Title = "City General Hospital", Subtitle = "Emergency Visit • Dr. Priya Sharma"
    // - For Blood Test: Main Title = "Blood Test (Complete Blood Count)", Subtitle = "LifeCare Pathology"
    final String cardHeaderTitle;
    final String cardHeaderSubtitle;

    if (encounter.category == EncounterCategory.test) {
      cardHeaderTitle = encounter.title;
      cardHeaderSubtitle = encounter.facilityName;
    } else {
      cardHeaderTitle = encounter.facilityName;
      cardHeaderSubtitle = subtitleText;
    }

    return Material(
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(color: Color(0xFFE8EEF5), width: 1),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Top section: Leading Icon, Header Details, Trailing Chevron
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Thematic icon container
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: iconBgColor,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    alignment: Alignment.center,
                    child: Icon(iconData, size: 24, color: iconColor),
                  ),
                  const SizedBox(width: 12),

                  // Middle text info
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Date
                        Text(
                          encounter.formattedDate,
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                            color: Color(0xFF64748B),
                          ),
                        ),
                        const SizedBox(height: 2),

                        // Title
                        Text(
                          cardHeaderTitle,
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                            color: Color(0xFF102A43),
                            letterSpacing: -0.2,
                          ),
                        ),
                        const SizedBox(height: 2),

                        // Subtitle
                        Text(
                          cardHeaderSubtitle,
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: Color(0xFF627D98),
                          ),
                        ),
                        const SizedBox(height: 6),

                        // Description
                        Text(
                          encounter.description,
                          style: const TextStyle(
                            fontSize: 12.5,
                            fontWeight: FontWeight.w400,
                            color: Color(0xFF475569),
                            height: 1.35,
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Trailing chevron
                  const Padding(
                    padding: EdgeInsets.only(left: 4, top: 4),
                    child: Icon(
                      Icons.chevron_right_rounded,
                      size: 20,
                      color: Color(0xFF94A3B8),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),

              // Bottom tag row (using Wrap for responsive resilience)
              Wrap(
                spacing: 8,
                runSpacing: 6,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  // 1. Category Tag
                  _buildCategoryTag(encounter.category, encounter.title),

                  // 2. Report Count Tag
                  _buildReportTag(encounter.reportCount),

                  // 3. Medication / Status Tag
                  _buildStatusTag(encounter.statusType),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCategoryTag(EncounterCategory category, String title) {
    Color bg;
    Color fg;

    switch (category) {
      case EncounterCategory.consultation:
        bg = const Color(0xFFE0F2FE);
        fg = const Color(0xFF0284C7);
        break;
      case EncounterCategory.test:
        if (title.toLowerCase().contains('x-ray')) {
          bg = const Color(0xFFF3E8FF);
          fg = const Color(0xFF7E22CE);
        } else {
          bg = const Color(0xFFDCFCE7);
          fg = const Color(0xFF16A34A);
        }
        break;
      case EncounterCategory.emergency:
        bg = const Color(0xFFFFE4E6);
        fg = const Color(0xFFE11D48);
        break;
      case EncounterCategory.procedure:
        bg = const Color(0xFFE0F2FE);
        fg = const Color(0xFF0284C7);
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        category.label,
        style: TextStyle(
          fontSize: 11.5,
          fontWeight: FontWeight.w700,
          color: fg,
        ),
      ),
    );
  }

  Widget _buildReportTag(int count) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(
            Icons.description_outlined,
            size: 13,
            color: Color(0xFF475569),
          ),
          const SizedBox(width: 4),
          Text(
            count == 1 ? '1 Report' : '$count Reports',
            style: const TextStyle(
              fontSize: 11.5,
              fontWeight: FontWeight.w600,
              color: Color(0xFF475569),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatusTag(EncounterStatusType status) {
    Color bg;
    Color fg;

    switch (status) {
      case EncounterStatusType.normal:
      case EncounterStatusType.noMedication:
      case EncounterStatusType.medicationPrescribed:
        bg = const Color(0xFFDCFCE7);
        fg = const Color(0xFF16A34A);
        break;
      case EncounterStatusType.completed:
        bg = const Color(0xFFE0F2FE);
        fg = const Color(0xFF0284C7);
        break;
      case EncounterStatusType.attention:
        bg = const Color(0xFFFEF3C7);
        fg = const Color(0xFFD97706);
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (status.icon != null) ...[
            Icon(status.icon, size: 13, color: fg),
            const SizedBox(width: 4),
          ],
          Text(
            status.label,
            style: TextStyle(
              fontSize: 11.5,
              fontWeight: FontWeight.w700,
              color: fg,
            ),
          ),
        ],
      ),
    );
  }
}
