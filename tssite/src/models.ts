export interface AuthTokenResponse {
  access: string;
  refresh: string;
}

export interface DecodedAuthToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
}
