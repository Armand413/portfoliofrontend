export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

export interface UpdateCredentialsRequest {
  currentPassword: string;
  newUsername?: string;
  newPassword?: string;
}