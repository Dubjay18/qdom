import mongoose from "mongoose";
import { IUserAuthToken } from "./types";
import {
  strUserAuthTokenModelConstant,
  strUserModelConstant,
} from "./model.constants";

const userAuthTokenSchema =
  new mongoose.Schema<IUserAuthToken>(
    {
      token: { type: String, required: true },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
      },

      user: {
        type: String,
        required: true,
        ref: strUserModelConstant,
      },
    },

    {
      timestamps: true,
      versionKey: false,
    }
  );

// userAuthSchema.plugin(require('mongoose-bcrypt'))

export default mongoose.model<IUserAuthToken>(
  strUserAuthTokenModelConstant,
  userAuthTokenSchema
);
