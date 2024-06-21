export interface AuthLogin {
  phone: string
  code: string
}

export interface AuthCallback {
  readonly expiredIn: number
  readonly token: string
}
