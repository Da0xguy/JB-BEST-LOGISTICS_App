import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';

class TrackingScreen extends StatefulWidget {
  final String? initialTrackingNumber;
  const TrackingScreen({super.key, this.initialTrackingNumber});

  @override
  State<TrackingScreen> createState() => _TrackingScreenState();
}

class _TrackingScreenState extends State<TrackingScreen> {
  late TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialTrackingNumber ?? 'JB-8829-US');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Live Tracking'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _controller,
              decoration: InputDecoration(
                hintText: 'Enter tracking number (e.g. JB-8829-US)',
                suffixIcon: IconButton(
                  icon: const Icon(Icons.search_rounded, color: AppColors.primaryBlue),
                  onPressed: () {},
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Live Map Mock
            Container(
              height: 160,
              decoration: BoxDecoration(
                color: AppColors.navyCommand,
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Center(
                child: Text(
                  'Google Maps / Mapbox Live Route\nAtlanta Hub ➔ Augusta Destination',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Vertical Milestone Timeline
            const Text('TRACKING TIMELINE', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppColors.textSecondary)),
            const SizedBox(height: 12),
            _buildTimelineTile('Out for Delivery', 'Augusta Courier Dispatch', '09:45 AM', true),
            _buildTimelineTile('In Transit', 'Macon Regional Sort Facility', '05:12 AM', false),
            _buildTimelineTile('Picked Up', 'JB Piedmont Storefront Linehaul', 'Yesterday', false),
            _buildTimelineTile('Order Placed', 'Barcode printed at counter', 'Yesterday', false),
          ],
        ),
      ),
    );
  }

  Widget _buildTimelineTile(String title, String desc, String time, bool isCurrent) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            isCurrent ? Icons.radio_button_checked_rounded : Icons.check_circle_rounded,
            color: isCurrent ? AppColors.primaryBlue : AppColors.successGreen,
            size: 20,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: isCurrent ? AppColors.primaryBlue : null)),
                Text(desc, style: const TextStyle(color: AppColors.textSecondary, fontSize: 12)),
              ],
            ),
          ),
          Text(time, style: const TextStyle(color: AppColors.textMuted, fontSize: 11, fontFamily: 'monospace')),
        ],
      ),
    );
  }
}
