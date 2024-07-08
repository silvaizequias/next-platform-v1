import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { removeUserType } from '../../validators/user.validator'

const prismaService = new PrismaService()

export async function repositoryRemoveUser(
  id: string,
  removeUser: removeUserType,
): Promise<CallbackPromise> {
  const { definitely } = removeUser
  try {
    const user = await prismaService.user.findFirst({
      where: { id: id, softDeleted: false },
    })
    if (!user)
      return {
        success: false,
        status: 404,
        message: `O usuário não foi encontrado!`,
      }

    if (definitely)
      await prismaService.user.delete({
        where: { id: id, softDeleted: true },
      })

    await prismaService.user.update({
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
    await prismaService.$disconnect()
  }
}
