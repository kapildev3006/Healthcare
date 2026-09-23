import 'package:flutter/material.dart';

/// Semantic healthcare colors for the Patient application.
/// Uses semantic naming rather than raw hex values in UI components.
class AppColors {
  AppColors._();

  // Core brand & structure
  static const Color primary = Color(0xFF0F3A66); // Clinical Navy
  static const Color primaryLight = Color(0xFF1E5B96);
  static const Color primaryContainer = Color(0xFFE8F1FA);
  static const Color onPrimary = Color(0xFFFFFFFF);

  static const Color secondary = Color(0xFF00838F); // Medical Teal
  static const Color secondaryLight = Color(0xFF00ACC1);
  static const Color secondaryContainer = Color(0xFFE0F7FA);
  static const Color onSecondary = Color(0xFFFFFFFF);

  // Surface and canvas (Light theme first)
  static const Color background = Color(0xFFF8FAFC); // Clean clinical slate-50
  static const Color surface = Color(0xFFFFFFFF); // Pure white card surface
  static const Color surfaceVariant = Color(
    0xFFF1F5F9,
  ); // Slate-100 neutral fill

  // Borders & Dividers
  static const Color border = Color(0xFFE2E8F0); // Slate-200 standard border
  static const Color borderSubtle = Color(0xFFF1F5F9); // Subtle inner divider
  static const Color borderFocused = Color(0xFF0F3A66);

  // Typography
  static const Color textPrimary = Color(0xFF0F172A); // Slate-900 high contrast
  static const Color textSecondary = Color(
    0xFF475569,
  ); // Slate-600 readable body
  static const Color textTertiary = Color(
    0xFF94A3B8,
  ); // Slate-400 placeholder/caption
  static const Color textDisabled = Color(0xFFCBD5E1);

  // Semantic Status Colors
  // Success
  static const Color success = Color(0xFF059669); // Emerald-600
  static const Color successLight = Color(0xFFECFDF5); // Emerald-50
  static const Color successBorder = Color(0xFFA7F3D0); // Emerald-200
  static const Color onSuccess = Color(0xFFFFFFFF);

  // Warning / Attention
  static const Color warning = Color(0xFFD97706); // Amber-600
  static const Color warningLight = Color(0xFFFFFBEB); // Amber-50
  static const Color warningBorder = Color(0xFFFDE68A); // Amber-200
  static const Color onWarning = Color(0xFFFFFFFF);

  // Error / Destructive
  static const Color error = Color(0xFFDC2626); // Red-600
  static const Color errorLight = Color(0xFFFEF2F2); // Red-50
  static const Color errorBorder = Color(0xFFFECACA); // Red-200
  static const Color onError = Color(0xFFFFFFFF);

  // Info / Advisory
  static const Color info = Color(0xFF2563EB); // Blue-600
  static const Color infoLight = Color(0xFFEFF6FF); // Blue-50
  static const Color infoBorder = Color(0xFFBFDBFE); // Blue-200
  static const Color onInfo = Color(0xFFFFFFFF);

  // Emergency / Break-Glass
  static const Color emergency = Color(0xFFB91C1C); // Crimson-700
  static const Color emergencyLight = Color(0xFFFEF2F2); // Rose-50
  static const Color emergencyBorder = Color(0xFFFCA5A5); // Rose-300
  static const Color onEmergency = Color(0xFFFFFFFF);

  // Critical / High-Risk Alert
  static const Color critical = Color(0xFF991B1B); // Dark red
  static const Color criticalContainer = Color(0xFFFEE2E2);

  // Neutral Badge
  static const Color neutral = Color(0xFF64748B); // Slate-500
  static const Color neutralLight = Color(0xFFF1F5F9);
  static const Color neutralBorder = Color(0xFFE2E8F0);
}
