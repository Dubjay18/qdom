import {
  type NextFunction,
  type Response,
  type Request,
} from "express";

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
}

export default BaseController;
