import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/user.dart';

class AuthState {
  final User? user;
  final bool isLoading;

  const AuthState({this.user, this.isLoading = false});

  AuthState copyWith({User? user, bool? isLoading}) {
    return AuthState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(
    const AuthState(
      user: User(
        uid: 'usr_ayobami',
        email: 'ayobamioketona@gmail.com',
        displayName: 'Ayobami Oketona',
        role: UserRole.customer,
        mailboxNumber: 'JB-204',
      ),
    ),
  );

  Future<void> loginWithRole(UserRole role) async {
    state = state.copyWith(isLoading: true);
    await Future.delayed(const Duration(milliseconds: 300));

    User newUser;
    switch (role) {
      case UserRole.customer:
        newUser = const User(
          uid: 'usr_ayobami',
          email: 'ayobamioketona@gmail.com',
          displayName: 'Ayobami Oketona',
          role: UserRole.customer,
          mailboxNumber: 'JB-204',
        );
        break;
      case UserRole.rider:
        newUser = const User(
          uid: 'rider_michael',
          email: 'michael.driver@jbbestlogistics.com',
          displayName: 'Michael Driver',
          role: UserRole.rider,
        );
        break;
      case UserRole.staff:
        newUser = const User(
          uid: 'staff_sarah',
          email: 'sarah.j@jbbestlogistics.com',
          displayName: 'Sarah Counter',
          role: UserRole.staff,
          branchId: 'atlanta_piedmont_hub',
        );
        break;
      case UserRole.admin:
        newUser = const User(
          uid: 'admin_store',
          email: 'store.admin@jbbestlogistics.com',
          displayName: 'Store Executive',
          role: UserRole.admin,
        );
        break;
    }

    state = AuthState(user: newUser, isLoading: false);
  }

  void logout() {
    state = const AuthState(user: null);
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});
