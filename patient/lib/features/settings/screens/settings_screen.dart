import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../core/dialogs/patient_dialogs.dart';
import '../../../shared/providers/patient_providers.dart';

/// Settings Screen matching design-references/patient/settings.png and profile-settings.png.
class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(patientProfileProvider);
    final settings = ref.watch(patientSettingsProvider);

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
          'Settings',
          style: AppTypography.headlineSmall.copyWith(
            fontWeight: FontWeight.w800,
            color: const Color(0xFF0F172A),
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          // User Card matching settings.png
          Container(
            padding: const EdgeInsets.all(AppSpacing.md),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(AppRadius.lg),
              border: Border.all(color: const Color(0xFFE2E8F0)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.02),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 26,
                  backgroundColor: AppColors.primary.withValues(alpha: 0.1),
                  child: Text(
                    'KD',
                    style: AppTypography.titleLarge.copyWith(
                      fontWeight: FontWeight.w800,
                      color: AppColors.primary,
                    ),
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Flexible(
                            child: Text(
                              profile.name,
                              style: AppTypography.titleMedium.copyWith(
                                fontWeight: FontWeight.w800,
                                color: const Color(0xFF0F172A),
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          const SizedBox(width: 4),
                          const Icon(
                            Icons.verified,
                            size: 16,
                            color: AppColors.primary,
                          ),
                        ],
                      ),
                      Text(
                        profile.email,
                        style: AppTypography.bodySmall.copyWith(
                          color: const Color(0xFF64748B),
                        ),
                      ),
                      Text(
                        profile.phone,
                        style: AppTypography.labelSmall.copyWith(
                          color: const Color(0xFF64748B),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
                OutlinedButton.icon(
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.primary,
                    side: const BorderSide(color: Color(0xFFE2E8F0)),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                  ),
                  icon: const Icon(Icons.edit_outlined, size: 14),
                  label: const Text(
                    'Edit Profile',
                    style: TextStyle(fontWeight: FontWeight.w700, fontSize: 12),
                  ),
                  onPressed: () => context.push('/personal-information'),
                ),
              ],
            ),
          ),
          const SizedBox(height: AppSpacing.lg),

          // PREFERENCES
          _buildSectionHeader('PREFERENCES'),
          _buildSettingsTile(
            icon: Icons.notifications_outlined,
            title: 'Notification Settings',
            subtitle: 'Push notifications, SMS, emergency alerts',
            onTap: () => context.push('/settings/notifications'),
          ),
          _buildSettingsTile(
            icon: Icons.palette_outlined,
            title: 'Appearance',
            subtitle: 'System default, Light, Dark mode',
            trailingText: settings.themeMode,
            onTap: () => context.push('/settings/appearance'),
          ),
          _buildSettingsTile(
            icon: Icons.language_outlined,
            title: 'Language & Region',
            subtitle: 'English (India), Hindi',
            trailingText: settings.language,
            onTap: () => context.push('/settings/language-region'),
          ),
          Container(
            margin: const EdgeInsets.only(bottom: AppSpacing.sm),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(AppRadius.md),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Material(
              color: Colors.transparent,
              child: SwitchListTile(
                secondary: const Icon(
                  Icons.fingerprint,
                  color: Color(0xFF2563EB),
                ),
                title: Text(
                  'Biometric Authentication',
                  style: AppTypography.titleSmall.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                subtitle: Text(
                  'Require biometric unlock for health records and QR pass',
                  style: AppTypography.bodySmall.copyWith(
                    color: const Color(0xFF64748B),
                  ),
                ),
                value: settings.biometricsEnabled,
                activeThumbColor: AppColors.primary,
                onChanged: (val) {
                  ref
                      .read(patientSettingsProvider.notifier)
                      .update(biometrics: val);
                },
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.lg),

          // ACCOUNT & SECURITY
          _buildSectionHeader('ACCOUNT & SECURITY'),
          _buildSettingsTile(
            icon: Icons.person_outline_rounded,
            title: 'Personal Information',
            subtitle: 'View and update your personal details',
            onTap: () => context.push('/personal-information'),
          ),
          _buildSettingsTile(
            icon: Icons.security_outlined,
            title: 'Security & Privacy',
            subtitle: 'Manage your password, 2FA, and privacy',
            onTap: () => context.push('/settings/privacy-security'),
          ),
          _buildSettingsTile(
            icon: Icons.people_outline_rounded,
            title: 'Family & Emergency Contacts',
            subtitle: 'Manage your family members and emergency contacts',
            onTap: () => context.push('/emergency-contacts'),
          ),
          const SizedBox(height: AppSpacing.lg),

          // SUPPORT & LEGAL
          _buildSectionHeader('SUPPORT & LEGAL'),
          _buildSettingsTile(
            icon: Icons.help_outline,
            title: 'Help Center',
            subtitle: 'FAQs and support resources',
            onTap: () => context.push('/help-support'),
          ),
          _buildSettingsTile(
            icon: Icons.auto_awesome_mosaic_outlined,
            title: '18 Supporting States (QA)',
            subtitle: 'Edge cases, empty/error states, confirmations catalog',
            onTap: () => context.push('/supporting-screens'),
          ),
          _buildSettingsTile(
            icon: Icons.description_outlined,
            title: 'ABDM Terms & Privacy',
            subtitle: 'Read our terms of service and privacy policy',
            onTap: () {
              showDialog(
                context: context,
                builder: (ctx) => AlertDialog(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  title: Row(
                    children: const [
                      Icon(Icons.gavel_rounded, color: AppColors.primary),
                      SizedBox(width: 8),
                      Text('ABDM Terms & Privacy'),
                    ],
                  ),
                  content: const Text(
                    'AI Healthcare is fully aligned with the Ayushman Bharat Digital Mission (ABDM) standards and the Digital Personal Data Protection (DPDP) Act. All patient records remain under user consent authority and patient-controlled fiduciary governance.',
                    style: TextStyle(height: 1.4),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.of(ctx).pop(),
                      child: const Text('Close'),
                    ),
                  ],
                ),
              );
            },
          ),
          const SizedBox(height: AppSpacing.xl),

          // LOGOUT & DELETE
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(AppRadius.md),
              border: Border.all(color: const Color(0xFFFEE2E2)),
            ),
            child: Material(
              color: Colors.transparent,
              child: Column(
                children: [
                  ListTile(
                    leading: const Icon(Icons.logout, color: Color(0xFFDC2626)),
                    title: Text(
                      'Log Out',
                      style: AppTypography.titleSmall.copyWith(
                        fontWeight: FontWeight.w700,
                        color: const Color(0xFFDC2626),
                      ),
                    ),
                    subtitle: const Text('Sign out of your session'),
                    trailing: const Icon(
                      Icons.chevron_right,
                      color: Color(0xFFDC2626),
                    ),
                    onTap: () {
                      PatientDialogs.showLogoutConfirmDialog(
                        context: context,
                        onConfirm: () => context.go('/login'),
                      );
                    },
                  ),
                  const Divider(height: 1, color: Color(0xFFFEE2E2)),
                  ListTile(
                    leading: const Icon(
                      Icons.delete_forever_outlined,
                      color: Color(0xFFEF4444),
                    ),
                    title: Text(
                      'Delete Account',
                      style: AppTypography.titleSmall.copyWith(
                        fontWeight: FontWeight.w700,
                        color: const Color(0xFFEF4444),
                      ),
                    ),
                    subtitle: const Text('Permanently remove account and data'),
                    trailing: const Icon(
                      Icons.chevron_right,
                      color: Color(0xFFEF4444),
                    ),
                    onTap: () {
                      PatientDialogs.showDeleteAccountConfirmDialog(
                        context: context,
                        onConfirm: () => context.go('/login'),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.xl),

          Center(
            child: Text(
              'AI Healthcare Platform v1.0.0 (Build 108)',
              style: AppTypography.labelSmall.copyWith(
                color: const Color(0xFF94A3B8),
              ),
            ),
          ),
          const SizedBox(height: 48),
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

  Widget _buildSettingsTile({
    required IconData icon,
    required String title,
    required String subtitle,
    String? trailingText,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppRadius.md),
        border: Border.all(color: const Color(0xFFE2E8F0)),
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
        child: ListTile(
          onTap: onTap,
          leading: Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFFF1F5F9),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: const Color(0xFF475569), size: 20),
          ),
          title: Text(
            title,
            style: AppTypography.titleSmall.copyWith(
              fontWeight: FontWeight.w700,
              color: const Color(0xFF0F172A),
            ),
          ),
          subtitle: Text(
            subtitle,
            style: AppTypography.bodySmall.copyWith(
              color: const Color(0xFF64748B),
            ),
          ),
          trailing: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (trailingText != null)
                Text(
                  trailingText,
                  style: AppTypography.labelSmall.copyWith(
                    color: AppColors.primary,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              const SizedBox(width: 4),
              const Icon(
                Icons.chevron_right,
                color: Color(0xFFCBD5E1),
                size: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
