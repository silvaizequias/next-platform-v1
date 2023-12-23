'use client'

import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="sm:mx-8 mx-2">
        <div className="flex flex-col justify-center gap-4">
          <h4 className="font-semibold text-center text-red-400 text-4xl sm:text-6xl">
            Ops!{' '}
          </h4>
          <p className="font-light text-base text-center">
            O conteúdo não foi encontrado...
          </p>
          <Button
            variant="gradient"
            color="blue"
            size="sm"
            fullWidth
            type="button"
            onClick={() => router.back()}
          >
            Retorne daqui
          </Button>
        </div>
      </div>
    </div>
  )
}
