export interface SenderSms {
  to: string
  message: string
}

export interface SenderEmail {
  to: string
  bcc?: string
  subject: string
  message: string
}
