import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../core/dialogs/patient_dialogs.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../shared/providers/patient_providers.dart';

/// Share Report Screen matching design-references/patient/share-report.png.
class ShareReportScreen extends ConsumerStatefulWidget {
  final String reportId;

  const ShareReportScreen({super.key, required this.reportId});

  @override
  ConsumerState<ShareReportScreen> createState() => _ShareReportScreenState();
}

class _ShareReportScreenState extends ConsumerState<ShareReportScreen> {
  final TextEditingController _doctorController = TextEditingController(
    text: 'Dr. Rajesh Sharma',
  );
  final TextEditingController _hospitalController = TextEditingController(
    text: 'Max Super Speciality Hospital',
  );
  String _selectedDuration = '24 Hours';
  bool _allowDownload = true;
  bool _includeAiAnalysis = true;

  @override
  void dispose() {
    _doctorController.dispose();
    _hospitalController.dispose();
    super.dispose();
  }

  void _shareReport() async {
    await PatientDialogs.showReportSharedSuccessDialog(
      context: context,
      recipientName: _doctorController.text.trim().isEmpty
          ? 'Selected Doctor'
          : _doctorController.text.trim(),
    );
    if (!mounted) return;
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final records = ref.watch(healthRecordsProvider);
    final record = records.firstWhere(
      (r) => r.id == widget.reportId,
      orElse: () => records.first,
    );

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
          'Share Record',
          style: AppTypography.headlineSmall.copyWith(
            fontWeight: FontWeight.w800,
            color: const Color(0xFF0F172A),
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Selected Report Overview Card
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(AppRadius.lg),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(
                      Icons.description,
                      color: AppColors.primary,
                      size: 28,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          record.title,
                          style: AppTypography.titleMedium.copyWith(
                            fontWeight: FontWeight.w800,
                            color: const Color(0xFF0F172A),
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          '${record.facility} • ${record.date}',
                          style: AppTypography.bodySmall.copyWith(
                            color: const Color(0xFF64748B),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl),

            // Recipient & Scope Form
            Container(
              padding: const EdgeInsets.all(AppSpacing.lg),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(AppRadius.lg),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.02),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'RECIPIENT CLINICIAN / HOSPITAL',
                    style: AppTypography.labelSmall.copyWith(
                      color: const Color(0xFF94A3B8),
                      fontWeight: FontWeight.w700,
                      letterSpacing: 1.1,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),

                  AppTextField(
                    controller: _doctorController,
                    label: 'Doctor Name or National Health Reg No.',
                    hint: 'e.g. Dr. Rajesh Sharma',
                    prefixIcon: Icons.person_outline,
                  ),
                  const SizedBox(height: AppSpacing.md),

                  AppTextField(
                    controller: _hospitalController,
                    label: 'Hospital / Facility',
                    hint: 'e.g. Max Healthcare, Delhi',
                    prefixIcon: Icons.local_hospital_outlined,
                  ),
                  const SizedBox(height: AppSpacing.lg),

                  Text(
                    'Access Validity Duration',
                    style: AppTypography.labelMedium.copyWith(
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFF334155),
                    ),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String>(
                    initialValue: _selectedDuration,
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(AppRadius.md),
                        borderSide: const BorderSide(color: Color(0xFFCBD5E1)),
                      ),
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 12,
                      ),
                    ),
                    items: const [
                      DropdownMenuItem(
                        value: '1 Hour',
                        child: Text('1 Hour (Urgent Consultation)'),
                      ),
                      DropdownMenuItem(
                        value: '24 Hours',
                        child: Text('24 Hours (Standard OPD)'),
                      ),
                      DropdownMenuItem(
                        value: '7 Days',
                        child: Text('7 Days (Follow-up Period)'),
                      ),
                      DropdownMenuItem(
                        value: '30 Days',
                        child: Text('30 Days (Ongoing Treatment)'),
                      ),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedDuration = val);
                    },
                  ),
                  const SizedBox(height: AppSpacing.lg),

                  // Permission Toggles
                  Material(
                    color: Colors.transparent,
                    child: SwitchListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(
                        'Allow PDF / Artifact Download',
                        style: AppTypography.titleSmall.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      subtitle: Text(
                        'Allows clinician to save an offline copy for their hospital record.',
                        style: AppTypography.bodySmall.copyWith(
                          color: const Color(0xFF64748B),
                        ),
                      ),
                      value: _allowDownload,
                      activeThumbColor: AppColors.primary,
                      onChanged: (val) => setState(() => _allowDownload = val),
                    ),
                  ),
                  const Divider(height: 20, color: Color(0xFFF1F5F9)),
                  Material(
                    color: Colors.transparent,
                    child: SwitchListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(
                        'Include AI Decision Support Heatmap',
                        style: AppTypography.titleSmall.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      subtitle: Text(
                        'Include AI explainability observations and confidence flags.',
                        style: AppTypography.bodySmall.copyWith(
                          color: const Color(0xFF64748B),
                        ),
                      ),
                      value: _includeAiAnalysis,
                      activeThumbColor: AppColors.primary,
                      onChanged: (val) =>
                          setState(() => _includeAiAnalysis = val),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl),

            // Consent Security Notice
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: const Color(0xFFF0FDF4),
                borderRadius: BorderRadius.circular(AppRadius.md),
                border: Border.all(color: const Color(0xFFBBF7D0)),
              ),
              child: Row(
                children: [
                  const Icon(
                    Icons.shield_outlined,
                    color: Color(0xFF16A34A),
                    size: 22,
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Text(
                      'Access tokens are cryptographically scoped and can be revoked at any time from your Access History dashboard.',
                      style: AppTypography.bodySmall.copyWith(
                        color: const Color(0xFF166534),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl),

            AppButton(
              label: 'Grant & Send Access Token',
              onPressed: _shareReport,
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}
