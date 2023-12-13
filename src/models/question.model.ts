import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { boolStringIsEmpty } from "@/utils/general/string.util";
import {
  strQuestionModelConstant,
  strQuizModelConstant,
  strUserModelConstant,
} from "./model.constants";
import { EQuestionType } from "@/lib/enums";

const QuestionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: strQuizModelConstant,
      required: [true, "Question must belong to a quiz"],
    },
    text: {
      required: [true, "Question is required"],
      type: String,
    },
    type: {
      required: [true, "Question type is required"],
      type: EQuestionType,
    },
    options: [
      {
        type: String,
        required: [
          true,
          "Question must have at least one option",
        ],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model(
  strQuestionModelConstant,
  QuestionSchema
);
