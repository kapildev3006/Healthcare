import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../shared/providers/patient_providers.dart';

/// Appearance Settings Screen (Route: /settings/appearance) matching settings.png.
class AppearanceSettingsScreen extends ConsumerWidget {
  const AppearanceSettingsScreen({super.key});

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
          'Appearance',
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
            'THEME MODE',
            style: AppTypography.labelSmall.copyWith(
              color: const Color(0xFF94A3B8),
              fontWeight: FontWeight.w700,
              letterSpacing: 1.1,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          _buildThemeCard(
            title: 'System Default',
            subtitle: 'Automatically match device system theme',
            icon: Icons.brightness_auto,
            isSelected: settings.themeMode == 'System Default',
            onTap: () => notifier.update(theme: 'System Default'),
          ),
          _buildThemeCard(
            title: 'Light Theme',
            subtitle: 'Clean white medical palette with high legibility',
            icon: Icons.light_mode_outlined,
            isSelected: settings.themeMode == 'Light',
            onTap: () => notifier.update(theme: 'Light'),
          ),
          _buildThemeCard(
            title: 'Dark Theme',
            subtitle: 'Low-light clinical contrast mode for night shifts',
            icon: Icons.dark_mode_outlined,
            isSelected: settings.themeMode == 'Dark',
            onTap: () => notifier.update(theme: 'Dark'),
          ),
          const SizedBox(height: AppSpacing.xl),

          Text(
            'ACCESSIBILITY & DISPLAY',
            style: AppTypography.labelSmall.copyWith(
              color: const Color(0xFF94A3B8),
              fontWeight: FontWeight.w700,
              letterSpacing: 1.1,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(AppRadius.md),
            ),
            child: Material(
              color: Colors.transparent,
              child: Column(
                children: [
                  SwitchListTile(
                    secondary: const Icon(
                      Icons.contrast,
                      color: Color(0xFF475569),
                    ),
                    title: Text(
                      'High Contrast Mode',
                      style: AppTypography.titleSmall.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    subtitle: Text(
                      'Increases boundary contrast on clinical indicators',
                      style: AppTypography.bodySmall.copyWith(
                        color: const Color(0xFF64748B),
                      ),
                    ),
                    value: false,
                    activeThumbColor: AppColors.primary,
                    onChanged: (_) {},
                  ),
                  const Divider(height: 1, color: Color(0xFFF1F5F9)),
                  SwitchListTile(
                    secondary: const Icon(
                      Icons.format_size,
                      color: Color(0xFF475569),
                    ),
                    title: Text(
                      'Large Typography',
                      style: AppTypography.titleSmall.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    subtitle: Text(
                      'Enlarge medical terms and medication dosages',
                      style: AppTypography.bodySmall.copyWith(
                        color: const Color(0xFF64748B),
                      ),
                    ),
                    value: false,
                    activeThumbColor: AppColors.primary,
                    onChanged: (_) {},
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildThemeCard({
    required String title,
    required String subtitle,
    required IconData icon,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppRadius.md),
        border: Border.all(
          color: isSelected ? AppColors.primary : const Color(0xFFE2E8F0),
          width: isSelected ? 2 : 1,
        ),
      ),
      child: Material(
        color: Colors.transparent,
        child: ListTile(
          onTap: onTap,
          leading: Icon(
            icon,
            color: isSelected ? AppColors.primary : const Color(0xFF64748B),
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
          trailing: isSelected
              ? const Icon(Icons.check_circle, color: AppColors.primary)
              : const Icon(Icons.circle_outlined, color: Color(0xFFCBD5E1)),
        ),
      ),
    );
  }
}
