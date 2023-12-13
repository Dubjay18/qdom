import StandardError from "../errors";
import {
  EErrorTypes,
  type EMongooseErrors,
  EOperationalType,
  type TModifiedValidationError,
  type TMongoServerServerError,
} from "../errors/types";
import { HttpStatusCode } from "axios";
import type mongoose from "mongoose";

const EMongooseData: EMongooseErrors = {
  11000: {
    name: "Key already exists in database",
    status: HttpStatusCode.Conflict,
  },
};

class DatabaseError extends StandardError {
  public readonly operational_type: EOperationalType;

  constructor(
    error: mongoose.Error,
    statusCode?: HttpStatusCode
  ) {
    let formattedStatusCode: HttpStatusCode =
      statusCode as HttpStatusCode;
    let message: string =
      "An error occurred from the database";
    let description: any;
    if (error.name === "CastError") {
      // handle cast error
      formattedStatusCode = HttpStatusCode.BadRequest;
      description = error;
    }
    if (error.name === "ValidationError") {
      // handle validation error
      const modErrors = error as TModifiedValidationError;
      formattedStatusCode = HttpStatusCode.BadRequest;
      const validationErrors = modErrors.errors;
      const defunctKeys = Object.keys(validationErrors);
      description = Object.assign(
        defunctKeys.map((defunctKey) => ({
          [defunctKey]:
            validationErrors[defunctKey].message ??
            "Some property error occurred",
        }))
      );
    }
    if (error.name === "MongoServerError") {
      const modError = error as TMongoServerServerError;
      const errData = EMongooseData[modError.code];
      formattedStatusCode = errData.status;
      message = errData.name;
      description = {};
      const duplicatedKeys = Object.keys(
        modError.keyPattern
      );
      duplicatedKeys.map(
        (duplicatedKey: string) =>
          (description[
            duplicatedKey
          ] = `${modError.keyValue[duplicatedKey]} already exists in the database`)
      );
    }
    // general error eliminations
    super(
      message ?? error.message,
      EErrorTypes.Operational,
      formattedStatusCode,
      description
    );
    this.operational_type = EOperationalType.Database;
  }
}

export default DatabaseError;
