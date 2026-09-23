import 'package:flutter/material.dart';
import '../../app/theme/app_spacing.dart';
import '../../app/theme/app_typography.dart';
import '../widgets/app_button.dart';

/// Pre-styled dialogs, modals, and edge-case states matching
/// design-references/patient/optional-supporting-screens.png (All 18 States).
class PatientDialogs {
  /// Shows a clean standardized confirmation or info dialog with custom iconography.
  static Future<bool?> showActionDialog({
    required BuildContext context,
    required IconData icon,
    required Color iconColor,
    required Color iconBgColor,
    required String title,
    required String message,
    required String confirmLabel,
    String? cancelLabel,
    bool isDestructive = false,
    VoidCallback? onConfirm,
    VoidCallback? onCancel,
  }) {
    return showDialog<bool>(
      context: context,
      builder: (ctx) => Dialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        backgroundColor: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.xl),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: iconBgColor,
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: iconColor, size: 32),
              ),
              const SizedBox(height: AppSpacing.md),
              Text(
                title,
                textAlign: TextAlign.center,
                style: AppTypography.headlineSmall.copyWith(
                  fontWeight: FontWeight.w800,
                  color: const Color(0xFF102A43),
                ),
              ),
              const SizedBox(height: AppSpacing.sm),
              Text(
                message,
                textAlign: TextAlign.center,
                style: AppTypography.bodyMedium.copyWith(
                  color: const Color(0xFF627D98),
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              Row(
                children: [
                  if (cancelLabel != null) ...[
                    Expanded(
                      child: AppButton(
                        label: cancelLabel,
                        variant: AppButtonVariant.outline,
                        onPressed: () {
                          Navigator.of(ctx).pop(false);
                          onCancel?.call();
                        },
                      ),
                    ),
                    const SizedBox(width: AppSpacing.sm),
                  ],
                  Expanded(
                    child: AppButton(
                      label: confirmLabel,
                      variant: isDestructive
                          ? AppButtonVariant.destructive
                          : AppButtonVariant.primary,
                      onPressed: () {
                        Navigator.of(ctx).pop(true);
                        onConfirm?.call();
                      },
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  // -------------------------------------------------------------
  // 1. Password Reset Success
  // -------------------------------------------------------------
  static Future<void> showPasswordResetSuccess(BuildContext context) {
    return showActionDialog(
      context: context,
      icon: Icons.check_circle_outline_rounded,
      iconColor: const Color(0xFF16A34A),
      iconBgColor: const Color(0xFFDCFCE7),
      title: 'Password Reset Successful!',
      message:
          'Your password has been updated successfully. You can now login with your new password.',
      confirmLabel: 'Go to Login',
    );
  }

  // -------------------------------------------------------------
  // 2. Report Uploaded! (Upload Success)
  // -------------------------------------------------------------
  static Future<void> showReportUploadSuccess(
    BuildContext context, {
    VoidCallback? onViewReport,
    VoidCallback? onUploadAnother,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.description_rounded,
      iconColor: const Color(0xFF0284C7),
      iconBgColor: const Color(0xFFE0F2FE),
      title: 'Report Uploaded!',
      message: 'Your medical report has been uploaded successfully.',
      confirmLabel: 'View Report',
      cancelLabel: 'Upload Another',
      onConfirm: onViewReport,
      onCancel: onUploadAnother,
    );
  }

  // -------------------------------------------------------------
  // 3. Upload Failed
  // -------------------------------------------------------------
  static Future<void> showUploadFailed(
    BuildContext context, {
    VoidCallback? onRetry,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.warning_rounded,
      iconColor: const Color(0xFFDC2626),
      iconBgColor: const Color(0xFFFEE2E2),
      title: 'Upload Failed',
      message:
          "We couldn't upload your file. Please check your internet connection and try again.",
      confirmLabel: 'Try Again',
      cancelLabel: 'Go Back',
      onConfirm: onRetry,
    );
  }

  // -------------------------------------------------------------
  // 4. No Internet Connection
  // -------------------------------------------------------------
  static Future<void> showNoInternetConnection(
    BuildContext context, {
    VoidCallback? onRetry,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.wifi_off_rounded,
      iconColor: const Color(0xFFDC2626),
      iconBgColor: const Color(0xFFFEE2E2),
      title: 'No Internet Connection',
      message: 'Please check your internet connection and try again.',
      confirmLabel: 'Retry',
      onConfirm: onRetry,
    );
  }

  // -------------------------------------------------------------
  // 5. Session Expired
  // -------------------------------------------------------------
  static Future<void> showSessionExpired(
    BuildContext context, {
    VoidCallback? onLoginAgain,
    VoidCallback? onGoToHome,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.schedule_rounded,
      iconColor: const Color(0xFFDC2626),
      iconBgColor: const Color(0xFFFEE2E2),
      title: 'Session Expired',
      message:
          'For your security, your session has expired. Please login again to continue.',
      confirmLabel: 'Login Again',
      cancelLabel: 'Go to Home',
      onConfirm: onLoginAgain,
      onCancel: onGoToHome,
    );
  }

  // -------------------------------------------------------------
  // 6. Permission Denied
  // -------------------------------------------------------------
  static Future<void> showPermissionDenied(
    BuildContext context, {
    VoidCallback? onContactSupport,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.shield_outlined,
      iconColor: const Color(0xFF2563EB),
      iconBgColor: const Color(0xFFEFF6FF),
      title: 'Permission Denied',
      message:
          "You don't have permission to access this content. If you believe this is a mistake, please contact support.",
      confirmLabel: 'Go Back',
      cancelLabel: 'Contact Support',
      onCancel: onContactSupport,
    );
  }

  // -------------------------------------------------------------
  // 7. Delete Account (Confirm)
  // -------------------------------------------------------------
  static Future<bool?> showDeleteAccountConfirm(
    BuildContext context,
    VoidCallback onConfirm,
  ) {
    return showActionDialog(
      context: context,
      icon: Icons.delete_outline_rounded,
      iconColor: const Color(0xFFDC2626),
      iconBgColor: const Color(0xFFFEE2E2),
      title: 'Delete Account',
      message:
          'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.',
      confirmLabel: 'Yes, Delete Account',
      cancelLabel: 'Cancel',
      isDestructive: true,
      onConfirm: onConfirm,
    );
  }

  // -------------------------------------------------------------
  // 8. Logout? (Confirm)
  // -------------------------------------------------------------
  static Future<bool?> showLogoutConfirm(
    BuildContext context,
    VoidCallback onConfirm,
  ) {
    return showActionDialog(
      context: context,
      icon: Icons.logout_rounded,
      iconColor: const Color(0xFF1D4ED8),
      iconBgColor: const Color(0xFFEFF6FF),
      title: 'Logout?',
      message: 'Are you sure you want to logout from your account?',
      confirmLabel: 'Logout',
      cancelLabel: 'Cancel',
      onConfirm: onConfirm,
    );
  }

  // -------------------------------------------------------------
  // 9. Report Shared!
  // -------------------------------------------------------------
  static Future<void> showReportSharedSuccess(
    BuildContext context, {
    VoidCallback? onViewHistory,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.send_rounded,
      iconColor: const Color(0xFF0284C7),
      iconBgColor: const Color(0xFFE0F2FE),
      title: 'Report Shared!',
      message:
          'The report has been shared successfully with the selected people.',
      confirmLabel: 'Done',
      cancelLabel: 'View Sharing History',
      onCancel: onViewHistory,
    );
  }

  // -------------------------------------------------------------
  // 10. Empty State (Reports)
  // -------------------------------------------------------------
  static Future<void> showEmptyReportsModal(
    BuildContext context, {
    VoidCallback? onUpload,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.find_in_page_outlined,
      iconColor: const Color(0xFF64748B),
      iconBgColor: const Color(0xFFF1F5F9),
      title: 'No Reports Yet',
      message: "You haven't uploaded any medical reports yet.",
      confirmLabel: 'Upload Report',
      onConfirm: onUpload,
    );
  }

  // -------------------------------------------------------------
  // 11. Empty State (Appointments)
  // -------------------------------------------------------------
  static Future<void> showEmptyAppointmentsModal(
    BuildContext context, {
    VoidCallback? onBook,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.event_busy_outlined,
      iconColor: const Color(0xFF64748B),
      iconBgColor: const Color(0xFFF1F5F9),
      title: 'No Appointments Yet',
      message: "You don't have any upcoming appointments.",
      confirmLabel: 'Book Appointment',
      onConfirm: onBook,
    );
  }

  // -------------------------------------------------------------
  // 12. Empty State (Notifications)
  // -------------------------------------------------------------
  static Future<void> showEmptyNotificationsModal(BuildContext context) {
    return showActionDialog(
      context: context,
      icon: Icons.notifications_none_outlined,
      iconColor: const Color(0xFF64748B),
      iconBgColor: const Color(0xFFF1F5F9),
      title: "You're All Caught Up!",
      message: 'No new notifications at the moment.',
      confirmLabel: 'Okay',
    );
  }

  // -------------------------------------------------------------
  // 13. Error State
  // -------------------------------------------------------------
  static Future<void> showSomethingWentWrong(
    BuildContext context, {
    VoidCallback? onTryAgain,
    VoidCallback? onContactSupport,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.sentiment_dissatisfied_outlined,
      iconColor: const Color(0xFF6366F1),
      iconBgColor: const Color(0xFFEEF2FF),
      title: 'Something Went Wrong',
      message: "We're facing some technical issues. Please try again later.",
      confirmLabel: 'Try Again',
      cancelLabel: 'Contact Support',
      onConfirm: onTryAgain,
      onCancel: onContactSupport,
    );
  }

  // -------------------------------------------------------------
  // 14. Maintenance Mode
  // -------------------------------------------------------------
  static Future<void> showMaintenanceMode(BuildContext context) {
    return showActionDialog(
      context: context,
      icon: Icons.settings_outlined,
      iconColor: const Color(0xFF475569),
      iconBgColor: const Color(0xFFF1F5F9),
      title: "We'll Be Back Soon",
      message:
          'The app is under maintenance to serve you better. Please try again later.',
      confirmLabel: 'Got It',
    );
  }

  // -------------------------------------------------------------
  // 15. Location Permission
  // -------------------------------------------------------------
  static Future<void> showLocationPermission(
    BuildContext context, {
    VoidCallback? onAllow,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.location_on_outlined,
      iconColor: const Color(0xFF2563EB),
      iconBgColor: const Color(0xFFEFF6FF),
      title: 'Allow Location Access',
      message:
          'We need your location to show nearby hospitals and emergency services.',
      confirmLabel: 'Allow Location',
      cancelLabel: 'Not Now',
      onConfirm: onAllow,
    );
  }

  // -------------------------------------------------------------
  // 16. Camera Permission
  // -------------------------------------------------------------
  static Future<void> showCameraPermission(
    BuildContext context, {
    VoidCallback? onAllow,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.camera_alt_outlined,
      iconColor: const Color(0xFF1D4ED8),
      iconBgColor: const Color(0xFFEFF6FF),
      title: 'Allow Camera Access',
      message: 'We need camera access to scan and upload your medical reports.',
      confirmLabel: 'Allow Camera',
      cancelLabel: 'Not Now',
      onConfirm: onAllow,
    );
  }

  // -------------------------------------------------------------
  // 17. File Type Not Supported
  // -------------------------------------------------------------
  static Future<void> showUnsupportedFileType(BuildContext context) {
    return showActionDialog(
      context: context,
      icon: Icons.error_outline_rounded,
      iconColor: const Color(0xFFDC2626),
      iconBgColor: const Color(0xFFFEE2E2),
      title: 'Unsupported File Type',
      message: 'Please upload a PDF, JPG or PNG file only.',
      confirmLabel: 'Try Again',
    );
  }

  // -------------------------------------------------------------
  // 18. Storage Limit Reached
  // -------------------------------------------------------------
  static Future<void> showStorageLimitReached(
    BuildContext context, {
    VoidCallback? onManageStorage,
  }) {
    return showActionDialog(
      context: context,
      icon: Icons.storage_outlined,
      iconColor: const Color(0xFFDC2626),
      iconBgColor: const Color(0xFFFEE2E2),
      title: 'Storage Limit Reached',
      message:
          "You've reached your storage limit. Please delete some files or upgrade your plan.",
      confirmLabel: 'Manage Storage',
      onConfirm: onManageStorage,
    );
  }

  // -------------------------------------------------------------
  // Legacy aliases to prevent regressions in existing callers
  // -------------------------------------------------------------
  static Future<void> showPasswordResetSuccessDialog(BuildContext context) =>
      showPasswordResetSuccess(context);

  static Future<void> showReportUploadSuccessDialog({
    required BuildContext context,
    VoidCallback? onViewReport,
  }) => showReportUploadSuccess(context, onViewReport: onViewReport);

  static Future<void> showUploadFailedDialog({
    required BuildContext context,
    VoidCallback? onRetry,
  }) => showUploadFailed(context, onRetry: onRetry);

  static Future<bool?> showDeleteAccountConfirmDialog({
    required BuildContext context,
    required VoidCallback onConfirm,
  }) => showDeleteAccountConfirm(context, onConfirm);

  static Future<bool?> showLogoutConfirmDialog({
    required BuildContext context,
    required VoidCallback onConfirm,
  }) => showLogoutConfirm(context, onConfirm);

  static Future<void> showReportSharedSuccessDialog({
    required BuildContext context,
    String? recipientName,
  }) => showReportSharedSuccess(context);

  static Future<void> showCameraPermissionDialog(BuildContext context) =>
      showCameraPermission(context);

  static Future<void> showUnsupportedFileTypeDialog(BuildContext context) =>
      showUnsupportedFileType(context);
}
