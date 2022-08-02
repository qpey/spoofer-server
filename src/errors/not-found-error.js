const { CustomError } = require("./custom-error");

class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(message) {
    super(message || "Route or resource not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.message || "Route or resource not found", field: "" },
    ];
  }
}
module.exports = { NotFoundError };
