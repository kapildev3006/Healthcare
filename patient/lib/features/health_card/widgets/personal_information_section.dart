import 'package:flutter/material.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';
import '../models/health_card_data.dart';

/// Personal Information card containing patient demographic and identity metadata
/// with an Edit action button.
class PersonalInformationSection extends StatelessWidget {
  final HealthCardDetails card;
  final VoidCallback? onEditTap;

  const PersonalInformationSection({
    super.key,
    required this.card,
    this.onEditTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.border, width: 1),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Section header with title and Edit button
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Personal Information',
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                  letterSpacing: -0.2,
                ),
              ),
              Material(
                color: const Color(0xFFEBF5FF),
                borderRadius: BorderRadius.circular(16),
                child: InkWell(
                  borderRadius: BorderRadius.circular(16),
                  onTap: onEditTap,
                  child: const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 14, vertical: 4),
                    child: Text(
                      'Edit',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF1D4ED8),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.md),

          // Information rows
          _InfoRow(
            icon: Icons.person_outline_rounded,
            label: 'Full Name',
            value: card.fullName,
          ),
          const _RowDivider(),
          _InfoRow(
            icon: Icons.calendar_today_outlined,
            label: 'Date of Birth',
            value: card.dob,
          ),
          const _RowDivider(),
          _InfoRow(
            icon: Icons.male_rounded,
            label: 'Gender',
            value: card.gender,
          ),
          const _RowDivider(),
          _InfoRow(
            icon: Icons.badge_outlined,
            label: 'Health ID',
            value: card.healthId,
          ),
          const _RowDivider(),
          _InfoRow(
            icon: Icons.verified_user_outlined,
            label: 'Verification Status',
            customValueWidget: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: const Color(0xFFDCFCE7),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text(
                'Verified',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF15803D),
                ),
              ),
            ),
          ),
          const _RowDivider(),
          _InfoRow(
            icon: Icons.event_available_outlined,
            label: 'Issued On',
            value: card.issuedOn,
          ),
        ],
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String? value;
  final Widget? customValueWidget;

  const _InfoRow({
    required this.icon,
    required this.label,
    this.value,
    this.customValueWidget,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 7),
      child: Row(
        children: [
          Icon(icon, size: 18, color: AppColors.textSecondary),
          const SizedBox(width: 10),
          Text(
            label,
            style: const TextStyle(
              fontSize: 12.5,
              fontWeight: FontWeight.w400,
              color: AppColors.textSecondary,
            ),
          ),
          const Spacer(),
          if (customValueWidget != null)
            customValueWidget!
          else if (value != null)
            Text(
              value!,
              style: const TextStyle(
                fontSize: 12.5,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
              ),
            ),
        ],
      ),
    );
  }
}

class _RowDivider extends StatelessWidget {
  const _RowDivider();

  @override
  Widget build(BuildContext context) {
    return const Divider(height: 1, thickness: 1, color: Color(0xFFF1F5F9));
  }
}
