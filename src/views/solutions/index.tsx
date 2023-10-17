'use client'

import { Typography } from '@material-tailwind/react'

export default function SolutionsView() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 uppercase text-center'>
      <Typography className='font-light' variant='h1' color='blue' textGradient>
        Soluções Personalizadas
      </Typography>
      <Typography variant='h6' color='blue-gray' textGradient>
        Sistemas de alta performance que aumentam a produtividade de pessoas e
        organizações
      </Typography>
    </div>
  )
}
