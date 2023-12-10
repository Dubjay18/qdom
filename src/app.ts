import express, { type Application } from "express";
import path from "path";
import { errorHandler } from "./middlewares/errors";
import "express-async-errors";

export const app: Application = express();
app.use(express.json());

app.use(errorHandler);
