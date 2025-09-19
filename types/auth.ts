export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  result?: {
    success: boolean;
    message?: string;
    userId?: string;
    accessToken?: string;
  };
  error?: string;
}

export interface LoginErrorResponse {
  error: string;
}

export interface OTPResponse {
  success: boolean;
  result?: {
    success: boolean;
    message?: string;
  };
  error?: string;
}

export interface OTPErrorResponse {
  error: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  result?: {
    success: boolean;
    message?: string;
  };
  error?: string;
}

export interface ForgotPasswordErrorResponse {
  error: string;
}

export interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  result?: {
    success: boolean;
    message?: string;
  };
  error?: string;
}

export interface ResetPasswordErrorResponse {
  error: string;
}
