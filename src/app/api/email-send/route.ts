import { SendEmail } from '@/libraries/sendgrid'
import { SendGridProps } from '@/libraries/sendgrid/types'
import {
  SendGridEmailSchema,
  SendGridEmailSchemaType,
} from '@/libraries/sendgrid/types/schema'

export const POST = async (
  request: Request,
): Promise<SendGridEmailSchemaType | any> => {
  const inputs: SendGridEmailSchemaType = await request.json()
  try {
    if (await SendGridEmailSchema.parseAsync(inputs)) {
      const data: SendGridProps = {
        sendTo: inputs.sendTo,
        fromEmail: inputs.fromEmail!,
        subjectMessage: inputs.subjectMessage,
        textMessage: inputs.textMessage,
      }
      return new Response(JSON.stringify(await SendEmail(data)), {
        status: 201,
      })
    }
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
