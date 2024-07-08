import { hashSync } from 'bcryptjs'
import { PrismaService } from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { User } from '../../types/user.type'
import { authCodeType } from '../../validators/auth.validator'
import { createUserType } from '../../validators/user.validator'
import { MessagesService } from '../../services/messages.service'
import { SendersService } from '../../services/senders.service'

const messagesService = new MessagesService()
const prismaService = new PrismaService()
const sendersService = new SendersService()

export async function repositoryCreateUser(
  createUser: createUserType,
): Promise<CallbackPromise> {
  const { email, name, phone } = createUser
  try {
    const userEmail: User | any = await prismaService.user.findFirst({
      where: { email: email },
    })
    if (userEmail)
      return {
        success: false,
        status: 409,
        message: `Não foi possível registrar-se com ${email}`,
      }

    const userPhone: User | any = await prismaService.user.findFirst({
      where: { phone: phone },
    })
    if (userPhone)
      return {
        success: false,
        status: 409,
        message: `Não foi possível registrar-se com ${email}`,
      }

    return await prismaService.user
      .create({ data: createUser })
      .then((data) => {
        return {
          success: true,
          response: data?.id,
          message: `O usuário ${name ?? ''} foi criado na plataforma!`,
        }
      })
  } catch (error: any) {
    return {
      success: false,
      message: error?.message,
      status: error?.status,
    }
  } finally {
    await prismaService.$disconnect()
  }
}

export async function repositoryValidateUser(
  authCode: authCodeType,
): Promise<CallbackPromise> {
  const { phone } = authCode
  try {
    const code = Math.random().toString(32).substr(2, 6).toUpperCase()
    const user = await prismaService.user.findFirst({
      where: { phone: phone },
    })
    if (!user)
      await prismaService.user.create({
        data: { role: 'customer', phone: phone, secret: hashSync(code, 10) },
      })

    await prismaService.user.update({
      where: { phone: phone },
      data: { secret: hashSync(code, 10) },
    })
    const message = await messagesService.codeGenerated(code)
    return await sendersService
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
    await prismaService.$disconnect()
  }
}
