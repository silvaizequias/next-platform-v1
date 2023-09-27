import { SendSMS } from '@/libraries/twilio'
import { TwilioProps } from '@/libraries/twilio/types'
import {
  TwilioSmsSchema,
  TwilioSmsSchemaType,
} from '@/libraries/twilio/types/schema'
import { NextResponse } from 'next/server'
export const POST = async (
  request: Request,
): Promise<TwilioSmsSchemaType | any> => {
  const inputs: TwilioSmsSchemaType = await request.json()
  try {
    if (await TwilioSmsSchema.parseAsync(inputs)) {
      const data: TwilioProps = {
        messageBody: inputs.messageBody,
        sendTo: inputs.sendTo,
        fromPhone: inputs.fromPhone!,
      }
      return new NextResponse(JSON.stringify(await SendSMS(data)), {
        status: 201,
      })
    }
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}
