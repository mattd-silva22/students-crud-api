import { DefaultError } from "../errors/DefaultError.error";
import { EErrors } from "../errors/types/Errors.type";

export class DatabaseFail extends DefaultError {
  public details: string;
  constructor(message: string, details: string, name: string) {
    super(name, message);
    this.details = details;
  }
}
