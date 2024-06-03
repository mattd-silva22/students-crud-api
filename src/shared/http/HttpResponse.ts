export class HttpResponseSuccess<T> {
  message: string;
  data?: T;

  constructor(message: string, data?: T) {
    this.message = message;
    this.data = data ?? ([] as T);
  }
}

export class HttpResponseError {
  message: string;
  errors: string[];

  constructor(message: string, errors: string[]) {
    message = message;
    errors = errors;
  }
}
