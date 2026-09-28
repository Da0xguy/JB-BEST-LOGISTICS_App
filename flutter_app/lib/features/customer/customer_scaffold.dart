import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../app/theme/app_colors.dart';
import 'home/customer_home_screen.dart';
import '../shipping/book_shipment_screen.dart';
import '../tracking/tracking_screen.dart';
import '../mailbox/mailbox_screen.dart';

class CustomerScaffold extends StatefulWidget {
  final String initialTab;
  const CustomerScaffold({super.key, required this.initialTab});

  @override
  State<CustomerScaffold> createState() => _CustomerScaffoldState();
}

class _CustomerScaffoldState extends State<CustomerScaffold> {
  late int _currentIndex;

  @override
  void initState() {
    super.initState();
    _currentIndex = _tabToIndex(widget.initialTab);
  }

  int _tabToIndex(String tab) {
    switch (tab) {
      case 'home':
        return 0;
      case 'track':
        return 1;
      case 'mailbox':
        return 2;
      case 'account':
        return 3;
      default:
        return 0;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: const [
          CustomerHomeScreen(),
          TrackingScreen(),
          MailboxScreen(),
          Center(child: Text('Account & Settings')),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppColors.primaryBlue,
        foregroundColor: Colors.white,
        elevation: 4,
        shape: const CircleBorder(),
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(builder: (context) => const BookShipmentScreen()),
          );
        },
        child: const Icon(Icons.add_rounded, size: 28),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        notchMargin: 8,
        color: Theme.of(context).brightness == Brightness.dark
            ? AppColors.navyCard
            : AppColors.surfaceWhite,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            IconButton(
              icon: Icon(Icons.home_filled, color: _currentIndex == 0 ? AppColors.primaryBlue : AppColors.textSecondary),
              onPressed: () => setState(() => _currentIndex = 0),
            ),
            IconButton(
              icon: Icon(Icons.search_rounded, color: _currentIndex == 1 ? AppColors.primaryBlue : AppColors.textSecondary),
              onPressed: () => setState(() => _currentIndex = 1),
            ),
            const SizedBox(width: 48), // Spacer for FloatingActionButton
            IconButton(
              icon: Icon(Icons.mail_outline_rounded, color: _currentIndex == 2 ? AppColors.primaryBlue : AppColors.textSecondary),
              onPressed: () => setState(() => _currentIndex = 2),
            ),
            IconButton(
              icon: Icon(Icons.person_outline_rounded, color: _currentIndex == 3 ? AppColors.primaryBlue : AppColors.textSecondary),
              onPressed: () => setState(() => _currentIndex = 3),
            ),
          ],
        ),
      ),
    );
  }
}
