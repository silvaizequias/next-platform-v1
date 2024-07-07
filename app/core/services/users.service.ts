import { CallbackPromise } from '../types/promise.type'
import { User } from '../types/user.type'
import {
  createUserType,
  removeUserType,
  updateUserType,
} from '../validators/user.validator'
import { PrismaService } from './prisma.service'

export class UsersService {
  private prismaService = new PrismaService()

  async create(createUser: createUserType): Promise<CallbackPromise> {
    const { email, phone } = createUser
    try {
      const userEmail: User | any = await this.prismaService.user.findFirst({
        where: { email: email },
      })
      if (userEmail)
        return {
          success: false,
          status: 409,
          message: `Não foi possível registrar-se com ${email}`,
        }

      const userPhone: User | any = await this.prismaService.user.findFirst({
        where: { phone: phone },
      })
      if (userPhone)
        return {
          success: false,
          status: 409,
          message: `Não foi possível registrar-se com ${email}`,
        }

      await this.prismaService.user.create({ data: createUser })
      return { success: true, response: createUser }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async findAll(): Promise<CallbackPromise> {
    try {
      const users: User[] | any = await this.prismaService.user.findMany({
        take: 100,
        orderBy: { createdAt: 'desc' },
        where: { softDeleted: false },
        select: {
          id: true,
          updatedAt: true,
          active: true,
          lastLogin: true,
          role: true,
          name: true,
          phone: true,
        },
      })
      const count = await this.prismaService.user.count({
        where: { softDeleted: false },
      })
      return { success: true, response: { count: count, users: users } }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async findOne(id: string): Promise<CallbackPromise> {
    try {
      const user: User | any = await this.prismaService.user.findFirst({
        where: { id: id, softDeleted: false },
      })
      if (!user)
        return {
          success: false,
          status: 404,
          message: `O usuário não foi encontrado!`,
        }

      return { success: true, response: user }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async update(
    id: string,
    updateUser: updateUserType,
  ): Promise<CallbackPromise> {
    try {
      const user: User | any = await this.prismaService.user.findFirst({
        where: { id: id },
      })
      if (!user)
        return {
          success: false,
          status: 404,
          message: `O usuário não foi encontrado!`,
        }

      await this.prismaService.user.update({
        where: { id: id },
        data: { ...updateUser },
      })
      return {
        success: true,
        response: id,
        message: `As infprismaServiceações do usuário ${
          user?.name ?? ''
        } foram atualizadas`,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
      await this.prismaService.$disconnect()
    }
  }

  async remove(
    id: string,
    removeUser: removeUserType,
  ): Promise<CallbackPromise> {
    const { definitely } = removeUser
    try {
      const user: User | any = await this.prismaService.user.findFirst({
        where: { id: id },
      })
      if (!user)
        return {
          success: false,
          status: 404,
          message: `O usuário não foi encontrado!`,
        }

      if (definitely)
        await this.prismaService.user.delete({ where: { id: id } })

      await this.prismaService.user.update({
        where: { id: id, softDeleted: false },
        data: {
          softDeleted: true,
        },
      })

      return {
        success: true,
        response: id,
        message: `O usuário ${user?.name ?? ''} foi removido ${
          definitely ? 'definitivamente' : ''
        } da plataforma!`,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
      await this.prismaService.$disconnect()
    }
  }
}
