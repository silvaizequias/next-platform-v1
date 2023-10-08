import { prisma } from '@/libraries/prisma'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        phone: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const res = await axios.post(`${NEXTAUTH_URL}/api/sign-in`, {
          phone: credentials?.phone!,
          password: credentials?.password!,
        })

        const user = await res.data
        if (res.data && user) {
          return {
            ...user.data,
            authorization: user.Authorization!,
          }
        } else {
          return null
        }
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
  session: {
    strategy: 'jwt',
    maxAge: 15 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, profile }): Promise<any> => {
      const userEmail = token.email! || profile?.email!
      const userData = await prisma.user.findFirst({
        where: { email: userEmail! },
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
      if (!userData) {
        const newUser = await prisma.user.create({
          data: {
            profile: 'GUEST',
            name: token.name!,
            email: token.email,
            image: token.picture!,
          },
        })
        return {
          id: newUser?.id,
          profile: newUser?.profile,
          name: newUser?.name,
          email: newUser?.email,
          picture: newUser?.image,
          organizations: [],
          orgs: [],
        }
      } else {
        token.id = userData.id
        token.profile = userData.profile!
        token.name = userData.name
        token.email = userData.email
        token.picture = userData.image
        token.organizations = userData.organizations
        token.orgs = userData.orgs

        return token
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
