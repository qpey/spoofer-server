import { CustomError } from "./custom-error";

export class InternalServerError extends CustomError {
  statusCode = 403;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, field: "" }];
  }
}
