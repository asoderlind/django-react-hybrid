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

export interface Todo {
  id: number;
  task: string;
  is_complete: boolean;
  created_datetime: string;
}
