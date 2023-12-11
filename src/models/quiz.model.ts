import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { boolStringIsEmpty } from "@/utils/general/string.util";
import {
  strQuestionModelConstant,
  strQuizModelConstant,
  strUserModelConstant,
} from "./model.constants";

const QuizSchema = new mongoose.Schema({
  title: {
    required: [true, "Quiz title is required"],
    type: String,
  },
  description: {
    required: [true, "Quiz description is required"],
    type: String,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: strQuestionModelConstant,
      required: [
        true,
        "Quiz must have at least one question",
      ],
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: strUserModelConstant,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model(
  strQuizModelConstant,
  QuizSchema
);
