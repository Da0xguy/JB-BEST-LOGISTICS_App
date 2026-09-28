class InvoiceItem {
  final String id;
  final String description;
  final int quantity;
  final double unitPrice;
  final double total;

  const InvoiceItem({
    required this.id,
    required this.description,
    required this.quantity,
    required this.unitPrice,
    required this.total,
  });
}

class Invoice {
  final String invoiceNumber;
  final String shipmentId;
  final String customerName;
  final double totalAmount;
  final double paidAmount;
  final String status; // 'PAID' | 'PARTIALLY PAID' | 'DRAFT' | 'OVERDUE'
  final String dueDate;
  final List<InvoiceItem> items;

  const Invoice({
    required this.invoiceNumber,
    required this.shipmentId,
    required this.customerName,
    required this.totalAmount,
    required this.paidAmount,
    required this.status,
    required this.dueDate,
    required this.items,
  });

  double get balance => totalAmount - paidAmount;
}
