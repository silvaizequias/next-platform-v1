import { CallbackPromise } from '../interfaces/promise.interface'
import { authCodeType, authLoginType } from '../validators/auth.validator'

export class AuthService {
  async authentication(authLogin: authLoginType): Promise<CallbackPromise> {
    try {
      console.log(authLogin)
      return {
        success: true,
        message: 'Boas vindas a melhor plataforma de serviços.',
      }
    } catch (error: any) {
      console.log(error)
      return { success: false, message: error?.message, status: error?.status }
    }
  }

  async validation(authCode: authCodeType): Promise<CallbackPromise> {
    try {
      console.log(authCode)
      return {
        success: true,
        message:
          'Enviamos o código de autenticação para o seu dispositivo móvel.',
      }
    } catch (error: any) {
      return { success: false, message: error?.message, status: error?.status }
    }
  }
}
