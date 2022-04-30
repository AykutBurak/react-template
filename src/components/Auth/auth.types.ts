export type LoginInput = {
  username: string,
  password: string
}

export type UserResponse = {
  username: string
}

export type LogoutResponse = {
  message: string
}

export type ErrorType = { errorMessage: string }
