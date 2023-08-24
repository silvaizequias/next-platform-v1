import { SendEmail } from '@/libraries/sendgrid'
import { SendGridProps } from '@/libraries/sendgrid/types'
import {
  SendGridEmailSchema,
  SendGridEmailSchemaType,
} from '@/schemas/sendgrid'

export const POST = async (request: Request) => {
  try {
    return await request
      .json()
      .then(async (inputs: SendGridEmailSchemaType) => {
        if (SendGridEmailSchema.validateSync(inputs)) {
          const data: SendGridProps = {
            sendTo: inputs.sendTo,
            fromEmail: inputs.fromEmail,
            subjectMessage: inputs.subjectMessage,
            textMessage: inputs.textMessage,
          }
          return new Response(JSON.stringify(await SendEmail(data)))
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
