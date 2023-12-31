import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { boolStringIsEmpty } from "@/utils/general/string.util";
import { strUserModelConstant } from "./model.constants";
import { Model } from "mongoose";

interface IUserAuthDocument {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  // type: AuthType,
}

export interface IUserAuth extends IUserAuthDocument {
  verifyPassword(arg: string): boolean;
  save(args: object): void;
}

interface IUserAuthModel extends Model<IUserAuth> {}

const UserSchema = new mongoose.Schema<
  IUserAuthDocument,
  IUserAuthModel
>(
  {
    firstName: {
      required: [true, "First name is required"],
      type: String,
    },
    lastName: {
      required: [true, "Last name is required"],
      type: String,
    },
    email: {
      required: [true, "Email is required"],
      type: String,
    },
    password: {
      type: String,
      required: [true, "User's password is required"],
      bcrypt: true,
      rounds: 10,
      minlength: [
        8,
        "Password must be more than 8 characters long",
      ],
      select: false, // prevent sending password by mistake
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// UserSchema.pre("save", async function hashPassword(next) {
//   // ----------> we first check if modified else next
//   if (!boolStringIsEmpty(this.password) && this.isModified("password")) {
//     const saltRound = 10;
//     try {
//       this.password = await bcrypt.hash(this.password, saltRound);
//       // Generate access token for user as well
//       this.accessToken = generateToken(this);
//     } catch (errorHashingPassword) {
//       // : Replace with application error
//       throw new Error("Can't hash user's password");
//     }
//   }
//   // ------------> Next actions please
//   next();
// });

UserSchema.plugin(require("mongoose-bcrypt"));

export default mongoose.model<
  IUserAuthDocument,
  IUserAuthModel
>(strUserModelConstant, UserSchema);
