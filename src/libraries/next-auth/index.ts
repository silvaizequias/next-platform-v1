import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
const SECRET = process.env.NEXTAUTH_SECRET!
const PLATFORM_MANAGEMENT_API_URL =
  process.env.NEXT_PUBLIC_PLATFORM_MANAGEMENT_API_URL!

export const authOptions: NextAuthOptions = {
  secret: SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        return await fetch(`${PLATFORM_MANAGEMENT_API_URL}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(async (res: any) => {
            if (res.status !== 201) return null
            return res.json()
          })
          .catch((error: any) => {
            throw new Error('', error)
          })
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 15 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!user) {
        return token
      }

      return {
        authorization: user.authorization,
        id: user.id,
        profile: user.profile,
        picture: user.image,
        name: user.name,
        email: user.email,
        organizations: user.organizations,
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.authorization = token.authorization
        session.user.id = token.id
        session.user.profile = token.profile
        session.user.image = token.picture
        session.user.name = token.name
        session.user.email = token.email
        session.user.organizations = token.organizations
      }
      return session
    },
  },
  pages: { signIn: '/', signOut: '/', error: '/' },
}
