export class NonExistingUserError extends Error{
  constructor(message){
    super(message)
    this.name = 'NonExistingUserError'
  }
}

export class LoginError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LoginError';
  }
}

export class UnauthorizedError extends Error{
  constructor(message){
    super(message)
    this.name = 'UnauthorizedError'
  }
}
