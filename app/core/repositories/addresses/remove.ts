import { PrismaService } from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { removeAddressType } from '../../validators/address.validator'

const prismaService = new PrismaService()

export async function repositoryRemoveAddress(
  id: string,
  removeAddress: removeAddressType,
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
