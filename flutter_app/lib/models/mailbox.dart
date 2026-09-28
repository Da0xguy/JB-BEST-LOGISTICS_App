class MailboxItem {
  final String id;
  final String sender;
  final String description;
  final String receivedDate;
  final String barcode;
  final bool readyForPickup;

  const MailboxItem({
    required this.id,
    required this.sender,
    required this.description,
    required this.receivedDate,
    required this.barcode,
    this.readyForPickup = true,
  });

  factory MailboxItem.fromJson(Map<String, dynamic> json) {
    return MailboxItem(
      id: json['id'] ?? '',
      sender: json['sender'] ?? 'Carrier Dropoff',
      description: json['description'] ?? 'Package',
      receivedDate: json['receivedDate'] ?? 'Today',
      barcode: json['barcode'] ?? 'JBMAIL-000',
      readyForPickup: json['readyForPickup'] ?? true,
    );
  }
}

class MailboxAccount {
  final String boxNumber;
  final String renterName;
  final String tier;
  final int capacity;
  final int currentOccupancy;
  final String renewalDate;
  final String keyFobId;
  final List<MailboxItem> packages;

  const MailboxAccount({
    required this.boxNumber,
    required this.renterName,
    required this.tier,
    required this.capacity,
    required this.currentOccupancy,
    required this.renewalDate,
    required this.keyFobId,
    required this.packages,
  });

  double get occupancyPercentage => capacity > 0 ? (currentOccupancy / capacity) * 100 : 0.0;
}
