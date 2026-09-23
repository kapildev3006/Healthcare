import 'package:flutter/material.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';

/// Top header for Medical History screen matching design-references/patient/medical-history.png.
class HistoryHeader extends StatelessWidget {
  final bool isSearchOpen;
  final TextEditingController searchController;
  final VoidCallback onSearchToggle;
  final ValueChanged<String>? onSearchChanged;
  final VoidCallback onFilterPressed;

  const HistoryHeader({
    super.key,
    required this.isSearchOpen,
    required this.searchController,
    required this.onSearchToggle,
    this.onSearchChanged,
    required this.onFilterPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Title and subtitle
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Medical History',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w800,
                      color: Color(0xFF102A43),
                      letterSpacing: -0.5,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'Your health journey, all in one place',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      color: Color(0xFF627D98),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: AppSpacing.sm),

            // Top-right action buttons
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                // 1. Search action button
                Material(
                  color: isSearchOpen ? const Color(0xFFE0F2FE) : Colors.white,
                  shape: CircleBorder(
                    side: BorderSide(
                      color: isSearchOpen
                          ? const Color(0xFF0284C7)
                          : const Color(0xFFE2E8F0),
                    ),
                  ),
                  child: InkWell(
                    onTap: onSearchToggle,
                    customBorder: const CircleBorder(),
                    child: Container(
                      width: 44,
                      height: 44,
                      alignment: Alignment.center,
                      child: Icon(
                        isSearchOpen
                            ? Icons.close_rounded
                            : Icons.search_rounded,
                        size: 22,
                        color: isSearchOpen
                            ? const Color(0xFF0284C7)
                            : const Color(0xFF1E293B),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: AppSpacing.sm),

                // 2. Filter pill action button
                Material(
                  color: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(22),
                    side: const BorderSide(color: Color(0xFFE2E8F0)),
                  ),
                  child: InkWell(
                    onTap: onFilterPressed,
                    borderRadius: BorderRadius.circular(22),
                    child: Container(
                      height: 44,
                      padding: const EdgeInsets.symmetric(horizontal: 14),
                      alignment: Alignment.center,
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: const [
                          Icon(
                            Icons.filter_alt_outlined,
                            size: 18,
                            color: Color(0xFF1E293B),
                          ),
                          SizedBox(width: 6),
                          Text(
                            'Filter',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFF1E293B),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),

        // Animated / conditional inline search input field
        if (isSearchOpen) ...[
          const SizedBox(height: AppSpacing.md),
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF0284C7), width: 1.5),
              boxShadow: const [
                BoxShadow(
                  color: Color(0x0F000000),
                  blurRadius: 8,
                  offset: Offset(0, 2),
                ),
              ],
            ),
            padding: const EdgeInsets.symmetric(horizontal: 14),
            child: TextField(
              controller: searchController,
              autofocus: true,
              onChanged: onSearchChanged,
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: AppColors.textPrimary,
              ),
              decoration: InputDecoration(
                icon: const Icon(
                  Icons.search_rounded,
                  color: Color(0xFF0284C7),
                  size: 20,
                ),
                hintText: 'Search by facility, doctor, test, or note...',
                hintStyle: const TextStyle(
                  fontSize: 14,
                  color: Color(0xFF94A3B8),
                ),
                border: InputBorder.none,
                isDense: true,
                contentPadding: const EdgeInsets.symmetric(vertical: 12),
                suffixIcon: searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(
                          Icons.clear_rounded,
                          size: 18,
                          color: Color(0xFF94A3B8),
                        ),
                        onPressed: () {
                          searchController.clear();
                          onSearchChanged?.call('');
                        },
                      )
                    : null,
              ),
            ),
          ),
        ],
      ],
    );
  }
}
