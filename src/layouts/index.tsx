'use client'

import { Suspense, useState } from 'react'
import { DefaultLayoutProps } from './types'
import TopBar from './components/topbar'
import { usePathname } from 'next/navigation'

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { children, session } = props
  const pathname = usePathname()
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Suspense fallback={'...'}>
      {pathname !== '/' && <TopBar session={session!} onClose={handleDrawer} />}
      <div>{children}</div>
    </Suspense>
  )
}
