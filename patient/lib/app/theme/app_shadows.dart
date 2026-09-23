import 'package:flutter/widgets.dart';

/// Extremely subtle shadow presets.
/// Clinical UI relies primarily on surface contrast, borders, and hierarchy.
class AppShadows {
  AppShadows._();

  static const List<BoxShadow> none = [];

  /// Very subtle card elevation for crisp borders
  static const List<BoxShadow> card = [
    BoxShadow(
      color: Color(0x0A0F172A), // 4% slate shadow
      blurRadius: 3,
      offset: Offset(0, 1),
    ),
  ];

  /// Subtle interactive / modal elevation
  static const List<BoxShadow> elevated = [
    BoxShadow(
      color: Color(0x120F172A), // 7% slate shadow
      blurRadius: 8,
      offset: Offset(0, 2),
    ),
  ];
}
