import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/user.dart';
import '../services/auth_service.dart';
import '../features/auth/login_screen.dart';
import '../features/customer/customer_scaffold.dart';
import '../features/rider/rider_dashboard_screen.dart';
import '../features/staff/staff_console_screen.dart';
import '../features/admin/admin_dashboard_screen.dart';
import '../features/tracking/tracking_screen.dart';
import '../features/shipping/book_shipment_screen.dart';
import '../features/qr/qr_scanner_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);

  return GoRouter(
    initialLocation: '/customer/home',
    redirect: (context, state) {
      final isLoggedIn = authState.user != null;
      final isLoggingIn = state.uri.path == '/login';

      if (!isLoggedIn && !isLoggingIn) return '/login';
      if (isLoggedIn && isLoggingIn) {
        switch (authState.user!.role) {
          case UserRole.customer:
            return '/customer/home';
          case UserRole.rider:
            return '/rider/today';
          case UserRole.staff:
            return '/staff/overview';
          case UserRole.admin:
            return '/admin/dashboard';
        }
      }
      return null;
    },
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/customer/:tab',
        builder: (context, state) {
          final tab = state.pathParameters['tab'] ?? 'home';
          return CustomerScaffold(initialTab: tab);
        },
      ),
      GoRoute(
        path: '/ship',
        builder: (context, state) => const BookShipmentScreen(),
      ),
      GoRoute(
        path: '/track',
        builder: (context, state) {
          final queryId = state.uri.queryParameters['id'];
          return TrackingScreen(initialTrackingNumber: queryId);
        },
      ),
      GoRoute(
        path: '/rider/:tab',
        builder: (context, state) => const RiderDashboardScreen(),
      ),
      GoRoute(
        path: '/staff/:tab',
        builder: (context, state) => const StaffConsoleScreen(),
      ),
      GoRoute(
        path: '/admin/:tab',
        builder: (context, state) => const AdminDashboardScreen(),
      ),
      GoRoute(
        path: '/scanner',
        builder: (context, state) => const QrScannerScreen(),
      ),
    ],
  );
});
