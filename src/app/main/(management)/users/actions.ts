'use server'

import { Session } from 'next-auth'
import {
  CreateUserDTO,
  CreateUserDTOType,
  UpdateUserDTO,
  UpdateUserDTOType,
} from './dto'
import { revalidatePath } from 'next/cache'
import { sendSms } from '@/services/send-sms'
import { sendEmail } from '@/services/send-email'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER!

export async function actionGetUsers(session: Session) {
  try {
    const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })

    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionCreateUser(
  session: Session,
  inputs: CreateUserDTOType,
) {
  const randomCode = Math.random().toString(32).substr(2, 16)
  try {
    if (await CreateUserDTO.parseAsync(inputs)) {
      const setPassword = inputs?.password || randomCode
      const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({ ...inputs, password: setPassword }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      sendSms({
        to: `+55${inputs?.phone}`,
        from: TWILIO_PHONE_NUMBER,
        body: `${inputs?.name} você foi registrado na plataforma dedicado como ${inputs?.profile} e poderá acessar https://dedicado.digital com o seu número de celular e a senha ${setPassword}`,
      })
      if (inputs?.email) {
        const message = `
        <p>Olá ${inputs?.name}, seja muito bem vindo(a) a dedicado, sua plataforma de serviços em núvem!</p>
        <p>Você foi registrado(a) na plataforma como ${inputs?.profile} e agora poderá acessar https://dedicado.digital com o seu número de celular e a senha ${setPassword} todos os serviços disponíveis.</p>
        </br>
        <p>É um prazer ter você por aqui!</p>
        `
        sendEmail({
          to: `${inputs?.email}`,
          from: { name: 'dedicado', email: 'master@dedicado.digital' },
          subject: 'boas vindas a melhor plataforma de serviços',
          text: message,
          html: message,
        })
      }
      revalidatePath('/users')
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionUpdateUser(
  session: Session,
  inputs: UpdateUserDTOType,
  userId: string,
) {
  try {
    if (await UpdateUserDTO.parseAsync(inputs)) {
      const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      revalidatePath('/users')
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
