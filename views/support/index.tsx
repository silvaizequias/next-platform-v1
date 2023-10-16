'use client'

import { Typography } from '@material-tailwind/react'

export default function SupportView() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 uppercase text-center'>
      <Typography className='font-light' variant='h1' color='blue' textGradient>
        Suporte Especializado
      </Typography>
      <Typography variant='h6' color='blue-gray' textGradient>
        Apoio tecnico dedicado sob demanda
      </Typography>
    </div>
  )
}
