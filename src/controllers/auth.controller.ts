import BaseController from "./index.controller";
import * as authService from "../services/user/auth.service";
import * as ResponseManager from "../helpers/response.manger";
class AuthController extends BaseController {
  async handleSignUpOtpRequest(): Promise<void> {
    const { email } = this.req.body;

    // service layer
    // Get result from service layer.
    // handle errors
    // send response
    try {
      await authService.sendSignUpOtp({
        email,
      });
      ResponseManager.success(this.res, {
        message: "OTP sent successfully",
      });
    } catch (err: any) {
      // Error handling
      console.log(err, "-----");

      this.handleError(err);
    }
  }

  async handleVerifySignupOtp(): Promise<void> {
    const { email, otp } = this.req.body;

    try {
      const token = await authService.verifySignupOtp({
        email,
        otp,
      });
      ResponseManager.success(this.res, { token });
    } catch (err: any) {
      this.handleError(err);
    }
  }
  //  async handleSignupWithToken(): Promise<void> {
  //     const { firstName,lastName, password } = this.req.body;
  //     const email = this.req.email;

  //     try {
  //       const result = await authService.signUpWithToken({
  //         fullName,
  //         email,
  //         password,
  //         deviceId: <string>deviceId,
  //       });
  //       ResponseManager.success(res, result);
  //     } catch (err: any) {
  //       ResponseManager.handleError(res, err);

  //     }

  //   }
  async handleLoginToAccount(): Promise<void> {
    const { email, password } = this.req.body;
    try {
      const response = await authService.login({
        email,
        password,
      });
      ResponseManager.success(this.res, response);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}

export default AuthController;
