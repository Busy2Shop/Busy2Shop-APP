export interface AuthenticationProps {
  href: "/agent/login" | "/agent/signup" | "/user/login" | "/user/signup";
}

export interface SignupProps extends AuthenticationProps {
  otpRoute: "/agent/otp" | "/user/otp";
}
