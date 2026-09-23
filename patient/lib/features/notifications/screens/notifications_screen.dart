import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/app_radius.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';

/// Notifications Center Screen matching design-references/patient/notifications.png.
class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> {
  final List<Map<String, dynamic>> _notifications = [
    {
      'id': 'notif-1',
      'title': 'Emergency Break-Glass Alert',
      'body':
          'Emergency break-glass access was invoked by Dr. Anita Roy at Max Super Speciality ER.',
      'time': '10 min ago',
      'type': 'emergency',
      'isRead': false,
      'route': '/emergency-access/emg-log-01',
    },
    {
      'id': 'notif-2',
      'title': 'New Access Request',
      'body':
          'Dr. Rajesh Sharma (Max Pulmonology) requested access to your clinical record.',
      'time': '1 hour ago',
      'type': 'request',
      'isRead': false,
      'route': '/access-requests',
    },
    {
      'id': 'notif-3',
      'title': 'AI Decision Support Completed',
      'body':
          'Automated scan finished for Chest X-Ray PA View. Grad-CAM visual heatmap ready.',
      'time': 'Yesterday',
      'type': 'ai',
      'isRead': true,
      'route': '/ai-analysis/rec-1',
    },
    {
      'id': 'notif-4',
      'title': 'Upcoming Follow-up Visit',
      'body':
          'Appointment with Dr. Rajesh Sharma confirmed for 28 Sep 2026 at 11:00 AM.',
      'time': '2 days ago',
      'type': 'appointment',
      'isRead': true,
      'route': '/appointments',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF0F172A)),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          'Notifications',
          style: AppTypography.headlineSmall.copyWith(
            fontWeight: FontWeight.w800,
            color: const Color(0xFF0F172A),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () {
              setState(() {
                for (var n in _notifications) {
                  n['isRead'] = true;
                }
              });
            },
            child: const Text('Mark all read'),
          ),
        ],
      ),
      body: _notifications.isEmpty
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(AppSpacing.xl),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: 80,
                      height: 80,
                      decoration: const BoxDecoration(
                        color: Color(0xFFF1F5F9),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.notifications_none_outlined,
                        size: 40,
                        color: Color(0xFF64748B),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Text(
                      "You're All Caught Up!",
                      style: AppTypography.titleLarge.copyWith(
                        fontWeight: FontWeight.w800,
                        color: const Color(0xFF0F172A),
                      ),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'No new notifications at the moment.',
                      style: TextStyle(fontSize: 13, color: Color(0xFF64748B)),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(AppSpacing.lg),
              itemCount: _notifications.length,
              itemBuilder: (context, index) {
                final notif = _notifications[index];
                return _buildNotificationCard(context, notif);
              },
            ),
    );
  }

  Widget _buildNotificationCard(
    BuildContext context,
    Map<String, dynamic> notif,
  ) {
    Color iconColor;
    Color iconBg;
    IconData icon;

    switch (notif['type']) {
      case 'emergency':
        iconColor = const Color(0xFFDC2626);
        iconBg = const Color(0xFFFEF2F2);
        icon = Icons.emergency;
        break;
      case 'request':
        iconColor = const Color(0xFF2563EB);
        iconBg = const Color(0xFFEFF6FF);
        icon = Icons.security;
        break;
      case 'ai':
        iconColor = const Color(0xFF7C3AED);
        iconBg = const Color(0xFFF5F3FF);
        icon = Icons.auto_awesome;
        break;
      default:
        iconColor = const Color(0xFF059669);
        iconBg = const Color(0xFFECFDF5);
        icon = Icons.calendar_today;
        break;
    }

    final bool isRead = notif['isRead'] as bool;

    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      decoration: BoxDecoration(
        color: isRead
            ? Colors.white
            : const Color(0xFFF0FDF4).withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(AppRadius.md),
        border: Border.all(
          color: isRead
              ? const Color(0xFFE2E8F0)
              : const Color(0xFF86EFAC).withValues(alpha: 0.5),
        ),
      ),
      child: Material(
        color: Colors.transparent,
        child: ListTile(
          contentPadding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: 8,
          ),
          leading: Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(color: iconBg, shape: BoxShape.circle),
            child: Icon(icon, color: iconColor, size: 22),
          ),
          title: Text(
            notif['title'] as String,
            style: AppTypography.titleSmall.copyWith(
              fontWeight: isRead ? FontWeight.w600 : FontWeight.w800,
              color: const Color(0xFF0F172A),
            ),
          ),
          subtitle: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 2),
              Text(
                notif['body'] as String,
                style: AppTypography.bodySmall.copyWith(
                  color: const Color(0xFF475569),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                notif['time'] as String,
                style: AppTypography.labelSmall.copyWith(
                  color: const Color(0xFF94A3B8),
                  fontSize: 10,
                ),
              ),
            ],
          ),
          trailing: const Icon(
            Icons.chevron_right,
            color: Color(0xFFCBD5E1),
            size: 18,
          ),
          onTap: () {
            setState(() => notif['isRead'] = true);
            final route = notif['route'] as String?;
            if (route != null) {
              context.push(route);
            }
          },
        ),
      ),
    );
  }
}
