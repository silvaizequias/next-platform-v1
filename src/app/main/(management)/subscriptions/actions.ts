'use server'

import { prisma } from '@/libraries/prisma'
import { Session } from 'next-auth'
import {
  CreateSubscriptionDTO,
  CreateSubscriptionDTOType,
  UpdateSubscriptionDTO,
  UpdateSubscriptionDTOType,
} from './dto'

export async function actionGetSubscriptions(session: Session) {
  try {
    return await prisma.subscription.findMany({
      where: { softDeleted: false },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function actionCreateSubscription(
  session: Session,
  inputs: CreateSubscriptionDTOType,
) {
  try {
    if (await CreateSubscriptionDTO.parseAsync(inputs)) {
      return inputs
    }
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function actionUpdateSubscription(
  session: Session,
  inputs: UpdateSubscriptionDTOType,
  id: string,
) {
  try {
    if (await UpdateSubscriptionDTO.parseAsync(inputs)) {
      return inputs
    }
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}
