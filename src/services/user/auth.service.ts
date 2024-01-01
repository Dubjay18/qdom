/**
 * Sends a sign-up OTP (One-Time Password) to the specified email address.
 * @param body - The request body containing the email address.
 * @throws BadRequestError - If the email address already exists or an OTP has been sent within the last minute.
 */
import { jwtPrivateKey } from "@/config/constants";
import { JwtHelper } from "@/helpers/jwt.helper";
import userAuthTokenModel from "@/models/userAuthToken.model";
import {
  ILoginRequest,
  ILoginResponse,
  ISignupOtpRequest,
  ISignupOtpVerifyRequest,
  User,
} from "../types";
import userModel from "@/models/user.model";
import BadRequestError from "@/errors/BadRequestError";
import userVerificationModel from "@/models/userVerification.model";
import { generateOtp } from "@/utils/general/string.util";
import { OtpType, UserVerification } from "@/models/types";
import EmailService from "./email.service";

const jwtHelper = new JwtHelper({
  privateKey: jwtPrivateKey,
  UserTokenDb: userAuthTokenModel,
});

/**
 * Sends a sign-up OTP (One-Time Password) to the specified email address.
 * @param body - The request body containing the email address.
 * @throws BadRequestError - If the email address already exists or an OTP has been sent within the last minute.
 */
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
  const emailService = new EmailService();
  emailService.sendEmail(
    email,
    "Verify your email address",
    `Your OTP is ${otp} it expires in 10 minutes. <br/> <h1>${otp}</h1>`
  );
}

/**
 * Verifies the sign-up OTP (One-Time Password) for the specified email address.
 * @param body - The request body containing the email address and OTP.
 * @returns The JWT (JSON Web Token) for the verified user.
 * @throws BadRequestError - If the OTP is invalid or has expired.
 */
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

/**
 * Authenticates the user with the provided email and password.
 * @param body - The request body containing the email and password.
 * @returns The login response containing the JWT (JSON Web Token) and user information.
 * @throws BadRequestError - If the email or password is invalid.
 */
export async function login(
  body: ILoginRequest
): Promise<ILoginResponse> {
  const { password } = body;
  /**pull it off separately, so I can change it to lowercase */
  const email = body.email.toLowerCase();

  const existingUserAuth = await userModel.findOne({
    email,
  });

  if (
    !existingUserAuth ||
    !(await existingUserAuth.verifyPassword(password))
  ) {
    throw new BadRequestError({
      message: "Invalid email or password",
    });
  }

  /**generate and save access_token for user*/
  const accessToken = jwtHelper.generateToken({
    email,
    userId: existingUserAuth._id,
  });

  /**for first time login -> upsert-true*/
  await userAuthTokenModel.updateOne(
    { email, user: existingUserAuth._id },
    {
      email,
      token: accessToken,
      user: existingUserAuth._id,
    },
    { upsert: true }
  );

  const user = await userModel.findById<User>(
    existingUserAuth._id
  );
  return {
    token: accessToken,
    user: user!,
  };
}
export async function logout(email: string): Promise<void> {
  await userAuthTokenModel.deleteOne({ email });
}