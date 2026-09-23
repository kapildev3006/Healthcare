import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';
import '../../app/theme/app_radius.dart';

/// Lightweight loading skeleton built with native Flutter animation primitives.
/// No external shimmer package required.
class LoadingSkeleton extends StatefulWidget {
  final double? width;
  final double? height;
  final BorderRadiusGeometry borderRadius;
  final bool animate;

  const LoadingSkeleton({
    super.key,
    this.width,
    this.height,
    this.borderRadius = AppRadius.roundedMd,
    this.animate = true,
  });

  factory LoadingSkeleton.circular({required double size, Key? key}) =>
      LoadingSkeleton(
        key: key,
        width: size,
        height: size,
        borderRadius: AppRadius.roundedFull,
      );

  factory LoadingSkeleton.text({
    double? width,
    double height = 14.0,
    Key? key,
  }) => LoadingSkeleton(
    key: key,
    width: width,
    height: height,
    borderRadius: AppRadius.roundedSm,
  );

  factory LoadingSkeleton.card({
    double? width,
    double height = 90.0,
    Key? key,
  }) => LoadingSkeleton(
    key: key,
    width: width,
    height: height,
    borderRadius: AppRadius.roundedLg,
  );

  @override
  State<LoadingSkeleton> createState() => _LoadingSkeletonState();
}

class _LoadingSkeletonState extends State<LoadingSkeleton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );

    _opacityAnimation = Tween<double>(
      begin: 0.35,
      end: 0.75,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));

    if (widget.animate) {
      _controller.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _opacityAnimation,
      builder: (context, child) {
        return Opacity(
          opacity: widget.animate ? _opacityAnimation.value : 0.5,
          child: child,
        );
      },
      child: Container(
        width: widget.width,
        height: widget.height,
        decoration: BoxDecoration(
          color: AppColors.border,
          borderRadius: widget.borderRadius,
        ),
      ),
    );
  }
}
