import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { updateMemberType } from '../../validators/member.validator'

const prismaService = new PrismaService()

export async function repositoryUpdateMember(
  id: string,
  updateMember: updateMemberType,
): Promise<CallbackPromise> {
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

    return await prismaService.member
      .update({
        where: { id: id, softDeleted: false },
        data: { ...updateMember },
      })
      .then((data) => {
        return {
          success: true,
          response: data?.id,
          message: `O membro foi atualizado!`,
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
