import { PrismaService } from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { updateAddressType } from '../../validators/address.validator'

const prismaService = new PrismaService()

export async function repositoryUpdateAddress(
  id: string,
  updateAddress: updateAddressType,
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
