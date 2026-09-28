import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';

class MailboxScreen extends StatelessWidget {
  const MailboxScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Mailbox')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF1B1435), Color(0xFF211842)],
                ),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppColors.mailboxPurple.withOpacity(0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('Box JB-204', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w900)),
                  SizedBox(height: 4),
                  Text('4 of 6 Units Occupied (67%)', style: TextStyle(color: AppColors.mailboxPurple, fontSize: 13, fontWeight: FontWeight.bold)),
                  SizedBox(height: 8),
                  Text('Physical Address:\n2450 Piedmont Rd NE, Box JB-204, Atlanta, GA 30324', style: TextStyle(color: AppColors.textMuted, fontSize: 11)),
                ],
              ),
            ),
            const SizedBox(height: 20),
            const Text('HELD PACKAGES', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppColors.textSecondary)),
            const SizedBox(height: 10),
            Card(
              child: ListTile(
                leading: const Icon(Icons.inventory_2_outlined, color: AppColors.mailboxPurple),
                title: const Text('Amazon Logistics', style: TextStyle(fontWeight: FontWeight.bold)),
                subtitle: const Text('JBMAIL-00821 • Received Today'),
                trailing: ElevatedButton(
                  style: ElevatedButton.styleFrom(minimumSize: const Size(80, 36)),
                  onPressed: () {},
                  child: const Text('Collect', style: TextStyle(fontSize: 11)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
