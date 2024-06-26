import toast from 'react-hot-toast'
import { ContactFormValidator } from './validators'

export class ContactActions {
  async contact(prevState: any, formData: FormData) {
    try {
      const inputs: any = Object.fromEntries(formData)

      const validate = ContactFormValidator.safeParse(inputs)
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
      throw new Error(error?.message, error?.status)
    }
  }
}
