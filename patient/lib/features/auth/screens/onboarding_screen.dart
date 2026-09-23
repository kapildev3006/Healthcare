import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/providers/app_startup_provider.dart';
import '../widgets/novara_heart_logo.dart';
import '../widgets/onboarding_illustrations.dart';

/// Patient Onboarding Flow matching the exact user reference images:
/// - Screen 0: Novara Brand Intro (Heart Logo, 3 value props, "Get Started ->", "Sign In").
/// - Screen 1: "Manage Your Health Easily" (1 / 3 - Doctor illustration & 4 feature cards).
/// - Screen 2: "Your Data is Safe with Us" (2 / 3 - Secure report with shield lock & 3 feature cards).
/// - Screen 3: "Smart Insights & Emergency Care" (3 / 3 - Emergency Health Card, AI Decision Support & Break-Glass).
class OnboardingScreen extends ConsumerStatefulWidget {
  const OnboardingScreen({super.key});

  @override
  ConsumerState<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends ConsumerState<OnboardingScreen> {
  int _currentStep = 0;

  void _onGetStarted() {
    setState(() {
      _currentStep = 1;
    });
  }

  void _onSignIn() {
    context.go('/login');
  }

  void _onSkip() {
    ref.read(appStartupProvider.notifier).completeOnboarding();
    context.go('/login');
  }

  void _onNextFromStep1() {
    setState(() {
      _currentStep = 2;
    });
  }

  void _onNextFromStep2() {
    setState(() {
      _currentStep = 3;
    });
  }

  void _onFinish() {
    ref.read(appStartupProvider.notifier).completeOnboarding();
    context.go('/login');
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: _currentStep == 0,
      onPopInvokedWithResult: (didPop, result) {
        if (!didPop && _currentStep > 0) {
          setState(() {
            _currentStep--;
          });
        }
      },
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 320),
        switchInCurve: Curves.easeOutCubic,
        switchOutCurve: Curves.easeInCubic,
        child: switch (_currentStep) {
          0 => _buildWelcomeScreen(context),
          1 => _buildManageHealthScreen(context),
          2 => _buildSecurityScreen(context),
          _ => _buildSmartHealthScreen(context),
        },
      ),
    );
  }

  // -------------------------------------------------------------
  // SCREEN 0: Novara Welcome & Brand Screen
  // -------------------------------------------------------------
  Widget _buildWelcomeScreen(BuildContext context) {
    return Scaffold(
      key: const ValueKey('welcome_screen'),
      backgroundColor: const Color(0xFFFAFCFE),
      body: SafeArea(
        child: Stack(
          children: [
            // Ambient soft background sky-blue auras
            Positioned(
              top: -80,
              left: -80,
              child: Container(
                width: 280,
                height: 280,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [Color(0xBAE0F2FE), Color(0x00E0F2FE)],
                  ),
                ),
              ),
            ),
            Positioned(
              top: 360,
              left: -100,
              child: Container(
                width: 240,
                height: 240,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [Color(0x99EBF5FE), Color(0x00EBF5FE)],
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: -60,
              right: -60,
              child: Container(
                width: 260,
                height: 260,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [Color(0xBAE0F2FE), Color(0x00E0F2FE)],
                  ),
                ),
              ),
            ),

            // Main Scrollable Content Container
            Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 480),
                child: SingleChildScrollView(
                  physics: const BouncingScrollPhysics(),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 10,
                  ),
                  child: Column(
                    children: [
                      // Top Right Pill: "Better Care / A Healthier Tomorrow"
                      Align(
                        alignment: Alignment.topRight,
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 18,
                            vertical: 12,
                          ),
                          decoration: BoxDecoration(
                            color: const Color(
                              0xFFF1F8FE,
                            ).withValues(alpha: 0.90),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: const Color(0xFFE2EEFA),
                              width: 1.2,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(
                                  0xFF0284C7,
                                ).withValues(alpha: 0.05),
                                blurRadius: 14,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Text(
                                'Better Care',
                                style: TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w700,
                                  color: Color(0xFF0F1E48),
                                  letterSpacing: -0.2,
                                ),
                              ),
                              const SizedBox(height: 2),
                              const Text(
                                'A Healthier Tomorrow',
                                style: TextStyle(
                                  fontSize: 11.5,
                                  fontWeight: FontWeight.w500,
                                  color: Color(0xFF334A6E),
                                ),
                              ),
                              const SizedBox(height: 6),
                              Container(
                                width: 34,
                                height: 3.5,
                                decoration: BoxDecoration(
                                  color: const Color(0xFF1668FE),
                                  borderRadius: BorderRadius.circular(2),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),

                      const SizedBox(height: 12),

                      // Brand Icon: NOVARA 3D Blue Heart with ECG Pulse Waveform
                      const NovaraHeartLogo(size: 126),

                      const SizedBox(height: 12),

                      // Brand Title: NOVARA
                      const Text(
                        'NOVARA',
                        style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFF071444),
                          letterSpacing: 3.0,
                        ),
                      ),
                      const SizedBox(height: 4),

                      // Subtitle: Your Health Our Priority
                      const Text(
                        'Your Health\nOur Priority',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF38455A),
                          height: 1.22,
                        ),
                      ),

                      const SizedBox(height: 20),

                      // 3 Value Proposition Circles with Divider Lines
                      FittedBox(
                        fit: BoxFit.scaleDown,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            _buildValuePropItem(
                              customIcon: const _ShieldWithCrossIcon(size: 26),
                              bgColor: const Color(0xFFE4F0FD),
                              label: 'Secure\nYour Data',
                            ),
                            Container(
                              height: 32,
                              width: 1.2,
                              margin: const EdgeInsets.symmetric(
                                horizontal: 16,
                              ),
                              color: const Color(0xFFE2E8F0),
                            ),
                            _buildValuePropItem(
                              icon: Icons.groups_rounded,
                              iconColor: const Color(0xFF10B981),
                              bgColor: const Color(0xFFE2F7ED),
                              label: 'Smarter\nInsights',
                            ),
                            Container(
                              height: 32,
                              width: 1.2,
                              margin: const EdgeInsets.symmetric(
                                horizontal: 16,
                              ),
                              color: const Color(0xFFE2E8F0),
                            ),
                            _buildValuePropItem(
                              icon: Icons.favorite_rounded,
                              iconColor: const Color(0xFF8B5CF6),
                              bgColor: const Color(0xFFF2E6FF),
                              label: 'Better\nCare',
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 16),

                      // Center Medical Illustration: Report Sheet, 3D Shield, Botanical Leaves
                      const MedicalShieldIllustration(width: 310, height: 210),

                      const SizedBox(height: 20),

                      // Primary Action: Get Started ->
                      SizedBox(
                        width: double.infinity,
                        height: 56,
                        child: DecoratedBox(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(28),
                            gradient: const LinearGradient(
                              colors: [Color(0xFF1668FE), Color(0xFF0052EA)],
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(
                                  0xFF1668FE,
                                ).withValues(alpha: 0.40),
                                blurRadius: 20,
                                offset: const Offset(0, 8),
                              ),
                            ],
                          ),
                          child: ElevatedButton(
                            onPressed: _onGetStarted,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.transparent,
                              foregroundColor: Colors.white,
                              shadowColor: Colors.transparent,
                              elevation: 0,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(28),
                              ),
                            ),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  'Get Started',
                                  style: TextStyle(
                                    fontSize: 17,
                                    fontWeight: FontWeight.w700,
                                    color: Colors.white,
                                  ),
                                ),
                                SizedBox(width: 8),
                                Icon(
                                  Icons.arrow_forward_rounded,
                                  size: 21,
                                  color: Colors.white,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),

                      const SizedBox(height: 14),

                      // Footer: Already have an account? Sign In
                      FittedBox(
                        fit: BoxFit.scaleDown,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text(
                              'Already have an account? ',
                              style: TextStyle(
                                color: Color(0xFF64748B),
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            GestureDetector(
                              onTap: _onSignIn,
                              child: const Padding(
                                padding: EdgeInsets.symmetric(vertical: 4),
                                child: Text(
                                  'Sign In',
                                  style: TextStyle(
                                    color: Color(0xFF1668FE),
                                    fontWeight: FontWeight.w700,
                                    fontSize: 14,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // -------------------------------------------------------------
  // SCREEN 1: "Manage Your Health Easily" (1 / 3)
  // -------------------------------------------------------------
  Widget _buildManageHealthScreen(BuildContext context) {
    return Scaffold(
      key: const ValueKey('manage_health_screen'),
      backgroundColor: const Color(0xFFFAFCFE),
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar: "Skip" button on top right
            Padding(
              padding: const EdgeInsets.only(
                top: 8,
                left: 20,
                right: 20,
                bottom: 4,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  GestureDetector(
                    onTap: _onSkip,
                    child: const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                      child: Text(
                        'Skip',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF1668FE),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Scrollable Content
            Expanded(
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 480),
                  child: SingleChildScrollView(
                    physics: const BouncingScrollPhysics(),
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 6),

                        // Main Headline: Manage Your Health Easily
                        const Text(
                          'Manage Your\nHealth Easily',
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.w800,
                            color: Color(0xFF071444),
                            letterSpacing: -0.5,
                            height: 1.18,
                          ),
                        ),
                        const SizedBox(height: 8),

                        // Subtitle
                        const Text(
                          'Store your reports, track medicines, book appointments and more — all in one place.',
                          style: TextStyle(
                            fontSize: 14.5,
                            fontWeight: FontWeight.w400,
                            color: Color(0xFF64748B),
                            height: 1.38,
                          ),
                        ),

                        const SizedBox(height: 14),

                        // Center 3D Doctor Illustration with 4 Floating Feature Cards
                        Center(
                          child: ConstrainedBox(
                            constraints: const BoxConstraints(
                              maxWidth: 360,
                              maxHeight: 295,
                            ),
                            child: Image.asset(
                              'assets/images/onboarding_manage_health.png',
                              fit: BoxFit.contain,
                            ),
                          ),
                        ),

                        const SizedBox(height: 16),

                        // Security Box: Your Data is Secure
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 14,
                          ),
                          decoration: BoxDecoration(
                            color: const Color(0xFFF0F7FE),
                            borderRadius: BorderRadius.circular(18),
                            border: Border.all(
                              color: const Color(0xFFE2EEFA),
                              width: 1.2,
                            ),
                          ),
                          child: const Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              _ShieldWithCheckIcon(size: 38),
                              SizedBox(width: 14),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Your Data is Secure',
                                      style: TextStyle(
                                        fontSize: 15,
                                        fontWeight: FontWeight.w700,
                                        color: Color(0xFF0F1E48),
                                      ),
                                    ),
                                    SizedBox(height: 3),
                                    Text(
                                      'We use industry-standard encryption to keep your health information safe.',
                                      style: TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.w400,
                                        color: Color(0xFF64748B),
                                        height: 1.35,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),

                        const SizedBox(height: 20),

                        // 3-dot Pagination Indicator (Dot 1 active)
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFF1668FE),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFFD0E5FA),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFFD0E5FA),
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 16),

                        // Next -> Action Button (transitions to Step 2: Your Data is Safe with Us)
                        SizedBox(
                          width: double.infinity,
                          height: 54,
                          child: DecoratedBox(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(27),
                              gradient: const LinearGradient(
                                colors: [Color(0xFF1668FE), Color(0xFF0052EA)],
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: const Color(
                                    0xFF1668FE,
                                  ).withValues(alpha: 0.38),
                                  blurRadius: 18,
                                  offset: const Offset(0, 8),
                                ),
                              ],
                            ),
                            child: ElevatedButton(
                              onPressed: _onNextFromStep1,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.transparent,
                                foregroundColor: Colors.white,
                                shadowColor: Colors.transparent,
                                elevation: 0,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(27),
                                ),
                              ),
                              child: const Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Next',
                                    style: TextStyle(
                                      fontSize: 16.5,
                                      fontWeight: FontWeight.w700,
                                      color: Colors.white,
                                    ),
                                  ),
                                  SizedBox(width: 8),
                                  Icon(
                                    Icons.arrow_forward_rounded,
                                    size: 20,
                                    color: Colors.white,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(height: 10),

                        // Bottom-right 1 / 3 indicator
                        const Align(
                          alignment: Alignment.centerRight,
                          child: Text(
                            '1 / 3',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                              color: Color(0xFF94A3B8),
                            ),
                          ),
                        ),
                        const SizedBox(height: 10),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: "Your Data is Safe with Us" (2 / 3) - User Reference Image
  // -------------------------------------------------------------
  Widget _buildSecurityScreen(BuildContext context) {
    return Scaffold(
      key: const ValueKey('security_screen'),
      backgroundColor: const Color(0xFFFAFCFE),
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar: Back button on left, "Skip" on right
            Padding(
              padding: const EdgeInsets.only(
                top: 4,
                left: 12,
                right: 20,
                bottom: 4,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  IconButton(
                    onPressed: () {
                      setState(() {
                        _currentStep = 1;
                      });
                    },
                    icon: const Icon(
                      Icons.arrow_back_ios_new_rounded,
                      size: 20,
                      color: Color(0xFF0F1E48),
                    ),
                    splashRadius: 20,
                  ),
                  GestureDetector(
                    onTap: _onSkip,
                    child: const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                      child: Text(
                        'Skip',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF1668FE),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Scrollable Content
            Expanded(
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 480),
                  child: SingleChildScrollView(
                    physics: const BouncingScrollPhysics(),
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        // Center Illustration: Digital Medical Report with Shield, Padlock & Foliage
                        ConstrainedBox(
                          constraints: const BoxConstraints(
                            maxWidth: 360,
                            maxHeight: 250,
                          ),
                          child: Image.asset(
                            'assets/images/onboarding_security.png',
                            fit: BoxFit.contain,
                          ),
                        ),

                        const SizedBox(height: 12),

                        // Main Headline: Your Data is Safe with Us
                        const Text(
                          'Your Data is\nSafe with Us',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 30,
                            fontWeight: FontWeight.w800,
                            color: Color(0xFF071444),
                            letterSpacing: -0.5,
                            height: 1.2,
                          ),
                        ),
                        const SizedBox(height: 8),

                        // Subtitle
                        const Text(
                          'We use industry-standard encryption\nto keep your health information secure\nand private.',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 14.5,
                            fontWeight: FontWeight.w400,
                            color: Color(0xFF64748B),
                            height: 1.38,
                          ),
                        ),

                        const SizedBox(height: 20),

                        // 3 Feature Cards
                        _buildSecurityFeatureCard(
                          icon: Icons.lock_rounded,
                          iconColor: const Color(0xFF1668FE),
                          bgColor: const Color(0xFFE4F0FD),
                          title: 'Encrypted & Secure',
                          subtitle:
                              'Your data is protected with advanced encryption.',
                        ),
                        const SizedBox(height: 10),
                        _buildSecurityFeatureCard(
                          icon: Icons.cloud_rounded,
                          iconColor: const Color(0xFF8B5CF6),
                          bgColor: const Color(0xFFF2E6FF),
                          title: 'Access Anytime',
                          subtitle:
                              'View your reports and records whenever you need them.',
                        ),
                        const SizedBox(height: 10),
                        _buildSecurityFeatureCard(
                          icon: Icons.verified_user_rounded,
                          iconColor: const Color(0xFF10B981),
                          bgColor: const Color(0xFFE2F7ED),
                          title: "You're in Control",
                          subtitle:
                              'Choose what to share and who can access your data.',
                        ),

                        const SizedBox(height: 20),

                        // 3-dot Pagination Indicator (Dot 2 active)
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFFD0E5FA),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFF1668FE),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFFD0E5FA),
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 16),

                        // Next -> Action Button (finishes onboarding)
                        SizedBox(
                          width: double.infinity,
                          height: 54,
                          child: DecoratedBox(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(27),
                              gradient: const LinearGradient(
                                colors: [Color(0xFF1668FE), Color(0xFF0052EA)],
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: const Color(
                                    0xFF1668FE,
                                  ).withValues(alpha: 0.38),
                                  blurRadius: 18,
                                  offset: const Offset(0, 8),
                                ),
                              ],
                            ),
                            child: ElevatedButton(
                              onPressed: _onNextFromStep2,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.transparent,
                                foregroundColor: Colors.white,
                                shadowColor: Colors.transparent,
                                elevation: 0,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(27),
                                ),
                              ),
                              child: const Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Next',
                                    style: TextStyle(
                                      fontSize: 16.5,
                                      fontWeight: FontWeight.w700,
                                      color: Colors.white,
                                    ),
                                  ),
                                  SizedBox(width: 8),
                                  Icon(
                                    Icons.arrow_forward_rounded,
                                    size: 20,
                                    color: Colors.white,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(height: 10),

                        // Bottom-right 2 / 3 indicator
                        const Align(
                          alignment: Alignment.centerRight,
                          child: Text(
                            '2 / 3',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                              color: Color(0xFF94A3B8),
                            ),
                          ),
                        ),
                        const SizedBox(height: 10),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // -------------------------------------------------------------
  // SCREEN 3: "Smart Insights & Emergency Care" (3 / 3)
  // Connects Screen 1 (Health Records) & Screen 2 (Security) with
  // AI Decision Support & Portable Break-Glass Emergency Card
  // -------------------------------------------------------------
  Widget _buildSmartHealthScreen(BuildContext context) {
    return Scaffold(
      key: const ValueKey('smart_health_screen'),
      backgroundColor: const Color(0xFFFAFCFE),
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar: Back button on left, "Skip" on right
            Padding(
              padding: const EdgeInsets.only(
                top: 4,
                left: 12,
                right: 20,
                bottom: 4,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  IconButton(
                    onPressed: () {
                      setState(() {
                        _currentStep = 2;
                      });
                    },
                    icon: const Icon(
                      Icons.arrow_back_ios_new_rounded,
                      size: 20,
                      color: Color(0xFF0F1E48),
                    ),
                    splashRadius: 20,
                  ),
                  GestureDetector(
                    onTap: _onSkip,
                    child: const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                      child: Text(
                        'Skip',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF1668FE),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Scrollable Content
            Expanded(
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 480),
                  child: SingleChildScrollView(
                    physics: const BouncingScrollPhysics(),
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        // Center Illustration: 3D Smartphone with Emergency Health Card, AI Sparkle, QR Badge & Cross Shield
                        ConstrainedBox(
                          constraints: const BoxConstraints(
                            maxWidth: 360,
                            maxHeight: 250,
                          ),
                          child: Image.asset(
                            'assets/images/onboarding_smart_health.png',
                            fit: BoxFit.contain,
                          ),
                        ),

                        const SizedBox(height: 12),

                        // Main Headline: Smart Insights & Emergency Care
                        const Text(
                          'Smart Insights &\nEmergency Care',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 30,
                            fontWeight: FontWeight.w800,
                            color: Color(0xFF071444),
                            letterSpacing: -0.5,
                            height: 1.2,
                          ),
                        ),
                        const SizedBox(height: 8),

                        // Subtitle
                        const Text(
                          'Get AI-assisted report explanations and carry your digital Health Card for instant, verified care during emergencies.',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 14.5,
                            fontWeight: FontWeight.w400,
                            color: Color(0xFF64748B),
                            height: 1.38,
                          ),
                        ),

                        const SizedBox(height: 20),

                        // 3 Feature Cards
                        _buildSecurityFeatureCard(
                          icon: Icons.auto_awesome_rounded,
                          iconColor: const Color(0xFF8B5CF6),
                          bgColor: const Color(0xFFF2E6FF),
                          title: 'AI Decision Support',
                          subtitle:
                              'Instant, explainable insights for chest X-rays and medical reports to assist your doctor.',
                        ),
                        const SizedBox(height: 10),
                        _buildSecurityFeatureCard(
                          icon: Icons.qr_code_2_rounded,
                          iconColor: const Color(0xFF1668FE),
                          bgColor: const Color(0xFFE4F0FD),
                          title: 'Digital Health Card',
                          subtitle:
                              'Carry a secure QR code on your phone for quick doctor check-ins anywhere.',
                        ),
                        const SizedBox(height: 10),
                        _buildSecurityFeatureCard(
                          icon: Icons.emergency_rounded,
                          iconColor: const Color(0xFF10B981),
                          bgColor: const Color(0xFFE2F7ED),
                          title: 'Break-Glass Emergency Care',
                          subtitle:
                              'Authorised hospitals can access your critical vitals and allergies when seconds count.',
                        ),

                        const SizedBox(height: 20),

                        // 3-dot Pagination Indicator (Dot 3 active)
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFFD0E5FA),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFFD0E5FA),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFF1668FE),
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 16),

                        // Get Started Action Button (finishes onboarding)
                        SizedBox(
                          width: double.infinity,
                          height: 54,
                          child: DecoratedBox(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(27),
                              gradient: const LinearGradient(
                                colors: [Color(0xFF1668FE), Color(0xFF0052EA)],
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: const Color(
                                    0xFF1668FE,
                                  ).withValues(alpha: 0.38),
                                  blurRadius: 18,
                                  offset: const Offset(0, 8),
                                ),
                              ],
                            ),
                            child: ElevatedButton(
                              onPressed: _onFinish,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.transparent,
                                foregroundColor: Colors.white,
                                shadowColor: Colors.transparent,
                                elevation: 0,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(27),
                                ),
                              ),
                              child: const Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Get Started',
                                    style: TextStyle(
                                      fontSize: 16.5,
                                      fontWeight: FontWeight.w700,
                                      color: Colors.white,
                                    ),
                                  ),
                                  SizedBox(width: 8),
                                  Icon(
                                    Icons.arrow_forward_rounded,
                                    size: 20,
                                    color: Colors.white,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(height: 10),

                        // Bottom-right 3 / 3 indicator
                        const Align(
                          alignment: Alignment.centerRight,
                          child: Text(
                            '3 / 3',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                              color: Color(0xFF94A3B8),
                            ),
                          ),
                        ),
                        const SizedBox(height: 10),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSecurityFeatureCard({
    required IconData icon,
    required Color iconColor,
    required Color bgColor,
    required String title,
    required String subtitle,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFD),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFFE8F1FA), width: 1.2),
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(color: bgColor, shape: BoxShape.circle),
            child: Icon(icon, color: iconColor, size: 22),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF0F1E48),
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w400,
                    color: Color(0xFF64748B),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildValuePropItem({
    IconData? icon,
    Color? iconColor,
    Widget? customIcon,
    required Color bgColor,
    required String label,
  }) {
    return Column(
      children: [
        Container(
          width: 52,
          height: 52,
          decoration: BoxDecoration(color: bgColor, shape: BoxShape.circle),
          child: Center(
            child:
                customIcon ??
                Icon(
                  icon,
                  color: iconColor,
                  size: icon == Icons.groups_rounded ? 28 : 25,
                ),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          label,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 11.5,
            fontWeight: FontWeight.w600,
            color: Color(0xFF334155),
            height: 1.2,
          ),
        ),
      ],
    );
  }
}

