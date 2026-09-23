import 'package:flutter/material.dart';
import '../models/medical_history_data.dart';
import 'encounter_card.dart';

/// Month-grouped section of the chronological medical timeline matching design-references/patient/medical-history.png.
class TimelineMonthSection extends StatelessWidget {
  final MonthTimelineGroup group;
  final bool isFirst;
  final bool isLast;
  final ValueChanged<MedicalEncounter> onEncounterTap;

  const TimelineMonthSection({
    super.key,
    required this.group,
    this.isFirst = false,
    this.isLast = false,
    required this.onEncounterTap,
  });

  @override
  Widget build(BuildContext context) {
    const railWidth = 32.0;
    const railColor = Color(0xFFD6E4F0);
    const dotColor = Color(0xFF0066F6);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // 1. Month Header Row with timeline node
        SizedBox(
          height: 36,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Rail node area
              SizedBox(
                width: railWidth,
                height: 36,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    // Vertical continuous rail line
                    Positioned(
                      top: isFirst ? 18 : 0,
                      bottom: 0,
                      width: 2,
                      child: Container(color: railColor),
                    ),
                    // Solid blue circular node
                    Container(
                      width: 10,
                      height: 10,
                      decoration: const BoxDecoration(
                        color: dotColor,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),

              // Month Badge Pill (e.g. "Sep 2026")
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 14,
                  vertical: 5,
                ),
                decoration: BoxDecoration(
                  color: const Color(0xFFE0F2FE),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Text(
                  group.displayMonth,
                  style: const TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF0369A1),
                  ),
                ),
              ),
            ],
          ),
        ),

        // 2. Encounter Cards in this month
        ...group.encounters.asMap().entries.map((entry) {
          final isLastEncounterInGroup =
              entry.key == group.encounters.length - 1;
          final encounter = entry.value;

          return IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Rail line alongside the card
                SizedBox(
                  width: railWidth,
                  child: Center(child: Container(width: 2, color: railColor)),
                ),
                const SizedBox(width: 8),

                // Encounter Card
                Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(
                      top: 8,
                      bottom: (isLast && isLastEncounterInGroup) ? 12 : 16,
                    ),
                    child: EncounterCard(
                      encounter: encounter,
                      onTap: () => onEncounterTap(encounter),
                    ),
                  ),
                ),
              ],
            ),
          );
        }),
      ],
    );
  }
}
