export class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
}
