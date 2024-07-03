import toast from 'react-hot-toast'
import { authCode, authLogin } from '../validators/auth.validator'

export class AuthService {
  async authentication(prevState: any, formData: FormData) {
    try {
      const inputs: any = Object.fromEntries(formData)

      const validate = authLogin.safeParse(inputs)
      if (!validate.success)
        return {
          errors: validate.error.flatten().fieldErrors,
          status: validate.success.valueOf(),
        }

      toast.success(`Boas vindas a melhor plataforma de serviços.`)

      return { status: validate.success.valueOf() }
    } catch (error: any) {
      console.log(error)
    }
  }

  async validation(prevState: any, formData: FormData) {
    try {
      const inputs: any = Object.fromEntries(formData)

      const validate = authCode.safeParse(inputs)
      if (!validate.success)
        return {
          errors: validate.error.flatten().fieldErrors,
          status: validate.success.valueOf(),
        }

      toast.success(
        `Enviamos o código de autenticação para o seu dispositivo móvel.`,
      )

      return { status: validate.success.valueOf() }
    } catch (error: any) {
      console.log(error)
    }
  }
}
