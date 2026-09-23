import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';
import '../../app/theme/app_radius.dart';
import '../../app/theme/app_spacing.dart';
import '../../app/theme/app_typography.dart';

enum AppButtonVariant { primary, secondary, outline, destructive }

enum AppButtonSize { small, medium, large }

/// Standardized Clinical Action Button.
/// Supports multiple semantic variants, loading indicators, and icons.
class AppButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final AppButtonVariant variant;
  final AppButtonSize size;
  final bool isLoading;
  final bool isFullWidth;
  final IconData? icon;
  final IconData? prefixIcon;
  final bool iconAfterLabel;

  const AppButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.variant = AppButtonVariant.primary,
    this.size = AppButtonSize.medium,
    this.isLoading = false,
    this.isFullWidth = false,
    this.icon,
    this.prefixIcon,
    this.iconAfterLabel = false,
  });

  @override
  Widget build(BuildContext context) {
    final bool isEnabled = onPressed != null && !isLoading;

    // Heights and Paddings
    final double height;
    final EdgeInsetsGeometry padding;
    final TextStyle textStyle;
    final double iconSize;

    switch (size) {
      case AppButtonSize.small:
        height = 36.0;
        padding = const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.xs,
        );
        textStyle = AppTypography.labelMedium;
        iconSize = 16.0;
        break;
      case AppButtonSize.medium:
        height = 46.0;
        padding = const EdgeInsets.symmetric(
          horizontal: AppSpacing.lg,
          vertical: AppSpacing.sm,
        );
        textStyle = AppTypography.labelLarge;
        iconSize = 18.0;
        break;
      case AppButtonSize.large:
        height = 54.0;
        padding = const EdgeInsets.symmetric(
          horizontal: AppSpacing.xl,
          vertical: AppSpacing.md,
        );
        textStyle = AppTypography.titleMedium.copyWith(
          fontWeight: FontWeight.w600,
        );
        iconSize = 20.0;
        break;
    }

    // Color mappings based on variant
    Color backgroundColor;
    Color foregroundColor;
    BorderSide borderSide;

    switch (variant) {
      case AppButtonVariant.primary:
        backgroundColor = isEnabled
            ? AppColors.primary
            : AppColors.surfaceVariant;
        foregroundColor = isEnabled
            ? AppColors.onPrimary
            : AppColors.textDisabled;
        borderSide = BorderSide.none;
        break;
      case AppButtonVariant.secondary:
        backgroundColor = isEnabled
            ? AppColors.secondary
            : AppColors.surfaceVariant;
        foregroundColor = isEnabled
            ? AppColors.onSecondary
            : AppColors.textDisabled;
        borderSide = BorderSide.none;
        break;
      case AppButtonVariant.outline:
        backgroundColor = Colors.transparent;
        foregroundColor = isEnabled
            ? AppColors.primary
            : AppColors.textDisabled;
        borderSide = BorderSide(
          color: isEnabled ? AppColors.border : AppColors.borderSubtle,
          width: 1.5,
        );
        break;
      case AppButtonVariant.destructive:
        backgroundColor = isEnabled
            ? AppColors.emergency
            : AppColors.surfaceVariant;
        foregroundColor = isEnabled
            ? AppColors.onEmergency
            : AppColors.textDisabled;
        borderSide = BorderSide.none;
        break;
    }

    Widget content;
    if (isLoading) {
      content = SizedBox(
        width: iconSize + 2,
        height: iconSize + 2,
        child: CircularProgressIndicator(
          strokeWidth: 2.2,
          valueColor: AlwaysStoppedAnimation<Color>(foregroundColor),
        ),
      );
    } else {
      final List<Widget> children = [];
      final IconData? effectiveIcon = icon ?? prefixIcon;
      if (effectiveIcon != null && !iconAfterLabel) {
        children.add(
          Icon(effectiveIcon, size: iconSize, color: foregroundColor),
        );
        children.add(const SizedBox(width: AppSpacing.sm));
      }
      children.add(
        Text(
          label,
          style: textStyle.copyWith(color: foregroundColor),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
      );
      if (effectiveIcon != null && iconAfterLabel) {
        children.add(const SizedBox(width: AppSpacing.sm));
        children.add(
          Icon(effectiveIcon, size: iconSize, color: foregroundColor),
        );
      }

      content = Row(
        mainAxisSize: isFullWidth ? MainAxisSize.max : MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: children,
      );
    }

    Widget button = Material(
      color: backgroundColor,
      shape: RoundedRectangleBorder(
        borderRadius: AppRadius.roundedMd,
        side: borderSide,
      ),
      child: InkWell(
        onTap: isEnabled ? onPressed : null,
        borderRadius: AppRadius.roundedMd,
        child: Container(
          height: height,
          padding: padding,
          alignment: Alignment.center,
          child: content,
        ),
      ),
    );

    if (isFullWidth) {
      button = SizedBox(width: double.infinity, child: button);
    }

    return button;
  }
}
