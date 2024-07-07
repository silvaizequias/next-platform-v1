import { CallbackPromise } from '../types/promise.type'
import { authCodeType, authLoginType } from '../validators/auth.validator'
import { MessagesService } from './messages.service'
import { SendersService } from './senders.service'
import { compareSync, hashSync } from 'bcryptjs'
import { JWTService } from './jwt.service'
import { PrismaService } from './prisma.service'

export class AuthService {
  private messagesService = new MessagesService()
  private sendersService = new SendersService()
  private jwtService = new JWTService()
  private prismaService = new PrismaService()

  async authentication(authLogin: authLoginType): Promise<CallbackPromise> {
    const { code, phone } = authLogin
    try {
      const user = await this.prismaService.user.findFirst({
        where: { phone: phone },
      })
      if (!user)
        return {
          success: false,
          status: 404,
          message: `O usuário não foi encontrado!`,
        }

      const validation = compareSync(code.toLocaleUpperCase(), user?.secret!)
      if (!validation)
        return {
          success: false,
          status: 403,
          message: `O código ${code.toLocaleUpperCase()} não é válido!`,
        }

      await this.prismaService.user.update({
        where: { phone: phone },
        data: { lastLogin: new Date() },
      })
      return await this.jwtService.payload(user?.id).then((data) => {
        return {
          success: data.success,
          message: `Boas vindas ${user?.name ?? ''}!`,
          response: data.response,
        }
      })
    } catch (error: any) {
      return { success: false, message: error?.message, status: error?.status }
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async validation(authCode: authCodeType): Promise<CallbackPromise> {
    const { phone } = authCode
    try {
      const code = Math.random().toString(32).substr(2, 6).toUpperCase()
      const user = await this.prismaService.user.findFirst({
        where: { phone: phone },
      })
      if (!user)
        await this.prismaService.user.create({
          data: { role: 'customer', phone: phone, secret: hashSync(code, 10) },
        })

      await this.prismaService.user.update({
        where: { phone: phone },
        data: { secret: hashSync(code, 10) },
      })
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
    } finally {
      await this.prismaService.$disconnect()
    }
  }
}
