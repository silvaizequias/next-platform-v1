import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { removeMemberType } from '../../validators/member.validator'

const prismaService = new PrismaService()

export async function repositoryRemoveMember(
  id: string,
  removeMember: removeMemberType,
): Promise<CallbackPromise> {
  const { definitely } = removeMember
  try {
    const member = await prismaService.member.findFirst({
      where: { id: id, softDeleted: false },
    })
    if (!member)
      return {
        success: false,
        status: 404,
        message: `O membro não foi encontrado!`,
      }

    if (definitely)
      await prismaService.member.delete({
        where: { id: id, softDeleted: true },
      })

    await prismaService.member.update({
      where: { id: id, softDeleted: false },
      data: {
        softDeleted: true,
      },
    })

    return {
      success: true,
      response: id,
      message: `O membro foi removido ${
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
