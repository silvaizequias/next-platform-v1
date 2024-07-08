import { PrismaService } from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { removeMemberType } from '../../validators/member.validator'

const prismaService = new PrismaService()

export async function repositoryRemoveMember(
  id: string,
  removeMember: removeMemberType,
): Promise<CallbackPromise> {
  try {
    return { success: true, response: { id, removeMember } }
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
