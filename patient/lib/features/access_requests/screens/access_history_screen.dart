import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../shared/models/patient_models.dart';
import '../../../shared/providers/patient_providers.dart';

/// Access History Screen matching design-references/patient/access-history.png.
class AccessHistoryScreen extends ConsumerStatefulWidget {
  final bool isEmbedded;

  const AccessHistoryScreen({super.key, this.isEmbedded = false});

  @override
  ConsumerState<AccessHistoryScreen> createState() =>
      _AccessHistoryScreenState();
}

class _AccessHistoryScreenState extends ConsumerState<AccessHistoryScreen> {
  String _filter = 'All';

  @override
  Widget build(BuildContext context) {
    final emergencySessions = ref.watch(emergencyAccessProvider);

    final content = Column(
      children: [
        // Filter Chips
        Container(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.lg,
            vertical: AppSpacing.sm,
          ),
          color: Colors.white,
          child: Row(
            children: [
              _buildFilterChip('All'),
              const SizedBox(width: 8),
              _buildFilterChip('Emergency'),
              const SizedBox(width: 8),
              _buildFilterChip('Consented'),
            ],
          ),
        ),
        const Divider(height: 1, color: Color(0xFFE2E8F0)),

        Expanded(
          child: ListView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            children: [
              // Emergency Break-Glass sessions from provider
              ...emergencySessions.map((session) {
                if (_filter == 'Consented') return const SizedBox.shrink();
                return _buildEmergencyAccessCard(context, session);
              }),

              // Normal Consented Access events
              if (_filter != 'Emergency') ...[
                _buildConsentedAccessCard(
                  doctor: 'Dr. Rajesh Sharma, MD',
                  hospital: 'Max Super Speciality Hospital, Delhi',
                  date: '12 Sep 2026, 10:30 AM',
                  purpose: 'Scheduled Pulmonology OPD Consultation',
                  scope: 'Allergies, Medications, X-Rays',
                  status: 'Active (Expires in 22h)',
                ),
                _buildConsentedAccessCard(
                  doctor: 'Dr. Sanjay Kapoor',
                  hospital: 'Dr. Lal PathLabs, Noida',
                  date: '10 Aug 2026, 08:45 AM',
                  purpose: 'Complete Blood Count & Allergy Screening',
                  scope: 'Lab Test Upload & History',
                  status: 'Expired (Completed)',
                ),
                _buildConsentedAccessCard(
                  doctor: 'Dr. Priya Desai',
                  hospital: 'Fortis Escorts Heart Institute',
                  date: '02 Jun 2026, 04:15 PM',
                  purpose: 'Annual Health Checkup & ECG Review',
                  scope: 'General Demographics & Vitals',
                  status: 'Expired (Completed)',
                ),
              ],
              const SizedBox(height: 40),
            ],
          ),
        ),
      ],
    );

    if (widget.isEmbedded) {
      return content;
    }

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
          'Access History & Audit',
          style: AppTypography.headlineSmall.copyWith(
            fontWeight: FontWeight.w800,
            color: const Color(0xFF0F172A),
          ),
        ),
      ),
      body: content,
    );
  }

  Widget _buildFilterChip(String label) {
    final isSelected = _filter == label;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      onSelected: (_) => setState(() => _filter = label),
      selectedColor: AppColors.primary,
      backgroundColor: const Color(0xFFF1F5F9),
      labelStyle: AppTypography.labelMedium.copyWith(
        color: isSelected ? Colors.white : const Color(0xFF475569),
        fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
      ),
    );
  }

  Widget _buildEmergencyAccessCard(
    BuildContext context,
    EmergencyAccessSession session,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.md),
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppRadius.lg),
        border: Border.all(color: const Color(0xFFFCA5A5)),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFFEF4444).withValues(alpha: 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFFFEF2F2),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: const Color(0xFFFECACA)),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(
                      Icons.warning_amber_rounded,
                      size: 14,
                      color: Color(0xFFDC2626),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      'EMERGENCY BREAK-GLASS',
                      style: AppTypography.labelSmall.copyWith(
                        color: const Color(0xFFDC2626),
                        fontWeight: FontWeight.w800,
                        fontSize: 10,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Flexible(
                child: Text(
                  session.timestamp,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.end,
                  style: AppTypography.labelSmall.copyWith(
                    color: const Color(0xFF64748B),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            session.doctorName,
            style: AppTypography.titleMedium.copyWith(
              fontWeight: FontWeight.w800,
              color: const Color(0xFF0F172A),
            ),
          ),
          Text(
            session.hospitalName,
            style: AppTypography.bodySmall.copyWith(
              color: const Color(0xFF64748B),
            ),
          ),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFFFFFBEB),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Text(
              'Reason: ${session.reason}',
              style: AppTypography.bodySmall.copyWith(
                color: const Color(0xFF92400E),
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          const Divider(height: 20, color: Color(0xFFF1F5F9)),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  'Audit ID: ${session.id}',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: AppTypography.labelSmall.copyWith(
                    color: const Color(0xFF94A3B8),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              TextButton(
                onPressed: () =>
                    context.push('/emergency-access/${session.id}'),
                child: const Text('View Full Incident Report'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildConsentedAccessCard({
    required String doctor,
    required String hospital,
    required String date,
    required String purpose,
    required String scope,
    required String status,
  }) {
    final isActive = status.contains('Active');

    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.md),
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: isActive
                      ? const Color(0xFFEFF6FF)
                      : const Color(0xFFF1F5F9),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  'Consented Access',
                  style: AppTypography.labelSmall.copyWith(
                    color: isActive
                        ? const Color(0xFF2563EB)
                        : const Color(0xFF64748B),
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              Text(
                date,
                style: AppTypography.labelSmall.copyWith(
                  color: const Color(0xFF64748B),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            doctor,
            style: AppTypography.titleSmall.copyWith(
              fontWeight: FontWeight.w800,
              color: const Color(0xFF0F172A),
            ),
          ),
          Text(
            hospital,
            style: AppTypography.bodySmall.copyWith(
              color: const Color(0xFF64748B),
            ),
          ),
          const SizedBox(height: 6),
          Text(
            'Purpose: $purpose',
            style: AppTypography.bodySmall.copyWith(
              color: const Color(0xFF334155),
            ),
          ),
          const Divider(height: 20, color: Color(0xFFF1F5F9)),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  'Scope: $scope',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: AppTypography.labelSmall.copyWith(
                    color: const Color(0xFF64748B),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                status,
                style: AppTypography.labelSmall.copyWith(
                  color: isActive
                      ? const Color(0xFF16A34A)
                      : const Color(0xFF94A3B8),
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
