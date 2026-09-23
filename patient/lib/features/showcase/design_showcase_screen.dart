import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';
import '../../app/theme/app_radius.dart';
import '../../app/theme/app_spacing.dart';
import '../../app/theme/app_typography.dart';
import '../../core/widgets/widgets.dart';

/// Temporary Development Showcase Screen.
/// Displays and validates reusable design system primitives and widgets.
/// This screen is strictly developer tooling and not part of the final Patient navigation.
class DesignShowcaseScreen extends StatefulWidget {
  const DesignShowcaseScreen({super.key});

  @override
  State<DesignShowcaseScreen> createState() => _DesignShowcaseScreenState();
}

class _DesignShowcaseScreenState extends State<DesignShowcaseScreen> {
  bool _isLoadingButton = false;
  bool _showAlert = true;

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: const ClinicalAppBar(
        title: 'Design System Showcase',
        subtitle: 'Patient Mobile Primitives (Dev Only)',
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.lg,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header notice
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: AppColors.primaryContainer,
                borderRadius: AppRadius.roundedMd,
                border: Border.all(
                  color: AppColors.primaryLight.withValues(alpha: 0.3),
                ),
              ),
              child: Row(
                children: [
                  const Icon(
                    Icons.developer_mode,
                    color: AppColors.primary,
                    size: 22,
                  ),
                  const SizedBox(width: AppSpacing.sm + 2),
                  Expanded(
                    child: Text(
                      'Temporary dev showcase for Phase 1 verification. '
                      'Patient Home UI will be built from UI reference image.',
                      style: AppTypography.bodySmall.copyWith(
                        color: AppColors.primary,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl),

            // 1. Semantic Color Palette
            _buildSectionHeader('1. Semantic Color Palette'),
            const SizedBox(height: AppSpacing.sm),
            _buildColorPalette(),
            const SizedBox(height: AppSpacing.xl),

            // 2. Typography Scale
            _buildSectionHeader('2. Typography Scale'),
            const SizedBox(height: AppSpacing.sm),
            _buildTypographyScale(),
            const SizedBox(height: AppSpacing.xl),

            // 3. Spacing Scale
            _buildSectionHeader('3. 8-Point Spacing Scale'),
            const SizedBox(height: AppSpacing.sm),
            _buildSpacingScale(),
            const SizedBox(height: AppSpacing.xl),

            // 4. Buttons & Interactive States
            _buildSectionHeader('4. Buttons & Interactive States'),
            const SizedBox(height: AppSpacing.sm),
            _buildButtonsSection(),
            const SizedBox(height: AppSpacing.xl),

            // 5. Input Fields
            _buildSectionHeader('5. Standardized Text Inputs'),
            const SizedBox(height: AppSpacing.sm),
            _buildInputsSection(),
            const SizedBox(height: AppSpacing.xl),

            // 6. Health Metric Cards (Generic)
            _buildSectionHeader('6. Health Metric Cards (Generic)'),
            const SizedBox(height: AppSpacing.sm),
            _buildMetricCardsSection(),
            const SizedBox(height: AppSpacing.xl),

            // 7. Status Badges & Chips
            _buildSectionHeader('7. Status Badges & Chips'),
            const SizedBox(height: AppSpacing.sm),
            _buildBadgesSection(),
            const SizedBox(height: AppSpacing.xl),

            // 8. Alerts & Emergency Banners
            _buildSectionHeader('8. Alert & Warning Banners'),
            const SizedBox(height: AppSpacing.sm),
            _buildAlertsSection(),
            const SizedBox(height: AppSpacing.xl),

            // 9. Loading Skeletons
            _buildSectionHeader('9. Animated Loading Skeletons (Native)'),
            const SizedBox(height: AppSpacing.sm),
            _buildSkeletonsSection(),
            const SizedBox(height: AppSpacing.xl),

            // 10. Empty State
            _buildSectionHeader('10. Empty State View'),
            const SizedBox(height: AppSpacing.sm),
            _buildEmptyStateSection(),
            const SizedBox(height: AppSpacing.xl),

            // 11. Error State
            _buildSectionHeader('11. Error State View'),
            const SizedBox(height: AppSpacing.sm),
            _buildErrorStateSection(),
            const SizedBox(height: AppSpacing.xxl),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: AppTypography.titleLarge),
        const SizedBox(height: AppSpacing.xs),
        const Divider(),
      ],
    );
  }

  Widget _buildColorPalette() {
    return Wrap(
      spacing: AppSpacing.sm,
      runSpacing: AppSpacing.sm,
      children: [
        _colorChip('Primary', AppColors.primary, AppColors.onPrimary),
        _colorChip('Secondary', AppColors.secondary, AppColors.onSecondary),
        _colorChip(
          'Surface',
          AppColors.surface,
          AppColors.textPrimary,
          hasBorder: true,
        ),
        _colorChip(
          'Background',
          AppColors.background,
          AppColors.textPrimary,
          hasBorder: true,
        ),
        _colorChip('Success', AppColors.success, AppColors.onSuccess),
        _colorChip('Warning', AppColors.warning, AppColors.onWarning),
        _colorChip('Error', AppColors.error, AppColors.onError),
        _colorChip('Info', AppColors.info, AppColors.onInfo),
        _colorChip('Emergency', AppColors.emergency, AppColors.onEmergency),
        _colorChip('Critical', AppColors.critical, AppColors.onEmergency),
        _colorChip('Neutral', AppColors.neutral, Colors.white),
      ],
    );
  }

