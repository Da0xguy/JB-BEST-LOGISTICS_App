enum UserRole {
  customer,
  rider,
  staff,
  admin,
}

class User {
  final String uid;
  final String email;
  final String displayName;
  final String? phoneNumber;
  final UserRole role;
  final String? mailboxNumber;
  final String? branchId;
  final String? avatarUrl;

  const User({
    required this.uid,
    required this.email,
    required this.displayName,
    this.phoneNumber,
    required this.role,
    this.mailboxNumber,
    this.branchId,
    this.avatarUrl,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      uid: json['uid'] ?? json['id'] ?? '',
      email: json['email'] ?? '',
      displayName: json['displayName'] ?? json['name'] ?? '',
      phoneNumber: json['phoneNumber'] ?? json['phone'],
      role: UserRole.values.firstWhere(
        (e) => e.name == (json['role'] ?? 'customer'),
        orElse: () => UserRole.customer,
      ),
      mailboxNumber: json['mailboxNumber'],
      branchId: json['branchId'],
      avatarUrl: json['avatarUrl'] ?? json['photoURL'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'uid': uid,
      'email': email,
      'displayName': displayName,
      'phoneNumber': phoneNumber,
      'role': role.name,
      'mailboxNumber': mailboxNumber,
      'branchId': branchId,
      'avatarUrl': avatarUrl,
    };
  }
}
