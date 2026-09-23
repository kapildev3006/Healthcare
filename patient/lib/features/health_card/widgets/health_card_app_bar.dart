import 'package:flutter/material.dart';
import '../../../app/theme/app_colors.dart';
import '../../../core/widgets/clinical_app_bar.dart';

/// Top App Bar for the Digital Health Card screen.
/// Reuses ClinicalAppBar while matching the exact circular button styling from the reference.
class HealthCardAppBar extends StatelessWidget implements PreferredSizeWidget {
  final VoidCallback? onBackPressed;
  final VoidCallback? onMoreOptionsPressed;

  const HealthCardAppBar({
    super.key,
    this.onBackPressed,
    this.onMoreOptionsPressed,
  });

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return ClinicalAppBar(
      title: 'Digital Health Card',
      backgroundColor: Colors.transparent,
      leading: Padding(
        padding: const EdgeInsets.only(left: 12),
        child: Center(
          child: Material(
            color: Colors.white,
            shape: const CircleBorder(
              side: BorderSide(color: AppColors.border, width: 1),
            ),
            child: InkWell(
              customBorder: const CircleBorder(),
              onTap: onBackPressed ?? () => Navigator.of(context).maybePop(),
              child: const SizedBox(
                width: 38,
                height: 38,
                child: Icon(
                  Icons.arrow_back_rounded,
                  size: 20,
                  color: AppColors.textPrimary,
                ),
              ),
            ),
          ),
        ),
      ),
      actions: [
        Padding(
          padding: const EdgeInsets.only(right: 16),
          child: Center(
            child: Material(
              color: Colors.white,
              shape: const CircleBorder(
                side: BorderSide(color: AppColors.border, width: 1),
              ),
              child: InkWell(
                customBorder: const CircleBorder(),
                onTap: onMoreOptionsPressed,
                child: const SizedBox(
                  width: 38,
                  height: 38,
                  child: Icon(
                    Icons.more_vert_rounded,
                    size: 20,
                    color: AppColors.textPrimary,
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
