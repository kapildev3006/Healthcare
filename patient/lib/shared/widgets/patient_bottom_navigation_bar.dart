import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../app/theme/app_colors.dart';
import '../../app/theme/app_typography.dart';

/// Standard 5-tab Patient bottom navigation bar matching design-references/patient/
class PatientBottomNavigationBar extends StatelessWidget {
  final String currentRoute;

  const PatientBottomNavigationBar({super.key, required this.currentRoute});

  int _calculateSelectedIndex() {
    if (currentRoute.startsWith('/medical-history')) return 1;
    if (currentRoute.startsWith('/health-card')) return 2;
    if (currentRoute.startsWith('/reports')) return 3;
    if (currentRoute.startsWith('/medical-profile') ||
        currentRoute.startsWith('/settings') ||
        currentRoute.startsWith('/personal-information') ||
        currentRoute.startsWith('/allergies-conditions') ||
        currentRoute.startsWith('/current-medications') ||
        currentRoute.startsWith('/emergency-contacts')) {
      return 4;
    }
    return 0; // Default to /home
  }

  void _onItemTapped(BuildContext context, int index) {
    switch (index) {
      case 0:
        context.go('/home');
        break;
      case 1:
        context.go('/medical-history');
        break;
      case 2:
        context.go('/health-card');
        break;
      case 3:
        context.go('/reports');
        break;
      case 4:
        context.go('/medical-profile');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final selectedIndex = _calculateSelectedIndex();

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: const Border(
          top: BorderSide(color: Color(0xFFE2E8F0), width: 1),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: BottomNavigationBar(
        currentIndex: selectedIndex,
        onTap: (idx) => _onItemTapped(context, idx),
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.white,
        selectedItemColor: AppColors.primary,
        unselectedItemColor: const Color(0xFF94A3B8),
        selectedLabelStyle: AppTypography.labelSmall.copyWith(
          fontWeight: FontWeight.w700,
        ),
        unselectedLabelStyle: AppTypography.labelSmall.copyWith(
          fontWeight: FontWeight.w500,
        ),
        elevation: 0,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            activeIcon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.history_outlined),
            activeIcon: Icon(Icons.history),
            label: 'History',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.credit_card_outlined),
            activeIcon: Icon(Icons.credit_card),
            label: 'Health Card',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.folder_outlined),
            activeIcon: Icon(Icons.folder),
            label: 'Reports',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
