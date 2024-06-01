export class HttpResponse<T> {
  constructor(
    readonly message: string | null = null,
    readonly data: T | null = null,
    readonly errors: string[] | null = null,
  ) {
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  success(): {
    message: string;
    data: T | null;
  } {
    return {
      message: this.message ?? "Success",
      data: this.data,
    };
  }

  error() {
    return {
      message: this.message ?? "Error",
      errors: this.errors,
    };
  }
}
