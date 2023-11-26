import { prisma } from '@/libraries/prisma'
import { compareSync } from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
const SECRET = process.env.NEXTAUTH_SECRET!

export const authOptions: NextAuthOptions = {
  secret: SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email },
          include: {
            organizations: {
              select: {
                organizationId: true,
                organization: { select: { name: true, documentCode: true } },
                role: true,
              },
            },
          },
        })
        if (!user)
          throw new Error(
            `o e-mail ${credentials?.email} não existe no sistema`,
          )

        const comparePass = compareSync(credentials?.password!, user.passHash!)
        if (!comparePass) throw new Error('a senha está incorreta')

        return user
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
        const user = await prisma.user.findFirst({
          where: { email: token.email! },
          include: {
            organizations: {
              select: {
                organizationId: true,
                organization: { select: { name: true, documentCode: true } },
                role: true,
              },
            },
          },
        })
        if (user) {
          token.email = user.email
        }
        return token
      }

      return {
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
