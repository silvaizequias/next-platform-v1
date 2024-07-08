import { PrismaService } from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { createAddressType } from '../../validators/address.validator'

const prismaService = new PrismaService()

export async function repositoryCreateAddress(
  createAddress: createAddressType,
): Promise<CallbackPromise> {
  try {
    return { success: true }
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
