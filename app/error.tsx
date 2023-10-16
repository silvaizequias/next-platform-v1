'use client'

import { Button, Typography } from '@material-tailwind/react'
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
    <div className='h-screen'>
      <div className='flex min-h-full justify-center items-center'>
        <div className='flex flex-col gap-2 text-center'>
          <Typography variant='h2'>Algo deu errado!</Typography>
          <Button onClick={() => reset()}>Tente Novamente</Button>
        </div>
      </div>
    </div>
  )
}
