import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suporte Dedicado',
}

export default function SupportPage() {
  return (
    <div className='h-screen bg-sky-200 dark:bg-sky-800'>
      <div className='flex min-h-full justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-6xl text-center uppercase text-zinc-800 dark:text-zinc-50'>
            Suporte Dedicado
          </h1>
          <span className='text-md text-center text-zinc-600 dark:text-zinc-300'>
            Sistemas Personalizados de Alta Performance
          </span>
        </div>
      </div>
    </div>
  )
}
