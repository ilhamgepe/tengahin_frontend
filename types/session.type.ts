import { User } from "./user.type";

export interface SessionPayload {
  access_token: string;
  expires_at: number;
  refresh_token: string;
  refresh_token_expires_at: number;
  user: User;
  iss?: string; // Issuer
  iat?: number; // Issued At
  exp?: number; // Expiration Time
}
