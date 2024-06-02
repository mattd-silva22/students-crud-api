import { StatusCodes } from "http-status-codes";
import { DefaultError } from "src/shared/errors/DefaultError.error";

export class NotFoundError extends DefaultError {
  constructor(message: string, statusCode: number = StatusCodes.NOT_FOUND) {
    super("NotFoundError", message, statusCode);
  }
}
