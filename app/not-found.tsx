import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='h-screen bg-sky-200 dark:bg-sky-800'>
      <div className='flex min-h-full justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-4xl text-center uppercase text-zinc-800 dark:text-zinc-50'>
            Não Encontrado!
          </h2>
          <p className='text-md text-center text-zinc-600 dark:text-zinc-300'>
            Isso não parece existir por aqui!
          </p>
          <Link
            className='text-md text-center text-zinc-400 dark:text-zinc-200'
            href='/'
          >
            Retorne ao Início...
          </Link>
        </div>
      </div>
    </div>
  )
}
