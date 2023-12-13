import { Document } from "mongoose";

export interface UserVerification extends Document {
    _id: string;
    email: string;
    otp: string;
    type: OtpType;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export enum OtpType {
    SIGN_UP = 'SIGN_UP',
    LOGIN = 'LOGIN',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  }
  