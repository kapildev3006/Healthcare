import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../shared/providers/patient_providers.dart';

/// Access Request Detail Screen matching design-references/patient/access-request-detail.png.
class AccessRequestDetailScreen extends ConsumerStatefulWidget {
  final String requestId;

  const AccessRequestDetailScreen({super.key, required this.requestId});

  @override
  ConsumerState<AccessRequestDetailScreen> createState() =>
      _AccessRequestDetailScreenState();
}

class _AccessRequestDetailScreenState
    extends ConsumerState<AccessRequestDetailScreen> {
  bool _scopeDemographics = true;
  bool _scopeAllergies = true;
  bool _scopeMedications = true;
  bool _scopeReports = true;

  @override
  Widget build(BuildContext context) {
    final allRequests = ref.watch(accessRequestsProvider);
    final req = allRequests.firstWhere(
      (r) => r.id == widget.requestId,
      orElse: () => allRequests.first,
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
          'Consent Details',
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
            // Clinician Identity Card
            Container(
              padding: const EdgeInsets.all(AppSpacing.lg),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(AppRadius.lg),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.03),
                    blurRadius: 10,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 28,
                    backgroundColor: AppColors.primary.withValues(alpha: 0.1),
                    child: const Icon(
                      Icons.medical_services,
                      color: AppColors.primary,
                      size: 28,
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
                                req.doctorName,
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
                        const SizedBox(height: 2),
                        Text(
                          req.hospitalName,
                          style: AppTypography.bodySmall.copyWith(
                            color: const Color(0xFF64748B),
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Verified Medical Council License',
                          style: AppTypography.labelSmall.copyWith(
                            color: const Color(0xFF16A34A),
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.lg),

            // Clinical Purpose
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
                    'CLINICAL JUSTIFICATION & PURPOSE',
                    style: AppTypography.labelSmall.copyWith(
                      color: const Color(0xFF94A3B8),
                      fontWeight: FontWeight.w700,
                      letterSpacing: 1.1,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    req.purpose,
                    style: AppTypography.bodyMedium.copyWith(
                      color: const Color(0xFF1E293B),
                      height: 1.4,
                    ),
                  ),
                  const Divider(height: 24, color: Color(0xFFF1F5F9)),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Access Validity:',
                        style: AppTypography.bodySmall.copyWith(
                          color: const Color(0xFF64748B),
                        ),
                      ),
                      Text(
                        req.expiryTime,
                        style: AppTypography.titleSmall.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.lg),

            // Granular Scope Controls
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
                    'REQUESTED MEDICAL DATA SCOPES',
                    style: AppTypography.labelSmall.copyWith(
                      color: const Color(0xFF94A3B8),
                      fontWeight: FontWeight.w700,
                      letterSpacing: 1.1,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Material(
                    color: Colors.transparent,
                    child: CheckboxListTile(
                      contentPadding: EdgeInsets.zero,
                      title: const Text('Demographics & Health ID'),
                      subtitle: const Text(
                        'Name, age, blood group, emergency contacts',
                      ),
                      value: _scopeDemographics,
                      activeColor: AppColors.primary,
                      onChanged: (val) =>
                          setState(() => _scopeDemographics = val ?? true),
                    ),
                  ),
                  const Divider(height: 1, color: Color(0xFFF1F5F9)),
                  Material(
                    color: Colors.transparent,
                    child: CheckboxListTile(
                      contentPadding: EdgeInsets.zero,
                      title: const Text('Allergies & Chronic Diseases'),
                      subtitle: const Text(
                        'Known drug allergens, asthma history',
                      ),
                      value: _scopeAllergies,
                      activeColor: AppColors.primary,
                      onChanged: (val) =>
                          setState(() => _scopeAllergies = val ?? true),
                    ),
                  ),
                  const Divider(height: 1, color: Color(0xFFF1F5F9)),
                  Material(
                    color: Colors.transparent,
                    child: CheckboxListTile(
                      contentPadding: EdgeInsets.zero,
                      title: const Text('Current Medications'),
                      subtitle: const Text(
                        'Active prescriptions, dosage, and frequency',
                      ),
                      value: _scopeMedications,
                      activeColor: AppColors.primary,
                      onChanged: (val) =>
                          setState(() => _scopeMedications = val ?? true),
                    ),
                  ),
                  const Divider(height: 1, color: Color(0xFFF1F5F9)),
                  Material(
                    color: Colors.transparent,
                    child: CheckboxListTile(
                      contentPadding: EdgeInsets.zero,
                      title: const Text('Diagnostic Reports & Imaging'),
                      subtitle: const Text(
                        'Lab tests, chest radiographs, AI decision support',
                      ),
                      value: _scopeReports,
                      activeColor: AppColors.primary,
                      onChanged: (val) =>
                          setState(() => _scopeReports = val ?? true),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.lg),

            // Legal & Security Disclaimer
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
                    Icons.security,
                    color: Color(0xFF16A34A),
                    size: 22,
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Text(
                      'All accesses are logged to your immutable audit trail. You can revoke access at any time before expiration.',
                      style: AppTypography.bodySmall.copyWith(
                        color: const Color(0xFF166534),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl),

            // Action Buttons
            AppButton(
              label: 'Approve Scoped Consent',
              onPressed: () {
                ref
                    .read(accessRequestsProvider.notifier)
                    .approveRequest(req.id);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Access approved for ${req.doctorName}'),
                  ),
                );
                Navigator.of(context).pop();
              },
            ),
            const SizedBox(height: AppSpacing.sm),
            OutlinedButton(
              style: OutlinedButton.styleFrom(
                minimumSize: const Size(double.infinity, 48),
                foregroundColor: const Color(0xFFDC2626),
                side: const BorderSide(color: Color(0xFFFCA5A5)),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(AppRadius.md),
                ),
              ),
              onPressed: () {
                ref.read(accessRequestsProvider.notifier).denyRequest(req.id);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Access denied for ${req.doctorName}'),
                  ),
                );
                Navigator.of(context).pop();
              },
              child: const Text('Decline Request'),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}
