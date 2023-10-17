'use client'

import { Button, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className='h-screen'>
      <div className='flex min-h-full justify-center items-center'>
        <div className='flex flex-col gap-2 text-center'>
          <Typography variant='h2'>Não Encontrado!</Typography>
          <Typography>Isso não parece existir por aqui!</Typography>
          <Button onClick={() => router.push('/')}>Retornar ao Início</Button>
        </div>
      </div>
    </div>
  )
}
