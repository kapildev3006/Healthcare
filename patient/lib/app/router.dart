import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

// Auth & Onboarding
import '../features/auth/screens/forgot_password_screen.dart';
import '../features/auth/screens/login_screen.dart';
import '../features/auth/screens/onboarding_screen.dart';
import '../features/auth/screens/otp_verification_screen.dart';
import '../features/auth/screens/permissions_screen.dart';
import '../features/auth/screens/register_screen.dart';
import '../features/auth/screens/reset_password_screen.dart';

// Home, Card, History, Showcase
import '../features/health_card/screens/fullscreen_qr_screen.dart';
import '../features/health_card/screens/health_card_screen.dart';
import '../features/home/screens/patient_home_screen.dart';
import '../features/medical_history/screens/encounter_detail_screen.dart';
import '../features/medical_history/screens/medical_history_screen.dart';
import '../features/showcase/design_showcase_screen.dart';

// Reports & Records
import '../features/reports/screens/report_detail_screen.dart';
import '../features/reports/screens/reports_screen.dart';
import '../features/reports/screens/share_report_screen.dart';
import '../features/reports/screens/upload_report_screen.dart';

// AI Decision Support
import '../features/ai_analysis/screens/ai_analysis_screen.dart';
import '../features/ai_analysis/screens/ai_explainability_screen.dart';

// Access & Consent
import '../features/access_requests/screens/access_history_screen.dart';
import '../features/access_requests/screens/access_request_detail_screen.dart';
import '../features/access_requests/screens/access_requests_screen.dart';

// Emergency
import '../features/emergency/screens/emergency_access_detail_screen.dart';
import '../features/emergency/screens/emergency_info_screen.dart';

// Medical Profile & Clinical Details
import '../features/profile/screens/allergies_conditions_screen.dart';
import '../features/profile/screens/current_medicines_screen.dart';
import '../features/profile/screens/emergency_contacts_screen.dart';
import '../features/profile/screens/medical_profile_screen.dart';
import '../features/profile/screens/personal_information_screen.dart';

// Insurance & Appointments
import '../features/appointments/screens/appointments_screen.dart';
import '../features/insurance/screens/insurance_details_screen.dart';

// Notifications & Settings
import '../features/notifications/screens/notifications_screen.dart';
import '../features/settings/screens/appearance_settings_screen.dart';
import '../features/settings/screens/help_support_screen.dart';
import '../features/settings/screens/language_region_screen.dart';
import '../features/settings/screens/notification_settings_screen.dart';
import '../features/settings/screens/privacy_security_screen.dart';
import '../features/settings/screens/settings_screen.dart';
import '../features/settings/screens/supporting_screens_catalog_screen.dart';

/// App initial route location provider. Defaults to '/onboarding' for production app launch.
final initialLocationProvider = StateProvider<String>((ref) => '/onboarding');

