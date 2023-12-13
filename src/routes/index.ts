import express from "express";
import AuthRouter from "./auth.route.";

const V1Router: express.Router = express.Router();

V1Router.use("/auth", AuthRouter);

export default V1Router;
