import toast from 'react-hot-toast'
import { LoginValidator, PhoneValidator } from './validators'

export class AuthActions {
  async login(prevState: any, formData: FormData): Promise<any> {
    try {
      const inputs: any = Object.fromEntries(formData)

      const validate = LoginValidator.safeParse(inputs)
      if (!validate.success)
        return {
          errors: validate.error.flatten().fieldErrors,
          status: validate.success.valueOf(),
        }

      toast.success(``)

      return { status: validate.success.valueOf() }
    } catch (error: any) {
      console.log(error?.message, error?.status)
    }
  }

  async code(prevState: any, formData: FormData): Promise<any> {
    try {
      const inputs: any = Object.fromEntries(formData)

      const validate = PhoneValidator.safeParse(inputs)
      if (!validate.success)
        return {
          errors: validate.error.flatten().fieldErrors,
          status: validate.success.valueOf(),
        }

      toast.success(`Foi enviado um SMS para o número informado.`)

      return { status: validate.success.valueOf() }
    } catch (error: any) {
      console.log(error?.message, error?.status)
    }
  }
}
