'use client'

import FullScreen from '@/components/full-screen'
import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <FullScreen>
      <div className="bg-slate-200 dark:bg-slate-800 mx-8 p-4 rounded shadow-xl">
        <h1 className="text-6xl text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 font-semibold lowercase">
          ops!{' '}
        </h1>
        <div className="p-2 text-center">o conteúdo não foi encontrado...</div>
        <div className="flex flex-col items-center">
          <Button
            variant="gradient"
            color="light-blue"
            size="sm"
            fullWidth
            type="button"
            onClick={() => router.back()}
          >
            Retorne daqui
          </Button>
        </div>
      </div>
    </FullScreen>
  )
}
