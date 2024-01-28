import QuizController from "@/controllers/quiz.controller";
import authMiddleware from "@/middlewares/auth";

import { Router } from "express";

const QuizRouter = Router();

QuizRouter.post("/create", authMiddleware, async (...args) =>
	new QuizController(...args).handleQuiz()
);

export default QuizRouter;
