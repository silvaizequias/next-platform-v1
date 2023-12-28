import { Metadata } from 'next'
import OrganizationDetailScreen from './screen'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'

//export async function generateStaticParams() {}

//export async function generateMetadata({
//  params,
//}: {
//  params: { cnpj: string }
//}): Promise<Metadata | null> {
//  return {}
//}

export default async function OrganizationDetailPage({
  params,
}: {
  params: { document: string }
}) {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-full pt-20">
        <div className="mx-2 sm:mx-8">
          <h4 className="text-lg sm:text-2xl uppercase py-4">
            Detalhes da Organização
          </h4>
          <OrganizationDetailScreen
            document={params?.document}
            session={session!}
          />
        </div>
      </div>
    </div>
  )
}
