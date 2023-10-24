import { NextAuthOptions } from 'next-auth'

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  providers: [],
}
