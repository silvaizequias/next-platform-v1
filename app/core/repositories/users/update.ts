import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { updateUserType } from '../../validators/user.validator'

const prismaService = new PrismaService()

export async function repositoryUpdateUser(
  id: string,
  updateUser: updateUserType,
): Promise<CallbackPromise> {
  try {
    const user = await prismaService.user.findFirst({
      where: { id: id },
    })
    if (!user)
      return {
        success: false,
        status: 404,
        message: `O usuário não foi encontrado!`,
      }

    await prismaService.user.update({
      where: { id: id },
      data: { ...updateUser },
    })
    return {
      success: true,
      response: id,
      message: `As informações do usuário ${
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
    await prismaService.$disconnect()
  }
}
