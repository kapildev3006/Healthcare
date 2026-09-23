import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../app/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/empty_state_view.dart';
import '../../home/widgets/patient_bottom_nav_bar.dart';
import '../models/medical_history_data.dart';
import '../widgets/history_category_filters.dart';
import '../widgets/history_header.dart';
import '../widgets/timeline_month_section.dart';

/// Patient Medical History Timeline screen matching design-references/patient/medical-history.png.
class MedicalHistoryScreen extends StatefulWidget {
  final List<MedicalEncounter>? initialEncounters;

  const MedicalHistoryScreen({super.key, this.initialEncounters});

  @override
  State<MedicalHistoryScreen> createState() => _MedicalHistoryScreenState();
}

class _MedicalHistoryScreenState extends State<MedicalHistoryScreen> {
  late final List<MedicalEncounter> _allEncounters;
  HistoryFilterCategory _selectedCategory = HistoryFilterCategory.all;
  bool _isSearchOpen = false;
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _allEncounters = widget.initialEncounters ?? kMockMedicalHistoryData;
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _handleEncounterTap(MedicalEncounter encounter) {
    context.push('/medical-history/${encounter.id}');
  }

  void _showFilterBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Filter Medical Encounters',
                    style: AppTypography.titleMedium.copyWith(
                      fontWeight: FontWeight.w800,
                      color: const Color(0xFF0F172A),
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      setState(
                        () => _selectedCategory = HistoryFilterCategory.all,
                      );
                      Navigator.of(ctx).pop();
                    },
                    child: const Text('Reset'),
                  ),
                ],
              ),
              const Divider(),
              ...HistoryFilterCategory.values.map((cat) {
                final isSelected = _selectedCategory == cat;
                return ListTile(
                  title: Text(cat.label),
                  leading: Icon(
                    cat.icon ?? Icons.list_alt_rounded,
                    color: isSelected
                        ? AppColors.primary
                        : const Color(0xFF64748B),
                  ),
                  trailing: isSelected
                      ? const Icon(Icons.check, color: AppColors.primary)
                      : null,
                  onTap: () {
                    setState(() => _selectedCategory = cat);
                    Navigator.of(ctx).pop();
                  },
                );
              }),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // 1. Filter encounters locally
    final filteredEncounters = filterEncounters(
      encounters: _allEncounters,
      category: _selectedCategory,
      searchQuery: _searchController.text,
    );

    // 2. Group encounters dynamically by month/year (newest first)
    final monthGroups = groupEncountersByMonth(filteredEncounters);

    return Scaffold(
      backgroundColor: const Color(0xFFF6F8FC),
      bottomNavigationBar: PatientBottomNavBar(
        currentIndex: 1, // History tab is active
        onTabSelected: (index) {
          switch (index) {
            case 0:
              context.go('/home');
              break;
            case 1:
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
        },
        onHealthCardTap: () => context.go('/health-card'),
      ),
      body: SafeArea(
        bottom: false,
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            // 1. Sticky/Top Header Section
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.only(
                  left: AppSpacing.md,
                  right: AppSpacing.md,
                  top: AppSpacing.md,
                  bottom: AppSpacing.sm,
                ),
                child: HistoryHeader(
                  isSearchOpen: _isSearchOpen,
                  searchController: _searchController,
                  onSearchToggle: () {
                    setState(() {
                      _isSearchOpen = !_isSearchOpen;
                      if (!_isSearchOpen) {
                        _searchController.clear();
                      }
                    });
                  },
                  onSearchChanged: (_) => setState(() {}),
                  onFilterPressed: () => _showFilterBottomSheet(context),
                ),
              ),
            ),

            // 2. Horizontal Category Filter Chips
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.md,
                  vertical: AppSpacing.xs,
                ),
                child: HistoryCategoryFilters(
                  selectedCategory: _selectedCategory,
                  onCategorySelected: (category) {
                    setState(() => _selectedCategory = category);
                  },
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: AppSpacing.md)),

            // 3. Dynamic Chronological Timeline or Empty State
            if (monthGroups.isEmpty)
              SliverFillRemaining(
                hasScrollBody: false,
                child: SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.md,
                      vertical: AppSpacing.lg,
                    ),
                    child: Center(
                      child: EmptyStateView(
                        isCompact: true,
                        icon: _isSearchOpen
                            ? Icons.search_off_rounded
                            : Icons.medical_information_outlined,
                        title:
                            _selectedCategory == HistoryFilterCategory.procedure
                            ? 'No Procedures Recorded'
                            : 'No Encounters Found',
                        message:
                            _selectedCategory == HistoryFilterCategory.procedure
                            ? 'There are no surgical or minor procedure records currently logged in your medical history.'
                            : 'No medical encounters match the selected filter or search criteria.',
                        action: AppButton(
                          label: 'Reset Filters',
                          variant: AppButtonVariant.outline,
                          onPressed: () {
                            setState(() {
                              _selectedCategory = HistoryFilterCategory.all;
                              _searchController.clear();
                              _isSearchOpen = false;
                            });
                          },
                        ),
                      ),
                    ),
                  ),
                ),
              )
            else
              SliverPadding(
                padding: const EdgeInsets.only(
                  left: 12,
                  right: 16,
                  bottom: AppSpacing.xl,
                ),
                sliver: SliverList(
                  delegate: SliverChildBuilderDelegate((context, index) {
                    final group = monthGroups[index];
                    return TimelineMonthSection(
                      group: group,
                      isFirst: index == 0,
                      isLast: index == monthGroups.length - 1,
                      onEncounterTap: _handleEncounterTap,
                    );
                  }, childCount: monthGroups.length),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
