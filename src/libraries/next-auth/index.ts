import { signOut } from 'next-auth/react'
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
        email: { type: 'email' },
      },
      authorize: async (credentials) => {
        try {
          if (await AuthSignInSchema.parseAsync(credentials!)) {
            const { phone, email } = credentials!
            const user = await prisma.user.findFirst({
              where: { phone: phone, email: email },
            })
            if (!user) return null

            return {
              id: user?.id!,
              role: user?.role!,
              name: user?.name!,
              phone: user?.phone!,
              email: user?.email!,
              image: user?.image!,
              isActive: user?.isActive!,
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

  callbacks: {
    jwt: async ({ token, user }) => {
      //console.log('JWT CALLBACK', { token, user, isNewUser })
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
    signOut: '/',
  },
  debug: false,
}