/// App router provider using Riverpod.
final routerProvider = Provider<GoRouter>((ref) {
  final initialLocation = ref.watch(initialLocationProvider);

  return GoRouter(
    initialLocation: initialLocation,
    debugLogDiagnostics: false,
    routes: [
      // Root Redirect
      GoRoute(path: '/', redirect: (context, state) => initialLocation),

      // Stage 1: Auth & Onboarding
      GoRoute(
        path: '/onboarding',
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: '/otp-verification',
        builder: (context, state) {
          final phone = state.uri.queryParameters['phone'] ?? '+91 98765 43210';
          return OtpVerificationScreen(phoneNumber: phone);
        },
      ),
      GoRoute(
        path: '/forgot-password',
        builder: (context, state) => const ForgotPasswordScreen(),
      ),
      GoRoute(
        path: '/reset-password',
        builder: (context, state) => const ResetPasswordScreen(),
      ),
      GoRoute(
        path: '/permissions',
        builder: (context, state) => const PermissionsScreen(),
      ),

      // Core Tabs
      GoRoute(
        path: '/home',
        builder: (context, state) => const PatientHomeScreen(),
      ),
      GoRoute(
        path: '/health-card',
        builder: (context, state) => const HealthCardScreen(),
      ),
      GoRoute(
        path: '/health-card/qr',
        builder: (context, state) => const FullscreenQrScreen(),
      ),
      GoRoute(
        path: '/fullscreen-qr',
        redirect: (context, state) => '/health-card/qr',
      ),
      GoRoute(
        path: '/medical-history',
        builder: (context, state) => const MedicalHistoryScreen(),
      ),
      GoRoute(
        path: '/medical-history/:encounterId',
        builder: (context, state) {
          final encounterId = state.pathParameters['encounterId'] ?? 'enc-1';
          return EncounterDetailScreen(encounterId: encounterId);
        },
      ),
      GoRoute(
        path: '/encounters/:encounterId',
        redirect: (context, state) =>
            '/medical-history/${state.pathParameters['encounterId'] ?? 'enc-1'}',
      ),
      GoRoute(
        path: '/reports',
        builder: (context, state) => const ReportsScreen(),
      ),
      GoRoute(
        path: '/reports/upload',
        builder: (context, state) => const UploadReportScreen(),
      ),
      GoRoute(
        path: '/reports/:reportId',
        builder: (context, state) {
          final reportId = state.pathParameters['reportId'] ?? 'rec-1';
          return ReportDetailScreen(reportId: reportId);
        },
      ),
      GoRoute(
        path: '/reports/:reportId/share',
        builder: (context, state) {
          final reportId = state.pathParameters['reportId'] ?? 'rec-1';
          return ShareReportScreen(reportId: reportId);
        },
      ),

      // Stage 4: AI Decision Support
      GoRoute(
        path: '/ai-analysis/:reportId',
        builder: (context, state) {
          final reportId = state.pathParameters['reportId'] ?? 'rec-1';
          return AiAnalysisScreen(reportId: reportId);
        },
      ),
      GoRoute(
        path: '/ai-analysis/:reportId/explainability',
        builder: (context, state) {
          final reportId = state.pathParameters['reportId'] ?? 'rec-1';
          return AiExplainabilityScreen(reportId: reportId);
        },
      ),

      // Stage 5: Access Requests & Consent
      GoRoute(
        path: '/access-requests',
        builder: (context, state) => const AccessRequestsScreen(),
      ),
      GoRoute(
        path: '/access-requests/:requestId',
        builder: (context, state) {
          final requestId = state.pathParameters['requestId'] ?? 'req-1';
          return AccessRequestDetailScreen(requestId: requestId);
        },
      ),
      GoRoute(
        path: '/access-history',
        builder: (context, state) => const AccessHistoryScreen(),
      ),

      // Stage 6: Emergency Information
      GoRoute(
        path: '/emergency-info',
        builder: (context, state) => const EmergencyInfoScreen(),
      ),
      GoRoute(
        path: '/emergency-access/:accessId',
        builder: (context, state) {
          final accessId = state.pathParameters['accessId'] ?? 'emg-log-01';
          return EmergencyAccessDetailScreen(accessId: accessId);
        },
      ),

      // Stage 2: Medical Profile & Clinical Sub-screens
      GoRoute(
        path: '/medical-profile',
        builder: (context, state) => const MedicalProfileScreen(),
      ),
      GoRoute(
        path: '/personal-information',
        builder: (context, state) => const PersonalInformationScreen(),
      ),
      GoRoute(
        path: '/allergies-conditions',
        builder: (context, state) => const AllergiesConditionsScreen(),
      ),
      GoRoute(
        path: '/current-medications',
        builder: (context, state) => const CurrentMedicinesScreen(),
      ),
      GoRoute(
        path: '/emergency-contacts',
        builder: (context, state) => const EmergencyContactsScreen(),
      ),

      // Stage 7: Insurance & Appointments
      GoRoute(
        path: '/insurance',
        builder: (context, state) => const InsuranceDetailsScreen(),
      ),
      GoRoute(
        path: '/appointments',
        builder: (context, state) => const AppointmentsScreen(),
      ),

      // Notifications & Settings
      GoRoute(
        path: '/notifications',
        builder: (context, state) => const NotificationsScreen(),
      ),
      GoRoute(
        path: '/settings',
        builder: (context, state) => const SettingsScreen(),
      ),
      GoRoute(
        path: '/settings/notifications',
        builder: (context, state) => const NotificationSettingsScreen(),
      ),
      GoRoute(
        path: '/settings/privacy-security',
        builder: (context, state) => const PrivacySecurityScreen(),
      ),
      GoRoute(
        path: '/settings/appearance',
        builder: (context, state) => const AppearanceSettingsScreen(),
      ),
      GoRoute(
        path: '/settings/language-region',
        builder: (context, state) => const LanguageRegionScreen(),
      ),
      GoRoute(
        path: '/help-support',
        builder: (context, state) => const HelpSupportScreen(),
      ),
      GoRoute(
        path: '/supporting-screens',
        builder: (context, state) => const SupportingScreensCatalogScreen(),
      ),

      // Showcase
      GoRoute(
        path: '/showcase',
        builder: (context, state) => const DesignShowcaseScreen(),
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      appBar: AppBar(title: const Text('Page Not Found')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Route not found: ${state.uri}'),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => context.go('/home'),
              child: const Text('Return to Home'),
            ),
          ],
        ),
      ),
    ),
  );
});
