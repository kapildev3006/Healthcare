import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/app_spacing.dart';
import '../models/patient_home_data.dart';
import '../widgets/critical_health_summary.dart';
import '../widgets/digital_health_card_hero.dart';
import '../widgets/emergency_access_status_card.dart';
import '../widgets/home_header.dart';
import '../widgets/latest_reports_section.dart';
import '../widgets/patient_bottom_nav_bar.dart';
import '../widgets/pending_access_card.dart';
import '../widgets/quick_actions_row.dart';
import '../widgets/recent_activity_card.dart';

/// The Patient Home Dashboard screen matching the visual source of truth
/// at design-references/patient/home.png.
class PatientHomeScreen extends StatefulWidget {
  final PatientHomeData data;

  const PatientHomeScreen({super.key, this.data = kMockPatientHomeData});

  @override
  State<PatientHomeScreen> createState() => _PatientHomeScreenState();
}

class _PatientHomeScreenState extends State<PatientHomeScreen> {
  void _showDeclineConfirmation(
    BuildContext context,
    PendingAccessRequest request,
  ) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Decline Access Request?'),
        content: Text(
          'Are you sure you want to decline record access for ${request.requesterDoctor} at ${request.hospitalName}?',
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
                SnackBar(
                  content: Text(
                    'Access declined for ${request.requesterDoctor}',
                  ),
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
            child: const Text('Decline'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = widget.data;

    return Scaffold(
      backgroundColor: const Color(0xFFF6F8FC),
      bottomNavigationBar: PatientBottomNavBar(
        currentIndex: 0,
        onTabSelected: (index) {
          switch (index) {
            case 0:
              break;
            case 1:
              context.go('/medical-history');
              break;
            case 2:
              context.go('/health-card');
              break;
            case 3:
              context.go('/reports');
              break;
            case 4:
              context.go('/medical-profile');
              break;
          }
        },
        onHealthCardTap: () => context.go('/health-card'),
      ),
      body: SafeArea(
        bottom: false,
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: AppSpacing.sm,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Header with avatar, greeting, search, notifications
              HomeHeader(
                profile: data.profile,
                onSearchTap: () => context.push('/medical-history'),
                onNotificationsTap: () => context.push('/notifications'),
              ),
              const SizedBox(height: AppSpacing.md),

              // 2. Digital Health Card Hero Banner
              DigitalHealthCardHero(
                profile: data.profile,
                onShowQrTap: () => context.push('/health-card/qr'),
              ),
              const SizedBox(height: AppSpacing.md),

              // 3. Quick Actions Row (4 shortcuts)
              QuickActionsRow(
                onUploadReportTap: () => context.push('/reports/upload'),
                onAccessRequestsTap: () => context.push('/access-requests'),
                onMedicalProfileTap: () => context.push('/medical-profile'),
                onEmergencyTap: () => context.push('/emergency-info'),
              ),
              const SizedBox(height: AppSpacing.md),

              // 4. Critical Health Summary (Blood Group, Allergies, Conditions, Emergency Contact)
              CriticalHealthSummary(
                profile: data.profile,
                onHeaderTap: () => context.push('/medical-profile'),
              ),
              const SizedBox(height: AppSpacing.md),

              // 5. Pending Access Request Card
              PendingAccessCard(
                request: data.pendingAccess,
                onDeclineTap: () =>
                    _showDeclineConfirmation(context, data.pendingAccess),
                onReviewTap: () => context.push('/access-requests/req-1'),
                onCardTap: () => context.push('/access-requests/req-1'),
              ),
              const SizedBox(height: AppSpacing.md),

              // 6. Recent Medical Activity Card
              RecentActivityCard(
                activity: data.recentActivity,
                onHeaderTap: () => context.push('/medical-history'),
                onCardTap: () => context.push('/medical-history/enc-1'),
              ),
              const SizedBox(height: AppSpacing.md),

              // 7. Latest Reports & AI Analysis Section
              LatestReportsSection(
                report: data.latestReport,
                onHeaderTap: () => context.push('/reports'),
                onReportTap: () => context.push('/reports/rec-1'),
                onAiAnalysisTap: () => context.push('/ai-analysis/rec-1'),
              ),
              const SizedBox(height: AppSpacing.md),

              // 8. Emergency Access Status Banner
              EmergencyAccessStatusCard(
                status: data.emergencyStatus,
                onTap: () => context.push('/access-history'),
              ),
              const SizedBox(height: AppSpacing.xl),
            ],
          ),
        ),
      ),
    );
  }
}
