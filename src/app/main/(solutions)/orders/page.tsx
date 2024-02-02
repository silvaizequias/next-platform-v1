import PageScreen from '@/components/page-screen'
import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'

export default async function OrderPage() {
  const session = await getServerSession(nextAuthOptions)

  return (
    <PageScreen title="gestão de pedidos dedicado">
      {session && (
        <div className="w-full">
          <h6 className="text-lg">organizações</h6>
          ...
        </div>
      )}
    </PageScreen>
  )
}
