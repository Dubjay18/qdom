import express, { type Application } from "express";
import path from "path";

export const app: Application = express();
app.use(express.json());
