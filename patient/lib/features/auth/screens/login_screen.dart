import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/providers/app_startup_provider.dart';
import '../widgets/novara_heart_logo.dart';

/// Patient Login Screen matching design-references/patient/login.png strictly.
class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final TextEditingController _identifierController = TextEditingController(
    text: 'kapil.dev@example.com',
  );
  final TextEditingController _passwordController = TextEditingController(
    text: 'password123',
  );
  bool _obscurePassword = true;

  @override
  void dispose() {
    _identifierController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleLogin() {
    ref.read(appStartupProvider.notifier).login();
    context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAFCFE),
      body: Stack(
        children: [
          // 1. Ambient Top-Left Sky Blue Aura
          Positioned(
            top: -80,
            left: -80,
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

          // 2. Bottom Botanical Leaves & Wavy Ambient Artwork
          const Positioned.fill(child: _LoginBottomArtwork()),

          // 3. Main Content with Safe Area
          SafeArea(
            child: Column(
              children: [
                // Top Bar: Back button on left, "Help" on right
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
                          if (Navigator.of(context).canPop()) {
                            Navigator.of(context).pop();
                          } else {
                            context.go('/onboarding');
                          }
                        },
                        icon: const Icon(
                          Icons.arrow_back_ios_new_rounded,
                          size: 20,
                          color: Color(0xFF0F1E48),
                        ),
                        splashRadius: 20,
                      ),
                      GestureDetector(
                        onTap: () => context.push('/help-support'),
                        child: const Padding(
                          padding: EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 6,
                          ),
                          child: Text(
                            'Help',
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

                // Scrollable Form Content
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

                            // Header Row: Left "Welcome Back" info + Right NOVARA Heart Logo
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                // Left Column: Welcome Back text
                                const Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'Welcome Back',
                                        style: TextStyle(
                                          fontSize: 28,
                                          fontWeight: FontWeight.w800,
                                          color: Color(0xFF071444),
                                          letterSpacing: -0.5,
                                        ),
                                      ),
                                      SizedBox(height: 6),
                                      Text(
                                        'Login to your NOVARA account',
                                        style: TextStyle(
                                          fontSize: 14.5,
                                          fontWeight: FontWeight.w600,
                                          color: Color(0xFF334155),
                                        ),
                                      ),
                                      SizedBox(height: 3),
                                      Text(
                                        'Better Care. A Healthier Tomorrow.',
                                        style: TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.w400,
                                          color: Color(0xFF64748B),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),

                                const SizedBox(width: 12),

                                // Right Column: 3D Novara Heart Logo & Title
                                Column(
                                  mainAxisSize: MainAxisSize.min,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    const NovaraHeartLogo(size: 58),
                                    const SizedBox(height: 4),
                                    const Text(
                                      'NOVARA',
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w900,
                                        color: Color(0xFF071444),
                                        letterSpacing: 2.0,
                                      ),
                                    ),
                                    const SizedBox(height: 2),
                                    const Text(
                                      'YOUR HEALTH\nOUR PRIORITY',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        fontSize: 8,
                                        fontWeight: FontWeight.w700,
                                        color: Color(0xFF475569),
                                        letterSpacing: 1.0,
                                        height: 1.25,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),

                            const SizedBox(height: 22),

                            // Field 1: Email or Mobile Number
                            _buildInputField(
                              label: 'Email or Mobile Number',
                              hint: 'Enter your email or mobile number',
                              controller: _identifierController,
                              prefixIcon: Icons.person_outline_rounded,
                            ),

                            const SizedBox(height: 16),

                            // Field 2: Password
                            _buildInputField(
                              label: 'Password',
                              hint: 'Enter your password',
                              controller: _passwordController,
                              prefixIcon: Icons.lock_outline_rounded,
                              obscureText: _obscurePassword,
                              suffixIcon: GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _obscurePassword = !_obscurePassword;
                                  });
                                },
                                child: Padding(
                                  padding: const EdgeInsets.only(right: 14),
                                  child: Icon(
                                    _obscurePassword
                                        ? Icons.visibility_off_outlined
                                        : Icons.visibility_outlined,
                                    color: const Color(0xFF64748B),
                                    size: 22,
                                  ),
                                ),
                              ),
                            ),

                            const SizedBox(height: 10),

                            // Forgot Password Link (right-aligned)
                            Align(
                              alignment: Alignment.centerRight,
                              child: GestureDetector(
                                onTap: () => context.push('/forgot-password'),
                                child: const Padding(
                                  padding: EdgeInsets.symmetric(vertical: 4),
                                  child: Text(
                                    'Forgot Password?',
                                    style: TextStyle(
                                      color: Color(0xFF1668FE),
                                      fontWeight: FontWeight.w600,
                                      fontSize: 13.5,
                                    ),
                                  ),
                                ),
                              ),
                            ),

                            const SizedBox(height: 14),

                            // Primary Action: Login ->
                            SizedBox(
                              width: double.infinity,
                              height: 52,
                              child: DecoratedBox(
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(26),
                                  gradient: const LinearGradient(
                                    colors: [
                                      Color(0xFF1668FE),
                                      Color(0xFF0052EA),
                                    ],
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
                                  onPressed: _handleLogin,
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Colors.transparent,
                                    foregroundColor: Colors.white,
                                    shadowColor: Colors.transparent,
                                    elevation: 0,
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(26),
                                    ),
                                  ),
                                  child: const Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        'Login',
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

                            const SizedBox(height: 20),

                            // Divider: or continue with
                            const Row(
                              children: [
                                Expanded(
                                  child: Divider(
                                    color: Color(0xFFE2E8F0),
                                    thickness: 1,
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsets.symmetric(horizontal: 14),
                                  child: Text(
                                    'or continue with',
                                    style: TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.w400,
                                      color: Color(0xFF64748B),
                                    ),
                                  ),
                                ),
                                Expanded(
                                  child: Divider(
                                    color: Color(0xFFE2E8F0),
                                    thickness: 1,
                                  ),
                                ),
                              ],
                            ),

                            const SizedBox(height: 16),

                            // Social Login Row (Google, Apple, Phone OTP)
                            Row(
                              children: [
                                _buildSocialCard(
                                  icon: const _GoogleLogoIcon(size: 24),
                                  label: 'Google',
                                  onTap: _handleLogin,
                                ),
                                const SizedBox(width: 12),
                                _buildSocialCard(
                                  icon: const Icon(
                                    Icons.apple,
                                    size: 28,
                                    color: Colors.black,
                                  ),
                                  label: 'Apple',
                                  onTap: _handleLogin,
                                ),
                                const SizedBox(width: 12),
                                _buildSocialCard(
                                  icon: const Icon(
                                    Icons.phone_rounded,
                                    size: 24,
                                    color: Color(0xFF0F1E48),
                                  ),
                                  label: 'Phone OTP',
                                  onTap: () =>
                                      context.push('/otp-verification'),
                                ),
                              ],
                            ),

                            const SizedBox(height: 18),

                            // Don't have an account? Sign Up
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text(
                                  "Don't have an account? ",
                                  style: TextStyle(
                                    color: Color(0xFF64748B),
                                    fontSize: 14,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                                GestureDetector(
                                  onTap: () => context.push('/register'),
                                  child: const Padding(
                                    padding: EdgeInsets.symmetric(vertical: 4),
                                    child: Text(
                                      'Sign Up',
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

                            const SizedBox(height: 18),

                            // Security Notice Card: Your Data is Secure
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
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
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
                                          'We use industry-standard encryption to keep your information safe.',
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

                            const SizedBox(height: 36),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInputField({
    required String label,
    required String hint,
    required TextEditingController controller,
    required IconData prefixIcon,
    bool obscureText = false,
    Widget? suffixIcon,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 13.5,
            fontWeight: FontWeight.w600,
            color: Color(0xFF334155),
          ),
        ),
        const SizedBox(height: 8),
        Container(
          height: 52,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFDCEAF8), width: 1.2),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF0284C7).withValues(alpha: 0.03),
                blurRadius: 10,
                offset: const Offset(0, 3),
              ),
            ],
          ),
          child: TextField(
            controller: controller,
            obscureText: obscureText,
            style: const TextStyle(
              fontSize: 15,
              color: Color(0xFF0F172A),
              fontWeight: FontWeight.w500,
            ),
            decoration: InputDecoration(
              hintText: hint,
              hintStyle: const TextStyle(
                color: Color(0xFF94A3B8),
                fontSize: 14.5,
                fontWeight: FontWeight.w400,
              ),
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 14,
              ),
              prefixIcon: Padding(
                padding: const EdgeInsets.only(left: 14, right: 10),
                child: Icon(
                  prefixIcon,
                  color: const Color(0xFF94A3B8),
                  size: 22,
                ),
              ),
              prefixIconConstraints: const BoxConstraints(
                minWidth: 46,
                minHeight: 24,
              ),
              suffixIcon: suffixIcon,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSocialCard({
    required Widget icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return Expanded(
      child: Material(
        color: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: Color(0xFFE2EEFA), width: 1.2),
        ),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(16),
          child: Container(
            height: 74,
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(height: 26, child: Center(child: icon)),
                const SizedBox(height: 5),
                Text(
                  label,
                  style: const TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF1E293B),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Vector rendering of Google multi-colored "G" icon
class _GoogleLogoIcon extends StatelessWidget {
  final double size;
  const _GoogleLogoIcon({this.size = 24});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(painter: _GoogleLogoPainter()),
    );
  }
}

class _GoogleLogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    final center = Offset(w / 2, h / 2);
    final radius = w * 0.40;
    final stroke = w * 0.20;

    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.butt;

    final rect = Rect.fromCircle(center: center, radius: radius);

    // Red (top)
    paint.color = const Color(0xFFEA4335);
    canvas.drawArc(rect, -2.35, 1.95, false, paint);

    // Yellow (left)
    paint.color = const Color(0xFFFBBC05);
    canvas.drawArc(rect, 2.35, 1.58, false, paint);

    // Green (bottom)
    paint.color = const Color(0xFF34A853);
    canvas.drawArc(rect, 0.78, 1.57, false, paint);

    // Blue (right arc)
    paint.color = const Color(0xFF4285F4);
    canvas.drawArc(rect, -0.42, 1.20, false, paint);

    // Blue horizontal bar
    final barPaint = Paint()
      ..color = const Color(0xFF4285F4)
      ..style = PaintingStyle.fill;
    canvas.drawRect(
      Rect.fromLTWH(
        center.dx - stroke * 0.15,
        center.dy - stroke * 0.5,
        radius + stroke * 0.5,
        stroke,
      ),
      barPaint,
    );
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

/// Bottom Ambient Artwork: Soft waves, cyan botanical branch, and whimsical script text
class _LoginBottomArtwork extends StatelessWidget {
  const _LoginBottomArtwork();

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Stack(
        children: [
          // Background Painter with waves and botanical leaves
          Positioned.fill(child: CustomPaint(painter: _LoginBottomPainter())),

          // Whimsical handwritten script on bottom right
          Positioned(
            bottom: 24,
            right: 26,
            child: Transform.rotate(
              angle: -0.12,
              child: const Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    'Health',
                    style: TextStyle(
                      fontSize: 12.5,
                      fontStyle: FontStyle.italic,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF476B9E),
                      height: 1.1,
                    ),
                  ),
                  Text(
                    'today',
                    style: TextStyle(
                      fontSize: 12.5,
                      fontStyle: FontStyle.italic,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF476B9E),
                      height: 1.1,
                    ),
                  ),
                  Text(
                    'a brighter',
                    style: TextStyle(
                      fontSize: 12.5,
                      fontStyle: FontStyle.italic,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF476B9E),
                      height: 1.1,
                    ),
                  ),
                  Text(
                    'tomorrow',
                    style: TextStyle(
                      fontSize: 12.5,
                      fontStyle: FontStyle.italic,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF476B9E),
                      height: 1.1,
                    ),
                  ),
                  SizedBox(height: 3),
                  Icon(
                    Icons.favorite_border_rounded,
                    size: 16,
                    color: Color(0xFF3B82F6),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _LoginBottomPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    // 1. Soft rolling waves at the bottom
    final wavePath1 = Path()
      ..moveTo(0, h * 0.82)
      ..cubicTo(w * 0.28, h * 0.76, w * 0.65, h * 0.90, w, h * 0.80)
      ..lineTo(w, h)
      ..lineTo(0, h)
      ..close();

    final wavePaint1 = Paint()
      ..color = const Color(0x35E0F2FE)
      ..style = PaintingStyle.fill;
    canvas.drawPath(wavePath1, wavePaint1);

    final wavePath2 = Path()
      ..moveTo(0, h * 0.89)
      ..cubicTo(w * 0.35, h * 0.84, w * 0.70, h * 0.96, w, h * 0.88)
      ..lineTo(w, h)
      ..lineTo(0, h)
      ..close();

    final wavePaint2 = Paint()
      ..color = const Color(0x28BAE6FD)
      ..style = PaintingStyle.fill;
    canvas.drawPath(wavePath2, wavePaint2);

    // 2. Botanical leaves rising from bottom left
    final stemPath = Path()
      ..moveTo(w * 0.05, h)
      ..cubicTo(w * 0.06, h * 0.90, w * 0.08, h * 0.84, w * 0.09, h * 0.76);

    final stemPaint = Paint()
      ..color = const Color(0x6638BDF8)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.5
      ..strokeCap = StrokeCap.round;
    canvas.drawPath(stemPath, stemPaint);

    // Top Leaf (largest, tilted right)
    _drawLeaf(
      canvas,
      center: Offset(w * 0.14, h * 0.80),
      width: 38,
      height: 68,
      angle: -0.35,
      color: const Color(0x8838BDF8),
    );

    // Middle Left Leaf
    _drawLeaf(
      canvas,
      center: Offset(w * 0.03, h * 0.87),
      width: 32,
      height: 56,
      angle: -1.05,
      color: const Color(0x8038BDF8),
    );

    // Middle Right Leaf
    _drawLeaf(
      canvas,
      center: Offset(w * 0.13, h * 0.91),
      width: 32,
      height: 54,
      angle: 0.55,
      color: const Color(0x7538BDF8),
    );
  }

  void _drawLeaf(
    Canvas canvas, {
    required Offset center,
    required double width,
    required double height,
    required double angle,
    required Color color,
  }) {
    canvas.save();
    canvas.translate(center.dx, center.dy);
    canvas.rotate(angle);

    final path = Path();
    path.moveTo(0, -height / 2);
    path.cubicTo(width / 2, -height / 4, width / 2, height / 4, 0, height / 2);
    path.cubicTo(
      -width / 2,
      height / 4,
      -width / 2,
      -height / 4,
      0,
      -height / 2,
    );
    path.close();

    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;
    canvas.drawPath(path, paint);

    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
