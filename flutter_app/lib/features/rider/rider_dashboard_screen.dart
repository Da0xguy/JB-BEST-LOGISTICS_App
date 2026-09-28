import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';
import '../../models/delivery_job.dart';

class RiderDashboardScreen extends StatefulWidget {
  const RiderDashboardScreen({super.key});

  @override
  State<RiderDashboardScreen> createState() => _RiderDashboardScreenState();
}

class _RiderDashboardScreenState extends State<RiderDashboardScreen> {
  JobStatus _jobStatus = JobStatus.assigned;

  void _advance() {
    setState(() {
      switch (_jobStatus) {
        case JobStatus.assigned:
          _jobStatus = JobStatus.accepted;
          break;
        case JobStatus.accepted:
          _jobStatus = JobStatus.arrived_at_pickup;
          break;
        case JobStatus.arrived_at_pickup:
          _jobStatus = JobStatus.picked_up;
          break;
        case JobStatus.picked_up:
          _jobStatus = JobStatus.in_transit;
          break;
        case JobStatus.in_transit:
          _jobStatus = JobStatus.arrived;
          break;
        case JobStatus.arrived:
          _jobStatus = JobStatus.delivered;
          break;
        case JobStatus.delivered:
          break;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Rider Console'),
        actions: [
          Switch(value: true, onChanged: (v) {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        children: const [
                          Text('JOBS', style: TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                          Text('5', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        children: const [
                          Text('EARNINGS', style: TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                          Text('₦18,400', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.successGreen)),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('ACTIVE JOB: JB-92817', style: TextStyle(fontWeight: FontWeight.bold, fontFamily: 'monospace')),
                    const SizedBox(height: 8),
                    const Text('Pickup: Buckhead / Maitama Hub\nDestination: Midtown / Wuse 2\nDistance: 7.4 km (ETA: 18 min)'),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: _jobStatus == JobStatus.delivered ? null : _advance,
                      child: Text(_buttonLabel(_jobStatus)),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _buttonLabel(JobStatus status) {
    switch (status) {
      case JobStatus.assigned:
        return 'Accept Job';
      case JobStatus.accepted:
        return 'Arrived at Pickup';
      case JobStatus.arrived_at_pickup:
        return 'Scan Package';
      case JobStatus.picked_up:
        return 'Start Delivery';
      case JobStatus.in_transit:
        return 'Arrived at Destination';
      case JobStatus.arrived:
        return 'Scan QR & Confirm Delivery';
      case JobStatus.delivered:
        return 'Delivered ✓';
    }
  }
}
