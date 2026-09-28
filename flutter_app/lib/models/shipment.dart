enum Carrier {
  fedex,
  ups,
  usps,
  dhl,
  jb_freight,
}

enum ShipmentStatus {
  order_created,
  picked_up,
  in_transit,
  out_for_delivery,
  delivered,
  exception,
  returned,
}

class GeoCoordinate {
  final double latitude;
  final double longitude;
  final String city;
  final String state;
  final String country;
  final String? facilityName;

  const GeoCoordinate({
    required this.latitude,
    required this.longitude,
    required this.city,
    required this.state,
    required this.country,
    this.facilityName,
  });

  factory GeoCoordinate.fromJson(Map<String, dynamic> json) {
    return GeoCoordinate(
      latitude: (json['latitude'] as num?)?.toDouble() ?? 0.0,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 0.0,
      city: json['city'] ?? '',
      state: json['state'] ?? '',
      country: json['country'] ?? 'USA',
      facilityName: json['facilityName'],
    );
  }

  Map<String, dynamic> toJson() => {
    'latitude': latitude,
    'longitude': longitude,
    'city': city,
    'state': state,
    'country': country,
    'facilityName': facilityName,
  };
}

class TrackingLog {
  final String id;
  final ShipmentStatus status;
  final String title;
  final String description;
  final GeoCoordinate location;
  final String timestamp;

  const TrackingLog({
    required this.id,
    required this.status,
    required this.title,
    required this.description,
    required this.location,
    required this.timestamp,
  });

  factory TrackingLog.fromJson(Map<String, dynamic> json) {
    return TrackingLog(
      id: json['id'] ?? '',
      status: ShipmentStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => ShipmentStatus.in_transit,
      ),
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      location: GeoCoordinate.fromJson(json['location'] ?? {}),
      timestamp: json['timestamp'] ?? '',
    );
  }
}

class Shipment {
  final String id;
  final String trackingNumber;
  final Carrier carrier;
  final String serviceLevel;
  final String senderName;
  final String senderCity;
  final String recipientName;
  final String recipientCity;
  final String recipientAddress;
  final double weightLbs;
  final String packageType;
  final ShipmentStatus currentStatus;
  final GeoCoordinate currentLocation;
  final String estimatedDelivery;
  final List<TrackingLog> trackingLogs;
  final double totalAmount;
  final String currency;

  const Shipment({
    required this.id,
    required this.trackingNumber,
    required this.carrier,
    required this.serviceLevel,
    required this.senderName,
    required this.senderCity,
    required this.recipientName,
    required this.recipientCity,
    required this.recipientAddress,
    required this.weightLbs,
    required this.packageType,
    required this.currentStatus,
    required this.currentLocation,
    required this.estimatedDelivery,
    required this.trackingLogs,
    required this.totalAmount,
    this.currency = 'USD',
  });

  factory Shipment.fromJson(Map<String, dynamic> json) {
    return Shipment(
      id: json['id'] ?? '',
      trackingNumber: json['trackingNumber'] ?? json['trackingId'] ?? '',
      carrier: Carrier.values.firstWhere(
        (e) => e.name == json['carrier'],
        orElse: () => Carrier.fedex,
      ),
      serviceLevel: json['serviceLevel'] ?? 'FedEx 2Day Air',
      senderName: json['sender']?['name'] ?? json['senderName'] ?? '',
      senderCity: json['sender']?['city'] ?? json['senderCity'] ?? '',
      recipientName: json['recipient']?['name'] ?? json['recipientName'] ?? '',
      recipientCity: json['recipient']?['city'] ?? json['recipientCity'] ?? '',
      recipientAddress: json['recipient']?['street'] ?? json['recipientAddress'] ?? '',
      weightLbs: (json['packageDetails']?['weightLbs'] ?? json['weightLbs'] as num?)?.toDouble() ?? 1.0,
      packageType: json['packageDetails']?['packageType'] ?? json['packageType'] ?? 'box',
      currentStatus: ShipmentStatus.values.firstWhere(
        (e) => e.name == json['currentStatus'],
        orElse: () => ShipmentStatus.in_transit,
      ),
      currentLocation: GeoCoordinate.fromJson(json['currentLocation'] ?? {}),
      estimatedDelivery: json['estimatedDelivery'] ?? 'Today by 4:30 PM',
      trackingLogs: (json['trackingLogs'] as List<dynamic>?)
              ?.map((item) => TrackingLog.fromJson(item))
              .toList() ??
          [],
      totalAmount: (json['totalAmount'] as num?)?.toDouble() ?? 0.0,
      currency: json['currency'] ?? 'USD',
    );
  }
}
