import mongoose from "mongoose";
import {
  strQuizModelConstant,
  strResponseModelConstant,
  strUserModelConstant,
} from "./model.constants";

const ResponseSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: strQuizModelConstant,
    required: [true, "Response must belong to a quiz"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: strUserModelConstant,
    required: [true, "Response must belong to a user"],
  },

  submittedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model(
  strResponseModelConstant,
  ResponseSchema
);
