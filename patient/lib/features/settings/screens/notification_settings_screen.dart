import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../shared/providers/patient_providers.dart';

/// Notification Settings Screen matching design-references/patient/notification-settings.png.
class NotificationSettingsScreen extends ConsumerWidget {
  const NotificationSettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final settings = ref.watch(patientSettingsProvider);
    final notifier = ref.read(patientSettingsProvider.notifier);

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
          'Notification Settings',
          style: AppTypography.headlineSmall.copyWith(
            fontWeight: FontWeight.w800,
            color: const Color(0xFF0F172A),
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          // Mandatory emergency alert banner
          Container(
            padding: const EdgeInsets.all(AppSpacing.md),
            decoration: BoxDecoration(
              color: const Color(0xFFFEF2F2),
              borderRadius: BorderRadius.circular(AppRadius.md),
              border: Border.all(color: const Color(0xFFFEE2E2)),
            ),
            child: Row(
              children: [
                const Icon(Icons.emergency, color: Color(0xFFDC2626), size: 24),
                const SizedBox(width: AppSpacing.sm),
                Expanded(
                  child: Text(
                    'Emergency break-glass alerts cannot be disabled to ensure patient safety and unauthorized access monitoring.',
                    style: AppTypography.bodySmall.copyWith(
                      color: const Color(0xFF991B1B),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: AppSpacing.lg),

          // ALERT CHANNELS
          _buildSectionHeader('ALERT TYPES & TRIGGERS'),
          _buildToggleCard(
            title: 'Emergency Break-Glass Alerts',
            subtitle: 'Immediate SMS & Push alert when break-glass is invoked',
            value: true,
            enabled: false, // Cannot be disabled
            activeColor: const Color(0xFFDC2626),
            onChanged: null,
          ),
          _buildToggleCard(
            title: 'Clinician Access Requests',
            subtitle:
                'Real-time notifications when a doctor requests record consent',
            value: settings.accessRequestNotif,
            onChanged: (val) => notifier.update(accessRequest: val),
          ),
          _buildToggleCard(
            title: 'AI Report Analysis Completed',
            subtitle: 'Alert when AI decision-support findings are generated',
            value: settings.aiCompletedNotif,
            onChanged: (val) => notifier.update(aiCompleted: val),
          ),
          _buildToggleCard(
            title: 'Appointment Reminders',
            subtitle: 'Upcoming consultation alerts 24h & 2h prior to visit',
            value: settings.appointmentReminders,
            onChanged: (val) => notifier.update(appointmentReminders: val),
          ),
          const SizedBox(height: AppSpacing.lg),

          // DELIVERY CHANNELS
          _buildSectionHeader('DELIVERY METHODS'),
          _buildToggleCard(
            title: 'Push Notifications',
            subtitle: 'Deliver pop-up notifications to this device',
            value: true,
            onChanged: (_) {},
          ),
          _buildToggleCard(
            title: 'SMS Alerts',
            subtitle: 'Send critical OTP and emergency tokens via SMS',
            value: true,
            onChanged: (_) {},
          ),
          _buildToggleCard(
            title: 'Email Summary',
            subtitle: 'Receive monthly encounter digests and lab reports',
            value: false,
            onChanged: (_) {},
          ),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, bottom: AppSpacing.sm),
      child: Text(
        title,
        style: AppTypography.labelSmall.copyWith(
          color: const Color(0xFF94A3B8),
          fontWeight: FontWeight.w700,
          letterSpacing: 1.1,
        ),
      ),
    );
  }

  Widget _buildToggleCard({
    required String title,
    required String subtitle,
    required bool value,
    bool enabled = true,
    Color? activeColor,
    required ValueChanged<bool>? onChanged,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppRadius.md),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.01),
            blurRadius: 4,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: SwitchListTile(
          title: Text(
            title,
            style: AppTypography.titleSmall.copyWith(
              fontWeight: FontWeight.w700,
              color: enabled
                  ? const Color(0xFF0F172A)
                  : const Color(0xFF94A3B8),
            ),
          ),
          subtitle: Text(
            subtitle,
            style: AppTypography.bodySmall.copyWith(
              color: const Color(0xFF64748B),
            ),
          ),
          value: value,
          activeThumbColor: activeColor ?? AppColors.primary,
          onChanged: enabled ? onChanged : null,
        ),
      ),
    );
  }
}
