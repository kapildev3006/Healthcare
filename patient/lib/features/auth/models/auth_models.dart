/// Auth models for patient onboarding, authentication, and registration.
class AuthCredentials {
  final String emailOrPhone;
  final String password;
  final bool rememberMe;

  const AuthCredentials({
    required this.emailOrPhone,
    required this.password,
    this.rememberMe = false,
  });
}

class RegisterFormData {
  final String fullName;
  final String email;
  final String phone;
  final String password;
  final String confirmPassword;
  final bool agreedToTerms;

  const RegisterFormData({
    this.fullName = '',
    this.email = '',
    this.phone = '',
    this.password = '',
    this.confirmPassword = '',
    this.agreedToTerms = false,
  });

  bool get isValid =>
      fullName.trim().isNotEmpty &&
      email.trim().contains('@') &&
      phone.trim().length >= 10 &&
      password.length >= 8 &&
      password == confirmPassword &&
      agreedToTerms;
}
