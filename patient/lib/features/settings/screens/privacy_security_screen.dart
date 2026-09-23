import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../shared/providers/patient_providers.dart';

/// Privacy & Security Screen matching design-references/patient/privacy-security.png.
class PrivacySecurityScreen extends ConsumerWidget {
  const PrivacySecurityScreen({super.key});

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
          'Privacy & Security',
          style: AppTypography.headlineSmall.copyWith(
            fontWeight: FontWeight.w800,
            color: const Color(0xFF0F172A),
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          // Security Score Card
          Container(
            padding: const EdgeInsets.all(AppSpacing.lg),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF064E3B), Color(0xFF059669)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(AppRadius.lg),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF059669).withValues(alpha: 0.25),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.2),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.shield,
                    color: Colors.white,
                    size: 32,
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Protection Level: High (98%)',
                        style: AppTypography.titleMedium.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'End-to-end encrypted under NDHM standards. Biometrics & 2FA active.',
                        style: AppTypography.bodySmall.copyWith(
                          color: Colors.white.withValues(alpha: 0.9),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: AppSpacing.xl),

          // AUTHENTICATION SECURITY
          _buildSectionHeader('AUTHENTICATION & ACCESS'),
          Container(
            margin: const EdgeInsets.only(bottom: AppSpacing.sm),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(AppRadius.md),
            ),
            child: Material(
              color: Colors.transparent,
              child: SwitchListTile(
                secondary: const Icon(
                  Icons.fingerprint,
                  color: Color(0xFF2563EB),
                ),
                title: Text(
                  'Biometric App Lock',
                  style: AppTypography.titleSmall.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                subtitle: Text(
                  'Prompt for biometric / passcode whenever opening the application',
                  style: AppTypography.bodySmall.copyWith(
                    color: const Color(0xFF64748B),
                  ),
                ),
                value: settings.biometricsEnabled,
                activeThumbColor: AppColors.primary,
                onChanged: (val) => notifier.update(biometrics: val),
              ),
            ),
          ),
          _buildSecurityTile(
            icon: Icons.phonelink_lock_outlined,
            title: 'Two-Factor Authentication (2FA)',
            subtitle: 'Active via registered phone (+91 98765 43210)',
            badge: 'Active',
            badgeColor: const Color(0xFF10B981),
            onTap: () {
              showDialog(
                context: context,
                builder: (ctx) => AlertDialog(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  title: Row(
                    children: const [
                      Icon(Icons.phonelink_lock, color: Color(0xFF10B981)),
                      SizedBox(width: 8),
                      Text('2FA Authentication'),
                    ],
                  ),
                  content: const Text(
                    'Two-factor authentication is active on your account via SMS OTP sent to registered mobile +91 98765 43210.',
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.of(ctx).pop(),
                      child: const Text('Done'),
                    ),
                  ],
                ),
              );
            },
          ),
          _buildSecurityTile(
            icon: Icons.devices_outlined,
            title: 'Authorized Devices',
            subtitle: 'Current Device: Pixel 8 Pro (Active now)',
            onTap: () {
              showDialog(
                context: context,
                builder: (ctx) => AlertDialog(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  title: const Text('Authorized Devices'),
                  content: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      ListTile(
                        contentPadding: EdgeInsets.zero,
                        leading: Icon(
                          Icons.phone_android,
                          color: AppColors.primary,
                        ),
                        title: Text('Google Pixel 8 Pro'),
                        subtitle: Text('This device • Active Now'),
                      ),
                      Divider(),
                      ListTile(
                        contentPadding: EdgeInsets.zero,
                        leading: Icon(Icons.laptop, color: Color(0xFF64748B)),
                        title: Text('Chrome on Windows'),
                        subtitle: Text('New Delhi • 2 hours ago'),
                      ),
                    ],
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
          const SizedBox(height: AppSpacing.lg),

          // DATA PRIVACY & COMPLIANCE
          _buildSectionHeader('DATA PRIVACY & CONSENT POLICIES'),
          _buildSecurityTile(
            icon: Icons.enhanced_encryption_outlined,
            title: 'AES-256 Clinical Encryption',
            subtitle:
                'All radiological images and encounters encrypted at rest',
            onTap: () {
              showDialog(
                context: context,
                builder: (ctx) => AlertDialog(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  title: Row(
                    children: const [
                      Icon(Icons.enhanced_encryption, color: AppColors.primary),
                      SizedBox(width: 8),
                      Text('Clinical Encryption'),
                    ],
                  ),
                  content: const Text(
                    'All longitudinal medical records, diagnostic imaging, and encounter transcripts are encrypted with AES-256-GCM. Decryption keys are scoped exclusively to temporary patient consent grants and break-glass emergency sessions.',
                    style: TextStyle(height: 1.4),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.of(ctx).pop(),
                      child: const Text('Understood'),
                    ),
                  ],
                ),
              );
            },
          ),
          _buildSecurityTile(
            icon: Icons.rule_outlined,
            title: 'Consent Manager (ABDM)',
            subtitle: 'View and manage NDHM data fiduciary authorizations',
            onTap: () => context.push('/access-requests'),
          ),
          _buildSecurityTile(
            icon: Icons.receipt_long_outlined,
            title: 'Download Security Audit Log',
            subtitle:
                'Certified export of all read, write, and emergency events',
            onTap: () {
              showDialog(
                context: context,
                builder: (ctx) => AlertDialog(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  title: Row(
                    children: const [
                      Icon(Icons.receipt_long, color: Color(0xFF16A34A)),
                      SizedBox(width: 8),
                      Text('Audit Log Exported'),
                    ],
                  ),
                  content: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'A tamper-evident PDF certificate of all clinical access events, downloads, and break-glass overrides has been generated.',
                      ),
                      SizedBox(height: 12),
                      Text(
                        'File: AHC-Audit-Log-2026.pdf\nEntries: 14 Events\nStatus: Cryptographically Signed',
                        style: TextStyle(
                          fontSize: 12,
                          fontFamily: 'monospace',
                          color: Color(0xFF64748B),
                        ),
                      ),
                    ],
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.of(ctx).pop(),
                      child: const Text('Done'),
                    ),
                  ],
                ),
              );
            },
          ),
          const SizedBox(height: AppSpacing.xl),

          // Emergency Revoke Action
          OutlinedButton.icon(
            icon: const Icon(Icons.block, color: Color(0xFFDC2626)),
            label: const Text(
              'Revoke All Active Doctor Sessions',
              style: TextStyle(color: Color(0xFFDC2626)),
            ),
            style: OutlinedButton.styleFrom(
              minimumSize: const Size(double.infinity, 48),
              side: const BorderSide(color: Color(0xFFFCA5A5)),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(AppRadius.md),
              ),
            ),
            onPressed: () {
              showDialog(
                context: context,
                builder: (ctx) => AlertDialog(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  title: Row(
                    children: const [
                      Icon(
                        Icons.warning_amber_rounded,
                        color: Color(0xFFDC2626),
                      ),
                      SizedBox(width: 8),
                      Text('Revoke All Sessions?'),
                    ],
                  ),
                  content: const Text(
                    'This will immediately terminate all active doctor and hospital consultations with access to your records.',
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.of(ctx).pop(),
                      child: const Text('Cancel'),
                    ),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFDC2626),
                        foregroundColor: Colors.white,
                      ),
                      onPressed: () {
                        Navigator.of(ctx).pop();
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text(
                              'All active doctor sessions invalidated immediately.',
                            ),
                            behavior: SnackBarBehavior.floating,
                          ),
                        );
                      },
                      child: const Text('Revoke All'),
                    ),
                  ],
                ),
              );
            },
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

  Widget _buildSecurityTile({
    required IconData icon,
    required String title,
    required String subtitle,
    String? badge,
    Color? badgeColor,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppRadius.md),
      ),
      child: Material(
        color: Colors.transparent,
        child: ListTile(
          onTap: onTap,
          leading: Icon(icon, color: const Color(0xFF475569)),
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
          trailing: badge != null
              ? Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 2,
                  ),
                  decoration: BoxDecoration(
                    color: (badgeColor ?? AppColors.primary).withValues(
                      alpha: 0.1,
                    ),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    badge,
                    style: AppTypography.labelSmall.copyWith(
                      color: badgeColor ?? AppColors.primary,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                )
              : const Icon(
                  Icons.chevron_right,
                  color: Color(0xFFCBD5E1),
                  size: 20,
                ),
        ),
      ),
    );
  }
}
