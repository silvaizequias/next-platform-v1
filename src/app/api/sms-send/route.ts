import { SendSMS } from '@/libraries/twilio'
import { TwilioProps } from '@/libraries/twilio/types'
import {
  TwilioSmsSchema,
  TwilioSmsSchemaType,
} from '@/libraries/twilio/types/schema'
export const POST = async (
  request: Request,
): Promise<TwilioSmsSchemaType | any> => {
  try {
    return await request.json().then(async (inputs: TwilioSmsSchemaType) => {
      if (await TwilioSmsSchema.parseAsync(inputs)) {
        const data: TwilioProps = {
          messageBody: inputs.messageBody,
          sendTo: inputs.sendTo,
          fromPhone: inputs.fromPhone!,
        }
        return new Response(JSON.stringify(await SendSMS(data)), {
          status: 201,
        })
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
