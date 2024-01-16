import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import PublicationScreen from "./screen";

export default async function PublicationPage() {
  const session = await getServerSession(nextAuthOptions)

  return <PublicationScreen />
}
