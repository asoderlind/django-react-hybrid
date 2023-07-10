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

export interface Todo {
  id: number;
  task: string;
  is_complete: boolean;
  created_datetime: string;
}
