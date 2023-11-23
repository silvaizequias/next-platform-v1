import twilio from 'twilio'

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export const sendSms = (data: any) => {
  client.messages
    .create(data)
    .then(async (message: any) => {
      console.log(message?.sid)
    })
    .catch((error: any) => {
      console.error(error)
    })
}
