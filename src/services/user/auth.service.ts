/**
 * Sends a sign-up OTP (One-Time Password) to the specified email address.
 * @param body - The request body containing the email address.
 * @throws BadRequestError - If the email address already exists or an OTP has been sent within the last minute.
 */
import { jwtPrivateKey } from "@/config/constants";
import { JwtHelper } from "@/helpers/jwt.helper";
import userAuthTokenModel from "@/models/userAuthToken.model";
import {
  ISignupOtpRequest,
  ISignupOtpVerifyRequest,
} from "../types";
import userModel from "@/models/user.model";
import BadRequestError from "@/errors/BadRequestError";
import userVerificationModel from "@/models/userVerification.model";
import { generateOtp } from "@/utils/general/string.util";
import { OtpType, UserVerification } from "@/models/types";

const jwtHelper = new JwtHelper({
  privateKey: jwtPrivateKey,
  UserTokenDb: userAuthTokenModel,
});

export async function sendSignUpOtp(
  body: ISignupOtpRequest
) {
  let { email } = body;
  email = email.toLowerCase();

  const existingEmail = await userModel.findOne({ email });
  if (existingEmail) {
    throw new BadRequestError({
      message: "Email already exists",
    });
  }

  const existingVerification =
    await userVerificationModel.findOne({
      email,
      createdAt: { $gte: Date.now() - 60000 },
    });

  if (existingVerification) {
    throw new BadRequestError({
      message: "OTP has been sent within the minute.",
    });
  }

  const otp = generateOtp();
  const newVerification = new userVerificationModel({
    email,
    otp,

    type: OtpType.SIGN_UP,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });
  // Save the record
  await newVerification.save();
  // TODO: send email
}

export async function verifySignupOtp(
  body: ISignupOtpVerifyRequest
): Promise<string> {
  const { otp } = body;
  let { email } = body;
  email = email.toLowerCase();
  const verification =
    await userVerificationModel.findOne<UserVerification>({
      email,
      otp,
    });
  if (!verification) {
    throw new BadRequestError({
      message: "Invalid OTP",
    });
  } else if (
    new Date(verification.expiresAt) < new Date()
  ) {
    throw new BadRequestError({
      message: "OTP expired",
    });
  }
  // Generate the JWT.
  const token = jwtHelper.generateToken({
    email,
  });

  // delete used record
  verification.deleteOne();
  return token;
}
