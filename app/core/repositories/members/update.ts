import { PrismaService } from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { updateMemberType } from '../../validators/member.validator'

const prismaService = new PrismaService()

export async function repositoryUpdateMember(
    id: string,
    updateMember: updateMemberType,
  ): Promise<CallbackPromise> {
    try {
      return { success: true, response: { id, updateMember } }
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
