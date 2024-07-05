import { MessagesService } from '@/app/core/services/messages.service'
import { SendersService } from '@/app/core/services/senders.service'
import { sendContact } from '@/app/core/validators/contact.validator'
import { environment } from '@/environments'
import toast from 'react-hot-toast'

const sendersService = new SendersService()
const messagesService = new MessagesService()

export async function actionContact(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = sendContact.safeParse(inputs)
  if (!validate.success)
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }

  const message = await messagesService.contact(inputs)

  return await sendersService
    .email({
      to: inputs?.email,
      bcc: environment.SENDER_EMAIL_TO,
      subject: `Contato da Plataforma Dedicado :: ${inputs?.subject}`,
      message: message,
    })
    .then(() => {
      toast.success(
        `${inputs?.name}, tudo certo até aqui. Logo mais retornaremos sua mensagem!`,
      )
      return { success: true, errors: undefined }
    })
    .catch((error: any) => {
      toast.error(`${error?.status} :: ${error?.message}`)
      return {
        success: false,
        errors: error?.message,
        status: error?.status,
      }
    })
}
