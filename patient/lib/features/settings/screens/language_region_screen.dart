import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../shared/providers/patient_providers.dart';

/// Language & Region Screen (Route: /settings/language-region) matching settings.png.
class LanguageRegionScreen extends ConsumerWidget {
  const LanguageRegionScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final settings = ref.watch(patientSettingsProvider);
    final notifier = ref.read(patientSettingsProvider.notifier);

    final languages = [
      {'name': 'English (India)', 'native': 'English', 'code': 'en'},
      {'name': 'Hindi', 'native': 'हिन्दी', 'code': 'hi'},
      {'name': 'Bengali', 'native': 'বাংলা', 'code': 'bn'},
      {'name': 'Tamil', 'native': 'தமிழ்', 'code': 'ta'},
      {'name': 'Telugu', 'native': 'తెలుగు', 'code': 'te'},
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
          'Language & Region',
          style: AppTypography.headlineSmall.copyWith(
            fontWeight: FontWeight.w800,
            color: const Color(0xFF0F172A),
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          Text(
            'SELECT APPLICATION LANGUAGE',
            style: AppTypography.labelSmall.copyWith(
              color: const Color(0xFF94A3B8),
              fontWeight: FontWeight.w700,
              letterSpacing: 1.1,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          ...languages.map((lang) {
            final isSelected = settings.language == lang['name'];
            return Container(
              margin: const EdgeInsets.only(bottom: AppSpacing.sm),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(AppRadius.md),
                border: Border.all(
                  color: isSelected
                      ? AppColors.primary
                      : const Color(0xFFE2E8F0),
                  width: isSelected ? 2 : 1,
                ),
              ),
              child: Material(
                color: Colors.transparent,
                child: ListTile(
                  onTap: () => notifier.update(language: lang['name']!),
                  title: Text(
                    lang['name']!,
                    style: AppTypography.titleSmall.copyWith(
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF0F172A),
                    ),
                  ),
                  subtitle: Text(
                    lang['native']!,
                    style: AppTypography.bodySmall,
                  ),
                  trailing: isSelected
                      ? const Icon(Icons.check_circle, color: AppColors.primary)
                      : const Icon(
                          Icons.circle_outlined,
                          color: Color(0xFFCBD5E1),
                        ),
                ),
              ),
            );
          }),
          const SizedBox(height: AppSpacing.xl),

          Text(
            'REGIONAL PREFERENCES',
            style: AppTypography.labelSmall.copyWith(
              color: const Color(0xFF94A3B8),
              fontWeight: FontWeight.w700,
              letterSpacing: 1.1,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          Container(
            padding: const EdgeInsets.all(AppSpacing.md),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(AppRadius.md),
            ),
            child: Column(
              children: [
                _buildRegionRow('Country / Region', 'India (IN)'),
                const Divider(height: 20, color: Color(0xFFF1F5F9)),
                _buildRegionRow(
                  'Date Format',
                  'DD MMM YYYY (e.g. 12 Sep 2026)',
                ),
                const Divider(height: 20, color: Color(0xFFF1F5F9)),
                _buildRegionRow(
                  'Measurement Units',
                  'Metric (kg, cm, mmHg, mg/dL)',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRegionRow(String label, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          flex: 5,
          child: Text(
            label,
            style: AppTypography.bodySmall.copyWith(
              color: const Color(0xFF64748B),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          flex: 6,
          child: Text(
            value,
            textAlign: TextAlign.end,
            style: AppTypography.titleSmall.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ],
    );
  }
}
