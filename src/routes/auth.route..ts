import AuthController from "@/controllers/auth.controller";
import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post("/login", async (...args) =>
  new AuthController(...args).handleLogin()
);

export default AuthRouter;
