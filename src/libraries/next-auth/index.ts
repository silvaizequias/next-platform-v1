import { prisma } from '@/libraries/prisma'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthSignInSchema } from '@/schemas/auth'
import axios from 'axios'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!
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
            const res = await axios.post(`${NEXTAUTH_URL}/api/sign-in`, {
              email: credentials?.phone,
              password: credentials?.password,
            })
            const user = await res.data

            if (res.data && user) {
              return {
                ...user.data,
                authorization: user.Authorization,
              }
            } else {
              return null
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
        include: {
          services: true,
        },
      })
      if (!user) {
        token.id = data!.id
        return token
      }

      return {
        id: data?.id!,
        role: data?.role!,
        profile: data?.profile!,
        name: user?.name!,
        email: user?.email!,
        picture: user?.image! || data?.image,
        services: user?.services!,
      }
    },
    session: async ({ session, token }) => {
      //console.log('SESSION CALLBACK', { session, token })
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.profile = token.profile
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.services = token.services
      }
      return session
    },
  },

  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
  debug: false,
}
