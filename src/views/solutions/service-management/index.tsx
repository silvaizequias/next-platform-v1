'use client'

import { Typography } from '@material-tailwind/react'

export default function ServiceManagementView() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 uppercase text-center'>
      <Typography className='font-light' variant='h1' color='blue' textGradient>
        Gestão de Serviços
      </Typography>
      <Typography variant='h6' color='blue-gray' textGradient>
        Acompanhamento de demandas de serviço em tempo real
      </Typography>
    </div>
  )
}
