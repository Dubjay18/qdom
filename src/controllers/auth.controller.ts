import BaseController from "./index.controller";
import {
  Request,
  Response as ExpressResponse,
} from "express";
import { IExpressRequest } from "./types";
import * as authService from "../services/user/auth.service";
import * as ResponseManager from "../helpers/response.manger";
class AuthController extends BaseController {
  async handleSignUpOtpRequest(
    req: IExpressRequest,
    res: ExpressResponse
  ): Promise<void> {
    const { email } = req.body;

    // service layer
    // Get result from service layer.
    // handle errors
    // send response
    try {
      await authService.sendSignUpOtp({
        email,
      });
      ResponseManager.success(res, {
        message: "OTP sent successfully",
      });
    } catch (err: any) {
      // Error handling
      this.handleError(err);
    }
  }

  handleLogin() {}
}

export default AuthController;
