import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestão de Serviços',
}

export default function ServicePage() {
  return (
    <div className='flex flex-col justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-6xl text-center uppercase text-zinc-50'>
          Gestão de Serviços
        </h1>
        <span className='text-md text-center text-zinc-200 uppercase'>
          Acompanhamento de demandas de serviço em tempo real
        </span>
      </div>
    </div>
  )
}
