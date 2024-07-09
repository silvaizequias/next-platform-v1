import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { authLoginType } from '../../validators/auth.validator'
import { compareSync } from 'bcryptjs'

const prismaService = new PrismaService()

export async function repositoryFindAllUsers(): Promise<CallbackPromise> {
  return await prismaService.user
    .findMany({
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
        organizations: {
          take: 100,
          include: {
            organization: {
              select: {
                id: true,
                name: true,
                document: true,
              },
            },
          },
        },
      },
    })
    .then((data) => {
      return { success: true, response: { count: data.length, data } }
    })
    .catch((error) => {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    })
    .finally(async () => await prismaService.$disconnect())
}

export async function repositoryFindOneUser(
  id: string,
): Promise<CallbackPromise> {
  return await prismaService.user
    .findFirst({
      where: { id: id, softDeleted: false },
      include: {
        organizations: {
          take: 100,
        },
      },
    })
    .then((data) => {
      return { success: true, response: data }
    })
    .catch((error) => {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    })
    .finally(async () => await prismaService.$disconnect())
}

export async function repositoryVerifyUser(
  authLogin: authLoginType,
): Promise<CallbackPromise> {
  const { code, phone } = authLogin
  try {
    const user = await prismaService.user.findFirst({
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

    return await prismaService.user
      .update({
        where: { phone: phone },
        data: { lastLogin: new Date() },
      })
      .then((data) => {
        return { success: true, response: data }
      })
  } catch (error: any) {
    return { success: false, message: error?.message, status: error?.status }
  } finally {
    await prismaService.$disconnect()
  }
}
