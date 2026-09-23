import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:patient/app/app.dart';
import 'package:patient/features/health_card/screens/health_card_screen.dart';
import 'package:patient/features/home/widgets/patient_bottom_nav_bar.dart';
import 'package:patient/features/medical_history/screens/medical_history_screen.dart';
import 'package:patient/features/profile/screens/medical_profile_screen.dart';
import 'package:patient/features/profile/screens/allergies_conditions_screen.dart';
import 'package:patient/features/profile/screens/current_medicines_screen.dart';
import 'package:patient/features/reports/screens/reports_screen.dart';
import 'package:patient/features/ai_analysis/screens/ai_analysis_screen.dart';
import 'package:patient/features/access_requests/screens/access_requests_screen.dart';
import 'package:patient/features/emergency/screens/emergency_info_screen.dart';
import 'package:patient/features/settings/screens/settings_screen.dart';
import 'package:patient/features/settings/screens/appearance_settings_screen.dart';
import 'package:patient/features/settings/screens/language_region_screen.dart';
import 'package:patient/features/settings/screens/help_support_screen.dart';

import 'package:patient/app/router.dart';
import 'package:patient/features/auth/screens/onboarding_screen.dart';
import 'package:patient/features/auth/screens/login_screen.dart';

Widget createPatientApp({String initialRoute = '/home'}) {
  return ProviderScope(
    overrides: [initialLocationProvider.overrideWith((ref) => initialRoute)],
    child: const PatientApp(),
  );
}

