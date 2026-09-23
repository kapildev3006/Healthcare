import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

/// Structural Dio provider for future API integration (Phase 8+).
/// No real API calls are executed during frontend phases.
final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: 'http://localhost:4000/api', // Mock / dev placeholder
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ),
  );

  // In Phase 8+, authentication and audit interceptors will be attached here.
  return dio;
});
