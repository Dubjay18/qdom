import * as mongoose from "mongoose";
import { OtpType } from "./types";
import {
  strUserModelConstant,
  strUserVerificationModelConstant,
} from "./model.constants";

const UserVerificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowerCase: true,
      true: true,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String, // one of sign-up, login, forgot-password
      enum: Object.values(OtpType),
      required: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      index: { expires: "10m" },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model(
  strUserVerificationModelConstant,
  UserVerificationSchema
);
