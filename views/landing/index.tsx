'use client'

import HeroPattern from '@/components/hero-pattern'
import { Typography } from '@material-tailwind/react'

export default function LandingView() {
  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <HeroPattern />
      <div className='flex flex-col items-center gap-2 uppercase text-center'>
        <Typography
          className='font-light'
          variant='h1'
          color='blue'
          textGradient
        >
          Dedicado Digital
        </Typography>
        <Typography variant='h6' color='blue-gray' textGradient>
          Sistemas Personalizados de Alta Performance
        </Typography>
      </div>
    </div>
  )
}
