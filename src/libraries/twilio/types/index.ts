export interface TwilioProps {
  messageBody: string
  sendTo: string
  fromPhone: string
}

export interface TwilioTemplateProps {
  name: string
  password?: string
  phone: string
}
