import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';

class AdminDashboardScreen extends StatelessWidget {
  const AdminDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Store Management Dashboard')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Hero KPI Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.navyCommand,
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text('TOTAL BILLED VOLUME', style: TextStyle(color: AppColors.textSecondary, fontSize: 11, fontWeight: FontWeight.bold)),
                SizedBox(height: 6),
                Text('\$633.98', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.w900)),
                SizedBox(height: 6),
                Text('✓ \$347.75 settled  •  \$286.23 due', style: TextStyle(color: AppColors.successGreen, fontSize: 12, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Operational Grid
          Row(
            children: [
              Expanded(
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: const [
                        Text('PARCELS', style: TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                        SizedBox(height: 4),
                        Text('3 Active', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: const [
                        Text('MAILBOX', style: TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                        SizedBox(height: 4),
                        Text('67% Leased', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.mailboxPurple)),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),

          // Carrier Distribution
          const Text('CARRIER VOLUME DISTRIBUTION', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.textSecondary)),
          const SizedBox(height: 10),
          _buildCarrierBar('UPS Ground & Air', 0.44, '44%', AppColors.warningOrange),
          _buildCarrierBar('FedEx Express & Home', 0.36, '36%', AppColors.primaryBlue),
          _buildCarrierBar('USPS Priority Mail', 0.15, '15%', Colors.lightBlue),
          _buildCarrierBar('JB Freight & Local', 0.05, '5%', AppColors.successGreen),
        ],
      ),
    );
  }

  Widget _buildCarrierBar(String label, double value, String percentage, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
              Text(percentage, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppColors.textSecondary)),
            ],
          ),
          const SizedBox(height: 6),
          LinearProgressIndicator(
            value: value,
            backgroundColor: AppColors.borderLight,
            color: color,
            borderRadius: BorderRadius.circular(4),
          ),
        ],
      ),
    );
  }
}
