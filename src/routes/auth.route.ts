import AuthController from "../controllers/auth.controller";
import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post("/signup-otp", async (...args) =>
  new AuthController(...args).handleSignUpOtpRequest()
);
AuthRouter.post("/verify-otp", async (...args) =>
  new AuthController(...args).handleVerifySignupOtp()
);
AuthRouter.post("/login", async (...args) =>
  new AuthController(...args).handleLoginToAccount()
);

export default AuthRouter;
