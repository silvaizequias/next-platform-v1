import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
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
      session.user = {
        ...session.user,
      }
      return session
    },
  },
  pages: {
    signIn: `/`,
    verifyRequest: `/`,
  },
}
