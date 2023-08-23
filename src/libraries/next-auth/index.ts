import axios from 'axios'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        phone: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const res = await axios.post(process.env.NEXTAUTH_URL + `/api/signin`, {
          phone: credentials?.phone,
          password: credentials?.password,
        })

        const user = await res.data
        if (res.data && user) {
          return {
            ...user.data,
            authorization: user.Authorization,
          }
        }
        return null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  cookies: {},
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user
      }
      return token
    },
    session: async ({ session, token }) => {
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
  },
}
