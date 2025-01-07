import { User } from "./user.type";

export interface AuthResponse {
  data: {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    refresh_token_expires_at: number;
    user: User;
  };
}
