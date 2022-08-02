import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

// TODO: implememt this ValidationError type specific to (joi)
export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(errors) {
    super("Invalid Request Parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
