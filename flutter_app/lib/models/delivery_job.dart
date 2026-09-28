enum JobStatus {
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
  final String pickupNeighborhood;
  final String destinationAddress;
  final String destinationNeighborhood;
  final String packageSize;
  final double distanceKm;
  final int etaMinutes;
  final double payoutAmount;
  final JobStatus status;
  final String customerName;
  final String customerPhone;
  final String trackingNumber;

  const DeliveryJob({
    required this.id,
    required this.pickupAddress,
    required this.pickupNeighborhood,
    required this.destinationAddress,
    required this.destinationNeighborhood,
    required this.packageSize,
    required this.distanceKm,
    required this.etaMinutes,
    required this.payoutAmount,
    required this.status,
    required this.customerName,
    required this.customerPhone,
    required this.trackingNumber,
  });

  String get nextActionLabel {
    switch (status) {
      case JobStatus.assigned:
        return 'Accept Job';
      case JobStatus.accepted:
        return 'Arrived at Pickup';
      case JobStatus.arrived_at_pickup:
        return 'Scan Package & Pick Up';
      case JobStatus.picked_up:
        return 'Start Delivery';
      case JobStatus.in_transit:
        return 'Arrived at Destination';
      case JobStatus.arrived:
        return 'Scan QR & Confirm Delivery';
      case JobStatus.delivered:
        return 'Completed';
    }
  }

  DeliveryJob copyWith({
    JobStatus? status,
  }) {
    return DeliveryJob(
      id: id,
      pickupAddress: pickupAddress,
      pickupNeighborhood: pickupNeighborhood,
      destinationAddress: destinationAddress,
      destinationNeighborhood: destinationNeighborhood,
      packageSize: packageSize,
      distanceKm: distanceKm,
      etaMinutes: etaMinutes,
      payoutAmount: payoutAmount,
      status: status ?? this.status,
      customerName: customerName,
      customerPhone: customerPhone,
      trackingNumber: trackingNumber,
    );
  }
}