  Widget _colorChip(
    String label,
    Color bg,
    Color text, {
    bool hasBorder = false,
  }) {
    return Container(
      width: 100,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: AppRadius.roundedMd,
        border: hasBorder ? Border.all(color: AppColors.border) : null,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 4,
            width: 20,
            decoration: BoxDecoration(
              color: text.withValues(alpha: 0.5),
              borderRadius: AppRadius.roundedSm,
            ),
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            label,
            style: AppTypography.labelSmall.copyWith(
              color: text,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTypographyScale() {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.roundedLg,
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Display Large 32px Bold', style: AppTypography.displayLarge),
          const SizedBox(height: AppSpacing.xs),
          Text('Display Medium 26px Bold', style: AppTypography.displayMedium),
          const SizedBox(height: AppSpacing.xs),
          Text(
            'Headline Large 22px SemiBold',
            style: AppTypography.headlineLarge,
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            'Headline Medium 18px SemiBold',
            style: AppTypography.headlineMedium,
          ),
          const SizedBox(height: AppSpacing.xs),
          Text('Title Large 16px SemiBold', style: AppTypography.titleLarge),
          const SizedBox(height: AppSpacing.xs),
          Text(
            'Body Large 16px Regular — readable clinical encounter history note text.',
            style: AppTypography.bodyLarge,
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            'Body Medium 14px Regular — secondary descriptive patient information.',
            style: AppTypography.bodyMedium,
          ),
          const SizedBox(height: AppSpacing.xs),
          Text('Label Large 14px SemiBold', style: AppTypography.labelLarge),
          const SizedBox(height: AppSpacing.xs),
          Text('Metric Value: O+ (Historic)', style: AppTypography.metricValue),
        ],
      ),
    );
  }

