import NextAuth from 'next-auth'
import { NextApiHandler } from 'next/types'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from 'src/libs/prisma'

import axios from 'axios'

import accessLog from 'src/utils/access-log'

//@ts-ignore
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const endpoint = process.env.NEXT_PUBLIC_MANAGER_API + '/auth/signin'
        const res = await axios.post(endpoint, {
          email: credentials?.email,
          password: credentials?.password,
        })

        const user = await res.data
        if (res.data && user) {
          const userEmail = user.data.email as string
          const userAuthorization = user.Authorization as string
          await accessLog(userEmail, userAuthorization)

          return {
            ...user.data,
            authorization: user.Authorization,
          }
        } else {
          alert('O email ou senha não estão corretos!')

          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 14 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    //@ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token = user
      }

      return token
    },

    //@ts-ignore
    async session({ session, token }) {
      if (token) {
        session.user = token
      }

      return session
    },
  },
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/',
  },

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
}
