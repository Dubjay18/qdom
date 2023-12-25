import StandardError from "@/errors";
import APIError from "@/errors/ApiError";
import DatabaseError from "@/errors/DatabaseError";
import JLogger from "@/utils/logger";
import {
  type NextFunction,
  type Response,
  type Request,
} from "express";
import mongoose from "mongoose";
import { HttpStatusCode } from "axios";

class BaseController {
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;

  constructor(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ) {
    this.req = _req;
    this.res = _res;
    this.next = _next;
  }

  public handleError(error: StandardError | Error) {
    JLogger(error.name);
    if (error.name === "ZodError") {
      // TODO: DTO for zodError
    }
    if (
      error.name === "MongoServerError" ||
      error instanceof mongoose.Error
    ) {
      this.next(new DatabaseError(error));
      return;
    }
    if (!(error instanceof StandardError)) {
      this.next(
        new APIError(
          error.message,
          HttpStatusCode.BadRequest,
          error
        )
      );
      return;
    }
    this.next(error);
  }
}

export default BaseController;
