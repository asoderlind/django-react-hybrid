export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface AuthToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
}
