export interface UserInfoInterface {
  email: string;
  isActivated: boolean;
  id: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfoInterface;
}

export interface AuthDataInterface {
	email: string,
	password: string,
}