export interface TokenApiResponse {
  success: boolean;
  token: string;
}

export interface PostUserRequest {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File;
}

export interface PostUserResponse {
  success: boolean;
  user_id?: number;
  message?: string;
  fails?: {
    [key: string]: string[];
  };
}
