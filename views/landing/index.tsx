'use client'

import { Typography } from "@material-tailwind/react";

export default function LandingView() {
  return (
    <div className='flex flex-col justify-center min-h-screen overflow-hidden dark:bg-gray-900'>
      <div className='flex flex-col items-center gap-2 uppercase'>
        <Typography className="font-light" variant="h1" color="blue" textGradient>Dedicado Digital</Typography>
        <Typography variant="h6" color="blue-gray" textGradient>Sistemas Personalizados de Alta Performance</Typography>
      </div>
    </div>
  )
}
