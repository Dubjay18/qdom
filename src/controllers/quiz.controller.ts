import { createQuiz } from "@/services/user/quiz.service";
import BaseController from "./index.controller";
import BadRequestError from "@/errors/BadRequestError";

class QuizController extends BaseController {
	async handleQuiz(): Promise<Record<string, any>> {
		const { user, title, description } = this.req.body;

		try {
			await createQuiz({
				createdBy: user,
				title,
				description,
			});
			return this.res.status(201).json({
				message: "Quiz created successfully",
			});
		} catch (err: any) {
			throw new BadRequestError(err);
		}
	}
}
export default QuizController;
