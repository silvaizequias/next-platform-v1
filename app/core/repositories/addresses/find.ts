import { PrismaService } from '../../services/prisma.service'
import { Address } from '../../types/address.type'
import { CallbackPromise } from '../../types/promise.type'

const prismaService = new PrismaService()

export async function repositoryFindAllAddresses(): Promise<CallbackPromise> {
  try {
    const addresses: Address[] = []
    return { success: true, response: addresses }
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

export async function repositoryFindByZipCodeAddress(
  zipCode: string,
): Promise<CallbackPromise> {
  try {
    return { success: true, response: zipCode }
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

export async function repositoryFindOneAddress(
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
