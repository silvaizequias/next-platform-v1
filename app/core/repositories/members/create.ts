import { PrismaService } from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { createMemberType } from '../../validators/member.validator'

const prismaService = new PrismaService()

export async function repositoryCreateMember(
  createMember: createMemberType,
): Promise<CallbackPromise> {
  try {
    return { success: true, response: createMember }
  } catch (error: any) {
    await prismaService.$disconnect()
    return {
      success: false,
      message: error?.message,
      status: error?.status,
    }
  } finally {
    await prismaService.$disconnect()
  }
}