void main() {
  testWidgets('PatientApp boots and renders Patient Home Dashboard', (
    WidgetTester tester,
  ) async {
    // Build the app with ProviderScope
    await tester.pumpWidget(createPatientApp());

    // Pump frames to initialize router and layout
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // 1. PatientHomeScreen & Greeting renders
    expect(find.text('Kapil Dev'), findsOneWidget);
    expect(find.text('Good to see you again!'), findsOneWidget);

    // 2. Health ID & Digital Health Card section is visible
    expect(find.text('YOUR DIGITAL HEALTH CARD'), findsOneWidget);
    expect(find.text('AHC-26-84X71K'), findsOneWidget);
    expect(find.text('Verified'), findsOneWidget);

    // 3. Quick Actions shortcuts are visible
    expect(find.text('Upload\nReport'), findsOneWidget);
    expect(find.text('Access\nRequests'), findsOneWidget);
    expect(find.text('Medical\nProfile'), findsOneWidget);
    expect(find.text('Emergency'), findsOneWidget);

    // 4. Critical Health Summary is visible
    expect(find.text('Critical Health Summary'), findsOneWidget);
    expect(find.text('Blood Group'), findsOneWidget);
    expect(find.text('O+'), findsOneWidget);

    // 5. Pending Access Request is visible
    expect(find.text('Pending Access Request'), findsOneWidget);
    expect(find.text('Metro General Hospital'), findsOneWidget);

    // 6. Recent Medical Activity is visible
    expect(find.text('Recent Medical Activity'), findsOneWidget);
    expect(find.text('Max Super Speciality Hospital'), findsOneWidget);

    // 7. Latest Reports & AI Analysis are visible
    expect(find.text('Latest Reports'), findsOneWidget);
    expect(find.text('Chest X-Ray'), findsOneWidget);
    expect(find.text('AI Analysis'), findsOneWidget);

    // 8. Emergency Access Status is visible
    expect(find.text('No Emergency Access Used'), findsOneWidget);

    // 9. Bottom navigation renders all 5 items
    expect(find.text('Home'), findsOneWidget);
    expect(find.text('History'), findsOneWidget);
    expect(find.text('Health Card'), findsOneWidget);
    expect(find.text('Reports'), findsOneWidget);
    expect(find.text('Profile'), findsOneWidget);
  });

  testWidgets('HealthCardScreen renders all clinical sections and metadata', (
    WidgetTester tester,
  ) async {
    // Pump HealthCardScreen directly inside a MaterialApp wrapped with ProviderScope
    await tester.pumpWidget(
      const ProviderScope(child: MaterialApp(home: HealthCardScreen())),
    );

    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // 1. App Bar and Tabs
    expect(find.text('Digital Health Card'), findsWidgets);
    expect(find.text('My Health Card'), findsOneWidget);
    expect(find.text('Emergency Info'), findsOneWidget);
    expect(find.text('Access History'), findsOneWidget);

    // 2. Patient Credentials on Physical Card
    expect(find.text('Kapil Dev'), findsWidgets);
    expect(find.text('AHC-26-84X71K'), findsWidgets);
    expect(find.text('O+'), findsOneWidget);
    expect(find.text('Verified'), findsWidgets);
    expect(find.text('KD'), findsOneWidget);
    expect(find.text('30 Jun 2004'), findsWidgets);
    expect(find.text('Male'), findsWidgets);

    // 3. Action Buttons
    expect(find.text('Download'), findsOneWidget);
    expect(find.text('Share'), findsOneWidget);
    expect(find.text('View Fullscreen'), findsOneWidget);

    // 4. Personal Information Section
    expect(find.text('Personal Information'), findsOneWidget);
    expect(find.text('Full Name'), findsOneWidget);
    expect(find.text('Verification Status'), findsOneWidget);
    expect(find.text('Issued On'), findsOneWidget);
    expect(find.text('10 Jan 2026'), findsOneWidget);

    // 5. Clinical Summary & Safety Notice
    expect(find.text('Allergies'), findsOneWidget);
    expect(find.text('2 Listed'), findsOneWidget);
    expect(find.text('Medical Conditions'), findsOneWidget);
    expect(find.text('1 Active'), findsOneWidget);
    expect(find.text('Emergency Contact'), findsOneWidget);
    expect(find.text('Emergency Use Only'), findsOneWidget);

    // 6. Bottom Navigation Bar renders with Health Card
    expect(find.text('Home'), findsOneWidget);
    expect(find.text('Health Card'), findsWidgets);
  });

  testWidgets('Navigation from Home to Health Card via center action', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(createPatientApp());
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // Tap center prominent Health Card action in bottom nav
    await tester.tap(find.byIcon(Icons.qr_code_2_rounded));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    // Health Card Screen should now be displayed
    expect(find.text('My Health Card'), findsOneWidget);
    expect(find.text('Personal Information'), findsOneWidget);
  });

  testWidgets(
    'MedicalHistoryScreen renders header, category filters, and all 4 encounters',
    (WidgetTester tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(const MaterialApp(home: MedicalHistoryScreen()));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 200));

      // 1. Header and Subtitle
      expect(find.text('Medical History'), findsOneWidget);
      expect(
        find.text('Your health journey, all in one place'),
        findsOneWidget,
      );

      // 2. Action buttons
      expect(find.byIcon(Icons.search_rounded), findsOneWidget);
      expect(find.text('Filter'), findsOneWidget);

      // 3. Category Filter Chips
      expect(find.text('All'), findsOneWidget);
      expect(find.text('Consultations'), findsOneWidget);
      expect(find.text('Tests'), findsOneWidget);
      expect(
        find.text('Emergency'),
        findsNWidgets(2),
      ); // Category chip + encounter badge
      expect(find.text('Procedures'), findsOneWidget);

      // 4. Month pills
      expect(find.text('Sep 2026'), findsOneWidget);
      expect(find.text('Aug 2026'), findsOneWidget);
      expect(find.text('Jun 2026'), findsOneWidget);
      expect(find.text('May 2026'), findsOneWidget);

      // 5. Encounters
      expect(find.text('Max Super Speciality Hospital'), findsOneWidget);
      expect(find.text('Chest X-Ray'), findsOneWidget);
      expect(find.text('City General Hospital'), findsOneWidget);
      expect(find.text('Blood Test (Complete Blood Count)'), findsOneWidget);

      // 6. Badges and report counts
      expect(find.text('2 Reports'), findsOneWidget);
      expect(find.text('1 Report'), findsNWidgets(2));
      expect(find.text('3 Reports'), findsOneWidget);
      expect(find.text('No new medications'), findsOneWidget);
      expect(find.text('Prescribed medications'), findsOneWidget);
    },
  );

  testWidgets(
    'MedicalHistoryScreen category filtering (Emergency, Tests, Procedures)',
    (WidgetTester tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(const MaterialApp(home: MedicalHistoryScreen()));
      await tester.pump();

      // 1. Select Emergency filter chip (the first 'Emergency' text widget)
      await tester.tap(find.text('Emergency').first);
      await tester.pumpAndSettle();

      expect(find.text('City General Hospital'), findsOneWidget);
      expect(find.text('Max Super Speciality Hospital'), findsNothing);
      expect(find.text('Chest X-Ray'), findsNothing);

      // 2. Select Tests filter
      await tester.tap(find.text('Tests'));
      await tester.pumpAndSettle();

      expect(find.text('Chest X-Ray'), findsOneWidget);
      expect(find.text('Blood Test (Complete Blood Count)'), findsOneWidget);
      expect(find.text('City General Hospital'), findsNothing);

      // 3. Select Procedures filter -> displays empty state
      await tester.tap(find.text('Procedures'));
      await tester.pumpAndSettle();

      expect(find.text('No Procedures Recorded'), findsOneWidget);
      expect(find.text('Reset Filters'), findsOneWidget);

      // 4. Tap Reset Filters -> all 4 return
      await tester.tap(find.text('Reset Filters'));
      await tester.pumpAndSettle();

      expect(find.text('Max Super Speciality Hospital'), findsOneWidget);
      expect(find.text('City General Hospital'), findsOneWidget);
    },
  );

  testWidgets('MedicalHistoryScreen search filters by hospital/doctor query', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const MaterialApp(home: MedicalHistoryScreen()));
    await tester.pump();

    // Open search
    await tester.tap(find.byIcon(Icons.search_rounded));
    await tester.pumpAndSettle();

    // Enter search query
    await tester.enterText(find.byType(TextField), 'Rahul Mehta');
    await tester.pumpAndSettle();

    // Only Max Hospital with Dr. Rahul Mehta should match
    expect(find.text('Max Super Speciality Hospital'), findsOneWidget);
    expect(find.text('City General Hospital'), findsNothing);
    expect(find.text('Chest X-Ray'), findsNothing);
  });

  testWidgets('Navigation from Home to Medical History via bottom nav', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(createPatientApp());
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // Tap 'History' tab in bottom nav
    await tester.tap(find.text('History'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    // Medical History Screen should now be displayed
    expect(find.text('Medical History'), findsOneWidget);
    expect(find.text('Your health journey, all in one place'), findsOneWidget);
  });

  testWidgets('Navigation from Health Card to Medical History via bottom nav', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(createPatientApp());
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // 1. Navigate to Health Card
    await tester.tap(find.byIcon(Icons.qr_code_2_rounded));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));
    expect(find.text('My Health Card'), findsOneWidget);

    // 2. Tap 'History' tab from Health Card bottom nav
    await tester.tap(
      find
          .descendant(
            of: find.byType(PatientBottomNavBar),
            matching: find.text('History'),
          )
          .last,
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    // Medical History Screen should now be displayed
    expect(find.text('Medical History'), findsOneWidget);
    expect(find.text('Your health journey, all in one place'), findsOneWidget);
  });

  testWidgets(
    'MedicalProfileScreen & PersonalInformationScreen render correctly',
    (WidgetTester tester) async {
      await tester.pumpWidget(
        const ProviderScope(child: MaterialApp(home: MedicalProfileScreen())),
      );
      await tester.pumpAndSettle();

      expect(find.text('Medical Profile'), findsOneWidget);
      expect(find.text('Kapil Dev'), findsOneWidget);
      expect(find.text('Personal Information'), findsOneWidget);
      expect(find.text('Allergies & Conditions'), findsOneWidget);
      expect(find.text('Current Medications'), findsOneWidget);
      expect(find.text('Emergency Contacts'), findsOneWidget);
    },
  );

  testWidgets('AllergiesConditionsScreen renders tabs and clinical data', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: MaterialApp(home: AllergiesConditionsScreen()),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Allergies & Conditions'), findsOneWidget);
    expect(find.text('Penicillin'), findsOneWidget);
    expect(find.text('Severe'), findsOneWidget);
    expect(find.text('Dust & Pollen'), findsOneWidget);
  });

  testWidgets('CurrentMedicinesScreen displays active medications and search', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(
      const ProviderScope(child: MaterialApp(home: CurrentMedicinesScreen())),
    );
    await tester.pumpAndSettle();

    expect(find.text('Current Medications'), findsOneWidget);
    expect(find.text('Salbutamol Inhaler (Asthalin)'), findsOneWidget);
    expect(find.text('Vitamin D3 (Cholecalciferol)'), findsOneWidget);
    expect(find.text('Montelukast Sodium'), findsOneWidget);
  });

  testWidgets('ReportsScreen renders filters and report list', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(
      const ProviderScope(child: MaterialApp(home: ReportsScreen())),
    );
    await tester.pumpAndSettle();

    expect(find.text('Health Records'), findsOneWidget);
    expect(find.text('Complete Blood Count (CBC)'), findsOneWidget);
  });

  testWidgets('AiAnalysisScreen displays findings and confidence score', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(
      const MaterialApp(home: AiAnalysisScreen(reportId: 'rec-1')),
    );
    await tester.pumpAndSettle();

    expect(find.text('AI Decision Support'), findsOneWidget);
    expect(find.text('96.4%'), findsWidgets);
    expect(find.text('View Visual Explainability (Grad-CAM)'), findsOneWidget);
  });

  testWidgets('AccessRequestsScreen displays requests and handles approvals', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(
      const ProviderScope(child: MaterialApp(home: AccessRequestsScreen())),
    );
    await tester.pumpAndSettle();

    expect(find.text('Access Requests'), findsOneWidget);
    expect(find.text('Pending (3)'), findsOneWidget);
    expect(find.text('Approve Access'), findsWidgets);

    // Tap Approve on first request
    await tester.tap(find.text('Approve Access').first);
    await tester.pumpAndSettle();

    // The snackbar should display access granted
    expect(find.textContaining('Access granted'), findsOneWidget);
  });

  testWidgets(
    'EmergencyInfoScreen renders critical medical alerts and contacts',
    (WidgetTester tester) async {
      await tester.pumpWidget(
        const ProviderScope(child: MaterialApp(home: EmergencyInfoScreen())),
      );
      await tester.pumpAndSettle();

      expect(find.text('Emergency Health Info'), findsOneWidget);
      expect(find.text('BLOOD GROUP'), findsOneWidget);
      expect(find.text('O+'), findsOneWidget);
      expect(
        find.text('CRITICAL ALLERGIES & CONTRAINDICATIONS'),
        findsOneWidget,
      );
    },
  );

  testWidgets(
    'Settings, Appearance, Language, and Help screens render cleanly',
    (WidgetTester tester) async {
      // 1. Settings Screen
      await tester.pumpWidget(
        const ProviderScope(child: MaterialApp(home: SettingsScreen())),
      );
      await tester.pumpAndSettle();
      expect(find.text('Settings'), findsOneWidget);
      expect(find.text('Notification Settings'), findsOneWidget);
      expect(find.text('Appearance'), findsOneWidget);

      // 2. Appearance Settings Screen
      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(home: AppearanceSettingsScreen()),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.text('Light Theme'), findsOneWidget);
      expect(find.text('Dark Theme'), findsOneWidget);

      // 3. Language & Region Screen
      await tester.pumpWidget(
        const ProviderScope(child: MaterialApp(home: LanguageRegionScreen())),
      );
      await tester.pumpAndSettle();
      expect(find.text('English (India)'), findsOneWidget);
      expect(find.text('Hindi'), findsOneWidget);

      // 4. Help & Support Screen
      await tester.pumpWidget(const MaterialApp(home: HelpSupportScreen()));
      await tester.pumpAndSettle();
      expect(find.text('Help & Support'), findsOneWidget);
      expect(find.text('Emergency Care'), findsOneWidget);
    },
  );

  testWidgets('Navigation from Home to Reports via bottom nav', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(createPatientApp());
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // Tap 'Reports' tab in bottom nav
    await tester.tap(find.text('Reports'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    // Reports Screen renders
    expect(find.text('Health Records'), findsOneWidget);
    expect(find.text('Complete Blood Count (CBC)'), findsOneWidget);
  });

  testWidgets('Navigation from Home to Medical Profile via bottom nav', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(createPatientApp());
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // Tap 'Profile' tab in bottom nav
    await tester.tap(find.text('Profile'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    // Medical Profile Screen renders
    expect(find.text('Medical Profile'), findsOneWidget);
    expect(find.text('Personal Information'), findsOneWidget);
    expect(find.text('Allergies & Conditions'), findsOneWidget);
  });

  testWidgets(
    'HealthCardScreen switches to Emergency Info tab and renders clinical alerts',
    (WidgetTester tester) async {
      await tester.pumpWidget(
        const ProviderScope(child: MaterialApp(home: HealthCardScreen())),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 200));

      // Tap 'Emergency Info' tab
      await tester.tap(find.text('Emergency Info'));
      await tester.pumpAndSettle();

      // Clinical emergency info content is rendered
      expect(
        find.text('CRITICAL ALLERGIES & CONTRAINDICATIONS'),
        findsOneWidget,
      );
      expect(find.text('BLOOD GROUP'), findsOneWidget);
    },
  );

  testWidgets(
    'HealthCardScreen switches to Access History tab and renders audit logs',
    (WidgetTester tester) async {
      await tester.pumpWidget(
        const ProviderScope(child: MaterialApp(home: HealthCardScreen())),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 200));

      // Tap 'Access History' tab
      await tester.tap(find.text('Access History'));
      await tester.pumpAndSettle();

      // Access history content is rendered
      expect(find.text('EMERGENCY BREAK-GLASS'), findsWidgets);
      expect(find.text('Consented'), findsOneWidget);
    },
  );

  testWidgets(
    'HealthCardScreen three-dot menu opens options modal with all 5 actions',
    (WidgetTester tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(child: MaterialApp(home: HealthCardScreen())),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 200));

      // Tap more_vert icon in AppBar
      await tester.tap(find.byIcon(Icons.more_vert_rounded));
      await tester.pumpAndSettle();

      // Verify all 5 actions and header in bottom sheet
      expect(find.text('Health Card Options'), findsOneWidget);
      expect(find.text('Download Digital Card (PDF)'), findsOneWidget);
      expect(find.text('Share Health Card Link'), findsOneWidget);
      expect(find.text('View Fullscreen Dynamic QR'), findsOneWidget);
      expect(find.text('Emergency Information'), findsOneWidget);
      expect(find.text('Access History & Audit'), findsOneWidget);
    },
  );

  testWidgets('HomeHeader notifications icon navigates to /notifications', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(createPatientApp());
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // Tap notification bell icon in HomeHeader
    await tester.tap(find.byIcon(Icons.notifications_outlined));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    // Notifications Screen renders
    expect(find.text('Notifications'), findsOneWidget);
    expect(find.text('Emergency Break-Glass Alert'), findsOneWidget);
  });

  testWidgets('HomeHeader search action navigates to Medical History', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(createPatientApp());
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // Tap search icon in HomeHeader
    await tester.tap(find.byIcon(Icons.search_rounded).first);
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));

    // Medical History Screen renders
    expect(find.text('Medical History'), findsOneWidget);
    expect(find.text('Your health journey, all in one place'), findsOneWidget);
  });

  testWidgets(
    'HealthCardScreen action buttons trigger Download and Share modals',
    (WidgetTester tester) async {
      await tester.pumpWidget(
        const ProviderScope(child: MaterialApp(home: HealthCardScreen())),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 200));

      // 1. Tap Download button
      await tester.tap(find.text('Download'));
      await tester.pumpAndSettle();
      expect(find.text('Card Downloaded'), findsOneWidget);
      expect(find.text('Done'), findsOneWidget);

      // Dismiss dialog
      await tester.tap(find.text('Done'));
      await tester.pumpAndSettle();
      expect(find.text('Card Downloaded'), findsNothing);

      // 2. Tap Share button
      await tester.tap(find.text('Share'));
      await tester.pumpAndSettle();
      expect(find.text('Share Health Card Token'), findsOneWidget);
      expect(find.text('Copy'), findsOneWidget);
    },
  );

  testWidgets(
    'PatientApp boots at /onboarding when default initial route is active',
    (WidgetTester tester) async {
      await tester.pumpWidget(createPatientApp(initialRoute: '/onboarding'));
      await tester.pumpAndSettle();

      expect(find.text('NOVARA'), findsOneWidget);
      expect(find.text('Your Health\nOur Priority'), findsOneWidget);
      expect(find.text('Better Care'), findsWidgets);
      expect(find.text('A Healthier Tomorrow'), findsOneWidget);
      expect(find.text('Get Started'), findsOneWidget);
      expect(find.text('Sign In'), findsOneWidget);
    },
  );

  testWidgets('OnboardingScreen renders value propositions, action button, and sign in', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(
      const ProviderScope(child: MaterialApp(home: OnboardingScreen())),
    );
    await tester.pumpAndSettle();

    expect(find.text('NOVARA'), findsOneWidget);
    expect(find.text('Secure\nYour Data'), findsOneWidget);
    expect(find.text('Smarter\nInsights'), findsOneWidget);
    expect(find.text('Better\nCare'), findsOneWidget);
    expect(find.text('Get Started'), findsOneWidget);
    expect(find.text('Already have an account? '), findsOneWidget);
    expect(find.text('Sign In'), findsOneWidget);

    // Tap "Get Started" to transition to Screen 2: "Manage Your Health Easily"
    await tester.ensureVisible(find.text('Get Started'));
    await tester.tap(find.text('Get Started'));
    await tester.pumpAndSettle();

    expect(find.text('Manage Your\nHealth Easily'), findsOneWidget);
    expect(
      find.text(
        'Store your reports, track medicines, book appointments and more — all in one place.',
      ),
      findsOneWidget,
    );
    expect(find.text('Your Data is Secure'), findsOneWidget);
    expect(find.text('Next'), findsOneWidget);
    expect(find.text('1 / 3'), findsOneWidget);
    expect(find.text('Skip'), findsOneWidget);

    // Tap "Next" to transition to Screen 2: "Your Data is Safe with Us" (2 / 3)
    await tester.ensureVisible(find.text('Next'));
    await tester.tap(find.text('Next'));
    await tester.pumpAndSettle();

    expect(find.text('Your Data is\nSafe with Us'), findsOneWidget);
    expect(
      find.text(
        'We use industry-standard encryption\nto keep your health information secure\nand private.',
      ),
      findsOneWidget,
    );
    expect(find.text('Encrypted & Secure'), findsOneWidget);
    expect(find.text('Access Anytime'), findsOneWidget);
    expect(find.text("You're in Control"), findsOneWidget);
    expect(find.text('2 / 3'), findsOneWidget);

    // Tap "Next" to transition to Screen 3: "Smart Insights & Emergency Care" (3 / 3)
    await tester.ensureVisible(find.text('Next'));
    await tester.tap(find.text('Next'));
    await tester.pumpAndSettle();

    expect(find.text('Smart Insights &\nEmergency Care'), findsOneWidget);
    expect(
      find.text(
        'Get AI-assisted report explanations and carry your digital Health Card for instant, verified care during emergencies.',
      ),
      findsOneWidget,
    );
    expect(find.text('AI Decision Support'), findsOneWidget);
    expect(find.text('Digital Health Card'), findsOneWidget);
    expect(find.text('Break-Glass Emergency Care'), findsOneWidget);
    expect(find.text('3 / 3'), findsOneWidget);

    // Verify "Get Started" is present on Screen 3
    expect(find.text('Get Started'), findsOneWidget);
  });

  testWidgets(
    'LoginScreen renders matching design-references/patient/login.png',
    (WidgetTester tester) async {
      await tester.pumpWidget(
        const ProviderScope(child: MaterialApp(home: LoginScreen())),
      );
      await tester.pumpAndSettle();

      expect(find.text('Welcome Back'), findsOneWidget);
      expect(find.text('Login to your NOVARA account'), findsOneWidget);
      expect(find.text('Better Care. A Healthier Tomorrow.'), findsOneWidget);
      expect(find.text('NOVARA'), findsOneWidget);
      expect(find.text('YOUR HEALTH\nOUR PRIORITY'), findsOneWidget);
      expect(find.text('Email or Mobile Number'), findsOneWidget);
      expect(find.text('Password'), findsOneWidget);
      expect(find.text('Forgot Password?'), findsOneWidget);
      expect(find.text('Login'), findsOneWidget);
      expect(find.text('or continue with'), findsOneWidget);
      expect(find.text('Google'), findsOneWidget);
      expect(find.text('Apple'), findsOneWidget);
      expect(find.text('Phone OTP'), findsOneWidget);
      expect(find.text("Don't have an account? "), findsOneWidget);
      expect(find.text('Sign Up'), findsOneWidget);
      expect(find.text('Your Data is Secure'), findsOneWidget);
      expect(
        find.text(
          'We use industry-standard encryption to keep your information safe.',
        ),
        findsOneWidget,
      );
      expect(find.text('Help'), findsOneWidget);
    },
  );
}
