import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../access_requests/screens/access_history_screen.dart';
import '../../emergency/screens/emergency_info_screen.dart';
import '../../home/widgets/patient_bottom_nav_bar.dart';
import '../models/health_card_data.dart';
import '../widgets/card_action_buttons.dart';
import '../widgets/digital_health_card_view.dart';
import '../widgets/health_card_app_bar.dart';
import '../widgets/health_card_summary_cards.dart';
import '../widgets/health_card_tabs.dart';
import '../widgets/personal_information_section.dart';

/// The Digital Health Card screen matching design-references/patient/health-card.png.
class HealthCardScreen extends StatefulWidget {
  final HealthCardData data;

  const HealthCardScreen({super.key, this.data = kMockHealthCardData});

  @override
  State<HealthCardScreen> createState() => _HealthCardScreenState();
}

class _HealthCardScreenState extends State<HealthCardScreen> {
  int _selectedTabIndex = 0;

  void _showDownloadDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Row(
          children: const [
            Icon(Icons.check_circle_rounded, color: Color(0xFF16A34A)),
            SizedBox(width: 8),
            Text('Card Downloaded'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text(
              'Your official Digital Health Card has been saved successfully as a secured PDF file.',
              style: TextStyle(fontSize: 14, color: Color(0xFF334155)),
            ),
            SizedBox(height: 12),
            Text(
              'File: AHC-26-84X71K-HealthCard.pdf\nLocation: Device Downloads\nSecurity: AES-256 ABDM Verified',
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
  }

  void _showShareDialog(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.xl),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Share Health Card Token',
                style: AppTypography.titleLarge.copyWith(
                  fontWeight: FontWeight.w800,
                  color: const Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Provide temporary read access to authorized healthcare professionals.',
                style: TextStyle(color: Color(0xFF64748B), fontSize: 13),
              ),
              const SizedBox(height: AppSpacing.lg),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFFF1F5F9),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: const Color(0xFFCBD5E1)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.link, color: AppColors.primary),
                    const SizedBox(width: 8),
                    const Expanded(
                      child: Text(
                        'https://app.aihealthcare.org/e/ahc-26-84x71k-temp',
                        style: TextStyle(
                          fontSize: 12,
                          fontFamily: 'monospace',
                          color: Color(0xFF0F172A),
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.of(ctx).pop();
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text(
                              'Secure access token copied to clipboard!',
                            ),
                            duration: Duration(seconds: 2),
                            behavior: SnackBarBehavior.floating,
                          ),
                        );
                      },
                      child: const Text('Copy'),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                  icon: const Icon(Icons.send_rounded),
                  label: const Text('Share via App / Messaging'),
                  onPressed: () => Navigator.of(ctx).pop(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showCardOptionsMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(vertical: AppSpacing.md),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: const Color(0xFFCBD5E1),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: AppSpacing.md),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                child: Row(
                  children: [
                    const Icon(Icons.credit_card, color: AppColors.primary),
                    const SizedBox(width: 8),
                    Text(
                      'Health Card Options',
                      style: AppTypography.titleMedium.copyWith(
                        fontWeight: FontWeight.w800,
                        color: const Color(0xFF0F172A),
                      ),
                    ),
                  ],
                ),
              ),
              const Divider(height: 24),
              ListTile(
                leading: const Icon(
                  Icons.download_rounded,
                  color: Color(0xFF2563EB),
                ),
                title: const Text('Download Digital Card (PDF)'),
                subtitle: const Text(
                  'Export official AHC verified card for offline use',
                ),
                onTap: () {
                  Navigator.of(ctx).pop();
                  _showDownloadDialog(context);
                },
              ),
              ListTile(
                leading: const Icon(
                  Icons.share_rounded,
                  color: Color(0xFF16A34A),
                ),
                title: const Text('Share Health Card Link'),
                subtitle: const Text(
                  'Send revocable ABDM token to clinic or hospital',
                ),
                onTap: () {
                  Navigator.of(ctx).pop();
                  _showShareDialog(context);
                },
              ),
              ListTile(
                leading: const Icon(
                  Icons.qr_code_2_rounded,
                  color: Color(0xFF9333EA),
                ),
                title: const Text('View Fullscreen Dynamic QR'),
                subtitle: const Text(
                  'High brightness display for paramedic scanners',
                ),
                onTap: () {
                  Navigator.of(ctx).pop();
                  context.push('/health-card/qr');
                },
              ),
              ListTile(
                leading: const Icon(
                  Icons.emergency_rounded,
                  color: Color(0xFFDC2626),
                ),
                title: const Text('Emergency Information'),
                subtitle: const Text(
                  'Blood group, critical allergies & contacts',
                ),
                onTap: () {
                  Navigator.of(ctx).pop();
                  setState(() => _selectedTabIndex = 1);
                },
              ),
              ListTile(
                leading: const Icon(
                  Icons.history_edu_rounded,
                  color: Color(0xFF475569),
                ),
                title: const Text('Access History & Audit'),
                subtitle: const Text(
                  'Review break-glass and consented clinical access logs',
                ),
                onTap: () {
                  Navigator.of(ctx).pop();
                  setState(() => _selectedTabIndex = 2);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = widget.data;

    return Scaffold(
      backgroundColor: const Color(0xFFF6F8FC),
      appBar: HealthCardAppBar(
        onBackPressed: () {
          if (Navigator.of(context).canPop()) {
            Navigator.of(context).pop();
          } else {
            context.go('/home');
          }
        },
        onMoreOptionsPressed: () => _showCardOptionsMenu(context),
      ),
      bottomNavigationBar: PatientBottomNavBar(
        currentIndex: 2, // Health Card tab active
        onTabSelected: (index) {
          switch (index) {
            case 0:
              context.go('/home');
              break;
            case 1:
              context.go('/medical-history');
              break;
            case 2:
              setState(() => _selectedTabIndex = 0);
              break;
            case 3:
              context.go('/reports');
              break;
            case 4:
              context.go('/medical-profile');
              break;
          }
        },
        onHealthCardTap: () => setState(() => _selectedTabIndex = 0),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Top selectable tabs
            HealthCardTabs(
              selectedIndex: _selectedTabIndex,
              onTabSelected: (index) {
                setState(() => _selectedTabIndex = index);
              },
            ),

            // Tab Content
            Expanded(
              child: _selectedTabIndex == 0
                  ? SingleChildScrollView(
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppSpacing.md,
                        vertical: AppSpacing.sm,
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // 1. Digital Health Card physical mockup
                          DigitalHealthCardView(card: data.card),
                          const SizedBox(height: AppSpacing.md),

                          // 2. Action Buttons (Download, Share, View Fullscreen)
                          CardActionButtons(
                            onDownloadTap: () => _showDownloadDialog(context),
                            onShareTap: () => _showShareDialog(context),
                            onFullscreenTap: () =>
                                context.push('/health-card/qr'),
                          ),
                          const SizedBox(height: AppSpacing.md),

                          // 3. Personal Information section
                          PersonalInformationSection(
                            card: data.card,
                            onEditTap: () =>
                                context.push('/personal-information'),
                          ),
                          const SizedBox(height: AppSpacing.md),

                          // 4. Summary cards (Allergies, Conditions, Emergency Contact, Safety Notice)
                          HealthCardSummaryCards(
                            allergySummary: data.allergySummary,
                            conditionSummary: data.conditionSummary,
                            emergencyContact: data.emergencyContact,
                            emergencyNotice: data.emergencyNotice,
                            onAllergiesTap: () =>
                                context.push('/allergies-conditions'),
                            onConditionsTap: () =>
                                context.push('/allergies-conditions'),
                            onEmergencyContactTap: () =>
                                context.push('/emergency-contacts'),
                            onEmergencyNoticeTap: () =>
                                context.push('/emergency-info'),
                          ),
                          const SizedBox(height: AppSpacing.xl),
                        ],
                      ),
                    )
                  : _selectedTabIndex == 1
                  ? const EmergencyInfoScreen(isEmbedded: true)
                  : const AccessHistoryScreen(isEmbedded: true),
            ),
          ],
        ),
      ),
    );
  }
}
