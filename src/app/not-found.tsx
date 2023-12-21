'use client'

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
          <button
            className="mt-2 w-full uppercase rounded-md bg-sky-600 hover:opacity-75 py-2 text-white text-base hover:font-medium"
            type="button"
            onClick={() => router.back()}
          >
            Retorne daqui
          </button>
        </div>
      </div>
    </div>
  )
}
