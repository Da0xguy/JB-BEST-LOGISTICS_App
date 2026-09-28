import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Code,
  FileCode,
  Copy,
  Check,
  Download,
  FolderTree,
  Terminal,
  ExternalLink,
} from 'lucide-react';

export const FlutterCodeDrawer: React.FC = () => {
  const { isFlutterCodeDrawerOpen, setIsFlutterCodeDrawerOpen } = useApp();
  const [selectedFile, setSelectedFile] = useState('pubspec.yaml');
  const [copied, setCopied] = useState(false);

  if (!isFlutterCodeDrawerOpen) return null;

  const flutterFiles: Record<string, { path: string; language: string; content: string }> = {
    'pubspec.yaml': {
      path: 'flutter_app/pubspec.yaml',
      language: 'yaml',
      content: `name: jb_best_logistics_mobile
description: "Official Mobile Companion for JB & BEST LOGISTICS LLC"
version: 1.0.0+1

environment:
  sdk: ">=3.3.0 <4.0.0"
  flutter: ">=3.19.0"

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.5
  go_router: ^14.0.1
  dio: ^5.4.3+1
  json_annotation: ^4.9.0
  flutter_secure_storage: ^9.0.0
  shared_preferences: ^2.2.3
  mobile_scanner: ^5.1.1
  google_maps_flutter: ^2.6.0
  cached_network_image: ^3.3.1
  qr_flutter: ^4.1.0
  intl: ^0.19.0`,
    },
    'main.dart': {
      path: 'flutter_app/lib/main.dart',
      language: 'dart',
      content: `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app/router.dart';
import 'app/theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    const ProviderScope(
      child: JbBestLogisticsApp(),
    ),
  );
}

class JbBestLogisticsApp extends ConsumerWidget {
  const JbBestLogisticsApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return MaterialApp.router(
      title: 'JB & Best Logistics',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      routerConfig: router,
    );
  }
}`,
    },
    'router.dart': {
      path: 'flutter_app/lib/app/router.dart',
      language: 'dart',
      content: `import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/user.dart';
import '../services/auth_service.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);

  return GoRouter(
    initialLocation: '/customer/home',
    redirect: (context, state) {
      final isLoggedIn = authState.user != null;
      if (!isLoggedIn) return '/login';
      switch (authState.user!.role) {
        case UserRole.customer: return '/customer/home';
        case UserRole.rider: return '/rider/today';
        case UserRole.staff: return '/staff/overview';
        case UserRole.admin: return '/admin/dashboard';
      }
    },
    routes: [
      GoRoute(path: '/login', builder: (c, s) => const LoginScreen()),
      GoRoute(path: '/customer/:tab', builder: (c, s) => CustomerScaffold(tab: s.pathParameters['tab']!)),
      GoRoute(path: '/rider/:tab', builder: (c, s) => RiderDashboardScreen()),
      GoRoute(path: '/staff/:tab', builder: (c, s) => StaffConsoleScreen()),
      GoRoute(path: '/admin/:tab', builder: (c, s) => AdminDashboardScreen()),
    ],
  );
});`,
    },
    'app_colors.dart': {
      path: 'flutter_app/lib/app/theme/app_colors.dart',
      language: 'dart',
      content: `import 'package:flutter/material.dart';

class AppColors {
  // Brand Palette from JB & Best Logistics Design System
  static const Color navyCommand = Color(0xFF0B1220);
  static const Color navyCard = Color(0xFF131D31);
  static const Color primaryBlue = Color(0xFF1769FF);
  static const Color lightBackground = Color(0xFFF6F8FC);
  static const Color surfaceWhite = Color(0xFFFFFFFF);
  static const Color successGreen = Color(0xFF16A34A);
  static const Color warningOrange = Color(0xFFF59E0B);
  static const Color mailboxPurple = Color(0xFF8B5CF6);
  static const Color errorRed = Color(0xFFDC2626);
}`,
    },
    'delivery_job.dart': {
      path: 'flutter_app/lib/models/delivery_job.dart',
      language: 'dart',
      content: `enum JobStatus {
  assigned,
  accepted,
  arrived_at_pickup,
  picked_up,
  in_transit,
  arrived,
  delivered,
}

class DeliveryJob {
  final String id;
  final String pickupAddress;
  final String destinationAddress;
  final String packageSize;
  final double distanceKm;
  final int etaMinutes;
  final double payoutAmount;
  final JobStatus status;
  final String customerName;
  final String trackingNumber;

  const DeliveryJob({
    required this.id,
    required this.pickupAddress,
    required this.destinationAddress,
    required this.packageSize,
    required this.distanceKm,
    required this.etaMinutes,
    required this.payoutAmount,
    required this.status,
    required this.customerName,
    required this.trackingNumber,
  });
}`,
    },
  };

  const currentFileData = flutterFiles[selectedFile] || flutterFiles['main.dart'];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFileData.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Production Flutter & Dart Codebase</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">
                  Null-Safe • Riverpod
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Generated in <code className="text-blue-400">flutter_app/lib/</code> for native Android execution
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsFlutterCodeDrawerOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File tabs */}
        <div className="flex bg-slate-950/70 px-4 py-2 border-b border-slate-800 gap-1.5 overflow-x-auto no-scrollbar">
          {Object.keys(flutterFiles).map((fileName) => (
            <button
              key={fileName}
              onClick={() => setSelectedFile(fileName)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition ${
                selectedFile === fileName
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{fileName}</span>
            </button>
          ))}
        </div>

        {/* Code Canvas */}
        <div className="p-4 flex-1 overflow-y-auto bg-slate-950 font-mono text-xs text-blue-200 leading-relaxed relative">
          <pre className="p-2 selection:bg-blue-600 selection:text-white">
            <code>{currentFileData.content}</code>
          </pre>

          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 py-1.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-sans font-semibold border border-slate-700 shadow-md flex items-center gap-1.5 backdrop-blur-sm transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Footer with CLI instructions */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>cd flutter_app && flutter run</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
            >
              Copy File
            </button>
            <button
              onClick={() => setIsFlutterCodeDrawerOpen(false)}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
