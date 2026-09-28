import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';

class StaffConsoleScreen extends StatelessWidget {
  const StaffConsoleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Staff Operations Terminal')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.navyCommand,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text('5:30 PM LINEHAUL CUTOFFS', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                SizedBox(height: 8),
                Text('• UPS Evening Linehaul (5:30 PM) - ON SCHEDULE\n• FedEx Express Air (5:45 PM) - ON SCHEDULE\n• USPS Shuttle (5:00 PM) - MANIFEST READY', style: TextStyle(color: AppColors.textMuted, height: 1.5, fontSize: 12)),
              ],
            ),
          ),
          const SizedBox(height: 16),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Package Intake', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  const SizedBox(height: 12),
                  const TextField(decoration: InputDecoration(labelText: 'Recipient Name')),
                  const SizedBox(height: 8),
                  const TextField(decoration: InputDecoration(labelText: 'Weight (lbs)')),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {},
                    child: const Text('Register & Print Thermal Label'),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
