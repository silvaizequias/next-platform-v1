import { environment } from '@/environments'
import { CallbackPromise } from '../types/promise.type'
import { authPayload } from '../validators/auth.validator'
import { SignJWT, jwtVerify } from 'jose'
import { nanoid } from 'nanoid'

export default class JWTService {
  private issuedAt: number = Math.floor(Date.now() / 1000) - 30
  private expiresIn: number = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60

  async payload(id: string): Promise<CallbackPromise> {
    try {
      const token = await new SignJWT({ id: id })
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(nanoid())
        .setIssuedAt(this.issuedAt)
        .setExpirationTime(this.expiresIn)
        .sign(new TextEncoder().encode(environment.SECRET))

      const payload: authPayload = {
        expiresIn: this.expiresIn,
        id: id,
        token: token,
      }

      return {
        success: true,
        response: payload,
      }
    } catch (error: any) {
      return { success: false, message: error?.message, status: error?.status }
    }
  }
}
