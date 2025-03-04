export interface AuthenticationProps {
  href:
    | "/agent/login"
    | "/agent/signup"
    | "/user/login"
    | "/user/signup"
    | "/agent/details";
}

export interface SignupProps extends AuthenticationProps {
  otpRoute: "/agent/otp" | "/user/otp";
}

export interface DetailsProps {
  href: "/agent/details";
}
