import { hashSync } from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import { environment } from '@/environments'
import { AuthLoginValidatorType } from './validator'
import AccountActions from '@/components/accounts/actions'
import SenderActions from '../senders/actions'

export type AuthCallback = {
  expiredIn: number
  token: string
}

export default class AuthActions {
  private senderActions = new SenderActions()
  private accountActions = new AccountActions()
  private secret = environment.secret

  async login(authLogin: AuthLoginValidatorType) {
    const { phone, code } = authLogin

    const account = this.accountActions.findByPhone(phone)
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
  }

  async code(phone: string): Promise<AuthCallback | any> {
    const code = Math.random().toString(32).substr(2, 6).toUpperCase()

    const message = `PLATAFORMA DEDICADO: Utilize o código ${code} para autenticar.`

    const account = this.accountActions.findByPhone(phone)
    if (!account) throw new Error()

    const secret: string = hashSync(code, 10)

    return this.senderActions
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
