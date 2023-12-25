require("dotenv").config();
import express, { type Application } from "express";
require("./db/mongoose");
import path from "path";
import { errorHandler } from "./middlewares/errors";
import "express-async-errors";
import V1Router from "./routes";

export const app: Application = express();
app.use(express.json());
app.use("/v1", V1Router);
app.use(errorHandler);
console.log(process.env.MT_USER);