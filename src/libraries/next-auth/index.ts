import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt'
import { prisma } from '@/libraries/prisma'
import { JWT } from 'next-auth/jwt'

const SECRET = process.env.SECRET!

export const nextAuthOptions: NextAuthOptions = {
  secret: SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        phone: { type: 'number' },
        password: { type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        const user = await prisma.user.findFirst({
          where: { softDeleted: false, phone: credentials?.phone },
        })
        if (!user)
          throw new Error(
            `o celular ${credentials?.phone} não existe no sistema`,
          )

        const comparePass = compareSync(credentials?.password!, user.passHash!)
        if (!comparePass) throw new Error('a senha está incorreta')

        return user
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
    jwt: async ({ token, user }: { token: JWT; user: User }) => {
      if (!user) {
        const user = await prisma.user.findFirst({
          where: { email: token.email! },
        })
        if (user) {
          token.email = user.email
        }
        return token
      }

      return {
        id: user.id,
        profile: user.profile,
        active: user.active,
        subscriber: user.subscriber,
        picture: user.image,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.profile = token.profile
        session.user.active = token.active
        session.user.subscriber = token.subscriber
        session.user.image = token.picture
        session.user.name = token.name
        session.user.email = token.email
        session.user.phone = token.phone
      }
      return session
    },
  },
}
