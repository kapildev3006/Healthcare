import 'package:flutter/material.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';

/// Visual Explainability (Grad-CAM) Screen matching design-references/patient/ai-explainability.png.
class AiExplainabilityScreen extends StatefulWidget {
  final String reportId;

  const AiExplainabilityScreen({super.key, required this.reportId});

  @override
  State<AiExplainabilityScreen> createState() => _AiExplainabilityScreenState();
}

class _AiExplainabilityScreenState extends State<AiExplainabilityScreen> {
  String _displayMode = 'Heatmap Overlay';
  double _opacity = 0.65;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          'Visual Explainability (Grad-CAM)',
          style: AppTypography.titleLarge.copyWith(
            fontWeight: FontWeight.w800,
            color: Colors.white,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Saliency Heatmap Canvas
            Container(
              width: double.infinity,
              height: 280,
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(AppRadius.lg),
                border: Border.all(color: const Color(0xFF334155)),
              ),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // Simulated base chest x-ray background
                  Icon(
                    Icons.document_scanner,
                    size: 140,
                    color: Colors.white.withValues(
                      alpha: _displayMode == 'Heatmap Overlay' ? 0.4 : 0.8,
                    ),
                  ),

                  // Simulated Grad-CAM heatmap glow
                  if (_displayMode != 'Original X-Ray')
                    Positioned.fill(
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(AppRadius.lg),
                          gradient: RadialGradient(
                            center: const Alignment(0.1, 0.2),
                            radius: 0.7,
                            colors: [
                              Colors.red.withValues(alpha: _opacity * 0.85),
                              Colors.orange.withValues(alpha: _opacity * 0.6),
                              Colors.yellow.withValues(alpha: _opacity * 0.3),
                              Colors.transparent,
                            ],
                            stops: const [0.0, 0.35, 0.6, 1.0],
                          ),
                        ),
                      ),
                    ),

                  // Bounding annotations
                  if (_displayMode != 'Original X-Ray')
                    Positioned(
                      top: 110,
                      left: 120,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 6,
                          vertical: 2,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.red.withValues(alpha: 0.8),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: const Text(
                          'Region of Interest (Weight: 0.84)',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),

                  Positioned(
                    bottom: 12,
                    left: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.black.withValues(alpha: 0.7),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        _displayMode,
                        style: AppTypography.labelSmall.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.lg),

            // Mode Selector
            Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(AppRadius.md),
              ),
              child: Row(
                children: [
                  _buildModeButton('Original X-Ray'),
                  _buildModeButton('Heatmap Overlay'),
                  _buildModeButton('Saliency Mask'),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.lg),

            // Opacity Slider
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(AppRadius.md),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Heatmap Saliency Opacity',
                        style: AppTypography.labelMedium.copyWith(
                          color: const Color(0xFF94A3B8),
                        ),
                      ),
                      Text(
                        '${(_opacity * 100).toInt()}%',
                        style: AppTypography.labelMedium.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                  Slider(
                    value: _opacity,
                    min: 0.0,
                    max: 1.0,
                    activeColor: AppColors.primary,
                    inactiveColor: const Color(0xFF334155),
                    onChanged: (val) => setState(() => _opacity = val),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.lg),

            // Feature Attribution Breakdown
            Container(
              padding: const EdgeInsets.all(AppSpacing.lg),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(AppRadius.lg),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'WHY DID THE MODEL HIGHLIGHT THESE REGIONS?',
                    style: AppTypography.labelSmall.copyWith(
                      color: const Color(0xFF94A3B8),
                      fontWeight: FontWeight.w700,
                      letterSpacing: 1.1,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  _buildReasonItem(
                    title: 'Bilateral Lower Zone Bronchial Cuffing',
                    description:
                        'The convolutional layers in DenseNet detected higher activation gradients around peribronchial tissues, indicating inflammation.',
                    weight: '84% Attribution',
                    color: const Color(0xFFEF4444),
                  ),
                  const Divider(height: 20, color: Color(0xFF334155)),
                  _buildReasonItem(
                    title: 'Basal Lung Field Hyperinflation',
                    description:
                        'Slight diaphragm depression captured features typical of air trapping during reactive airway constriction.',
                    weight: '62% Attribution',
                    color: const Color(0xFFF59E0B),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl),

            // Notice
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: const Color(0xFF0F2537),
                borderRadius: BorderRadius.circular(AppRadius.md),
                border: Border.all(color: const Color(0xFF1E4976)),
              ),
              child: Row(
                children: [
                  const Icon(
                    Icons.shield_outlined,
                    color: Color(0xFF38BDF8),
                    size: 22,
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Text(
                      'Gradient-weighted Class Activation Mapping (Grad-CAM) helps radiologists inspect the exact visual regions driving the model prediction.',
                      style: AppTypography.bodySmall.copyWith(
                        color: const Color(0xFFBAE6FD),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildModeButton(String mode) {
    final isSelected = _displayMode == mode;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _displayMode = mode),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSelected ? AppColors.primary : Colors.transparent,
            borderRadius: BorderRadius.circular(AppRadius.sm),
          ),
          child: Text(
            mode,
            textAlign: TextAlign.center,
            style: AppTypography.labelSmall.copyWith(
              color: isSelected ? Colors.white : const Color(0xFF94A3B8),
              fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildReasonItem({
    required String title,
    required String description,
    required String weight,
    required Color color,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Text(
                title,
                style: AppTypography.titleSmall.copyWith(
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                weight,
                style: AppTypography.labelSmall.copyWith(
                  color: color,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          description,
          style: AppTypography.bodySmall.copyWith(
            color: const Color(0xFF94A3B8),
            height: 1.4,
          ),
        ),
      ],
    );
  }
}
