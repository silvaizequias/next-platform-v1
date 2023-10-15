'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='h-screen bg-sky-200 dark:bg-sky-800'>
      <div className='flex min-h-full justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-6xl text-center uppercase text-zinc-800 dark:text-zinc-50'>
            Algo deu errado!
          </h2>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </div>
    </div>
  )
}
