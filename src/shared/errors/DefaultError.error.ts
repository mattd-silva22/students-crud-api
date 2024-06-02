import { StatusCodes } from "http-status-codes";
export class DefaultError extends Error {
  public message: string;
  public name: string;
  public statusCode: number;

  constructor(
    name: string,
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }

  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
