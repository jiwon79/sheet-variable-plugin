class Result<T> {
  constructor(
    public success: boolean,
    public message: string,
    public errorCode: string,
    public data: T | null,
  ) {
  }

  get isSuccess(): boolean {
    return this.success;
  }
}

class Success<T> extends Result<T> {
  constructor(
    public data: T,
  ) {
    super(true, "", "", data);
  }
}

class Fail<T> extends Result<T> {
  constructor(
    public message: string,
    public errorCode: string,
  ) {
    super(false, message, errorCode, null);
  }
}

export { Result, Success, Fail };
