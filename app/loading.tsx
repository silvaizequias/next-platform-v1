'use client'

import { Typography } from "@material-tailwind/react";

export default function Loading() {
  return (
    <div className='h-screen bg-sky-200 dark:bg-sky-800'>
      <div className='flex min-h-full justify-center items-center'>
        <div className='flex flex-col gap-2 text-center'>
          <Typography variant="h3">Carregando...</Typography>
        </div>
      </div>
    </div>
  )
}
