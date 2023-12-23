'use client'

import { Button } from '@material-tailwind/react'
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
        <div className="flex flex-col justify-center gap-4">
          <h4 className="font-semibold text-center text-red-400 text-4xl sm:text-6xl">
            Ops!{' '}
          </h4>
          <p className="font-light text-base text-center">
            Ocorreu um erro inesperado!
          </p>
          <div className="w-[360px] sm:w-[480px] bg-slate-50 rounded-md shadow-md p-4">
            <div className="flex flex-col justify-center gap-4">
              <p className="text-center  uppercase ">
                {error.name}:{' '}
                <span className="italic text-lg font-semibold text-red-400">
                  {' '}
                  {error.digest}
                </span>
              </p>
              <Button
                variant="gradient"
                color="blue"
                size="sm"
                fullWidth
                type="button"
                onClick={() => reset()}
              >
                Tente novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
