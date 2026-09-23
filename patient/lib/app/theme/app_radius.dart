import 'package:flutter/widgets.dart';

/// Centralized corner radius scale for Patient application.
class AppRadius {
  AppRadius._();

  static const double sm = 6.0;
  static const double md = 10.0;
  static const double lg = 16.0;
  static const double xl = 24.0;
  static const double full = 9999.0;

  static const Radius rSm = Radius.circular(sm);
  static const Radius rMd = Radius.circular(md);
  static const Radius rLg = Radius.circular(lg);
  static const Radius rXl = Radius.circular(xl);

  static const BorderRadius roundedSm = BorderRadius.all(rSm);
  static const BorderRadius roundedMd = BorderRadius.all(rMd);
  static const BorderRadius roundedLg = BorderRadius.all(rLg);
  static const BorderRadius roundedXl = BorderRadius.all(rXl);
  static const BorderRadius roundedFull = BorderRadius.all(
    Radius.circular(full),
  );
}
