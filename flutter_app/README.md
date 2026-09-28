# JB & BEST LOGISTICS - Flutter Mobile Companion Application

Official production-quality Flutter mobile companion application for **JB & BEST LOGISTICS LLC** (Atlanta, GA / Multi-Carrier Logistics Platform).

---

## 📱 Supported Platforms & Architecture
- **Framework**: Flutter 3.19+ (Dart 3.3+)
- **Architecture**: Feature-first Clean Architecture with Riverpod 2.5+
- **Navigation**: `go_router` with declarative role-based routing guards
- **Networking**: `dio` with Auth Interceptors and offline fallbacks
- **Hardware**: `mobile_scanner` (Camera QR), `google_maps_flutter`, `geolocator`
- **Security**: `flutter_secure_storage` for encrypted JWT session tokens

---

## 🏛️ Role-Based Access Control (RBAC)
The application dynamically adjusts navigation, bottom navigation bars, and available operations according to the authenticated user role:
1. **CUSTOMER**:
   - Dashboard with Active Shipments & Recent Activity
   - 6-step Shipment Booking Wizard with multi-carrier rate comparison (FedEx, UPS, USPS, JB Freight)
   - Real-time GPS Tracking with vertical milestones and map route
   - Private Mailbox Center (lease status, occupancy, held package intake, digital pickup pass)
   - In-store Appointment scheduler (Notary, Fingerprinting, Packing) respecting the **5:30 PM Linehaul Cutoff**
   - Invoicing and Paystack/Card payments

2. **RIDER / DRIVER**:
   - Online/Offline status switch
   - Daily KPI card: active jobs, completed jobs, earnings
   - Strictly enforced Job State Machine:
     `assigned` ➔ `accepted` ➔ `arrived_at_pickup` ➔ `picked_up` ➔ `in_transit` ➔ `arrived` ➔ `delivered`
   - Turn-by-turn map view, customer phone action, and QR pickup/delivery scanner

3. **STAFF OPERATIONS**:
   - Counter Package Intake with instant weight/dimension pricing and barcode generation
   - Evening Carrier Linehaul Cutoff monitor (UPS 5:30 PM, FedEx 5:45 PM, USPS 5:00 PM)
   - Milestone Scanner for package intake, staging, and driver dispatch
   - In-store pickup fulfillment with verified customer QR check-in

4. **STORE MANAGEMENT / ADMIN**:
   - High-level Store Management Executive Dashboard
   - Financial KPIs: Total Billed Volume (Settled vs Due), Parcels Processed, Mailbox Occupancy (67%), Doorstep Dispatches
   - Carrier Volume Distribution Analytics (UPS 44%, FedEx 36%, USPS 15%, JB Freight 5%)
   - Billing & Invoice balance collection

---

## 🚀 Running on Android

### Prerequisites
1. Install Flutter SDK (`flutter doctor`).
2. Android Studio with Android SDK 34+.

### Build & Run
```bash
# Get dependencies
flutter pub get

# Run on connected device or emulator
flutter run

# Build Android APK
flutter build apk --release

# Build Android App Bundle (for Google Play Console)
flutter build appbundle --release
```
