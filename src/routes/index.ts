import express from "express";
import AuthRouter from "./auth.route";
import QuizRouter from "./quiz.route";

const V1Router: express.Router = express.Router();

V1Router.use("/auth", AuthRouter);
V1Router.use("/quiz", QuizRouter);
export default V1Router;
