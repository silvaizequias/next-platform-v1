import Image from 'next/image'
import { Session } from 'next-auth'
import MyOrganizationListView from './(management)/views/my-organization-list-view'
import MySubscriptionListView from './(management)/views/my-subscription-list-view'
import AuthDialog from '@/components/auth-dialog'

interface Props {
  session: Session
}

export default function MainScreen(props: Props) {
  const { session } = props

  const logotipo = '/logotipo.svg'

  return session ? (
    <div className="min-h-screen flex justify-center">
      <div className="flex flex-col max-w-sm sm:max-w-4xl w-full">
        <h4 className="py-4 text-xl lowercase">plataforma dedicado</h4>
        <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded shadow-xl">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="w-full sm:w-1/2">
              <MySubscriptionListView session={session} />
            </div>
            <div className="w-full sm:w-1/2">
              <MyOrganizationListView session={session} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col max-w-lg w-full justify-center items-center">
        <Image
          className="my-4 w-[179px] h-[259px]"
          src={logotipo}
          alt={'Dedicado'}
          priority
          //loading={'lazy'}
          width={179}
          height={259}
        />
        <h1 className="text-6xl text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 font-semibold lowercase">
          dedicado
        </h1>
        <div className="mx-8">
          <div className="p-2">
            <h6 className="text-lg text-center py-4">
              sua melhor plataforma de serviços
            </h6>
          </div>
        </div>
        <AuthDialog />
      </div>
    </div>
  )
}
