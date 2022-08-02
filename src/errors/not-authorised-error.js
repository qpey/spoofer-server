import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 403;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, field: "" }];
  }
}
