import { jwtPrivateKey } from "@/config/constants";
import { JwtHelper } from "@/helpers/jwt.helper";
import userAuthTokenModel from "@/models/userAuthToken.model";
import { ISignupOtpRequest } from "../types";
import userModel from "@/models/user.model";
import BadRequestError from "@/errors/BadRequestError";
import userVerificationModel from "@/models/userVerification.model";
import { generateOtp } from "@/utils/general/string.util";
import { OtpType } from "@/models/types";

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
}
