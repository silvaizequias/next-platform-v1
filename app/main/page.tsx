import { Metadata } from 'next'
import Image from 'next/image'
import { memo } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'você está na melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

const MainPage = async () => {
  const logotipo = '/logotipo.svg'

  return (
    <div className="h-screen w-full flex flex-col justify-center">
      <div className="p-8">
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
          <h6 className="text-md font-thin">a melhor plataforma de serviços</h6>
        </div>
      </div>
    </div>
  )
}

export default memo(MainPage)
