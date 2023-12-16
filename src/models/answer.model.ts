import mongoose from "mongoose";
import {
  strAnswerModelConstant,
  strQuestionModelConstant,
} from "./model.constants";

const AnswerSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: strQuestionModelConstant,
      required: [true, "Answer must belong to a question"],
    },
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
  strAnswerModelConstant,
  AnswerSchema
);
