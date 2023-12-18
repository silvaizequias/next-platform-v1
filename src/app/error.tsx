'use client'

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
    <div className="min-h-screen flex justify-center items-center">
      <div className="sm:mx-8 mx-2">
        <div className="flex flex-col text-center uppercase">
          <h4 className="font-medium text-2xl text-red-400">
            Ops! Aconteceu um erro inesperado
          </h4>
          <p className="font-light text-base">{error.message}</p>
          <button
            type="button"
            className="uppercase text-base bg-zinc-200 rounded-md "
            onClick={() => reset()}
          >
            Tente novamente
          </button>
        </div>
      </div>
    </div>
  )
}
