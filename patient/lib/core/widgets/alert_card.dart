import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';
import '../../app/theme/app_radius.dart';
import '../../app/theme/app_spacing.dart';
import '../../app/theme/app_typography.dart';

enum AlertCardVariant { info, success, warning, critical, emergency }

/// Generic Clinical Alert / Banner Card.
/// Supports semantic variants, icons, custom messages, optional action, and dismiss.
class AlertCard extends StatelessWidget {
  final String title;
  final String message;
  final AlertCardVariant variant;
  final IconData? icon;
  final Widget? action;
  final VoidCallback? onDismiss;

  const AlertCard({
    super.key,
    required this.title,
    required this.message,
    this.variant = AlertCardVariant.info,
    this.icon,
    this.action,
    this.onDismiss,
  });

  @override
  Widget build(BuildContext context) {
    Color backgroundColor;
    Color borderColor;
    Color iconColor;
    Color titleColor;
    IconData defaultIcon;

    switch (variant) {
      case AlertCardVariant.info:
        backgroundColor = AppColors.infoLight;
        borderColor = AppColors.infoBorder;
        iconColor = AppColors.info;
        titleColor = AppColors.info;
        defaultIcon = Icons.info_outline;
        break;
      case AlertCardVariant.success:
        backgroundColor = AppColors.successLight;
        borderColor = AppColors.successBorder;
        iconColor = AppColors.success;
        titleColor = AppColors.success;
        defaultIcon = Icons.check_circle_outline;
        break;
      case AlertCardVariant.warning:
        backgroundColor = AppColors.warningLight;
        borderColor = AppColors.warningBorder;
        iconColor = AppColors.warning;
        titleColor = AppColors.warning;
        defaultIcon = Icons.warning_amber_rounded;
        break;
      case AlertCardVariant.critical:
        backgroundColor = AppColors.criticalContainer;
        borderColor = AppColors.emergencyBorder;
        iconColor = AppColors.critical;
        titleColor = AppColors.critical;
        defaultIcon = Icons.report_problem_outlined;
        break;
      case AlertCardVariant.emergency:
        backgroundColor = AppColors.emergencyLight;
        borderColor = AppColors.emergencyBorder;
        iconColor = AppColors.emergency;
        titleColor = AppColors.emergency;
        defaultIcon = Icons.emergency;
        break;
    }

    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: AppRadius.roundedLg,
        border: Border.all(color: borderColor, width: 1.2),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon ?? defaultIcon, color: iconColor, size: 22),
          const SizedBox(width: AppSpacing.sm + 4),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  title,
                  style: AppTypography.titleMedium.copyWith(
                    color: titleColor,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  message,
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.textPrimary,
                    height: 1.4,
                  ),
                ),
                if (action != null) ...[
                  const SizedBox(height: AppSpacing.sm),
                  action!,
                ],
              ],
            ),
          ),
          if (onDismiss != null) ...[
            const SizedBox(width: AppSpacing.xs),
            InkWell(
              onTap: onDismiss,
              borderRadius: AppRadius.roundedFull,
              child: Padding(
                padding: const EdgeInsets.all(2.0),
                child: Icon(
                  Icons.close,
                  size: 18,
                  color: AppColors.textSecondary,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
