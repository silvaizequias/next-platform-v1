import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { env } from 'process'

export const nextAuthOptions: NextAuthOptions = {
  secret: env.SECRET!,
  providers: [
    CredentialsProvider({
      credentials: {
        phone: { type: 'number' },
        password: { type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        const data = await fetch(`${env.MANAGEMENT_API_URL}/login`, {
          method: 'POST',
          body: JSON.stringify({
            phone: credentials?.phone,
            password: credentials?.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const user = await data.json()

        if (user && user.authorization) {
          return { ...user }
        } else {
          throw new Error(user)
        }
      },
    }),
  ],
  pages: { signIn: '/', signOut: '/', error: '/' },
  session: {
    strategy: 'jwt',
    maxAge: 15 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: User | any }) => {
      if (user) {
        token = user
      }

      return {
        ...token,
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token
      }
      return session
    },
  },
}
