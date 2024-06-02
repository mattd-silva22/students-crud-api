import { DefaultError } from "src/shared/errors/DefaultError.error";
import { EStudentsErrors } from "./types/studentsErrors";
import { StatusCodes } from "http-status-codes";

export class FailToCreateError extends DefaultError {
  constructor(message: string, statusCode: number = StatusCodes.CONFLICT) {
    super(EStudentsErrors.FAIL_TO_CREATE, message, statusCode);
  }
}
