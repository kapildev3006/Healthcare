import 'package:flutter/material.dart';

/// Center medical report illustration with glossy 3D shield, white medical cross,
/// clean document sheet, and botanical leaves, strictly matching the reference image.
class MedicalShieldIllustration extends StatelessWidget {
  final double width;
  final double height;

  const MedicalShieldIllustration({
    super.key,
    this.width = 300,
    this.height = 205,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      height: height,
      child: Stack(
        alignment: Alignment.center,
        clipBehavior: Clip.none,
        children: [
          // 1. Soft Ambient Glowing Aura (pure sky-blue fade, NO dark gray smudge)
          Positioned(
            bottom: 6,
            child: Container(
              width: width * 0.94,
              height: height * 0.88,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    Color(0xCCE0F2FE),
                    Color(0x66F0F9FF),
                    Color(0x00E0F2FE),
                  ],
                  stops: [0.0, 0.55, 1.0],
                ),
              ),
            ),
          ),

          // 2. Floating decorative plus icons
          Positioned(
            top: 6,
            right: 36,
            child: Icon(
              Icons.add_rounded,
              size: 22,
              color: const Color(0xFFBAE6FD).withValues(alpha: 0.90),
            ),
          ),
          Positioned(
            top: 22,
            left: 24,
            child: Icon(
              Icons.add_rounded,
              size: 16,
              color: const Color(0xFFBAE6FD).withValues(alpha: 0.75),
            ),
          ),
          Positioned(
            bottom: 42,
            left: 8,
            child: Icon(
              Icons.add_rounded,
              size: 14,
              color: const Color(0xFF93C5FD).withValues(alpha: 0.70),
            ),
          ),

          // 3. Botanical leaves behind the card
          // Left side leaves (soft tropical mint/teal rounded fronds)
          Positioned(
            bottom: 14,
            left: width * 0.10,
            child: Transform.rotate(
              angle: -0.40,
              child: Container(
                width: 44,
                height: 76,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF6EE7B7), Color(0xFF2DD4BF)],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(42),
                    bottomRight: Radius.circular(42),
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF14B8A6).withValues(alpha: 0.18),
                      blurRadius: 10,
                      offset: const Offset(-2, 4),
                    ),
                  ],
                ),
              ),
            ),
          ),
          // Right side cluster of tropical leaves (fan of 3 soft cyan/mint leaves)
          Positioned(
            bottom: 16,
            right: width * 0.08,
            child: Transform.rotate(
              angle: 0.42,
              child: Container(
                width: 46,
                height: 80,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF38BDF8), Color(0xFF2DD4BF)],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  borderRadius: const BorderRadius.only(
                    topRight: Radius.circular(42),
                    bottomLeft: Radius.circular(42),
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF0284C7).withValues(alpha: 0.18),
                      blurRadius: 12,
                      offset: const Offset(2, 4),
                    ),
                  ],
                ),
              ),
            ),
          ),
          Positioned(
            bottom: 26,
            right: width * 0.04,
            child: Transform.rotate(
              angle: 0.68,
              child: Container(
                width: 36,
                height: 62,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF7DD3FC), Color(0xFF38BDF8)],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  borderRadius: const BorderRadius.only(
                    topRight: Radius.circular(36),
                    bottomLeft: Radius.circular(36),
                  ),
                ),
              ),
            ),
          ),

          // 4. White Medical Report Sheet (Document)
          Positioned(
            left: width * 0.14,
            bottom: 8,
            child: Container(
              width: width * 0.54,
              height: height * 0.90,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFD6E9FA), width: 1.6),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF0284C7).withValues(alpha: 0.08),
                    blurRadius: 22,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header: Profile Avatar Circle + Name Placeholder Lines
                  Row(
                    children: [
                      Container(
                        width: 28,
                        height: 28,
                        decoration: const BoxDecoration(
                          color: Color(0xFF0075FF),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.person,
                          size: 18,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            width: 58,
                            height: 6,
                            decoration: BoxDecoration(
                              color: const Color(0xFFCCE4FC),
                              borderRadius: BorderRadius.circular(3),
                            ),
                          ),
                          const SizedBox(height: 4),
                          Container(
                            width: 38,
                            height: 5,
                            decoration: BoxDecoration(
                              color: const Color(0xFFE2EFFD),
                              borderRadius: BorderRadius.circular(3),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // Medical Document text placeholder lines
                  Container(
                    width: double.infinity,
                    height: 5.5,
                    decoration: BoxDecoration(
                      color: const Color(0xFFE2EFFD),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                  const SizedBox(height: 7),
                  Container(
                    width: width * 0.36,
                    height: 5.5,
                    decoration: BoxDecoration(
                      color: const Color(0xFFE2EFFD),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                  const SizedBox(height: 7),
                  Container(
                    width: width * 0.42,
                    height: 5.5,
                    decoration: BoxDecoration(
                      color: const Color(0xFFE2EFFD),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                  const SizedBox(height: 7),
                  Container(
                    width: width * 0.30,
                    height: 5.5,
                    decoration: BoxDecoration(
                      color: const Color(0xFFE2EFFD),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                  const SizedBox(height: 7),
                  Container(
                    width: width * 0.22,
                    height: 5.5,
                    decoration: BoxDecoration(
                      color: const Color(0xFFE2EFFD),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // 5. Large 3D Glossy Blue Shield with Pure White Medical Cross
          Positioned(
            bottom: 6,
            right: width * 0.14,
            child: Container(
              width: 72,
              height: 82,
              decoration: BoxDecoration(
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF0052CC).withValues(alpha: 0.38),
                    blurRadius: 20,
                    offset: const Offset(0, 9),
                  ),
                ],
              ),
              child: CustomPaint(
                painter: _ShieldPainter(),
                child: const Center(
                  child: Icon(Icons.add_rounded, size: 38, color: Colors.white),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ShieldPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    final path = Path();
    path.moveTo(w * 0.5, 0);
    path.cubicTo(w * 0.86, 0, w * 0.98, h * 0.14, w * 0.98, h * 0.44);
    path.cubicTo(w * 0.98, h * 0.74, w * 0.66, h * 0.92, w * 0.5, h);
    path.cubicTo(w * 0.34, h * 0.92, 0.02, h * 0.74, 0.02, h * 0.44);
    path.cubicTo(0.02, h * 0.14, w * 0.14, 0, w * 0.5, 0);
    path.close();

    // 3D Blue Gradient with depth
    final paint = Paint()
      ..shader = const LinearGradient(
        colors: [
          Color(0xFF38BDF8), // Glossy cyan top highlight
          Color(0xFF0075FF), // Vivid royal blue
          Color(0xFF0049B7), // Deep cobalt shadow
        ],
        stops: [0.0, 0.45, 1.0],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(Rect.fromLTWH(0, 0, w, h))
      ..style = PaintingStyle.fill;

    canvas.drawPath(path, paint);

    // 3D Gloss Highlight Rim along top and left edge
    final highlight = Path();
    highlight.moveTo(w * 0.5, h * 0.035);
    highlight.cubicTo(
      w * 0.18,
      h * 0.035,
      w * 0.07,
      h * 0.18,
      w * 0.07,
      h * 0.44,
    );
    final highlightPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.40)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.6
      ..strokeCap = StrokeCap.round;
    canvas.drawPath(highlight, highlightPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
