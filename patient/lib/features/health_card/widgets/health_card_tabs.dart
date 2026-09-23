import 'package:flutter/material.dart';
import '../../../app/theme/app_colors.dart';

/// Top selectable tabs for the Digital Health Card feature:
/// - My Health Card (active/implemented)
/// - Emergency Info (placeholder)
/// - Access History (placeholder)
class HealthCardTabs extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onTabSelected;

  const HealthCardTabs({
    super.key,
    required this.selectedIndex,
    required this.onTabSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: AppColors.border, width: 1)),
      ),
      child: Row(
        children: [
          _TabItem(
            label: 'My Health Card',
            isSelected: selectedIndex == 0,
            onTap: () => onTabSelected(0),
          ),
          _TabItem(
            label: 'Emergency Info',
            isSelected: selectedIndex == 1,
            onTap: () => onTabSelected(1),
          ),
          _TabItem(
            label: 'Access History',
            isSelected: selectedIndex == 2,
            onTap: () => onTabSelected(2),
          ),
        ],
      ),
    );
  }
}

class _TabItem extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _TabItem({
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    const activeColor = Color(0xFF1D4ED8);
    const inactiveColor = AppColors.textSecondary;

    return Expanded(
      child: InkWell(
        onTap: onTap,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 12),
              child: Text(
                label,
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                  color: isSelected ? activeColor : inactiveColor,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            Container(
              height: 2.5,
              decoration: BoxDecoration(
                color: isSelected ? activeColor : Colors.transparent,
                borderRadius: const BorderRadius.vertical(
                  top: Radius.circular(2),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
