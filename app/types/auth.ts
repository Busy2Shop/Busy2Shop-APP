export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  role: "user" | "agent" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role?: "user" | "agent";
}

// API Response wrapper structure
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

// Actual data structures
export interface AuthResponseData {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface OTPVerificationResponseData {
  email: string;
  accessToken: string;
}

// For Redux state
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}
