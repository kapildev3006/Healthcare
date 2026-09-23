import 'package:flutter/material.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';

/// Row of 4 quick action shortcuts: Upload Report, Access Requests,
/// Medical Profile, and Emergency.
class QuickActionsRow extends StatelessWidget {
  final VoidCallback? onUploadReportTap;
  final VoidCallback? onAccessRequestsTap;
  final VoidCallback? onMedicalProfileTap;
  final VoidCallback? onEmergencyTap;

  const QuickActionsRow({
    super.key,
    this.onUploadReportTap,
    this.onAccessRequestsTap,
    this.onMedicalProfileTap,
    this.onEmergencyTap,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: _QuickActionCard(
            label: 'Upload\nReport',
            icon: Icons.cloud_upload_rounded,
            iconColor: const Color(0xFF0284C7),
            backgroundColor: const Color(0xFFE0F2FE),
            onTap: onUploadReportTap,
          ),
        ),
        const SizedBox(width: AppSpacing.sm),
        Expanded(
          child: _QuickActionCard(
            label: 'Access\nRequests',
            icon: Icons.group_rounded,
            iconColor: const Color(0xFF9333EA),
            backgroundColor: const Color(0xFFF3E8FF),
            onTap: onAccessRequestsTap,
          ),
        ),
        const SizedBox(width: AppSpacing.sm),
        Expanded(
          child: _QuickActionCard(
            label: 'Medical\nProfile',
            icon: Icons.badge_rounded,
            iconColor: const Color(0xFF0D9488),
            backgroundColor: const Color(0xFFCCFBF1),
            onTap: onMedicalProfileTap,
          ),
        ),
        const SizedBox(width: AppSpacing.sm),
        Expanded(
          child: _QuickActionCard(
            label: 'Emergency',
            icon: Icons.crisis_alert_rounded,
            iconColor: const Color(0xFFEF4444),
            backgroundColor: const Color(0xFFFEE2E2),
            onTap: onEmergencyTap,
          ),
        ),
      ],
    );
  }
}

class _QuickActionCard extends StatelessWidget {
  final String label;
  final IconData icon;
  final Color iconColor;
  final Color backgroundColor;
  final VoidCallback? onTap;

  const _QuickActionCard({
    required this.label,
    required this.icon,
    required this.iconColor,
    required this.backgroundColor,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: AppColors.border, width: 1),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 4),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: backgroundColor,
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, size: 22, color: iconColor),
              ),
              const SizedBox(height: 8),
              SizedBox(
                height: 32,
                child: Text(
                  label,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                    height: 1.2,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
