export interface UserToken {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}
