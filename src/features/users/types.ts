export interface User {
  id?: string;
  username: string;
  email: string;
  fullName: string;
  password?: string;
  role?: string;
  createdAt?: string;
}

export interface UserAPI {
  id?: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
}
