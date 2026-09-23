import 'package:flutter/widgets.dart';

/// 8-point-oriented spacing scale for clinical UI consistency.
class AppSpacing {
  AppSpacing._();

  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0;

  // Convenient EdgeInsets presets
  static const EdgeInsets pXs = EdgeInsets.all(xs);
  static const EdgeInsets pSm = EdgeInsets.all(sm);
  static const EdgeInsets pMd = EdgeInsets.all(md);
  static const EdgeInsets pLg = EdgeInsets.all(lg);
  static const EdgeInsets pXl = EdgeInsets.all(xl);

  // Horizontal & Vertical presets
  static const EdgeInsets pxSm = EdgeInsets.symmetric(horizontal: sm);
  static const EdgeInsets pxMd = EdgeInsets.symmetric(horizontal: md);
  static const EdgeInsets pxLg = EdgeInsets.symmetric(horizontal: lg);

  static const EdgeInsets pyXs = EdgeInsets.symmetric(vertical: xs);
  static const EdgeInsets pySm = EdgeInsets.symmetric(vertical: sm);
  static const EdgeInsets pyMd = EdgeInsets.symmetric(vertical: md);
  static const EdgeInsets pyLg = EdgeInsets.symmetric(vertical: lg);

  // Gaps
  static const SizedBox gapXs = SizedBox(width: xs, height: xs);
  static const SizedBox gapSm = SizedBox(width: sm, height: sm);
  static const SizedBox gapMd = SizedBox(width: md, height: md);
  static const SizedBox gapLg = SizedBox(width: lg, height: lg);
  static const SizedBox gapXl = SizedBox(width: xl, height: xl);
  static const SizedBox gapXxl = SizedBox(width: xxl, height: xxl);
}
