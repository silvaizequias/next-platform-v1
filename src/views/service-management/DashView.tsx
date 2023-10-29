'use client'

import dynamic from 'next/dynamic'

export default function DashView() {
  const ShowMapBox = dynamic(() => import('./mapbox/DynamicMapBox'))

  return <ShowMapBox />
}
