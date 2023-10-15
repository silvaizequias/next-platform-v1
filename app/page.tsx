import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistemas Personalizados de Alta Performance',
}

export default function LandingPage() {
  return (
    <div className='flex flex-col justify-center min-h-screen overflow-hidden bg-blue-400'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-6xl text-center uppercase text-zinc-50'>
          Dedicado Digital
        </h1>
        <span className='text-md text-center text-zinc-200 uppercase'>
          Sistemas Personalizados de Alta Performance
        </span>
      </div>
    </div>
  )
}
