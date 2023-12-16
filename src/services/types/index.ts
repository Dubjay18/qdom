import exp from "constants";
import { Document } from "mongoose";

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

export interface ISignUpResponse {
  token: string;
  user: User;
}

export interface ILoginResponse {
  token: string;
  user: User;
}

export interface User extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ILoginRequest {
  email: string;
  password: string;
}
