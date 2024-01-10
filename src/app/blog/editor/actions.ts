'use server'

import { CreatePostDTOType, UpdatePostDTOType } from './dto'

export async function actionSetCreatePost(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: CreatePostDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}

export async function actionSetUpdatePost(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: UpdatePostDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
