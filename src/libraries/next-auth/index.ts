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
        token.sub = user.id
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
    verifyRequest: `/`,
  },
}
