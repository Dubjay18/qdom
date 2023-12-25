import { type HttpStatusCode } from "axios";
import StandardError from ".";
import { EErrorTypes, EOperationalType } from "./types";

class APIError extends StandardError {
  public readonly operational_type: EOperationalType;

  constructor(
    message: string,
    httpStatusCode: HttpStatusCode,
    description: any,
    operationalType: EOperationalType = EOperationalType.Network
  ) {
    super(
      message,
      EErrorTypes.Operational,
      httpStatusCode,
      description.description ?? description
    );
    this.operational_type = operationalType;
  }
}

export default APIError;
