export interface User {
  id: number;
  email: string;
  username: string;
  fullname: string;
  password: string;
  password_change_at: string;
  created_at: string;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}
