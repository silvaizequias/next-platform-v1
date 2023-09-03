import axios from 'axios'
import { prisma } from '@/libraries/prisma'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compareSync } from 'bcrypt'
import { AuthSignInSchema } from '@/schemas/auth'
import { profile } from 'console'

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRE = process.env
  .NEXT_PUBLIC_GOOGLE_CLIENT_SECRE as string

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        phone: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (await AuthSignInSchema.parseAsync(credentials!)) {
            const { phone, password } = credentials!
            const user = await prisma.user.findFirst({
              where: { phone: phone },
            })
            if (!user) return null

            const isValidPassword = compareSync(password, user?.passHash!)
            if (!isValidPassword) return null

            return {
              id: user?.id!,
              role: user?.role!,
              name: user?.name!,
              phone: user?.phone!,
              email: user?.email!,
              avatar: user?.avatar!,
              isActive: user?.isActive!,
              isVerified: user?.isVerified!,
            }
          }
          return null
        } catch (error: any) {
          console.error(error?.message || error)
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRE,
    }),
  ],
  session: { strategy: 'jwt', maxAge: 15 * 24 * 30 * 60 },
  cookies: {},
  callbacks: {
    jwt: async ({ token, session, user, account, profile, isNewUser }) => {
      if (user) {
        token.id = user.id
        token.role = user.role!
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }
      if (profile) {
        token.name = profile.name
        token.email = profile.email
        token.picture = profile.image
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.role = token.role
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      if (token) {
        session.user = token
      }
      return session
    },
  },
  pages: {
    signIn: `/`,
    signOut: `/`,
    error: `/`,
    verifyRequest: `/`,
    newUser: '/profile',
  },
}
