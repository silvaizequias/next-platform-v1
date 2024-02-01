import PageScreen from '@/components/page-screen'
import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'

export default async function OrganizationOrderPage({
  params,
}: {
  params: { organization: string }
}) {
  const { organization } = params
  const session = await getServerSession(nextAuthOptions)

  return (
    <PageScreen title={`gestão de pedidos da ${organization}`}>
      <div className="w-full">
        <h6 className="text-lg">pedidos</h6>
        ...
      </div>
      <div className="w-full">
        <h6 className="text-lg">ítens de pedidos</h6>
        ...
      </div>
      <div className="w-full">
        <h6 className="text-lg">anexos de pedidos</h6>
        ...
      </div>
    </PageScreen>
  )
}
