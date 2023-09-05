import axios from 'axios'
import { prisma } from '@/libraries/prisma'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compareSync } from 'bcrypt'
import { AuthSignInSchema } from '@/schemas/auth'

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
              image: user?.image!,
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
      profile(profile): any {
        return {
          id: profile?.sub!,
          name: profile?.name!,
          email: profile?.email!,
          image: profile?.picture!,
        }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 15 * 24 * 30 * 60 },
  cookies: {},
  callbacks: {
    signIn: async ({ user, account, profile, credentials }) => {
      if (profile) {
        const data = await prisma.user.findFirst({
          where: {
            email: profile.email!,
          },
        })
        if (!data) {
          await prisma.user.create({
            data: {
              name: profile?.name!,
              email: profile?.email!,
              image: profile?.image!,
              role: 'GUEST',
              isActive: true,
              isVerified: true,
            },
          })
        }
        return true
      }
      return false
    },
    jwt: async ({ token, user, isNewUser }) => {
      //console.log('JWT CALLBACK', { token, user })
      const data = await prisma.user.findFirst({
        where: {
          email: user?.email! || token?.email!,
        },
      })
      if (!user) {
        token.id = data!.id
        return token
      }

      return {
        id: data?.id!,
        role: data?.role!,
        name: user?.name!,
        email: user?.email!,
        picture: user?.image! || data?.image,
      }
    },
    session: async ({ session, token }) => {
      //console.log('SESSION CALLBACK', { session, token })
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
  },
  pages: {
    signIn: '/',
    newUser: '/profile'
  },
  debug: false,
}
