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
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: "user" | "agent";
}

export interface AuthResponse {
  user: User;
  token: string;
}
