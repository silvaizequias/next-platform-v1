export interface SendGridProps {
  sendTo: string
  fromEmail: string
  subjectMessage: string
  textMessage: string
}

export interface SendGridTemplateProps {
  name: string
  password?: string
  key?: string
  phone?: string
  email: string
  subject?: string
}
