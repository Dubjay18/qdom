import { CustomError } from "@/errors/CustomError";
import { Response } from "express";
import { HttpStatusCode } from "axios";
import StandardError from "@/errors";
import JLogger from "@/utils/logger";
import mongoose from "mongoose";
import DatabaseError from "@/errors/DatabaseError";

function respond(
  res: Response,
  data: any,
  httpCode: number
): void {
  res.setHeader("Content-Type", "application/json");

  res.writeHead(httpCode);
  res.end(JSON.stringify(data));
}

export function success(
  res: Response,
  response: any,
  status = 200
): void {
  respond(res, response, status);
}

export function failure(
  res: Response,
  response: any,
  httpCode = 503
): void {
  const data = response;
  data.error = true;
  respond(res, data, httpCode);
}
