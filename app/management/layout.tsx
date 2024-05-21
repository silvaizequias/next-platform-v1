import LandingPage from '@/components/LandingPage'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Fragment, ReactNode } from 'react'
import Image from 'next/image'
import Login from '@/components/Login'
import ControlMenu from '@/components/ControlMenu'

export const metadata: Metadata = {
  title: {
    default: 'você está no controle da melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function ManagementLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession(nextAuthOptions)

  const logotipo = '/logotipo.svg'

  return session && session?.user?.profile == 'master' ? (
    <Fragment>{children}</Fragment>
  ) : (
    <LandingPage>
      <div className="w-full h-full flex justify-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <div className="mx-auto text-center">
            <Image
              className="w-[200px] h-[350px] mx-auto"
              src={logotipo}
              alt="dedicado"
              width={200}
              height={350}
              priority
            />
            <h1 className="text-6xl text-sky-400 font-medium">dedicado</h1>
            <h6 className="text-md font-thin">
              a melhor plataforma de serviços
            </h6>
          </div>

          <div className="p-4 bg-slate-400 dark:bg-slate-600 rounded-md shadow-md">
            <Login />
          </div>
        </div>
      </div>
    </LandingPage>
  )
}
