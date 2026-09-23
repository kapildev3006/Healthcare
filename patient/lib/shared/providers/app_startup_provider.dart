import 'package:flutter_riverpod/flutter_riverpod.dart';

/// App startup state tracking first-time onboarding and authentication state.
class AppStartupState {
  final bool hasSeenOnboarding;
  final bool isAuthenticated;

  const AppStartupState({
    this.hasSeenOnboarding = false,
    this.isAuthenticated = true,
  });

  AppStartupState copyWith({bool? hasSeenOnboarding, bool? isAuthenticated}) {
    return AppStartupState(
      hasSeenOnboarding: hasSeenOnboarding ?? this.hasSeenOnboarding,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
    );
  }
}

class AppStartupNotifier extends StateNotifier<AppStartupState> {
  AppStartupNotifier() : super(const AppStartupState());

  void completeOnboarding() {
    state = state.copyWith(hasSeenOnboarding: true);
  }

  void login() {
    state = state.copyWith(isAuthenticated: true);
  }

  void logout() {
    state = state.copyWith(isAuthenticated: false);
  }

  void resetFirstInstall() {
    state = const AppStartupState(hasSeenOnboarding: false);
  }
}

final appStartupProvider =
    StateNotifierProvider<AppStartupNotifier, AppStartupState>((ref) {
      return AppStartupNotifier();
    });
