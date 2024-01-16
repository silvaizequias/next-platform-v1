'use server'

import { prisma } from '@/libraries/prisma'

import { CreatePublicationDTOType, UpdatePublicationDTOType } from './dto'

export async function actionSetCreatePost(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: CreatePublicationDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}

export async function actionSetUpdatePost(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: UpdatePublicationDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
