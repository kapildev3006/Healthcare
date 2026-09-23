import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../core/dialogs/patient_dialogs.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../shared/models/patient_models.dart';
import '../../../shared/providers/patient_providers.dart';

/// Upload Medical Report Screen matching design-references/patient/upload-report.png.
class UploadReportScreen extends ConsumerStatefulWidget {
  const UploadReportScreen({super.key});

  @override
  ConsumerState<UploadReportScreen> createState() => _UploadReportScreenState();
}

class _UploadReportScreenState extends ConsumerState<UploadReportScreen> {
  final TextEditingController _titleController = TextEditingController(
    text: 'Chest X-Ray PA View',
  );
  final TextEditingController _facilityController = TextEditingController(
    text: 'Max Super Speciality Hospital',
  );
  final TextEditingController _doctorController = TextEditingController(
    text: 'Dr. Rajesh Sharma',
  );
  RecordCategory _selectedCategory = RecordCategory.imaging;
  bool _requestAiAnalysis = true;
  bool _isUploading = false;
  double _uploadProgress = 0.0;
  String? _selectedFileName = 'chest_xray_pa_view.pdf';

  @override
  void dispose() {
    _titleController.dispose();
    _facilityController.dispose();
    _doctorController.dispose();
    super.dispose();
  }

  void _simulateUpload() async {
    setState(() {
      _isUploading = true;
      _uploadProgress = 0.1;
    });

    for (int i = 1; i <= 10; i++) {
      await Future.delayed(const Duration(milliseconds: 100));
      if (!mounted) return;
      setState(() => _uploadProgress = i / 10.0);
    }

    if (!mounted) return;
    setState(() => _isUploading = false);

    // Append to Riverpod healthRecordsProvider
    final newRecord = HealthRecord(
      id: 'rec-${DateTime.now().millisecondsSinceEpoch}',
      title: _titleController.text.trim().isEmpty
          ? 'Medical Investigation'
          : _titleController.text.trim(),
      category: _selectedCategory,
      facilityName: _facilityController.text.trim().isEmpty
          ? 'General Diagnostics'
          : _facilityController.text.trim(),
      date: 'Today',
      fileSize: '3.8 MB',
      hasAiAnalysis: _requestAiAnalysis,
    );

    ref.read(healthRecordsProvider.notifier).addRecord(newRecord);

    await PatientDialogs.showReportUploadSuccessDialog(context: context);
    if (!mounted) return;
    context.pop();
  }

  @override
  Widget build(BuildContext context) {
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
          'Upload Medical Report',
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
            // Upload Drop Area
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(AppSpacing.xl),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(AppRadius.lg),
                border: Border.all(
                  color: AppColors.primary.withValues(alpha: 0.4),
                  width: 1.5,
                  style: BorderStyle.solid,
                ),
              ),
              child: Column(
                children: [
                  Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.1),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.cloud_upload_outlined,
                      size: 32,
                      color: AppColors.primary,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  Text(
                    _selectedFileName ?? 'Select or drop medical file',
                    style: AppTypography.titleMedium.copyWith(
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Supported formats: PDF, JPEG, PNG, DICOM (Max 25MB)',
                    style: AppTypography.bodySmall.copyWith(
                      color: const Color(0xFF64748B),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      OutlinedButton.icon(
                        icon: const Icon(Icons.camera_alt_outlined, size: 18),
                        label: const Text('Camera'),
                        onPressed: () {
                          setState(
                            () => _selectedFileName =
                                'scan_camera_${DateTime.now().minute}.jpg',
                          );
                        },
                      ),
                      const SizedBox(width: AppSpacing.md),
                      ElevatedButton.icon(
                        icon: const Icon(
                          Icons.folder_open,
                          size: 18,
                          color: Colors.white,
                        ),
                        label: const Text(
                          'Browse Files',
                          style: TextStyle(color: Colors.white),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                        ),
                        onPressed: () {
                          setState(
                            () =>
                                _selectedFileName = 'investigation_report.pdf',
                          );
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl),

            if (_isUploading) ...[
              Container(
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(AppRadius.md),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Encrypting & Uploading...',
                          style: AppTypography.labelMedium,
                        ),
                        Text(
                          '${(_uploadProgress * 100).toInt()}%',
                          style: AppTypography.labelMedium,
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    LinearProgressIndicator(
                      value: _uploadProgress,
                      backgroundColor: const Color(0xFFE2E8F0),
                      valueColor: const AlwaysStoppedAnimation(
                        AppColors.primary,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.xl),
            ],

            // Metadata Form
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
                    'REPORT METADATA',
                    style: AppTypography.labelSmall.copyWith(
                      color: const Color(0xFF94A3B8),
                      fontWeight: FontWeight.w700,
                      letterSpacing: 1.1,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),

                  AppTextField(
                    controller: _titleController,
                    label: 'Report Title',
                    hint: 'e.g. Complete Blood Count (CBC)',
                    prefixIcon: Icons.title,
                  ),
                  const SizedBox(height: AppSpacing.md),

                  // Category Dropdown
                  Text(
                    'Record Category',
                    style: AppTypography.labelMedium.copyWith(
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFF334155),
                    ),
                  ),
                  const SizedBox(height: 6),
                  DropdownButtonFormField<RecordCategory>(
                    initialValue: _selectedCategory,
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
                    items: RecordCategory.values.map((cat) {
                      return DropdownMenuItem(
                        value: cat,
                        child: Text(cat.displayName),
                      );
                    }).toList(),
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedCategory = val);
                    },
                  ),
                  const SizedBox(height: AppSpacing.md),

                  AppTextField(
                    controller: _facilityController,
                    label: 'Hospital / Diagnostic Lab',
                    hint: 'e.g. Max Healthcare, Dr. Lal PathLabs',
                    prefixIcon: Icons.local_hospital_outlined,
                  ),
                  const SizedBox(height: AppSpacing.md),

                  AppTextField(
                    controller: _doctorController,
                    label: 'Attending / Prescribing Doctor',
                    hint: 'e.g. Dr. Rajesh Sharma',
                    prefixIcon: Icons.person_outline,
                  ),
                  const SizedBox(height: AppSpacing.lg),

                  // AI Analysis Switch
                  Container(
                    padding: const EdgeInsets.all(AppSpacing.md),
                    decoration: BoxDecoration(
                      color: const Color(0xFFEFF6FF),
                      borderRadius: BorderRadius.circular(AppRadius.md),
                      border: Border.all(color: const Color(0xFFBFDBFE)),
                    ),
                    child: Row(
                      children: [
                        const Icon(
                          Icons.auto_awesome,
                          color: Color(0xFF2563EB),
                          size: 24,
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Run AI Decision Support',
                                style: AppTypography.titleSmall.copyWith(
                                  fontWeight: FontWeight.w700,
                                  color: const Color(0xFF1E3A8A),
                                ),
                              ),
                              Text(
                                'Extract findings and generate visual heatmap explainability.',
                                style: AppTypography.bodySmall.copyWith(
                                  color: const Color(0xFF3B82F6),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Switch(
                          value: _requestAiAnalysis,
                          activeThumbColor: const Color(0xFF2563EB),
                          onChanged: (val) =>
                              setState(() => _requestAiAnalysis = val),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl),

            AppButton(
              label: _isUploading ? 'Uploading...' : 'Save & Encrypt Report',
              isLoading: _isUploading,
              onPressed: _simulateUpload,
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}
