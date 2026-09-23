import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../core/widgets/app_button.dart';

/// Patient Permissions Setup Screen matching design-references/patient/permissions.png.
class PermissionsScreen extends StatefulWidget {
  const PermissionsScreen({super.key});

  @override
  State<PermissionsScreen> createState() => _PermissionsScreenState();
}

class _PermissionsScreenState extends State<PermissionsScreen> {
  bool _cameraEnabled = true;
  bool _mediaEnabled = true;
  bool _notificationsEnabled = true;
  bool _locationEnabled = true;

  void _handleNext() {
    context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios_new_rounded,
            color: Color(0xFF0F172A),
            size: 20,
          ),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          TextButton(
            onPressed: () => context.go('/home'),
            child: const Text(
              'Skip',
              style: TextStyle(
                color: Color(0xFF1D4ED8),
                fontSize: 14,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          const SizedBox(width: AppSpacing.sm),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xl),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Stepper: 1. Account, 2. Permissions, 3. Done
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildStepNode(1, 'Account', isCompleted: true),
                  _buildStepLine(isCompleted: true),
                  _buildStepNode(2, 'Permissions', isActive: true),
                  _buildStepLine(isCompleted: false),
                  _buildStepNode(3, 'Done', isActive: false),
                ],
              ),
              const SizedBox(height: AppSpacing.lg),

              const Text(
                'Give the Right\nPermissions',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF0F172A),
                  letterSpacing: -0.5,
                  height: 1.2,
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Allow NOVARA to access certain features to give you a better experience.',
                style: TextStyle(fontSize: 13, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: AppSpacing.xl),

              // 1. Camera Toggle Card
              _buildPermissionTile(
                icon: Icons.camera_alt_rounded,
                iconBg: const Color(0xFFFCE7F3),
                iconColor: const Color(0xFFEC4899),
                title: 'Camera',
                subtitle:
                    'Scan and upload medical reports, prescriptions and documents.',
                value: _cameraEnabled,
                onChanged: (v) => setState(() => _cameraEnabled = v),
              ),
              const SizedBox(height: AppSpacing.sm),

              // 2. Photos & Media Card
              _buildPermissionTile(
                icon: Icons.photo_library_rounded,
                iconBg: const Color(0xFFEFF6FF),
                iconColor: const Color(0xFF2563EB),
                title: 'Photos & Media',
                subtitle:
                    'Select reports, diagnostic images and files from your device.',
                value: _mediaEnabled,
                onChanged: (v) => setState(() => _mediaEnabled = v),
              ),
              const SizedBox(height: AppSpacing.sm),

              // 3. Notifications Card
              _buildPermissionTile(
                icon: Icons.notifications_rounded,
                iconBg: const Color(0xFFECFDF5),
                iconColor: const Color(0xFF10B981),
                title: 'Notifications',
                subtitle:
                    'Get reminders for medicines, appointments and emergency alerts.',
                value: _notificationsEnabled,
                onChanged: (v) => setState(() => _notificationsEnabled = v),
              ),
              const SizedBox(height: AppSpacing.sm),

              // 4. Location Card
              _buildPermissionTile(
                icon: Icons.location_on_rounded,
                iconBg: const Color(0xFFF5F3FF),
                iconColor: const Color(0xFF8B5CF6),
                title: 'Location',
                subtitle:
                    'Find nearby verified hospitals, trauma centers and pharmacies.',
                value: _locationEnabled,
                onChanged: (v) => setState(() => _locationEnabled = v),
              ),
              const SizedBox(height: AppSpacing.xl),

              // Privacy card
              Container(
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: const Color(0xFFEFF6FF),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFDBEAFE)),
                ),
                child: Row(
                  children: const [
                    Icon(
                      Icons.verified_user_rounded,
                      color: Color(0xFF2563EB),
                      size: 28,
                    ),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Your Privacy Matters',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                              color: Color(0xFF0F172A),
                            ),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'We only access what you allow. You can change these permissions anytime in Settings.',
                            style: TextStyle(
                              fontSize: 11,
                              color: Color(0xFF64748B),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.xl),

              AppButton(
                label: 'Next',
                variant: AppButtonVariant.primary,
                size: AppButtonSize.large,
                isFullWidth: true,
                icon: Icons.arrow_forward_rounded,
                iconAfterLabel: true,
                onPressed: _handleNext,
              ),
              const SizedBox(height: AppSpacing.xl),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPermissionTile({
    required IconData icon,
    required Color iconBg,
    required Color iconColor,
    required String title,
    required String subtitle,
    required bool value,
    required ValueChanged<bool> onChanged,
  }) {
    return Material(
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(color: Color(0xFFE2E8F0)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(color: iconBg, shape: BoxShape.circle),
              child: Icon(icon, color: iconColor, size: 22),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 11.5,
                      color: Color(0xFF64748B),
                    ),
                  ),
                ],
              ),
            ),
            Switch(
              value: value,
              activeThumbColor: const Color(0xFF1D4ED8),
              onChanged: onChanged,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepNode(
    int step,
    String label, {
    bool isActive = false,
    bool isCompleted = false,
  }) {
    Color bg = const Color(0xFFE2E8F0);
    Color fg = const Color(0xFF64748B);
    if (isCompleted) {
      bg = const Color(0xFF10B981);
      fg = Colors.white;
    } else if (isActive) {
      bg = const Color(0xFF1D4ED8);
      fg = Colors.white;
    }

    return Column(
      children: [
        Container(
          width: 28,
          height: 28,
          decoration: BoxDecoration(color: bg, shape: BoxShape.circle),
          child: Center(
            child: isCompleted
                ? const Icon(Icons.check_rounded, size: 16, color: Colors.white)
                : Text(
                    '$step',
                    style: TextStyle(
                      color: fg,
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: TextStyle(
            fontSize: 10,
            color: isActive ? const Color(0xFF1D4ED8) : const Color(0xFF94A3B8),
            fontWeight: isActive ? FontWeight.w700 : FontWeight.w500,
          ),
        ),
      ],
    );
  }

  Widget _buildStepLine({required bool isCompleted}) {
    return Container(
      width: 40,
      height: 2,
      margin: const EdgeInsets.only(bottom: 16),
      color: isCompleted ? const Color(0xFF10B981) : const Color(0xFFE2E8F0),
    );
  }
}
