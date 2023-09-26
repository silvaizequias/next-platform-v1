import { prisma } from '@/libraries/prisma'
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [],
  session: { strategy: 'jwt', maxAge: 15 * 24 * 30 * 60 },
  callbacks: {},
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
}
