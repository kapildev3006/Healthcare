import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';
import '../../app/theme/app_radius.dart';
import '../../app/theme/app_spacing.dart';
import '../../app/theme/app_typography.dart';

enum StatusBadgeVariant { neutral, info, success, warning, critical, emergency }

/// Standardized Semantic Status Badge / Chip.
/// Used for consent state, report analysis state, and emergency indicators.
class StatusBadge extends StatelessWidget {
  final String label;
  final StatusBadgeVariant variant;
  final IconData? icon;
  final bool showDot;

  const StatusBadge({
    super.key,
    required this.label,
    this.variant = StatusBadgeVariant.neutral,
    this.icon,
    this.showDot = false,
  });

  // Pre-configured helper constructors for common healthcare scenarios
  factory StatusBadge.approved({String label = 'Approved'}) => StatusBadge(
    label: label,
    variant: StatusBadgeVariant.success,
    icon: Icons.check_circle_outline,
  );

  factory StatusBadge.pending({String label = 'Pending'}) => StatusBadge(
    label: label,
    variant: StatusBadgeVariant.warning,
    icon: Icons.schedule,
  );

  factory StatusBadge.warning({String label = 'Warning'}) => StatusBadge(
    label: label,
    variant: StatusBadgeVariant.warning,
    icon: Icons.warning_amber_rounded,
  );

  factory StatusBadge.revoked({String label = 'Revoked'}) => StatusBadge(
    label: label,
    variant: StatusBadgeVariant.neutral,
    icon: Icons.block,
  );

  factory StatusBadge.emergency({String label = 'Emergency Access'}) =>
      StatusBadge(
        label: label,
        variant: StatusBadgeVariant.emergency,
        icon: Icons.emergency,
      );

  factory StatusBadge.aiReview({String label = 'AI Review'}) => StatusBadge(
    label: label,
    variant: StatusBadgeVariant.info,
    icon: Icons.auto_awesome,
  );

  @override
  Widget build(BuildContext context) {
    Color backgroundColor;
    Color textColor;
    Color borderColor;
    Color dotColor;

    switch (variant) {
      case StatusBadgeVariant.neutral:
        backgroundColor = AppColors.neutralLight;
        textColor = AppColors.textSecondary;
        borderColor = AppColors.neutralBorder;
        dotColor = AppColors.neutral;
        break;
      case StatusBadgeVariant.info:
        backgroundColor = AppColors.infoLight;
        textColor = AppColors.info;
        borderColor = AppColors.infoBorder;
        dotColor = AppColors.info;
        break;
      case StatusBadgeVariant.success:
        backgroundColor = AppColors.successLight;
        textColor = AppColors.success;
        borderColor = AppColors.successBorder;
        dotColor = AppColors.success;
        break;
      case StatusBadgeVariant.warning:
        backgroundColor = AppColors.warningLight;
        textColor = AppColors.warning;
        borderColor = AppColors.warningBorder;
        dotColor = AppColors.warning;
        break;
      case StatusBadgeVariant.critical:
        backgroundColor = AppColors.criticalContainer;
        textColor = AppColors.critical;
        borderColor = AppColors.emergencyBorder;
        dotColor = AppColors.critical;
        break;
      case StatusBadgeVariant.emergency:
        backgroundColor = AppColors.emergencyLight;
        textColor = AppColors.emergency;
        borderColor = AppColors.emergencyBorder;
        dotColor = AppColors.emergency;
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm + 2,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: AppRadius.roundedFull,
        border: Border.all(color: borderColor, width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (showDot) ...[
            Container(
              width: 6,
              height: 6,
              decoration: BoxDecoration(
                color: dotColor,
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 5),
          ],
          if (icon != null) ...[
            Icon(icon, size: 13, color: textColor),
            const SizedBox(width: 4),
          ],
          Text(
            label,
            style: AppTypography.labelSmall.copyWith(
              color: textColor,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