/// Precise mini blue shield with crisp white medical cross matching reference image badge.
class _ShieldWithCrossIcon extends StatelessWidget {
  final double size;
  const _ShieldWithCrossIcon({this.size = 24});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _MiniShieldPainter(),
        child: const Center(
          child: Icon(Icons.add_rounded, size: 14, color: Colors.white),
        ),
      ),
    );
  }
}

class _MiniShieldPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    final path = Path();
    path.moveTo(w * 0.5, 0);
    path.cubicTo(w * 0.88, 0, w, h * 0.14, w, h * 0.44);
    path.cubicTo(w, h * 0.74, w * 0.65, h * 0.94, w * 0.5, h);
    path.cubicTo(w * 0.35, h * 0.94, 0, h * 0.74, 0, h * 0.44);
    path.cubicTo(0, h * 0.14, w * 0.12, 0, w * 0.5, 0);
    path.close();

    final paint = Paint()
      ..color = const Color(0xFF1668FE)
      ..style = PaintingStyle.fill;

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// Precise blue shield with crisp white checkmark for "Your Data is Secure" box.
class _ShieldWithCheckIcon extends StatelessWidget {
  final double size;
  const _ShieldWithCheckIcon({this.size = 38});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _MiniShieldPainter(),
        child: const Center(
          child: Icon(Icons.check_rounded, size: 22, color: Colors.white),
        ),
      ),
    );
  }
}
