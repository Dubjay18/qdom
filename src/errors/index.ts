import { type HttpStatusCode } from "axios";
import { EErrorTypes } from "./types";

class StandardError extends Error {
  public errorType: EErrorTypes;
  public description: any;

  public readonly httpStatusCode: HttpStatusCode;
  public readonly is_operational: boolean;
  public readonly timestamp: Date;

  constructor(
    msg: string | Error,
    errorType: EErrorTypes,
    httpStatusCode: HttpStatusCode,
    description?: any
  ) {
    super(msg instanceof Error ? msg.message : msg);
    this.description = description ?? this.message;
    // set error obj prototype
    Object.setPrototypeOf(this, new.target.prototype);
    this.httpStatusCode = httpStatusCode;
    this.timestamp = new Date();
    this.errorType = errorType;
    this.is_operational =
      this.errorType === EErrorTypes.Operational;

    Error.captureStackTrace(this);
  }
}

export default StandardError;
