import 'package:flutter/material.dart';

/// Accurate vector render of the NOVARA 3D Heart Logo with white ECG pulse waveform,
/// matching the exact design reference:
/// - 3D split shading: bright azure gradient on left lobe, rich royal blue on right lobe.
/// - Top-left curved gloss specular highlight.
/// - Crisp, high-amplitude white ECG heartbeat pulse crossing through the heart.
class NovaraHeartLogo extends StatelessWidget {
  final double size;

  const NovaraHeartLogo({super.key, this.size = 118});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF0066FF).withValues(alpha: 0.22),
            blurRadius: size * 0.24,
            offset: Offset(0, size * 0.08),
          ),
        ],
      ),
      child: CustomPaint(size: Size(size, size), painter: _HeartLogoPainter()),
    );
  }
}

class _HeartLogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final width = size.width;
    final height = size.height;

    // 1. Precise Heart Path
    final heartPath = Path();
    heartPath.moveTo(width * 0.50, height * 0.28);
    // Left lobe top curve
    heartPath.cubicTo(
      width * 0.42,
      height * 0.08,
      width * 0.08,
      height * 0.06,
      width * 0.06,
      height * 0.40,
    );
    // Left lobe down to bottom tip
    heartPath.cubicTo(
      width * 0.05,
      height * 0.62,
      width * 0.26,
      height * 0.80,
      width * 0.50,
      height * 0.94,
    );
    // Right lobe up from bottom tip
    heartPath.cubicTo(
      width * 0.74,
      height * 0.80,
      width * 0.95,
      height * 0.62,
      width * 0.94,
      height * 0.40,
    );
    // Right lobe top curve back to cleft
    heartPath.cubicTo(
      width * 0.92,
      height * 0.06,
      width * 0.58,
      height * 0.08,
      width * 0.50,
      height * 0.28,
    );
    heartPath.close();

    // 2. Split 3D Rendering:
    // Left Half: Bright Vibrant Azure / Sky Blue Gradient
    final leftClip = Rect.fromLTWH(0, 0, width * 0.50, height);
    canvas.save();
    canvas.clipPath(heartPath);
    canvas.clipRect(leftClip);

    final leftPaint = Paint()
      ..shader = const LinearGradient(
        colors: [
          Color(0xFF38BDF8), // Bright cyan highlight
          Color(0xFF007BFF), // Vivid primary electric blue
          Color(0xFF0056E0), // Deep blue
        ],
        stops: [0.0, 0.50, 1.0],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(Rect.fromLTWH(0, 0, width, height))
      ..style = PaintingStyle.fill;
    canvas.drawRect(leftClip, leftPaint);

    // Left Lobe Curved Gloss Reflection
    final glossPath = Path();
    glossPath.moveTo(width * 0.16, height * 0.32);
    glossPath.cubicTo(
      width * 0.16,
      height * 0.18,
      width * 0.30,
      height * 0.14,
      width * 0.42,
      height * 0.20,
    );
    final glossPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.32)
      ..style = PaintingStyle.stroke
      ..strokeWidth = width * 0.045
      ..strokeCap = StrokeCap.round;
    canvas.drawPath(glossPath, glossPaint);

    canvas.restore();

    // Right Half: Rich Royal / Cobalt Blue in Shadow
    final rightClip = Rect.fromLTWH(width * 0.50, 0, width * 0.50, height);
    canvas.save();
    canvas.clipPath(heartPath);
    canvas.clipRect(rightClip);

    final rightPaint = Paint()
      ..shader = const LinearGradient(
        colors: [
          Color(0xFF005FD8), // Deep royal blue
          Color(0xFF0044B8), // Cobalt blue
          Color(0xFF002F8A), // Dark navy blue shadow
        ],
        stops: [0.0, 0.55, 1.0],
        begin: Alignment.topCenter,
        end: Alignment.bottomRight,
      ).createShader(Rect.fromLTWH(0, 0, width, height))
      ..style = PaintingStyle.fill;
    canvas.drawRect(rightClip, rightPaint);

    // Subtle dark shadow line along the vertical fold
    final foldPaint = Paint()
      ..color = const Color(0xFF001F60).withValues(alpha: 0.25)
      ..strokeWidth = 1.5
      ..style = PaintingStyle.stroke;
    canvas.drawLine(
      Offset(width * 0.50, height * 0.28),
      Offset(width * 0.50, height * 0.94),
      foldPaint,
    );

    canvas.restore();

    // 3. Crisp White ECG Pulse Waveform (Heartbeat)
    final ecgPath = Path();
    final yBase = height * 0.52;

    // Horizontal left entrance
    ecgPath.moveTo(width * 0.05, yBase);
    ecgPath.lineTo(width * 0.34, yBase);
    // Slight downward dip (Q wave)
    ecgPath.lineTo(width * 0.39, yBase + height * 0.05);
    // Tall, sharp triangular peak (R peak reaching high between lobes)
    ecgPath.lineTo(width * 0.49, yBase - height * 0.33);
    // Steep plunge downward (S wave)
    ecgPath.lineTo(width * 0.57, yBase + height * 0.23);
    // Upward recovery (T wave)
    ecgPath.lineTo(width * 0.65, yBase - height * 0.06);
    // Return to baseline
    ecgPath.lineTo(width * 0.69, yBase);
    // Horizontal right exit
    ecgPath.lineTo(width * 0.95, yBase);

    final ecgPaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.stroke
      ..strokeWidth = width * 0.076
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    // Clip to heart boundary so stroke cuts cleanly at heart edges
    canvas.save();
    canvas.clipPath(heartPath);
    canvas.drawPath(ecgPath, ecgPaint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
