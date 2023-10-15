export default function Loading() {
  return (
    <div className='h-screen bg-sky-200 dark:bg-sky-800'>
      <div className='flex min-h-full justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <p className='text-6xl text-center uppercase text-zinc-800 dark:text-zinc-50'>
            Carregando...
          </p>
        </div>
      </div>
    </div>
  )
}
