'use client'

import HeroPattern from '@/components/hero-pattern'
import { Spinner, Typography } from '@material-tailwind/react'

export default function Loading() {
  return (
    <div className='h-screen'>
      <HeroPattern />
      <div className='flex min-h-full justify-center items-center gap-2'>
        <Spinner className='h-14 w-14 text-blue-400/50' />
        <Typography
          variant='h3'
          color='blue-gray'
          textGradient
          className='text-light'
        >
          Carregando...
        </Typography>
      </div>
    </div>
  )
}
