export interface SendEmail {
  to: string
  bcc?: string
  subject: string
  message: string
}

export interface SendSMS {
  to: string
  message: string
}
