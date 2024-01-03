import { NextAuthOptions, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET
const PLATFORM_API_URL = process.env.PLATFORM_API_URL

export const authOptions: NextAuthOptions = {
  pages: { signIn: '/', signOut: '/', error: '/' },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        const data = await fetch(`${PLATFORM_API_URL}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        const user = await data.json()

        if (user && user.authorization) {
          return { ...user }
        } else {
          throw new Error(user?.message)
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
    jwt: async ({ token, user }: { token: JWT; user: User }) => {
      if (!user) {
        return {
          id: token.id,
          profile: token.profile,
          authorization: token.authorization,
          image: token.picture,
          name: token.name,
          email: token.email,
          organizations: token.organizations,
        }
      }

      return {
        id: user.id,
        profile: user.profile,
        authorization: user.authorization,
        picture: user.image,
        name: user.name,
        email: user.email,
        organizations: user.organizations,
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.profile = token.profile
        session.user.authorization = token.authorization
        session.user.image = token.picture
        session.user.name = token.name
        session.user.email = token.email
        session.user.organizations = token.organizations
      }
      return session
    },
  },
  secret: NEXTAUTH_SECRET,
}
