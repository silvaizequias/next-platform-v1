import { PrismaService } from '../../services/prisma.service'
import { Member } from '../../types/member.type'
import { CallbackPromise } from '../../types/promise.type'

const prismaService = new PrismaService()

export async function repositoryFindAllMembers(): Promise<CallbackPromise> {
  try {
    const members: Member[] = []
    return { success: true, response: members }
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

export async function repositoryFindOneMember(
  id: string,
): Promise<CallbackPromise> {
  try {
    return { success: true, response: id }
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
