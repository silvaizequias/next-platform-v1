import { hashSync } from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import { environment } from '@/environments'
import Senders from '../senders'
import Accounts from '../accounts'
import { LOGIN } from './schemas'
import { Account } from '../accounts/types'

export type AuthCallback = {
  expiredIn: number
  token: string
}

export default class Auth {
  private senders = new Senders()
  private accounts = new Accounts()
  private secret = environment.secret

  async login(_: unknown, form: FormData): Promise<AuthCallback | any> {
    const inputs: any = Object.fromEntries(form)

    try {
      const validator = LOGIN.safeParse(inputs)
      if (!validator.success)
        return { error: validator.error.flatten().fieldErrors }

      const account = await this.accounts.findByPhone(inputs?.phone)
      if (!account) throw new Error()

      const token = Jwt.sign(
        {
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
        },
        this.secret,
      )

      return {
        token,
        expiresIn: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      }
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  async code(phone: string): Promise<any> {
    const code = Math.random().toString(32).substr(2, 6).toUpperCase()

    const message = `PLATAFORMA DEDICADO: Utilize o código ${code} para autenticar.`

    const account: Account = await this.accounts.findByPhone(phone)
    if (!account) throw new Error()

    const secret: string = hashSync(code, 10)

    return this.senders
      .sendSMS({
        to: phone,
        message: message,
      })
      .then(() => {
        return JSON.stringify(
          'Foi enviado um código único de autenticação para o dispositivo do número informado',
        )
      })
      .catch((error: any) => {
        new Error(error?.message, error?.status)
      })
  }
}
