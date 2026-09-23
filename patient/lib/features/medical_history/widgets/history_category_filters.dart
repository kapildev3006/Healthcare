import 'package:flutter/material.dart';
import '../models/medical_history_data.dart';

/// Horizontally scrollable category filter chips matching design-references/patient/medical-history.png.
class HistoryCategoryFilters extends StatelessWidget {
  final HistoryFilterCategory selectedCategory;
  final ValueChanged<HistoryFilterCategory> onCategorySelected;

  const HistoryCategoryFilters({
    super.key,
    required this.selectedCategory,
    required this.onCategorySelected,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      physics: const BouncingScrollPhysics(),
      child: Row(
        children: HistoryFilterCategory.values.map((category) {
          final isSelected = category == selectedCategory;
          final isEmergency = category == HistoryFilterCategory.emergency;

          // Icon color determination based on category
          Color iconColor;
          if (isSelected) {
            iconColor = Colors.white;
          } else if (isEmergency) {
            iconColor = const Color(0xFFE11D48); // Red emergency siren
          } else if (category == HistoryFilterCategory.test) {
            iconColor = const Color(0xFF0284C7); // Blue science flask
          } else {
            iconColor = const Color(0xFF0284C7); // Blue
          }

          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: Material(
              color: isSelected ? const Color(0xFF0066F6) : Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(24),
                side: BorderSide(
                  color: isSelected
                      ? const Color(0xFF0066F6)
                      : const Color(0xFFE2E8F0),
                  width: 1,
                ),
              ),
              child: InkWell(
                onTap: () => onCategorySelected(category),
                borderRadius: BorderRadius.circular(24),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 9,
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      if (category.icon != null) ...[
                        Icon(category.icon, size: 17, color: iconColor),
                        const SizedBox(width: 6),
                      ],
                      Text(
                        category.label,
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: isSelected
                              ? FontWeight.w700
                              : FontWeight.w600,
                          color: isSelected
                              ? Colors.white
                              : const Color(0xFF1E293B),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}
