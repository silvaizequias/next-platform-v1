import { SendSMS } from '@/libraries/twilio'
import { TwilioProps } from '@/libraries/twilio/types'
import { TwilioSMS, TwilioSMSType } from '@/schemas/twilio'
export const POST = async (request: Request) => {
  try {
    return await request.json().then(async (inputs: TwilioSMSType) => {
      if (TwilioSMS.validateSync(inputs)) {
        const data: TwilioProps = {
          messageBody: inputs.messageBody,
          sendTo: inputs.sendTo,
          fromPhone: inputs.fromPhone,
        }
        return new Response(JSON.stringify(await SendSMS(data)))
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
