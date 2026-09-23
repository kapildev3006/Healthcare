import 'package:flutter/material.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';
import '../models/patient_home_data.dart';

/// Critical Health Summary section showing Blood Group, Allergies,
/// Conditions, and Emergency Contact in responsive cards.
class CriticalHealthSummary extends StatelessWidget {
  final PatientProfileSummary profile;
  final VoidCallback? onHeaderTap;

  const CriticalHealthSummary({
    super.key,
    required this.profile,
    this.onHeaderTap,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Section Header
        InkWell(
          onTap: onHeaderTap,
          borderRadius: BorderRadius.circular(8),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(
              children: [
                Container(
                  width: 26,
                  height: 26,
                  decoration: const BoxDecoration(
                    color: Color(0xFFEF4444),
                    shape: BoxShape.circle,
                  ),
                  child: const Center(
                    child: Icon(
                      Icons.monitor_heart_rounded,
                      size: 15,
                      color: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(width: AppSpacing.sm),
                const Text(
                  'Critical Health Summary',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textPrimary,
                    letterSpacing: -0.2,
                  ),
                ),
                const Spacer(),
                const Icon(
                  Icons.chevron_right_rounded,
                  size: 20,
                  color: AppColors.textTertiary,
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: AppSpacing.sm),

        // 4 Horizontal metric cards
        Row(
          children: [
            // 1. Blood Group
            Expanded(
              child: _MetricCard(
                backgroundColor: const Color(0xFFFEF2F2),
                borderColor: const Color(0xFFFEE2E2),
                icon: Icons.water_drop_rounded,
                iconColor: const Color(0xFFEF4444),
                label: 'Blood Group',
                primaryValue: profile.bloodGroup,
                valueColor: const Color(0xFFEF4444),
                sublabel: null,
              ),
            ),
            const SizedBox(width: 6),

            // 2. Allergies
            Expanded(
              child: _MetricCard(
                backgroundColor: const Color(0xFFFFFBEB),
                borderColor: const Color(0xFFFEF3C7),
                icon: Icons.wb_sunny_rounded,
                iconColor: const Color(0xFFD97706),
                label: 'Allergies',
                primaryValue: profile.allergiesCount.toString(),
                valueColor: const Color(0xFFD97706),
                sublabel: profile.allergiesSubtitle,
                sublabelColor: const Color(0xFFB45309),
              ),
            ),
            const SizedBox(width: 6),

            // 3. Conditions
            Expanded(
              child: _MetricCard(
                backgroundColor: const Color(0xFFF0FDF4),
                borderColor: const Color(0xFFDCFCE7),
                icon: Icons.medication_rounded,
                iconColor: const Color(0xFF16A34A),
                label: 'Conditions',
                primaryValue: profile.conditionsCount.toString(),
                valueColor: const Color(0xFF16A34A),
                sublabel: profile.conditionsSubtitle,
                sublabelColor: const Color(0xFF15803D),
              ),
            ),
            const SizedBox(width: 6),

            // 4. Emergency Contact
            Expanded(
              child: _EmergencyContactCard(
                relation: profile.emergencyContactRelation,
                phone: profile.emergencyContactPhone,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _MetricCard extends StatelessWidget {
  final Color backgroundColor;
  final Color borderColor;
  final IconData icon;
  final Color iconColor;
  final String label;
  final String primaryValue;
  final Color valueColor;
  final String? sublabel;
  final Color? sublabelColor;

  const _MetricCard({
    required this.backgroundColor,
    required this.borderColor,
    required this.icon,
    required this.iconColor,
    required this.label,
    required this.primaryValue,
    required this.valueColor,
    this.sublabel,
    this.sublabelColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
      height: 98,
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: borderColor, width: 1),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 20, color: iconColor),
          const SizedBox(height: 4),
          Text(
            label,
            style: const TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w500,
              color: AppColors.textSecondary,
              height: 1.1,
            ),
            textAlign: TextAlign.center,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 2),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                primaryValue,
                style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w800,
                  color: valueColor,
                  height: 1.1,
                ),
              ),
              if (sublabel != null) ...[
                const SizedBox(width: 3),
                Text(
                  sublabel!,
                  style: TextStyle(
                    fontSize: 9,
                    fontWeight: FontWeight.w600,
                    color: sublabelColor ?? valueColor,
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }
}

class _EmergencyContactCard extends StatelessWidget {
  final String relation;
  final String phone;

  const _EmergencyContactCard({required this.relation, required this.phone});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      height: 98,
      decoration: BoxDecoration(
        color: const Color(0xFFF0F9FF),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFE0F2FE), width: 1),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.phone_rounded, size: 19, color: Color(0xFF0284C7)),
          const SizedBox(height: 3),
          const Text(
            'Emergency\nContact',
            style: TextStyle(
              fontSize: 8.5,
              fontWeight: FontWeight.w500,
              color: AppColors.textSecondary,
              height: 1.05,
            ),
            textAlign: TextAlign.center,
            maxLines: 2,
          ),
          const SizedBox(height: 1),
          Text(
            relation,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w700,
              color: AppColors.textPrimary,
              height: 1.1,
            ),
            textAlign: TextAlign.center,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 2),
          Text(
            phone,
            style: const TextStyle(
              fontSize: 8.5,
              fontWeight: FontWeight.w500,
              color: AppColors.textSecondary,
              height: 1.1,
            ),
            textAlign: TextAlign.center,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }
}
