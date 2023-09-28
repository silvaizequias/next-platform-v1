import { prisma } from '@/libraries/prisma'
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        phone: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await axios
          .post(`${NEXTAUTH_URL}/api/sign-in`, credentials)
          .then(async (res: any) => {
            const user = await res.data
            if (res.data && user) {
              return {
                ...user.data,
                authorization: user.Authorization!,
              }
            }
          })
          .catch((error: any) => {
            console.error(error)
          })

        return null
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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
  session: { strategy: 'jwt', maxAge: 15 * 24 * 60 * 60, updateAge: 24 * 60 * 60 },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!user) {
        const user = await prisma.user.findFirst({
          where: { email: token?.email! },
          include: {
            organizations: {
              select: {
                id: true,
                name: true,
                cnpj: true,
              },
            },
            orgs: {
              select: {
                role: true,
                isAvaliable: true,
                organization: {
                  select: {
                    id: true,
                    name: true,
                    cnpj: true,
                  },
                },
              },
            },
          },
        })
        if (user) {
          token.id = user.id
        }
        return token
      }

      return {
        id: user.id,
        profile: user.profile,
        name: user.name,
        email: user.email,
        picture: user.image,
        organizations: user.organizations,
        orgs: user.orgs,
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.profile = token.profile
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.organizations = token.organizations
        session.user.orgs = token.orgs
      }
      return session
    },
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
}
