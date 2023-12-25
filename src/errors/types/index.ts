import { type HttpStatusCode } from "axios";
import { type Error } from "mongoose";

export enum EErrorTypes {
  Operational = "Operational",
  Programming = "Programming",
}

export enum EOperationalType {
  Database = "Database",
  Network = "Network",
  Overload = "Overload",
  DuplicateRequest = "DuplicateRequest",
  RateLimit = "RateLimit",
  // bad data
  InvalidInput = "InvalidInput",
  AuthenticationFailed = "AuthenticationFailed",
}

export interface TMongoServerServerError extends Error {
  keyPattern: Record<string, any>;
  code: number;
  keyValue: Record<string, string>;
}

export interface TModifiedValidationError extends Error {
  errors: Record<string, { message: string }>;
}

export interface EMongooseInterpretations {
  name: string;
  status: HttpStatusCode;
}
export type EMongooseErrors = Record<number, EMongooseInterpretations>;

export interface DBErrorDescription {
  key: string;
  description: string;
}

export type DBErrorDescriptions = DBErrorDescription[];