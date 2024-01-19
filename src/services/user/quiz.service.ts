import quizModel from "@/models/quiz.model";
import { ICreateQuizRequest } from "../types";
import BadRequestError from "@/errors/BadRequestError";

export async function createQuiz(body: ICreateQuizRequest) {
	try {
		const quizResponse = await quizModel.create(body);
		return quizResponse;
	} catch (e) {
		throw new BadRequestError(e as any);
	}
}
