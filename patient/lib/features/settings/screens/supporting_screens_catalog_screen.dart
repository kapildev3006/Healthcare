import 'package:flutter/material.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../core/dialogs/patient_dialogs.dart';

/// Interactive catalog providing instant access and audit for all 18 supporting/edge-case screens
/// defined in design-references/patient/optional-supporting-screens.png.
class SupportingScreensCatalogScreen extends StatelessWidget {
  const SupportingScreensCatalogScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final items = [
      _CatalogItem(
        index: 1,
        title: 'Password Reset Successful!',
        description: 'Confirmation shown after successful password reset flow.',
        icon: Icons.check_circle_outline_rounded,
        iconColor: const Color(0xFF16A34A),
        onTap: () => PatientDialogs.showPasswordResetSuccess(context),
      ),
      _CatalogItem(
        index: 2,
        title: 'Report Uploaded!',
        description: 'Success state after uploading a new medical document.',
        icon: Icons.description_rounded,
        iconColor: const Color(0xFF0284C7),
        onTap: () => PatientDialogs.showReportUploadSuccess(context),
      ),
      _CatalogItem(
        index: 3,
        title: 'Upload Failed',
        description: 'Error alert with retry button when upload fails.',
        icon: Icons.warning_rounded,
        iconColor: const Color(0xFFDC2626),
        onTap: () => PatientDialogs.showUploadFailed(context),
      ),
      _CatalogItem(
        index: 4,
        title: 'No Internet Connection',
        description: 'Network offline alert with retry button.',
        icon: Icons.wifi_off_rounded,
        iconColor: const Color(0xFFDC2626),
        onTap: () => PatientDialogs.showNoInternetConnection(context),
      ),
      _CatalogItem(
        index: 5,
        title: 'Session Expired',
        description: 'Security timeout prompt with login redirect.',
        icon: Icons.schedule_rounded,
        iconColor: const Color(0xFFDC2626),
        onTap: () => PatientDialogs.showSessionExpired(context),
      ),
      _CatalogItem(
        index: 6,
        title: 'Permission Denied',
        description: 'Access forbidden notice with support link.',
        icon: Icons.shield_outlined,
        iconColor: const Color(0xFF2563EB),
        onTap: () => PatientDialogs.showPermissionDenied(context),
      ),
      _CatalogItem(
        index: 7,
        title: 'Delete Account (Confirm)',
        description:
            'Destructive confirmation dialog for permanent account erasure.',
        icon: Icons.delete_outline_rounded,
        iconColor: const Color(0xFFDC2626),
        onTap: () => PatientDialogs.showDeleteAccountConfirm(context, () {}),
      ),
      _CatalogItem(
        index: 8,
        title: 'Logout? (Confirm)',
        description: 'Standard session termination confirmation dialog.',
        icon: Icons.logout_rounded,
        iconColor: const Color(0xFF1D4ED8),
        onTap: () => PatientDialogs.showLogoutConfirm(context, () {}),
      ),
      _CatalogItem(
        index: 9,
        title: 'Report Shared!',
        description:
            'Success confirmation after sharing records with provider.',
        icon: Icons.send_rounded,
        iconColor: const Color(0xFF0284C7),
        onTap: () => PatientDialogs.showReportSharedSuccess(context),
      ),
      _CatalogItem(
        index: 10,
        title: 'No Reports Yet',
        description: 'Empty state illustration with Upload Report CTA.',
        icon: Icons.find_in_page_outlined,
        iconColor: const Color(0xFF64748B),
        onTap: () => PatientDialogs.showEmptyReportsModal(context),
      ),
      _CatalogItem(
        index: 11,
        title: 'No Appointments Yet',
        description: 'Empty state illustration with Book Appointment CTA.',
        icon: Icons.event_busy_outlined,
        iconColor: const Color(0xFF64748B),
        onTap: () => PatientDialogs.showEmptyAppointmentsModal(context),
      ),
      _CatalogItem(
        index: 12,
        title: "You're All Caught Up!",
        description: 'Empty notification state indicator.',
        icon: Icons.notifications_none_outlined,
        iconColor: const Color(0xFF64748B),
        onTap: () => PatientDialogs.showEmptyNotificationsModal(context),
      ),
      _CatalogItem(
        index: 13,
        title: 'Something Went Wrong',
        description: 'Generic error boundary dialog with retry and support.',
        icon: Icons.sentiment_dissatisfied_outlined,
        iconColor: const Color(0xFF6366F1),
        onTap: () => PatientDialogs.showSomethingWentWrong(context),
      ),
      _CatalogItem(
        index: 14,
        title: "We'll Be Back Soon",
        description: 'Scheduled maintenance mode alert.',
        icon: Icons.settings_outlined,
        iconColor: const Color(0xFF475569),
        onTap: () => PatientDialogs.showMaintenanceMode(context),
      ),
      _CatalogItem(
        index: 15,
        title: 'Allow Location Access',
        description:
            'System permission prompt for hospital discovery and emergency.',
        icon: Icons.location_on_outlined,
        iconColor: const Color(0xFF2563EB),
        onTap: () => PatientDialogs.showLocationPermission(context),
      ),
      _CatalogItem(
        index: 16,
        title: 'Allow Camera Access',
        description:
            'System permission prompt for report scanning & QR identification.',
        icon: Icons.camera_alt_outlined,
        iconColor: const Color(0xFF1D4ED8),
        onTap: () => PatientDialogs.showCameraPermission(context),
      ),
      _CatalogItem(
        index: 17,
        title: 'Unsupported File Type',
        description: 'Validation rejection for non-standard file extensions.',
        icon: Icons.error_outline_rounded,
        iconColor: const Color(0xFFDC2626),
        onTap: () => PatientDialogs.showUnsupportedFileType(context),
      ),
      _CatalogItem(
        index: 18,
        title: 'Storage Limit Reached',
        description:
            'Capacity quota alert prompting storage cleanup or upgrade.',
        icon: Icons.storage_outlined,
        iconColor: const Color(0xFFDC2626),
        onTap: () => PatientDialogs.showStorageLimitReached(context),
      ),
    ];

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF0F172A)),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          '18 Supporting States (QA)',
          style: AppTypography.headlineSmall.copyWith(
            fontWeight: FontWeight.w800,
            color: const Color(0xFF0F172A),
          ),
        ),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(AppSpacing.lg),
        itemCount: items.length,
        separatorBuilder: (context, index) =>
            const SizedBox(height: AppSpacing.md),
        itemBuilder: (context, index) {
          final item = items[index];
          return Container(
            padding: const EdgeInsets.all(AppSpacing.md),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: item.iconColor.withValues(alpha: 0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Icon(item.icon, color: item.iconColor, size: 24),
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${item.index}. ${item.title}',
                        style: AppTypography.titleSmall.copyWith(
                          fontWeight: FontWeight.w700,
                          color: const Color(0xFF0F172A),
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        item.description,
                        style: AppTypography.bodySmall.copyWith(
                          color: const Color(0xFF64748B),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: AppSpacing.sm),
                ElevatedButton(
                  onPressed: item.onTap,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 8,
                    ),
                    elevation: 0,
                  ),
                  child: const Text('Test', style: TextStyle(fontSize: 12)),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _CatalogItem {
  final int index;
  final String title;
  final String description;
  final IconData icon;
  final Color iconColor;
  final VoidCallback onTap;

  _CatalogItem({
    required this.index,
    required this.title,
    required this.description,
    required this.icon,
    required this.iconColor,
    required this.onTap,
  });
}
