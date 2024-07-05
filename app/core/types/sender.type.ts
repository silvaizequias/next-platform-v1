export type SendEmail = {
  to: string
  bcc?: string
  subject: string
  message: string
}

export type SendSMS = {
  to: string
  message: string
}
