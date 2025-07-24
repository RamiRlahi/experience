export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  profilePicture?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}