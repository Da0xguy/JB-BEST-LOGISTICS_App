import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';

class BookShipmentScreen extends StatefulWidget {
  const BookShipmentScreen({super.key});

  @override
  State<BookShipmentScreen> createState() => _BookShipmentScreenState();
}

class _BookShipmentScreenState extends State<BookShipmentScreen> {
  int _currentStep = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Book Shipment'),
      ),
      body: Stepper(
        currentStep: _currentStep,
        onStepContinue: () {
          if (_currentStep < 5) setState(() => _currentStep++);
        },
        onStepCancel: () {
          if (_currentStep > 0) setState(() => _currentStep--);
        },
        steps: [
          Step(
            title: const Text('Pickup Details'),
            content: Column(
              children: const [
                TextField(decoration: InputDecoration(labelText: 'Sender Name')),
                SizedBox(height: 8),
                TextField(decoration: InputDecoration(labelText: 'Address')),
              ],
            ),
            isActive: _currentStep >= 0,
          ),
          Step(
            title: const Text('Destination'),
            content: Column(
              children: const [
                TextField(decoration: InputDecoration(labelText: 'Recipient Name')),
                SizedBox(height: 8),
                TextField(decoration: InputDecoration(labelText: 'Destination City & State')),
              ],
            ),
            isActive: _currentStep >= 1,
          ),
          Step(
            title: const Text('Package Details'),
            content: Column(
              children: const [
                TextField(decoration: InputDecoration(labelText: 'Weight (lbs)')),
                SizedBox(height: 8),
                TextField(decoration: InputDecoration(labelText: 'Dimensions (L x W x H)')),
              ],
            ),
            isActive: _currentStep >= 2,
          ),
          Step(
            title: const Text('Carriers & Rates'),
            content: const Text('FedEx, UPS, USPS & JB Freight rate options calculated at 5:30 PM cutoff.'),
            isActive: _currentStep >= 3,
          ),
          Step(
            title: const Text('Payment'),
            content: const Text('Paystack Gateway, Cards, and Cash on drop-off.'),
            isActive: _currentStep >= 4,
          ),
          Step(
            title: const Text('Confirmation'),
            content: const Text('Tracking number generated and thermal barcode ready to scan.'),
            isActive: _currentStep >= 5,
          ),
        ],
      ),
    );
  }
}
