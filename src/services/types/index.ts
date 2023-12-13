export interface ISignupOtpRequest {
  email: string;
}

export interface ISignupOtpVerifyRequest {
  email: string;
  otp: string;
}

export interface ISignUpTokenRequest {
  fullName: string;
  password: string;
  email: any;
}
