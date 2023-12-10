import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    required: [true, "First name is required"],
    type: String,
  },
  lastName: {
    required: [true, "Last name is required"],
    type: String,
  },
});
