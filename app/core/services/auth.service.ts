import { CallbackPromise } from '../interfaces/promise.interface'
import { authCodeType, authLoginType } from '../validators/auth.validator'
import { MessagesService } from './messages.service'
import { SendersService } from './senders.service'
import { compareSync, hashSync } from 'bcryptjs'
import { JWTService } from './jwt.service'

export class AuthService {
  private messagesService = new MessagesService()
  private sendersService = new SendersService()
  private jwtService = new JWTService()

  async authentication(authLogin: authLoginType): Promise<CallbackPromise> {
    const { code, phone } = authLogin
    try {
      const secret: string = hashSync(code, 10)
      const validation = compareSync(code, secret)

      if (!validation)
        return { success: false, status: 403, message: 'O código não é válido' }

      return await this.jwtService.payload(code.toUpperCase()).then((data) => {
        return {
          success: data.success,
          message: 'Boas vindas a melhor plataforma de serviços.',
          response: data.response,
        }
      })
    } catch (error: any) {
      return { success: false, message: error?.message, status: error?.status }
    }
  }

  async validation(authCode: authCodeType): Promise<CallbackPromise> {
    const code = Math.random().toString(32).substr(2, 6).toUpperCase()
    const secret: string = hashSync(code, 10)
    const { phone } = authCode
    try {
      const message = await this.messagesService.codeGenerated(code)
      return await this.sendersService
        .sms({ to: phone, message: message })
        .then(() => {
          return {
            success: true,
            message:
              'Enviamos o código de autenticação para o seu dispositivo móvel.',
          }
        })
        .catch((error: any) => {
          return {
            success: false,
            errors: error?.message,
            status: error?.status,
          }
        })
    } catch (error: any) {
      return { success: false, message: error?.message, status: error?.status }
    }
  }
}
