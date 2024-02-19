import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { env } from '@/environments'
import { prisma } from '@/libraries/prisma'
import { compareSync } from 'bcrypt'

export const nextAuthOptions: NextAuthOptions = {
  secret: env.SECRET!,
  providers: [
    CredentialsProvider({
      credentials: {
        phone: { type: 'number' },
        password: { type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        const user = await prisma.user.findFirst({
          where: { phone: credentials?.phone },
        })
        if (!user)
          throw new Error(
            `número de celular ${credentials?.phone} está incorreto`,
          )

        const comparePass = compareSync(credentials?.password!, user.passHash!)
        if (!comparePass) throw new Error('a senha está incorreta')

        return {
          id: user.id,
          active: user.active,
          subscribe: user.subscriber,
          profile: user.profile,
          image: user.image,
          name: user.name,
          email: user.email,
          phone: user.phone,
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
