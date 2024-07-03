import toast from 'react-hot-toast'
import { sendContactForm } from '../validators/contact.validator'

export class ContactService {
  async platformContactForm(prevState: any, formData: FormData) {
    try {
      const inputs: any = Object.fromEntries(formData)

      const validate = sendContactForm.safeParse(inputs)
      if (!validate.success)
        return {
          errors: validate.error.flatten().fieldErrors,
          status: validate.success.valueOf(),
        }

      toast.success(
        `${inputs?.name}, tudo certo até aqui. Logo mais retornaremos sua mensagem!`,
      )

      return { status: validate.success.valueOf() }
    } catch (error: any) {
      console.log(error)
    }
  }
}