  Widget _buildSpacingScale() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        _spacingBox('xs (4)', AppSpacing.xs),
        _spacingBox('sm (8)', AppSpacing.sm),
        _spacingBox('md (16)', AppSpacing.md),
        _spacingBox('lg (24)', AppSpacing.lg),
        _spacingBox('xl (32)', AppSpacing.xl),
      ],
    );
  }

  Widget _spacingBox(String label, double size) {
    return Column(
      children: [
        Container(
          width: size,
          height: 36,
          decoration: BoxDecoration(
            color: AppColors.primaryContainer,
            borderRadius: AppRadius.roundedSm,
            border: Border.all(color: AppColors.primaryLight),
          ),
        ),
        const SizedBox(height: 4),
        Text(label, style: AppTypography.labelSmall.copyWith(fontSize: 10)),
      ],
    );
  }

  Widget _buildButtonsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: AppSpacing.md,
          runSpacing: AppSpacing.sm,
          children: [
            AppButton(label: 'Primary Action', onPressed: () {}),
            AppButton(
              label: 'Secondary',
              variant: AppButtonVariant.secondary,
              onPressed: () {},
            ),
            AppButton(
              label: 'Outline',
              variant: AppButtonVariant.outline,
              onPressed: () {},
            ),
            AppButton(
              label: 'Emergency / Destructive',
              variant: AppButtonVariant.destructive,
              icon: Icons.emergency,
              onPressed: () {},
            ),
            AppButton(
              label: _isLoadingButton ? 'Saving...' : 'Toggle Loading',
              isLoading: _isLoadingButton,
              onPressed: () {
                setState(() => _isLoadingButton = !_isLoadingButton);
                Future.delayed(const Duration(seconds: 2), () {
                  if (mounted) setState(() => _isLoadingButton = false);
                });
              },
            ),
            const AppButton(label: 'Disabled Button', onPressed: null),
          ],
        ),
      ],
    );
  }

  Widget _buildInputsSection() {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.roundedLg,
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          const AppTextField(
            label: 'Full Name',
            hintText: 'Enter patient full legal name',
            prefixIcon: Icon(Icons.person_outline, size: 20),
          ),
          const SizedBox(height: AppSpacing.md),
          const AppTextField(
            label: 'Health ID Number',
            hintText: 'e.g. AHC-26-84X71K',
            prefixIcon: Icon(Icons.badge_outlined, size: 20),
            helperText: 'Platform assigned unique identifier',
          ),
          const SizedBox(height: AppSpacing.md),
          const AppTextField(
            label: 'Validation Error State',
            hintText: 'Required medical field',
            errorText:
                'This profile field is required for emergency readiness.',
          ),
          const SizedBox(height: AppSpacing.md),
          const AppTextField(
            label: 'Disabled Input',
            hintText: 'Non-editable stored data',
            enabled: false,
            prefixIcon: Icon(Icons.lock_outline, size: 20),
          ),
        ],
      ),
    );
  }

  Widget _buildMetricCardsSection() {
    return const Column(
      children: [
        Row(
          children: [
            Expanded(
              child: HealthMetricCard(
                title: 'Blood Group',
                value: 'O+',
                subtitle: 'Stored historic value',
                icon: Icons.water_drop_outlined,
                iconColor: AppColors.emergency,
                iconBackgroundColor: AppColors.emergencyLight,
              ),
            ),
            SizedBox(width: AppSpacing.md),
            Expanded(
              child: HealthMetricCard(
                title: 'Allergies',
                value: '2 Listed',
                subtitle: 'Penicillin, Peanuts',
                icon: Icons.warning_amber_outlined,
                iconColor: AppColors.warning,
                iconBackgroundColor: AppColors.warningLight,
                trailingBadge: StatusBadge(
                  label: 'Critical',
                  variant: StatusBadgeVariant.warning,
                  icon: Icons.warning_amber_rounded,
                ),
              ),
            ),
          ],
        ),
        SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: HealthMetricCard(
                title: 'Conditions',
                value: '1 Active',
                subtitle: 'Hypertension',
                icon: Icons.favorite_border,
                iconColor: AppColors.secondary,
                iconBackgroundColor: AppColors.secondaryContainer,
              ),
            ),
            SizedBox(width: AppSpacing.md),
            Expanded(
              child: HealthMetricCard(
                title: 'Recent Reports',
                value: '4 Files',
                subtitle: 'Chest X-Ray analyzed',
                icon: Icons.description_outlined,
                iconColor: AppColors.primary,
                iconBackgroundColor: AppColors.primaryContainer,
                trailingBadge: StatusBadge(
                  label: 'AI Ready',
                  variant: StatusBadgeVariant.info,
                  icon: Icons.auto_awesome,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildBadgesSection() {
    return Wrap(
      spacing: AppSpacing.sm,
      runSpacing: AppSpacing.sm,
      children: [
        StatusBadge.approved(),
        StatusBadge.pending(),
        StatusBadge.revoked(),
        StatusBadge.emergency(),
        StatusBadge.aiReview(),
        const StatusBadge(
          label: 'Neutral Badge',
          variant: StatusBadgeVariant.neutral,
          showDot: true,
        ),
        const StatusBadge(
          label: 'Critical Alert',
          variant: StatusBadgeVariant.critical,
          showDot: true,
        ),
      ],
    );
  }

  Widget _buildAlertsSection() {
    return Column(
      children: [
        if (_showAlert)
          AlertCard(
            variant: AlertCardVariant.emergency,
            title: 'Emergency Break-Glass Logged',
            message:
                'Dr. Sarah Jenkins accessed critical profile summary at Metro General ICU. Reason: Acute unconscious trauma.',
            action: TextButton(
              onPressed: () {},
              child: const Text(
                'View Audit Details',
                style: TextStyle(
                  color: AppColors.emergency,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            onDismiss: () => setState(() => _showAlert = false),
          ),
        const SizedBox(height: AppSpacing.md),
        const AlertCard(
          variant: AlertCardVariant.warning,
          title: 'AI Decision Support Disclaimer',
          message:
              'AI findings are clinical decision support, not definitive diagnoses. All results must be reviewed by qualified clinicians.',
        ),
        const SizedBox(height: AppSpacing.md),
        const AlertCard(
          variant: AlertCardVariant.info,
          title: 'Pending Consent Request',
          message:
              'City Heart Hospital requests 24h scoped access to your recent cardiology reports and encounter history.',
        ),
        const SizedBox(height: AppSpacing.md),
        const AlertCard(
          variant: AlertCardVariant.success,
          title: 'Health Card Synchronized',
          message:
              'Your emergency health profile is up to date and ready for offline card export.',
        ),
      ],
    );
  }

  Widget _buildSkeletonsSection() {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.roundedLg,
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              LoadingSkeleton.circular(size: 48),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    LoadingSkeleton.text(width: 140, height: 16),
                    const SizedBox(height: AppSpacing.xs),
                    LoadingSkeleton.text(width: 200, height: 12),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          LoadingSkeleton.card(height: 70),
        ],
      ),
    );
  }

  Widget _buildEmptyStateSection() {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.roundedLg,
        border: Border.all(color: AppColors.border),
      ),
      child: EmptyStateView(
        icon: Icons.history_edu_outlined,
        title: 'No Medical Encounters Yet',
        message:
            'When authorized doctors examine you, new longitudinal encounter notes and diagnoses will appear here.',
        isCompact: true,
        action: AppButton(
          label: 'Learn About Encounters',
          size: AppButtonSize.small,
          variant: AppButtonVariant.outline,
          onPressed: () {},
        ),
      ),
    );
  }

  Widget _buildErrorStateSection() {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.roundedLg,
        border: Border.all(color: AppColors.border),
      ),
      child: ErrorStateView(
        title: 'Report Preview Unavailable',
        message:
            'Unable to decrypt diagnostic report file securely. Please verify your connection or try again.',
        onRetry: () {},
      ),
    );
  }
}
